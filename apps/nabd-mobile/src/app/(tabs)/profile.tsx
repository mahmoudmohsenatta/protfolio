import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable, StyleSheet, Switch, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Icon, type IconName } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Card, Row, Screen, Segmented } from '@/components/ui';
import { formatDay } from '@/lib/format';
import { ensureNotificationPermission } from '@/lib/notifications';
import { useAppStore, type ThemeMode } from '@/store/app-store';
import { spacing, useTheme } from '@/theme';
import { useDirection } from '@/theme/direction';
import type { Lang } from '@/types';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const { lang } = useDirection();
  const { colors } = useTheme();
  const user = useAppStore((s) => s.user);
  const bookings = useAppStore((s) => s.bookings);
  const favorites = useAppStore((s) => s.favorites);
  const themeMode = useAppStore((s) => s.themeMode);
  const notificationsEnabled = useAppStore((s) => s.notificationsEnabled);
  const setLang = useAppStore((s) => s.setLang);
  const setThemeMode = useAppStore((s) => s.setThemeMode);
  const setNotificationsEnabled = useAppStore((s) => s.setNotificationsEnabled);
  const logout = useAppStore((s) => s.logout);

  const attended = bookings.filter((b) => b.status === 'checkedIn').length;
  const creditsUsed = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.credits, 0);

  const changeLang = (next: Lang) => {
    setLang(next);
    i18n.changeLanguage(next);
  };

  const toggleNotif = async (val: boolean) => {
    if (val) await ensureNotificationPermission();
    setNotificationsEnabled(val);
  };

  const handleLogout = () => {
    Alert.alert(t('profile.logout'), t('profile.logoutConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('profile.logout'),
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/auth');
        },
      },
    ]);
  };

  return (
    <Screen>
      <Text variant="h1" style={{ paddingTop: spacing[2], marginBottom: spacing[4] }}>
        {t('profile.title')}
      </Text>

      {/* User card */}
      <Card>
        <Row gap={spacing[4]}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text variant="h2" style={{ color: '#fff' }}>
              {(user?.name ?? 'N')[0].toUpperCase()}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="h3">{user?.name}</Text>
            <Text variant="bodySm" muted dir="ltr">
              {user?.phone}
            </Text>
            {user?.memberSince && (
              <Text variant="caption" muted>
                {t('profile.member', { date: formatDay(new Date(user.memberSince), lang, { month: 'short', year: 'numeric' }) })}
              </Text>
            )}
          </View>
        </Row>

        <Row style={{ marginTop: spacing[4], paddingTop: spacing[4], borderTopWidth: 1, borderTopColor: colors.border }}>
          <Stat value={attended} label={t('profile.attended')} />
          <Stat value={creditsUsed} label={t('profile.creditsUsed')} />
          <Stat value={favorites.length} label={t('profile.favorites')} />
        </Row>
      </Card>

      {/* Language */}
      <View style={{ marginTop: spacing[5], gap: spacing[2] }}>
        <Text variant="label">{t('profile.language')}</Text>
        <Segmented<Lang>
          value={lang}
          onChange={changeLang}
          options={[
            { value: 'ar', label: 'العربية (RTL)' },
            { value: 'en', label: 'English (LTR)' },
          ]}
        />
      </View>

      {/* Appearance */}
      <View style={{ marginTop: spacing[4], gap: spacing[2] }}>
        <Text variant="label">{t('profile.theme')}</Text>
        <Segmented<ThemeMode>
          value={themeMode}
          onChange={setThemeMode}
          options={[
            { value: 'system', label: t('profile.themeSystem') },
            { value: 'light', label: t('profile.themeLight') },
            { value: 'dark', label: t('profile.themeDark') },
          ]}
        />
      </View>

      {/* Settings list */}
      <Card padded={false} style={{ marginTop: spacing[5] }}>
        <Row style={{ padding: spacing[4], justifyContent: 'space-between' }}>
          <Row gap={spacing[3]}>
            <Icon name="notifications-outline" size={20} color="primary" />
            <Text variant="label">{t('profile.notifications')}</Text>
          </Row>
          <Switch value={notificationsEnabled} onValueChange={toggleNotif} trackColor={{ true: colors.primary }} />
        </Row>

        <MenuRow icon="qr-code-outline" label={t('profile.venueMode')} onPress={() => router.push('/scanner')} />
        <MenuRow icon="sparkles-outline" label={t('ai.title')} onPress={() => router.push('/assistant')} />
        <MenuRow
          icon="information-circle-outline"
          label={t('profile.about')}
          onPress={() =>
            Alert.alert(t('about.title'), `${t('about.body')}\n\n${t('about.stack')}: Expo 58, Expo Router, TypeScript, Zustand, i18next, React Native Maps, Expo Camera & Notifications, Gemini AI`)
          }
        />
      </Card>

      <Button title={t('profile.logout')} variant="danger" full onPress={handleLogout} style={{ marginTop: spacing[6] }} />
    </Screen>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text variant="h2">{value}</Text>
      <Text variant="caption" muted>
        {label}
      </Text>
    </View>
  );
}

function MenuRow({ icon, label, onPress }: { icon: IconName; label: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing[4],
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.border,
        opacity: pressed ? 0.6 : 1,
      })}>
      <Row gap={spacing[3]}>
        <Icon name={icon} size={20} color="primary" />
        <Text variant="label">{label}</Text>
      </Row>
      <Icon name="chevron-forward" size={18} color="textMuted" directional />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: { width: 56, height: 56, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
});

