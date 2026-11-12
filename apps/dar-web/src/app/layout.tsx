import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

const ibmPlexArabic = localFont({
  variable: '--font-plex',
  display: 'swap',
  src: [
    { path: '../fonts/IBMPlexSansArabic_400Regular.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/IBMPlexSansArabic_500Medium.ttf', weight: '500', style: 'normal' },
    { path: '../fonts/IBMPlexSansArabic_600SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../fonts/IBMPlexSansArabic_700Bold.ttf', weight: '700', style: 'normal' },
  ],
});

export const metadata: Metadata = {
  title: 'Dar | Interior Design, Fit-Out, Custom Furniture & AI Room Designer',
  description:
    'Saudi architectural design, turnkey fit-out, metal works, custom furniture store & AI Room Visualizer for Riyadh and Jeddah.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Dar Architectural Design & Fit-Out',
    areaServed: ['Riyadh', 'Jeddah'],
    serviceType: ['Interior Design', 'Turnkey Fit-Out', 'Architectural Metal Works', 'Custom Furniture'],
  };

  return (
    <html lang="en" dir="ltr" className={`${ibmPlexArabic.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
