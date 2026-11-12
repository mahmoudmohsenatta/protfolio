import { notFound } from 'next/navigation';

import { CaseStudyView } from '@/components/case-study-view';
import { CASE_STUDIES } from '@/data/portfolio-data';

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((c) => c.slug === slug);
  if (!study) notFound();
  return <CaseStudyView study={study} />;
}

