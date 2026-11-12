import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Linking, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Card, CategoryArt, CreditPill, EmptyState, IconButton, Row, Screen } from '@/components/ui';
import { activityById, venueById } from '@/data/catalog';
import { addDays, formatDay, formatTime, formatWhen, L, relativeDayLabel, slotsForDay, startOfDay } from '@/lib/format';
import { useAppStore } from '@/store/app-store';
import { radius, spacing, useTheme } from '@/theme';
import { useDirection } from '@/theme/direction';

export default function ActivityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { lang } = useDirection();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const activity = id ? activityById(id) : undefined;
  const credits = useAppStore((s) => s.credits);
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const book = useAppStore((s) => s.book);

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(startOfDay(new Date()), i)), []);
  const [dayIndex, setDayIndex] = useState(0);
  const slots = useMemo(
    () => (activity ? slotsForDay(activity, days[dayIndex]) : []),
    [activity, days, dayIndex],
  );
  const [selectedStart, setSelectedStart] = useState<string | null>(null);

  const activeSlot = slots.find((s) => s.start === selectedStart && s.spotsLeft > 0) ?? slots.find((s) => s.spotsLeft > 0);

  if (!activity) {
    return (
      <Screen>
        <EmptyState icon="alert-circle-outline" title="Not found" action={<Button title={t('common.back')} onPress={() => router.back()} />} />
      </Screen>
    );
  }

  const venue = venueById(activity.venueId);
  const isFav = favorites.includes(activity.id);

  const openDirections = () => {
    const url = Platform.select({
      ios: `https://maps.apple.com/?ll=${venue.lat},${venue.lng}&q=${encodeURIComponent(L(venue.name, lang))}`,
      default: `https://www.google.com/maps/search/?api=1&query=${venue.lat},${venue.lng}`,
    });
    Linking.openURL(url!).catch(() => {});
  };

  const confirmBook = () => {
    if (!activeSlot) return;
    if (credits < activity.credits) {
      Alert.alert(
        t('activity.notEnough'),
        t('activity.notEnoughSub', { need: activity.credits, have: credits }),
        [
          { text: t('common.cancel'), style: 'cancel' },
          { text: t('home.getPlan'), onPress: () => router.push('/plans') },
        ],
      );
      return;
    }

    const doBook = () => {
      const res = book(activity, activeSlot.start);
      if (!res.ok) {
        Alert.alert(
          res.reason === 'credits' ? t('activity.notEnough') : t('bookings.confirmed'),
          res.reason === 'credits' ? t('activity.notEnoughSub', { need: activity.credits, have: credits }) : undefined,
        );
        return;
      }
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      }
      router.replace(`/booking/${res.booking.id}`);
    };

    if (Platform.OS === 'web') {
      doBook();
      return;
    }

    Alert.alert(
      t('activity.confirmTitle'),
      t('activity.confirmBody', {
        title: L(activity.title, lang),
        when: formatWhen(activeSlot.start, lang),
        credits: activity.credits,
      }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('common.confirm'), onPress: doBook },
      ],
    );
  };

  return (
    <Screen
      padded={false}
      edges={['bottom']}
      footer={
        <Row style={{ justifyContent: 'space-between', gap: spacing[3] }}>
          <View>
            <Text variant="caption" muted>
              {t('home.balance')}: {t('common.creditsCount', { count: credits })}
            </Text>
            <Text variant="label">
              {activeSlot ? formatTime(new Date(activeSlot.start), lang) : t('activity.full')}
            </Text>
          </View>
          <Button
            title={t('activity.book', { count: activity.credits })}
            disabled={!activeSlot}
            onPress={confirmBook}
            style={{ flex: 1 }}
          />
        </Row>
      }>
      <View>
        <CategoryArt category={activity.category} icon={activity.icon} height={240} iconSize={88} />
        <Row
          style={{
            position: 'absolute',
            top: insets.top + spacing[2],
            start: spacing[5],
            end: spacing[5],
            justifyContent: 'space-between',
          }}>
          <IconButton icon="chevron-back" directional label={t('common.back')} variant="glass" onPress={() => router.back()} />
          <IconButton
            icon={isFav ? 'heart' : 'heart-outline'}
            label="favorite"
            variant="glass"
            onPress={() => toggleFavorite(activity.id)}
          />
        </Row>
      </View>

      <View style={{ padding: spacing[5], gap: spacing[5] }}>
        {/* Title + meta */}
        <View style={{ gap: spacing[2] }}>
          <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Text variant="h1" style={{ flex: 1 }}>
              {L(activity.title, lang)}
            </Text>
            <CreditPill credits={activity.credits} />
          </Row>
          <Text variant="bodySm" muted>
            {L(venue.name, lang)} · {L(venue.district, lang)} · {t(`common.${venue.city}`)}
          </Text>
          <Row gap={spacing[3]} style={{ flexWrap: 'wrap', marginTop: spacing[1] }}>
            <Row gap={4}>
              <Icon name="star" size={16} color={colors.warning} />
              <Text variant="label">{activity.rating.toFixed(1)}</Text>
              <Text variant="caption" muted>
                ({t('activity.reviews', { count: activity.reviews })})
              </Text>
            </Row>
            <Row gap={4}>
              <Icon name="time-outline" size={16} color="textMuted" />
              <Text variant="caption" muted>
                {t('common.minutes', { count: activity.durationMin })}
              </Text>
            </Row>
            <Row gap={4}>
              <Icon name="bar-chart-outline" size={16} color="textMuted" />
              <Text variant="caption" muted>
                {t(`activity.${activity.level}`)}
              </Text>
            </Row>
            {activity.womenOnly && (
              <View style={[styles.badge, { backgroundColor: colors.surfaceAlt }]}>
                <Text variant="caption" color="primary">
                  {t('explore.womenOnly')}
                </Text>
              </View>
            )}
            {activity.family && (
              <View style={[styles.badge, { backgroundColor: colors.surfaceAlt }]}>
                <Text variant="caption" color="primary">
                  {t('explore.family')}
                </Text>
              </View>
            )}
          </Row>
        </View>

        {/* Choose day */}
        <View style={{ gap: spacing[2] }}>
          <Text variant="h3">{t('activity.chooseDay')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing[2] }}>
            {days.map((d, idx) => {
              const active = idx === dayIndex;
              const available = slotsForDay(activity, d).some((s) => s.spotsLeft > 0);
              return (
                <Pressable
                  key={d.toISOString()}
                  onPress={() => {
                    setDayIndex(idx);
                    setSelectedStart(null);
                  }}
                  style={[
                    styles.dayBtn,
                    {
                      backgroundColor: active ? colors.secondary : colors.surface,
                      borderColor: active ? colors.secondary : colors.border,
                      opacity: available ? 1 : 0.45,
                    },
                  ]}>
                  <Text variant="caption" weight="semibold" style={{ color: active ? colors.background : colors.textMuted }}>
                    {relativeDayLabel(d, lang, t)}
                  </Text>
                  <Text variant="label" style={{ color: active ? colors.background : colors.text }}>
                    {formatDay(d, lang, { day: 'numeric', month: 'short' })}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Choose time */}
        <View style={{ gap: spacing[2] }}>
          <Text variant="h3">{t('activity.chooseTime')}</Text>
          {slots.length === 0 ? (
            <Text variant="bodySm" muted>
              {t('activity.full')}
            </Text>
          ) : (
            <Row style={{ flexWrap: 'wrap' }} gap={spacing[2]}>
              {slots.map((slot) => {
                const selected = activeSlot?.start === slot.start;
                const full = slot.spotsLeft === 0;
                return (
                  <Pressable
                    key={slot.start}
                    disabled={full}
                    onPress={() => setSelectedStart(slot.start)}
                    style={[
                      styles.slotBtn,
                      {
                        backgroundColor: selected ? colors.primary : colors.surface,
                        borderColor: selected ? colors.primary : colors.border,
                        opacity: full ? 0.4 : 1,
                      },
                    ]}>
                    <Text variant="label" style={{ color: selected ? '#fff' : colors.text }}>
                      {formatTime(new Date(slot.start), lang)}
                    </Text>
                    <Text variant="caption" style={{ color: selected ? '#ffffffdd' : colors.textMuted }}>
                      {full ? t('activity.full') : t('activity.spotsLeft', { count: slot.spotsLeft })}
                    </Text>
                  </Pressable>
                );
              })}
            </Row>
          )}
        </View>

        {/* About */}
        <View style={{ gap: spacing[2] }}>
          <Text variant="h3">{t('activity.about')}</Text>
          <Text muted>{L(activity.description, lang)}</Text>
        </View>

        {/* Venue */}
        <Card>
          <Row style={{ justifyContent: 'space-between' }}>
            <Row gap={spacing[3]} style={{ flex: 1 }}>
              <View style={[styles.venueIcon, { backgroundColor: colors.surfaceAlt }]}>
                <Icon name="location" size={22} color="primary" />
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="label">{L(venue.name, lang)}</Text>
                <Text variant="caption" muted>
                  {L(venue.district, lang)} · {t(`common.${venue.city}`)}
                </Text>
              </View>
            </Row>
            <Button title={t('activity.directions')} variant="outline" size="sm" onPress={openDirections} />
          </Row>
        </Card>

        {/* Cancel policy */}
        <Row gap={spacing[2]}>
          <Icon name="shield-checkmark-outline" size={18} color="success" />
          <Text variant="caption" muted style={{ flex: 1 }}>
            {t('activity.cancelPolicy')}
          </Text>
        </Row>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 2, borderRadius: radius.full },
  dayBtn: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2] + 2,
    borderRadius: radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 84,
  },
  slotBtn: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2] + 2,
    borderRadius: radius.lg,
    borderWidth: 1,
    minWidth: 112,
  },
  venueIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
});

