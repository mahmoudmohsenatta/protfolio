-- Seed data for Sahm Platform (Nabd Venues/Activities + Dar Furniture Catalog)

insert into public.venues (id, name_en, name_ar, district_en, district_ar, city, lat, lng) values
  ('v1', 'Pulse Studio', 'استوديو بلس', 'Al Olaya', 'العليا', 'riyadh', 24.6948, 46.6853),
  ('v2', 'Sakina Wellness House', 'بيت سكينة للعافية', 'Hittin', 'حطين', 'riyadh', 24.7616, 46.6006),
  ('v3', 'Boulevard Padel Club', 'نادي بوليفارد بادل', 'Hittin', 'حطين', 'riyadh', 24.7686, 46.6046),
  ('v4', 'Oud & Strings Academy', 'أكاديمية العود والأوتار', 'Al Malqa', 'الملقا', 'riyadh', 24.8126, 46.6114),
  ('v5', 'JAX Art Lab', 'مختبر جاكس للفنون', 'Diriyah', 'الدرعية', 'riyadh', 24.7352, 46.5753),
  ('v6', 'Corniche Active', 'كورنيش أكتف', 'Al Shati', 'الشاطئ', 'jeddah', 21.5947, 39.1088),
  ('v7', 'Red Sea Dive Center', 'مركز البحر الأحمر للغوص', 'Obhur', 'أبحر', 'jeddah', 21.7376, 39.0927),
  ('v8', 'Balad Creative Space', 'مساحة البلد الإبداعية', 'Al Balad', 'البلد', 'jeddah', 21.4858, 39.1863),
  ('v9', 'Hayat Spa & Yoga', 'حياة سبا ويوغا', 'Al Rawdah', 'الروضة', 'jeddah', 21.5636, 39.1559),
  ('v10', 'Fun Zone Arena', 'ساحة فن زون', 'Al Hamra', 'الحمراء', 'jeddah', 21.5292, 39.1611)
on conflict (id) do nothing;

insert into public.activities (id, venue_id, category, title_en, title_ar, description_en, description_ar, credits, duration_min, capacity, women_only, family_friendly, rating) values
  ('a1', 'v1', 'fitness', 'HIIT Burn', 'هييت حرق الدهون', 'High-intensity interval training mixing strength and cardio.', 'جلسة تمارين متقطعة عالية الشدة تجمع القوة والكارديو.', 6, 45, 20, false, false, 4.8),
  ('a2', 'v2', 'wellness', 'Sunset Vinyasa Yoga', 'يوغا فينياسا الغروب', 'Flowing yoga to release tension and reconnect with breath.', 'يوغا انسيابية لتخفيف التوتر والتواصل مع التنفس.', 5, 60, 16, true, false, 4.9),
  ('a3', 'v3', 'sports', 'Padel for Beginners', 'بادل للمبتدئين', 'Learn grips, serves and wall play with a certified coach.', 'تعلّم المسكات والإرسال واللعب مع مدرب معتمد.', 8, 60, 4, false, true, 4.7),
  ('a4', 'v4', 'music', 'Intro to Oud', 'مقدمة في العود', 'Posture, picking and a simple maqam melody.', 'خطواتك الأولى على العود ومقام بسيط.', 7, 50, 6, false, false, 4.9),
  ('a5', 'v5', 'arts', 'Pottery Wheel Session', 'جلسة عجلة الفخار', 'Shape your own bowl on the wheel with glazing included.', 'اصنع وعاءك الخاص على عجلة الفخار.', 6, 90, 12, false, true, 4.8),
  ('a6', 'v6', 'fitness', 'Corniche Run Club', 'نادي الجري على الكورنيش', 'Guided 5K run along the Jeddah Corniche.', 'جري موجّه لمسافة 5 كم على كورنيش جدة.', 4, 40, 30, false, false, 4.6),
  ('a7', 'v7', 'sports', 'Discover Scuba Diving', 'اكتشف الغوص', 'Breathe underwater in the Red Sea with a PADI instructor.', 'تنفّس تحت الماء في البحر الأحمر مع مدرب معتمد.', 14, 120, 8, false, false, 4.9),
  ('a8', 'v8', 'arts', 'Arabic Calligraphy', 'الخط العربي', 'Learn Naskh script with reed pens in Al Balad.', 'تعلّم أساسيات خط النسخ في البلد التاريخية.', 5, 75, 14, false, false, 4.7),
  ('a9', 'v9', 'wellness', 'Sound Bath & Meditation', 'حمّام صوتي وتأمل', 'Unwind with singing bowls and guided meditation.', 'استرخِ مع الأوعية الصوتية والتأمل الموجّه.', 9, 60, 10, true, false, 4.8),
  ('a10', 'v10', 'entertainment', 'Trampoline & Ninja Park', 'حديقة الترامبولين والنينجا', 'Bounce, climb and race through the ninja course.', 'اقفز وتسابق في مسار النينجا.', 6, 60, 24, false, true, 4.5)
on conflict (id) do nothing;

insert into public.products (id, slug, category, title_en, title_ar, price_sar, dimensions_cm, material_en, material_ar, style_tags) values
  ('p1', 'diriyah-boucle-sofa', 'seating', 'Diriyah Modular Majlis Sofa', 'كنبة مجلس الدرعية المعيارية', 8900.00, '280 x 105 x 74 cm', 'Belgian boucle & kiln-dried ash', 'قماش بوكل بلجيكي وخشب الدردار', array['najdi', 'minimal']),
  ('p2', 'tuwaiq-travertine-table', 'tables', 'Tuwaiq Fluted Travertine Coffee Table', 'طاولة قهوة طويق من الترافرتين', 3450.00, '130 x 80 x 36 cm', 'Honed beige travertine stone', 'حجر ترافرتين بيج مصقول', array['najdi', 'minimal', 'classic']),
  ('p3', 'roshan-brass-screen', 'metalwork', 'Roshan Laser-Cut Brass Partition', 'فاصل روشان المعدني بالنحاس', 5200.00, '120 x 4 x 240 cm', 'PVD brushed architectural brass', 'نحاس معماري مصقول بتقنية PVD', array['hejazi', 'classic', 'najdi']),
  ('p4', 'alula-alabaster-pendant', 'lighting', 'AlUla Warm Alabaster Pendant', 'إضاءة معلقة من حجر الألبستر', 2150.00, '45 x 32 cm', 'Spanish alabaster & warm bronze', 'ألبستر إسباني وبرونز دافئ', array['najdi', 'hejazi', 'minimal']),
  ('p5', 'jeddah-olive-lounge-chair', 'seating', 'Al Balad Olive Velvet Lounge Chair', 'كرسي استرخاء مخملي زيتوني', 2850.00, '78 x 82 x 76 cm', 'Performance olive velvet & walnut', 'مخمل زيتوني مقاوم للبقع وخشب جوز', array['hejazi', 'minimal']),
  ('p6', 'olaya-steel-console', 'tables', 'Olaya Architectural Steel & Oak Console', 'كونسول العليا من الستيل والبلوط', 4100.00, '160 x 40 x 82 cm', 'Powder-coated steel & smoked oak', 'حديد مطلي حراريًا وبلوط مدخن', array['classic', 'minimal'])
on conflict (id) do nothing;

