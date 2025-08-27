// app/(tabs)/dashboard.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Dashboard() {
  const [lastPeriodic, setLastPeriodic] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();

  const load = useCallback(async () => {
    const ts = await AsyncStorage.getItem('lastPeriodicAt');
    setLastPeriodic(ts);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const prettyTime = (ts: string | null) => {
    if (!ts) return 'Not completed today';
    try {
      const d = new Date(ts);
      return d.toLocaleString();
    } catch {
      return ts;
    }
  };

  return (
    <View style={[styles.safe, { paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 12 : 0) }]}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          {/* Switch to the real logo */}
          <View style={styles.logoWrap}>
            <Image
              source={require('../assets/apple-touch-icon.png')}
              style={styles.logoImg}
              resizeMode="cover"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subTitle}>Here’s your emotional snapshot</Text>
          </View>
        </View>

        {/* Today card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today</Text>
          <Text style={styles.cardBody}>
            Mood trend and key insights will appear here after your baseline and periodic check-ins.
          </Text>

          <View style={styles.statRow}>
            <Stat label="Streak" value="—" />
            <Stat label="Avg. mood" value="—" />
            <Stat label="Entries" value="—" />
          </View>
        </View>

        {/* Periodic check-in CTA */}
        <View style={[styles.card, styles.darkCard]}>
          <Text style={[styles.cardTitle, styles.darkTitle]}>1-minute periodic check-in</Text>
          <Text style={[styles.cardBody, styles.darkBody]}>
            Last completed: {prettyTime(lastPeriodic)}
          </Text>

          <Link href="/periodic" asChild>
            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryText}>Start</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Baseline entry */}
        <View style={styles.row}>
          <Link href="/(tabs)/survey" asChild>
            <TouchableOpacity style={styles.secondaryBtn}>
              <Text style={styles.secondaryText}>Baseline Survey</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={{ height: 28 }} />
      </ScrollView>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 10, // content spacing (safe area handled above)
  },

  header: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    marginBottom: 16,
  },

  // Logo container (shadowed, no white box)
  logoWrap: {
    width: 54,
    height: 54,
    borderRadius: 16,
    overflow: 'hidden', // trims any square edges from the image
    backgroundColor: '#111827', // subtle frame if PNG is transparent
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: Platform.OS === 'ios' ? 0.15 : 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  logoImg: {
    width: '100%',
    height: '100%',
    borderRadius: 16, // extra rounding in case PNG has square corners
  },

  title: { fontSize: 24, fontWeight: '800', color: '#111827' },
  subTitle: { color: '#6B7280', marginTop: 2 },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    marginBottom: 14,
  },
  darkCard: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  cardBody: { color: '#374151', marginTop: 6, marginBottom: 10, lineHeight: 20 },
  darkTitle: { color: 'white' },
  darkBody: { color: '#D1D5DB' },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stat: {
    width: '32%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFF0F3',
  },
  statValue: { fontSize: 18, fontWeight: '800', color: '#111827' },
  statLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 },

  primaryBtn: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryText: { color: '#111827', fontWeight: '800' },

  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  secondaryBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  secondaryText: { color: '#111827', fontWeight: '700' },
});
