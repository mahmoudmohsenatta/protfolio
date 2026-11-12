'use client';

import { ArrowLeft, CheckCircle2, ExternalLink, Layers, Sparkles } from 'lucide-react';
import Link from 'next/link';

import type { CaseStudy } from '@/data/portfolio-data';

import { useLang } from './lang-provider';
import { Navbar } from './navbar';

export function CaseStudyView({ study }: { study: CaseStudy }) {
  const { lang, isRTL, t } = useLang();

  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10 sm:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#52525C] hover:text-[#100B2C]"
        >
          <ArrowLeft className={`size-4 ${isRTL ? '-scale-x-100' : ''}`} />
          <span>{lang === 'en' ? 'Back to Portfolio' : 'العودة لملف الأعمال'}</span>
        </Link>

        <div className="mt-6">
          <span
            className="inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: study.accent }}
          >
            {t(study.category)}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-[#100B2C] sm:text-4xl">{t(study.title)}</h1>
          <p className="mt-3 text-base leading-relaxed text-[#52525C] sm:text-lg">
            {t(study.subtitle)}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {study.demoUrl.startsWith('http') ? (
              <a
                href={study.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#211A57] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#3A2F8A]"
              >
                <span>{lang === 'en' ? 'Launch Live Demo' : 'تشغيل العرض الحي'}</span>
                <ExternalLink className="size-3.5" />
              </a>
            ) : (
              <Link
                href={study.demoUrl}
                className="inline-flex items-center gap-2 rounded-full bg-[#211A57] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#3A2F8A]"
              >
                <span>{lang === 'en' ? 'Explore Interactive Preview' : 'استكشف المعاينة التفاعلية'}</span>
              </Link>
            )}
            <span className="inline-flex items-center rounded-full border border-[#E9DFD0] bg-white px-4 py-2 font-mono text-xs text-[#52525C]" dir="ltr">
              {study.repoPath}
            </span>
          </div>
        </div>

        {/* Metadata bar */}
        <div className="mt-8 grid gap-4 rounded-2xl border border-[#E9DFD0] bg-white p-5 sm:grid-cols-3">
          {study.metrics.map((m) => (
            <div key={m.value}>
              <div className="text-xl font-bold text-[#211A57]">{m.value}</div>
              <div className="text-xs text-[#52525C]">{t(m.label)}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="mt-10 space-y-8">
          {study.slug === 'ux-audit' && (
            <Block title={lang === 'en' ? 'Before vs. Redesigned Heuristic Comparison' : 'مقارنة قبل وبعد إعادة التصميم'}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#FFDCCF] bg-[#FFF1EC] p-4">
                  <div className="text-xs font-bold text-[#C13214]">
                    {lang === 'en' ? 'Before (Friction)' : 'قبل (نقاط الاحتكاك)'}
                  </div>
                  <ul className="mt-2 list-disc ps-4 space-y-1.5 text-xs text-[#5E1A0C]">
                    <li>{lang === 'en' ? 'Credit balance hidden inside Account tab' : 'الرصيد مخفي داخل صفحة الحساب'}</li>
                    <li>{lang === 'en' ? '15% VAT added silently on final step' : 'ظهور ضريبة ١٥٪ فجأة في آخر خطوة'}</li>
                    <li>{lang === 'en' ? 'RTL flips phone numbers and booking codes' : 'انقلاب الأرقام ورموز الحجز في وضع العربية'}</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-[#CCFBEF] bg-[#ECFDF9] p-4">
                  <div className="text-xs font-bold text-[#0F766E]">
                    {lang === 'en' ? 'After (Nabd Redesign)' : 'بعد (إعادة تصميم نبض)'}
                  </div>
                  <ul className="mt-2 list-disc ps-4 space-y-1.5 text-xs text-[#134E4A]">
                    <li>{lang === 'en' ? 'Live balance + shortfall upgrade CTA in sticky bar' : 'عرض الرصيد والترقية الفورية في شريط الحجز'}</li>
                    <li>{lang === 'en' ? 'Explicit Subtotal + 15% VAT + mada/Apple Pay summary' : 'ملخص واضح للمبلغ + ١٥٪ ضريبة + مدى وApple Pay'}</li>
                    <li>{lang === 'en' ? 'Strict LTR wrappers on codes/phones + mirrored icons' : 'حفظ اتجاه الأرقام مع عكس الأيقونات الاتجاهية'}</li>
                  </ul>
                </div>
              </div>
            </Block>
          )}
          <Block title={lang === 'en' ? '01 · Problem & Opportunity' : '٠١ · المشكلة والفرصة'}>
            <p className="text-sm leading-relaxed text-[#3D3D45] sm:text-base">{t(study.problem)}</p>
          </Block>

          <Block title={lang === 'en' ? '02 · Product Research & Market Context' : '٠٢ · البحث وسياق السوق'}>
            <p className="text-sm leading-relaxed text-[#3D3D45] sm:text-base">{t(study.research)}</p>
          </Block>

          <Block title={lang === 'en' ? '03 · Key User Flows & Wireframe Architecture' : '٠٣ · تدفقات المستخدم والهيكل التخطيطي'}>
            <ul className="space-y-2.5">
              {study.flows.map((flow, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#3D3D45] sm:text-base">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#16A34A]" />
                  <span>{t(flow)}</span>
                </li>
              ))}
            </ul>
            {/* Low-Fi Wireframe Strip */}
            <div className="mt-5 grid grid-cols-3 gap-3 rounded-2xl bg-[#FBF8F3] p-4">
              {[
                { en: '1. Entry & Intent', ar: '١ · الدخول والنية' },
                { en: '2. Selection & Rules', ar: '٢ · الاختيار والشروط' },
                { en: '3. Action & Proof', ar: '٣ · التنفيذ والنتيجة' },
              ].map((frame, idx) => (
                <div key={frame.en} className="rounded-xl border border-[#E9DFD0] bg-white p-3">
                  <div className="text-[11px] font-bold text-[#211A57]">
                    {lang === 'ar' ? frame.ar : frame.en}
                  </div>
                  <div className="mt-2.5 space-y-1.5">
                    <div className="h-2.5 w-3/4 rounded bg-[#E9DFD0]" />
                    <div
                      className="h-10 w-full rounded-lg"
                      style={{ backgroundColor: idx === 1 ? `${study.accent}22` : '#F6F1EA' }}
                    />
                    <div
                      className="h-3 w-full rounded-full"
                      style={{ backgroundColor: idx === 2 ? study.accent : '#211A57' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Block>

          <Block title={lang === 'en' ? '04 · Delivered Features' : '٠٤ · الميزات المنجزة'}>
            <ul className="space-y-2.5">
              {study.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#3D3D45] sm:text-base">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-[#FF5A36]" />
                  <span>{t(item)}</span>
                </li>
              ))}
            </ul>
          </Block>

          <div className="grid gap-6 sm:grid-cols-2">
            <Block title={lang === 'en' ? '05 · Arabic & RTL Architecture' : '٠٥ · معمارية العربية وRTL'}>
              <p className="text-sm leading-relaxed text-[#3D3D45]">{t(study.rtlNotes)}</p>
            </Block>

            <Block title={lang === 'en' ? '06 · Engineering & Quality' : '٠٦ · الهندسة وجودة الكود'}>
              <p className="text-sm leading-relaxed text-[#3D3D45]">{t(study.engineeringNotes)}</p>
            </Block>
          </div>

          <Block title={lang === 'en' ? '07 · Outcome & Tech Stack' : '٠٧ · النتيجة والتقنيات'}>
            <p className="text-sm leading-relaxed text-[#3D3D45] sm:text-base">{t(study.results)}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#E9DFD0] bg-[#FBF8F3] px-3 py-1.5 text-xs font-semibold text-[#211A57]"
                >
                  <Layers className="size-3 text-[#FF5A36]" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </Block>
        </div>
      </main>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-[#E9DFD0] bg-white p-6">
      <h2 className="text-lg font-bold text-[#100B2C]">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

