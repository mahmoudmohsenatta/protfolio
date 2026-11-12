/**
 * Sahm Design Tokens
 * One source of truth for colors, type, spacing, radius and elevation,
 * consumed by React Native (Nabd) and Tailwind/Next.js (Dar, Partner, Portfolio).
 */

const palette = {
  // Nabd — energetic lifestyle brand
  coral: { 50: '#FFF1EC', 100: '#FFDCCF', 200: '#FFB79F', 300: '#FF916F', 400: '#FF7550', 500: '#FF5A36', 600: '#E8431F', 700: '#C13214', 800: '#8F2611', 900: '#5E1A0C' },
  indigo: { 50: '#EEEDF7', 100: '#D6D3EC', 200: '#ADA7D9', 300: '#7F77C2', 400: '#544AA6', 500: '#3A2F8A', 600: '#2B226E', 700: '#211A57', 800: '#1B1446', 900: '#100B2C' },
  mint: { 50: '#ECFDF9', 100: '#CCFBEF', 200: '#99F6E0', 300: '#5EEAD4', 400: '#2DD4BF', 500: '#14B8A6', 600: '#0D9488', 700: '#0F766E', 800: '#115E59', 900: '#134E4A' },
  // Dar — warm interior brand
  sand: { 50: '#FBF8F3', 100: '#F6F1EA', 200: '#E9DFD0', 300: '#D9C9B1', 400: '#C4AE8D', 500: '#AD9370', 600: '#8E7656', 700: '#6E5B43', 800: '#4D4030', 900: '#2E261D' },
  terracotta: { 50: '#FBF0EA', 100: '#F4D9CB', 200: '#E8B398', 300: '#D88C66', 400: '#C7764C', 500: '#B5653A', 600: '#97512D', 700: '#783F23', 800: '#592E1A', 900: '#3A1E11' },
  olive: { 50: '#F3F4EF', 100: '#E1E3D8', 200: '#C3C7B1', 300: '#A3A98A', 400: '#878E6C', 500: '#6B7350', 600: '#565C40', 700: '#424731', 800: '#2F3323', 900: '#1C1F15' },
  // Neutrals
  gray: { 0: '#FFFFFF', 50: '#F8F8FA', 100: '#F1F1F4', 200: '#E4E4E9', 300: '#CFCFD7', 400: '#A1A1AD', 500: '#71717E', 600: '#52525C', 700: '#3D3D45', 800: '#26262C', 900: '#16161A', 1000: '#0B0B0D' },
  // Semantic
  success: '#16A34A',
  warning: '#F59E0B',
  danger: '#DC2626',
  info: '#2563EB',
};

const themes = {
  nabd: {
    light: {
      background: palette.gray[50],
      surface: palette.gray[0],
      surfaceAlt: palette.coral[50],
      text: palette.indigo[900],
      textMuted: palette.gray[500],
      border: palette.gray[200],
      primary: palette.coral[500],
      primaryText: palette.gray[0],
      secondary: palette.indigo[800],
      accent: palette.mint[400],
      success: palette.success,
      warning: palette.warning,
      danger: palette.danger,
    },
    dark: {
      background: palette.indigo[900],
      surface: palette.indigo[800],
      surfaceAlt: palette.indigo[700],
      text: palette.gray[0],
      textMuted: palette.indigo[200],
      border: palette.indigo[700],
      primary: palette.coral[400],
      primaryText: palette.gray[0],
      secondary: palette.indigo[100],
      accent: palette.mint[300],
      success: '#22C55E',
      warning: '#FBBF24',
      danger: '#F87171',
    },
  },
  dar: {
    light: {
      background: palette.sand[50],
      surface: palette.gray[0],
      surfaceAlt: palette.sand[100],
      text: palette.sand[900],
      textMuted: palette.sand[700],
      border: palette.sand[200],
      primary: palette.terracotta[500],
      primaryText: palette.gray[0],
      secondary: palette.olive[600],
      accent: palette.sand[400],
      success: palette.success,
      warning: palette.warning,
      danger: palette.danger,
    },
  },
};

const fontFamily = {
  // IBM Plex Sans Arabic covers both Arabic and Latin glyphs — one family, two scripts.
  sans: 'IBMPlexSansArabic',
  display: 'IBMPlexSansArabic',
};

const fontSize = {
  xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30, '4xl': 36, '5xl': 48,
};

const lineHeight = {
  // Arabic needs more vertical room than Latin.
  tight: 1.25, normal: 1.5, relaxed: 1.7,
};

const fontWeight = { regular: '400', medium: '500', semibold: '600', bold: '700' };

const spacing = { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64 };

const radius = { none: 0, sm: 6, md: 10, lg: 16, xl: 24, full: 9999 };

const shadow = {
  sm: { color: '#100B2C', opacity: 0.06, radius: 4, offsetY: 1, elevation: 1 },
  md: { color: '#100B2C', opacity: 0.08, radius: 12, offsetY: 4, elevation: 4 },
  lg: { color: '#100B2C', opacity: 0.12, radius: 24, offsetY: 10, elevation: 10 },
};

module.exports = { palette, themes, fontFamily, fontSize, lineHeight, fontWeight, spacing, radius, shadow };

