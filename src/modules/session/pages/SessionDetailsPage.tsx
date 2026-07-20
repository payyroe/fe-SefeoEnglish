import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AppText from '../../../shared/components/AppText';

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

type SessionAccess = 'locked' | 'waiting-list';

type SessionDetail = {
  title: string;
  access: SessionAccess;
  accessLabel: string;
  dateLabel: string;
  timeLabel: string;
  duration: string;
  hostName: string;
  hostRole: string;
  description: string;
  agenda: string[];
  participants: number;
  seatsNote: string;
};

// TODO: ganti dengan data asli dari API berdasarkan sessionId
const SESSION_DETAILS: Record<string, SessionDetail> = {
  'ielts-speaking-masterclass': {
    title: 'Advanced IELTS Speaking Masterclass',
    access: 'locked',
    accessLabel: 'Invitation Only',
    dateLabel: 'Tomorrow',
    timeLabel: '18:00 - 19:30',
    duration: '90 Mins',
    hostName: 'Sarah Wijaya',
    hostRole: 'IELTS Certified Trainer',
    description:
      'A focused masterclass on advanced speaking techniques for IELTS Band 7+. Covers fluency strategies, idiomatic expressions, and mock speaking tests with live feedback.',
    agenda: [
      'Warm-up: common Part 1 pitfalls',
      'Part 2 cue card practice with peer review',
      'Part 3 discussion & critical thinking prompts',
      'Live feedback session with instructor',
    ],
    participants: 12,
    seatsNote: 'VIP Members only',
  },
  'business-negotiation-essentials': {
    title: 'Business Negotiation Essentials',
    access: 'waiting-list',
    accessLabel: 'Waiting List',
    dateLabel: 'Wed, Oct 25',
    timeLabel: '10:00 - 11:30',
    duration: '90 Mins',
    hostName: 'Michael Read',
    hostRole: 'Corporate Communication Coach',
    description:
      'Learn practical negotiation frameworks used in real business deals, from opening offers to closing win-win agreements, tailored for non-native English speakers.',
    agenda: [
      'Negotiation vocabulary & key phrases',
      'Case study: salary negotiation roleplay',
      'Case study: vendor contract roleplay',
      'Q&A and personalized tips',
    ],
    participants: 8,
    seatsNote: 'Open waiting list, limited seats',
  },
};

export default function SessionDetailsPage() {
  const router = useRouter();
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const session = SESSION_DETAILS[sessionId as string];

  if (!session) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color={COLORS.darkBrown} />
          </TouchableOpacity>
          <AppText weight="bold" style={styles.headerTitle}>Session Details</AppText>
          <View style={{ width: 22 }} />
        </View>
        <View style={styles.emptyState}>
          <Ionicons name="alert-circle-outline" size={40} color={COLORS.placeholder} />
          <AppText style={styles.emptyText}>Session not found.</AppText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.darkBrown} />
        </TouchableOpacity>
        <AppText weight="bold" style={styles.headerTitle}>Session Details</AppText>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero image placeholder */}
        <View style={styles.heroImage}>
          <View style={styles.accessBadge}>
            <Ionicons
              name={session.access === 'locked' ? 'lock-closed' : 'people'}
              size={13}
              color={session.access === 'locked' ? COLORS.error : COLORS.darkBrown}
            />
            <AppText style={[styles.accessBadgeText, session.access === 'locked' && { color: COLORS.error }]}>
              {session.accessLabel}
            </AppText>
          </View>
        </View>

        <AppText weight="bold" style={styles.title}>{session.title}</AppText>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.darkBrown} />
            <AppText style={styles.metaText}>{session.dateLabel}</AppText>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color={COLORS.darkBrown} />
            <AppText style={styles.metaText}>{session.timeLabel}</AppText>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="hourglass-outline" size={16} color={COLORS.darkBrown} />
            <AppText style={styles.metaText}>{session.duration}</AppText>
          </View>
        </View>

        {/* Host card */}
        <View style={styles.hostCard}>
          <View style={styles.avatarPlaceholder} />
          <View>
            <AppText weight="bold" style={styles.hostName}>{session.hostName}</AppText>
            <AppText style={styles.hostRole}>{session.hostRole}</AppText>
          </View>
        </View>

        {/* Description */}
        <AppText weight="bold" style={styles.sectionTitle}>About this session</AppText>
        <AppText style={styles.description}>{session.description}</AppText>

        {/* Agenda */}
        <AppText weight="bold" style={styles.sectionTitle}>Agenda</AppText>
        <View style={styles.agendaCard}>
          {session.agenda.map((item, index) => (
            <View key={index} style={styles.agendaRow}>
              <View style={styles.agendaBullet}>
                <AppText style={styles.agendaBulletText}>{index + 1}</AppText>
              </View>
              <AppText style={styles.agendaText}>{item}</AppText>
            </View>
          ))}
        </View>

        {/* Participants */}
        <View style={styles.participantsCard}>
          <View style={styles.avatarStack}>
            <View style={[styles.avatarStackItem, { backgroundColor: COLORS.goldLight }]} />
            <View style={[styles.avatarStackItem, styles.avatarStackItemOverlap, { backgroundColor: COLORS.gold }]} />
          </View>
          <AppText style={styles.participantsText}>+{session.participants} joined</AppText>
        </View>

        <View style={styles.seatsNoteBox}>
          <Ionicons
            name={session.access === 'locked' ? 'lock-closed-outline' : 'information-circle-outline'}
            size={16}
            color={COLORS.darkBrown}
          />
          <AppText style={styles.seatsNoteText}>{session.seatsNote}</AppText>
        </View>
      </ScrollView>

      {/* Sticky bottom action */}
      <View style={styles.stickyFooter}>
        {session.access === 'locked' ? (
          <View style={styles.lockedButton}>
            <Ionicons name="lock-closed" size={16} color={COLORS.white} />
            <AppText weight="bold" style={styles.lockedButtonText}>Locked — VIP Only</AppText>
          </View>
        ) : (
          <TouchableOpacity style={styles.waitingListButton} activeOpacity={0.85}>
            <AppText weight="bold" style={styles.waitingListText}>Join Waiting List</AppText>
          </TouchableOpacity>
        )}
      </View>
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

  scrollContent: { paddingHorizontal: 24, paddingBottom: 24 },

  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 60, gap: 12 },
  emptyText: { fontSize: 14, color: COLORS.placeholder },

  heroImage: {
    height: 180, borderRadius: 24, backgroundColor: '#B9A487',
    justifyContent: 'flex-start', alignItems: 'flex-end', padding: 16, marginBottom: 20,
  },
  accessBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: COLORS.white, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6,
  },
  accessBadgeText: { fontSize: 12, color: COLORS.darkBrown },

  title: { fontSize: 22, color: COLORS.darkBrown, marginBottom: 14 },

  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 18, marginBottom: 20 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 13, color: COLORS.darkBrown },

  hostCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: COLORS.white, borderRadius: 18, borderWidth: 1, borderColor: COLORS.border,
    padding: 16, marginBottom: 24,
  },
  avatarPlaceholder: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.gold },
  hostName: { fontSize: 15, color: COLORS.darkBrown },
  hostRole: { fontSize: 12, color: COLORS.placeholder, marginTop: 2 },

  sectionTitle: { fontSize: 17, color: COLORS.darkBrown, marginBottom: 10 },
  description: { fontSize: 14, color: COLORS.darkBrown, opacity: 0.75, lineHeight: 21, marginBottom: 24 },

  agendaCard: {
    backgroundColor: COLORS.white, borderRadius: 18, borderWidth: 1, borderColor: COLORS.border,
    padding: 16, marginBottom: 20, gap: 14,
  },
  agendaRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  agendaBullet: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.goldLight,
    alignItems: 'center', justifyContent: 'center',
  },
  agendaBulletText: { fontSize: 11, color: COLORS.darkBrown },
  agendaText: { flex: 1, fontSize: 13, color: COLORS.darkBrown, lineHeight: 19 },

  participantsCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.white, borderRadius: 18, borderWidth: 1, borderColor: COLORS.border,
    padding: 16, marginBottom: 12,
  },
  avatarStack: { flexDirection: 'row' },
  avatarStackItem: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: COLORS.white },
  avatarStackItemOverlap: { marginLeft: -12 },
  participantsText: { fontSize: 13, color: COLORS.darkBrown },

  seatsNoteBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: COLORS.goldLight, borderRadius: 14, padding: 12, marginBottom: 12,
  },
  seatsNoteText: { fontSize: 12, color: COLORS.darkBrown, flex: 1 },

  stickyFooter: {
    paddingHorizontal: 24, paddingTop: 12, paddingBottom: 20,
    backgroundColor: COLORS.background, borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  lockedButton: {
    flexDirection: 'row', gap: 8, backgroundColor: COLORS.gold, borderRadius: 30,
    paddingVertical: 16, alignItems: 'center', justifyContent: 'center',
  },
  lockedButtonText: { color: COLORS.white, fontSize: 15 },

  waitingListButton: { backgroundColor: COLORS.gold, borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  waitingListText: { color: COLORS.white, fontSize: 15 },
});