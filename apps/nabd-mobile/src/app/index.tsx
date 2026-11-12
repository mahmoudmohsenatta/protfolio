import { Redirect } from 'expo-router';

import { useAppStore } from '@/store/app-store';

export default function IndexGate() {
  const hydrated = useAppStore((s) => s.hydrated);
  const onboarded = useAppStore((s) => s.onboarded);
  const user = useAppStore((s) => s.user);

  if (!hydrated) return null;
  if (!onboarded) return <Redirect href="/onboarding" />;
  if (!user) return <Redirect href="/auth" />;
  return <Redirect href="/(tabs)" />;
}
