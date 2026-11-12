import { createContext, useContext, useMemo, type PropsWithChildren } from 'react';
import { I18nManager, Platform } from 'react-native';

import type { Lang } from '@/types';

interface DirectionValue {
  lang: Lang;
  isRTL: boolean;
  dir: 'rtl' | 'ltr';
  /**
   * React Native's `textAlign: 'left'` is mirrored by the native layer when
   * I18nManager.isRTL is true. Because we switch direction at runtime (without an
   * app restart), we compute the correct physical value here.
   */
  textAlign: 'left' | 'right';
  /** Multiply horizontal translations / chevron icons by this. */
  flip: 1 | -1;
}

const DirectionContext = createContext<DirectionValue>({
  lang: 'en',
  isRTL: false,
  dir: 'ltr',
  textAlign: 'left',
  flip: 1,
});

export function DirectionProvider({ lang, children }: PropsWithChildren<{ lang: Lang }>) {
  const value = useMemo<DirectionValue>(() => {
    const isRTL = lang === 'ar';
    const nativeRTL = Platform.OS !== 'web' && I18nManager.isRTL;
    return {
      lang,
      isRTL,
      dir: isRTL ? 'rtl' : 'ltr',
      textAlign: isRTL !== nativeRTL ? 'right' : 'left',
      flip: isRTL ? -1 : 1,
    };
  }, [lang]);
  return <DirectionContext.Provider value={value}>{children}</DirectionContext.Provider>;
}

export const useDirection = () => useContext(DirectionContext);

