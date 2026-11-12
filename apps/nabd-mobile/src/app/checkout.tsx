import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Card, EmptyState, Header, Input, Row, Screen } from '@/components/ui';
import { planById, TOP_UPS } from '@/data/catalog';
import { formatSAR } from '@/lib/format';
import { useAppStore } from '@/store/app-store';
import { radius, spacing, useTheme } from '@/theme';
import { useDirection } from '@/theme/direction';

type Method = 'mada' | 'applePay' | 'stcPay' | 'card';

export default function CheckoutScreen() {
  const { kind = 'plan', id } = useLocalSearchParams<{ kind?: 'plan' | 'topUp'; id?: string }>();
  const { t } = useTranslation();
  const { lang } = useDirection();
  const { colors } = useTheme();
  const subscribe = useAppStore((s) => s.subscribe);
  const topUp = useAppStore((s) => s.topUp);

  const plan = kind === 'plan' && id ? planById(id) : undefined;
  const pack = kind === 'topUp' && id ? TOP_UPS.find((p) => p.id === id) : undefined;

  const [method, setMethod] = useState<Method>('mada');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('08/28');
  const [cvc, setCvc] = useState('123');
  const [holder, setHolder] = useState('MAHMOUD MOHSEN');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (!plan && !pack) {
    return (
      <Screen>
        <Header title={t('checkout.title')} />
        <EmptyState icon="cart-outline" title="Invalid order" />
      </Screen>
    );
  }

  const credits = plan ? plan.credits : pack!.credits;
  const subtotal = plan ? plan.priceSar : pack!.priceSar;
  const vat = Math.round(subtotal * 0.15 * 100) / 100;
  const total = Math.round((subtotal + vat) * 100) / 100;
  const label = plan ? t('wallet.txPlan', { plan: t(`plans.${plan.id}`) }) : t('wallet.txTopUp');

  const needsCardForm = method === 'mada' || method === 'card';

  const submit = () => {
    if (needsCardForm) {
      const digits = cardNumber.replace(/\D/g, '');
      if (digits.length < 16 || expiry.trim().length < 4 || cvc.trim().length < 3 || !holder.trim()) {
        setError(t('checkout.invalidCard'));
        return;
      }
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (plan) subscribe(plan.id, total);
      else if (pack) topUp(pack, total);
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      }
      setLoading(false);
      setDone(true);
    }, 900);
  };

  if (done) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: spacing[16], gap: spacing[4] }}>
          <View style={[styles.successCircle, { backgroundColor: colors.success + '20' }]}>
            <Icon name="checkmark-circle" size={64} color="success" />
          </View>
          <Text variant="h1" center>
            {t('checkout.success')}
          </Text>
          <Text muted center>
            {t('checkout.successSub', { credits })}
          </Text>
          <Button
            title={t('tabs.wallet')}
            full
            onPress={() => router.replace('/(tabs)/wallet')}
            style={{ marginTop: spacing[4] }}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      edges={['top', 'bottom']}
      footer={
        <View style={{ gap: spacing[2] }}>
          <Button
            title={loading ? t('checkout.processing') : t('checkout.pay', { amount: formatSAR(total, lang) })}
            loading={loading}
            full
            onPress={submit}
          />
          <Row style={{ justifyContent: 'center' }} gap={6}>
            <Icon name="lock-closed" size={14} color="textMuted" />
            <Text variant="caption" muted>
              {t('checkout.secure')}
            </Text>
          </Row>
        </View>
      }>
      <Header title={t('checkout.title')} />

      {/* Summary */}
      <Card>
        <Text variant="h3" style={{ marginBottom: spacing[3] }}>
          {t('checkout.summary')}
        </Text>
        <Row style={{ justifyContent: 'space-between', marginBottom: spacing[2] }}>
          <Text>
            {label} (+{credits} {t('common.credits')})
          </Text>
          <Text variant="label">{formatSAR(subtotal, lang)}</Text>
        </Row>
        <Row style={{ justifyContent: 'space-between', marginBottom: spacing[3] }}>
          <Text muted>{t('checkout.vat')}</Text>
          <Text muted>{formatSAR(vat, lang)}</Text>
        </Row>
        <Row style={{ justifyContent: 'space-between', paddingTop: spacing[3], borderTopWidth: 1, borderTopColor: colors.border }}>
          <Text variant="h3">{t('checkout.total')}</Text>
          <Text variant="h2" color="primary">
            {formatSAR(total, lang)}
          </Text>
        </Row>
      </Card>

      {/* Payment method */}
      <View style={{ marginTop: spacing[5], gap: spacing[3] }}>
        <Text variant="h3">{t('checkout.method')}</Text>
        <View style={styles.methodsGrid}>
          {(
            [
              { id: 'mada', icon: 'card' },
              { id: 'applePay', icon: 'logo-apple' },
              { id: 'stcPay', icon: 'phone-portrait-outline' },
              { id: 'card', icon: 'card-outline' },
            ] as const
          ).map((m) => {
            const active = method === m.id;
            return (
              <Pressable
                key={m.id}
                onPress={() => setMethod(m.id)}
                style={[
                  styles.methodBtn,
                  {
                    backgroundColor: active ? colors.surfaceAlt : colors.surface,
                    borderColor: active ? colors.primary : colors.border,
                  },
                ]}>
                <Icon name={m.icon} size={20} color={active ? 'primary' : 'text'} />
                <Text variant="label">{t(`checkout.${m.id}`)}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {needsCardForm && (
        <View style={{ marginTop: spacing[4], gap: spacing[3] }}>
          <Input
            icon="card-outline"
            keyboardType="number-pad"
            maxLength={19}
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder={t('checkout.cardNumber')}
          />
          <Row gap={spacing[3]}>
            <Input
              containerStyle={{ flex: 1 }}
              value={expiry}
              onChangeText={setExpiry}
              placeholder={t('checkout.expiry')}
              maxLength={5}
            />
            <Input
              containerStyle={{ flex: 1 }}
              keyboardType="number-pad"
              value={cvc}
              onChangeText={setCvc}
              placeholder={t('checkout.cvc')}
              maxLength={4}
            />
          </Row>
          <Input value={holder} onChangeText={setHolder} placeholder={t('checkout.nameOnCard')} />
        </View>
      )}

      {!!error && (
        <Text variant="bodySm" color="danger" style={{ marginTop: spacing[3] }}>
          {error}
        </Text>
      )}

      <Text variant="caption" muted style={{ marginTop: spacing[4] }}>
        {t('checkout.sandbox')}
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  successCircle: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  methodsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] },
  methodBtn: {
    width: '48.5%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    padding: spacing[3] + 2,
    borderRadius: radius.lg,
    borderWidth: 1.5,
  },
});

