import { ACTIVITIES, venueById } from '@/data/catalog';
import type { Activity, CategoryId, City, Lang, Vibe } from '@/types';

export interface ConciergeReply {
  message: string;
  activities: Activity[];
  poweredBy: 'gemini' | 'offline';
}

interface ParsedIntent {
  city?: City;
  category?: CategoryId;
  vibe?: Vibe;
  maxCredits?: number;
  womenOnly?: boolean;
  family?: boolean;
  timeBucket?: 'morning' | 'afternoon' | 'evening';
  dayOfWeek?: number;
}

const DAY_WORDS: [RegExp, number][] = [
  [/sunday|الأحد|الاحد/i, 0],
  [/monday|الاثنين|الإثنين/i, 1],
  [/tuesday|الثلاثاء/i, 2],
  [/wednesday|الأربعاء|الاربعاء/i, 3],
  [/thursday|الخميس/i, 4],
  [/friday|الجمعة/i, 5],
  [/saturday|السبت/i, 6],
];

const CATEGORY_WORDS: [RegExp, CategoryId][] = [
  [/fitness|workout|gym|hiit|strength|run|pilates|cardio|لياقة|تمرين|جري|حرق|كارديو|قوة/i, 'fitness'],
  [/wellness|yoga|meditat|spa|relax|pilates|عافية|يوغا|تأمل|استرخاء|بيلاتس|سبا/i, 'wellness'],
  [/sport|padel|dive|scuba|volleyball|رياضة|بادل|غوص|طائرة/i, 'sports'],
  [/music|oud|drum|rhythm|موسيقى|عود|طبول/i, 'music'],
  [/art|pottery|calligraphy|paint|فنون|فخار|خط/i, 'arts'],
  [/fun|family|escape|trampoline|entertainment|ترفيه|ألعاب|ترامبولين|هروب/i, 'entertainment'],
];

function parseQuery(text: string): ParsedIntent {
  const intent: ParsedIntent = {};
  if (/riyadh|الرياض/i.test(text)) intent.city = 'riyadh';
  else if (/jeddah|جدة|جده/i.test(text)) intent.city = 'jeddah';

  for (const [re, cat] of CATEGORY_WORDS) {
    if (re.test(text)) {
      intent.category = cat;
      break;
    }
  }
  if (/calm|quiet|relax|peace|هادي|هادئ|هدوء|استرخاء/i.test(text)) intent.vibe = 'calm';
  else if (/energetic|intense|sweat|burn|high|حماس|قوي|حرق|طاقة/i.test(text)) intent.vibe = 'energetic';
  else if (/creative|art|make|إبداع|فني|يدوي/i.test(text)) intent.vibe = 'creative';
  else if (/social|friends|group|أصدقاء|جماعي/i.test(text)) intent.vibe = 'social';

  if (/women|ladies|female|سيدات|نساء|بنات/i.test(text)) intent.womenOnly = true;
  if (/family|kids|عائلة|عائلي|أطفال/i.test(text)) intent.family = true;

  if (/morning|صباح/i.test(text)) intent.timeBucket = 'morning';
  else if (/afternoon|ظهر|عصر/i.test(text)) intent.timeBucket = 'afternoon';
  else if (/evening|night|sunset|مساء|ليل|غروب/i.test(text)) intent.timeBucket = 'evening';

  for (const [re, day] of DAY_WORDS) {
    if (re.test(text)) {
      intent.dayOfWeek = day;
      break;
    }
  }

  const creditMatch = text.match(/(?:under|below|max|less than|أقل من|حد|تحت)\s*(\d+)/i) ?? text.match(/(\d+)\s*(?:credits?|رصيد)/i);
  if (creditMatch) intent.maxCredits = Number(creditMatch[1]);
  return intent;
}

function scoreActivities(intent: ParsedIntent): Activity[] {
  const scored = ACTIVITIES.map((a) => {
    const venue = venueById(a.venueId);
    let score = 0;
    let hardMismatch = false;
    if (intent.city) {
      if (venue.city === intent.city) score += 4;
      else hardMismatch = true;
    }
    if (intent.womenOnly) {
      if (a.womenOnly) score += 4;
      else hardMismatch = true;
    }
    if (intent.family) {
      if (a.family) score += 3;
      else hardMismatch = true;
    }
    if (intent.maxCredits !== undefined) {
      if (a.credits <= intent.maxCredits) score += 3;
      else hardMismatch = true;
    }
    if (intent.category && a.category === intent.category) score += 4;
    if (intent.vibe && a.vibe.includes(intent.vibe)) score += 3;
    if (intent.dayOfWeek !== undefined && a.days.includes(intent.dayOfWeek)) score += 2;
    if (intent.timeBucket) {
      const ok = a.times.some((t) => {
        const h = Number(t.split(':')[0]);
        return intent.timeBucket === 'morning' ? h < 12 : intent.timeBucket === 'afternoon' ? h >= 12 && h < 17 : h >= 17;
      });
      if (ok) score += 2;
    }
    return { a, score: hardMismatch ? score - 10 : score + a.rating * 0.2 };
  });

  return scored
    .filter((x) => x.score > 1)
    .sort((x, y) => y.score - x.score)
    .slice(0, 4)
    .map((x) => x.a);
}

/**
 * Calls Gemini if `EXPO_PUBLIC_GEMINI_API_KEY` is configured and reachable;
 * otherwise runs a fast, bilingual on-device intent matcher over the catalog.
 */
export async function askConcierge(query: string, lang: Lang, userCity: City): Promise<ConciergeReply> {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  if (apiKey) {
    try {
      const catalogSummary = ACTIVITIES.map((a) => {
        const v = venueById(a.venueId);
        return `${a.id}: ${a.title.en} (${a.category}, ${v.city}, ${a.credits}cr, vibe:${a.vibe.join('/')}${a.womenOnly ? ', womenOnly' : ''}${a.family ? ', family' : ''})`;
      }).join('\n');

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text:
                      `You are Nabd AI, a friendly Saudi active-lifestyle concierge. Reply in ${lang === 'ar' ? 'Arabic' : 'English'} with a JSON object ONLY: {"message": string, "ids": string[]}.\n` +
                      `User default city: ${userCity}. Pick up to 3 matching activity IDs from:\n${catalogSummary}\nUser request: ${query}`,
                  },
                ],
              },
            ],
            generationConfig: { responseMimeType: 'application/json', temperature: 0.4 },
          }),
        },
      );
      if (res.ok) {
        const data = await res.json();
        const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        const parsed = raw ? JSON.parse(raw) : null;
        if (parsed && Array.isArray(parsed.ids)) {
          const picked = parsed.ids
            .map((id: string) => ACTIVITIES.find((a) => a.id === id))
            .filter(Boolean) as Activity[];
          if (picked.length > 0 && typeof parsed.message === 'string') {
            return { message: parsed.message, activities: picked, poweredBy: 'gemini' };
          }
        }
      }
    } catch {
      // Fall through cleanly to offline engine.
    }
  }

  const intent = parseQuery(query);
  const matches = scoreActivities(intent);
  if (matches.length > 0) {
    return {
      poweredBy: 'offline',
      activities: matches,
      message:
        lang === 'ar'
          ? `لقيت لك ${matches.length} خيارات تناسب طلبك:`
          : `Here are ${matches.length} experiences that fit what you're looking for:`,
    };
  }
  const fallback = ACTIVITIES.filter((a) => venueById(a.venueId).city === userCity).slice(0, 3);
  return {
    poweredBy: 'offline',
    activities: fallback,
    message:
      lang === 'ar'
        ? 'ما لقيت تطابق دقيق، لكن هذي أبرز الأنشطة القريبة منك:'
        : "I couldn't find an exact match, so here are popular picks in your city:",
  };
}

