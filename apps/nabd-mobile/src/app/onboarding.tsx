import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Card, CategoryArt, Row, Screen } from '@/components/ui';
import { CATEGORIES } from '@/data/catalog';
import { useAppStore } from '@/store/app-store';
import { radius, spacing, useTheme } from '@/theme';
import type { CategoryId, Lang } from '@/types';

const SLIDES = ['slide1', 'slide2', 'slide3'] as const;
const SLIDE_META: Record<(typeof SLIDES)[number], { cat: CategoryId; icon: string }> = {
  slide1: { cat: 'fitness', icon: 'sparkles' },
  slide2: { cat: 'sports', icon: 'calendar' },
  slide3: { cat: 'wellness', icon: 'qr-code' },
};

export default function OnboardingScreen() {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const storedLang = useAppStore((s) => s.lang);
  const setLang = useAppStore((s) => s.setLang);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const savedInterests = useAppStore((s) => s.interests);

  const [step, setStep] = useState<number>(storedLang ? 1 : 0);
  const [selectedLang, setSelectedLang] = useState<Lang>(storedLang ?? (i18n.language === 'ar' ? 'ar' : 'en'));
  const [interests, setInterests] = useState<CategoryId[]>(savedInterests);

  const pickLang = (l: Lang) => {
    setSelectedLang(l);
    setLang(l);
    i18n.changeLanguage(l);
  };

  const toggleInterest = (id: CategoryId) =>
    setInterests((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const finish = () => {
    completeOnboarding(interests.length ? interests : ['fitness', 'wellness']);
    router.replace('/auth');
  };

  if (step === 0) {
    return (
      <Screen
        edges={['top', 'bottom']}
        footer={<Button title={t('common.continue')} iconEnd="arrow-forward" full onPress={() => { pickLang(selectedLang); setStep(1); }} />}>
        <View style={{ paddingTop: spacing[8], gap: spacing[3] }}>
          <View style={[styles.logo, { backgroundColor: colors.primary }]}>
            <Icon name="pulse" size={32} color="#fff" />
          </View>
          <Text variant="display">{t('onboarding.chooseLanguage')}</Text>
          <Text muted>{t('onboarding.chooseLanguageSub')}</Text>
        </View>

        <View style={{ marginTop: spacing[8], gap: spacing[3] }}>
          {(
            [
              { code: 'ar', label: 'العربية', sub: 'السعودية · من اليمين لليسار' },
              { code: 'en', label: 'English', sub: 'Left-to-right' },
            ] as const
          ).map((item) => {
            const active = selectedLang === item.code;
            return (
              <Card
                key={item.code}
                onPress={() => pickLang(item.code)}
                style={{ borderWidth: 2, borderColor: active ? colors.primary : colors.border }}>
                <Row style={{ justifyContent: 'space-between' }}>
                  <View>
                    <Text variant="h3">{item.label}</Text>
                    <Text variant="bodySm" muted>
                      {item.sub}
                    </Text>
                  </View>
                  <Icon
                    name={active ? 'checkmark-circle' : 'ellipse-outline'}
                    size={24}
                    color={active ? colors.primary : colors.textMuted}
                  />
                </Row>
              </Card>
            );
          })}
        </View>
      </Screen>
    );
  }

  if (step >= 1 && step <= 3) {
    const slideKey = SLIDES[step - 1];
    const meta = SLIDE_META[slideKey];
    return (
      <Screen
        edges={['top', 'bottom']}
        footer={
          <Row style={{ justifyContent: 'space-between' }}>
            <Button title={t('common.skip')} variant="ghost" size="md" onPress={() => setStep(4)} />
            <Button
              title={t('common.continue')}
              iconEnd="arrow-forward"
              size="md"
              onPress={() => setStep(step + 1)}
            />
          </Row>
        }>
        <View style={{ marginTop: spacing[6], gap: spacing[6] }}>
          <CategoryArt category={meta.cat} icon={meta.icon} height={280} iconSize={96} rounded={radius.xl} />
          <Row style={{ justifyContent: 'center' }} gap={6}>
            {SLIDES.map((s, idx) => (
              <View
                key={s}
                style={{
                  height: 8,
                  width: idx === step - 1 ? 24 : 8,
                  borderRadius: 4,
                  backgroundColor: idx === step - 1 ? colors.primary : colors.border,
                }}
              />
            ))}
          </Row>
          <View style={{ gap: spacing[3] }}>
            <Text variant="h1">{t(`onboarding.${slideKey}Title`)}</Text>
            <Text muted>{t(`onboarding.${slideKey}Body`)}</Text>
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      edges={['top', 'bottom']}
      footer={
        <Button
          title={t('onboarding.getStarted')}
          iconEnd="arrow-forward"
          full
          disabled={interests.length < 2}
          onPress={finish}
        />
      }>
      <View style={{ paddingTop: spacing[4], gap: spacing[2] }}>
        <Text variant="h1">{t('onboarding.interestsTitle')}</Text>
        <Text muted>{t('onboarding.interestsSub')}</Text>
      </View>

      <View style={styles.grid}>
        {CATEGORIES.map((c) => {
          const active = interests.includes(c.id);
          return (
            <Pressable
              key={c.id}
              onPress={() => toggleInterest(c.id)}
              style={({ pressed }) => [
                styles.tile,
                {
                  backgroundColor: active ? colors.surfaceAlt : colors.surface,
                  borderColor: active ? colors.primary : colors.border,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}>
              <View style={[styles.catBadge, { backgroundColor: c.color[0] }]}>
                <Icon name={c.icon} size={22} color="#fff" />
              </View>
              <Text variant="label">{t(`categories.${c.id}`)}</Text>
              {active && <Icon name="checkmark-circle" size={20} color="primary" style={styles.check} />}
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: { width: 64, height: 64, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: spacing[2] },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3], marginTop: spacing[6] },
  tile: {
    width: '48%',
    padding: spacing[4],
    borderRadius: radius.lg,
    borderWidth: 2,
    gap: spacing[3],
    alignItems: 'flex-start',
  },
  catBadge: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  check: { position: 'absolute', top: spacing[3], end: spacing[3] },
});

