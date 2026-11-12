'use client';

import { Calendar, Flame, MapPin, QrCode, Sparkles, Wallet } from 'lucide-react';
import { useState } from 'react';

import type { Lang } from '@/data/portfolio-data';

type ScreenTab = 'home' | 'map' | 'ticket' | 'ai';

export function PhoneSimulator({ lang }: { lang: Lang }) {
  const [tab, setTab] = useState<ScreenTab>('home');
  const [checkedIn, setCheckedIn] = useState(false);

  const tabs: { id: ScreenTab; en: string; ar: string }[] = [
    { id: 'home', en: 'Home', ar: 'الرئيسية' },
    { id: 'map', en: 'Riyadh Map', ar: 'الخريطة' },
    { id: 'ticket', en: 'QR Ticket', ar: 'تذكرة QR' },
    { id: 'ai', en: 'Nabd AI', ar: 'نبض AI' },
  ];

  return (
    <div className="mx-auto w-full max-w-[300px]">
      {/* Screen switcher pills */}
      <div className="mb-3 flex flex-wrap justify-center gap-1.5">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors cursor-pointer ${
              tab === item.id
                ? 'bg-[#FF5A36] text-white'
                : 'bg-white/10 text-[#D6D3EC] hover:bg-white/20'
            }`}
          >
            {lang === 'ar' ? item.ar : item.en}
          </button>
        ))}
      </div>

      {/* Phone shell */}
      <div className="overflow-hidden rounded-[2rem] border-4 border-[#3A2F8A] bg-[#F8F8FA] text-[#100B2C] shadow-2xl">
        {/* Status notch */}
        <div className="flex items-center justify-between bg-[#211A57] px-5 py-2 text-[10px] font-semibold text-white">
          <span>9:41</span>
          <span className="h-2.5 w-14 rounded-full bg-black/40" />
          <span>5G</span>
        </div>

        {/* Interactive viewport */}
        <div className="min-h-[340px] space-y-3 p-4 text-xs">
          {tab === 'home' && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold">
                    {lang === 'ar' ? 'هلا محمود 👋' : 'Hi Mahmoud 👋'}
                  </div>
                  <div className="text-[11px] text-[#71717E]">
                    {lang === 'ar' ? 'الرياض · العليا' : 'Riyadh · Al Olaya'}
                  </div>
                </div>
                <span className="rounded-full bg-[#FFF1EC] px-2.5 py-1 text-[10px] font-bold text-[#FF5A36]">
                  {lang === 'ar' ? 'نشِط' : 'Active'}
                </span>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-[#211A57] to-[#3A2F8A] p-4 text-white">
                <div className="flex items-center justify-between text-[11px] text-[#D6D3EC]">
                  <span>{lang === 'ar' ? 'رصيدك المتاح' : 'Credit balance'}</span>
                  <Wallet className="size-3.5 text-[#5EEAD4]" />
                </div>
                <div className="mt-1 text-2xl font-bold">
                  49 <span className="text-xs font-normal text-[#D6D3EC]">{lang === 'ar' ? 'رصيد' : 'credits'}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTab('ai')}
                className="flex w-full items-center justify-between rounded-2xl border border-[#FF5A36]/30 bg-[#FFF1EC] p-3 text-start cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-[#FF5A36]" />
                  <div>
                    <div className="font-bold">{lang === 'ar' ? 'اسأل نبض الذكي' : 'Ask Nabd AI'}</div>
                    <div className="text-[10px] text-[#52525C]">
                      {lang === 'ar' ? '«شي هادي في جدة»' : '"Calm Friday in Jeddah"'}
                    </div>
                  </div>
                </div>
              </button>

              <div className="rounded-2xl border border-[#E4E4E9] bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold">
                    {lang === 'ar' ? 'يوغا فينياسا الغروب' : 'Sunset Vinyasa Yoga'}
                  </span>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-[#FFF1EC] px-2 py-0.5 text-[10px] font-bold text-[#FF5A36]">
                    <Flame className="size-2.5" /> 5
                  </span>
                </div>
                <div className="mt-1 text-[10px] text-[#71717E]">
                  {lang === 'ar' ? 'بيت سكينة للعافية · حطين' : 'Sakina Wellness · Hittin'}
                </div>
              </div>
            </>
          )}

          {tab === 'map' && (
            <>
              <div className="font-bold text-sm">
                {lang === 'ar' ? 'خريطة الرياض وجدة' : 'Riyadh & Jeddah Map'}
              </div>
              <div className="relative h-48 overflow-hidden rounded-2xl border border-[#E4E4E9] bg-[#EEEDF7] p-3">
                <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(#3A2F8A_1px,transparent_1px)] [background-size:14px_14px]" />
                <div className="relative mt-4 ms-4 inline-flex items-center gap-1 rounded-full bg-[#FF5A36] px-2.5 py-1 text-[10px] font-bold text-white shadow">
                  <MapPin className="size-3" /> 6 · HIIT Burn
                </div>
                <div className="relative mt-6 ms-16 inline-flex items-center gap-1 rounded-full bg-[#14B8A6] px-2.5 py-1 text-[10px] font-bold text-white shadow">
                  <MapPin className="size-3" /> 5 · Yoga
                </div>
                <div className="relative mt-6 ms-6 inline-flex items-center gap-1 rounded-full bg-[#3A2F8A] px-2.5 py-1 text-[10px] font-bold text-white shadow">
                  <MapPin className="size-3" /> 8 · Padel
                </div>
              </div>
              <div className="rounded-xl bg-white p-2.5 text-[11px] text-[#52525C] border border-[#E4E4E9]">
                {lang === 'ar'
                  ? 'فلاتر ذكية: الرياض / جدة · للسيدات فقط · مناسب للعائلة'
                  : 'Filters: Riyadh / Jeddah · Women Only · Family Friendly'}
              </div>
            </>
          )}

          {tab === 'ticket' && (
            <div className="flex flex-col items-center rounded-2xl border border-[#E4E4E9] bg-white p-4 text-center">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16A34A]">
                <Calendar className="size-3.5" />
                <span>
                  {checkedIn
                    ? lang === 'ar'
                      ? 'تم تسجيل الحضور ✅'
                      : 'Checked In ✅'
                    : lang === 'ar'
                      ? 'حجز مؤكد'
                      : 'Confirmed Ticket'}
                </span>
              </div>
              <div className="mt-1 font-bold">{lang === 'ar' ? 'بادل للمبتدئين' : 'Padel for Beginners'}</div>
              <div className="my-3 grid size-24 place-items-center rounded-xl border border-[#E4E4E9] bg-[#F8F8FA]">
                <QrCode className="size-16 text-[#100B2C]" />
              </div>
              <div className="font-mono text-xs font-bold tracking-widest text-[#211A57]" dir="ltr">
                NB-7K9P2M
              </div>
              <button
                type="button"
                onClick={() => setCheckedIn((v) => !v)}
                className="mt-3 w-full rounded-full bg-[#211A57] py-2 text-[11px] font-semibold text-white hover:bg-[#3A2F8A] cursor-pointer"
              >
                {checkedIn
                  ? lang === 'ar'
                    ? 'إعادة تعيين التذكرة'
                    : 'Reset Demo Scan'
                  : lang === 'ar'
                    ? 'محاكاة مسح الاستقبال'
                    : 'Simulate Venue Scan'}
              </button>
            </div>
          )}

          {tab === 'ai' && (
            <div className="space-y-2.5">
              <div className="rounded-2xl bg-[#211A57] p-3 text-[11px] text-white">
                {lang === 'ar'
                  ? 'أبي نشاط هادي مساء الجمعة في جدة بأقل من ١٠ رصيد'
                  : 'Calm activity Friday evening in Jeddah under 10 credits'}
              </div>
              <div className="rounded-2xl border border-[#E4E4E9] bg-white p-3 text-[11px]">
                <div className="flex items-center gap-1 font-bold text-[#FF5A36]">
                  <Sparkles className="size-3" />
                  <span>{lang === 'ar' ? 'نبض الذكي' : 'Nabd AI'}</span>
                </div>
                <p className="mt-1 text-[#52525C]">
                  {lang === 'ar'
                    ? 'إليك أفضل خيارين مطابقين في جدة:'
                    : 'Here are 2 matching experiences in Jeddah:'}
                </p>
                <div className="mt-2 space-y-1.5">
                  <div className="rounded-xl bg-[#F8F8FA] p-2 font-semibold">
                    {lang === 'ar' ? 'حمّام صوتي وتأمل · ٩ رصيد' : 'Sound Bath & Meditation · 9 cr'}
                  </div>
                  <div className="rounded-xl bg-[#F8F8FA] p-2 font-semibold">
                    {lang === 'ar' ? 'الخط العربي · ٥ رصيد' : 'Arabic Calligraphy · 5 cr'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
