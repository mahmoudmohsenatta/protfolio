import { LinearGradient } from 'expo-linear-gradient';
import type { PropsWithChildren, ReactNode } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { categoryMeta } from '@/data/catalog';
import { elevation, fonts, fontSize, radius, spacing, useTheme } from '@/theme';
import { useDirection } from '@/theme/direction';
import type { CategoryId } from '@/types';

import { Icon, type IconName } from './icon';
import { Text } from './text';

/* ----------------------------------------------------------------------------
 * Card
 * --------------------------------------------------------------------------*/
export function Card({
  children,
  onPress,
  style,
  padded = true,
}: PropsWithChildren<{ onPress?: () => void; style?: StyleProp<ViewStyle>; padded?: boolean }>) {
  const { colors, isDark } = useTheme();
  const base: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderRadius: radius.lg,
      padding: padded ? spacing[4] : 0,
      borderWidth: isDark ? 1 : 0,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    elevation('md', isDark),
  ];
  if (!onPress) return <View style={[base, style]}>{children}</View>;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [base, { transform: [{ scale: pressed ? 0.985 : 1 }] }, style]}>
      {children}
    </Pressable>
  );
}

/* ----------------------------------------------------------------------------
 * Chip
 * --------------------------------------------------------------------------*/
export function Chip({
  label,
  selected,
  onPress,
  icon,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: IconName;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected ? colors.secondary : colors.surface,
          borderColor: selected ? colors.secondary : colors.border,
          opacity: pressed ? 0.8 : 1,
        },
      ]}>
      {icon && <Icon name={icon} size={16} color={selected ? colors.background : colors.text} />}
      <Text variant="caption" weight="semibold" style={{ color: selected ? colors.background : colors.text }}>
        {label}
      </Text>
    </Pressable>
  );
}

/* ----------------------------------------------------------------------------
 * Segmented control
 * --------------------------------------------------------------------------*/
export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string; icon?: IconName }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const { colors } = useTheme();
  return (
    <View style={[styles.segmented, { backgroundColor: colors.surfaceAlt }]}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(o.value)}
            style={[styles.segment, active && { backgroundColor: colors.surface }, active && elevation('sm')]}>
            {o.icon && <Icon name={o.icon} size={16} color={active ? 'text' : 'textMuted'} />}
            <Text variant="caption" weight="semibold" color={active ? 'text' : 'textMuted'}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/* ----------------------------------------------------------------------------
 * Input
 * --------------------------------------------------------------------------*/
export function Input({
  icon,
  style,
  containerStyle,
  ...props
}: TextInputProps & { icon?: IconName; containerStyle?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  const { textAlign, dir } = useDirection();
  return (
    <View style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border }, containerStyle]}>
      {icon && <Icon name={icon} size={20} color="textMuted" />}
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[
          {
            flex: 1,
            color: colors.text,
            fontFamily: fonts.regular,
            fontSize: fontSize.base,
            textAlign,
            writingDirection: dir,
            paddingVertical: 0,
          },
          style,
        ]}
        {...props}
      />
    </View>
  );
}

/* ----------------------------------------------------------------------------
 * Section header
 * --------------------------------------------------------------------------*/
export function SectionHeader({
  title,
  subtitle,
  action,
  onAction,
}: {
  title: string;
  subtitle?: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={{ flex: 1 }}>
        <Text variant="h3">{title}</Text>
        {subtitle && (
          <Text variant="bodySm" muted>
            {subtitle}
          </Text>
        )}
      </View>
      {action && (
        <Pressable onPress={onAction} hitSlop={8} accessibilityRole="link">
          <Text variant="label" color="primary">
            {action}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

/* ----------------------------------------------------------------------------
 * Category artwork (gradient + glyph) used in place of photography
 * --------------------------------------------------------------------------*/
export function CategoryArt({
  category,
  icon,
  height = 140,
  iconSize = 56,
  rounded = 0,
  children,
}: PropsWithChildren<{ category: CategoryId; icon?: string; height?: number; iconSize?: number; rounded?: number }>) {
  const meta = categoryMeta(category);
  return (
    <LinearGradient
      colors={meta.color}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ height, borderRadius: rounded, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
      <View style={[StyleSheet.absoluteFill, { opacity: 0.12 }]}>
        <Icon name={meta.icon} size={height * 1.1} color="#fff" style={{ position: 'absolute', end: -height * 0.25, top: -height * 0.15 }} />
      </View>
      <Icon name={icon ?? meta.icon} size={iconSize} color="#ffffffee" />
      {children}
    </LinearGradient>
  );
}

/* ----------------------------------------------------------------------------
 * Credit pill
 * --------------------------------------------------------------------------*/
export function CreditPill({ credits, inverted }: { credits: number; inverted?: boolean }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.pill, { backgroundColor: inverted ? '#ffffff26' : colors.surfaceAlt }]}>
      <Icon name="flash" size={13} color={inverted ? '#fff' : colors.primary} />
      <Text variant="caption" weight="bold" style={{ color: inverted ? '#fff' : colors.primary }}>
        {credits}
      </Text>
    </View>
  );
}

/* ----------------------------------------------------------------------------
 * Empty state
 * --------------------------------------------------------------------------*/
export function EmptyState({
  icon,
  title,
  subtitle,
  action,
}: {
  icon: IconName;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.empty}>
      <View style={[styles.emptyIcon, { backgroundColor: colors.surfaceAlt }]}>
        <Icon name={icon} size={36} color="primary" />
      </View>
      <Text variant="h3" center>
        {title}
      </Text>
      {subtitle && (
        <Text variant="bodySm" muted center style={{ maxWidth: 280 }}>
          {subtitle}
        </Text>
      )}
      {action}
    </View>
  );
}

/* ----------------------------------------------------------------------------
 * Screen + header
 * --------------------------------------------------------------------------*/
export function Screen({
  children,
  scroll = true,
  padded = true,
  edges = ['top'],
  contentStyle,
  footer,
}: PropsWithChildren<{
  scroll?: boolean;
  padded?: boolean;
  edges?: ('top' | 'bottom')[];
  contentStyle?: StyleProp<ViewStyle>;
  footer?: ReactNode;
}>) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const pad: ViewStyle = {
    paddingTop: edges.includes('top') ? insets.top + spacing[2] : 0,
    paddingBottom: edges.includes('bottom') ? insets.bottom + spacing[4] : spacing[8],
    paddingHorizontal: padded ? spacing[5] : 0,
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={[pad, contentStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1 }, pad, contentStyle]}>{children}</View>
      )}
      {footer && (
        <View
          style={{
            paddingHorizontal: spacing[5],
            paddingTop: spacing[3],
            paddingBottom: insets.bottom + spacing[3],
            backgroundColor: colors.surface,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: colors.border,
          }}>
          {footer}
        </View>
      )}
    </View>
  );
}

export function Header({ title, right, onBack }: { title?: string; right?: ReactNode; onBack?: () => void }) {
  return (
    <View style={styles.header}>
      <IconButton icon="chevron-back" directional label="Back" onPress={onBack ?? (() => (router.canGoBack() ? router.back() : router.replace('/')))} />
      <Text variant="h3" style={{ flex: 1, textAlign: 'center' }} numberOfLines={1}>
        {title ?? ''}
      </Text>
      <View style={{ minWidth: 44, alignItems: 'flex-end' }}>{right}</View>
    </View>
  );
}

export function IconButton({
  icon,
  onPress,
  label,
  directional,
  badge,
  variant = 'surface',
}: {
  icon: IconName;
  onPress?: () => void;
  label: string;
  directional?: boolean;
  badge?: number;
  variant?: 'surface' | 'glass';
}) {
  const { colors, isDark } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [
        styles.iconBtn,
        variant === 'glass'
          ? { backgroundColor: '#00000040' }
          : [{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: isDark ? 1 : 0 }, elevation('sm', isDark)],
        { opacity: pressed ? 0.7 : 1 },
      ]}>
      <Icon name={icon} size={20} color={variant === 'glass' ? '#fff' : 'text'} directional={directional} />
      {!!badge && (
        <View style={[styles.badge, { backgroundColor: colors.primary, borderColor: colors.background }]}>
          <Text variant="caption" style={{ color: '#fff', fontSize: 10, lineHeight: 14 }}>
            {badge > 9 ? '9+' : badge}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export const Row = ({ children, style, gap = spacing[2] }: PropsWithChildren<{ style?: StyleProp<ViewStyle>; gap?: number }>) => (
  <View style={[{ flexDirection: 'row', alignItems: 'center', gap }, style]}>{children}</View>
);

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[3] + 2,
    height: 36,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  segmented: { flexDirection: 'row', padding: 4, borderRadius: radius.full },
  segment: {
    flex: 1,
    height: 36,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    height: 52,
    paddingHorizontal: spacing[4],
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: spacing[3], gap: spacing[3] },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.full },
  empty: { alignItems: 'center', gap: spacing[3], paddingVertical: spacing[12], paddingHorizontal: spacing[6] },
  emptyIcon: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: spacing[2] },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], marginBottom: spacing[4] },
  iconBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  badge: {
    position: 'absolute',
    top: -2,
    end: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 2,
  },
});

