import { useRef, useState, type ComponentRef } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityCard } from '@/components/activity-card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Header, Input, Row } from '@/components/ui';
import { askConcierge } from '@/lib/ai-concierge';
import { useAppStore } from '@/store/app-store';
import { radius, spacing, useTheme } from '@/theme';
import { useDirection } from '@/theme/direction';
import type { Activity } from '@/types';

let nextSeq = 0;
const nextMsgId = (prefix: string) => `${prefix}-${++nextSeq}`;

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  activities?: Activity[];
  poweredBy?: 'gemini' | 'offline';
}

export default function AssistantScreen() {
  const { t } = useTranslation();
  const { lang } = useDirection();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const user = useAppStore((s) => s.user);
  const city = useAppStore((s) => s.city);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'hello', role: 'assistant', text: t('ai.hello', { name: user?.name ?? '' }) },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);

  const send = async (textToSend?: string) => {
    const q = (textToSend ?? input).trim();
    if (!q || busy) return;
    if (!textToSend) setInput('');

    const userMsg: ChatMessage = { id: nextMsgId('u'), role: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    setBusy(true);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);

    const reply = await askConcierge(q, lang, city);
    const aiMsg: ChatMessage = {
      id: nextMsgId('a'),
      role: 'assistant',
      text: reply.message,
      activities: reply.activities,
      poweredBy: reply.poweredBy,
    };
    setMessages((prev) => [...prev, aiMsg]);
    setBusy(false);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
  };

  const suggestions = [t('ai.s1'), t('ai.s2'), t('ai.s3'), t('ai.s4')];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={{ paddingTop: insets.top + spacing[2], paddingHorizontal: spacing[5] }}>
        <Header title={t('ai.title')} />
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingHorizontal: spacing[5], paddingBottom: spacing[6], gap: spacing[4] }}
        keyboardShouldPersistTaps="handled">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <View key={m.id} style={{ alignItems: isUser ? 'flex-end' : 'flex-start', gap: spacing[2] }}>
              <View
                style={[
                  styles.bubble,
                  {
                    backgroundColor: isUser ? colors.secondary : colors.surface,
                    borderColor: isUser ? 'transparent' : colors.border,
                    borderWidth: isUser ? 0 : 1,
                  },
                ]}>
                <Text style={{ color: isUser ? colors.background : colors.text }}>{m.text}</Text>
                {m.poweredBy && (
                  <Row gap={4} style={{ marginTop: spacing[2] }}>
                    <Icon name="sparkles" size={12} color="primary" />
                    <Text variant="caption" muted>
                      {m.poweredBy === 'gemini' ? t('ai.online') : t('ai.offline')}
                    </Text>
                  </Row>
                )}
              </View>

              {m.activities && m.activities.length > 0 && (
                <View style={{ width: '100%', marginTop: spacing[1] }}>
                  {m.activities.map((a) => (
                    <ActivityCard key={a.id} activity={a} variant="row" />
                  ))}
                </View>
              )}
            </View>
          );
        })}

        {busy && (
          <View style={[styles.bubble, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, alignSelf: 'flex-start' }]}>
            <Text muted>{t('ai.thinking')}</Text>
          </View>
        )}

        {messages.length === 1 && (
          <View style={{ gap: spacing[2], marginTop: spacing[2] }}>
            {suggestions.map((s) => (
              <Pressable
                key={s}
                onPress={() => send(s)}
                style={[styles.suggestion, { backgroundColor: colors.surfaceAlt, borderColor: colors.primary + '35' }]}>
                <Icon name="sparkles-outline" size={16} color="primary" />
                <Text variant="bodySm" style={{ flex: 1 }}>
                  {s}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      <View
        style={{
          paddingHorizontal: spacing[5],
          paddingTop: spacing[3],
          paddingBottom: insets.bottom + spacing[3],
          backgroundColor: colors.surface,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.border,
        }}>
        <Row gap={spacing[2]}>
          <Input
            containerStyle={{ flex: 1, height: 48 }}
            value={input}
            onChangeText={setInput}
            placeholder={t('ai.placeholder')}
            returnKeyType="send"
            onSubmitEditing={() => send()}
          />
          <Pressable
            onPress={() => send()}
            disabled={!input.trim() || busy}
            style={[
              styles.sendBtn,
              { backgroundColor: input.trim() && !busy ? colors.primary : colors.border },
            ]}>
            <Icon name="send" size={18} color="#fff" directional />
          </Pressable>
        </Row>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '88%',
    padding: spacing[4],
    borderRadius: radius.lg,
  },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    padding: spacing[3],
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
