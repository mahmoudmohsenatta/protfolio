'use client';

import { Calendar, MessageSquare, Send, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

import { PRODUCTS, type Lang, type Product } from '@/data/dar-catalog';

interface Msg {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  productIds?: string[];
  suggestConsultation?: boolean;
}

export function AiChatbot({
  lang,
  onAddToCart,
  onBookConsultation,
}: {
  lang: Lang;
  onAddToCart: (p: Product) => void;
  onBookConsultation: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text:
        lang === 'ar'
          ? 'مرحبًا بك في استوديو دار! اسألني عن تصميم المجالس، الفت آوت في الرياض وجدة، الأعمال المعدنية أو الأثاث المخصص.'
          : 'Welcome to Dar Studio! Ask about Riyadh/Jeddah fit-out, architectural metalwork, furniture pricing, or booking a designer.',
    },
  ]);

  const send = async (preset?: string) => {
    const q = (preset ?? input).trim();
    if (!q || busy) return;
    if (!preset) setInput('');

    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', text: q }]);
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q, lang }),
      });
      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            text: data.reply,
            productIds: data.productIds,
            suggestConsultation: data.suggestConsultation,
          },
        ]);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed bottom-5 end-5 z-40">
      {open ? (
        <div className="flex w-[min(92dvw,23rem)] flex-col overflow-hidden rounded-3xl border border-[#E9DFD0] bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#2E261D] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-[#F4D9CB]" />
              <span className="text-sm font-bold">
                {lang === 'ar' ? 'مستشار دار الذكي' : 'Dar AI Consultant'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 hover:bg-white/15 cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="max-h-80 space-y-3 overflow-y-auto p-4 text-xs">
            {messages.map((m) => (
              <div key={m.id} className={m.role === 'user' ? 'text-end' : 'text-start'}>
                <div
                  className={`inline-block max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#B5653A] text-white'
                      : 'bg-[#F6F1EA] text-[#2E261D]'
                  }`}
                >
                  {m.text}
                </div>

                {m.productIds && m.productIds.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    {m.productIds.map((pid) => {
                      const p = PRODUCTS.find((item) => item.id === pid);
                      if (!p) return null;
                      return (
                        <div
                          key={pid}
                          className="flex items-center justify-between rounded-xl border border-[#E9DFD0] bg-white p-2"
                        >
                          <div>
                            <div className="font-bold text-[#2E261D]">
                              {lang === 'ar' ? p.title.ar : p.title.en}
                            </div>
                            <div className="text-[#B5653A]">{p.priceSar.toLocaleString()} SAR</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => onAddToCart(p)}
                            className="rounded-full bg-[#2E261D] px-2.5 py-1 text-[10px] font-semibold text-white cursor-pointer"
                          >
                            + {lang === 'ar' ? 'سلة' : 'Bag'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {m.suggestConsultation && (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onBookConsultation();
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#B5653A] px-3 py-1 text-[11px] font-semibold text-[#B5653A] hover:bg-[#FBF0EA] cursor-pointer"
                  >
                    <Calendar className="size-3" />
                    <span>{lang === 'ar' ? 'احجز استشارة مع مصمم' : 'Book a designer visit'}</span>
                  </button>
                )}
              </div>
            ))}
            {busy && <div className="text-xs text-[#6E5B43]">…</div>}
          </div>

          <div className="flex items-center gap-2 border-t border-[#E9DFD0] p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') send();
              }}
              placeholder={lang === 'ar' ? 'اسأل عن الفت آوت أو الأثاث…' : 'Ask about fit-out or furniture…'}
              className="flex-1 rounded-full border border-[#E9DFD0] bg-[#FBF8F3] px-3.5 py-2 text-xs text-[#2E261D] focus:outline-2 focus:outline-[#B5653A]"
            />
            <button
              type="button"
              onClick={() => send()}
              disabled={!input.trim() || busy}
              aria-label="Send"
              className="grid size-8 place-items-center rounded-full bg-[#B5653A] text-white disabled:opacity-40 cursor-pointer"
            >
              <Send className="size-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#2E261D] px-5 py-3 text-xs font-semibold text-white shadow-lg hover:bg-[#4D4030] cursor-pointer"
        >
          <MessageSquare className="size-4 text-[#F4D9CB]" />
          <span>{lang === 'ar' ? 'مستشار التصميم AI' : 'AI Design Chat'}</span>
        </button>
      )}
    </div>
  );
}

