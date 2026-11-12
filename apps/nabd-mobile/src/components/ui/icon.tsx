import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import type { StyleProp, TextStyle } from 'react-native';

import { useTheme, type ThemeColors } from '@/theme';
import { useDirection } from '@/theme/direction';

export type IconName = ComponentProps<typeof Ionicons>['name'];

interface Props {
  name: IconName | (string & {});
  size?: number;
  color?: keyof ThemeColors | (string & {});
  /** Mirror the glyph in RTL (arrows, chevrons…). */
  directional?: boolean;
  style?: StyleProp<TextStyle>;
}

export function Icon({ name, size = 22, color = 'text', directional, style }: Props) {
  const { colors } = useTheme();
  const { isRTL } = useDirection();
  const c = (colors as unknown as Record<string, string>)[color] ?? color;
  return (
    <Ionicons
      name={name as IconName}
      size={size}
      color={c}
      style={[directional && isRTL ? { transform: [{ scaleX: -1 }] } : null, style]}
    />
  );
}

