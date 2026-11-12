'use client';

import {
  Building2,
  CalendarCheck,
  CheckCircle2,
  Languages,
  LayoutDashboard,
  MapPin,
  Package,
  ShoppingBag,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import {
  DESIGNERS,
  PORTFOLIO_PROJECTS,
  PRODUCTS,
  SERVICES,
  type Lang,
  type Product,
  type ProductCategory,
} from '@/data/dar-catalog';

import { AiChatbot } from './ai-chatbot';
import { AiRoomDesigner, type SavedRoomDesign } from './ai-room-designer';
import { ProductArtwork } from './product-artwork';

interface CartItem {
  product: Product;
  qty: number;
}

interface OrderRecord {
  id: string;
  items: number;
  totalSar: number;
  status: 'Confirmed' | 'In Production';
  date: string;
}

interface ConsultationRecord {
  id: string;
  designer: string;
  city: 'riyadh' | 'jeddah' | 'online';
  date: string;
}

export function DarExperience() {
  const [lang, setLang] = useState<Lang>('en');
  const [category, setCategory] = useState<ProductCategory | 'all'>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([
    { id: 'DAR-4821', items: 2, totalSar: 14202.5, status: 'In Production', date: '2026-11-04' },
  ]);
  const [consultations, setConsultations] = useState<ConsultationRecord[]>([
    { id: 'CON-109', designer: 'Eng. Noura Al-Qahtani', city: 'riyadh', date: '2026-11-16 · 14:00' },
  ]);
  const [savedDesigns, setSavedDesigns] = useState<SavedRoomDesign[]>([]);
  const [quickProduct, setQuickProduct] = useState<Product | null>(null);
  const [checkoutDone, setCheckoutDone] = useState(false);

  // Consultation form state
  const [consultCity, setConsultCity] = useState<'riyadh' | 'jeddah' | 'online'>('riyadh');
  const [consultDesigner, setConsultDesigner] = useState(DESIGNERS[0].id);
  const [consultDate, setConsultDate] = useState('2026-11-20');
  const [consultClient, setConsultClient] = useState('');
  const [consultBooked, setConsultBooked] = useState(false);

  const cartDialogRef = useRef<HTMLDialogElement>(null);
  const productDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { product, qty: 1 }];
    });
    setCheckoutDone(false);
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((i) => i.product.id !== id));

  const bagCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce((sum, i) => sum + i.product.priceSar * i.qty, 0);
  const vat = Math.round(subtotal * 0.15 * 100) / 100;
  const total = Math.round((subtotal + vat) * 100) / 100;

  const filteredProducts =
    category === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  const submitCheckout = () => {
    if (cart.length === 0) return;
    setOrders((prev) => [
      {
        id: `DAR-${Math.floor(1000 + Math.random() * 9000)}`,
        items: bagCount,
        totalSar: total,
        status: 'Confirmed',
        date: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    setCart([]);
    setCheckoutDone(true);
  };

  const bookConsult = (e: React.FormEvent) => {
    e.preventDefault();
    const d = DESIGNERS.find((x) => x.id === consultDesigner) ?? DESIGNERS[0];
    setConsultations((prev) => [
      {
        id: `CON-${Math.floor(200 + Math.random() * 799)}`,
        designer: lang === 'ar' ? d.name.ar : d.name.en,
        city: consultCity,
        date: `${consultDate} · 16:00`,
      },
      ...prev,
    ]);
    setConsultBooked(true);
    setTimeout(() => setConsultBooked(false), 3000);
  };

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#E9DFD0] bg-[#FBF8F3]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-[#B5653A] text-white">
              <Building2 className="size-4" />
            </span>
            <div>
              <div className="text-sm font-bold text-[#2E261D]">
                {lang === 'ar' ? 'دار · التصميم والمقاولات' : 'Dar · Architecture & Furniture'}
              </div>
              <div className="text-[11px] text-[#6E5B43]">
                {lang === 'ar' ? 'الرياض · جدة' : 'Riyadh · Jeddah'}
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-5 text-xs font-semibold text-[#6E5B43] md:flex">
            <a href="#services" className="hover:text-[#2E261D]">
              {lang === 'ar' ? 'الخدمات' : 'Services'}
            </a>
            <a href="#ai-designer" className="text-[#B5653A] hover:underline">
              {lang === 'ar' ? 'مصمم الغرف AI' : 'AI Room Designer'}
            </a>
            <a href="#catalog" className="hover:text-[#2E261D]">
              {lang === 'ar' ? 'الأثاث' : 'Furniture'}
            </a>
            <a href="#consult" className="hover:text-[#2E261D]">
              {lang === 'ar' ? 'الاستشارات' : 'Consultations'}
            </a>
            <a href="#dashboard" className="hover:text-[#2E261D]">
              {lang === 'ar' ? 'حسابي' : 'Dashboard'}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang((l) => (l === 'en' ? 'ar' : 'en'))}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#E9DFD0] bg-white px-3 py-1.5 text-xs font-semibold text-[#2E261D] hover:bg-[#F6F1EA] cursor-pointer"
            >
              <Languages className="size-3.5 text-[#B5653A]" />
              <span>{lang === 'en' ? 'العربية' : 'English'}</span>
            </button>

            <button
              type="button"
              onClick={() => cartDialogRef.current?.showModal()}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#2E261D] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#4D4030] cursor-pointer"
            >
              <ShoppingBag className="size-3.5" />
              <span>
                {lang === 'ar' ? 'السلة' : 'Bag'} ({bagCount})
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pt-12 pb-16">
          <div className="grid gap-8 rounded-3xl border border-[#E9DFD0] bg-white p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBF0EA] px-3.5 py-1 text-xs font-semibold text-[#B5653A]">
                <Sparkles className="size-3.5" />
                <span>
                  {lang === 'ar'
                    ? 'تصميم · تنفيذ فت آوت · أعمال معدنية · أثاث مخصص'
                    : 'Design · Turnkey Fit-Out · Metal Works · Custom Furniture'}
                </span>
              </span>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-[#2E261D] sm:text-5xl">
                {lang === 'ar'
                  ? 'نحول المساحات السعودية إلى عمارة دافئة ومخصصة.'
                  : 'Architectural contracting & bespoke Saudi interiors, powered by AI.'}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#6E5B43] sm:text-base">
                {lang === 'ar'
                  ? 'من مكاتبنا في الرياض وجدة، نصمم وننفذ المشاريع السكنية والتجارية، مع متجر أثاث مخصص ومصمم غرف فوري بالذكاء الاصطناعي.'
                  : 'From our Riyadh and Jeddah studios, we deliver full interior/exterior contracting, fire protection, architectural metal works, bespoke furniture, and instant AI room visualization.'}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#ai-designer"
                  className="rounded-full bg-[#B5653A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#97512D]"
                >
                  {lang === 'ar' ? 'جرّب مصمم الغرف الذكي' : 'Try AI Room Designer'}
                </a>
                <a
                  href="#catalog"
                  className="rounded-full border border-[#D9C9B1] bg-[#FBF8F3] px-6 py-3 text-sm font-semibold text-[#2E261D] hover:bg-[#F6F1EA]"
                >
                  {lang === 'ar' ? 'تصفح الأثاث المخصص' : 'Shop Custom Furniture'}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#F6F1EA] p-5">
                <div className="text-2xl font-bold text-[#B5653A]">120+</div>
                <div className="mt-1 text-xs font-medium text-[#4D4030]">
                  {lang === 'ar' ? 'مشروع فت آوت في الرياض وجدة' : 'Riyadh & Jeddah Fit-Out Projects'}
                </div>
              </div>
              <div className="rounded-2xl bg-[#2E261D] p-5 text-white">
                <div className="text-2xl font-bold text-[#E8B398]">4 Styles</div>
                <div className="mt-1 text-xs text-[#D9C9B1]">
                  {lang === 'ar' ? 'توليد غرف فوري AI' : 'Instant AI Space Concepts'}
                </div>
              </div>
              <div className="col-span-2 rounded-2xl border border-[#E9DFD0] bg-[#FBF8F3] p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2E261D]">
                  <MapPin className="size-4 text-[#B5653A]" />
                  <span>
                    {lang === 'ar'
                      ? 'الرياض (العليا) · جدة (الروضة)'
                      : 'Riyadh (Al Olaya) · Jeddah (Al Rawdah)'}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#6E5B43]">
                  {lang === 'ar'
                    ? 'ورشة تصنيع أثاث وأعمال معدنية متوافقة مع كود البناء السعودي.'
                    : 'Dedicated custom furniture & architectural metal fabrication workshop.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-y border-[#E9DFD0] bg-white py-14">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-2xl font-bold text-[#2E261D]">
              {lang === 'ar' ? 'خدمات المقاولات والتصميم' : 'Design & Contracting Capabilities'}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((srv) => (
                <div key={srv.id} className="rounded-2xl border border-[#E9DFD0] bg-[#FBF8F3] p-5">
                  <span className="text-[11px] font-bold text-[#B5653A]">
                    {lang === 'ar' ? srv.metric.ar : srv.metric.en}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-[#2E261D]">
                    {lang === 'ar' ? srv.title.ar : srv.title.en}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#6E5B43]">
                    {lang === 'ar' ? srv.desc.ar : srv.desc.en}
                  </p>
                </div>
              ))}
            </div>

            {/* Completed Contracting Projects Gallery */}
            <h3 className="mt-10 text-lg font-bold text-[#2E261D]">
              {lang === 'ar' ? 'مشاريع منفذة في الرياض وجدة' : 'Selected Fit-Out & Architecture Gallery'}
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {PORTFOLIO_PROJECTS.map((proj) => (
                <div key={proj.id} className="rounded-2xl border border-[#E9DFD0] bg-[#FBF8F3] p-4">
                  <div className="flex h-24 items-end justify-between rounded-xl p-3" style={{ backgroundColor: proj.palette[0] }}>
                    <div className="flex gap-1.5">
                      {proj.palette.map((hex) => (
                        <span key={hex} className="size-3.5 rounded-full border border-black/10" style={{ backgroundColor: hex }} />
                      ))}
                    </div>
                    <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-[#2E261D]" dir="ltr">
                      {proj.areaSqm}
                    </span>
                  </div>
                  <div className="mt-3 text-sm font-bold text-[#2E261D]">
                    {lang === 'ar' ? proj.title.ar : proj.title.en}
                  </div>
                  <div className="mt-0.5 text-xs font-semibold text-[#B5653A]">
                    {lang === 'ar' ? proj.city.ar : proj.city.en}
                  </div>
                  <div className="mt-1 text-xs text-[#6E5B43]">
                    {lang === 'ar' ? proj.scope.ar : proj.scope.en}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Room Designer */}
        <AiRoomDesigner
          lang={lang}
          onAddToCart={addToCart}
          onSaveDesign={(design) => setSavedDesigns((prev) => [design, ...prev])}
        />

        {/* Furniture E-Commerce Catalog */}
        <section id="catalog" className="border-y border-[#E9DFD0] bg-white py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#2E261D] sm:text-3xl">
                  {lang === 'ar' ? 'متجر الأثاث والأعمال المعدنية' : 'Custom Furniture & Metalwork Shop'}
                </h2>
                <p className="mt-1 text-sm text-[#6E5B43]">
                  {lang === 'ar'
                    ? 'قطع مصنوعة حسب الطلب بأعلى خامات الحجر والخشب والنحاس.'
                    : 'Made-to-order Saudi architectural pieces crafted in stone, timber, and PVD brass.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {(['all', 'seating', 'tables', 'metalwork', 'lighting'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      category === cat
                        ? 'bg-[#2E261D] text-white'
                        : 'border border-[#E9DFD0] bg-[#FBF8F3] text-[#2E261D]'
                    }`}
                  >
                    {cat === 'all'
                      ? lang === 'ar'
                        ? 'الكل'
                        : 'All'
                      : lang === 'ar'
                        ? { seating: 'جلوس', tables: 'طاولات', metalwork: 'أعمال معدنية', lighting: 'إضاءة' }[cat]
                        : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((p) => (
                <article
                  key={p.id}
                  className="flex flex-col justify-between rounded-3xl border border-[#E9DFD0] bg-[#FBF8F3] p-4"
                >
                  <div>
                    <ProductArtwork product={p} />
                    <div className="mt-4 flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-[#2E261D]">
                        {lang === 'ar' ? p.title.ar : p.title.en}
                      </h3>
                      <span className="shrink-0 text-sm font-bold text-[#B5653A]">
                        {p.priceSar.toLocaleString()} {lang === 'ar' ? 'ر.س' : 'SAR'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#6E5B43]">
                      {lang === 'ar' ? p.material.ar : p.material.en} · {p.dimensions}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => addToCart(p)}
                      className="flex-1 rounded-full bg-[#2E261D] py-2.5 text-xs font-semibold text-white hover:bg-[#4D4030] cursor-pointer"
                    >
                      {lang === 'ar' ? 'أضف للسلة' : 'Add to bag'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setQuickProduct(p);
                        productDialogRef.current?.showModal();
                      }}
                      className="rounded-full border border-[#D9C9B1] bg-white px-4 py-2.5 text-xs font-semibold text-[#2E261D] hover:bg-[#F6F1EA] cursor-pointer"
                    >
                      {lang === 'ar' ? 'المواصفات' : 'Specs'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Consultation Booking */}
        <section id="consult" className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-8 rounded-3xl border border-[#E9DFD0] bg-white p-6 sm:p-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B7350]">
                <CalendarCheck className="size-4" />
                <span>{lang === 'ar' ? 'حجز استشارة هندسية' : 'Book a Design Consultation'}</span>
              </span>
              <h2 className="mt-2 text-2xl font-bold text-[#2E261D]">
                {lang === 'ar'
                  ? 'قابل مهندسينا في الرياض أو جدة أو عبر الفيديو'
                  : 'Meet our Riyadh & Jeddah interior architects'}
              </h2>
              <p className="mt-2 text-sm text-[#6E5B43]">
                {lang === 'ar'
                  ? 'نراجع المخططات، نعرض عينات الخامات والأعمال المعدنية، ونضع خطة التنفيذ والميزانية.'
                  : 'Review floor plans, touch natural stone & metal finishes, and scope turnkey fit-out timelines.'}
              </p>

              <div className="mt-6 space-y-3">
                {DESIGNERS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setConsultDesigner(d.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-start cursor-pointer ${
                      consultDesigner === d.id
                        ? 'border-[#B5653A] bg-[#FBF0EA]'
                        : 'border-[#E9DFD0] bg-[#FBF8F3]'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-[#2E261D]">
                        {lang === 'ar' ? d.name.ar : d.name.en}
                      </div>
                      <div className="text-xs text-[#6E5B43]">
                        {lang === 'ar' ? d.role.ar : d.role.en}
                      </div>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#2E261D]">
                      {d.office === 'riyadh'
                        ? lang === 'ar'
                          ? 'الرياض'
                          : 'Riyadh'
                        : lang === 'ar'
                          ? 'جدة'
                          : 'Jeddah'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={bookConsult} className="space-y-4 rounded-2xl bg-[#FBF8F3] p-6">
              <div>
                <span className="block text-xs font-bold text-[#4D4030]">
                  {lang === 'ar' ? 'مكان اللقاء' : 'Session Location'}
                </span>
                <div className="mt-2 flex gap-2">
                  {(['riyadh', 'jeddah', 'online'] as const).map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setConsultCity(loc)}
                      className={`flex-1 rounded-full py-2 text-xs font-semibold cursor-pointer ${
                        consultCity === loc
                          ? 'bg-[#2E261D] text-white'
                          : 'border border-[#E9DFD0] bg-white text-[#2E261D]'
                      }`}
                    >
                      {lang === 'ar'
                        ? { riyadh: 'مكتب الرياض', jeddah: 'مكتب جدة', online: 'أونلاين' }[loc]
                        : { riyadh: 'Riyadh Office', jeddah: 'Jeddah Studio', online: 'Online' }[loc]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="consult-name" className="block text-xs font-bold text-[#4D4030]">
                  {lang === 'ar' ? 'الاسم الكامل' : 'Your Name'}
                </label>
                <input
                  id="consult-name"
                  required
                  value={consultClient}
                  onChange={(e) => setConsultClient(e.target.value)}
                  placeholder={lang === 'ar' ? 'أحمد العتيبي' : 'Ahmad Al-Otaibi'}
                  className="mt-1.5 w-full rounded-xl border border-[#E9DFD0] bg-white px-3.5 py-2.5 text-sm"
                />
              </div>

              <div>
                <label htmlFor="consult-date" className="block text-xs font-bold text-[#4D4030]">
                  {lang === 'ar' ? 'التاريخ المفضل' : 'Preferred Date'}
                </label>
                <input
                  id="consult-date"
                  type="date"
                  value={consultDate}
                  onChange={(e) => setConsultDate(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E9DFD0] bg-white px-3.5 py-2.5 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#B5653A] py-3 text-sm font-semibold text-white hover:bg-[#97512D] cursor-pointer"
              >
                {lang === 'ar' ? 'تأكيد موعد الاستشارة' : 'Confirm Consultation'}
              </button>

              {consultBooked && (
                <div className="flex items-center gap-2 text-xs font-semibold text-[#16A34A]">
                  <CheckCircle2 className="size-4" />
                  <span>
                    {lang === 'ar'
                      ? 'تم تسجيل الموعد وإضافته إلى لوحة العميل بالأسفل.'
                      : 'Consultation booked! Added to your Customer Dashboard below.'}
                  </span>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Customer Dashboard */}
        <section id="dashboard" className="border-t border-[#E9DFD0] bg-[#F6F1EA] py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B5653A]">
              <LayoutDashboard className="size-4" />
              <span>{lang === 'ar' ? 'بوابة العميل' : 'Customer Dashboard'}</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold text-[#2E261D]">
              {lang === 'ar'
                ? 'تصاميمي المحفوظة، الطلبات والمواعيد'
                : 'Saved AI Designs, Furniture Orders & Consultations'}
            </h2>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {/* Saved AI Designs */}
              <div className="rounded-2xl border border-[#E9DFD0] bg-white p-5">
                <h3 className="text-sm font-bold text-[#2E261D]">
                  {lang === 'ar' ? 'تصاميم الغرف الذكية' : 'Saved AI Designs'} ({savedDesigns.length})
                </h3>
                {savedDesigns.length === 0 ? (
                  <p className="mt-3 text-xs text-[#6E5B43]">
                    {lang === 'ar'
                      ? 'ولّد تصميم غرفة بالأعلى واضغط «حفظ في لوحتي» ليظهر هنا.'
                      : 'Generate an AI room concept above and click "Save Design" to track it here.'}
                  </p>
                ) : (
                  <ul className="mt-3 space-y-2.5 text-xs">
                    {savedDesigns.map((d) => (
                      <li key={d.id} className="rounded-xl bg-[#FBF8F3] p-3">
                        <div className="font-bold text-[#2E261D]">{d.roomLabel}</div>
                        <div className="text-[#B5653A]">{d.styleId.toUpperCase()} · {d.createdAt}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Orders */}
              <div className="rounded-2xl border border-[#E9DFD0] bg-white p-5">
                <h3 className="flex items-center gap-1.5 text-sm font-bold text-[#2E261D]">
                  <Package className="size-4 text-[#B5653A]" />
                  <span>{lang === 'ar' ? 'طلبات الأثاث' : 'Furniture Orders'} ({orders.length})</span>
                </h3>
                <ul className="mt-3 space-y-2.5 text-xs">
                  {orders.map((o) => (
                    <li key={o.id} className="flex items-center justify-between rounded-xl bg-[#FBF8F3] p-3">
                      <div>
                        <div className="font-bold text-[#2E261D]">{o.id}</div>
                        <div className="text-[#6E5B43]">
                          {o.items} {lang === 'ar' ? 'قطع' : 'items'} · {o.date}
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="font-bold text-[#B5653A]">{o.totalSar.toLocaleString()} SAR</div>
                        <div className="text-[11px] font-semibold text-[#16A34A]">{o.status}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consultations */}
              <div className="rounded-2xl border border-[#E9DFD0] bg-white p-5">
                <h3 className="text-sm font-bold text-[#2E261D]">
                  {lang === 'ar' ? 'الاستشارات الهندسية' : 'Consultations'} ({consultations.length})
                </h3>
                <ul className="mt-3 space-y-2.5 text-xs">
                  {consultations.map((c) => (
                    <li key={c.id} className="rounded-xl bg-[#FBF8F3] p-3">
                      <div className="font-bold text-[#2E261D]">{c.designer}</div>
                      <div className="text-[#6E5B43]">
                        {c.city.toUpperCase()} · {c.date}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Product Specs Modal */}
      <dialog ref={productDialogRef} aria-labelledby="spec-title">
        {quickProduct && (
          <div className="p-6">
            <div className="flex items-start justify-between gap-3">
              <h2 id="spec-title" className="text-lg font-bold text-[#2E261D]">
                {lang === 'ar' ? quickProduct.title.ar : quickProduct.title.en}
              </h2>
              <button
                type="button"
                onClick={() => productDialogRef.current?.close()}
                aria-label="Close"
                className="rounded-full p-1.5 hover:bg-[#F6F1EA] cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-4">
              <ProductArtwork product={quickProduct} />
            </div>
            <div className="mt-4 space-y-2 text-sm text-[#4D4030]">
              <div>
                <strong>{lang === 'ar' ? 'الخامات: ' : 'Materials: '}</strong>
                {lang === 'ar' ? quickProduct.material.ar : quickProduct.material.en}
              </div>
              <div>
                <strong>{lang === 'ar' ? 'الأبعاد: ' : 'Dimensions: '}</strong>
                <span dir="ltr">{quickProduct.dimensions}</span>
              </div>
              <div className="text-base font-bold text-[#B5653A]">
                {quickProduct.priceSar.toLocaleString()} {lang === 'ar' ? 'ر.س' : 'SAR'}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                addToCart(quickProduct);
                productDialogRef.current?.close();
                cartDialogRef.current?.showModal();
              }}
              className="mt-5 w-full rounded-full bg-[#B5653A] py-3 text-sm font-semibold text-white cursor-pointer"
            >
              {lang === 'ar' ? 'أضف للسلة وأتمم الطلب' : 'Add to Bag & Checkout'}
            </button>
          </div>
        )}
      </dialog>

      {/* Cart & Checkout Modal */}
      <dialog ref={cartDialogRef} aria-labelledby="cart-title">
        <div className="p-6">
          <div className="flex items-center justify-between border-b border-[#E9DFD0] pb-3">
            <h2 id="cart-title" className="text-lg font-bold text-[#2E261D]">
              {lang === 'ar' ? 'سلة المشتريات' : 'Shopping Bag'}
            </h2>
            <button
              type="button"
              onClick={() => cartDialogRef.current?.close()}
              aria-label="Close"
              className="rounded-full p-1.5 hover:bg-[#F6F1EA] cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          {checkoutDone ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto size-12 text-[#16A34A]" />
              <div className="mt-3 text-lg font-bold text-[#2E261D]">
                {lang === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Order Confirmed!'}
              </div>
              <p className="mt-1 text-xs text-[#6E5B43]">
                {lang === 'ar'
                  ? 'يمكنك متابعة حالة التصنيع في لوحة العميل.'
                  : 'Track fabrication status inside your Customer Dashboard.'}
              </p>
            </div>
          ) : cart.length === 0 ? (
            <p className="py-10 text-center text-sm text-[#6E5B43]">
              {lang === 'ar' ? 'سلتك فارغة حاليًا.' : 'Your bag is currently empty.'}
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {cart.map(({ product, qty }) => (
                <div key={product.id} className="flex items-center justify-between gap-3 rounded-xl bg-[#FBF8F3] p-3">
                  <div>
                    <div className="text-sm font-bold text-[#2E261D]">
                      {lang === 'ar' ? product.title.ar : product.title.en}
                    </div>
                    <div className="text-xs text-[#6E5B43]">
                      {qty} × {product.priceSar.toLocaleString()} SAR
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    aria-label="Remove item"
                    className="rounded-full p-1.5 text-[#DC2626] hover:bg-white cursor-pointer"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}

              <div className="space-y-1.5 border-t border-[#E9DFD0] pt-3 text-sm">
                <div className="flex justify-between text-[#6E5B43]">
                  <span>{lang === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
                  <span>{subtotal.toLocaleString()} SAR</span>
                </div>
                <div className="flex justify-between text-[#6E5B43]">
                  <span>{lang === 'ar' ? 'ضريبة القيمة المضافة (١٥٪)' : 'VAT (15%)'}</span>
                  <span>{vat.toLocaleString()} SAR</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2E261D]">
                  <span>{lang === 'ar' ? 'الإجمالي' : 'Total'}</span>
                  <span className="text-[#B5653A]">{total.toLocaleString()} SAR</span>
                </div>
              </div>

              <button
                type="button"
                onClick={submitCheckout}
                className="w-full rounded-full bg-[#B5653A] py-3 text-sm font-semibold text-white hover:bg-[#97512D] cursor-pointer"
              >
                {lang === 'ar' ? 'إتمام الدفع التجريبي (مدى / Apple Pay)' : 'Pay Now (mada / Apple Pay Sandbox)'}
              </button>
            </div>
          )}
        </div>
      </dialog>

      <AiChatbot
        lang={lang}
        onAddToCart={addToCart}
        onBookConsultation={() => {
          document.getElementById('consult')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}

