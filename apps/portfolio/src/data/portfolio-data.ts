import { CANDIDATE } from './candidate';

export type Lang = 'en' | 'ar';
export type Localized = { en: string; ar: string };

export interface CaseStudy {
  slug: 'nabd-mobile' | 'dar-web' | 'nabd-partner' | 'sahm-system' | 'ux-audit';
  category: Localized;
  title: Localized;
  subtitle: Localized;
  role: Localized;
  timeline: Localized;
  accent: string;
  secondaryAccent: string;
  summary: Localized;
  highlights: Localized[];
  stack: string[];
  demoUrl: string;
  repoPath: string;
  metrics: { label: Localized; value: string }[];
  problem: Localized;
  research: Localized;
  flows: Localized[];
  rtlNotes: Localized;
  engineeringNotes: Localized;
  results: Localized;
}

export const PORTFOLIO_COPY = {
  brand: { en: `${CANDIDATE.name.en} · UI/UX & AI Front-End`, ar: `${CANDIDATE.name.ar} · تصميم وتطوير واجهات بالذكاء الاصطناعي` },
  nav: {
    work: { en: 'Projects', ar: 'المشاريع' },
    matrix: { en: 'Role Fit', ar: 'تطابق الوظيفة' },
    ai: { en: 'AI Workflow', ar: 'منهجية الذكاء' },
    design: { en: 'Design System', ar: 'نظام التصميم' },
    contact: { en: 'Contact & CV', ar: 'التواصل والسيرة' },
  },
  hero: {
    badge: {
      en: 'Crafted for Atlantis Contracting & Lina & Lino',
      ar: 'مُصمَّم خصيصًا لشركة أتلانتس للمقاولات ولينا آند لينو',
    },
    title: {
      en: 'I design & build bilingual mobile apps and AI-powered web platforms for the Saudi market.',
      ar: 'أصمّم وأطوّر تطبيقات جوال ومنصات ويب مدعومة بالذكاء الاصطناعي للسوق السعودي باللغتين.',
    },
    sub: {
      en: 'End-to-end Mobile UI/UX Designer & Front-End Developer specializing in React Native (Expo), Next.js, Figma Design Systems, Arabic RTL architecture, and applied Generative AI.',
      ar: 'مصمم تجربة مستخدم ومطور واجهات أمامية متكاملة متخصص في React Native وExpo وNext.js وأنظمة التصميم في Figma وتجربة العربية RTL والذكاء الاصطناعي التوليدي.',
    },
    ctaPrimary: { en: 'Explore Live Projects', ar: 'استكشف المشاريع الحية' },
    ctaSecondary: { en: 'View Role Fit Proof', ar: 'دليل مطابقة المهارات' },
  },
  stats: [
    { value: '5', label: { en: 'Case Studies & Spec Apps', ar: 'دراسات حالة وتطبيقات جاهزة' } },
    { value: '100%', label: { en: 'Arabic RTL & English LTR', ar: 'دعم كامل للعربية RTL' } },
    { value: '95+', label: { en: 'Target Lighthouse & CWV', ar: 'أداء Lighthouse ومعايير الويب' } },
    { value: '2 AI', label: { en: 'Concierge & Room Visualizer', ar: 'مساعد ذكي ومصمم غرف' } },
  ],
  roleMatrix: {
    title: { en: 'Job Requirements → Live Proof', ar: 'متطلبات الوظيفة ← الدليل العملي' },
    subtitle: {
      en: 'Every responsibility in your listing is backed by working code, architecture, and bilingual UI in this monorepo.',
      ar: 'كل مسؤولية في الوصف الوظيفي مدعومة بكود فعلي، وبنية معمارية، وواجهة ثنائية اللغة داخل هذا المشروع.',
    },
    rows: [
      {
        req: { en: 'Mobile UI/UX, Flows, Wireframes & Design Systems (Figma + Code)', ar: 'تصميم تطبيقات الجوال والتدفقات وأنظمة التصميم' },
        proof: { en: 'Sahm Design System + Nabd 11-screen flow', ar: 'نظام تصميم سهم + تدفق نبض من 11 شاشة' },
        slug: '/work/sahm-system',
      },
      {
        req: { en: 'iOS & Android via React Native, Expo & TypeScript', ar: 'تطبيقات iOS وAndroid بـ React Native وExpo وTypeScript' },
        proof: { en: 'Nabd Mobile (Expo SDK 58, Router, EAS APK)', ar: 'تطبيق نبض (Expo 58 + Router + إعدادات EAS)' },
        slug: '/work/nabd-mobile',
      },
      {
        req: { en: 'Credits, Discovery Map, Wallet (mada/Apple Pay), QR Check-In & Push', ar: 'الرصيد، خريطة الاكتشاف، المحفظة، مسح QR والإشعارات' },
        proof: { en: 'Full interactive credit wallet, Moyasar sandbox & Camera QR', ar: 'محفظة رصيد كاملة، بوابة دفع مدى، وماسح QR بالكاميرا' },
        slug: '/work/nabd-mobile',
      },
      {
        req: { en: 'Responsive Websites (React, Next.js, Tailwind), E-Commerce & SEO', ar: 'مواقع متجاوبة بـ Next.js وTailwind، متجر إلكتروني وSEO' },
        proof: { en: 'Dar Platform (Catalog, Cart, Checkout, Consultations)', ar: 'منصة دار (متجر أثاث، سلة، دفع، وحجز استشارات)' },
        slug: '/work/dar-web',
      },
      {
        req: { en: 'AI Chatbots, Recommendations & AI Image Visualization', ar: 'روبوتات المحادثة، التوصيات، وتوليد وتصور الصور بالذكاء الاصطناعي' },
        proof: { en: 'Dar AI Room Designer (Before/After + Shop Look) & Nabd AI', ar: 'مصمم الغرف الذكي في دار + مستشار الأنشطة في نبض' },
        slug: '/work/dar-web',
      },
      {
        req: { en: 'Arabic / English Consistency & True RTL Layout', ar: 'تناسق العربية والإنجليزية ودعم RTL الحقيقي' },
        proof: { en: 'Runtime RTL/LTR toggle across all 4 apps + IBM Plex Arabic', ar: 'تبديل فوري بين العربية RTL والإنجليزية في كل التطبيقات' },
        slug: '/work/sahm-system',
      },
    ],
  },
  mobilePreview: {
    title: { en: 'Test Nabd Mobile Instantly', ar: 'جرّب تطبيق نبض مباشرة' },
    sub: {
      en: 'Scan the QR code with Expo Go on iOS or Android, or review the live venue partner dashboard side-by-side.',
      ar: 'امسح رمز QR عبر تطبيق Expo Go على جوالك، أو استعرض لوحة تحكم الشركاء المرتبطة بالتطبيق.',
    },
    scanLabel: { en: 'Expo Go / APK Deep Link', ar: 'رابط التشغيل السريع Expo Go' },
  },
  aiWorkflow: {
    title: { en: 'How I Build with AI', ar: 'منهجية العمل والذكاء الاصطناعي' },
    sub: {
      en: 'Combining human product craft with AI acceleration for faster shipping and higher quality.',
      ar: 'الجمع بين دقة التصميم البشري وتسريع التطوير بالذكاء الاصطناعي لرفع الجودة وسرعة الإطلاق.',
    },
    steps: [
      {
        step: '01',
        title: { en: 'Tokenized Design Foundation', ar: 'تأسيس نظام الرموز والتصميم' },
        desc: {
          en: 'Define semantic color, Arabic typography, and spacing tokens once in @sahm/tokens so mobile NativeWind/RN and web Tailwind stay pixel-identical.',
          ar: 'تعريف الألوان والخط العربي والمسافات في حزمة واحدة لضمان تطابق واجهات الجوال والويب بدقة.',
        },
      },
      {
        step: '02',
        title: { en: 'AI-Accelerated Prototyping & Strict Types', ar: 'بناء سريع مع فحص صارم للأنواع' },
        desc: {
          en: 'Scaffold flows rapidly with AI coding workflows, enforced by TypeScript strict mode, ESLint React Compiler rules, and automated CI checks.',
          ar: 'تسريع بناء الشاشات بالذكاء الاصطناعي مع ضمان الجودة عبر TypeScript الصارم وESLint واختبارات آلية.',
        },
      },
      {
        step: '03',
        title: { en: 'Applied Product AI Features', ar: 'ميزات ذكاء اصطناعي عملية للمستخدم' },
        desc: {
          en: 'Ship grounded AI experiences — structured Gemini JSON activity recommendations and interactive interior visualization with shoppable product matching.',
          ar: 'تطوير ميزات ذكية تخدم المنتج مباشرة مثل توصيات الأنشطة وتصور الديكور الداخلي المرتبط بمنتجات المتجر.',
        },
      },
    ],
  },
  contact: {
    title: { en: 'Ready to contribute from day one.', ar: 'جاهز للمساهمة من اليوم الأول.' },
    sub: {
      en: 'Full-Time Remote · Available immediately · Portfolio built specifically for Atlantis Contracting & Lina & Lino.',
      ar: 'دوام كامل عن بُعد · متاح فورًا · ملف أعمال مصمم خصيصًا لأتلانتس للمقاولات ولينا آند لينو.',
    },
    openCv: { en: 'Open Tailored CV Summary', ar: 'عرض ملخص السيرة الذاتية' },
    emailBtn: { en: 'Copy Application Intro', ar: 'نسخ رسالة التقديم' },
    copied: { en: 'Copied to clipboard!', ar: 'تم النسخ للحافظة!' },
  },
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'nabd-mobile',
    category: { en: 'Mobile App · Lina & Lino Concept', ar: 'تطبيق جوال · نموذج لينا آند لينو' },
    title: { en: 'Nabd — Active Lifestyle Credit Marketplace', ar: 'نبض — سوق الأنشطة القائم على الرصيد' },
    subtitle: {
      en: 'Cross-platform iOS & Android app built with Expo SDK 58, TypeScript, Arabic RTL, QR check-in, Saudi payments, and an AI concierge.',
      ar: 'تطبيق iOS وAndroid مبني بـ Expo 58 وTypeScript مع دعم كامل للعربية RTL، محفظة رصيد، مسح QR، دفع إلكتروني ومساعد ذكي.',
    },
    role: { en: 'Product Design & Mobile Lead', ar: 'تصميم التجربة وتطوير الجوال' },
    timeline: { en: 'Weeks 2–5 · Flagship Mobile', ar: 'الأسابيع ٢–٥ · المشروع الرئيسي للجوال' },
    accent: '#FF5A36',
    secondaryAccent: '#211A57',
    summary: {
      en: 'A unified lifestyle membership app connecting users in Riyadh and Jeddah with fitness, wellness, sports, music, arts, and family venues through monthly credit subscriptions.',
      ar: 'تطبيق عضوية موحد يربط المستخدمين في الرياض وجدة بتجارب اللياقة والعافية والرياضة والموسيقى والفنون والترفيه عبر باقات رصيد شهرية.',
    },
    highlights: [
      { en: '11-screen flow: Onboarding, OTP Auth, Home, Explore + Map, Booking, Wallet, Checkout, QR Ticket, Venue Scanner, Notifications, AI Concierge', ar: '١١ شاشة متكاملة: التعريف، التحقق برمز OTP، الرئيسية، الاستكشاف والخريطة، الحجز، المحفظة، الدفع، التذكرة، الماسح، الإشعارات والمساعد الذكي' },
      { en: 'Instant runtime Arabic RTL / English LTR switching via DirectionProvider & Expo Router LocaleProvider', ar: 'تبديل فوري بين العربية RTL والإنجليزية LTR بدون إعادة تشغيل التطبيق' },
      { en: 'Moyasar-style sandbox supporting mada, Apple Pay, STC Pay, 15% VAT calculation & 12-hour refund policy', ar: 'محاكاة بوابة ميسّر الداعمة لمدى وApple Pay وSTC Pay مع احتساب ضريبة ١٥٪ وسياسة استرجاع ١٢ ساعة' },
      { en: 'QR ticket generator + real CameraView scanner for venue reception check-ins & local push reminders', ar: 'توليد رمز QR للتذكرة + ماسح كاميرا فعلي للاستقبال + تذكيرات إشعارات محلية' },
    ],
    stack: ['React Native 0.88', 'Expo SDK 58', 'Expo Router', 'TypeScript', 'Zustand', 'TanStack Query', 'i18next', 'Expo Camera', 'React Native Maps', 'Gemini API'],
    demoUrl: CANDIDATE.demos.nabdWeb,
    repoPath: 'apps/nabd-mobile',
    metrics: [
      { label: { en: 'TypeScript & ESLint', ar: 'فحص الأنواع والجودة' }, value: '0 Errors' },
      { label: { en: 'Riyadh & Jeddah Venues', ar: 'أماكن الرياض وجدة' }, value: '10 Venues / 16 Classes' },
      { label: { en: 'Check-In Flow', ar: 'تدفق الحضور بـ QR' }, value: '< 3 taps' },
    ],
    problem: {
      en: 'Active-lifestyle consumers juggle multiple gym, studio, and workshop memberships while venues struggle with empty off-peak spots and manual check-ins.',
      ar: 'يواجه المستخدمون صعوبة في إدارة اشتراكات متعددة للنوادي والورش، بينما تعاني الأماكن من مقاعد شاغرة في الأوقات الهادئة وتسجيل حضور يدوي.',
    },
    research: {
      en: 'Designed around Saudi booking habits: Riyadh & Jeddah district discovery, women-only and family-friendly filters, transparent SAR + 15% VAT checkout, and bilingual clarity.',
      ar: 'صُمم وفق احتياجات المستخدم السعودي: تصفية الأحياء في الرياض وجدة، خيارات للسيدات فقط وللعائلات، شفافية ضريبة القيمة المضافة ١٥٪، وواجهة عربية واضحة.',
    },
    flows: [
      { en: 'Language Picker → 3-Slide Onboarding → Interest Selection → Saudi Phone +966 OTP', ar: 'اختيار اللغة ← شاشات الترحيب ← الاهتمامات ← تسجيل الدخول برقم الجوال السعودي' },
      { en: 'Home / AI Concierge → Activity Detail → Day/Time Slot Picker → Credit Deduction → QR Ticket', ar: 'الرئيسية / المساعد الذكي ← تفاصيل النشاط ← اختيار الموعد ← خصم الرصيد ← تذكرة QR' },
      { en: 'Wallet → Plan Upgrade / Quick Top-Up → mada/Apple Pay Checkout → Instant Credit Sync', ar: 'المحفظة ← ترقية الباقة أو الشحن ← الدفع عبر مدى/Apple Pay ← تحديث الرصيد فورًا' },
    ],
    rtlNotes: {
      en: 'Built a dedicated DirectionProvider and custom Text/Icon primitives that automatically mirror directional chevrons, writingDirection, and layout alignment cleanly on iOS, Android, and Web.',
      ar: 'بناء DirectionProvider ومكونات Text وIcon مخصصة تعكس الأسهم واتجاه الكتابة والمحاذاة تلقائيًا على iOS وAndroid والويب.',
    },
    engineeringNotes: {
      en: 'Offline-first Gemini AI intent fallback, deterministic slot availability generator, persistent AsyncStorage Zustand store, Expo Notifications scheduling, and EAS Build APK configuration.',
      ar: 'دعم Gemini مع بديل ذكي يعمل بدون إنترنت، حفظ الحالة في AsyncStorage، جدولة إشعارات Expo، وإعدادات EAS Build لإصدار ملف APK.',
    },
    results: {
      en: 'Passes strict TypeScript checks, Expo ESLint React Compiler rules, and Node unit tests with full EAS APK build readiness.',
      ar: 'يجتاز فحص TypeScript الصارم وقواعد ESLint واختبارات الوحدة مع جاهزية كاملة لبناء APK عبر EAS.',
    },
  },
  {
    slug: 'dar-web',
    category: { en: 'Web + AI · Atlantis Contracting Concept', ar: 'ويب + ذكاء اصطناعي · نموذج أتلانتس للمقاولات' },
    title: { en: 'Dar — Interior Design, Furniture & AI Room Designer', ar: 'دار — منصة التصميم الداخلي والأثاث ومصمم الغرف الذكي' },
    subtitle: {
      en: 'Next.js 16 + Tailwind v4 e-commerce and contracting platform featuring an interactive AI Room Visualizer with Before/After slider and shoppable look.',
      ar: 'منصة متكاملة للتصميم الداخلي والأثاث بـ Next.js 16 وTailwind v4 مع مصمم غرف بالذكاء الاصطناعي وشريط مقارنة تفاعلي وربط مباشر بالمتجر.',
    },
    role: { en: 'UI/UX Designer & Full-Stack Front-End', ar: 'مصمم واجهات ومطور واجهات أمامية' },
    timeline: { en: 'Weeks 6–7 · Flagship Web + AI', ar: 'الأسابيع ٦–٧ · المشروع الرئيسي للويب والذكاء' },
    accent: '#B5653A',
    secondaryAccent: '#2E261D',
    summary: {
      en: 'Inspired by atlantis.sa, Dar unites architectural interior/exterior services, custom furniture e-commerce, consultation booking for Riyadh & Jeddah, and AI room transformation.',
      ar: 'مستوحاة من atlantis.sa، تجمع منصة دار خدمات التصميم الداخلي والخارجي والفت آوت، متجر الأثاث المخصص، حجز الاستشارات في الرياض وجدة، وتحويل الغرف بالذكاء الاصطناعي.',
    },
    highlights: [
      { en: 'AI Room Designer: upload any room photo or select presets, choose Saudi styles (Modern Najdi, Hejazi Warmth, Minimal Riyadh, Classic Luxury), compare Before/After with an accessible range slider, and shop matched items', ar: 'مصمم الغرف الذكي: ارفع صورة غرفة، اختر الطراز (نجدي حديث، حجازي دافئ، مينيمال الرياض، كلاسيك)، قارن قبل وبعد، وتسوق القطع المقترحة' },
      { en: 'Custom furniture catalog with category/style filters, dimensions, material specs, cart drawer & sandbox checkout', ar: 'كتالوج أثاث مخصص مع الفلاتر والأبعاد والخامات، سلة تسوق جانبية ودفع تجريبي' },
      { en: 'Consultation booking flow with Riyadh/Jeddah/Online selection, designer cards & instant confirmation', ar: 'نظام حجز استشارات مع مصممين في الرياض أو جدة أو أونلاين' },
      { en: 'AI Design Assistant chatbot answering contracting/pricing questions and handing off directly to consultation booking', ar: 'مساعد تصميم ذكي يجيب عن استفسارات التكلفة والخدمات ويحوّل لحجز الاستشارة' },
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Gemini Vision / Canvas', 'Sahm Tokens', 'Native <dialog>', 'AR/EN RTL'],
    demoUrl: CANDIDATE.demos.darWeb,
    repoPath: 'apps/dar-web',
    metrics: [
      { label: { en: 'Saudi Design Styles', ar: 'أنماط التصميم السعودية' }, value: '4 Curated Styles' },
      { label: { en: 'SEO & Structured Data', ar: 'تحسين محركات البحث' }, value: 'JSON-LD + SSG' },
      { label: { en: 'Conversion Flow', ar: 'التحويل للمتجر والاستشارة' }, value: 'AI → Shop Look' },
    ],
    problem: {
      en: 'Homeowners and commercial clients struggle to visualize how architectural fit-out and custom furniture will transform their actual rooms before committing.',
      ar: 'يصعب على العملاء تخيّل كيف سيبدو التصميم والتأثيث المخصص في مساحاتهم الفعلية قبل اتخاذ قرار التنفيذ.',
    },
    research: {
      en: 'Highlighted Atlantis Contracting’s core pillars — interior/exterior design, architectural metal works, fire protection, fit-out, and custom furniture — paired with frictionless AI preview.',
      ar: 'إبراز ركائز أتلانتس: التصميم الداخلي والخارجي، الفت آوت، الأعمال المعدنية، الحماية من الحريق والأثاث المخصص مع معاينة ذكية فورية.',
    },
    flows: [
      { en: 'Upload Room / Preset → Select Style → AI Redesign + Palette → Slide Before/After → Add Matched Furniture to Cart', ar: 'رفع صورة الغرفة ← اختيار الطراز ← إعادة التصميم الذكية ← المقارنة ← إضافة الأثاث للسلة' },
      { en: 'Services / AI Chatbot → Designer Selection → Riyadh/Jeddah Site Visit Booking', ar: 'الخدمات / المساعد الذكي ← اختيار المصمم ← حجز معاينة في الرياض أو جدة' },
    ],
    rtlNotes: {
      en: 'Logical CSS spacing and mirrored RTL range slider direction (`&:dir(rtl)`) keep the Before/After comparison and checkout drawer crisp in both Arabic and English.',
      ar: 'استخدام الخصائص المنطقية وعكس اتجاه شريط المقارنة في وضع RTL لضمان سلاسة كاملة في العربية والإنجليزية.',
    },
    engineeringNotes: {
      en: 'Real Gemini API route with automatic high-craft interactive room rendering fallback when offline, native HTML `<dialog>` cart & product modals, and LocalBusiness JSON-LD metadata.',
      ar: 'مسار API لـ Gemini مع بديل عرض فوري متكامل، نوافذ `<dialog>` أصلية، وبيانات مهيكلة لـ SEO.',
    },
    results: {
      en: 'Delivers a cohesive luxury contracting & e-commerce storefront that turns AI room inspiration directly into product orders and design consultations.',
      ar: 'منصة متكاملة تحول إلهام الذكاء الاصطناعي مباشرة إلى طلبات أثاث وحجوزات استشارة.',
    },
  },
  {
    slug: 'nabd-partner',
    category: { en: 'B2B Marketplace · Venue Back-Office', ar: 'لوحة أعمال · إدارة شركاء نبض' },
    title: { en: 'Nabd Partner — Venue Operations & QR Dashboard', ar: 'شركاء نبض — لوحة إدارة الأماكن والحضور' },
    subtitle: {
      en: 'Marketplace partner portal showing web-mobile ecosystem consistency: class scheduling, QR check-in verification, and credit revenue analytics.',
      ar: 'بوابة إدارة لشركاء الأنشطة توضح تكامل الويب والجوال: جدولة الحصص، التحقق من تذاكر QR، وتحليلات الإيرادات والرصيد.',
    },
    role: { en: 'UI/UX & Front-End Architect', ar: 'مصمم ومطور لوحة التحكم' },
    timeline: { en: 'Week 5 · Ecosystem Extension', ar: 'الأسبوع ٥ · تكامل المنصة' },
    accent: '#3A2F8A',
    secondaryAccent: '#14B8A6',
    summary: {
      en: 'Demonstrates full marketplace thinking by connecting the mobile consumer app to the venue operator workflow.',
      ar: 'يبرز التفكير الشامل في الأسواق الرقمية عبر ربط تطبيق المستهلك بلوحة تحكم مشغّل المكان.',
    },
    highlights: [
      { en: 'KPI analytics cards and interactive 7-day attendance & credit revenue chart (SAR)', ar: 'مؤشرات الأداء ومخطط الحضور الأسبوعي وإيرادات الرصيد بالريال' },
      { en: 'Live QR code / booking code check-in verifier synced with Nabd booking format (NB-XXXXXX)', ar: 'أداة تحقق فورية من رموز الحجز والتذاكر متوافقة مع تنسيق تطبيق نبض' },
      { en: 'Class schedule manager allowing venues to add sessions, adjust capacity, and toggle women-only tags', ar: 'إدارة جدول الحصص مع إضافة جلسات وتعديل السعة وخيار للسيدات فقط' },
    ],
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Sahm Tokens', 'Custom SVG Charts', 'AR/EN RTL'],
    demoUrl: CANDIDATE.demos.nabdPartner,
    repoPath: 'apps/nabd-partner',
    metrics: [
      { label: { en: 'Shared Design Tokens', ar: 'تطابق رموز التصميم' }, value: '100% @sahm/tokens' },
      { label: { en: 'Check-In Latency', ar: 'سرعة تسجيل الحضور' }, value: 'Instant' },
      { label: { en: 'Bilingual Parity', ar: 'التوافق اللغوي' }, value: 'AR / EN' },
    ],
    problem: {
      en: 'Credit marketplaces fail if partner gyms and studios cannot easily verify arrivals, adjust capacity, and track payouts.',
      ar: 'تنجح أسواق الاشتراكات فقط عندما يملك الشريك أداة سريعة لتأكيد الحضور وإدارة السعة ومتابعة المستحقات.',
    },
    research: {
      en: 'Focused on front-desk speed: large check-in verification input, clear attendee table statuses, and instant payout visibility in SAR.',
      ar: 'التركيز على سرعة الاستقبال: حقل تحقق واضح، جدول حضور مباشر، وشفافية العوائد بالريال السعودي.',
    },
    flows: [
      { en: 'Reception enters NB-XXXXXX ticket code → Instant attendee validation → Attendance chart updates live', ar: 'إدخال رمز التذكرة ← تحقق فوري ← تحديث إحصاءات الحضور مباشرة' },
    ],
    rtlNotes: {
      en: 'Sidebar, data tables, and chart axes adapt cleanly between LTR and RTL.',
      ar: 'تكيّف القائمة الجانبية وجداول البيانات والمخططات بالكامل مع اتجاه RTL.',
    },
    engineeringNotes: {
      en: 'Built with zero heavy chart bloat using crisp responsive SVG charts and shared Sahm tokens.',
      ar: 'مبنية بمخططات SVG خفيفة الاستجابة ورموز @sahm/tokens المشتركة.',
    },
    results: {
      en: 'Proves ability to deliver both consumer mobile experiences and B2B operational web dashboards under one unified system.',
      ar: 'تثبت القدرة على تسليم تطبيقات مستهلك ولوحات تحكم B2B ضمن نظام موحد.',
    },
  },
  {
    slug: 'sahm-system',
    category: { en: 'Design System · Cross-Platform & Bilingual', ar: 'نظام التصميم · متعدد المنصات وثنائي اللغة' },
    title: { en: 'Sahm — One Design System, Two Platforms, Two Languages', ar: 'سهم — نظام تصميم واحد لمنصتين ولغتين' },
    subtitle: {
      en: 'Shared token architecture (@sahm/tokens) bridging React Native / Expo and Next.js / Tailwind CSS with native Arabic-first typography.',
      ar: 'بنية رموز تصميم مشتركة (@sahm/tokens) تربط React Native وExpo مع Next.js وTailwind بخط عربي أصيل.',
    },
    role: { en: 'Design Systems Lead', ar: 'مصمم ومطور أنظمة التصميم' },
    timeline: { en: 'Week 1 · Foundation', ar: 'الأسبوع ١ · الأساس' },
    accent: '#14B8A6',
    secondaryAccent: '#100B2C',
    summary: {
      en: 'Eliminates design drift between Lina & Lino-style energetic lifestyle products and Atlantis-style warm architectural experiences.',
      ar: 'يمنع التباين بين واجهات الجوال والويب مع توفير ثيم حيوي لتطبيقات نمط الحياة وثيم دافئ للتصميم الداخلي.',
    },
    highlights: [
      { en: 'Dual brand palettes in one token spec: Nabd (Coral, Indigo, Mint + Dark Mode) and Dar (Sand, Terracotta, Olive)', ar: 'لوحتا ألوان متكاملتان: نبض (مرجاني، نيلي، نعناعي + وضع ليلي) ودار (رملي، تيراكوتا، زيتوني)' },
      { en: 'IBM Plex Sans Arabic across mobile and web with calibrated 1.25–1.7 line-heights for Arabic diacritics', ar: 'خط IBM Plex Sans Arabic موحد للجوال والويب بارتفاع أسطر مضبوط للخط العربي' },
      { en: 'Strict logical layout primitives (`start`/`end`, directional icon mirroring, LTR phone/number overrides inside RTL)', ar: 'مكونات منطقية تعكس الأيقونات الاتجاهية وتحافظ على اتجاه الأرقام والهواتف داخل العربية' },
    ],
    stack: ['@sahm/tokens', 'Tailwind Preset', 'React Native StyleSheet', 'IBM Plex Sans Arabic', 'RTL Helpers'],
    demoUrl: '/#design-system',
    repoPath: 'packages/tokens',
    metrics: [
      { label: { en: 'Apps Powered', ar: 'التطبيقات المخدومة' }, value: '4 Apps' },
      { label: { en: 'Color Scales', ar: 'تدرجات الألوان' }, value: '7 Palettes' },
      { label: { en: 'Type & Spacing Drift', ar: 'التباين البصري' }, value: '0%' },
    ],
    problem: {
      en: 'Maintaining separate Figma values for mobile and web leads to inconsistent spacing, broken Arabic line-heights, and duplicated colors.',
      ar: 'فصل قيم التصميم بين الجوال والويب يسبب تباين المسافات وكسر ارتفاع الأسطر العربية وتكرار الألوان.',
    },
    research: {
      en: 'Audited Arabic typography legibility and bilingual alignment patterns so Arabic and Latin scripts feel balanced side-by-side.',
      ar: 'مراجعة مقروئية الخط العربي وتوازن النصوص العربية والإنجليزية جنبًا إلى جنب.',
    },
    flows: [
      { en: 'Figma Token Variables → packages/tokens/index.js → Mobile ThemeProvider & Web Tailwind CSS Variables', ar: 'متغيرات التصميم ← حزمة الرموز المشتركة ← ثيم الجوال ومتغيرات الويب' },
    ],
    rtlNotes: {
      en: 'Establishes the baseline rules: never hardcode left/right, preserve `dir="ltr"` on phone numbers and codes, and scale directional icons `-1` on RTL.',
      ar: 'قواعد ثابتة: عدم استخدام left/right مباشرة، الحفاظ على LTR للأرقام والرموز، وعكس الأيقونات الاتجاهية تلقائيًا.',
    },
    engineeringNotes: {
      en: 'Exports both CommonJS/ESM tokens for Metro/React Native and a Tailwind preset for web apps with full TypeScript `.d.ts` declarations.',
      ar: 'تصدير الرموز لتعمل مباشرة مع Metro وTailwind مع ملفات تعريف TypeScript كاملة.',
    },
    results: {
      en: 'Accelerated building 4 bilingual applications with consistent visual hierarchy and zero duplicated styling constants.',
      ar: 'تسريع بناء ٤ تطبيقات ثنائية اللغة بتناسق بصري كامل.',
    },
  },
  {
    slug: 'ux-audit',
    category: { en: 'Bonus · Heuristic UX Redesign', ar: 'إضافي · مراجعة وإعادة تصميم UX' },
    title: { en: 'Saudi Booking & VAT Checkout UX Audit', ar: 'تدقيق تجربة الحجز وضريبة القيمة المضافة للسوق السعودي' },
    subtitle: {
      en: 'Constructive heuristic evaluation of common friction points in regional lifestyle booking apps and a streamlined 3-tap redesign.',
      ar: 'تقييم بنّاء لنقاط الاحتكاك الشائعة في تطبيقات الحجز الإقليمية مع إعادة تصميم مختصرة في ٣ خطوات.',
    },
    role: { en: 'Lead UX Researcher & Product Designer', ar: 'باحث ومصمم تجربة المستخدم' },
    timeline: { en: 'Bonus Case Study · Conversion Focus', ar: 'دراسة إضافية · تحسين التحويل' },
    accent: '#211A57',
    secondaryAccent: '#FF5A36',
    summary: {
      en: 'Identifies 4 high-drop-off UX bottlenecks — hidden credit rules, buried RTL filters, surprise VAT at final step, and slow venue reception verification — and resolves them cleanly inside Nabd.',
      ar: 'يحدد ٤ نقاط تسرب رئيسية في تجربة المستخدم — قواعد الرصيد المخفية، الفلاتر المتداخلة، مفاجأة الضريبة عند الدفع، وبطء تسجيل الحضور — ويعالجها في تطبيق نبض.',
    },
    highlights: [
      { en: 'Upfront credit balance + shortfall action right in the sticky Activity Detail CTA bar', ar: 'عرض رصيد المحفظة المتبقي وزر الشحن مباشرة في شريط الحجز السفلي' },
      { en: 'Single-row Riyadh/Jeddah district, Women-Only, and Family chips instead of multi-level modal trees', ar: 'شرائح تصفية مباشرة للمدينة والسيدات والعائلة بدل القوائم المتشعبة' },
      { en: 'Clear 15% VAT + mada/Apple Pay breakdown before tap-to-pay confirmation', ar: 'تفصيل ضريبة ١٥٪ وطرق الدفع مدى وApple Pay بوضوح قبل تأكيد السداد' },
      { en: '12-hour free cancellation badge and 1-tap reception QR ticket from Home & Bookings', ar: 'إظهار سياسة الإلغاء المجاني ١٢ ساعة وإبراز تذكرة QR مباشرة من الرئيسية' },
    ],
    stack: ['Nielsen Heuristics', 'Bilingual UX Copy', 'WCAG AA Contrast', 'RTL Mirroring', 'Conversion Funnel'],
    demoUrl: '/work/nabd-mobile',
    repoPath: 'apps/nabd-mobile/src/app',
    metrics: [
      { label: { en: 'Checkout Surprises', ar: 'مفاجآت الدفع' }, value: '0 Hidden Fees' },
      { label: { en: 'Filter Reachability', ar: 'الوصول للفلاتر' }, value: '1 Tap' },
      { label: { en: 'Booking Flow Steps', ar: 'خطوات إتمام الحجز' }, value: '3 Taps' },
    ],
    problem: {
      en: 'Users abandon lifestyle booking apps when credit rules feel opaque, Arabic numbers/directions break layout alignment, or VAT appears only after entering a card.',
      ar: 'يغادر المستخدمون تطبيقات الحجز عندما تكون شروط الرصيد غامضة أو يتكسر تخطيط RTL أو تظهر الضريبة متأخرة بعد إدخال البطاقة.',
    },
    research: {
      en: 'Benchmarked mobile checkout and class-discovery flows across Saudi wellness and e-commerce apps using Nielsen’s 10 Usability Heuristics.',
      ar: 'مقارنة تدفقات الحجز والدفع في تطبيقات العافية والتجارة السعودية وفق معايير نيلسن العشرة لسهولة الاستخدام.',
    },
    flows: [
      { en: 'Heuristic 1 (Visibility): Show live credits & remaining spots on every card and sticky footer', ar: 'الوضوح: إظهار الرصيد والمقاعد المتبقية في البطاقة والشريط السفلي' },
      { en: 'Heuristic 5 (Error Prevention): Catch insufficient credits & 12h refund window before confirmation', ar: 'منع الأخطاء: تنبيه الرصيد غير الكافي وسياسة ١٢ ساعة قبل التأكيد' },
    ],
    rtlNotes: {
      en: 'Preserved LTR direction strictly on phone numbers (+966), card numbers, and NB-XXXXXX codes inside Arabic RTL screens to prevent digit reversal.',
      ar: 'تثبيت اتجاه LTR لأرقام الجوال والبطاقات ورموز الحجز داخل الشاشات العربية لمنع انعكاس الأرقام.',
    },
    engineeringNotes: {
      en: 'Applied directly across Nabd Mobile’s booking, checkout, and filter screens with instant feedback haptics and accessible labels.',
      ar: 'تطبيق التحسينات مباشرة في شاشات الحجز والدفع والفلاتر بتطبيق نبض.',
    },
    results: {
      en: 'Turned theoretical UX heuristics into concrete shipped components ready for A/B conversion testing.',
      ar: 'تحويل المراجعة النظرية إلى مكونات فعلية جاهزة لاختبارات التحويل A/B.',
    },
  },
];

