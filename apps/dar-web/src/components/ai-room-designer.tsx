'use client';

import { ArrowRight, BookmarkPlus, Check, ShoppingBag, Sparkles, Upload, Wand2 } from 'lucide-react';
import { useState } from 'react';

import {
  DESIGN_STYLES,
  PRODUCTS,
  type Lang,
  type Product,
  type StyleId,
} from '@/data/dar-catalog';

export interface SavedRoomDesign {
  id: string;
  roomLabel: string;
  styleId: StyleId;
  conceptNote: string;
  productIds: string[];
  createdAt: string;
}

const PRESET_ROOMS = [
  { id: 'majlis', en: 'Riyadh Living Majlis', ar: 'مجلس معيشة - الرياض' },
  { id: 'office', en: 'Executive Reception', ar: 'استقبال تنفيذي' },
  { id: 'bedroom', en: 'Master Suite', ar: 'جناح رئيسي' },
];

export function AiRoomDesigner({
  lang,
  onAddToCart,
  onSaveDesign,
}: {
  lang: Lang;
  onAddToCart: (p: Product) => void;
  onSaveDesign: (d: SavedRoomDesign) => void;
}) {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_ROOMS[0].id);
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [styleId, setStyleId] = useState<StyleId>('najdi');
  const [notes, setNotes] = useState('');
  const [sliderPos, setSliderPos] = useState(55);
  const [loading, setLoading] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const [result, setResult] = useState<{
    styleId: StyleId;
    conceptNote: string;
    productIds: string[];
    poweredBy: string;
  }>({
    styleId: 'najdi',
    conceptNote:
      lang === 'ar'
        ? 'يمزج الزخارف النجدية الهندسية والجص الترابي الدافئ مع جلسات منخفضة عصرية وإضاءة معمارية مخفية.'
        : 'Balances traditional Najdi triangular motifs and warm earth plaster with contemporary low seating and hidden architectural cove lighting.',
    productIds: ['p1', 'p2', 'p4'],
    poweredBy: 'studio-engine',
  });

  const activeStyle = DESIGN_STYLES.find((s) => s.id === result.styleId) ?? DESIGN_STYLES[0];
  const matchedProducts = PRODUCTS.filter((p) => result.productIds.includes(p.id));

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') setUploadedImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const generate = async () => {
    setLoading(true);
    setSavedNotice(false);
    const roomObj = PRESET_ROOMS.find((r) => r.id === selectedPreset) ?? PRESET_ROOMS[0];
    try {
      const res = await fetch('/api/room-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          styleId,
          roomType: lang === 'ar' ? roomObj.ar : roomObj.en,
          notes,
          lang,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setResult({
          styleId,
          conceptNote: data.conceptNote,
          productIds: data.productIds ?? ['p1', 'p2', 'p4'],
          poweredBy: data.poweredBy ?? 'studio-engine',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    const roomObj = PRESET_ROOMS.find((r) => r.id === selectedPreset) ?? PRESET_ROOMS[0];
    onSaveDesign({
      id: `des-${Date.now()}`,
      roomLabel: uploadedImg
        ? lang === 'ar'
          ? 'غرفة مرفوعة'
          : 'Uploaded Room'
        : lang === 'ar'
          ? roomObj.ar
          : roomObj.en,
      styleId: result.styleId,
      conceptNote: result.conceptNote,
      productIds: result.productIds,
      createdAt: new Date().toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-GB'),
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const roomObj = PRESET_ROOMS.find((r) => r.id === selectedPreset) ?? PRESET_ROOMS[0];

  return (
    <section id="ai-designer" className="mx-auto max-w-6xl px-5 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBF0EA] px-3.5 py-1 text-xs font-semibold text-[#B5653A]">
            <Wand2 className="size-3.5" />
            <span>{lang === 'ar' ? 'مصمم الغرف بالذكاء الاصطناعي' : 'AI Room Designer'}</span>
          </span>
          <h2 className="mt-3 text-2xl font-bold text-[#2E261D] sm:text-3xl">
            {lang === 'ar'
              ? 'تخيّل غرفتك قبل التنفيذ وتسوق الإطلالة مباشرة'
              : 'Visualize your redesigned space and shop the exact pieces'}
          </h2>
          <p className="mt-2 text-sm text-[#6E5B43]">
            {lang === 'ar'
              ? 'ارفع صورة غرفتك أو اختر نموذجًا، حدد الطراز المعماري، ثم حرّك المؤشر للمقارنة قبل وبعد.'
              : 'Upload a photo or pick a sample space, choose a Saudi interior style, and drag the slider to compare Before & After.'}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.25fr]">
        {/* Controls */}
        <div className="space-y-5 rounded-3xl border border-[#E9DFD0] bg-white p-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-[#6E5B43]">
              {lang === 'ar' ? '١ · المساحة الحالية' : '1 · Source Room'}
            </span>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {PRESET_ROOMS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setSelectedPreset(r.id);
                    setUploadedImg(null);
                  }}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    !uploadedImg && selectedPreset === r.id
                      ? 'border-[#2E261D] bg-[#2E261D] text-white'
                      : 'border-[#E9DFD0] bg-[#FBF8F3] text-[#2E261D]'
                  }`}
                >
                  {lang === 'ar' ? r.ar : r.en}
                </button>
              ))}
              <label className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[#B5653A] bg-[#FBF0EA] px-3.5 py-1.5 text-xs font-semibold text-[#B5653A] cursor-pointer hover:bg-[#F4D9CB]/60">
                <Upload className="size-3.5" />
                <span>{lang === 'ar' ? 'رفع صورة' : 'Upload photo'}</span>
                <input type="file" accept="image/*" onChange={handleUpload} className="sr-only" />
              </label>
            </div>
          </div>

          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-[#6E5B43]">
              {lang === 'ar' ? '٢ · اختر الطراز المعماري' : '2 · Target Interior Style'}
            </span>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              {DESIGN_STYLES.map((st) => {
                const active = st.id === styleId;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setStyleId(st.id)}
                    className={`rounded-2xl border p-3 text-start transition-colors cursor-pointer ${
                      active
                        ? 'border-[#B5653A] bg-[#FBF0EA]'
                        : 'border-[#E9DFD0] bg-[#FBF8F3] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {st.palette.map((hex) => (
                        <span
                          key={hex}
                          className="size-3 rounded-full border border-black/10"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                    <div className="mt-2 text-xs font-bold text-[#2E261D]">
                      {lang === 'ar' ? st.name.ar : st.name.en}
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#6E5B43]">
                      {lang === 'ar' ? st.tagline.ar : st.tagline.en}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="room-notes" className="block text-xs font-bold uppercase tracking-wider text-[#6E5B43]">
              {lang === 'ar' ? '٣ · ملاحظات إضافية (اختياري)' : '3 · Custom Preferences (Optional)'}
            </label>
            <input
              id="room-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                lang === 'ar'
                  ? 'مثال: إضاءة دافئة مع فاصل نحاسي وكنب بيج'
                  : 'e.g. Warm cove lighting with a brass divider'
              }
              className="mt-2 w-full rounded-xl border border-[#E9DFD0] bg-[#FBF8F3] px-3.5 py-2.5 text-sm text-[#2E261D] focus:outline-2 focus:outline-[#B5653A]"
            />
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={generate}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#B5653A] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#97512D] disabled:opacity-60 transition-colors cursor-pointer"
          >
            <Sparkles className="size-4" />
            <span>
              {loading
                ? lang === 'ar'
                  ? 'جارٍ تصور التصميم…'
                  : 'Generating AI concept…'
                : lang === 'ar'
                  ? 'توليد التصميم بالذكاء الاصطناعي'
                  : 'Generate AI Redesign'}
            </span>
          </button>
        </div>

        {/* Interactive Before/After Stage + Shop This Look */}
        <div className="space-y-5">
          <div className="rounded-3xl border border-[#E9DFD0] bg-white p-4 sm:p-5">
            {/* Stage */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#E9DFD0] bg-[#EFECE7]">
              {/* BEFORE layer */}
              {uploadedImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={uploadedImg}
                  alt={lang === 'ar' ? 'الغرفة قبل التصميم' : 'Room before redesign'}
                  className="absolute inset-0 h-full w-full object-cover grayscale-[25%]"
                />
              ) : (
                <RoomSceneSvg
                  roomKind={selectedPreset as 'majlis' | 'office' | 'bedroom'}
                  variant="before"
                  stylePalette={['#E5E4E2', '#CFCFD4', '#A1A1AD', '#52525C']}
                  label={lang === 'ar' ? roomObj.ar : roomObj.en}
                />
              )}

              {/* AFTER layer clipped by sliderPos */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                }}
              >
                {uploadedImg ? (
                  <div className="relative h-full w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={uploadedImg}
                      alt={lang === 'ar' ? 'الغرفة بعد التصميم' : 'AI redesigned room'}
                      className="h-full w-full object-cover saturate-125 contrast-105"
                    />
                    <div
                      className="absolute inset-0 mix-blend-multiply"
                      style={{ backgroundColor: activeStyle.overlayTint }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at 65% 22%, ${activeStyle.lightingGlow}, transparent 58%)`,
                      }}
                    />
                  </div>
                ) : (
                  <RoomSceneSvg
                    roomKind={selectedPreset as 'majlis' | 'office' | 'bedroom'}
                    variant="after"
                    stylePalette={activeStyle.palette}
                    label={lang === 'ar' ? activeStyle.name.ar : activeStyle.name.en}
                  />
                )}
              </div>

              {/* Divider handle */}
              <div
                className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow"
                style={{ left: `${sliderPos}%` }}
              />

              {/* Badges */}
              <span className="absolute top-3 left-3 rounded-full bg-[#2E261D]/80 px-3 py-1 text-[11px] font-semibold text-white">
                {lang === 'ar' ? 'بعد · الذكاء الاصطناعي' : 'After · AI Concept'}
              </span>
              <span className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#2E261D]">
                {lang === 'ar' ? 'قبل' : 'Before'}
              </span>
            </div>

            {/* Accessible native range slider */}
            <div className="mt-3 flex items-center gap-3">
              <label htmlFor="before-after-range" className="sr-only">
                {lang === 'ar' ? 'مقارنة قبل وبعد' : 'Before and After comparison'}
              </label>
              <input
                id="before-after-range"
                type="range"
                min={5}
                max={95}
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="compare-slider"
              />
            </div>

            <div className="mt-3 flex flex-wrap items-start justify-between gap-3 rounded-2xl bg-[#FBF8F3] p-4">
              <div className="flex-1">
                <div className="text-xs font-bold text-[#B5653A]">
                  {lang === 'ar' ? activeStyle.name.ar : activeStyle.name.en} ·{' '}
                  {result.poweredBy === 'gemini' ? 'Gemini AI' : 'Dar Studio Engine'}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#4D4030] sm:text-sm">
                  {result.conceptNote}
                </p>
              </div>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#D9C9B1] bg-white px-3.5 py-2 text-xs font-semibold text-[#2E261D] hover:bg-[#F6F1EA] cursor-pointer"
              >
                {savedNotice ? <Check className="size-3.5 text-[#16A34A]" /> : <BookmarkPlus className="size-3.5 text-[#B5653A]" />}
                <span>
                  {savedNotice
                    ? lang === 'ar'
                      ? 'تم الحفظ'
                      : 'Saved'
                    : lang === 'ar'
                      ? 'حفظ في لوحتي'
                      : 'Save Design'}
                </span>
              </button>
            </div>
          </div>

          {/* Shop This Look */}
          <div className="rounded-3xl border border-[#E9DFD0] bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#2E261D]">
                {lang === 'ar' ? 'تسوّق هذه الإطلالة' : 'Shop This Look'}
              </h3>
              <a
                href="#catalog"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#B5653A]"
              >
                <span>{lang === 'ar' ? 'كل الأثاث' : 'Full catalog'}</span>
                <ArrowRight className={`size-3.5 ${lang === 'ar' ? '-scale-x-100' : ''}`} />
              </a>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {matchedProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-2xl border border-[#E9DFD0] bg-[#FBF8F3] p-3"
                >
                  <div>
                    <div className="text-xs font-bold text-[#2E261D]">
                      {lang === 'ar' ? item.title.ar : item.title.en}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-[#B5653A]">
                      {item.priceSar.toLocaleString()} {lang === 'ar' ? 'ر.س' : 'SAR'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onAddToCart(item)}
                    className="mt-3 inline-flex items-center justify-center gap-1 rounded-full bg-[#2E261D] px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-[#4D4030] cursor-pointer"
                  >
                    <ShoppingBag className="size-3" />
                    <span>{lang === 'ar' ? 'أضف للسلة' : 'Add to bag'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoomSceneSvg({
  roomKind,
  variant,
  stylePalette,
  label,
}: {
  roomKind: 'majlis' | 'office' | 'bedroom';
  variant: 'before' | 'after';
  stylePalette: [string, string, string, string];
  label: string;
}) {
  const [wall, trim, accent, dark] = stylePalette;
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" aria-label={label}>
      <rect width="800" height="500" fill={wall} />
      <polygon points="0,375 800,375 800,500 0,500" fill={trim} />
      {variant === 'after' ? (
        <>
          <path d="M120,375 L120,150 Q210,80 300,150 L300,375 Z" fill={trim} opacity="0.65" />
          <path d="M510,375 L510,130 L720,130 L720,375 Z" fill={accent} opacity="0.16" />
          <g stroke={accent} strokeWidth="3" opacity="0.75">
            <line x1="550" y1="130" x2="550" y2="375" />
            <line x1="590" y1="130" x2="590" y2="375" />
            <line x1="630" y1="130" x2="630" y2="375" />
            <line x1="670" y1="130" x2="670" y2="375" />
          </g>
          <circle cx="400" cy="110" r="90" fill={accent} opacity="0.14" />
          <line x1="400" y1="0" x2="400" y2="95" stroke={dark} strokeWidth="3" />
          <path d="M362,120 Q400,82 438,120 Z" fill={accent} />
        </>
      ) : (
        <rect x="110" y="130" width="210" height="150" rx="4" fill="#FFFFFF" stroke={trim} strokeWidth="4" />
      )}

      {roomKind === 'office' ? (
        <>
          {/* Executive desk & steel legs */}
          <rect
            x="220"
            y="295"
            width="320"
            height="28"
            rx={variant === 'after' ? 10 : 3}
            fill={variant === 'after' ? '#FFFFFF' : '#D5D5DA'}
            stroke={dark}
            strokeWidth="3"
          />
          <rect x="245" y="323" width="22" height="75" fill={variant === 'after' ? accent : '#B0B0B8'} />
          <rect x="493" y="323" width="22" height="75" fill={variant === 'after' ? accent : '#B0B0B8'} />
          <rect x="330" y="230" width="100" height="60" rx="8" fill={variant === 'after' ? accent : '#C0C0C7'} opacity="0.88" />
        </>
      ) : roomKind === 'bedroom' ? (
        <>
          {/* Master headboard + upholstered bed */}
          <rect
            x="195"
            y="215"
            width="380"
            height="95"
            rx={variant === 'after' ? 20 : 4}
            fill={variant === 'after' ? accent : '#C2C2CA'}
          />
          <rect
            x="215"
            y="285"
            width="340"
            height="108"
            rx={variant === 'after' ? 18 : 6}
            fill={variant === 'after' ? '#FFFFFF' : '#D8D8DF'}
            stroke={dark}
            strokeWidth="3"
          />
          <rect x="240" y="268" width="120" height="32" rx="10" fill={trim} />
          <rect x="410" y="268" width="120" height="32" rx="10" fill={trim} />
        </>
      ) : (
        <>
          {/* Majlis modular sofa & travertine table */}
          <rect
            x="170"
            y="290"
            width="390"
            height="90"
            rx={variant === 'after' ? 24 : 8}
            fill={variant === 'after' ? '#FFFFFF' : '#D5D5DA'}
            stroke={dark}
            strokeWidth={variant === 'after' ? 3 : 2}
          />
          <rect
            x="190"
            y="255"
            width="350"
            height="45"
            rx={variant === 'after' ? 16 : 4}
            fill={variant === 'after' ? accent : '#C0C0C7'}
            opacity={variant === 'after' ? 0.9 : 1}
          />
          <ellipse
            cx="385"
            cy="425"
            rx="125"
            ry="24"
            fill={variant === 'after' ? trim : '#B8B8C0'}
            stroke={dark}
            strokeWidth="2.5"
          />
        </>
      )}
    </svg>
  );
}

