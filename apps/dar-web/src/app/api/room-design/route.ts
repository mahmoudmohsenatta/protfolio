import { NextResponse } from 'next/server';

import { DESIGN_STYLES, PRODUCTS, type Lang, type StyleId } from '@/data/dar-catalog';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      styleId?: StyleId;
      roomType?: string;
      notes?: string;
      lang?: Lang;
    };

    const style = DESIGN_STYLES.find((s) => s.id === body.styleId) ?? DESIGN_STYLES[0];
    const lang: Lang = body.lang === 'ar' ? 'ar' : 'en';
    const roomType = body.roomType || (lang === 'ar' ? 'مجلس معيشة' : 'Living Majlis');
    const matchedProducts = PRODUCTS.filter((p) => p.styleTags.includes(style.id)).slice(0, 3);

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
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
                      text: `You are Dar's senior Saudi interior architect. Write a concise 2-sentence architectural redesign brief in ${
                        lang === 'ar' ? 'Arabic' : 'English'
                      } for a "${roomType}" redesigned in "${style.name.en}" style. User notes: "${
                        body.notes || 'None'
                      }". Mention warm materials, lighting, and custom furniture fit-out.`,
                    },
                  ],
                },
              ],
              generationConfig: { temperature: 0.5 },
            }),
          },
        );
        if (res.ok) {
          const data = await res.json();
          const conceptNote = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (conceptNote) {
            return NextResponse.json({
              style,
              conceptNote,
              productIds: matchedProducts.map((p) => p.id),
              poweredBy: 'gemini',
            });
          }
        }
      } catch {
        // Fallback below
      }
    }

    const conceptNote =
      lang === 'ar'
        ? `تصميم مقترح لـ (${roomType}) بطراز ${style.name.ar}: ${style.summary.ar}${
            body.notes ? ` مع مراعاة طلبك: «${body.notes}».` : ''
          }`
        : `Redesigned ${roomType} in ${style.name.en}: ${style.summary.en}${
            body.notes ? ` Tailored around your note: "${body.notes}".` : ''
          }`;

    return NextResponse.json({
      style,
      conceptNote,
      productIds: matchedProducts.map((p) => p.id),
      poweredBy: 'studio-engine',
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

