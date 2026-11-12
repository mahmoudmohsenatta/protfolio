import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';

import { BookingCard } from '@/components/booking-card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { EmptyState, IconButton, Row, Screen, Segmented } from '@/components/ui';
import { useAppStore } from '@/store/app-store';
import { spacing } from '@/theme';

export default function BookingsScreen() {
  const { t } = useTranslation();
  const bookings = useAppStore((s) => s.bookings);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [now] = useState(() => Date.now());

  const items = useMemo(() => {
    return bookings
      .filter((b) => {
        const isUpcoming = b.status === 'confirmed' && new Date(b.start).getTime() >= now;
        return tab === 'upcoming' ? isUpcoming : !isUpcoming;
      })
      .sort((a, b) =>
        tab === 'upcoming'
          ? new Date(a.start).getTime() - new Date(b.start).getTime()
          : new Date(b.start).getTime() - new Date(a.start).getTime(),
      );
  }, [bookings, tab, now]);

  return (
    <Screen scroll={false} padded={false}>
      <View style={{ paddingHorizontal: spacing[5], gap: spacing[4], paddingBottom: spacing[4] }}>
        <Row style={{ justifyContent: 'space-between', paddingTop: spacing[2] }}>
          <Text variant="h1">{t('bookings.title')}</Text>
          <IconButton icon="qr-code-outline" label={t('scanner.title')} onPress={() => router.push('/scanner')} />
        </Row>
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { value: 'upcoming', label: t('bookings.upcoming') },
            { value: 'past', label: t('bookings.past') },
          ]}
        />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: spacing[5], paddingBottom: spacing[8] }}
        renderItem={({ item }) => <BookingCard booking={item} />}
        ListEmptyComponent={
          <EmptyState
            icon="calendar-outline"
            title={t('bookings.empty')}
            subtitle={t('bookings.emptySub')}
            action={
              <Button title={t('bookings.explore')} size="md" onPress={() => router.push('/(tabs)/explore')} />
            }
          />
        }
      />
    </Screen>
  );
}
