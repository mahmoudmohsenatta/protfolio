import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { categoryMeta, venueById } from '@/data/catalog';
import { L } from '@/lib/format';
import { useAppStore } from '@/store/app-store';
import { radius, spacing, useTheme } from '@/theme';
import { useDirection } from '@/theme/direction';
import type { Activity } from '@/types';

import { Text } from './ui/text';

const CITY_CENTER = {
  riyadh: { latitude: 24.73, longitude: 46.63, latitudeDelta: 0.18, longitudeDelta: 0.18 },
  jeddah: { latitude: 21.56, longitude: 39.14, latitudeDelta: 0.2, longitudeDelta: 0.2 },
};

export function ActivityMap({ activities }: { activities: Activity[] }) {
  const city = useAppStore((s) => s.city);
  const { lang } = useDirection();
  const { colors } = useTheme();

  return (
    <MapView style={StyleSheet.absoluteFill} initialRegion={CITY_CENTER[city]} showsUserLocation>
      {activities.map((a) => {
        const venue = venueById(a.venueId);
        const color = categoryMeta(a.category).color[0];
        return (
          <Marker
            key={a.id}
            coordinate={{ latitude: venue.lat, longitude: venue.lng }}
            title={L(a.title, lang)}
            description={`${L(venue.name, lang)} · ${a.credits}`}
            onCalloutPress={() => router.push(`/activity/${a.id}`)}>
            <View style={[styles.pin, { backgroundColor: color, borderColor: colors.surface }]}>
              <Text variant="caption" weight="bold" style={{ color: '#fff' }}>
                {a.credits}
              </Text>
            </View>
          </Marker>
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  pin: {
    paddingHorizontal: spacing[2] + 2,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 2,
  },
});

