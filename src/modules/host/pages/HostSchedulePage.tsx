import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
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
  placeholder: '#B3A491',
  border: '#EAD9BE',
};

const DAYS = [
  { label: 'Senin', date: 1 },
  { label: 'Selasa', date: 2 },
  { label: 'Rabu', date: 3 },
  { label: 'Kamis', date: 4 },
  { label: 'Jumat', date: 5 },
  { label: 'Sabtu', date: 6 },
];

const UPCOMING_SESSION = {
  title: 'Conversational Fluency',
  time: '10:00 AM - 11:30 AM ( 1 Hours 30 Mins',
  seats: '8/10',
};

const COMING_UP_SESSION = {
  title: 'Conversational Fluency',
  time: '10:00 AM - 11:30 AM ( 1 Hours 30 Mins',
  seats: '8/10',
};

const PENDING_INVITES = [
  { id: '1', title: 'Tutoring Request', from: 'M.Damar' },
];

export default function HostSchedulePage() {
  const router = useRouter();
  const [activeDate, setActiveDate] = useState(4);
  const [invites, setInvites] = useState(PENDING_INVITES);

  const handleAccept = (id: string) => {
    // TODO: panggil API accept invite
    setInvites((prev) => prev.filter((i) => i.id !== id));
  };

  const handleDecline = (id: string) => {
    // TODO: panggil API decline invite
    setInvites((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Day selector */}
        <View style={styles.dayRow}>
          {DAYS.map((day) => {
            const active = day.date === activeDate;
            return (
              <TouchableOpacity
                key={day.date}
                style={[styles.dayItem, active && styles.dayItemActive]}
                onPress={() => setActiveDate(day.date)}
              >
                <AppText style={[styles.dayLabel, active && styles.dayLabelActive]}>{day.label}</AppText>
                <AppText weight="bold" style={[styles.dayDate, active && styles.dayDateActive]}>
                  {String(day.date).padStart(2, '0')}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Upcoming session */}
        <LinearGradient
          colors={[COLORS.peach, COLORS.goldLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardHeaderRow}>
            <AppText weight="bold" style={styles.cardTitle}>Upcoming session</AppText>
            <View style={styles.seatsBadge}>
              <Ionicons name="people" size={14} color={COLORS.darkBrown} />
              <AppText style={styles.seatsBadgeText}>{UPCOMING_SESSION.seats}</AppText>
            </View>
          </View>
          <AppText weight="bold" style={styles.sessionTitle}>{UPCOMING_SESSION.title}</AppText>
          <AppText style={styles.sessionTime}>{UPCOMING_SESSION.time}</AppText>

          <TouchableOpacity activeOpacity={0.85} onPress={() => router.push('/(host)/room')}>
            <LinearGradient
              colors={[COLORS.darkBrown, '#8A5A2B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.joinButton}
            >
              <AppText weight="bold" style={styles.joinButtonText}>Join Room</AppText>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>

        {/* Coming up */}
        <View style={[styles.card, styles.comingUpCard]}>
          <View style={styles.cardHeaderRow}>
            <AppText weight="bold" style={styles.cardTitle}>Coming Up</AppText>
            <View style={styles.seatsRow}>
              <Ionicons name="people" size={14} color={COLORS.darkBrown} />
              <AppText style={styles.seatsRowText}>{COMING_UP_SESSION.seats}</AppText>
            </View>
          </View>
          <AppText weight="bold" style={styles.sessionTitle}>{COMING_UP_SESSION.title}</AppText>
          <AppText style={styles.sessionTime}>{COMING_UP_SESSION.time}</AppText>

          <TouchableOpacity style={styles.outlineButton} activeOpacity={0.85} onPress={() => router.push('/(host)/session-details')}>
            <AppText weight="bold" style={styles.outlineButtonText}>View Details</AppText>
          </TouchableOpacity>
        </View>

        {/* Pending invites */}
        <AppText weight="bold" style={styles.sectionTitle}>Pending Invites</AppText>
        {invites.length === 0 && (
          <AppText style={styles.emptyText}>No pending invites right now.</AppText>
        )}
        {invites.map((invite) => (
          <View key={invite.id} style={styles.inviteCard}>
            <View style={styles.inviteHeaderRow}>
              <View style={styles.inviteIconBox}>
                <Ionicons name="chatbubble-ellipses-outline" size={20} color={COLORS.darkBrown} />
              </View>
              <View>
                <AppText weight="bold" style={styles.inviteTitle}>{invite.title}</AppText>
                <AppText style={styles.inviteFrom}>From {invite.from}</AppText>
              </View>
            </View>

            <View style={styles.inviteButtonRow}>
              <TouchableOpacity
                style={styles.acceptButton}
                activeOpacity={0.85}
                onPress={() => handleAccept(invite.id)}
              >
                <AppText weight="bold" style={styles.acceptButtonText}>Accept</AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.declineButton}
                activeOpacity={0.85}
                onPress={() => handleDecline(invite.id)}
              >
                <AppText weight="bold" style={styles.declineButtonText}>Decline</AppText>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <BottomNav role="host" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40, gap: 20 },

  dayRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dayItem: { alignItems: 'center', gap: 6, paddingVertical: 10, paddingHorizontal: 8, borderRadius: 16 },
  dayItemActive: { backgroundColor: COLORS.gold },
  dayLabel: { fontSize: 12, color: COLORS.placeholder },
  dayLabelActive: { color: COLORS.white },
  dayDate: { fontSize: 16, color: COLORS.darkBrown },
  dayDateActive: { color: COLORS.white },

  card: { borderRadius: 24, padding: 20 },
  comingUpCard: { backgroundColor: COLORS.goldLight, borderWidth: 1, borderColor: COLORS.border },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  cardTitle: { fontSize: 18, color: COLORS.darkBrown },

  seatsBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.white, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 5,
  },
  seatsBadgeText: { fontSize: 12, color: COLORS.darkBrown },
  seatsRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  seatsRowText: { fontSize: 12, color: COLORS.darkBrown },

  sessionTitle: { fontSize: 19, color: COLORS.darkBrown, marginBottom: 4 },
  sessionTime: { fontSize: 13, color: COLORS.darkBrown, opacity: 0.75, marginBottom: 20 },

  joinButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  joinButtonText: { color: COLORS.white, fontSize: 16 },

  outlineButton: {
    borderWidth: 1.5, borderColor: COLORS.gold, backgroundColor: COLORS.white,
    borderRadius: 30, paddingVertical: 16, alignItems: 'center',
  },
  outlineButtonText: { color: COLORS.gold, fontSize: 15 },

  sectionTitle: { fontSize: 18, color: COLORS.darkBrown, marginBottom: -6 },
  emptyText: { fontSize: 13, color: COLORS.placeholder },

  inviteCard: { backgroundColor: COLORS.white, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, padding: 18 },
  inviteHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 18 },
  inviteIconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.goldLight, alignItems: 'center', justifyContent: 'center' },
  inviteTitle: { fontSize: 15, color: COLORS.darkBrown },
  inviteFrom: { fontSize: 13, color: COLORS.gold, marginTop: 2 },

  inviteButtonRow: { flexDirection: 'row', gap: 12 },
  acceptButton: { flex: 1, backgroundColor: COLORS.gold, borderRadius: 30, paddingVertical: 14, alignItems: 'center' },
  acceptButtonText: { color: COLORS.white, fontSize: 14 },
  declineButton: { flex: 1, backgroundColor: COLORS.goldLight, borderRadius: 30, paddingVertical: 14, alignItems: 'center' },
  declineButtonText: { color: COLORS.darkBrown, fontSize: 14 },
});