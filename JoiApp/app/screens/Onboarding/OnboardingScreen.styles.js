// app/screens/Onboarding/OnboardingScreen.styles.js
import { StyleSheet, Platform } from 'react-native';

const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  android: { elevation: 6 },
});

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  screenPad: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },

  // progress
  progressTrack: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 4,
    marginBottom: 8,
  },
  progressFill: { height: '100%', backgroundColor: '#3B82F6', borderRadius: 999 },

  // hero
  hero: { alignItems: 'center', marginBottom: 4 },
  logo: { width: 104, height: 104, borderRadius: 24, marginBottom: 10 },
  heroTitle: { fontSize: 28, fontWeight: '800', color: '#111827' },
  heroSubtitle: { marginTop: 6, fontSize: 16, color: '#4B5563', textAlign: 'center' },

  // features
  featuresWrap: { marginTop: 12, gap: 10 },
  featureCard: {
    padding: 12,
    borderLeftWidth: 4,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  featureEmojiWrap: { marginBottom: 4 },
  featureEmoji: { fontSize: 22 },
  featureTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  featureSubtitle: { fontSize: 13, color: '#6B7280' },

  // section titles
  sectionTitle: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 4 },
  sectionSubtitle: { fontSize: 15, color: '#6B7280', marginBottom: 12 },

  // input card
  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    ...shadow,
  },
  inputQuestion: { fontSize: 16, fontWeight: '700', color: '#111827' },
  inputSub: { fontSize: 13, color: '#6B7280', marginTop: 2 },

  // grid
  inputGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  // modern tiles
  tile: {
    width: '48%',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#EEF4FF',
    borderWidth: 1,
    borderColor: '#D9E5FF',
  },
  tileDisabled: { opacity: 0.9 },

  tileIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    ...shadow,
  },
  tileIcon: { fontSize: 22 },
  tileLabel: { fontSize: 15, fontWeight: '700', color: '#111827' },
  tileHint: { fontSize: 12, color: '#4B5563', marginTop: 2 },

  // key list
  keyListWrap: { marginTop: 12 },
  keyListTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6, color: '#111827' },
  keyItem: { fontSize: 14, color: '#374151', marginBottom: 2 },

  // CTA buttons (blue)
  ctaPrimary: {
    marginTop: 12,
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaPrimaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },

  // NEW: Language selection styles
  langWrap: {
    marginTop: 8,
    alignItems: 'center',
    gap: 12,
  },
  langTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  langSubtitle: {
    marginTop: 6,
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 18,
  },
  langOption: {
    width: '100%',
    maxWidth: 360,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  langOptionSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  langOptionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  langOptionTextSelected: {
    color: '#FFFFFF',
  },
  langHint: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 8,
  },
});
