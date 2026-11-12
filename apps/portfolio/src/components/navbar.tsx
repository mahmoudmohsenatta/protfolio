'use client';

import { Languages, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { PORTFOLIO_COPY } from '@/data/portfolio-data';

import { useLang } from './lang-provider';

export function Navbar({ onOpenCv }: { onOpenCv?: () => void }) {
  const { lang, toggle, t } = useLang();

  return (
    <header className="sticky top-0 z-40 border-b border-[#E9DFD0] bg-[#FBF8F3]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-[#100B2C]">
          <span className="grid size-9 place-items-center rounded-xl bg-[#211A57] text-white">
            <Sparkles className="size-4 text-[#5EEAD4]" />
          </span>
          <span className="text-sm sm:text-base">{t(PORTFOLIO_COPY.brand)}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[#52525C] md:flex">
          <Link href="/#work" className="hover:text-[#100B2C] transition-colors">
            {t(PORTFOLIO_COPY.nav.work)}
          </Link>
          <Link href="/#matrix" className="hover:text-[#100B2C] transition-colors">
            {t(PORTFOLIO_COPY.nav.matrix)}
          </Link>
          <Link href="/#ai" className="hover:text-[#100B2C] transition-colors">
            {t(PORTFOLIO_COPY.nav.ai)}
          </Link>
          <Link href="/#design-system" className="hover:text-[#100B2C] transition-colors">
            {t(PORTFOLIO_COPY.nav.design)}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E9DFD0] bg-white px-3.5 py-2 text-xs font-semibold text-[#100B2C] shadow-xs hover:bg-[#F6F1EA] transition-colors cursor-pointer"
            aria-label="Toggle Arabic RTL or English LTR"
          >
            <Languages className="size-3.5 text-[#FF5A36]" />
            <span>{lang === 'en' ? 'العربية (RTL)' : 'English (LTR)'}</span>
          </button>

          {onOpenCv ? (
            <button
              type="button"
              onClick={onOpenCv}
              className="rounded-full bg-[#211A57] px-4 py-2 text-xs font-semibold text-white hover:bg-[#3A2F8A] transition-colors cursor-pointer"
            >
              {t(PORTFOLIO_COPY.nav.contact)}
            </button>
          ) : (
            <Link
              href="/#contact"
              className="rounded-full bg-[#211A57] px-4 py-2 text-xs font-semibold text-white hover:bg-[#3A2F8A] transition-colors"
            >
              {t(PORTFOLIO_COPY.nav.contact)}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

