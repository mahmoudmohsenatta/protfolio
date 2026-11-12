export type Lang = 'en' | 'ar';
export type Localized = { en: string; ar: string };

export type StyleId = 'najdi' | 'minimal' | 'hejazi' | 'classic';
export type ProductCategory = 'seating' | 'tables' | 'lighting' | 'metalwork';

export interface Product {
  id: string;
  slug: string;
  category: ProductCategory;
  title: Localized;
  priceSar: number;
  dimensions: string;
  material: Localized;
  styleTags: StyleId[];
  accentHex: string;
  bgHex: string;
  shape: 'sofa' | 'table' | 'lamp' | 'screen' | 'chair' | 'console';
}

export interface DesignStyle {
  id: StyleId;
  name: Localized;
  tagline: Localized;
  palette: [string, string, string, string];
  overlayTint: string;
  lightingGlow: string;
  summary: Localized;
}

export interface ServiceItem {
  id: string;
  title: Localized;
  desc: Localized;
  metric: Localized;
}

export interface Designer {
  id: string;
  name: Localized;
  role: Localized;
  office: 'riyadh' | 'jeddah';
}

export interface ProjectCase {
  id: string;
  title: Localized;
  city: Localized;
  scope: Localized;
  areaSqm: string;
  palette: [string, string, string];
}

export const PORTFOLIO_PROJECTS: ProjectCase[] = [
  {
    id: 'pr1',
    title: { en: 'Olaya Executive Lounge & Metal Facade', ar: 'ردهة العليا التنفيذية والواجهة المعدنية' },
    city: { en: 'Riyadh · Al Olaya', ar: 'الرياض · العليا' },
    scope: { en: 'Turnkey Fit-Out · PVD Brass Works · Fire Doors', ar: 'فت آوت متكامل · أعمال نحاس PVD · أبواب مقاومة للحريق' },
    areaSqm: '1,400 m²',
    palette: ['#F6F1EA', '#B5653A', '#2E261D'],
  },
  {
    id: 'pr2',
    title: { en: 'Corniche Coastal Villa Majlis', ar: 'مجلس فيلا الكورنيش الساحلي' },
    city: { en: 'Jeddah · Al Shati', ar: 'جدة · الشاطئ' },
    scope: { en: 'Interior Design · Custom Furniture · Roshan Screens', ar: 'تصميم داخلي · أثاث مخصص · قواطع روشان' },
    areaSqm: '680 m²',
    palette: ['#F3F4EF', '#6B7350', '#8E7656'],
  },
  {
    id: 'pr3',
    title: { en: 'Diriyah Boutique Hospitality Lobby', ar: 'بهو ضيافة بوتيك في الدرعية' },
    city: { en: 'Riyadh · Diriyah', ar: 'الرياض · الدرعية' },
    scope: { en: 'Modern Najdi Plaster · Travertine · Acoustic Fit-Out', ar: 'جص نجدي حديث · ترافرتين · عزل وتجهيز' },
    areaSqm: '920 m²',
    palette: ['#FBF8F3', '#D9C9B1', '#97512D'],
  },
];

export const DESIGN_STYLES: DesignStyle[] = [
  {
    id: 'najdi',
    name: { en: 'Modern Najdi', ar: 'نجدي حديث' },
    tagline: { en: 'Limestone plaster, walnut louvers & terracotta linen', ar: 'جص جيري، مشربيات جوز وكتان تيراكوتا' },
    palette: ['#F6F1EA', '#D9C9B1', '#B5653A', '#2E261D'],
    overlayTint: 'rgba(181, 101, 58, 0.22)',
    lightingGlow: 'rgba(244, 200, 150, 0.35)',
    summary: {
      en: 'Balances traditional Najdi triangular motifs and warm earth plaster with contemporary low seating and hidden architectural cove lighting.',
      ar: 'يمزج الزخارف النجدية الهندسية والجص الترابي الدافئ مع جلسات منخفضة عصرية وإضاءة معمارية مخفية.',
    },
  },
  {
    id: 'minimal',
    name: { en: 'Riyadh Minimal', ar: 'مينيمال الرياض' },
    tagline: { en: 'Honed travertine, bouclé silhouettes & brushed bronze', ar: 'ترافرتين مصقول، قماش بوكل وبروز مصقول' },
    palette: ['#FBF8F3', '#E9DFD0', '#6B7350', '#1C1F15'],
    overlayTint: 'rgba(107, 115, 80, 0.16)',
    lightingGlow: 'rgba(255, 248, 232, 0.32)',
    summary: {
      en: 'Calm sculptural forms, seamless hidden storage, and tactile natural stone built for bright Riyadh villas.',
      ar: 'خطوط هادئة وأحجار طبيعية وخزائن مخفية مصممة لفلل الرياض المشرقة.',
    },
  },
  {
    id: 'hejazi',
    name: { en: 'Hejazi Warmth', ar: 'دفء حجازي' },
    tagline: { en: 'Roshan lattice woodwork, olive velvet & warm brass', ar: 'خشب روشان، مخمل زيتوني ونحاس دافئ' },
    palette: ['#F3F4EF', '#C3C7B1', '#8E7656', '#424731'],
    overlayTint: 'rgba(142, 118, 86, 0.24)',
    lightingGlow: 'rgba(235, 195, 130, 0.36)',
    summary: {
      en: 'Honors Red Sea coastal craft with custom architectural screens, olive upholstery, and filtered daylight patterns.',
      ar: 'يحتفي بالحرفية الحجازية عبر قواطع خشبية ومعدنية مخصصة وتنجيد زيتوني وإضاءة دافئة.',
    },
  },
  {
    id: 'classic',
    name: { en: 'Contemporary Classic', ar: 'كلاسيك معاصر' },
    tagline: { en: 'Fluted marble paneling, saddle leather & architectural metal', ar: 'رخام مخدد، جلد فاخر وأعمال معدنية معمارية' },
    palette: ['#FFFFFF', '#E4E4E9', '#97512D', '#16161A'],
    overlayTint: 'rgba(46, 38, 29, 0.25)',
    lightingGlow: 'rgba(255, 210, 155, 0.28)',
    summary: {
      en: 'Tailored wall moldings, custom brass-inlaid architectural metalwork, and statement dining pieces for formal majlis halls.',
      ar: 'تكسيات جدارية أنيقة، أعمال معدنية مطعمة بالنحاس، وقطع مميزة للمجالس الرسمية.',
    },
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: { en: 'Interior & Exterior Design', ar: 'التصميم الداخلي والخارجي' },
    desc: { en: '3D spatial concepts, lighting plans & material boards for residential and commercial spaces.', ar: 'تصورات ثلاثية الأبعاد ومخططات إضاءة ولوحات خامات للمشاريع السكنية والتجارية.' },
    metric: { en: 'Riyadh & Jeddah', ar: 'الرياض وجدة' },
  },
  {
    id: 's2',
    title: { en: 'Turnkey Fit-Out', ar: 'تنفيذ الديكور والفت آوت' },
    desc: { en: 'End-to-end site execution, MEP coordination, gypsum, stone cladding & handover.', ar: 'تنفيذ متكامل في الموقع وتنسيق الأعمال الكهروميكانيكية والرخام والتسليم.' },
    metric: { en: 'On-time delivery', ar: 'تسليم في الموعد' },
  },
  {
    id: 's3',
    title: { en: 'Architectural Metal Works', ar: 'الأعمال المعدنية المعمارية' },
    desc: { en: 'Laser-cut brass screens, brushed steel staircases, custom partitions & facades.', ar: 'فواصل نحاسية مقصوصة بالليزر، سلالم ستيل مصقول وواجهات معدنية مخصصة.' },
    metric: { en: 'In-house workshop', ar: 'ورشة تصنيع خاصة' },
  },
  {
    id: 's4',
    title: { en: 'Fire Protection Systems', ar: 'أنظمة الحماية من الحريق' },
    desc: { en: 'Civil-defense compliant fire doors, suppression integration & safety engineering.', ar: 'أبواب مقاومة للحريق وأنظمة سلامة معتمدة ومطابقة لاشتراطات الدفاع المدني.' },
    metric: { en: 'SBC Compliant', ar: 'مطابق لكود البناء' },
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1', slug: 'diriyah-boucle-sofa', category: 'seating',
    title: { en: 'Diriyah Modular Majlis Sofa', ar: 'كنبة مجلس الدرعية المعيارية' },
    priceSar: 8900, dimensions: '280 × 105 × 74 cm',
    material: { en: 'Belgian bouclé & kiln-dried ash', ar: 'قماش بوكل بلجيكي وخشب الدردار' },
    styleTags: ['najdi', 'minimal'], accentHex: '#B5653A', bgHex: '#F6F1EA', shape: 'sofa',
  },
  {
    id: 'p2', slug: 'tuwaiq-travertine-table', category: 'tables',
    title: { en: 'Tuwaiq Fluted Travertine Coffee Table', ar: 'طاولة قهوة طويق من الترافرتين' },
    priceSar: 3450, dimensions: '130 × 80 × 36 cm',
    material: { en: 'Honed beige travertine stone', ar: 'حجر ترافرتين بيج مصقول' },
    styleTags: ['najdi', 'minimal', 'classic'], accentHex: '#8E7656', bgHex: '#EFE7DA', shape: 'table',
  },
  {
    id: 'p3', slug: 'roshan-brass-screen', category: 'metalwork',
    title: { en: 'Roshan Laser-Cut Brass Partition', ar: 'فاصل روشان المعدني بالنحاس' },
    priceSar: 5200, dimensions: '120 × 4 × 240 cm',
    material: { en: 'PVD brushed architectural brass', ar: 'نحاس معماري مصقول بتقنية PVD' },
    styleTags: ['hejazi', 'classic', 'najdi'], accentHex: '#97512D', bgHex: '#F4DFD2', shape: 'screen',
  },
  {
    id: 'p4', slug: 'alula-alabaster-pendant', category: 'lighting',
    title: { en: 'AlUla Warm Alabaster Pendant', ar: 'إضاءة معلقة من حجر الألبستر' },
    priceSar: 2150, dimensions: 'Ø 45 × 32 cm',
    material: { en: 'Spanish alabaster & warm bronze', ar: 'ألبستر إسباني وبرونز دافئ' },
    styleTags: ['najdi', 'hejazi', 'minimal'], accentHex: '#C7764C', bgHex: '#FBF0EA', shape: 'lamp',
  },
  {
    id: 'p5', slug: 'jeddah-olive-lounge-chair', category: 'seating',
    title: { en: 'Al Balad Olive Velvet Lounge Chair', ar: 'كرسي استرخاء مخملي زيتوني' },
    priceSar: 2850, dimensions: '78 × 82 × 76 cm',
    material: { en: 'Performance olive velvet & walnut', ar: 'مخمل زيتوني مقاوم للبقع وخشب جوز' },
    styleTags: ['hejazi', 'minimal'], accentHex: '#6B7350', bgHex: '#E9ECE1', shape: 'chair',
  },
  {
    id: 'p6', slug: 'olaya-steel-console', category: 'tables',
    title: { en: 'Olaya Architectural Steel & Oak Console', ar: 'كونسول العليا من الستيل والبلوط' },
    priceSar: 4100, dimensions: '160 × 40 × 82 cm',
    material: { en: 'Powder-coated steel & smoked oak', ar: 'حديد مطلي حراريًا وبلوط مدخن' },
    styleTags: ['classic', 'minimal'], accentHex: '#4D4030', bgHex: '#EAE5DF', shape: 'console',
  },
];

export const DESIGNERS: Designer[] = [
  { id: 'd1', name: { en: 'Eng. Noura Al-Qahtani', ar: 'م. نورة القحطاني' }, role: { en: 'Lead Interior Architect', ar: 'رئيسة مهندسي التصميم الداخلي' }, office: 'riyadh' },
  { id: 'd2', name: { en: 'Eng. Tariq Al-Harbi', ar: 'م. طارق الحربي' }, role: { en: 'Fit-Out & Metal Works Director', ar: 'مدير الفت آوت والأعمال المعدنية' }, office: 'jeddah' },
  { id: 'd3', name: { en: 'Eng. Lama Al-Saud', ar: 'م. لمى آل سعود' }, role: { en: 'Bespoke Furniture Specialist', ar: 'أخصائية الأثاث المخصص' }, office: 'riyadh' },
];

