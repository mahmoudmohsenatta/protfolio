import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Card, Header, Row, Screen } from '@/components/ui';
import { PLANS } from '@/data/catalog';
import { formatSAR } from '@/lib/format';
import { useAppStore } from '@/store/app-store';
import { radius, spacing, useTheme } from '@/theme';
import { useDirection } from '@/theme/direction';

export default function PlansScreen() {
  const { t } = useTranslation();
  const { lang } = useDirection();
  const { colors } = useTheme();
  const currentPlanId = useAppStore((s) => s.planId);

  return (
    <Screen>
      <Header title={t('plans.title')} />
      <Text muted style={{ marginBottom: spacing[5] }}>
        {t('plans.subtitle')}
      </Text>

      <View style={{ gap: spacing[4] }}>
        {PLANS.map((plan) => {
          const isCurrent = currentPlanId === plan.id;
          return (
            <Card
              key={plan.id}
              style={{
                borderWidth: plan.popular || isCurrent ? 2 : 1,
                borderColor: isCurrent ? colors.success : plan.popular ? colors.primary : colors.border,
              }}>
              <Row style={{ justifyContent: 'space-between', marginBottom: spacing[2] }}>
                <Text variant="h2">{t(`plans.${plan.id}`)}</Text>
                {isCurrent ? (
                  <View style={[styles.badge, { backgroundColor: colors.success + '20' }]}>
                    <Text variant="caption" weight="bold" style={{ color: colors.success }}>
                      {t('plans.current')}
                    </Text>
                  </View>
                ) : plan.popular ? (
                  <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                    <Text variant="caption" weight="bold" style={{ color: '#fff' }}>
                      {t('plans.popular')}
                    </Text>
                  </View>
                ) : null}
              </Row>

              <Row gap={spacing[1]} style={{ alignItems: 'baseline', marginBottom: spacing[4] }}>
                <Text variant="display" color="primary">
                  {formatSAR(plan.priceSar, lang)}
                </Text>
                <Text variant="bodySm" muted>
                  {t('plans.perMonth')}
                </Text>
              </Row>

              <View style={{ gap: spacing[2], marginBottom: spacing[5] }}>
                <Feature text={t('plans.f1', { count: plan.credits })} />
                <Feature text={t('plans.f2', { count: plan.rollover })} />
                <Feature text={t('plans.f3', { count: plan.bookAheadDays })} />
                {plan.perks.includes('friend') && <Feature text={t('plans.f4')} />}
                {plan.perks.includes('priority') && <Feature text={t('plans.f5')} />}
              </View>

              <Button
                title={isCurrent ? t('plans.current') : t('plans.choose', { plan: t(`plans.${plan.id}`) })}
                variant={plan.popular ? 'primary' : 'outline'}
                disabled={isCurrent}
                full
                onPress={() => router.push({ pathname: '/checkout', params: { kind: 'plan', id: plan.id } })}
              />
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <Row gap={spacing[2]}>
      <Icon name="checkmark-circle" size={18} color="success" />
      <Text variant="bodySm">{text}</Text>
    </Row>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: spacing[3], paddingVertical: 4, borderRadius: radius.full },
});

