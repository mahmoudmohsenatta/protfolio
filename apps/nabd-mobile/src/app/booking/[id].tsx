import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Card, CategoryArt, EmptyState, Header, Row, Screen } from '@/components/ui';
import { activityById, venueById } from '@/data/catalog';
import { formatWhen, L } from '@/lib/format';
import { cancelBookingReminder, scheduleBookingReminder } from '@/lib/notifications';
import { useAppStore } from '@/store/app-store';
import { radius, spacing, useTheme } from '@/theme';
import { useDirection } from '@/theme/direction';

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { lang } = useDirection();
  const { colors } = useTheme();

  const booking = useAppStore((s) => s.bookings.find((b) => b.id === id));
  const cancelBooking = useAppStore((s) => s.cancelBooking);
  const setReminder = useAppStore((s) => s.setReminder);

  if (!booking) {
    return (
      <Screen>
        <Header title={t('bookings.ticket')} />
        <EmptyState icon="ticket-outline" title={t('scanner.invalid')} />
      </Screen>
    );
  }

  const activity = activityById(booking.activityId);
  const venue = activity ? venueById(activity.venueId) : undefined;
  const isConfirmed = booking.status === 'confirmed';

  const statusMeta = {
    confirmed: { label: t('bookings.confirmed'), color: colors.success, icon: 'checkmark-circle' },
    checkedIn: { label: t('bookings.checkedIn'), color: colors.accent, icon: 'qr-code' },
    cancelled: { label: t('bookings.cancelled'), color: colors.textMuted, icon: 'close-circle' },
  }[booking.status];

  const handleReminder = async () => {
    if (!activity) return;
    const notifId = await scheduleBookingReminder(booking, activity, lang);
    if (notifId) {
      setReminder(booking.id, notifId);
    }
  };

  const handleCancel = () => {
    const withinRefund = new Date(booking.start).getTime() - Date.now() > 12 * 60 * 60 * 1000;
    const msg = t('bookings.cancelConfirm', {
      refund: withinRefund ? t('bookings.refundYes') : t('bookings.refundNo'),
    });

    const runCancel = async () => {
      await cancelBookingReminder(booking.reminderId);
      cancelBooking(booking.id);
    };

    if (Platform.OS === 'web') {
      runCancel();
      return;
    }

    Alert.alert(t('bookings.cancelBooking'), msg, [
      { text: t('common.back'), style: 'cancel' },
      { text: t('common.confirm'), style: 'destructive', onPress: runCancel },
    ]);
  };

  return (
    <Screen>
      <Header title={t('bookings.ticket')} />

      {activity && venue && (
        <Card padded={false}>
          <CategoryArt category={activity.category} icon={activity.icon} height={110} iconSize={44} />
          <View style={{ padding: spacing[5], gap: spacing[4] }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <Row gap={6}>
                <Icon name={statusMeta.icon} size={18} color={statusMeta.color} />
                <Text variant="label" style={{ color: statusMeta.color }}>
                  {statusMeta.label}
                </Text>
              </Row>
              <Text variant="caption" muted>
                {t('common.creditsCount', { count: booking.credits })}
              </Text>
            </Row>

            <View style={{ gap: 4 }}>
              <Text variant="h2">{L(activity.title, lang)}</Text>
              <Text variant="bodySm" muted>
                {formatWhen(booking.start, lang)}
              </Text>
              <Text variant="bodySm" muted>
                {L(venue.name, lang)} · {L(venue.district, lang)}, {t(`common.${venue.city}`)}
              </Text>
            </View>

            <View style={[styles.qrWrap, { backgroundColor: '#fff', borderColor: colors.border }]}>
              <QRCode value={`nabd://checkin/${booking.id}`} size={180} color="#100B2C" backgroundColor="#FFFFFF" />
              <Text variant="caption" muted style={{ marginTop: spacing[3], color: '#52525C' }}>
                {t('bookings.ticketSub')}
              </Text>
              <Text variant="h3" style={{ color: '#100B2C', letterSpacing: 2 }}>
                {booking.code}
              </Text>
            </View>
          </View>
        </Card>
      )}

      {isConfirmed && (
        <View style={{ marginTop: spacing[5], gap: spacing[3] }}>
          <Button
            title={booking.reminderId ? t('bookings.reminderSet') : t('bookings.addReminder')}
            variant="outline"
            icon={booking.reminderId ? 'notifications' : 'notifications-outline'}
            disabled={!!booking.reminderId}
            full
            onPress={handleReminder}
          />
          <Button
            title={t('bookings.simulateScan')}
            variant="secondary"
            icon="qr-code-outline"
            full
            onPress={() => router.push({ pathname: '/scanner', params: { demoId: booking.id } })}
          />
          <Button title={t('bookings.cancelBooking')} variant="danger" full onPress={handleCancel} />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  qrWrap: {
    alignItems: 'center',
    padding: spacing[5],
    borderRadius: radius.lg,
    borderWidth: 1,
    marginTop: spacing[2],
  },
});

