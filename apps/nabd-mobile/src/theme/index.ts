import { fontSize, radius, shadow, spacing, themes, type ThemeColors } from '@sahm/tokens';
import { Platform, useColorScheme, type ViewStyle } from 'react-native';

import { useAppStore } from '@/store/app-store';

export { fontSize, radius, spacing };
export type { ThemeColors };

export const fonts = {
  regular: 'IBMPlexSansArabic_400Regular',
  medium: 'IBMPlexSansArabic_500Medium',
  semibold: 'IBMPlexSansArabic_600SemiBold',
  bold: 'IBMPlexSansArabic_700Bold',
} as const;

export type FontWeightName = keyof typeof fonts;

export function useTheme() {
  const system = useColorScheme();
  const mode = useAppStore((s) => s.themeMode);
  const scheme: 'light' | 'dark' = mode === 'system' ? (system === 'dark' ? 'dark' : 'light') : mode;
  return { colors: themes.nabd[scheme], scheme, isDark: scheme === 'dark' };
}

export function elevation(level: keyof typeof shadow, isDark = false): ViewStyle {
  const s = shadow[level];
  if (isDark) return {};
  return Platform.select<ViewStyle>({
    android: { elevation: s.elevation },
    default: {
      shadowColor: s.color,
      shadowOpacity: s.opacity,
      shadowRadius: s.radius,
      shadowOffset: { width: 0, height: s.offsetY },
    },
  })!;
}

