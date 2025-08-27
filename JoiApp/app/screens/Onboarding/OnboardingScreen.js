import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import styles from './OnboardingScreen.styles';

/**
 * Props:
 * - onFinish: () => void   // called when Step 2 CTA is pressed
 */
export default function OnboardingScreen({ onFinish }) {
  const [step, setStep] = useState(1); // 1 | 2

  const ProgressBar = () => (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: step === 1 ? '50%' : '100%' }]} />
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
          AI driven emotional wellness with Metaverse
        </Text>
      </View>

      {/* Features */}
      <View style={styles.featuresWrap}>
        <FeatureCard
          color="#EF4444"
          emoji="❤️"
          title="Multimodal Tracking"
          subtitle="Face, voice, text, and structured surveys"
        />
        <FeatureCard
          color="#3B82F6"
          emoji="🧠"
          title="AI Analysis"
          subtitle="ML detects patterns and insights"
        />
        <FeatureCard
          color="#10B981"
          emoji="📈"
          title="Personalized Recs"
          subtitle="Tailored activities for your state"
        />
      </View>

      {/* CTA */}
      <TouchableOpacity style={styles.ctaPrimary} onPress={() => setStep(2)}>
        <Text style={styles.ctaPrimaryText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.screenPad}>
      <ProgressBar />

      {/* Titles */}
      <Text style={styles.sectionTitle} numberOfLines={1}>Emotion Input Selection</Text>
      <Text style={styles.sectionSubtitle} numberOfLines={2}>
        Choose how you want to log your current emotional state
      </Text>

      {/* Modern input card */}
      <View style={styles.inputCard}>
        <Text style={styles.inputQuestion}>How are you feeling?</Text>
        <Text style={styles.inputSub}>Choose your input method</Text>

        {/* 2×2 filled tiles (disabled) */}
        <View style={styles.inputGrid}>
          <TouchableOpacity style={[styles.tile, styles.tileDisabled]} disabled>
            <View style={styles.tileIconWrap}><Text style={styles.tileIcon}>📷</Text></View>
            <Text style={styles.tileLabel}>Face</Text>
            <Text style={styles.tileHint}>Quick camera check-in</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tile, styles.tileDisabled]} disabled>
            <View style={styles.tileIconWrap}><Text style={styles.tileIcon}>🎤</Text></View>
            <Text style={styles.tileLabel}>Voice</Text>
            <Text style={styles.tileHint}>Talk it out</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tile, styles.tileDisabled]} disabled>
            <View style={styles.tileIconWrap}><Text style={styles.tileIcon}>📝</Text></View>
            <Text style={styles.tileLabel}>Text</Text>
            <Text style={styles.tileHint}>Type your mood</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tile, styles.tileDisabled]} disabled>
            <View style={styles.tileIconWrap}><Text style={styles.tileIcon}>👤</Text></View>
            <Text style={styles.tileLabel}>Survey</Text>
            <Text style={styles.tileHint}>Guided questions</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Key features */}
      <View style={styles.keyListWrap}>
        <Text style={styles.keyListTitle}>Key Features:</Text>
        <Text style={styles.keyItem}>• Filled, modern tiles (no empty squares)</Text>
        <Text style={styles.keyItem}>• Clean white card with soft shadow</Text>
        <Text style={styles.keyItem}>• Consistent blue accent system</Text>
        <Text style={styles.keyItem}>• Accessibility-friendly spacing</Text>
      </View>

      {/* Final CTA */}
      <TouchableOpacity style={styles.ctaPrimary} onPress={onFinish}>
        <Text style={styles.ctaPrimaryText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {step === 1 ? renderStep1() : renderStep2()}
    </SafeAreaView>
  );
}
