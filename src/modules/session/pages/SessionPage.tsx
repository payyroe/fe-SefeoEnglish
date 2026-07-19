import React, { useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppText from '../../../shared/components/AppText';
import BottomNav from '../../../shared/components/BottomNav';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const COLORS = {
  background: '#FDFAF6',
  darkBrown: '#543A14',
  gold: '#CEAD82',
  goldLight: '#FFF3E2',
  white: '#FFFFFF',
  placeholder: '#B3A491',
  border: '#EFE7DA',
  error: '#E5484D',
};

const FILTERS = ['All', 'Business', 'Grammar', 'Advanced'];

const RECENT_HISTORY = [
  { title: 'Grammar Workshop', time: 'Today, 4:00 PM', host: 'Damar' },
  { title: 'Grammar Workshop', time: 'Today, 4:00 PM', host: 'Damar' },
];

const AVAILABLE_SESSIONS = [
  {
    name: 'Michael Read', level: 'Intermediate',
    title: 'Mastering Business English: Networking',
    desc: 'Learn the nuances of professional networking and small talk in high-stakes corporate environments.',
    duration: '45 Mins', date: 'Oct 12, 5:00 PM', seats: 3,
  },
  {
    name: 'Nanda Maula', level: 'Upper-int C1',
    title: 'Mastering Business English: Networking',
    desc: 'Learn the nuances of professional networking and small talk in high-stakes corporate environments.',
    duration: '45 Mins', date: 'Oct 12, 5:00 PM', seats: 3,
  },
];

export default function SessionPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color={COLORS.placeholder} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search sessions or topics..."
            placeholderTextColor={COLORS.placeholder}
            value={search}
            onChangeText={setSearch}
          />
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

        <View style={styles.rowBetween}>
          <AppText weight="bold" style={styles.sectionTitle}>Recent History</AppText>
          <TouchableOpacity onPress={() => router.push('/(app)/recent-history')}>
            <AppText weight="bold" style={styles.viewAll}>View All</AppText>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
          {RECENT_HISTORY.map((item, index) => (
            <View key={index} style={[styles.historyCard, index === 0 && styles.historyCardActive]}>
              <View style={styles.historyCardHeader}>
                <Ionicons name="calendar-outline" size={16} color={COLORS.darkBrown} />
                <AppText weight="bold" style={styles.historyCardTime}>{item.time}</AppText>
              </View>
              <AppText weight="bold" style={styles.historyCardTitle}>{item.title}</AppText>
              <View style={styles.hostRow}>
              <Image
                source={require('@/assets/images/image.png')}
                style={styles.avatarTiny}
              />
                <AppText style={styles.hostText}>Host : {item.host}</AppText>
              </View>
            </View>
          ))}
        </ScrollView>

        <AppText weight="bold" style={[styles.sectionTitle, { marginBottom: 16 }]}>Available Sessions</AppText>

        {AVAILABLE_SESSIONS.map((session, index) => (
          <View key={index} style={styles.sessionCard}>
            <View style={styles.sessionCardHeader}>
            <Image
                source={require('@/assets/images/image.png')}
                style={styles.avatarPlaceholder}
              />
              <View style={{ flex: 1 }}>
                <AppText weight="bold" style={styles.hostName}>{session.name}</AppText>
                <AppText style={styles.hostRole}>Host</AppText>
              </View>
              <View style={styles.levelBadge}>
                <AppText style={styles.levelBadgeText}>{session.level}</AppText>
              </View>
            </View>

            <AppText weight="bold" style={styles.sessionCardTitle}>{session.title}</AppText>
            <AppText style={styles.sessionCardDesc}>{session.desc}</AppText>

            <View style={styles.divider} />

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={16} color={COLORS.darkBrown} />
                <AppText style={styles.metaText}>{session.duration}</AppText>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={16} color={COLORS.darkBrown} />
                <AppText style={styles.metaText}>{session.date}</AppText>
              </View>
            </View>

            <View style={styles.seatsRow}>
              <Ionicons name="people" size={16} color={COLORS.error} />
              <AppText style={styles.seatsText}>{session.seats} Seats left</AppText>
            </View>

            <TouchableOpacity activeOpacity={0.85}>
            <LinearGradient
            colors={[COLORS.darkBrown, COLORS.gold]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.bookButton}
            >
              <AppText weight="bold" style={styles.bookButtonText}>Book Now</AppText>
            </LinearGradient>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },

  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: COLORS.white, borderRadius: 30, borderWidth: 1, borderColor: COLORS.gold,
    paddingHorizontal: 18, height: 52, marginBottom: 16,
  },
  searchInput: { flex: 1, fontSize: 14, color: COLORS.darkBrown },

  filterRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  filterChipActive: { backgroundColor: COLORS.gold, borderColor: COLORS.gold },
  filterText: { fontSize: 13, color: COLORS.darkBrown },
  filterTextActive: { color: COLORS.white },

  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 17, color: COLORS.darkBrown },
  viewAll: { fontSize: 13, color: COLORS.gold },

  historyCard: {
    width: 220, backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginRight: 12,
    borderWidth: 1, borderColor: COLORS.border,
  },
  historyCardActive: { backgroundColor: COLORS.goldLight, borderColor: COLORS.gold },
  historyCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  historyCardTime: { fontSize: 13, color: COLORS.darkBrown },
  historyCardTitle: { fontSize: 15, color: COLORS.darkBrown, marginBottom: 8 },
  hostRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  avatarTiny: { width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.gold },
  hostText: { fontSize: 12, color: COLORS.placeholder },

  sessionCard: { backgroundColor: COLORS.white, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: COLORS.border, marginBottom: 16 },
  sessionCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatarPlaceholder: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.gold },
  hostName: { fontSize: 16, color: COLORS.darkBrown },
  hostRole: { fontSize: 12, color: COLORS.placeholder },
  levelBadge: { backgroundColor: '#2B1B0E', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  levelBadgeText: { fontSize: 11, color: COLORS.gold },

  sessionCardTitle: { fontSize: 15, color: COLORS.darkBrown, marginBottom: 6 },
  sessionCardDesc: { fontSize: 13, color: COLORS.darkBrown, opacity: 0.7, lineHeight: 19 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 14 },

  metaRow: { flexDirection: 'row', gap: 20, marginBottom: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 13, color: COLORS.darkBrown },

  seatsRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  seatsText: { fontSize: 13, color: COLORS.error },

  bookButton: { backgroundColor: '#B08D57', borderRadius: 30, paddingVertical: 14, alignItems: 'center' },
  bookButtonText: { color: COLORS.white, fontSize: 15 },
});