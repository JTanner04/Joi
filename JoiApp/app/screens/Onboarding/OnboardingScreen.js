// app/screens/Onboarding/OnboardingScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './OnboardingScreen.styles';

/**
 * Props:
 * - onFinish: () => void   // called when Step 2 CTA is pressed
 */
export default function OnboardingScreen({ onFinish }) {
  // 0 = language, 1 = your existing intro, 2 = your existing input selection
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState('en'); // 'en' | 'ko'

  useEffect(() => {
    // load previously selected language if any
    (async () => {
      const saved = await AsyncStorage.getItem('appLanguage');
      if (saved) {
        setLang(saved);
        setStep(1); // skip language screen if already chosen
      }
    })();
  }, []);

  const ProgressBar = () => (
    <View style={styles.progressTrack}>
      {/* step 0 = 0%, 1 = 50%, 2 = 100% */}
      <View
        style={[
          styles.progressFill,
          { width: step === 0 ? '0%' : step === 1 ? '50%' : '100%' },
        ]}
      />
    </View>
  );

  const FeatureCard = ({ color, emoji, title, subtitle }) => (
    <View style={[styles.featureCard, { borderLeftColor: color }]}>
      <View style={styles.featureEmojiWrap}>
        <Text style={styles.featureEmoji}>{emoji}</Text>
      </View>
      <Text style={styles.featureTitle} numberOfLines={1}>{title}</Text>
      <Text style={styles.featureSubtitle} numberOfLines={2}>{subtitle}</Text>
    </View>
  );

  const selectLanguage = async (choice) => {
    setLang(choice);
    await AsyncStorage.setItem('appLanguage', choice);
    setStep(1); // go to next step immediately
  };

  const renderLanguage = () => (
    <View style={styles.screenPad}>
      <ProgressBar />

      {/* Titles */}
      <View style={{ alignItems: 'center', marginTop: 8 }}>
        <Text style={styles.langTitle}>
          {lang === 'ko' ? '언어 선택' : 'Choose Your Language'}
        </Text>
        <Text style={styles.langSubtitle}>
          {lang === 'ko' ? '언어를 선택하세요' : 'Select a language to continue'}
        </Text>
      </View>

      {/* Options */}
      <View style={styles.langWrap}>
        <TouchableOpacity
          style={[styles.langOption, lang === 'en' && styles.langOptionSelected]}
          onPress={() => selectLanguage('en')}
          activeOpacity={0.9}
        >
          <Text style={[styles.langOptionText, lang === 'en' && styles.langOptionTextSelected]}>
            English
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.langOption, lang === 'ko' && styles.langOptionSelected]}
          onPress={() => selectLanguage('ko')}
          activeOpacity={0.9}
        >
          <Text style={[styles.langOptionText, lang === 'ko' && styles.langOptionTextSelected]}>
            한국어 (Korean)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Subtle hint */}
      <Text style={styles.langHint}>
        {lang === 'ko'
          ? '언제든지 설정에서 변경할 수 있습니다.'
          : 'You can change this later in Settings.'}
      </Text>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.screenPad}>
      <ProgressBar />
      {/* HERO */}
      <View style={styles.hero}>
        <Image
          source={require('../../assets/apple-touch-icon.png')}
          style={styles.logo}
          resizeMode="cover"
        />
        <Text style={styles.heroTitle} numberOfLines={1}>Joi App</Text>
        <Text style={styles.heroSubtitle} numberOfLines={2}>
          {lang === 'ko'
            ? '메타버스와 함께하는 AI 기반 감정 웰니스'
            : 'AI driven emotional wellness with Metaverse'}
        </Text>
      </View>

      {/* Features */}
      <View style={styles.featuresWrap}>
        <FeatureCard
          color="#EF4444"
          emoji="❤️"
          title={lang === 'ko' ? '멀티모달 트래킹' : 'Multimodal Tracking'}
          subtitle={
            lang === 'ko'
              ? '얼굴, 음성, 텍스트, 설문'
              : 'Face, voice, text, and structured surveys'
          }
        />
        <FeatureCard
          color="#3B82F6"
          emoji="🧠"
          title={lang === 'ko' ? 'AI 분석' : 'AI Analysis'}
          subtitle={
            lang === 'ko'
              ? 'ML로 패턴과 인사이트 도출'
              : 'ML detects patterns and insights'
          }
        />
        <FeatureCard
          color="#10B981"
          emoji="📈"
          title={lang === 'ko' ? '맞춤 추천' : 'Personalized Recs'}
          subtitle={
            lang === 'ko'
              ? '상태에 맞춘 활동 제공'
              : 'Tailored activities for your state'
          }
        />
      </View>

      {/* CTA */}
      <TouchableOpacity style={styles.ctaPrimary} onPress={() => setStep(2)}>
        <Text style={styles.ctaPrimaryText}>
          {lang === 'ko' ? '계속' : 'Continue'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.screenPad}>
      <ProgressBar />

      {/* Titles */}
      <Text style={styles.sectionTitle} numberOfLines={1}>
        {lang === 'ko' ? '감정 입력 선택' : 'Emotion Input Selection'}
      </Text>
      <Text style={styles.sectionSubtitle} numberOfLines={2}>
        {lang === 'ko'
          ? '현재 감정 상태를 기록할 방법을 선택하세요'
          : 'Choose how you want to log your current emotional state'}
      </Text>

      {/* Modern input card */}
      <View style={styles.inputCard}>
        <Text style={styles.inputQuestion}>
          {lang === 'ko' ? '기분이 어떠신가요?' : 'How are you feeling?'}
        </Text>
        <Text style={styles.inputSub}>
          {lang === 'ko' ? '입력 방식을 선택하세요' : 'Choose your input method'}
        </Text>

        {/* 2×2 filled tiles (disabled) */}
        <View style={styles.inputGrid}>
          <TouchableOpacity style={[styles.tile, styles.tileDisabled]} disabled>
            <View style={styles.tileIconWrap}><Text style={styles.tileIcon}>📷</Text></View>
            <Text style={styles.tileLabel}>{lang === 'ko' ? '얼굴' : 'Face'}</Text>
            <Text style={styles.tileHint}>
              {lang === 'ko' ? '빠른 카메라 체크인' : 'Quick camera check-in'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tile, styles.tileDisabled]} disabled>
            <View style={styles.tileIconWrap}><Text style={styles.tileIcon}>🎤</Text></View>
            <Text style={styles.tileLabel}>{lang === 'ko' ? '음성' : 'Voice'}</Text>
            <Text style={styles.tileHint}>
              {lang === 'ko' ? '말로 기록' : 'Talk it out'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tile, styles.tileDisabled]} disabled>
            <View style={styles.tileIconWrap}><Text style={styles.tileIcon}>📝</Text></View>
            <Text style={styles.tileLabel}>{lang === 'ko' ? '텍스트' : 'Text'}</Text>
            <Text style={styles.tileHint}>
              {lang === 'ko' ? '기분을 입력' : 'Type your mood'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tile, styles.tileDisabled]} disabled>
            <View style={styles.tileIconWrap}><Text style={styles.tileIcon}>👤</Text></View>
            <Text style={styles.tileLabel}>{lang === 'ko' ? '설문' : 'Survey'}</Text>
            <Text style={styles.tileHint}>
              {lang === 'ko' ? '가이드 질문' : 'Guided questions'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Key features */}
      <View style={styles.keyListWrap}>
        <Text style={styles.keyListTitle}>
          {lang === 'ko' ? '핵심 기능:' : 'Key Features:'}
        </Text>
        <Text style={styles.keyItem}>
          {lang === 'ko' ? '• 채워진 현대적 타일' : '• Filled, modern tiles (no empty squares)'}
        </Text>
        <Text style={styles.keyItem}>
          {lang === 'ko' ? '• 부드러운 그림자의 화이트 카드' : '• Clean white card with soft shadow'}
        </Text>
        <Text style={styles.keyItem}>
          {lang === 'ko' ? '• 일관된 블루 악센트' : '• Consistent blue accent system'}
        </Text>
        <Text style={styles.keyItem}>
          {lang === 'ko' ? '• 접근성 고려 간격' : '• Accessibility-friendly spacing'}
        </Text>
      </View>

      {/* Final CTA */}
      <TouchableOpacity style={styles.ctaPrimary} onPress={onFinish}>
        <Text style={styles.ctaPrimaryText}>
          {lang === 'ko' ? '시작하기' : 'Get Started'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {step === 0 ? renderLanguage() : step === 1 ? renderStep1() : renderStep2()}
    </SafeAreaView>
  );
}
