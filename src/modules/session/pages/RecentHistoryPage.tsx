import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
  border: '#EFE7DA',
  success: '#3A8F5C',
  successBg: '#E4F3E8',
  error: '#E5484D',
  errorBg: '#FCE4E4',
};

const FILTERS = ['All', 'Completed', 'Missed', 'Cancelled'];

type HistoryStatus = 'Completed' | 'Missed' | 'Cancelled';

const HISTORY: {
  title: string;
  host: string;
  date: string;
  duration: string;
  status: HistoryStatus;
}[] = [
  { title: 'Business English Basics', host: 'Sarah', date: 'Oct 24, 2:00 PM', duration: '45 Mins', status: 'Completed' },
  { title: 'Grammar Workshop', host: 'Damar', date: 'Oct 22, 4:00 PM', duration: '45 Mins', status: 'Completed' },
  { title: 'Grammar Workshop', host: 'Damar', date: 'Oct 20, 4:00 PM', duration: '45 Mins', status: 'Completed' },
  { title: 'Conversational Fluency', host: 'Damar', date: 'Oct 15, 5:30 PM', duration: '45 Mins', status: 'Missed' },
  { title: 'Mastering Business English: Networking', host: 'Michael', date: 'Oct 10, 5:00 PM', duration: '45 Mins', status: 'Cancelled' },
];

const STATUS_STYLES: Record<HistoryStatus, { bg: string; color: string; icon: keyof typeof Ionicons.glyphMap }> = {
  Completed: { bg: COLORS.successBg, color: COLORS.success, icon: 'checkmark-circle' },
  Missed: { bg: COLORS.errorBg, color: COLORS.error, icon: 'close-circle' },
  Cancelled: { bg: '#F1E7D8', color: COLORS.placeholder, icon: 'remove-circle' },
};

export default function RecentHistoryPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = HISTORY.filter((item) => activeFilter === 'All' || item.status === activeFilter);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.darkBrown} />
        </TouchableOpacity>
        <AppText weight="bold" style={styles.headerTitle}>Recent History</AppText>
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
            <AppText style={styles.emptyText}>No sessions found for this filter.</AppText>
          </View>
        )}

        {filtered.map((item, index) => {
          const statusStyle = STATUS_STYLES[item.status];
          return (
            <View key={index} style={styles.card}>
              <View style={styles.cardTopRow}>
                {/* <View style={styles.avatarSmall} /> */}
                <Image
                source={require('@/assets/images/image.png')}
                style={styles.avatarSmall}
              />
                <View style={{ flex: 1 }}>
                  <AppText weight="bold" style={styles.cardTitle}>{item.title}</AppText>
                  <AppText style={styles.cardHost}>Host: {item.host}</AppText>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                  <Ionicons name={statusStyle.icon} size={13} color={statusStyle.color} />
                  <AppText style={[styles.statusText, { color: statusStyle.color }]}>{item.status}</AppText>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="calendar-outline" size={15} color={COLORS.darkBrown} />
                  <AppText style={styles.metaText}>{item.date}</AppText>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={15} color={COLORS.darkBrown} />
                  <AppText style={styles.metaText}>{item.duration}</AppText>
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

  filterRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 24, marginBottom: 16, flexWrap: 'wrap' },
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
  avatarSmall: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.gold },
  cardTitle: { fontSize: 15, color: COLORS.darkBrown },
  cardHost: { fontSize: 12, color: COLORS.placeholder, marginTop: 2 },

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