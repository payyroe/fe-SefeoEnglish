import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppText from '../../../shared/components/AppText';

const COLORS = {
  background: '#FDFAF6',
  darkBrown: '#543A14',
  gold: '#CEAD82',
  goldLight: '#FFF3E2',
  white: '#FFFFFF',
  placeholder: '#B3A491',
  border: '#EAD9BE',
  success: '#3A8F5C',
  successBg: '#E4F3E8',
  error: '#E5484D',
  errorBg: '#FCE4E4',
};

const FILTERS = ['All', 'Completed', 'Cancelled'];

type HistoryStatus = 'Completed' | 'Cancelled';

const TEACHING_HISTORY: {
  title: string;
  date: string;
  duration: string;
  students: number;
  status: HistoryStatus;
}[] = [
  { title: 'Grammar Workshop', date: 'Oct 24, 4:00 PM', duration: '45 Mins', students: 8, status: 'Completed' },
  { title: 'Business English Basics', date: 'Oct 22, 1:00 PM', duration: '45 Mins', students: 5, status: 'Completed' },
  { title: 'Conversational Fluency', date: 'Oct 20, 10:00 AM', duration: '90 Mins', students: 8, status: 'Completed' },
  { title: 'Placement Test Batch', date: 'Oct 18, 9:00 AM', duration: '60 Mins', students: 6, status: 'Cancelled' },
  { title: 'Grammar Workshop', date: 'Oct 15, 4:00 PM', duration: '45 Mins', students: 7, status: 'Completed' },
];

const STATUS_STYLES: Record<HistoryStatus, { bg: string; color: string; icon: keyof typeof Ionicons.glyphMap }> = {
  Completed: { bg: COLORS.successBg, color: COLORS.success, icon: 'checkmark-circle' },
  Cancelled: { bg: COLORS.errorBg, color: COLORS.error, icon: 'close-circle' },
};

export default function HostTeachingHistoryPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = TEACHING_HISTORY.filter((item) => activeFilter === 'All' || item.status === activeFilter);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.darkBrown} />
        </TouchableOpacity>
        <AppText weight="bold" style={styles.headerTitle}>Riwayat Mengajar</AppText>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((f) => {
          const active = f === activeFilter;
          return (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, active && styles.filterChipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <AppText style={[styles.filterText, active && styles.filterTextActive]}>{f}</AppText>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={40} color={COLORS.placeholder} />
            <AppText style={styles.emptyText}>Belum ada riwayat untuk filter ini.</AppText>
          </View>
        )}

        {filtered.map((item, index) => {
          const statusStyle = STATUS_STYLES[item.status];
          return (
            <View key={index} style={styles.card}>
              <View style={styles.cardTopRow}>
                <View style={styles.avatarSmall} />
                <View style={{ flex: 1 }}>
                  <AppText weight="bold" style={styles.cardTitle}>{item.title}</AppText>
                  <AppText style={styles.cardDate}>{item.date}</AppText>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                  <Ionicons name={statusStyle.icon} size={13} color={statusStyle.color} />
                  <AppText style={[styles.statusText, { color: statusStyle.color }]}>{item.status}</AppText>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={15} color={COLORS.darkBrown} />
                  <AppText style={styles.metaText}>{item.duration}</AppText>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="people-outline" size={15} color={COLORS.darkBrown} />
                  <AppText style={styles.metaText}>{item.students} Students</AppText>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 12, paddingBottom: 16,
  },
  backButton: { width: 22 },
  headerTitle: { fontSize: 18, color: COLORS.darkBrown },

  filterRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 24, marginBottom: 16 },
  filterChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border,
  },
  filterChipActive: { backgroundColor: COLORS.gold, borderColor: COLORS.gold },
  filterText: { fontSize: 13, color: COLORS.darkBrown },
  filterTextActive: { color: COLORS.white },

  scrollContent: { paddingHorizontal: 24, paddingBottom: 40, gap: 14 },

  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 60, gap: 12 },
  emptyText: { fontSize: 14, color: COLORS.placeholder },

  card: { backgroundColor: COLORS.white, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: COLORS.border },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarSmall: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.gold },
  cardTitle: { fontSize: 15, color: COLORS.darkBrown },
  cardDate: { fontSize: 12, color: COLORS.placeholder, marginTop: 2 },

  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5,
  },
  statusText: { fontSize: 11 },

  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 14 },

  metaRow: { flexDirection: 'row', gap: 20 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 13, color: COLORS.darkBrown },
});