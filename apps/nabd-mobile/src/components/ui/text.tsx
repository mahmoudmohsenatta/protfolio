import { Platform, Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';

import { fonts, fontSize, useTheme, type FontWeightName, type ThemeColors } from '@/theme';
import { useDirection } from '@/theme/direction';

type Variant = 'display' | 'h1' | 'h2' | 'h3' | 'body' | 'bodySm' | 'caption' | 'label';

const variants: Record<Variant, { size: number; weight: FontWeightName; lh: number }> = {
  display: { size: fontSize['4xl'], weight: 'bold', lh: 1.25 },
  h1: { size: fontSize['3xl'], weight: 'bold', lh: 1.3 },
  h2: { size: fontSize['2xl'], weight: 'bold', lh: 1.35 },
  h3: { size: fontSize.lg, weight: 'semibold', lh: 1.4 },
  body: { size: fontSize.base, weight: 'regular', lh: 1.55 },
  bodySm: { size: fontSize.sm, weight: 'regular', lh: 1.55 },
  caption: { size: fontSize.xs, weight: 'medium', lh: 1.5 },
  label: { size: fontSize.sm, weight: 'semibold', lh: 1.4 },
};

export interface TextProps extends RNTextProps {
  variant?: Variant;
  weight?: FontWeightName;
  color?: keyof ThemeColors | (string & {});
  muted?: boolean;
  center?: boolean;
  dir?: 'ltr' | 'rtl';
}

export function Text({ variant = 'body', weight, color, muted, center, dir: dirOverride, style, ...rest }: TextProps) {
  const { colors } = useTheme();
  const { textAlign, dir, lang } = useDirection();
  const v = variants[variant];
  const resolvedColor = color
    ? ((colors as unknown as Record<string, string>)[color] ?? color)
    : muted
      ? colors.textMuted
      : colors.text;

  const writingDirection = dirOverride ?? dir;
  const resolvedAlign: TextStyle['textAlign'] = center
    ? 'center'
    : Platform.OS !== 'web'
      ? textAlign
      : undefined;

  const base: TextStyle = {
    fontFamily: fonts[weight ?? v.weight],
    fontSize: v.size,
    lineHeight: Math.round(v.size * v.lh),
    color: resolvedColor,
    writingDirection,
    ...(resolvedAlign ? { textAlign: resolvedAlign } : {}),
  };

  return (
    <RNText
      {...(Platform.OS === 'web' ? ({ lang, dir: writingDirection } as Record<string, unknown>) : {})}
      style={[base, style]}
      {...rest}
    />
  );
}

