// app/periodic.tsx
import React, { useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useRootNavigationState } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { CameraView, useCameraPermissions } from 'expo-camera';

const BLUE = '#4A90E2';
const BLUE_DARK = '#2F6FBE';
const BLUE_LIGHT = '#EFF6FF';
const TEXT_DARK = '#0F172A';
const TEXT_MUTED = '#475569';
const CARD = '#FFFFFF';
const BORDER = '#E5E7EB';

const { width } = Dimensions.get('window');
const CAMERA_HEIGHT = 200;

type Option = { value: 'A'|'B'|'C'|'D'|'E'; text: string };
type Q = { id: number; text: string; options: Option[] };

export default function PeriodicSurvey() {
  const router = useRouter();
  const rootState = useRootNavigationState();
  const { t } = useTranslation();

  // ---- camera permission ----
  const [permission, requestPermission] = useCameraPermissions();
  const [requestingPerm, setRequestingPerm] = useState(false);

  // ---- build the same 20 questions as JoiQuestionnaire, but we will sample 4 ----
  const allQuestions: Q[] = useMemo(() => {
    const mk = (id: number, def: string, opts: string[]): Q => ({
      id,
      text: t(`survey.q${id}.text`, { defaultValue: def }),
      options: ['A','B','C','D','E'].map((letter, i) => ({
        value: letter as Option['value'],
        text: t(`survey.q${id}.${letter}`, { defaultValue: opts[i] || '' }),
      })),
    });

    return [
      mk(1, 'How often do you feel mentally or physically exhausted at work?', [
        'Never feel that way',
        'Occasionally (once or twice a month)',
        'Sometimes (about once a week)',
        'Often (2–3 times a week)',
        'Always (almost daily)',
      ]),
      mk(2, 'What is the biggest factor that makes you feel the most anxious?', [
        'Excessive workload or tight deadlines',
        'Lack of support or autonomy',
        'Long hours or weekend/overtime work',
        'Goal achievement and performance pressure',
        'Other (workplace relationships)',
      ]),
      mk(3, 'How often do you feel anxious or uncomfortable about achieving goals and KPIs?', [
        'Never', 'Almost never', 'Sometimes', 'Often', 'Always',
      ]),
      mk(4, 'What do you usually tell yourself when you’re struggling at work?', [
        'No real worry here',
        'There’s worry but I can handle it',
        'Push through a bit more, then focus',
        'Hard to focus; I’m slipping',
        'It’s unavoidable; I’m overwhelmed',
      ]),
      mk(5, 'In the past month, have you felt sad or depressed while working?', [
        'Never','Almost never','Sometimes','Often','Always',
      ]),
      mk(6, 'Which best describes your current overall mood?', [
        'Fulfilled and satisfied',
        'Down at times but bounce back quickly',
        'Down 2–3 times a week',
        'Often down or pressured',
        'Consistently down',
      ]),
      mk(7, 'How many nights per week do you have trouble falling or staying asleep?', [
        '0 days','1–2 days','3–4 days','5–6 days','Almost every day',
      ]),
      mk(8, 'How energized are you when leading or collaborating with others?', [
        'Consistently energized and productive',
        'Somewhat tired but manageable',
        'Often tired; need breaks',
        'Usually tired; concentration is hard',
        'Burned out; can’t perform',
      ]),
      mk(9, 'How much pressure do you feel from Slack/email/pings during the day?', [
        'None','Slight, sometimes','Moderate, regular','Stressful most of the day','Overwhelming',
      ]),
      mk(10, 'When you clock out or take a break, how well can you switch off?', [
        'Easily switch off and relax',
        'Sometimes switch off; mostly rest',
        'Often keep thinking about work',
        'Immediately worry about work again',
        'Always “ON”; can’t escape',
      ]),
      mk(11, 'How often do you work after regular hours?', [
        'Never','Rarely (1–2×/month)','Sometimes (~1×/week)','Often (2–3×/week)','Always (most days)',
      ]),
      mk(12, 'How is your current work–life balance?', [
        'Good balance; plenty of personal time',
        'Recently busy; recovering personal time',
        'Manageable; some recovery',
        'Personal time is scarce',
        'No balance at all',
      ]),
      mk(13, 'How connected do you feel with your team/colleagues?', [
        'Always connected and supported',
        'Mostly connected; sometimes distant',
        'Neutral',
        'Often lonely or isolated',
        'Not connected at all',
      ]),
      mk(14, 'How comfortable are you discussing mental health at work?', [
        'Very comfortable; open dialogue',
        'Somewhat comfortable with close peers',
        'Neutral',
        'Uncomfortable',
        'Very uncomfortable; avoid it',
      ]),
      mk(15, 'In the past 6 months, how often did you face unfair pressure or mistreatment?', [
        'Never','Rarely; isolated incidents','Sometimes; intermittent','Often; frequent','Very often; consistent',
      ]),
      mk(16, 'When a difficult problem hits, what’s the immediate impact?', [
        'No real impact',
        'Slight stress or discomfort',
        'Moderate stress; focus/emotions affected',
        'Severe stress; sleep/appetite disturbed',
        'Very severe; need help or miss work',
      ]),
      mk(17, 'During conflicts or high-stress situations, how tense do you feel physically?', [
        'Never','Rarely','Sometimes','Often','Always',
      ]),
      mk(18, 'How do you usually cope with work stress?', [
        'Talk with friends/family',
        'Relaxation or mindfulness',
        'Games/social media chats',
        'Just push through',
        'Seek professional help',
      ]),
      mk(19, 'Do you rely on alcohol, caffeine, or other substances to relieve stress?', [
        'Never','Rarely (1–2×)','Sometimes (~monthly)','Often (weekly)','Always (daily or almost daily)',
      ]),
      mk(20, 'How supported do you feel using Employee Assistance Programs (EAP, counseling)?', [
        'Very supported; easy and encouraged',
        'Somewhat supported; know how to access',
        'Neutral; aware but unclear',
        'Not supported; feels unavailable',
        'Not supported at all',
      ]),
    ];
  }, [t]);

  // pick 4 random questions once per mount
  const questions: Q[] = useMemo(() => {
    const arr = [...allQuestions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 4);
  }, [allQuestions]);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Option | null>>(
    Object.fromEntries(questions.map(q => [q.id, null]))
  );

  // simple slide/fade between questions
  const fade = useRef(new Animated.Value(1)).current;
  const slide = useRef(new Animated.Value(0)).current;
  const animate = (dir: 'next'|'prev') => {
    const offset = dir === 'next' ? -width : width;
    return Animated.sequence([
      Animated.timing(fade, { toValue: 0, duration: 160, useNativeDriver: true }),
      Animated.timing(slide, { toValue: offset, duration: 0, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 240, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 240, useNativeDriver: true }),
    ]);
  };

  const total = questions.length;
  const cur = questions[idx];
  const selected = answers[cur.id];

  const handleSelect = (opt: Option) => {
    setAnswers(prev => ({ ...prev, [cur.id]: opt }));
  };

  const finishSurvey = async () => {
    await AsyncStorage.setItem('lastPeriodicAt', new Date().toISOString());
    if (!rootState?.key) return;
    setTimeout(() => {
      router.replace('/(tabs)/dashboard' as any);
    }, 0);
  };

  const next = async () => {
    if (idx < total - 1) {
      animate('next').start(() => setIdx(i => i + 1));
    } else {
      await finishSurvey();
    }
  };

  const back = () => {
    if (idx === 0) return;
    animate('prev').start(() => setIdx(i => i - 1));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: CARD }}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />

      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 10, backgroundColor: BLUE }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>Quick Check-in</Text>
        <Text style={{ color: 'white', opacity: 0.9 }}>
          {t('survey.headerSubtitle', {
            defaultValue: 'Question {{n}} of {{total}}',
            n: idx + 1,
            total,
          })}
        </Text>
      </View>

      {/* Camera */}
      <View style={{ height: CAMERA_HEIGHT, backgroundColor: BLUE_LIGHT, borderBottomColor: BORDER, borderBottomWidth: 1 }}>
        {permission?.granted ? (
          <CameraView style={{ flex: 1 }} facing="front" />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 }}>
            {requestingPerm ? (
              <ActivityIndicator />
            ) : (
              <>
                <Text style={{ textAlign: 'center', color: TEXT_MUTED }}>
                  {t('survey.cameraNeeded', {
                    defaultValue: 'Camera permission is required to show the preview.',
                  })}
                </Text>
                {!!permission?.canAskAgain && (
                  <TouchableOpacity
                    onPress={async () => { setRequestingPerm(true); await requestPermission(); setRequestingPerm(false); }}
                    activeOpacity={0.85}
                    style={{ marginTop: 12, backgroundColor: BLUE_DARK, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 }}
                  >
                    <Text style={{ color: 'white', fontWeight: '700' }}>
                      {t('survey.grantPermission', { defaultValue: 'Grant Permission' })}
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        )}
      </View>

      {/* Privacy banner */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 10, backgroundColor: BLUE_LIGHT }}>
        <Text style={{ fontSize: 12, color: TEXT_MUTED }}>
          {t('survey.privacyBanner', {
            defaultValue:
              'Camera footage is not stored. Only the necessary mental health information, analyzed in real time, is encrypted and securely transmitted to the server. We prioritize your privacy above all else.',
          })}
        </Text>
      </View>

      {/* Question + options */}
      <Animated.View style={{ flex: 1, opacity: fade, transform: [{ translateX: slide }] }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 28 }}
        >
          <View
            style={{
              backgroundColor: CARD,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: BORDER,
              padding: 16,
              shadowColor: '#000',
              shadowOpacity: 0.04,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <Text style={{ color: BLUE_DARK, fontWeight: '800', marginBottom: 8 }}>Q{cur.id}</Text>
            <Text style={{ color: TEXT_DARK, fontSize: 16, lineHeight: 22 }}>{cur.text}</Text>
          </View>

          <View style={{ marginTop: 14, gap: 10 }}>
            {cur.options.map((o) => {
              const isSel = selected?.value === o.value;
              return (
                <TouchableOpacity
                  key={o.value}
                  onPress={() => handleSelect(o)}
                  activeOpacity={0.8}
                  style={{
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: isSel ? BLUE : BORDER,
                    backgroundColor: isSel ? '#E0ECFF' : CARD,
                    paddingVertical: 14,
                    paddingHorizontal: 14,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 9,
                        borderWidth: 2,
                        borderColor: isSel ? BLUE_DARK : '#94A3B8',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isSel && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: BLUE_DARK }} />}
                    </View>
                    <Text style={{ fontWeight: '800', color: isSel ? BLUE_DARK : TEXT_DARK }}>{o.value}</Text>
                    <Text style={{ flex: 1, color: isSel ? BLUE_DARK : TEXT_DARK }}>{o.text}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </Animated.View>

      {/* Nav */}
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          paddingHorizontal: 20,
          paddingBottom: 18,
          paddingTop: 4,
          borderTopWidth: 1,
          borderTopColor: BORDER,
          backgroundColor: CARD,
        }}
      >
        <TouchableOpacity
          onPress={back}
          disabled={idx === 0}
          activeOpacity={0.85}
          style={{
            flex: 1,
            paddingVertical: 14,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: idx === 0 ? '#CBD5E1' : BLUE_DARK,
            alignItems: 'center',
            opacity: idx === 0 ? 0.5 : 1,
          }}
        >
          <Text style={{ color: idx === 0 ? '#64748B' : BLUE_DARK, fontWeight: '700' }}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={next}
          disabled={!selected}
          activeOpacity={0.85}
          style={{
            flex: 1,
            paddingVertical: 14,
            borderRadius: 12,
            backgroundColor: selected ? BLUE_DARK : '#94A3B8',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: '800' }}>
            {idx < total - 1 ? 'Next' : 'Finish'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
