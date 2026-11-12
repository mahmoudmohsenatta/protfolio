'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import type { Lang, Localized } from '@/data/portfolio-data';

interface LangCtx {
  lang: Lang;
  isRTL: boolean;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (v: Localized) => string;
}

const Ctx = createContext<LangCtx>({
  lang: 'en',
  isRTL: false,
  setLang: () => {},
  toggle: () => {},
  t: (v) => v.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem('portfolio-lang');
    if (saved === 'ar' || saved === 'en') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    window.localStorage.setItem('portfolio-lang', lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState((p) => (p === 'en' ? 'ar' : 'en'));
  const t = (v: Localized) => v[lang];

  return (
    <Ctx.Provider value={{ lang, isRTL: lang === 'ar', setLang, toggle, t }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);

