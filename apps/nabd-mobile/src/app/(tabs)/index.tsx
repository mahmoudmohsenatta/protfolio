import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ActivityCard } from '@/components/activity-card';
import { BookingCard } from '@/components/booking-card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Card, IconButton, Row, Screen, SectionHeader } from '@/components/ui';
import { ACTIVITIES, CATEGORIES, venueById } from '@/data/catalog';
import { formatDay, nextSlot } from '@/lib/format';
import { useAppStore, useUnreadCount } from '@/store/app-store';
import { radius, spacing, useTheme } from '@/theme';
import { useDirection } from '@/theme/direction';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { lang } = useDirection();
  const { colors } = useTheme();
  const user = useAppStore((s) => s.user);
  const city = useAppStore((s) => s.city);
  const setCity = useAppStore((s) => s.setCity);
  const credits = useAppStore((s) => s.credits);
  const planId = useAppStore((s) => s.planId);
  const renewsAt = useAppStore((s) => s.renewsAt);
  const interests = useAppStore((s) => s.interests);
  const bookings = useAppStore((s) => s.bookings);
  const unread = useUnreadCount();
  const [now] = useState(() => Date.now());

  const cityActivities = useMemo(
    () => ACTIVITIES.filter((a) => venueById(a.venueId).city === city),
    [city],
  );

  const forYou = useMemo(() => {
    const picked = cityActivities.filter((a) => interests.includes(a.category));
    return (picked.length ? picked : cityActivities).slice(0, 6);
  }, [cityActivities, interests]);

  const happeningToday = useMemo(
    () =>
      cityActivities
        .filter((a) => {
          const s = nextSlot(a);
          return s && new Date(s.start).toDateString() === new Date(now).toDateString();
        })
        .slice(0, 6),
    [cityActivities, now],
  );

  const nextBooking = useMemo(
    () =>
      bookings
        .filter((b) => b.status === 'confirmed' && new Date(b.start).getTime() > now)
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())[0],
    [bookings, now],
  );

  return (
    <Screen padded={false}>
      <View style={{ paddingHorizontal: spacing[5], gap: spacing[5] }}>
        {/* Header */}
        <Row style={{ justifyContent: 'space-between', paddingTop: spacing[2] }}>
          <View style={{ flex: 1 }}>
            <Text variant="h2">{t('home.greeting', { name: user?.name ?? '' })}</Text>
            <Text variant="bodySm" muted>
              {t('home.greetingSub')}
            </Text>
          </View>
          <Row gap={spacing[2]}>
            <Pressable
              onPress={() => setCity(city === 'riyadh' ? 'jeddah' : 'riyadh')}
              style={[styles.cityBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Icon name="location" size={15} color="primary" />
              <Text variant="caption" weight="semibold">
                {t(`common.${city}`)}
              </Text>
            </Pressable>
            <IconButton
              icon="notifications-outline"
              label={t('notifications.title')}
              badge={unread}
              onPress={() => router.push('/notifications')}
            />
          </Row>
        </Row>

        {/* Credit Balance Card */}
        <LinearGradient colors={['#211A57', '#3A2F8A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.walletCard}>
          <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View>
              <Text variant="caption" style={{ color: '#D6D3EC' }}>
                {t('home.balance')}
              </Text>
              <Row gap={spacing[2]} style={{ alignItems: 'baseline', marginTop: 2 }}>
                <Text variant="display" style={{ color: '#fff' }}>
                  {credits}
                </Text>
                <Text variant="body" style={{ color: '#D6D3EC' }}>
                  {t('common.credits')}
                </Text>
              </Row>
              <Text variant="caption" style={{ color: '#ADA7D9', marginTop: 2 }}>
                {planId && renewsAt
                  ? `${t(`plans.${planId}`)} · ${t('home.renews', { date: formatDay(new Date(renewsAt), lang) })}`
                  : t('home.noPlan')}
              </Text>
            </View>
            <View style={styles.sparkIcon}>
              <Icon name="flash" size={24} color="#5EEAD4" />
            </View>
          </Row>
          <Row gap={spacing[3]} style={{ marginTop: spacing[4] }}>
            <Button
              title={planId ? t('wallet.topUps') : t('home.getPlan')}
              size="sm"
              onPress={() => router.push(planId ? '/(tabs)/wallet' : '/plans')}
              style={{ flex: 1 }}
            />
            <Button
              title={t('home.topUp')}
              variant="outline"
              size="sm"
              onPress={() => router.push('/(tabs)/wallet')}
              style={{ flex: 1, borderColor: '#ffffff40' }}
            />
          </Row>
        </LinearGradient>

        {/* AI Concierge Prompt */}
        <Card
          onPress={() => router.push('/assistant')}
          style={{ backgroundColor: colors.surfaceAlt, borderColor: colors.primary + '30', borderWidth: 1 }}>
          <Row gap={spacing[3]}>
            <View style={[styles.aiBadge, { backgroundColor: colors.primary }]}>
              <Icon name="sparkles" size={20} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="label">{t('home.askAI')}</Text>
              <Text variant="caption" muted numberOfLines={1}>
                {t('home.askAISub')}
              </Text>
            </View>
            <Icon name="chevron-forward" size={18} color="primary" directional />
          </Row>
        </Card>

        {/* Upcoming booking */}
        {nextBooking && (
          <View>
            <SectionHeader title={t('home.upcoming')} action={t('common.seeAll')} onAction={() => router.push('/(tabs)/bookings')} />
            <BookingCard booking={nextBooking} />
          </View>
        )}

        {/* Categories */}
        <View>
          <SectionHeader title={t('home.categories')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing[3] }}>
            {CATEGORIES.map((c) => (
              <Pressable
                key={c.id}
                onPress={() => router.push({ pathname: '/(tabs)/explore', params: { category: c.id } })}
                style={{ alignItems: 'center', gap: spacing[2], width: 70 }}>
                <LinearGradient colors={c.color} style={styles.catCircle}>
                  <Icon name={c.icon} size={24} color="#fff" />
                </LinearGradient>
                <Text variant="caption" weight="medium" numberOfLines={1}>
                  {t(`categories.${c.id}`)}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Picked for you */}
      <View style={{ marginTop: spacing[6] }}>
        <View style={{ paddingHorizontal: spacing[5] }}>
          <SectionHeader
            title={t('home.forYou')}
            subtitle={t('home.forYouSub')}
            action={t('common.seeAll')}
            onAction={() => router.push('/(tabs)/explore')}
          />
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={forYou}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: spacing[5], gap: spacing[3] }}
          renderItem={({ item }) => <ActivityCard activity={item} />}
        />
      </View>

      {/* Happening today */}
      {happeningToday.length > 0 && (
        <View style={{ marginTop: spacing[6] }}>
          <View style={{ paddingHorizontal: spacing[5] }}>
            <SectionHeader
              title={t('home.today')}
              action={t('common.seeAll')}
              onAction={() => router.push('/(tabs)/explore')}
            />
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={happeningToday}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: spacing[5], gap: spacing[3] }}
            renderItem={({ item }) => <ActivityCard activity={item} />}
          />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  cityBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 44,
    paddingHorizontal: spacing[3],
    borderRadius: radius.full,
    borderWidth: 1,
  },
  walletCard: { borderRadius: radius.xl, padding: spacing[5] },
  sparkIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#ffffff18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiBadge: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  catCircle: { width: 58, height: 58, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
});
