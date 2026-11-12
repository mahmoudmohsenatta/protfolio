import {
  IBMPlexSansArabic_400Regular,
  IBMPlexSansArabic_500Medium,
  IBMPlexSansArabic_600SemiBold,
  IBMPlexSansArabic_700Bold,
  useFonts,
} from '@expo-google-fonts/ibm-plex-sans-arabic';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DarkTheme, DefaultTheme, LocaleProvider, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, View } from 'react-native';

import { deviceLanguage } from '@/i18n';
import { useAppStore } from '@/store/app-store';
import { useTheme } from '@/theme';
import { DirectionProvider } from '@/theme/direction';
import type { Lang } from '@/types';

SplashScreen.preventAutoHideAsync().catch(() => {});

function AppShell() {
  const { i18n } = useTranslation();
  const storedLang = useAppStore((s) => s.lang);
  const hydrated = useAppStore((s) => s.hydrated);
  const { isDark, colors } = useTheme();
  const [fontsLoaded, fontError] = useFonts({
    IBMPlexSansArabic_400Regular,
    IBMPlexSansArabic_500Medium,
    IBMPlexSansArabic_600SemiBold,
    IBMPlexSansArabic_700Bold,
  });

  const lang: Lang = storedLang ?? (i18n.language === 'ar' ? 'ar' : deviceLanguage());
  const direction = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    if (storedLang && i18n.language !== storedLang) {
      i18n.changeLanguage(storedLang);
    }
  }, [storedLang, i18n]);

  useEffect(() => {
    if (hydrated && (fontsLoaded || fontError)) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [hydrated, fontsLoaded, fontError]);

  if (!hydrated || (!fontsLoaded && !fontError)) {
    return null;
  }

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
    },
  };

  return (
    <ThemeProvider value={navTheme}>
      <DirectionProvider lang={lang}>
        <LocaleProvider direction={direction}>
          <View
            style={{ flex: 1, backgroundColor: colors.background, direction }}
            {...(Platform.OS === 'web' ? ({ dir: direction } as Record<string, unknown>) : {})}>
            <StatusBar style={isDark ? 'light' : 'dark'} />
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="auth" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="activity/[id]" />
              <Stack.Screen name="booking/[id]" />
              <Stack.Screen name="plans" />
              <Stack.Screen name="checkout" />
              <Stack.Screen name="notifications" />
              <Stack.Screen name="assistant" />
              <Stack.Screen name="scanner" />
            </Stack>
          </View>
        </LocaleProvider>
      </DirectionProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
    </QueryClientProvider>
  );
}
