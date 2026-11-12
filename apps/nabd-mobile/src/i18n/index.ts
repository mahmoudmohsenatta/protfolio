import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import ar from './ar';
import en from './en';

export type Lang = 'en' | 'ar';

export const deviceLanguage = (): Lang =>
  getLocales()[0]?.languageCode === 'ar' ? 'ar' : 'en';

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ar: { translation: ar } },
  lng: deviceLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;

