import React from 'react';
import { View, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppText from '../../../shared/components/AppText';
import BottomNav from '../../../shared/components/BottomNav';

const COLORS = {
  background: '#FDFAF6',
  darkBrown: '#543A14',
  gold: '#CEAD82',
  goldLight: '#FFF3E2',
  peach: '#F8DEBB',
  white: '#FFFFFF',
  error: '#E5484D',
  placeholder: '#B3A491',
  border: '#EAD9BE',
};

// Evaluation Queue sekarang PER ROOM/SESSION, bukan per member.
// Tap salah satu room -> masuk ke daftar member yang ikut di room itu.
const EVALUATION_QUEUE = [
  { id: 'room-1', title: 'Placement Test Batch', subtitle: '8 Students', pendingCount: 2 },
  { id: 'room-2', title: 'Business English Basics', subtitle: '5 Students', pendingCount: 1 },
];

const UPCOMING_SESSION = {
  title: 'Conversational Fluency',
  time: '10:00 AM - 11:30 AM',
  inMinutes: 'In 45 mins',
};

const NEXT_SESSION = {
  time: '10:00 AM - 11:30 AM',
  title: 'Conversational Fluency',
  students: 8,
};

const TEACHING_HISTORY = [
  { title: 'Grammar Workshop', date: 'Oct 24, 4:00 PM', students: 8 },
  { title: 'Business English Basics', date: 'Oct 22, 1:00 PM', students: 5 },
];

const totalPending = EVALUATION_QUEUE.reduce((sum, room) => sum + room.pendingCount, 0);

export default function HostHomePage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
        <Image
            source={require('../../../../assets/images/martin.jpg')}
            style={styles.avatar}
          />
          <View>
            <AppText style={styles.greeting}>Good Morning</AppText>
            <View style={styles.nameRow}>
              <AppText weight="bold" style={styles.name}>Alex Zuckerberg</AppText>
              <View style={styles.hostBadge}>
                <AppText style={styles.hostBadgeText}>HOST</AppText>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push('/(host)/notifications')} hitSlop={10}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.darkBrown} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Stat cards */}
        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="calendar-outline" size={16} color={COLORS.darkBrown} />
              <AppText weight="bold" style={styles.statHeaderText}>Today</AppText>
            </View>
            <AppText weight="bold" style={styles.statValue}>4</AppText>
            <AppText style={styles.statLabel}>Classes Scheduled</AppText>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="people-outline" size={16} color={COLORS.darkBrown} />
              <AppText weight="bold" style={styles.statHeaderText}>Attendance</AppText>
            </View>
            <AppText weight="bold" style={styles.statValue}>95%</AppText>
            <AppText style={styles.statLabel}>Weekly Average</AppText>
          </View>
        </View>

        {/* Evaluation Queue - per room */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderLeft}>
              <Ionicons name="calendar-outline" size={18} color={COLORS.darkBrown} />
              <AppText weight="bold" style={styles.cardHeaderTitle}>Evaluation Queue</AppText>
            </View>
            {totalPending > 0 && (
              <View style={styles.pendingBadge}>
                <AppText style={styles.pendingBadgeText}>{totalPending} pending</AppText>
              </View>
            )}
          </View>

          {EVALUATION_QUEUE.map((room, index) => (
            <View key={room.id}>
              <TouchableOpacity
                style={styles.roomRow}
                activeOpacity={0.7}
                onPress={() => router.push(`/(host)/evaluation/${room.id}`)}
              >
                <Image
            source={require('../../../../assets/images/image.png')}
            style={styles.avatarPlaceholderSmall}
          />
                <View style={{ flex: 1 }}>
                  <AppText weight="bold" style={styles.roomTitle}>{room.title}</AppText>
                  <AppText style={styles.roomSubtitle}>{room.subtitle}</AppText>
                </View>
                <View style={styles.roomPendingBadge}>
                  <AppText style={styles.roomPendingText}>{room.pendingCount} to evaluate</AppText>
                </View>
              </TouchableOpacity>
              {index !== EVALUATION_QUEUE.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Upcoming session */}
        <LinearGradient
          colors={[COLORS.peach, COLORS.goldLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.upcomingCard}
        >
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderLeft}>
              <Ionicons name="calendar-outline" size={18} color={COLORS.darkBrown} />
              <AppText weight="bold" style={styles.cardHeaderTitle}>Upcoming session</AppText>
            </View>
            <View style={styles.timeBadge}>
              <AppText style={styles.timeBadgeText}>{UPCOMING_SESSION.inMinutes}</AppText>
            </View>
          </View>

          <AppText weight="bold" style={styles.upcomingTitle}>{UPCOMING_SESSION.title}</AppText>
          <AppText style={styles.upcomingTime}>{UPCOMING_SESSION.time}</AppText>

          <TouchableOpacity activeOpacity={0.85} onPress={() => router.push('/(host)/room')}>
            <LinearGradient
              colors={[COLORS.darkBrown, '#8A5A2B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.joinButton}
            >
              <AppText weight="bold" style={styles.joinButtonText}>Join Session</AppText>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>

        {/* Next session info */}
        <View style={styles.nextCard}>
          <AppText style={styles.nextTime}>{NEXT_SESSION.time}</AppText>
          <AppText weight="bold" style={styles.nextTitle}>{NEXT_SESSION.title}</AppText>
          <View style={styles.nextStudentsBadge}>
            <Ionicons name="people" size={14} color={COLORS.darkBrown} />
            <AppText style={styles.nextStudentsText}>{NEXT_SESSION.students} Students</AppText>
          </View>
        </View>

        {/* Teaching History */}
        <View style={styles.rowBetween}>
          <AppText weight="bold" style={styles.sectionTitleRow}>Riwayat Mengajar</AppText>
          <TouchableOpacity onPress={() => router.push('/(host)/teaching-history')}>
            <AppText weight="bold" style={styles.viewAllText}>View All</AppText>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 12 }}>
          {TEACHING_HISTORY.map((item, index) => (
            <View key={index} style={styles.historyRowCard}>
              <Image
            source={require('../../../../assets/images/image.png')}
            style={styles.avatarPlaceholderSmall}
          />
              <View style={{ flex: 1 }}>
                <AppText weight="bold" style={styles.historyRowTitle}>{item.title}</AppText>
                <AppText style={styles.historyRowDate}>{item.date}</AppText>
              </View>
              <View style={styles.historyRowStudents}>
                <Ionicons name="people-outline" size={14} color={COLORS.darkBrown} />
                <AppText style={styles.historyRowStudentsText}>{item.students}</AppText>
              </View>
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

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 12, paddingBottom: 20,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: COLORS.gold },
  greeting: { fontSize: 14, color: COLORS.placeholder },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 },
  name: { fontSize: 18, color: COLORS.darkBrown },
  hostBadge: { backgroundColor: COLORS.gold, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  hostBadgeText: { fontSize: 10, color: COLORS.white },

  scrollContent: { paddingHorizontal: 24, paddingBottom: 40, gap: 16 },

  statRow: { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1, backgroundColor: COLORS.white, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border,
    padding: 16,
  },
  statHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 },
  statHeaderText: { fontSize: 13, color: COLORS.darkBrown },
  statValue: { fontSize: 32, color: COLORS.gold, marginBottom: 8 },
  statLabel: { fontSize: 13, color: COLORS.darkBrown },

  card: { backgroundColor: COLORS.white, borderRadius: 24, borderWidth: 1, borderColor: COLORS.border, padding: 20 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardHeaderTitle: { fontSize: 17, color: COLORS.darkBrown },

  pendingBadge: { backgroundColor: COLORS.error, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 5 },
  pendingBadgeText: { fontSize: 12, color: COLORS.white },

  roomRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  avatarPlaceholderSmall: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.goldLight },
  roomTitle: { fontSize: 15, color: COLORS.darkBrown },
  roomSubtitle: { fontSize: 12, color: COLORS.placeholder, marginTop: 2 },
  roomPendingBadge: { backgroundColor: COLORS.goldLight, borderRadius: 14, paddingHorizontal: 10, paddingVertical: 6 },
  roomPendingText: { fontSize: 11, color: COLORS.darkBrown },
  divider: { height: 1, backgroundColor: COLORS.border },

  upcomingCard: { borderRadius: 24, padding: 20 },
  timeBadge: { backgroundColor: COLORS.white, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 5 },
  timeBadgeText: { fontSize: 12, color: COLORS.darkBrown },
  upcomingTitle: { fontSize: 20, color: COLORS.darkBrown, marginBottom: 4 },
  upcomingTime: { fontSize: 14, color: COLORS.darkBrown, opacity: 0.75, marginBottom: 20 },
  joinButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  joinButtonText: { color: COLORS.white, fontSize: 16 },

  nextCard: { backgroundColor: COLORS.goldLight, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, padding: 18 },
  nextTime: { fontSize: 13, color: COLORS.darkBrown, opacity: 0.7, marginBottom: 6 },
  nextTitle: { fontSize: 17, color: COLORS.darkBrown, marginBottom: 12 },
  nextStudentsBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
    backgroundColor: COLORS.gold, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 6,
  },
  nextStudentsText: { fontSize: 12, color: COLORS.darkBrown },

  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: -4 },
  sectionTitleRow: { fontSize: 17, color: COLORS.darkBrown },
  viewAllText: { fontSize: 13, color: COLORS.gold },

  historyRowCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.white, borderRadius: 18, borderWidth: 1, borderColor: COLORS.border,
    padding: 14,
  },
  historyRowTitle: { fontSize: 14, color: COLORS.darkBrown },
  historyRowDate: { fontSize: 12, color: COLORS.placeholder, marginTop: 2 },
  historyRowStudents: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: COLORS.goldLight, borderRadius: 14, paddingHorizontal: 10, paddingVertical: 6,
  },
  historyRowStudentsText: { fontSize: 12, color: COLORS.darkBrown },
});