import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { LangProvider } from '@/components/lang-provider';

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
  title: 'Mahmoud Mohsen | Mobile App UI/UX Designer & AI Front-End Developer',
  description:
    'Portfolio by Mahmoud Mohsen tailored for Atlantis Contracting (atlantis.sa) & Lina & Lino (linalino.sa): React Native + Expo mobile apps, Next.js + AI Room Visualizer, Figma & bilingual Arabic RTL design systems.',
  keywords: [
    'Mahmoud Mohsen',
    'Mobile App UI/UX Designer',
    'React Native Expo',
    'Next.js Tailwind Developer',
    'Arabic RTL Design System',
    'AI Front-End Developer',
    'Atlantis Contracting',
    'Lina & Lino',
  ],
  openGraph: {
    title: 'Mahmoud Mohsen — Bilingual Mobile UI/UX & AI Front-End Portfolio',
    description:
      'Tailored spec projects covering credit marketplaces, QR check-ins, AI room visualization, furniture e-commerce, and shared AR/EN RTL tokens.',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mahmoud Mohsen',
    email: 'mahmoudmohsenatta@gmail.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG' },
    jobTitle: 'Mobile App UI/UX Designer & Front-End Developer (AI)',
    knowsAbout: ['Figma', 'React Native', 'Expo', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Arabic RTL', 'Generative AI'],
  };

  return (
    <html lang="en" dir="ltr" className={`${ibmPlexArabic.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
