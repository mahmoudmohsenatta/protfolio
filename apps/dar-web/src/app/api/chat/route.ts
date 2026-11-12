import { NextResponse } from 'next/server';

import { PRODUCTS, type Lang } from '@/data/dar-catalog';

export async function POST(req: Request) {
  try {
    const { message, lang = 'en' } = (await req.json()) as { message?: string; lang?: Lang };
    const text = (message ?? '').trim();
    if (!text) {
      return NextResponse.json({ reply: '', productIds: [], suggestConsultation: false });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const catalog = PRODUCTS.map((p) => `${p.id}: ${p.title.en} (${p.priceSar} SAR, ${p.category})`).join('; ');
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
                      text: `You are Dar AI (Atlantis Contracting digital studio in Riyadh & Jeddah). Reply in ${
                        lang === 'ar' ? 'Arabic' : 'English'
                      } with JSON ONLY: {"reply": string, "productIds": string[], "suggestConsultation": boolean}. Catalog: ${catalog}. User: ${text}`,
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
          if (parsed?.reply) {
            return NextResponse.json(parsed);
          }
        }
      } catch {
        // Fall back to deterministic studio assistant
      }
    }

    const lower = text.toLowerCase();
    const wantsMetal = /metal|brass|partition|screen|معدن|نحاس|فاصل/i.test(lower);
    const wantsSofa = /sofa|majlis|chair|seat|كنب|مجلس|كرسي/i.test(lower);
    const wantsTable = /table|console|stone|travertine|طاولة|كونسول|رخام/i.test(lower);
    const wantsFitout = /fit-out|fitout|fire|price|cost|riyadh|jeddah|consult|تنفيذ|فت آوت|حريق|سعر|تكلفة|استشارة|الرياض|جدة/i.test(lower);

    const productIds: string[] = [];
    if (wantsMetal) productIds.push('p3');
    if (wantsSofa) productIds.push('p1', 'p5');
    if (wantsTable) productIds.push('p2', 'p6');
    if (productIds.length === 0) productIds.push('p1', 'p2');

    const reply =
      lang === 'ar'
        ? wantsFitout
          ? 'ننفذ مشاريع التصميم الداخلي والفت آوت والأعمال المعدنية وأنظمة السلامة من الحريق في الرياض وجدة مع إمكانية حجز معاينة موقعية مجانية مع مهندسينا. إليك أبرز القطع المقترحة من مصنعنا:'
          : 'أهلاً بك في استوديو دار! بناءً على طلبك، رشحت لك قطعًا مصنعة خصيصًا من ورشتنا، ويمكنك أيضًا حجز استشارة هندسية أو تجربة مصمم الغرف الذكي.'
        : wantsFitout
          ? 'Our Riyadh and Jeddah teams handle turnkey fit-out, SBC-compliant fire protection, architectural metal works, and bespoke furniture. Would you like to schedule an on-site or online designer consultation?'
          : 'Welcome to Dar Studio! Based on your note, I picked bespoke pieces crafted in our workshop — and you can hand off to a designer consultation anytime.';

    return NextResponse.json({
      reply,
      productIds: productIds.slice(0, 2),
      suggestConsultation: true,
    });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}

