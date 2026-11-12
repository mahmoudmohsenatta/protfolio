import type { Activity, Lang, Localized, Slot } from '@/types';

const locale = (lang: Lang) => (lang === 'ar' ? 'ar-SA-u-nu-latn-ca-gregory' : 'en-GB');

export const L = (value: Localized, lang: Lang) => value[lang] ?? value.en;

export function formatSAR(amount: number, lang: Lang) {
  try {
    return new Intl.NumberFormat(locale(lang), { style: 'currency', currency: 'SAR', maximumFractionDigits: 2 }).format(amount);
  } catch {
    return lang === 'ar' ? `${amount.toFixed(2)} ر.س` : `SAR ${amount.toFixed(2)}`;
  }
}

export function formatDay(date: Date, lang: Lang, opts: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' }) {
  return new Intl.DateTimeFormat(locale(lang), opts).format(date);
}

export function formatTime(date: Date, lang: Lang) {
  return new Intl.DateTimeFormat(locale(lang), { hour: 'numeric', minute: '2-digit' }).format(date);
}

export function formatWhen(iso: string, lang: Lang) {
  const d = new Date(iso);
  return `${formatDay(d, lang, { weekday: 'long', day: 'numeric', month: 'long' })} · ${formatTime(d, lang)}`;
}

export function relativeDayLabel(date: Date, lang: Lang, t: (k: string) => string) {
  const today = startOfDay(new Date());
  const diff = Math.round((startOfDay(date).getTime() - today.getTime()) / 86_400_000);
  if (diff === 0) return t('common.today');
  if (diff === 1) return t('common.tomorrow');
  return formatDay(date, lang, { weekday: 'short' });
}

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

/** Small deterministic hash so mock availability is stable between renders. */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function slotsForDay(activity: Activity, day: Date, now = new Date()): Slot[] {
  if (!activity.days.includes(day.getDay())) return [];
  return activity.times
    .map((time) => {
      const [h, m] = time.split(':').map(Number);
      const start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, m);
      const spotsLeft = hash(activity.id + start.toISOString()) % (activity.capacity + 1);
      return { activityId: activity.id, start: start.toISOString(), spotsLeft };
    })
    .filter((s) => new Date(s.start).getTime() > now.getTime() + 30 * 60_000);
}

export function nextSlot(activity: Activity, from = new Date()): Slot | undefined {
  for (let i = 0; i < 7; i++) {
    const s = slotsForDay(activity, addDays(startOfDay(from), i), from).find((x) => x.spotsLeft > 0);
    if (s) return s;
  }
  return undefined;
}

export const timeOfDay = (time: string): 'morning' | 'afternoon' | 'evening' => {
  const h = Number(time.split(':')[0]);
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
};

export const uid = (prefix = '') => `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

export const bookingCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = 'NB-';
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
};

/** Distance in km between two coordinates (haversine). */
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

