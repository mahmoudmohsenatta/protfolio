import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Card, Header, Input, Row, Screen } from '@/components/ui';
import { activityById } from '@/data/catalog';
import { formatWhen, L } from '@/lib/format';
import { useAppStore } from '@/store/app-store';
import { radius, spacing, useTheme } from '@/theme';
import { useDirection } from '@/theme/direction';
import type { Booking } from '@/types';

type ScanOutcome =
  | { status: 'success'; booking: Booking }
  | { status: 'already' | 'invalid' | 'cancelled' };

export default function ScannerScreen() {
  const { demoId } = useLocalSearchParams<{ demoId?: string }>();
  const { t } = useTranslation();
  const { lang } = useDirection();
  const { colors } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();

  const bookings = useAppStore((s) => s.bookings);
  const checkIn = useAppStore((s) => s.checkIn);

  const [manualCode, setManualCode] = useState('');
  const [outcome, setOutcome] = useState<ScanOutcome | null>(null);

  const processPayload = (raw: string) => {
    const cleaned = raw.trim();
    const idFromUri = cleaned.startsWith('nabd://checkin/') ? cleaned.replace('nabd://checkin/', '') : cleaned;
    const match = bookings.find(
      (b) => b.id === idFromUri || b.code.toUpperCase() === cleaned.toUpperCase(),
    );
    if (!match) {
      setOutcome({ status: 'invalid' });
      return;
    }
    const res = checkIn(match.id);
    if (res.ok) {
      if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      setOutcome({ status: 'success', booking: res.booking });
    } else {
      setOutcome({ status: res.reason });
    }
  };

  const handleBarCode = (result: BarcodeScanningResult) => {
    if (outcome) return;
    processPayload(result.data);
  };

  const demoCandidate =
    (demoId ? bookings.find((b) => b.id === demoId) : undefined) ??
    bookings.find((b) => b.status === 'confirmed');

  return (
    <Screen>
      <Header title={t('scanner.title')} />

      {outcome ? (
        <Card style={{ alignItems: 'center', gap: spacing[3], paddingVertical: spacing[8] }}>
          <View
            style={[
              styles.resultIcon,
              {
                backgroundColor:
                  outcome.status === 'success' ? colors.success + '20' : colors.warning + '20',
              },
            ]}>
            <Icon
              name={outcome.status === 'success' ? 'checkmark-circle' : 'alert-circle'}
              size={48}
              color={outcome.status === 'success' ? 'success' : 'warning'}
            />
          </View>
          <Text variant="h2" center>
            {outcome.status === 'success'
              ? t('scanner.success')
              : outcome.status === 'already'
                ? t('scanner.already')
                : t('scanner.invalid')}
          </Text>
          {outcome.status === 'success' && (
            <View style={{ alignItems: 'center', gap: 4 }}>
              <Text variant="label">
                {L(activityById(outcome.booking.activityId)?.title ?? { en: '', ar: '' }, lang)}
              </Text>
              <Text variant="caption" muted>
                {outcome.booking.code} · {formatWhen(outcome.booking.start, lang)}
              </Text>
            </View>
          )}
          <Button title={t('scanner.scanAgain')} full onPress={() => setOutcome(null)} style={{ marginTop: spacing[3] }} />
        </Card>
      ) : (
        <View style={{ gap: spacing[5] }}>
          <View style={[styles.cameraBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {Platform.OS === 'web' || !permission?.granted ? (
              <View style={styles.permissionBox}>
                <Icon name="qr-code-outline" size={48} color="primary" />
                <Text variant="bodySm" muted center>
                  {Platform.OS === 'web' ? t('scanner.hint') : t('scanner.permission')}
                </Text>
                {Platform.OS !== 'web' && (
                  <Button title={t('scanner.grant')} size="md" onPress={requestPermission} />
                )}
              </View>
            ) : (
              <>
                <CameraView
                  style={StyleSheet.absoluteFill}
                  facing="back"
                  barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                  onBarcodeScanned={handleBarCode}
                />
                <View style={styles.reticle} />
              </>
            )}
          </View>

          <Text variant="bodySm" muted center>
            {t('scanner.hint')}
          </Text>

          {/* Manual / Demo check-in for reviewers */}
          <Card style={{ gap: spacing[3] }}>
            <Text variant="label">{t('bookings.code')}</Text>
            <Row gap={spacing[2]}>
              <Input
                containerStyle={{ flex: 1, height: 46 }}
                value={manualCode}
                onChangeText={setManualCode}
                placeholder="NB-XXXXXX"
                autoCapitalize="characters"
              />
              <Button
                title={t('common.confirm')}
                size="md"
                disabled={!manualCode.trim()}
                onPress={() => processPayload(manualCode)}
              />
            </Row>
            {demoCandidate && (
              <Button
                title={`${t('bookings.simulateScan')} (${demoCandidate.code})`}
                variant="outline"
                size="md"
                full
                onPress={() => processPayload(demoCandidate.id)}
              />
            )}
          </Card>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  cameraBox: {
    height: 280,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionBox: { padding: spacing[6], alignItems: 'center', gap: spacing[3] },
  reticle: {
    width: 180,
    height: 180,
    borderRadius: radius.lg,
    borderWidth: 3,
    borderColor: '#ffffffcc',
  },
  resultIcon: { width: 84, height: 84, borderRadius: 42, alignItems: 'center', justifyContent: 'center' },
});

