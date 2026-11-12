import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';

import { venueById } from '@/data/catalog';
import { formatTime, L, nextSlot, relativeDayLabel } from '@/lib/format';
import { useAppStore } from '@/store/app-store';
import { radius, spacing, useTheme } from '@/theme';
import { useDirection } from '@/theme/direction';
import type { Activity } from '@/types';

import { CategoryArt, Card, CreditPill, Row } from './ui';
import { Icon } from './ui/icon';
import { Text } from './ui/text';

export function ActivityCard({ activity, variant = 'wide' }: { activity: Activity; variant?: 'wide' | 'row' }) {
  const { t } = useTranslation();
  const { lang } = useDirection();
  const { colors } = useTheme();
  const venue = venueById(activity.venueId);
  const favorite = useAppStore((s) => s.favorites.includes(activity.id));
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const slot = nextSlot(activity);
  const open = () => router.push(`/activity/${activity.id}`);

  const when = slot
    ? `${relativeDayLabel(new Date(slot.start), lang, t)} · ${formatTime(new Date(slot.start), lang)}`
    : null;

  if (variant === 'row') {
    return (
      <Card onPress={open} padded={false} style={{ marginBottom: spacing[3] }}>
        <View style={styles.row}>
          <View style={styles.thumb}>
            <CategoryArt category={activity.category} icon={activity.icon} height={96} iconSize={34} rounded={radius.md} />
          </View>
          <View style={{ flex: 1, gap: 2, paddingVertical: spacing[3] }}>
            <Text variant="label" numberOfLines={1}>
              {L(activity.title, lang)}
            </Text>
            <Text variant="caption" muted numberOfLines={1}>
              {L(venue.name, lang)} · {L(venue.district, lang)}
            </Text>
            <Row gap={spacing[2]} style={{ marginTop: 4 }}>
              <CreditPill credits={activity.credits} />
              <Row gap={2}>
                <Icon name="star" size={12} color={colors.warning} />
                <Text variant="caption">{activity.rating.toFixed(1)}</Text>
              </Row>
              {when && (
                <Text variant="caption" muted numberOfLines={1} style={{ flexShrink: 1 }}>
                  {when}
                </Text>
              )}
            </Row>
          </View>
          <Pressable
            onPress={() => toggleFavorite(activity.id)}
            hitSlop={10}
            accessibilityLabel="favorite"
            style={{ padding: spacing[3], alignSelf: 'flex-start' }}>
            <Icon name={favorite ? 'heart' : 'heart-outline'} size={20} color={favorite ? colors.primary : colors.textMuted} />
          </Pressable>
        </View>
      </Card>
    );
  }

  return (
    <Card onPress={open} padded={false} style={{ width: 248 }}>
      <CategoryArt category={activity.category} icon={activity.icon} height={128}>
        <View style={styles.overlayTop}>
          {activity.womenOnly ? (
            <View style={styles.tag}>
              <Text variant="caption" style={{ color: '#fff' }}>
                {t('explore.womenOnly')}
              </Text>
            </View>
          ) : activity.family ? (
            <View style={styles.tag}>
              <Text variant="caption" style={{ color: '#fff' }}>
                {t('explore.family')}
              </Text>
            </View>
          ) : (
            <View />
          )}
          <Pressable onPress={() => toggleFavorite(activity.id)} hitSlop={10} accessibilityLabel="favorite" style={styles.fav}>
            <Icon name={favorite ? 'heart' : 'heart-outline'} size={18} color="#fff" />
          </Pressable>
        </View>
      </CategoryArt>
      <View style={{ padding: spacing[3], gap: 4 }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Text variant="label" numberOfLines={1} style={{ flex: 1 }}>
            {L(activity.title, lang)}
          </Text>
          <CreditPill credits={activity.credits} />
        </Row>
        <Text variant="caption" muted numberOfLines={1}>
          {L(venue.name, lang)} · {t(`common.${venue.city}`)}
        </Text>
        <Row gap={spacing[3]}>
          <Row gap={3}>
            <Icon name="star" size={12} color={colors.warning} />
            <Text variant="caption">
              {activity.rating.toFixed(1)} ({activity.reviews})
            </Text>
          </Row>
          {when && (
            <Row gap={3}>
              <Icon name="time-outline" size={12} color="textMuted" />
              <Text variant="caption" muted>
                {when}
              </Text>
            </Row>
          )}
        </Row>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing[3], alignItems: 'center', paddingStart: spacing[3] },
  thumb: { width: 84, borderRadius: radius.md, overflow: 'hidden' },
  overlayTop: {
    position: 'absolute',
    top: spacing[3],
    start: spacing[3],
    end: spacing[3],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: { backgroundColor: '#00000040', paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.full },
  fav: { backgroundColor: '#00000040', width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
});

