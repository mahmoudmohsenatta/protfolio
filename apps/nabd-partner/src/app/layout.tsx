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
  title: 'Nabd Partner | Venue Operations, Schedules & QR Check-In',
  description: 'B2B partner dashboard for Nabd active-lifestyle venues in Riyadh and Jeddah.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" dir="ltr" className={`${ibmPlexArabic.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
