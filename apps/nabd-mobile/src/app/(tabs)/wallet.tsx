import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Card, EmptyState, Row, Screen, SectionHeader } from '@/components/ui';
import { activityById, TOP_UPS } from '@/data/catalog';
import { formatDay, formatSAR, L } from '@/lib/format';
import { useAppStore } from '@/store/app-store';
import { radius, spacing, useTheme } from '@/theme';
import { useDirection } from '@/theme/direction';
import type { Transaction } from '@/types';

export default function WalletScreen() {
  const { t } = useTranslation();
  const { lang } = useDirection();
  const { colors } = useTheme();
  const credits = useAppStore((s) => s.credits);
  const planId = useAppStore((s) => s.planId);
  const renewsAt = useAppStore((s) => s.renewsAt);
  const transactions = useAppStore((s) => s.transactions);

  const txTitle = (tx: Transaction) => {
    if (tx.type === 'plan') return t('wallet.txPlan', { plan: t(`plans.${tx.ref ?? 'active'}`) });
    if (tx.type === 'topUp') return t('wallet.txTopUp');
    const act = tx.ref ? activityById(tx.ref) : undefined;
    const title = act ? L(act.title, lang) : '';
    return tx.type === 'booking' ? t('wallet.txBooking', { title }) : t('wallet.txRefund', { title });
  };

  return (
    <Screen>
      <Text variant="h1" style={{ marginBottom: spacing[4], paddingTop: spacing[2] }}>
        {t('wallet.title')}
      </Text>

      <LinearGradient colors={['#211A57', '#3A2F8A']} style={styles.hero}>
        <Text variant="caption" style={{ color: '#D6D3EC' }}>
          {t('wallet.balance')}
        </Text>
        <Row gap={spacing[2]} style={{ alignItems: 'baseline', marginTop: spacing[1] }}>
          <Text variant="display" style={{ color: '#fff' }}>
            {credits}
          </Text>
          <Text style={{ color: '#D6D3EC' }}>{t('common.credits')}</Text>
        </Row>

        <View style={[styles.divider, { backgroundColor: '#ffffff24' }]} />

        <Row style={{ justifyContent: 'space-between' }}>
          <View>
            <Text variant="caption" style={{ color: '#ADA7D9' }}>
              {t('wallet.plan')}
            </Text>
            <Text variant="label" style={{ color: '#fff' }}>
              {planId ? t(`plans.${planId}`) : t('home.noPlan')}
            </Text>
            {renewsAt && (
              <Text variant="caption" style={{ color: '#ADA7D9' }}>
                {t('home.renews', { date: formatDay(new Date(renewsAt), lang) })}
              </Text>
            )}
          </View>
          <Button
            title={planId ? t('wallet.changePlan') : t('home.getPlan')}
            size="sm"
            onPress={() => router.push('/plans')}
          />
        </Row>
      </LinearGradient>

      <View style={{ marginTop: spacing[6] }}>
        <SectionHeader title={t('wallet.topUps')} />
        <Row gap={spacing[3]}>
          {TOP_UPS.map((pack) => (
            <Card
              key={pack.id}
              onPress={() => router.push({ pathname: '/checkout', params: { kind: 'topUp', id: pack.id } })}
              style={{ flex: 1, alignItems: 'center', gap: spacing[1] }}>
              <Text variant="h2" color="primary">
                +{pack.credits}
              </Text>
              <Text variant="caption" muted>
                {t('common.credits')}
              </Text>
              <Text variant="label" style={{ marginTop: spacing[1] }}>
                {formatSAR(pack.priceSar, lang)}
              </Text>
            </Card>
          ))}
        </Row>
      </View>

      <View style={{ marginTop: spacing[6] }}>
        <SectionHeader title={t('wallet.history')} />
        {transactions.length === 0 ? (
          <EmptyState icon="receipt-outline" title={t('wallet.noHistory')} />
        ) : (
          <Card padded={false}>
            {transactions.slice(0, 15).map((tx, idx) => {
              const positive = tx.credits > 0;
              return (
                <Row
                  key={tx.id}
                  style={{
                    padding: spacing[4],
                    borderTopWidth: idx === 0 ? 0 : StyleSheet.hairlineWidth,
                    borderTopColor: colors.border,
                    justifyContent: 'space-between',
                  }}>
                  <Row gap={spacing[3]} style={{ flex: 1 }}>
                    <View
                      style={[
                        styles.txIcon,
                        { backgroundColor: positive ? colors.success + '1A' : colors.surfaceAlt },
                      ]}>
                      <Icon
                        name={positive ? 'arrow-down' : 'arrow-up'}
                        size={18}
                        color={positive ? colors.success : colors.primary}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text variant="label" numberOfLines={1}>
                        {txTitle(tx)}
                      </Text>
                      <Text variant="caption" muted>
                        {formatDay(new Date(tx.createdAt), lang)}
                        {tx.amountSar ? ` · ${formatSAR(tx.amountSar, lang)}` : ''}
                      </Text>
                    </View>
                  </Row>
                  <Text variant="label" style={{ color: positive ? colors.success : colors.text }}>
                    {positive ? `+${tx.credits}` : tx.credits}
                  </Text>
                </Row>
              );
            })}
          </Card>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: radius.xl, padding: spacing[5] },
  divider: { height: 1, marginVertical: spacing[4] },
  txIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});

