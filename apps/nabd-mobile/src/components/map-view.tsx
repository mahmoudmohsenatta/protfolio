import { StyleSheet, View } from 'react-native';

import { spacing } from '@/theme';
import type { Activity } from '@/types';

/** Interactive map is provided in `map-view.native.tsx`; web renders a polite notice. */
export function ActivityMap(_props: { activities: Activity[] }) {
  return <View style={styles.box} />;
}

const styles = StyleSheet.create({
  box: { flex: 1, margin: spacing[5] },
});
