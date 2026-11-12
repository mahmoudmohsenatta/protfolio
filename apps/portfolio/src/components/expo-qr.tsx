'use client';

import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

export function ExpoQrCode({ url }: { url: string }) {
  const [svgMarkup, setSvgMarkup] = useState<string>('');

  useEffect(() => {
    let active = true;
    QRCode.toString(url, {
      type: 'svg',
      margin: 1,
      color: { dark: '#100B2C', light: '#FFFFFF' },
    })
      .then((svg) => {
        if (active) setSvgMarkup(svg);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [url]);

  return (
    <div
      className="inline-grid place-items-center rounded-2xl bg-white p-3 shadow-sm border border-[#E4E4E9] size-40"
      aria-label={`QR code for ${url}`}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}

