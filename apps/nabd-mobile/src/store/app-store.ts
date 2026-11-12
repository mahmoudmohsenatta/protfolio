import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { activityById, planById } from '@/data/catalog';
import { addDays, bookingCode, uid } from '@/lib/format';
import type {
  Activity,
  AppNotification,
  Booking,
  CategoryId,
  City,
  Lang,
  PlanId,
  TopUp,
  Transaction,
} from '@/types';

export type ThemeMode = 'system' | 'light' | 'dark';

export interface User {
  name: string;
  phone: string;
  memberSince: string;
}

type BookResult =
  | { ok: true; booking: Booking }
  | { ok: false; reason: 'credits' | 'duplicate' };

type CheckInResult =
  | { ok: true; booking: Booking }
  | { ok: false; reason: 'invalid' | 'already' | 'cancelled' };

interface AppState {
  hydrated: boolean;
  lang: Lang | null;
  themeMode: ThemeMode;
  onboarded: boolean;
  user: User | null;
  interests: CategoryId[];
  city: City;
  planId: PlanId | null;
  renewsAt: string | null;
  credits: number;
  bookings: Booking[];
  transactions: Transaction[];
  notifications: AppNotification[];
  favorites: string[];
  notificationsEnabled: boolean;

  setLang: (lang: Lang) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setCity: (city: City) => void;
  completeOnboarding: (interests: CategoryId[]) => void;
  login: (name: string, phone: string) => void;
  logout: () => void;
  subscribe: (planId: PlanId, amountSar: number) => void;
  topUp: (pack: TopUp, amountSar: number) => void;
  book: (activity: Activity, start: string) => BookResult;
  cancelBooking: (id: string) => { refunded: boolean };
  checkIn: (bookingId: string) => CheckInResult;
  setReminder: (bookingId: string, reminderId: string) => void;
  toggleFavorite: (activityId: string) => void;
  pushNotification: (n: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => void;
  markAllRead: () => void;
  setNotificationsEnabled: (v: boolean) => void;
}

const FREE_TRIAL_CREDITS = 5;
const REFUND_WINDOW_MS = 12 * 60 * 60 * 1000;

const initialData = {
  onboarded: false,
  user: null,
  interests: [] as CategoryId[],
  city: 'riyadh' as City,
  planId: null,
  renewsAt: null,
  credits: 0,
  bookings: [] as Booking[],
  transactions: [] as Transaction[],
  notifications: [] as AppNotification[],
  favorites: [] as string[],
  notificationsEnabled: true,
};

/** Seed a little history so a brand-new demo account doesn't feel empty. */
function demoHistory(): Pick<AppState, 'bookings' | 'transactions' | 'notifications'> {
  const now = new Date();
  const past1 = addDays(now, -6);
  past1.setHours(18, 0, 0, 0);
  const past2 = addDays(now, -3);
  past2.setHours(19, 30, 0, 0);
  const iso = (d: Date) => d.toISOString();
  return {
    bookings: [
      { id: uid('b'), code: bookingCode(), activityId: 'a2', start: iso(past2), credits: 5, status: 'checkedIn', createdAt: iso(addDays(past2, -1)), checkedInAt: iso(past2) },
      { id: uid('b'), code: bookingCode(), activityId: 'a1', start: iso(past1), credits: 6, status: 'checkedIn', createdAt: iso(addDays(past1, -1)), checkedInAt: iso(past1) },
    ],
    transactions: [
      { id: uid('t'), type: 'booking', credits: -5, ref: 'a2', createdAt: iso(addDays(past2, -1)) },
      { id: uid('t'), type: 'booking', credits: -6, ref: 'a1', createdAt: iso(addDays(past1, -1)) },
      { id: uid('t'), type: 'topUp', credits: 16, amountSar: 0, ref: 'welcome', createdAt: iso(addDays(now, -8)) },
    ],
    notifications: [
      {
        id: uid('n'), read: false, icon: 'gift', createdAt: iso(now), href: '/plans',
        title: { en: 'Welcome to Nabd 🎉', ar: 'أهلًا بك في نبض 🎉' },
        body: { en: `You have ${FREE_TRIAL_CREDITS} free credits to try your first class.`, ar: `لديك ${FREE_TRIAL_CREDITS} رصيد مجاني لتجربة أول نشاط.` },
      },
      {
        id: uid('n'), read: false, icon: 'sparkles', createdAt: iso(addDays(now, -1)), href: '/assistant',
        title: { en: 'Meet Nabd AI', ar: 'تعرّف على نبض الذكي' },
        body: { en: 'Tell our AI concierge what you feel like doing and get instant picks.', ar: 'قل لمساعدنا الذكي وش تبي تسوي واحصل على اقتراحات فورية.' },
      },
      {
        id: uid('n'), read: true, icon: 'star', createdAt: iso(past2), href: '/activity/a2',
        title: { en: 'How was Sunset Vinyasa Yoga?', ar: 'كيف كانت يوغا الغروب؟' },
        body: { en: 'Rate your class and help others discover great experiences.', ar: 'قيّم تجربتك وساعد غيرك يكتشف تجارب مميزة.' },
      },
    ],
  };
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      lang: null,
      themeMode: 'system',
      ...initialData,

      setLang: (lang) => set({ lang }),
      setThemeMode: (themeMode) => set({ themeMode }),
      setCity: (city) => set({ city }),
      completeOnboarding: (interests) => set({ interests, onboarded: true }),

      login: (name, phone) =>
        set({
          user: { name, phone, memberSince: new Date().toISOString() },
          credits: FREE_TRIAL_CREDITS,
          ...demoHistory(),
        }),

      logout: () => set({ ...initialData, onboarded: true, interests: get().interests }),

      subscribe: (planId, amountSar) => {
        const plan = planById(planId)!;
        set((s) => ({
          planId,
          renewsAt: addDays(new Date(), 30).toISOString(),
          credits: s.credits + plan.credits,
          transactions: [
            { id: uid('t'), type: 'plan', credits: plan.credits, amountSar, ref: planId, createdAt: new Date().toISOString() },
            ...s.transactions,
          ],
        }));
      },

      topUp: (pack, amountSar) =>
        set((s) => ({
          credits: s.credits + pack.credits,
          transactions: [
            { id: uid('t'), type: 'topUp', credits: pack.credits, amountSar, ref: pack.id, createdAt: new Date().toISOString() },
            ...s.transactions,
          ],
        })),

      book: (activity, start) => {
        const s = get();
        if (s.bookings.some((b) => b.activityId === activity.id && b.start === start && b.status !== 'cancelled')) {
          return { ok: false, reason: 'duplicate' };
        }
        if (s.credits < activity.credits) return { ok: false, reason: 'credits' };
        const booking: Booking = {
          id: uid('b'),
          code: bookingCode(),
          activityId: activity.id,
          start,
          credits: activity.credits,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        };
        set({
          credits: s.credits - activity.credits,
          bookings: [booking, ...s.bookings],
          transactions: [
            { id: uid('t'), type: 'booking', credits: -activity.credits, ref: activity.id, createdAt: booking.createdAt },
            ...s.transactions,
          ],
          notifications: [
            {
              id: uid('n'), read: false, icon: 'checkmark-circle', createdAt: booking.createdAt, href: `/booking/${booking.id}`,
              title: { en: 'Booking confirmed', ar: 'تم تأكيد الحجز' },
              body: { en: `${activity.title.en} — your QR ticket is ready.`, ar: `${activity.title.ar} — تذكرتك جاهزة.` },
            },
            ...s.notifications,
          ],
        });
        return { ok: true, booking };
      },

      cancelBooking: (id) => {
        const s = get();
        const booking = s.bookings.find((b) => b.id === id);
        if (!booking || booking.status !== 'confirmed') return { refunded: false };
        const refunded = new Date(booking.start).getTime() - Date.now() > REFUND_WINDOW_MS;
        set({
          bookings: s.bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)),
          credits: refunded ? s.credits + booking.credits : s.credits,
          transactions: refunded
            ? [{ id: uid('t'), type: 'refund', credits: booking.credits, ref: booking.activityId, createdAt: new Date().toISOString() }, ...s.transactions]
            : s.transactions,
        });
        return { refunded };
      },

      checkIn: (bookingId) => {
        const s = get();
        const booking = s.bookings.find((b) => b.id === bookingId);
        if (!booking) return { ok: false, reason: 'invalid' };
        if (booking.status === 'checkedIn') return { ok: false, reason: 'already' };
        if (booking.status === 'cancelled') return { ok: false, reason: 'cancelled' };
        const updated: Booking = { ...booking, status: 'checkedIn', checkedInAt: new Date().toISOString() };
        const activity = activityById(booking.activityId);
        set({
          bookings: s.bookings.map((b) => (b.id === bookingId ? updated : b)),
          notifications: [
            {
              id: uid('n'), read: false, icon: 'qr-code', createdAt: updated.checkedInAt!, href: `/booking/${booking.id}`,
              title: { en: 'You are checked in ✅', ar: 'تم تسجيل حضورك ✅' },
              body: { en: `Enjoy ${activity?.title.en ?? 'your class'}!`, ar: `استمتع بـ ${activity?.title.ar ?? 'نشاطك'}!` },
            },
            ...s.notifications,
          ],
        });
        return { ok: true, booking: updated };
      },

      setReminder: (bookingId, reminderId) =>
        set((s) => ({ bookings: s.bookings.map((b) => (b.id === bookingId ? { ...b, reminderId } : b)) })),

      toggleFavorite: (activityId) =>
        set((s) => ({
          favorites: s.favorites.includes(activityId)
            ? s.favorites.filter((f) => f !== activityId)
            : [...s.favorites, activityId],
        })),

      pushNotification: (n) =>
        set((s) => ({ notifications: [{ ...n, id: uid('n'), createdAt: new Date().toISOString(), read: false }, ...s.notifications] })),

      markAllRead: () => set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),

      setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),
    }),
    {
      name: 'nabd-store-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ hydrated, ...rest }) => rest,
      onRehydrateStorage: () => () => {
        useAppStore.setState({ hydrated: true });
      },
    },
  ),
);

export const useUnreadCount = () => useAppStore((s) => s.notifications.filter((n) => !n.read).length);

