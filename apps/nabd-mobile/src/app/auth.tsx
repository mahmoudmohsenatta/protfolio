import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Input, Row, Screen } from '@/components/ui';
import { useAppStore } from '@/store/app-store';
import { spacing, useTheme } from '@/theme';

export default function AuthScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const login = useAppStore((s) => s.login);

  const [stage, setStage] = useState<'phone' | 'otp' | 'name'>('phone');
  const [phone, setPhone] = useState('551234567');
  const [otp, setOtp] = useState('1234');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const cleanPhone = phone.replace(/\D/g, '');
  const validPhone = /^5\d{8}$/.test(cleanPhone);

  const sendCode = () => {
    if (!validPhone) return setError(t('auth.phoneInvalid'));
    setError('');
    setStage('otp');
  };

  const verifyOtp = () => {
    if (otp.trim() !== '1234') return setError(t('auth.otpInvalid'));
    setError('');
    setStage('name');
  };

  const finish = () => {
    const finalName = name.trim() || 'Mahmoud';
    login(finalName, `+966${cleanPhone}`);
    router.replace('/(tabs)');
  };

  return (
    <Screen
      edges={['top', 'bottom']}
      footer={
        stage === 'phone' ? (
          <View style={{ gap: spacing[2] }}>
            <Button title={t('auth.sendCode')} iconEnd="arrow-forward" full onPress={sendCode} />
            <Text variant="caption" muted center>
              {t('auth.terms')}
            </Text>
          </View>
        ) : stage === 'otp' ? (
          <Button title={t('auth.verify')} iconEnd="arrow-forward" full onPress={verifyOtp} />
        ) : (
          <Button title={t('onboarding.getStarted')} iconEnd="arrow-forward" full onPress={finish} />
        )
      }>
      <View style={{ paddingTop: spacing[6], gap: spacing[2] }}>
        <View style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center', marginBottom: spacing[2] }}>
          <Icon name={stage === 'phone' ? 'call-outline' : stage === 'otp' ? 'shield-checkmark-outline' : 'person-outline'} size={26} color="primary" />
        </View>
        <Text variant="h1">
          {stage === 'phone' ? t('auth.phoneTitle') : stage === 'otp' ? t('auth.otpTitle') : t('auth.nameTitle')}
        </Text>
        <Text muted>
          {stage === 'phone'
            ? t('auth.phoneSub')
            : stage === 'otp'
              ? t('auth.otpSub', { phone: `+966 ${cleanPhone}` })
              : t('auth.welcome')}
        </Text>
      </View>

      <View style={{ marginTop: spacing[6], gap: spacing[3] }}>
        {stage === 'phone' && (
          <Row>
            <View style={{ height: 52, paddingHorizontal: spacing[3], borderRadius: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, justifyContent: 'center' }}>
              <Text variant="label" dir="ltr">+966</Text>
            </View>
            <Input
              containerStyle={{ flex: 1 }}
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={(v) => { setPhone(v); setError(''); }}
              placeholder={t('auth.phonePlaceholder')}
            />
          </Row>
        )}

        {stage === 'otp' && (
          <>
            <Input
              keyboardType="number-pad"
              maxLength={4}
              value={otp}
              onChangeText={(v) => { setOtp(v); setError(''); }}
              placeholder="1234"
              style={{ letterSpacing: 10, fontSize: 22 }}
            />
            <Text variant="caption" color="primary">
              {t('auth.otpHint')}
            </Text>
          </>
        )}

        {stage === 'name' && (
          <Input
            autoFocus
            value={name}
            onChangeText={setName}
            placeholder={t('auth.namePlaceholder')}
            returnKeyType="done"
            onSubmitEditing={finish}
          />
        )}

        {!!error && (
          <Text variant="bodySm" color="danger">
            {error}
          </Text>
        )}
      </View>
    </Screen>
  );
}

