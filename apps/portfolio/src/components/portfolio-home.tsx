'use client';

import { palette, radius, spacing, themes } from '@sahm/tokens';
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  FileText,
  Flame,
  Layers,
  MapPin,
  QrCode,
  Smartphone,
  Sparkles,
  Wand2,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

import { CANDIDATE } from '@/data/candidate';
import { CASE_STUDIES, PORTFOLIO_COPY } from '@/data/portfolio-data';

import { ExpoQrCode } from './expo-qr';
import { useLang } from './lang-provider';
import { Navbar } from './navbar';
import { PhoneSimulator } from './phone-simulator';

export function PortfolioHome() {
  const { lang, isRTL, t } = useLang();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  const [copiedTokens, setCopiedTokens] = useState(false);
  const [activeTokenBrand, setActiveTokenBrand] = useState<'nabd' | 'dar'>('nabd');
  const [expoUrl, setExpoUrl] = useState(CANDIDATE.demos.expoUrl);
  const [sampleChip, setSampleChip] = useState<'fitness' | 'wellness' | 'arts'>('wellness');

  const openCvDialog = () => dialogRef.current?.showModal();
  const closeCvDialog = () => dialogRef.current?.close();

  const copyCoverLetter = async () => {
    const text =
      lang === 'ar'
        ? `مرحبًا فريق أتلانتس للمقاولات ولينا آند لينو،\n\nأنا محمود محسن، مصمم UI/UX ومطور واجهات أمامية وتطبيقات جوال (خبرة في Mohr AI Solution وماجستير في علوم البيانات والذكاء الاصطناعي). قمت ببناء حزمة مشاريع مخصصة تحاكي منتجاتكم فعليًا: تطبيق نبض للجوال (Expo + TypeScript + محفظة رصيد + مسح QR + العربية RTL)، ومنصة دار بالذكاء الاصطناعي (Next.js + مصمم الغرف الذكي + متجر الأثاث + الحجوزات)، ولوحة شركاء نبض، ونظام تصميم سهم المشترك.\n\nالتواصل: ${CANDIDATE.email} | ${CANDIDATE.phone}`
        : `Hi Atlantis Contracting & Lina & Lino team,\n\nI'm Mahmoud Mohsen, a Mobile App UI/UX Designer & Front-End Developer (Mohr AI Solution, M.Sc. candidate in Data Science & AI). I built a tailored portfolio monorepo reflecting both of your products: Nabd (React Native + Expo SDK 58 lifestyle credit marketplace with mada checkout, map discovery, QR check-in, AI concierge & full Arabic RTL), Dar (Next.js 16 furniture e-commerce & interior platform with an interactive AI Room Designer and chatbot), Nabd Partner dashboard, and the shared Sahm Design System.\n\nContact: ${CANDIDATE.email} | ${CANDIDATE.phone}`;
    await navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const copyFigmaTokensJson = async () => {
    const figmaJson = JSON.stringify(
      {
        brand: activeTokenBrand,
        colors: activeTokenBrand === 'nabd' ? themes.nabd.light : themes.dar.light,
        radius,
        spacing,
      },
      null,
      2,
    );
    await navigator.clipboard?.writeText(figmaJson).catch(() => {});
    setCopiedTokens(true);
    setTimeout(() => setCopiedTokens(false), 2500);
  };

  const tokenSwatches =
    activeTokenBrand === 'nabd'
      ? [
          { name: 'coral.500', hex: palette.coral[500] },
          { name: 'indigo.800', hex: palette.indigo[800] },
          { name: 'indigo.900', hex: palette.indigo[900] },
          { name: 'mint.400', hex: palette.mint[400] },
          { name: 'gray.50', hex: palette.gray[50] },
        ]
      : [
          { name: 'terracotta.500', hex: palette.terracotta[500] },
          { name: 'sand.900', hex: palette.sand[900] },
          { name: 'sand.100', hex: palette.sand[100] },
          { name: 'olive.600', hex: palette.olive[600] },
          { name: 'sand.50', hex: palette.sand[50] },
        ];

  const primaryProjects = CASE_STUDIES.slice(0, 4);
  const bonusProject = CASE_STUDIES[4];

  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar onOpenCv={openCvDialog} />

      <main className="flex-1">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-5 pt-12 pb-16 sm:pt-18 sm:pb-22">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DFD0] bg-white px-4 py-1.5 text-xs font-semibold text-[#211A57] shadow-2xs">
            <Sparkles className="size-3.5 text-[#FF5A36]" />
            <span>{t(PORTFOLIO_COPY.hero.badge)}</span>
          </div>

          <h1 className="mt-6 max-w-4xl text-3xl font-bold tracking-tight text-[#100B2C] sm:text-5xl sm:leading-[1.2]">
            {t(PORTFOLIO_COPY.hero.title)}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#52525C] sm:text-lg">
            {t(PORTFOLIO_COPY.hero.sub)}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF5A36] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#E8431F] transition-colors"
            >
              <span>{t(PORTFOLIO_COPY.hero.ctaPrimary)}</span>
              <ArrowUpRight className={`size-4 ${isRTL ? '-scale-x-100' : ''}`} />
            </a>
            <a
              href="#matrix"
              className="inline-flex items-center gap-2 rounded-full border border-[#D9C9B1] bg-white px-6 py-3 text-sm font-semibold text-[#100B2C] hover:bg-[#F6F1EA] transition-colors"
            >
              <span>{t(PORTFOLIO_COPY.hero.ctaSecondary)}</span>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {PORTFOLIO_COPY.stats.map((s) => (
              <div
                key={s.value}
                className="rounded-2xl border border-[#E9DFD0] bg-white p-5 shadow-2xs"
              >
                <div className="text-2xl font-bold text-[#211A57] sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs font-medium text-[#52525C] sm:text-sm">
                  {t(s.label)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ROLE FIT MATRIX */}
        <section id="matrix" className="border-y border-[#E9DFD0] bg-white py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-[#100B2C] sm:text-3xl">
                {t(PORTFOLIO_COPY.roleMatrix.title)}
              </h2>
              <p className="mt-2 text-sm text-[#52525C] sm:text-base">
                {t(PORTFOLIO_COPY.roleMatrix.subtitle)}
              </p>
            </div>

            <div className="mt-8 grid gap-3">
              {PORTFOLIO_COPY.roleMatrix.rows.map((row, idx) => (
                <Link
                  key={idx}
                  href={row.slug}
                  className="group grid gap-3 rounded-2xl border border-[#E9DFD0] bg-[#FBF8F3] p-4 transition-colors hover:border-[#FF5A36] hover:bg-white sm:grid-cols-[1.2fr_1fr_auto] sm:items-center sm:px-6"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#16A34A]" />
                    <span className="text-sm font-semibold text-[#100B2C]">{t(row.req)}</span>
                  </div>
                  <div className="text-sm font-medium text-[#3A2F8A]">{t(row.proof)}</div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF5A36]">
                    <span>{lang === 'en' ? 'Inspect' : 'معاينة'}</span>
                    <ArrowUpRight className={`size-3.5 transition-transform group-hover:translate-x-0.5 ${isRTL ? '-scale-x-100' : ''}`} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section id="work" className="mx-auto max-w-6xl px-5 py-18">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#100B2C] sm:text-3xl">
                {lang === 'en' ? 'Spec Products & Case Studies' : 'المشاريع ودراسات الحالة'}
              </h2>
              <p className="mt-2 text-sm text-[#52525C] sm:text-base">
                {lang === 'en'
                  ? 'Four interconnected products plus a bonus Saudi UX audit tailored to Lina & Lino and Atlantis Contracting.'
                  : 'أربعة منتجات مترابطة مع دراسة تدقيق تجربة مستخدم مصممة للينا آند لينو وأتلانتس للمقاولات.'}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {primaryProjects.map((cs) => (
              <article
                key={cs.slug}
                className="flex flex-col justify-between rounded-3xl border border-[#E9DFD0] bg-white p-6 shadow-xs transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: cs.accent }}
                    >
                      {t(cs.category)}
                    </span>
                    <span className="text-xs font-medium text-[#71717E]">{t(cs.timeline)}</span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-[#100B2C]">{t(cs.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#52525C]">{t(cs.subtitle)}</p>

                  <ul className="mt-4 space-y-2">
                    {cs.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#3D3D45] sm:text-sm">
                        <span
                          className="mt-1.5 size-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: cs.accent }}
                        />
                        <span>{t(h)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {cs.stack.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-[#E9DFD0] bg-[#FBF8F3] px-2.5 py-1 text-[11px] font-medium text-[#3D3D45]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E9DFD0] pt-4">
                  <Link
                    href={`/work/${cs.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#211A57] hover:text-[#FF5A36] transition-colors"
                  >
                    <span>{lang === 'en' ? 'Read Full Case Study' : 'اقرأ دراسة الحالة كاملة'}</span>
                    <ArrowUpRight className={`size-4 ${isRTL ? '-scale-x-100' : ''}`} />
                  </Link>
                  {cs.demoUrl.startsWith('http') ? (
                    <a
                      href={cs.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#B5653A] hover:underline"
                    >
                      <span>{lang === 'en' ? 'Open Demo' : 'فتح العرض'}</span>
                      <ExternalLink className="size-3" />
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-[#71717E]" dir="ltr">
                      {cs.repoPath}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          {bonusProject && (
            <article className="mt-6 flex flex-col justify-between gap-4 rounded-3xl border border-[#211A57]/20 bg-white p-6 sm:flex-row sm:items-center">
              <div className="max-w-2xl">
                <span className="inline-flex items-center rounded-full bg-[#211A57] px-3 py-1 text-xs font-semibold text-white">
                  {t(bonusProject.category)}
                </span>
                <h3 className="mt-3 text-xl font-bold text-[#100B2C]">{t(bonusProject.title)}</h3>
                <p className="mt-1.5 text-sm text-[#52525C]">{t(bonusProject.subtitle)}</p>
              </div>
              <Link
                href={`/work/${bonusProject.slug}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#F6F1EA] px-5 py-3 text-sm font-semibold text-[#211A57] hover:bg-[#E9DFD0] transition-colors"
              >
                <span>{lang === 'en' ? 'View UX Audit' : 'عرض تدقيق التجربة'}</span>
                <ArrowUpRight className={`size-4 ${isRTL ? '-scale-x-100' : ''}`} />
              </Link>
            </article>
          )}
        </section>

        {/* MOBILE EXPO QR + INTERACTIVE PHONE SIMULATOR */}
        <section className="border-y border-[#E9DFD0] bg-[#211A57] py-16 text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#5EEAD4]">
                <Smartphone className="size-3.5" />
                <span>React Native + Expo SDK 58</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                {t(PORTFOLIO_COPY.mobilePreview.title)}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#D6D3EC] sm:text-base">
                {t(PORTFOLIO_COPY.mobilePreview.sub)}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-5">
                <ExpoQrCode url={expoUrl || CANDIDATE.demos.expoUrl} />
                <div className="flex-1 min-w-[200px] space-y-2">
                  <label htmlFor="expo-url-input" className="block text-xs font-medium text-[#ADA7D9]">
                    {t(PORTFOLIO_COPY.mobilePreview.scanLabel)}
                  </label>
                  <input
                    id="expo-url-input"
                    dir="ltr"
                    value={expoUrl}
                    onChange={(e) => setExpoUrl(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-white/50 focus:outline-2 focus:outline-[#5EEAD4]"
                  />
                  <p className="text-[11px] text-[#ADA7D9]">
                    {lang === 'en'
                      ? 'Scan with Expo Go or click through the live simulator preview on the right.'
                      : 'امسح الرمز عبر Expo Go أو جرّب الشاشات التفاعلية مباشرة هنا.'}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {CANDIDATE.demos.nabdWeb.startsWith('http') && (
                      <a
                        href={CANDIDATE.demos.nabdWeb}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5A36] px-3.5 py-1.5 text-[11px] font-semibold text-white hover:bg-[#E8431F]"
                      >
                        <span>{lang === 'en' ? 'Open Live Web App' : 'فتح نسخة الويب'}</span>
                        <ExternalLink className="size-3" />
                      </a>
                    )}
                    {CANDIDATE.demos.nabdApkUrl && (
                      <a
                        href={CANDIDATE.demos.nabdApkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold text-white hover:bg-white/20"
                      >
                        <span>{lang === 'en' ? 'Download Android APK' : 'تحميل ملف APK'}</span>
                        <ExternalLink className="size-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl bg-white/10 p-3">
                  <MapPin className="size-4 text-[#FF916F]" />
                  <div className="mt-2 font-semibold">{lang === 'en' ? 'Riyadh & Jeddah' : 'الرياض وجدة'}</div>
                  <div className="text-[#ADA7D9]">{lang === 'en' ? 'Map & Districts' : 'خريطة وأحياء'}</div>
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <QrCode className="size-4 text-[#5EEAD4]" />
                  <div className="mt-2 font-semibold">{lang === 'en' ? 'QR Check-in' : 'تذكرة QR'}</div>
                  <div className="text-[#ADA7D9]">{lang === 'en' ? 'Camera scanner' : 'ماسح الاستقبال'}</div>
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <Wand2 className="size-4 text-[#FF916F]" />
                  <div className="mt-2 font-semibold">{lang === 'en' ? 'Nabd AI' : 'نبض الذكي'}</div>
                  <div className="text-[#ADA7D9]">{lang === 'en' ? 'Bilingual picks' : 'اقتراحات فورية'}</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-6">
              <PhoneSimulator lang={lang} />
            </div>
          </div>
        </section>

        {/* DESIGN SYSTEM LIVE EXPLORER + COMPONENT PLAYGROUND */}
        <section id="design-system" className="mx-auto max-w-6xl px-5 py-18">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#B5653A]">
                <Layers className="size-4" />
                <span>@sahm/tokens</span>
              </div>
              <h2 className="mt-2 text-2xl font-bold text-[#100B2C] sm:text-3xl">
                {lang === 'en'
                  ? 'Sahm Bilingual Design System & Playground'
                  : 'نظام تصميم سهم ثنائي اللغة (معاينة حية)'}
              </h2>
              <p className="mt-2 text-sm text-[#52525C] sm:text-base">
                {lang === 'en'
                  ? 'Shared tokens powering React Native mobile components and Tailwind web surfaces — exportable directly as Figma Variables JSON.'
                  : 'رموز موحدة تغذي مكونات React Native وتطبيقات الويب — مع تصدير فوري لمتغيرات Figma.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-full border border-[#E9DFD0] bg-white p-1">
                <button
                  type="button"
                  onClick={() => setActiveTokenBrand('nabd')}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    activeTokenBrand === 'nabd' ? 'bg-[#211A57] text-white' : 'text-[#52525C]'
                  }`}
                >
                  {lang === 'en' ? 'Nabd Theme' : 'ثيم نبض'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTokenBrand('dar')}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    activeTokenBrand === 'dar' ? 'bg-[#B5653A] text-white' : 'text-[#52525C]'
                  }`}
                >
                  {lang === 'en' ? 'Dar Theme' : 'ثيم دار'}
                </button>
              </div>
              <button
                type="button"
                onClick={copyFigmaTokensJson}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#D9C9B1] bg-white px-4 py-2 text-xs font-semibold text-[#100B2C] hover:bg-[#F6F1EA] cursor-pointer"
              >
                {copiedTokens ? <Check className="size-3.5 text-[#16A34A]" /> : <Copy className="size-3.5 text-[#B5653A]" />}
                <span>
                  {copiedTokens
                    ? lang === 'en'
                      ? 'Tokens JSON Copied'
                      : 'تم نسخ الرموز'
                    : lang === 'en'
                      ? 'Copy Figma Tokens JSON'
                      : 'نسخ JSON لـ Figma'}
                </span>
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-5">
            {tokenSwatches.map((sw) => (
              <div key={sw.name} className="overflow-hidden rounded-2xl border border-[#E9DFD0] bg-white">
                <div className="h-20 w-full" style={{ backgroundColor: sw.hex }} />
                <div className="p-3">
                  <div className="text-xs font-bold text-[#100B2C]" dir="ltr">
                    {sw.name}
                  </div>
                  <div className="font-mono text-xs text-[#71717E]" dir="ltr">
                    {sw.hex}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Component Specimens */}
          <div className="mt-6 grid gap-6 rounded-3xl border border-[#E9DFD0] bg-white p-6 md:grid-cols-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#71717E]">
                {lang === 'en' ? 'Interactive Primitives (AR/EN RTL Ready)' : 'مكونات تفاعلية جاهزة للعربية'}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  className="rounded-full px-5 py-2.5 text-xs font-semibold text-white cursor-pointer"
                  style={{
                    backgroundColor:
                      activeTokenBrand === 'nabd' ? themes.nabd.light.primary : themes.dar.light.primary,
                  }}
                >
                  {lang === 'en' ? 'Primary CTA' : 'زر أساسي'}
                </button>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold"
                  style={{
                    backgroundColor:
                      activeTokenBrand === 'nabd' ? themes.nabd.light.surfaceAlt : themes.dar.light.surfaceAlt,
                    color:
                      activeTokenBrand === 'nabd' ? themes.nabd.light.primary : themes.dar.light.primary,
                  }}
                >
                  <Flame className="size-3.5" /> 6 {lang === 'en' ? 'credits' : 'رصيد'}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(['fitness', 'wellness', 'arts'] as const).map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setSampleChip(chip)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      sampleChip === chip
                        ? 'border-[#100B2C] bg-[#100B2C] text-white'
                        : 'border-[#E4E4E9] bg-[#F8F8FA] text-[#52525C]'
                    }`}
                  >
                    {lang === 'en'
                      ? { fitness: 'Fitness', wellness: 'Wellness', arts: 'Arts' }[chip]
                      : { fitness: 'لياقة', wellness: 'عافية', arts: 'فنون' }[chip]}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#FBF8F3] p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#71717E]">
                {lang === 'en' ? 'Arabic & Latin Type Harmony' : 'توافق خط IBM Plex Sans Arabic'}
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="text-lg font-bold text-[#100B2C]">
                  {lang === 'en'
                    ? 'One typography scale across Mobile & Web'
                    : 'سلم خطوط موحد بين تطبيق الجوال والويب'}
                </div>
                <div className="text-xs text-[#52525C]">
                  {lang === 'en'
                    ? 'Calibrated 1.25–1.7 line-height ratios keep Arabic ascenders/descenders crisp inside cards, pills, and navigation tabs.'
                    : 'نسب ارتفاع أسطر ١.٢٥–١.٧ مضبوطة لتظهر الحروف والتشكيل بوضوح داخل البطاقات والأزرار.'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW I WORK WITH AI + EXPERIENCE */}
        <section id="ai" className="border-t border-[#E9DFD0] bg-[#F6F1EA] py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-[#100B2C] sm:text-3xl">
                {t(PORTFOLIO_COPY.aiWorkflow.title)}
              </h2>
              <p className="mt-2 text-sm text-[#52525C] sm:text-base">
                {t(PORTFOLIO_COPY.aiWorkflow.sub)}
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {PORTFOLIO_COPY.aiWorkflow.steps.map((st) => (
                <div key={st.step} className="rounded-3xl border border-[#E9DFD0] bg-white p-6">
                  <span className="font-mono text-xs font-bold text-[#FF5A36]">{st.step}</span>
                  <h3 className="mt-3 text-lg font-bold text-[#100B2C]">{t(st.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#52525C]">{t(st.desc)}</p>
                </div>
              ))}
            </div>

            {/* Experience, Education & Prior Projects */}
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-[#E9DFD0] bg-white p-6">
                <h3 className="text-lg font-bold text-[#100B2C]">
                  {lang === 'en' ? 'Experience & AI Education' : 'الخبرة العملية والتعليم الأكاديمي'}
                </h3>
                {CANDIDATE.experience.map((exp) => (
                  <div key={exp.company} className="mt-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-bold text-[#211A57]">{t(exp.role)}</span>
                      <span className="text-xs font-medium text-[#71717E]">{t(exp.period)}</span>
                    </div>
                    <div className="text-xs font-semibold text-[#FF5A36]">{exp.company}</div>
                    <ul className="mt-2.5 list-disc ps-4 space-y-1.5 text-xs text-[#3D3D45]">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{t(b)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="mt-5 grid gap-2 border-t border-[#E9DFD0] pt-4">
                  {CANDIDATE.education.map((edu, i) => (
                    <div key={i} className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-bold text-[#100B2C]">{t(edu.degree)}</span> ·{' '}
                        <span className="text-[#52525C]">{t(edu.school)}</span>
                      </div>
                      <span className="text-[#71717E]">{t(edu.period)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[#E9DFD0] bg-white p-6">
                <h3 className="text-lg font-bold text-[#100B2C]">
                  {lang === 'en' ? 'Prior Technical Projects' : 'مشاريع تقنية سابقة'}
                </h3>
                <div className="mt-4 space-y-4">
                  {CANDIDATE.priorProjects.map((proj) => (
                    <div key={proj.title} className="rounded-2xl bg-[#FBF8F3] p-4">
                      <div className="text-sm font-bold text-[#100B2C]">{proj.title}</div>
                      <div className="mt-0.5 text-[11px] font-semibold text-[#B5653A]">{proj.stack}</div>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#52525C]">{t(proj.desc)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section id="contact" className="mx-auto max-w-6xl px-5 py-18">
          <div className="rounded-3xl bg-[#100B2C] p-8 text-white sm:p-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold sm:text-4xl">{t(PORTFOLIO_COPY.contact.title)}</h2>
              <p className="mt-3 text-sm text-[#D6D3EC] sm:text-base">
                {t(PORTFOLIO_COPY.contact.sub)}
              </p>
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#5EEAD4]" dir="ltr">
                <a href={`mailto:${CANDIDATE.email}`} className="hover:underline">
                  {CANDIDATE.email}
                </a>
                <span>·</span>
                <a href={CANDIDATE.telHref} className="hover:underline">
                  {CANDIDATE.phone}
                </a>
                <span>·</span>
                <a href={CANDIDATE.links.github} target="_blank" rel="noreferrer" className="hover:underline">
                  GitHub
                </a>
                <span>·</span>
                <a href={CANDIDATE.links.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                  LinkedIn
                </a>
                <span>·</span>
                <a href={CANDIDATE.links.behance} target="_blank" rel="noreferrer" className="hover:underline">
                  Behance
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={openCvDialog}
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF5A36] px-6 py-3 text-sm font-semibold text-white hover:bg-[#E8431F] transition-colors cursor-pointer"
                >
                  <FileText className="size-4" />
                  <span>{t(PORTFOLIO_COPY.contact.openCv)}</span>
                </button>
                <button
                  type="button"
                  onClick={copyCoverLetter}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <Copy className="size-4" />
                  <span>{copied ? t(PORTFOLIO_COPY.contact.copied) : t(PORTFOLIO_COPY.contact.emailBtn)}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E9DFD0] bg-white py-6 text-center text-xs text-[#71717E]">
        {lang === 'en'
          ? 'Built with Next.js 16, Tailwind CSS v4, Expo SDK 58 & @sahm/tokens · Bilingual AR/EN RTL'
          : 'مبني بـ Next.js 16 وTailwind CSS وExpo 58 وحزمة @sahm/tokens · دعم كامل للعربية RTL'}
      </footer>

      {/* Native <dialog> CV / Summary Modal */}
      <dialog ref={dialogRef} aria-labelledby="cv-dialog-title">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 border-b border-[#E9DFD0] pb-4">
            <div>
              <h2 id="cv-dialog-title" className="text-xl font-bold text-[#100B2C]">
                {t(CANDIDATE.name)} — {t(CANDIDATE.role)}
              </h2>
              <p className="mt-1 text-xs text-[#52525C]">{t(CANDIDATE.location)}</p>
            </div>
            <button
              type="button"
              onClick={closeCvDialog}
              aria-label="Close"
              className="rounded-full p-2 text-[#52525C] hover:bg-[#F6F1EA] cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="mt-5 space-y-4 text-sm text-[#3D3D45]">
            <div>
              <h3 className="font-bold text-[#100B2C]">
                {lang === 'en' ? 'Contact & Background' : 'التواصل والخلفية المهنية'}
              </h3>
              <p className="mt-1 text-xs text-[#52525C]" dir="ltr">
                {CANDIDATE.email} · {CANDIDATE.phone}
              </p>
              <p className="mt-2">
                {lang === 'en'
                  ? 'Mobile App & Front-End Software Engineer at Mohr AI Solution (Jan 2025–Present) · M.Sc. in Data Science & AI (Expected 2028) & B.Sc. Computer Science, Arab Open University · Technical Lead & UI/UX Coordinator, Robotics Club.'
                  : 'مهندس تطبيقات جوال وواجهات أمامية في Mohr AI Solution · ماجستير علوم البيانات والذكاء الاصطناعي وبكالوريوس علوم الحاسب في الجامعة العربية المفتوحة.'}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#100B2C]">
                {lang === 'en' ? 'Core Stack' : 'المهارات الأساسية'}
              </h3>
              <p className="mt-1">
                Figma (User Flows, Prototypes, Design Systems) · React Native, Expo SDK 58, Expo Router, TypeScript · Next.js 16, React 19, Tailwind CSS · Arabic/English RTL · Gemini AI Integration & AI Image UX · Moyasar/Apple Pay/mada Checkout Flows.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#100B2C]">
                {lang === 'en' ? 'Delivered Proof in This Monorepo' : 'المشاريع المسلمة في هذا المستودع'}
              </h3>
              <ul className="mt-1 list-disc ps-5 space-y-1">
                <li>apps/nabd-mobile — Lina & Lino style credit marketplace app</li>
                <li>apps/dar-web — Atlantis.sa style interiors, e-commerce & AI room designer</li>
                <li>apps/nabd-partner — Venue operations & QR check-in dashboard</li>
                <li>packages/tokens & packages/api — Shared Sahm AR/EN tokens & Supabase adapter</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-[#E9DFD0] pt-4">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full border border-[#211A57] px-5 py-2.5 text-xs font-semibold text-[#211A57] hover:bg-[#F6F1EA] cursor-pointer"
            >
              {lang === 'en' ? 'Print / Save PDF' : 'طباعة / حفظ PDF'}
            </button>
            <button
              type="button"
              onClick={copyCoverLetter}
              className="rounded-full bg-[#211A57] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#3A2F8A] cursor-pointer"
            >
              {copied ? t(PORTFOLIO_COPY.contact.copied) : t(PORTFOLIO_COPY.contact.emailBtn)}
            </button>
            <button
              type="button"
              onClick={closeCvDialog}
              className="rounded-full border border-[#E9DFD0] px-5 py-2.5 text-xs font-semibold text-[#100B2C] hover:bg-[#F6F1EA] cursor-pointer"
            >
              {lang === 'en' ? 'Close' : 'إغلاق'}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
