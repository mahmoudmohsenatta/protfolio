'use client';

import {
  BarChart3,
  CalendarPlus,
  CheckCircle2,
  Languages,
  QrCode,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

type Lang = 'en' | 'ar';

interface PartnerClass {
  id: string;
  titleEn: string;
  titleAr: string;
  time: string;
  credits: number;
  capacity: number;
  booked: number;
  womenOnly?: boolean;
}

interface AttendeeRow {
  code: string;
  member: string;
  classEn: string;
  classAr: string;
  time: string;
  credits: number;
  status: 'confirmed' | 'checkedIn';
}

const INITIAL_CLASSES: PartnerClass[] = [
  { id: 'c1', titleEn: 'HIIT Burn', titleAr: 'هييت حرق الدهون', time: '18:00', credits: 6, capacity: 20, booked: 17 },
  { id: 'c2', titleEn: 'Sunset Vinyasa Yoga', titleAr: 'يوغا فينياسا الغروب', time: '19:30', credits: 5, capacity: 16, booked: 15, womenOnly: true },
  { id: 'c3', titleEn: 'Strength & Conditioning', titleAr: 'القوة واللياقة', time: '20:30', credits: 7, capacity: 12, booked: 9 },
];

const INITIAL_ATTENDEES: AttendeeRow[] = [
  { code: 'NB-7K9P2M', member: 'Sarah Al-Mansour', classEn: 'Sunset Vinyasa Yoga', classAr: 'يوغا فينياسا الغروب', time: '19:30', credits: 5, status: 'confirmed' },
  { code: 'NB-4Q8X1R', member: 'Faisal Al-Harbi', classEn: 'HIIT Burn', classAr: 'هييت حرق الدهون', time: '18:00', credits: 6, status: 'confirmed' },
  { code: 'NB-9M2T5W', member: 'Noura Al-Qahtani', classEn: 'Sunset Vinyasa Yoga', classAr: 'يوغا فينياسا الغروب', time: '19:30', credits: 5, status: 'checkedIn' },
  { code: 'NB-3H6V8C', member: 'Omar Al-Zahrani', classEn: 'Strength & Conditioning', classAr: 'القوة واللياقة', time: '20:30', credits: 7, status: 'checkedIn' },
];

const WEEKLY_DATA = [
  { dayEn: 'Sun', dayAr: 'أحد', checkins: 42, credits: 245 },
  { dayEn: 'Mon', dayAr: 'إثنين', checkins: 51, credits: 304 },
  { dayEn: 'Tue', dayAr: 'ثلاثاء', checkins: 48, credits: 286 },
  { dayEn: 'Wed', dayAr: 'أربعاء', checkins: 63, credits: 378 },
  { dayEn: 'Thu', dayAr: 'خميس', checkins: 74, credits: 442 },
  { dayEn: 'Fri', dayAr: 'جمعة', checkins: 68, credits: 410 },
  { dayEn: 'Sat', dayAr: 'سبت', checkins: 58, credits: 352 },
];

export function PartnerDashboard() {
  const [lang, setLang] = useState<Lang>('en');
  const [classes, setClasses] = useState<PartnerClass[]>(INITIAL_CLASSES);
  const [attendees, setAttendees] = useState<AttendeeRow[]>(INITIAL_ATTENDEES);
  const [scanCode, setScanCode] = useState('NB-7K9P2M');
  const [scanBanner, setScanBanner] = useState<{ ok: boolean; msg: string } | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('17:00');
  const [newCredits, setNewCredits] = useState(6);
  const [newCap, setNewCap] = useState(16);
  const [newWomen, setNewWomen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const checkedInCount = attendees.filter((a) => a.status === 'checkedIn').length;
  const totalCreditsWeek = WEEKLY_DATA.reduce((s, d) => s + d.credits, 0) + checkedInCount * 5;
  const payoutSar = Math.round(totalCreditsWeek * 4.5);

  const verifyTicket = (codeInput?: string) => {
    const target = (codeInput ?? scanCode).trim().toUpperCase();
    const row = attendees.find((a) => a.code === target);
    if (!row) {
      setScanBanner({
        ok: false,
        msg: lang === 'ar' ? `الرمز ${target} غير موجود` : `Ticket ${target} not found`,
      });
      return;
    }
    if (row.status === 'checkedIn') {
      setScanBanner({
        ok: false,
        msg: lang === 'ar' ? `تم تسجيل حضور ${row.member} مسبقًا` : `${row.member} is already checked in`,
      });
      return;
    }
    setAttendees((prev) =>
      prev.map((a) => (a.code === target ? { ...a, status: 'checkedIn' } : a)),
    );
    setScanBanner({
      ok: true,
      msg: lang === 'ar' ? `تم تسجيل حضور ${row.member} بنجاح!` : `Checked in ${row.member} (${row.code})!`,
    });
  };

  const addClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setClasses((prev) => [
      {
        id: `c-${Date.now()}`,
        titleEn: newTitle.trim(),
        titleAr: newTitle.trim(),
        time: newTime,
        credits: newCredits,
        capacity: newCap,
        booked: 0,
        womenOnly: newWomen,
      },
      ...prev,
    ]);
    setNewTitle('');
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-20 border-b border-[#E4E4E9] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-[#211A57] text-white">
              <QrCode className="size-4 text-[#5EEAD4]" />
            </span>
            <div>
              <div className="text-sm font-bold text-[#100B2C]">
                {lang === 'ar' ? 'شركاء نبض · استوديو بلس' : 'Nabd Partner · Pulse Studio Riyadh'}
              </div>
              <div className="text-[11px] text-[#71717E]">
                {lang === 'ar' ? 'العليا، الرياض' : 'Al Olaya, Riyadh'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLang((l) => (l === 'en' ? 'ar' : 'en'))}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E9] bg-[#F8F8FA] px-3.5 py-2 text-xs font-semibold text-[#100B2C] hover:bg-white cursor-pointer"
          >
            <Languages className="size-3.5 text-[#FF5A36]" />
            <span>{lang === 'en' ? 'العربية (RTL)' : 'English (LTR)'}</span>
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-5 py-8">
        {/* KPIs */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            icon={<Users className="size-4 text-[#FF5A36]" />}
            label={lang === 'ar' ? 'حضور هذا الأسبوع' : 'Weekly Check-Ins'}
            value={String(404 + checkedInCount)}
          />
          <KpiCard
            icon={<BarChart3 className="size-4 text-[#3A2F8A]" />}
            label={lang === 'ar' ? 'الرصيد المسترد' : 'Credits Redeemed'}
            value={totalCreditsWeek.toLocaleString()}
          />
          <KpiCard
            icon={<ShieldCheck className="size-4 text-[#14B8A6]" />}
            label={lang === 'ar' ? 'صافي العائد التقديري' : 'Est. Weekly Payout'}
            value={`${payoutSar.toLocaleString()} SAR`}
          />
          <KpiCard
            icon={<CheckCircle2 className="size-4 text-[#16A34A]" />}
            label={lang === 'ar' ? 'نسبة الإشغال' : 'Avg. Class Fill'}
            value="86%"
          />
        </section>

        {/* QR Check-in + Weekly Chart */}
        <section className="grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          {/* QR Verification Console */}
          <div className="rounded-3xl border border-[#E4E4E9] bg-white p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#100B2C]">
              <QrCode className="size-4 text-[#FF5A36]" />
              <span>{lang === 'ar' ? 'التحقق الفوري من تذكرة QR' : 'Live QR Ticket Verification'}</span>
            </h2>
            <p className="mt-1 text-xs text-[#71717E]">
              {lang === 'ar'
                ? 'أدخل رمز تذكرة نبض (مثل NB-7K9P2M) لتسجيل حضور المشترك فورًا.'
                : 'Enter a member booking code (e.g. NB-7K9P2M) to check them in at reception.'}
            </p>

            <div className="mt-4 flex gap-2">
              <input
                dir="ltr"
                value={scanCode}
                onChange={(e) => setScanCode(e.target.value)}
                placeholder="NB-XXXXXX"
                className="flex-1 rounded-xl border border-[#E4E4E9] bg-[#F8F8FA] px-3.5 py-2.5 font-mono text-sm font-semibold text-[#100B2C] uppercase focus:outline-2 focus:outline-[#FF5A36]"
              />
              <button
                type="button"
                onClick={() => verifyTicket()}
                className="rounded-xl bg-[#FF5A36] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#E8431F] cursor-pointer"
              >
                {lang === 'ar' ? 'تحقق' : 'Check In'}
              </button>
            </div>

            {scanBanner && (
              <div
                className={`mt-3 rounded-xl p-3 text-xs font-semibold ${
                  scanBanner.ok
                    ? 'bg-[#ECFDF9] text-[#0F766E]'
                    : 'bg-[#FFF1EC] text-[#C13214]'
                }`}
              >
                {scanBanner.msg}
              </div>
            )}

            <div className="mt-5 space-y-2">
              <div className="text-xs font-bold text-[#52525C]">
                {lang === 'ar' ? 'حجوزات اليوم' : "Today's Member Roster"}
              </div>
              {attendees.map((a) => (
                <div
                  key={a.code}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-[#E4E4E9] bg-[#F8F8FA] p-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-[#100B2C]">{a.member}</div>
                    <div className="text-[#71717E]">
                      {lang === 'ar' ? a.classAr : a.classEn} · {a.time} ·{' '}
                      <span className="font-mono" dir="ltr">
                        {a.code}
                      </span>
                    </div>
                  </div>
                  {a.status === 'checkedIn' ? (
                    <span className="rounded-full bg-[#CCFBEF] px-2.5 py-1 text-[11px] font-bold text-[#0F766E]">
                      {lang === 'ar' ? 'تم الحضور' : 'Checked In'}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => verifyTicket(a.code)}
                      className="rounded-full bg-[#211A57] px-3 py-1 text-[11px] font-semibold text-white hover:bg-[#3A2F8A] cursor-pointer"
                    >
                      {lang === 'ar' ? 'تأكيد' : 'Admit'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 7-Day Attendance & Credits SVG Chart */}
          <div className="rounded-3xl border border-[#E4E4E9] bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#100B2C]">
                  {lang === 'ar' ? 'الحضور والرصيد (٧ أيام)' : '7-Day Attendance & Credits'}
                </h2>
                <p className="text-xs text-[#71717E]">
                  {lang === 'ar' ? 'عدد الزيارات اليومية من تطبيق نبض' : 'Daily visits synced from Nabd mobile bookings'}
                </p>
              </div>
              <span className="rounded-full bg-[#EEEDF7] px-3 py-1 text-xs font-bold text-[#3A2F8A]">
                +18% WoW
              </span>
            </div>

            <div className="mt-6 flex h-56 items-end gap-3 pt-4">
              {WEEKLY_DATA.map((d) => {
                const heightPct = Math.round((d.checkins / 80) * 100);
                return (
                  <div key={d.dayEn} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-[11px] font-bold text-[#211A57]">{d.checkins}</span>
                    <div className="flex h-40 w-full items-end rounded-xl bg-[#F8F8FA] p-1">
                      <div
                        className="w-full rounded-lg bg-gradient-to-t from-[#3A2F8A] to-[#FF5A36] transition-all"
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-[#52525C]">
                      {lang === 'ar' ? d.dayAr : d.dayEn}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Class Schedule Manager */}
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-[#E4E4E9] bg-white p-6">
            <h2 className="text-base font-bold text-[#100B2C]">
              {lang === 'ar' ? 'جدول الحصص النشط' : 'Active Class Schedule'}
            </h2>
            <div className="mt-4 space-y-3">
              {classes.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E4E4E9] bg-[#F8F8FA] p-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#100B2C]">
                        {lang === 'ar' ? c.titleAr : c.titleEn}
                      </span>
                      {c.womenOnly && (
                        <span className="rounded-full bg-[#FFF1EC] px-2.5 py-0.5 text-[10px] font-bold text-[#E8431F]">
                          {lang === 'ar' ? 'للسيدات فقط' : 'Women Only'}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-[#71717E]">
                      {c.time} · {c.credits} {lang === 'ar' ? 'رصيد' : 'credits'}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#211A57]">
                    {c.booked} / {c.capacity} {lang === 'ar' ? 'محجوز' : 'booked'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={addClass} className="space-y-3 rounded-3xl border border-[#E4E4E9] bg-white p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#100B2C]">
              <CalendarPlus className="size-4 text-[#3A2F8A]" />
              <span>{lang === 'ar' ? 'إضافة حصة جديدة' : 'Publish New Slot'}</span>
            </h2>
            <input
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder={lang === 'ar' ? 'اسم الحصة (مثال: بيلاتس صباحي)' : 'Class name (e.g. Morning Reformer)'}
              className="w-full rounded-xl border border-[#E4E4E9] bg-[#F8F8FA] px-3.5 py-2.5 text-sm"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="rounded-xl border border-[#E4E4E9] bg-[#F8F8FA] px-3 py-2 text-xs"
              />
              <input
                type="number"
                min={1}
                max={20}
                value={newCredits}
                onChange={(e) => setNewCredits(Number(e.target.value))}
                className="rounded-xl border border-[#E4E4E9] bg-[#F8F8FA] px-3 py-2 text-xs"
                aria-label="Credits"
              />
              <input
                type="number"
                min={2}
                max={50}
                value={newCap}
                onChange={(e) => setNewCap(Number(e.target.value))}
                className="rounded-xl border border-[#E4E4E9] bg-[#F8F8FA] px-3 py-2 text-xs"
                aria-label="Capacity"
              />
            </div>
            <label className="flex items-center gap-2 text-xs font-medium text-[#52525C] cursor-pointer">
              <input
                type="checkbox"
                checked={newWomen}
                onChange={(e) => setNewWomen(e.target.checked)}
                className="size-4 accent-[#FF5A36]"
              />
              <span>{lang === 'ar' ? 'للسيدات فقط' : 'Women-only session'}</span>
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-[#211A57] py-2.5 text-xs font-semibold text-white hover:bg-[#3A2F8A] cursor-pointer"
            >
              {lang === 'ar' ? 'نشر في تطبيق نبض' : 'Publish to Nabd App'}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

function KpiCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E4E4E9] bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#71717E]">{label}</span>
        {icon}
      </div>
      <div className="mt-2 text-2xl font-bold text-[#100B2C]">{value}</div>
    </div>
  );
}
