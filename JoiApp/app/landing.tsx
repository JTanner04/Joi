// app/landing.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Landing() {
  const router = useRouter();

  const startOnboarding = async () => {
    await AsyncStorage.multiRemove(['hasOnboarded', 'privacyConsent', 'baselineDone']);
    router.replace('/onboarding' as any);
  };

  const goLogin = () => router.replace('/auth/login' as any);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <Image
          source={require('./assets/apple-touch-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Headline + subheadline */}
        <Text style={styles.title}>Joi App</Text>
        <Text style={styles.subtitle}>
          AI-driven emotional wellness with Metaverse action
        </Text>

        {/* Primary CTA */}
        <TouchableOpacity style={styles.primaryBtn} onPress={startOnboarding} activeOpacity={0.9}>
          <Text style={styles.primaryText}>Get Started</Text>
        </TouchableOpacity>

        {/* Secondary CTA */}
        <TouchableOpacity style={styles.secondaryBtn} onPress={goLogin} activeOpacity={0.9}>
          <Text style={styles.secondaryText}>I already have an account</Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const BLUE = '#2563EB';
const TEXT = '#111827';

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },

  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // no white background, just the image with rounded edges
  logo: {
    width: 128,
    height: 128,
    borderRadius: 32, // smooth corners
    marginBottom: 18,
  },

  title: {
    fontSize: 36,
    fontWeight: '800',
    color: TEXT,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 18,
    lineHeight: 26,
    color: '#4B5563',
    textAlign: 'center',
    maxWidth: 360,
  },

  primaryBtn: {
    marginTop: 30,
    backgroundColor: BLUE,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
    width: '100%',
    maxWidth: 420,
  },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 18 },

  secondaryBtn: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFF',
  },
  secondaryText: { color: TEXT, fontWeight: '700' },
});
