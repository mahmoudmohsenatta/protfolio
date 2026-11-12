import type { Activity, CategoryId, Plan, TopUp, Venue } from '@/types';

export const CATEGORIES: { id: CategoryId; icon: string; color: [string, string] }[] = [
  { id: 'fitness', icon: 'barbell', color: ['#FF5A36', '#FF916F'] },
  { id: 'wellness', icon: 'leaf', color: ['#14B8A6', '#5EEAD4'] },
  { id: 'sports', icon: 'football', color: ['#3A2F8A', '#7F77C2'] },
  { id: 'music', icon: 'musical-notes', color: ['#C13214', '#FF7550'] },
  { id: 'arts', icon: 'color-palette', color: ['#B5653A', '#E8B398'] },
  { id: 'entertainment', icon: 'sparkles', color: ['#211A57', '#544AA6'] },
];

export const categoryMeta = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)!;

export const VENUES: Venue[] = [
  { id: 'v1', name: { en: 'Pulse Studio', ar: 'استوديو بلس' }, district: { en: 'Al Olaya', ar: 'العليا' }, city: 'riyadh', lat: 24.6948, lng: 46.6853 },
  { id: 'v2', name: { en: 'Sakina Wellness House', ar: 'بيت سكينة للعافية' }, district: { en: 'Hittin', ar: 'حطين' }, city: 'riyadh', lat: 24.7616, lng: 46.6006 },
  { id: 'v3', name: { en: 'Boulevard Padel Club', ar: 'نادي بوليفارد بادل' }, district: { en: 'Hittin', ar: 'حطين' }, city: 'riyadh', lat: 24.7686, lng: 46.6046 },
  { id: 'v4', name: { en: 'Oud & Strings Academy', ar: 'أكاديمية العود والأوتار' }, district: { en: 'Al Malqa', ar: 'الملقا' }, city: 'riyadh', lat: 24.8126, lng: 46.6114 },
  { id: 'v5', name: { en: 'JAX Art Lab', ar: 'مختبر جاكس للفنون' }, district: { en: 'Diriyah', ar: 'الدرعية' }, city: 'riyadh', lat: 24.7352, lng: 46.5753 },
  { id: 'v6', name: { en: 'Corniche Active', ar: 'كورنيش أكتف' }, district: { en: 'Al Shati', ar: 'الشاطئ' }, city: 'jeddah', lat: 21.5947, lng: 39.1088 },
  { id: 'v7', name: { en: 'Red Sea Dive Center', ar: 'مركز البحر الأحمر للغوص' }, district: { en: 'Obhur', ar: 'أبحر' }, city: 'jeddah', lat: 21.7376, lng: 39.0927 },
  { id: 'v8', name: { en: 'Balad Creative Space', ar: 'مساحة البلد الإبداعية' }, district: { en: 'Al Balad', ar: 'البلد' }, city: 'jeddah', lat: 21.4858, lng: 39.1863 },
  { id: 'v9', name: { en: 'Hayat Spa & Yoga', ar: 'حياة سبا ويوغا' }, district: { en: 'Al Rawdah', ar: 'الروضة' }, city: 'jeddah', lat: 21.5636, lng: 39.1559 },
  { id: 'v10', name: { en: 'Fun Zone Arena', ar: 'ساحة فن زون' }, district: { en: 'Al Hamra', ar: 'الحمراء' }, city: 'jeddah', lat: 21.5292, lng: 39.1611 },
];

export const venueById = (id: string) => VENUES.find((v) => v.id === id)!;

const ALL_WEEK = [0, 1, 2, 3, 4, 5, 6];
const WEEKDAYS = [0, 1, 2, 3, 4];
const WEEKEND = [4, 5, 6];

export const ACTIVITIES: Activity[] = [
  {
    id: 'a1', category: 'fitness', venueId: 'v1', credits: 6, durationMin: 45, level: 'intermediate', rating: 4.8, reviews: 312,
    vibe: ['energetic'], times: ['06:30', '18:00', '20:30'], days: ALL_WEEK, capacity: 20, icon: 'flash',
    title: { en: 'HIIT Burn', ar: 'هييت حرق الدهون' },
    description: { en: 'A 45-minute high-intensity interval session mixing strength and cardio. Expect to sweat — and to leave buzzing.', ar: 'جلسة تمارين متقطعة عالية الشدة لمدة 45 دقيقة تجمع القوة والكارديو. جهّز نفسك للعرق والطاقة.' },
  },
  {
    id: 'a2', category: 'wellness', venueId: 'v2', credits: 5, durationMin: 60, level: 'allLevels', rating: 4.9, reviews: 540,
    vibe: ['calm'], times: ['07:00', '17:30', '19:30'], days: ALL_WEEK, capacity: 16, icon: 'flower', womenOnly: true,
    title: { en: 'Sunset Vinyasa Yoga', ar: 'يوغا فينياسا الغروب' },
    description: { en: 'Flowing yoga to release tension and reconnect with your breath. Mats and props provided.', ar: 'يوغا انسيابية لتخفيف التوتر والتواصل مع تنفسك. السجادات والأدوات متوفرة.' },
  },
  {
    id: 'a3', category: 'sports', venueId: 'v3', credits: 8, durationMin: 60, level: 'beginner', rating: 4.7, reviews: 198,
    vibe: ['social', 'energetic'], times: ['16:00', '19:00', '22:00'], days: ALL_WEEK, capacity: 4, icon: 'tennisball', family: true,
    title: { en: 'Padel for Beginners', ar: 'بادل للمبتدئين' },
    description: { en: 'Learn grips, serves and wall play with a certified coach. Rackets included.', ar: 'تعلّم المسكات والإرسال واللعب على الجدار مع مدرب معتمد. المضارب متوفرة.' },
  },
  {
    id: 'a4', category: 'music', venueId: 'v4', credits: 7, durationMin: 50, level: 'beginner', rating: 4.9, reviews: 87,
    vibe: ['calm', 'creative'], times: ['17:00', '20:00'], days: WEEKDAYS, capacity: 6, icon: 'musical-note',
    title: { en: 'Intro to Oud', ar: 'مقدمة في العود' },
    description: { en: 'Your first steps on the oud: posture, picking and a simple maqam melody. Instruments provided.', ar: 'خطواتك الأولى على العود: الجلسة، الريشة ولحن بسيط على مقام. الآلات متوفرة.' },
  },
  {
    id: 'a5', category: 'arts', venueId: 'v5', credits: 6, durationMin: 90, level: 'allLevels', rating: 4.8, reviews: 142,
    vibe: ['creative', 'calm'], times: ['16:30', '19:30'], days: ALL_WEEK, capacity: 12, icon: 'brush', family: true,
    title: { en: 'Pottery Wheel Session', ar: 'جلسة عجلة الفخار' },
    description: { en: 'Get your hands dirty on the wheel and shape your own bowl. Glazing and firing included.', ar: 'اصنع وعاءك الخاص على عجلة الفخار. التلوين والحرق مشمولان.' },
  },
  {
    id: 'a6', category: 'fitness', venueId: 'v6', credits: 4, durationMin: 40, level: 'allLevels', rating: 4.6, reviews: 401,
    vibe: ['energetic', 'social'], times: ['06:00', '17:30'], days: ALL_WEEK, capacity: 30, icon: 'walk',
    title: { en: 'Corniche Run Club', ar: 'نادي الجري على الكورنيش' },
    description: { en: 'A guided 5K run along the Jeddah Corniche with warm-up, pacing groups and cool-down.', ar: 'جري موجّه لمسافة 5 كم على كورنيش جدة مع إحماء ومجموعات سرعة وتهدئة.' },
  },
  {
    id: 'a7', category: 'sports', venueId: 'v7', credits: 14, durationMin: 120, level: 'beginner', rating: 4.9, reviews: 76,
    vibe: ['calm', 'energetic'], times: ['08:00', '14:00'], days: WEEKEND, capacity: 8, icon: 'water',
    title: { en: 'Discover Scuba Diving', ar: 'اكتشف الغوص' },
    description: { en: 'Breathe underwater for the first time in the Red Sea with a PADI instructor. All gear included.', ar: 'تنفّس تحت الماء لأول مرة في البحر الأحمر مع مدرب PADI. جميع المعدات مشمولة.' },
  },
  {
    id: 'a8', category: 'arts', venueId: 'v8', credits: 5, durationMin: 75, level: 'beginner', rating: 4.7, reviews: 119,
    vibe: ['creative', 'calm'], times: ['17:00', '20:00'], days: ALL_WEEK, capacity: 14, icon: 'pencil',
    title: { en: 'Arabic Calligraphy', ar: 'الخط العربي' },
    description: { en: 'Learn the basics of Naskh script with reed pens and ink in the heart of historic Al Balad.', ar: 'تعلّم أساسيات خط النسخ بأقلام القصب والحبر في قلب البلد التاريخية.' },
  },
  {
    id: 'a9', category: 'wellness', venueId: 'v9', credits: 9, durationMin: 60, level: 'allLevels', rating: 4.8, reviews: 233,
    vibe: ['calm'], times: ['18:00', '21:00'], days: ALL_WEEK, capacity: 10, icon: 'moon', womenOnly: true,
    title: { en: 'Sound Bath & Meditation', ar: 'حمّام صوتي وتأمل' },
    description: { en: 'Unwind with singing bowls and guided meditation. Perfect after a long week.', ar: 'استرخِ مع الأوعية الصوتية والتأمل الموجّه. مثالي بعد أسبوع طويل.' },
  },
  {
    id: 'a10', category: 'entertainment', venueId: 'v10', credits: 6, durationMin: 60, level: 'allLevels', rating: 4.5, reviews: 612,
    vibe: ['social', 'energetic'], times: ['16:00', '18:00', '20:00', '22:00'], days: ALL_WEEK, capacity: 24, icon: 'game-controller', family: true,
    title: { en: 'Trampoline & Ninja Park', ar: 'حديقة الترامبولين والنينجا' },
    description: { en: 'Bounce, climb and race through the ninja course. Great for friends and families.', ar: 'اقفز وتسلّق وتسابق في مسار النينجا. ممتع للأصدقاء والعائلات.' },
  },
  {
    id: 'a11', category: 'fitness', venueId: 'v1', credits: 7, durationMin: 50, level: 'advanced', rating: 4.8, reviews: 156,
    vibe: ['energetic'], times: ['07:00', '19:00'], days: WEEKDAYS, capacity: 12, icon: 'barbell',
    title: { en: 'Strength & Conditioning', ar: 'القوة واللياقة' },
    description: { en: 'Barbell-based strength training in small groups with technique coaching.', ar: 'تدريب قوة بالبار في مجموعات صغيرة مع تصحيح الأداء.' },
  },
  {
    id: 'a12', category: 'music', venueId: 'v8', credits: 5, durationMin: 60, level: 'allLevels', rating: 4.6, reviews: 94,
    vibe: ['social', 'creative'], times: ['20:30'], days: [3, 4, 5], capacity: 20, icon: 'mic',
    title: { en: 'Drum Circle Night', ar: 'أمسية دائرة الطبول' },
    description: { en: 'Join a joyful community drum circle — no experience needed, just rhythm.', ar: 'انضم لدائرة طبول جماعية مبهجة — لا تحتاج خبرة، فقط إيقاع.' },
  },
  {
    id: 'a13', category: 'entertainment', venueId: 'v3', credits: 10, durationMin: 60, level: 'allLevels', rating: 4.7, reviews: 208,
    vibe: ['social'], times: ['19:00', '21:30'], days: [3, 4, 5, 6], capacity: 6, icon: 'key', family: true,
    title: { en: 'Escape Room: Old Diriyah', ar: 'غرفة الهروب: الدرعية القديمة' },
    description: { en: 'Solve historic riddles to escape within 60 minutes. Teams of 2–6.', ar: 'حل ألغازًا تاريخية للهروب خلال 60 دقيقة. فرق من 2 إلى 6.' },
  },
  {
    id: 'a14', category: 'wellness', venueId: 'v2', credits: 6, durationMin: 50, level: 'beginner', rating: 4.7, reviews: 180,
    vibe: ['calm'], times: ['08:00', '18:30'], days: ALL_WEEK, capacity: 12, icon: 'body',
    title: { en: 'Reformer Pilates', ar: 'بيلاتس ريفورمر' },
    description: { en: 'Low-impact core and posture work on reformer machines in a calm, small-group studio.', ar: 'تمارين منخفضة التأثير للجذع والقوام على أجهزة الريفورمر في مجموعات صغيرة.' },
  },
  {
    id: 'a15', category: 'sports', venueId: 'v6', credits: 5, durationMin: 60, level: 'intermediate', rating: 4.6, reviews: 131,
    vibe: ['social', 'energetic'], times: ['17:00', '20:00'], days: ALL_WEEK, capacity: 14, icon: 'basketball',
    title: { en: 'Beach Volleyball', ar: 'كرة الطائرة الشاطئية' },
    description: { en: 'Team up for coached drills and friendly matches on the sand by the Red Sea.', ar: 'تمارين مع مدرب ومباريات ودية على الرمال بجانب البحر الأحمر.' },
  },
  {
    id: 'a16', category: 'fitness', venueId: 'v9', credits: 5, durationMin: 45, level: 'allLevels', rating: 4.7, reviews: 264,
    vibe: ['energetic', 'social'], times: ['10:00', '19:00'], days: ALL_WEEK, capacity: 18, icon: 'heart', womenOnly: true,
    title: { en: 'Dance Cardio', ar: 'كارديو رقص' },
    description: { en: 'Upbeat dance-inspired cardio. Fun choreography, zero judgement.', ar: 'كارديو حماسي مستوحى من الرقص. حركات ممتعة بدون أي حكم.' },
  },
];

export const activityById = (id: string) => ACTIVITIES.find((a) => a.id === id);

export const PLANS: Plan[] = [
  { id: 'starter', credits: 30, priceSar: 199, rollover: 5, bookAheadDays: 3, perks: [] },
  { id: 'active', credits: 60, priceSar: 349, rollover: 15, bookAheadDays: 7, perks: ['friend'], popular: true },
  { id: 'pro', credits: 100, priceSar: 499, rollover: 30, bookAheadDays: 14, perks: ['friend', 'priority'] },
];

export const planById = (id: string) => PLANS.find((p) => p.id === id);

export const TOP_UPS: TopUp[] = [
  { id: 't10', credits: 10, priceSar: 79 },
  { id: 't20', credits: 20, priceSar: 149 },
  { id: 't40', credits: 40, priceSar: 279 },
];

