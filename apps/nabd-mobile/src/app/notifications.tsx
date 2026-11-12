import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Card, EmptyState, Header, Row, Screen } from '@/components/ui';
import { formatDay, L } from '@/lib/format';
import { useAppStore } from '@/store/app-store';
import { spacing, useTheme } from '@/theme';
import { useDirection } from '@/theme/direction';

export default function NotificationsScreen() {
  const { t } = useTranslation();
  const { lang } = useDirection();
  const { colors } = useTheme();
  const notifications = useAppStore((s) => s.notifications);
  const markAllRead = useAppStore((s) => s.markAllRead);

  return (
    <Screen>
      <Header
        title={t('notifications.title')}
        right={
          notifications.some((n) => !n.read) ? (
            <Pressable onPress={markAllRead} hitSlop={8}>
              <Text variant="caption" color="primary" weight="semibold">
                {t('notifications.markAll')}
              </Text>
            </Pressable>
          ) : null
        }
      />

      {notifications.length === 0 ? (
        <EmptyState icon="notifications-off-outline" title={t('notifications.empty')} />
      ) : (
        <View style={{ gap: spacing[3] }}>
          {notifications.map((n) => (
            <Card
              key={n.id}
              onPress={() => {
                useAppStore.setState((s) => ({
                  notifications: s.notifications.map((item) => (item.id === n.id ? { ...item, read: true } : item)),
                }));
                if (n.href) router.push(n.href as never);
              }}
              style={!n.read ? { borderWidth: 1.5, borderColor: colors.primary + '55' } : undefined}>
              <Row gap={spacing[3]} style={{ alignItems: 'flex-start' }}>
                <View style={[styles.iconBox, { backgroundColor: n.read ? colors.surfaceAlt : colors.primary + '1A' }]}>
                  <Icon name={n.icon} size={20} color="primary" />
                </View>
                <View style={{ flex: 1, gap: 3 }}>
                  <Row style={{ justifyContent: 'space-between' }}>
                    <Text variant="label" style={{ flex: 1 }}>
                      {L(n.title, lang)}
                    </Text>
                    {!n.read && <View style={[styles.dot, { backgroundColor: colors.primary }]} />}
                  </Row>
                  <Text variant="bodySm" muted>
                    {L(n.body, lang)}
                  </Text>
                  <Text variant="caption" muted>
                    {formatDay(new Date(n.createdAt), lang)}
                  </Text>
                </View>
              </Row>
            </Card>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  iconBox: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4 },
});

