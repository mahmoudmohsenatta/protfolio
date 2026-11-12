import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { L } from '@/lib/format';
import type { Activity, Booking, Lang } from '@/types';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function ensureNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const current = await Notifications.getPermissionsAsync();
  if (current.status === 'granted') return true;
  const req = await Notifications.requestPermissionsAsync();
  return req.status === 'granted';
}

/** Schedules a local class reminder (or a 10s demo trigger if the class is soon). */
export async function scheduleBookingReminder(booking: Booking, activity: Activity, lang: Lang): Promise<string | null> {
  if (Platform.OS === 'web') return 'web-mock';
  const ok = await ensureNotificationPermission();
  if (!ok) return null;
  const oneHourBefore = new Date(new Date(booking.start).getTime() - 60 * 60_000);
  const seconds = Math.max(10, Math.round((oneHourBefore.getTime() - Date.now()) / 1000));
  return Notifications.scheduleNotificationAsync({
    content: {
      title: lang === 'ar' ? 'نشاطك بعد ساعة' : 'Your class starts in 1 hour',
      body: L(activity.title, lang),
      data: { bookingId: booking.id },
    },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds },
  });
}

export async function cancelBookingReminder(id?: string) {
  if (!id || id === 'web-mock' || Platform.OS === 'web') return;
  await Notifications.cancelScheduledNotificationAsync(id).catch(() => {});
}

