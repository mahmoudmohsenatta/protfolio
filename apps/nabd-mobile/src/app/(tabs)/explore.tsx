import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ActivityCard } from '@/components/activity-card';
import { ActivityMap } from '@/components/map-view';
import { ActivityMapWebFallback } from '@/components/map-view.web';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Chip, EmptyState, IconButton, Input, Row, Screen, Segmented } from '@/components/ui';
import { ACTIVITIES, CATEGORIES, venueById } from '@/data/catalog';
import { L, timeOfDay } from '@/lib/format';
import { useAppStore } from '@/store/app-store';
import { radius, spacing, useTheme } from '@/theme';
import type { CategoryId, City } from '@/types';

export default function ExploreScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ category?: string }>();
  const defaultCity = useAppStore((s) => s.city);

  const [query, setQuery] = useState('');
  const initialCategory =
    params.category && CATEGORIES.some((c) => c.id === params.category)
      ? (params.category as CategoryId)
      : 'all';
  const [category, setCategory] = useState<CategoryId | 'all'>(initialCategory);
  const [prevParamCat, setPrevParamCat] = useState(params.category);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [city, setCity] = useState<City | 'all'>(defaultCity);
  const [maxCredits, setMaxCredits] = useState<number | null>(null);
  const [timeBucket, setTimeBucket] = useState<'morning' | 'afternoon' | 'evening' | null>(null);
  const [womenOnly, setWomenOnly] = useState(false);
  const [family, setFamily] = useState(false);

  if (params.category !== prevParamCat) {
    setPrevParamCat(params.category);
    if (params.category && CATEGORIES.some((c) => c.id === params.category)) {
      setCategory(params.category as CategoryId);
    }
  }

  const activeFilterCount =
    (city !== defaultCity ? 1 : 0) +
    (maxCredits !== null ? 1 : 0) +
    (timeBucket !== null ? 1 : 0) +
    (womenOnly ? 1 : 0) +
    (family ? 1 : 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ACTIVITIES.filter((a) => {
      if (category !== 'all' && a.category !== category) return false;
      const v = venueById(a.venueId);
      if (city !== 'all' && v.city !== city) return false;
      if (maxCredits !== null && a.credits > maxCredits) return false;
      if (womenOnly && !a.womenOnly) return false;
      if (family && !a.family) return false;
      if (timeBucket && !a.times.some((tm) => timeOfDay(tm) === timeBucket)) return false;
      if (q) {
        const hay = `${L(a.title, 'en')} ${L(a.title, 'ar')} ${L(v.name, 'en')} ${L(v.name, 'ar')} ${L(v.district, 'en')} ${L(v.district, 'ar')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [category, city, family, maxCredits, query, timeBucket, womenOnly]);

  const resetFilters = () => {
    setCity(defaultCity);
    setMaxCredits(null);
    setTimeBucket(null);
    setWomenOnly(false);
    setFamily(false);
  };

  return (
    <Screen scroll={false} padded={false}>
      <View style={{ paddingHorizontal: spacing[5], gap: spacing[3], paddingBottom: spacing[3] }}>
        <Row style={{ justifyContent: 'space-between', paddingTop: spacing[2] }}>
          <Text variant="h1">{t('explore.title')}</Text>
          <View style={{ width: 152 }}>
            <Segmented
              value={viewMode}
              onChange={setViewMode}
              options={[
                { value: 'list', label: t('explore.list'), icon: 'list' },
                { value: 'map', label: t('explore.map'), icon: 'map' },
              ]}
            />
          </View>
        </Row>

        <Row gap={spacing[2]}>
          <Input
            containerStyle={{ flex: 1, height: 46 }}
            icon="search"
            value={query}
            onChangeText={setQuery}
            placeholder={t('explore.search')}
          />
          <IconButton
            icon="options-outline"
            label={t('explore.filters')}
            badge={activeFilterCount}
            onPress={() => setFiltersOpen(true)}
          />
        </Row>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing[2] }}>
          <Chip label={t('common.all')} selected={category === 'all'} onPress={() => setCategory('all')} />
          {CATEGORIES.map((c) => (
            <Chip
              key={c.id}
              label={t(`categories.${c.id}`)}
              icon={c.icon as never}
              selected={category === c.id}
              onPress={() => setCategory(c.id)}
            />
          ))}
        </ScrollView>

        <Text variant="caption" muted>
          {t('explore.results', { count: filtered.length })}
        </Text>
      </View>

      {viewMode === 'map' ? (
        <View style={{ flex: 1 }}>
          {Platform.OS === 'web' ? <ActivityMapWebFallback /> : <ActivityMap activities={filtered} />}
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: spacing[5], paddingBottom: spacing[8] }}
          renderItem={({ item }) => <ActivityCard activity={item} variant="row" />}
          ListEmptyComponent={
            <EmptyState
              icon="search-outline"
              title={t('explore.noResults')}
              subtitle={t('explore.noResultsSub')}
              action={<Button title={t('explore.reset')} variant="outline" size="md" onPress={() => { setCategory('all'); setQuery(''); resetFilters(); }} />}
            />
          }
        />
      )}

      <Modal visible={filtersOpen} animationType="slide" transparent onRequestClose={() => setFiltersOpen(false)}>
        <View style={styles.backdrop}>
          <Pressable style={{ flex: 1 }} onPress={() => setFiltersOpen(false)} />
          <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
            <Row style={{ justifyContent: 'space-between', marginBottom: spacing[4] }}>
              <Text variant="h2">{t('explore.filters')}</Text>
              <Pressable onPress={resetFilters}>
                <Text variant="label" color="primary">
                  {t('explore.reset')}
                </Text>
              </Pressable>
            </Row>

            <View style={{ gap: spacing[5] }}>
              <View style={{ gap: spacing[2] }}>
                <Text variant="label">{t('explore.city')}</Text>
                <Row>
                  {(['all', 'riyadh', 'jeddah'] as const).map((c) => (
                    <Chip key={c} label={t(`common.${c}`)} selected={city === c} onPress={() => setCity(c)} />
                  ))}
                </Row>
              </View>

              <View style={{ gap: spacing[2] }}>
                <Text variant="label">{t('explore.maxCredits')}</Text>
                <Row>
                  {[null, 5, 8, 12].map((v) => (
                    <Chip
                      key={String(v)}
                      label={v === null ? t('common.all') : `≤ ${v}`}
                      selected={maxCredits === v}
                      onPress={() => setMaxCredits(v)}
                    />
                  ))}
                </Row>
              </View>

              <View style={{ gap: spacing[2] }}>
                <Text variant="label">{t('explore.timeOfDay')}</Text>
                <Row style={{ flexWrap: 'wrap' }}>
                  {([null, 'morning', 'afternoon', 'evening'] as const).map((b) => (
                    <Chip
                      key={String(b)}
                      label={b === null ? t('common.all') : t(`explore.${b}`)}
                      selected={timeBucket === b}
                      onPress={() => setTimeBucket(b)}
                    />
                  ))}
                </Row>
              </View>

              <Row style={{ flexWrap: 'wrap' }}>
                <Chip label={t('explore.womenOnly')} selected={womenOnly} onPress={() => setWomenOnly(!womenOnly)} />
                <Chip label={t('explore.family')} selected={family} onPress={() => setFamily(!family)} />
              </Row>

              <Button
                title={t('explore.apply')}
                full
                onPress={() => setFiltersOpen(false)}
                icon="checkmark"
              />
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#00000066', justifyContent: 'flex-end' },
  sheet: {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing[6],
    paddingBottom: spacing[10],
  },
});
