import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { radius, spacing, useTheme } from '@/theme';

import { EmptyState } from './ui';

/** Web fallback; native renders `ActivityMap` from `map-view.native.tsx`. */
export function ActivityMapWebFallback() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, margin: spacing[5], borderRadius: radius.lg, backgroundColor: colors.surface, justifyContent: 'center' }}>
      <EmptyState icon="map-outline" title={t('explore.map')} subtitle={t('explore.mapWeb')} />
    </View>
  );
}

