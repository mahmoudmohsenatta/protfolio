import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { activityById, venueById } from '@/data/catalog';
import { formatWhen, L } from '@/lib/format';
import { radius, spacing, useTheme } from '@/theme';
import { useDirection } from '@/theme/direction';
import type { Booking } from '@/types';

import { CategoryArt, Card, Row } from './ui';
import { Icon } from './ui/icon';
import { Text } from './ui/text';

export function BookingCard({ booking }: { booking: Booking }) {
  const { t } = useTranslation();
  const { lang } = useDirection();
  const { colors } = useTheme();
  const activity = activityById(booking.activityId);
  if (!activity) return null;
  const venue = venueById(activity.venueId);

  const status = {
    confirmed: { label: t('bookings.confirmed'), color: colors.success, icon: 'checkmark-circle' },
    checkedIn: { label: t('bookings.checkedIn'), color: colors.accent, icon: 'qr-code' },
    cancelled: { label: t('bookings.cancelled'), color: colors.textMuted, icon: 'close-circle' },
  }[booking.status];

  return (
    <Card onPress={() => router.push(`/booking/${booking.id}`)} style={{ marginBottom: spacing[3] }}>
      <Row gap={spacing[3]} style={{ alignItems: 'flex-start' }}>
        <View style={{ width: 56, borderRadius: radius.md, overflow: 'hidden' }}>
          <CategoryArt category={activity.category} icon={activity.icon} height={56} iconSize={24} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text variant="label" numberOfLines={1}>
            {L(activity.title, lang)}
          </Text>
          <Text variant="caption" muted numberOfLines={1}>
            {formatWhen(booking.start, lang)}
          </Text>
          <Text variant="caption" muted numberOfLines={1}>
            {L(venue.name, lang)} · {L(venue.district, lang)}
          </Text>
        </View>
        <Icon name="chevron-forward" size={18} color="textMuted" directional />
      </Row>
      <Row
        style={{
          marginTop: spacing[3],
          paddingTop: spacing[3],
          borderTopWidth: 1,
          borderTopColor: colors.border,
          justifyContent: 'space-between',
        }}>
        <Row gap={6}>
          <Icon name={status.icon} size={16} color={status.color} />
          <Text variant="caption" weight="semibold" style={{ color: status.color }}>
            {status.label}
          </Text>
        </Row>
        <Text variant="caption" muted>
          {booking.code} · {t('common.creditsCount', { count: booking.credits })}
        </Text>
      </Row>
    </Card>
  );
}

