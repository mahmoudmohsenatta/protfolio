type Scale = Record<number, string>;

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryText: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
}

export declare const palette: {
  coral: Scale;
  indigo: Scale;
  mint: Scale;
  sand: Scale;
  terracotta: Scale;
  olive: Scale;
  gray: Scale;
  success: string;
  warning: string;
  danger: string;
  info: string;
};

export declare const themes: {
  nabd: { light: ThemeColors; dark: ThemeColors };
  dar: { light: ThemeColors };
};

export declare const fontFamily: { sans: string; display: string };
export declare const fontSize: Record<'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl', number>;
export declare const lineHeight: Record<'tight' | 'normal' | 'relaxed', number>;
export declare const fontWeight: Record<'regular' | 'medium' | 'semibold' | 'bold', '400' | '500' | '600' | '700'>;
export declare const spacing: Record<0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16, number>;
export declare const radius: Record<'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full', number>;
export declare const shadow: Record<'sm' | 'md' | 'lg', { color: string; opacity: number; radius: number; offsetY: number; elevation: number }>;

