import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppText from '../../../shared/components/AppText';
import BottomNav from '../../../shared/components/BottomNav';
import ProgressBar from '../../../shared/components/ProgressBar';

const COLORS = {
  background: '#FDFAF6',
  darkBrown: '#543A14',
  gold: '#CEAD82',
  white: '#FFFFFF',
  placeholder: '#B3A491',
  border: '#EAD9BE',
};

const STATS = [
  { icon: 'time-outline', label: 'Total Sessions', value: '24', unit: 'Sessions' },
  { icon: 'mic-outline', label: 'Speaking Times', value: '18.5', unit: 'Hours' },
  { icon: 'bookmark-outline', label: 'Vocabulary', value: '1000', unit: 'Words' },
  { icon: 'flash-outline', label: 'Confidence', value: '4.5', unit: 'Out of 5' },
] as const;

const SKILLS = [
  { label: 'Pronunciation', value: 82 },
  { label: 'Grammar', value: 82 },
  { label: 'Vocabulary', value: 82 },
  { label: 'Fluency', value: 82 },
];

export default function ProgressPage() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <AppText weight="bold" style={styles.statusLabel}>CURRENT STATUS</AppText>
          <AppText weight="bold" style={styles.statusValue}>Intermediate B2</AppText>
          <ProgressBar progress={68} height={10} />
          <View style={styles.statusFooter}>
            <AppText weight="bold" style={styles.statusFooterText}>68% Complete</AppText>
            <AppText style={styles.statusFooterText}>12.5k XP more to Advanced</AppText>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {STATS.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <View style={styles.statHeader}>
                <Ionicons name={stat.icon as any} size={18} color={COLORS.darkBrown} />
                <AppText weight="bold" style={styles.statLabel}>{stat.label}</AppText>
              </View>
              <AppText weight="bold" style={styles.statValue}>{stat.value}</AppText>
              <AppText style={styles.statUnit}>{stat.unit}</AppText>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <AppText weight="bold" style={styles.sectionTitle}>Skill Breakdown</AppText>
          {SKILLS.map((skill) => (
            <View key={skill.label} style={styles.skillRow}>
              <View style={styles.skillHeader}>
                <AppText style={styles.skillLabel}>{skill.label}</AppText>
                <AppText weight="bold" style={styles.skillValue}>{skill.value}%</AppText>
              </View>
              <ProgressBar progress={skill.value} height={8} />
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40, gap: 16 },

  card: { backgroundColor: COLORS.white, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: COLORS.border },
  statusLabel: { fontSize: 12, color: COLORS.gold, marginBottom: 4 },
  statusValue: { fontSize: 22, color: COLORS.darkBrown, marginBottom: 16 },
  statusFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  statusFooterText: { fontSize: 13, color: COLORS.darkBrown },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: {
    width: '47%', backgroundColor: COLORS.white, borderRadius: 20, padding: 16,
    borderWidth: 1, borderColor: COLORS.border,
  },
  statHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  statLabel: { fontSize: 13, color: COLORS.darkBrown },
  statValue: { fontSize: 26, color: COLORS.gold },
  statUnit: { fontSize: 13, color: COLORS.darkBrown, marginTop: 2 },

  sectionTitle: { fontSize: 18, color: COLORS.darkBrown, marginBottom: 16 },
  skillRow: { marginBottom: 18 },
  skillHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  skillLabel: { fontSize: 14, color: COLORS.darkBrown },
  skillValue: { fontSize: 14, color: COLORS.gold },
});