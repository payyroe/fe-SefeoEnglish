import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
  border: '#EAD9BE',
  success: '#3A8F5C',
  successBg: '#E4F3E8',
};

// TODO: ganti dengan data asli berdasarkan roomId (fetch dari API)
const ROOM_INFO: Record<string, { title: string; time: string }> = {
  'room-1': { title: 'Placement Test Batch', time: 'Today, 10:00 AM - 11:30 AM' },
  'room-2': { title: 'Business English Basics', time: 'Today, 1:00 PM - 2:00 PM' },
};

type Member = { id: string; name: string; level: string; evaluated: boolean };

const ROOM_MEMBERS: Record<string, Member[]> = {
  'room-1': [
    { id: 'm1', name: 'Miguel Cruz', level: 'Beginner', evaluated: false },
    { id: 'm2', name: 'Nanda Maulana', level: 'Intermediate B2', evaluated: false },
    { id: 'm3', name: 'Sarah Putri', level: 'Upper-int C1', evaluated: true },
    { id: 'm4', name: 'Aditya Rahman', level: 'Beginner', evaluated: true },
  ],
  'room-2': [
    { id: 'm5', name: 'Michael Read', level: 'Intermediate', evaluated: false },
    { id: 'm6', name: 'Nanda Maula', level: 'Upper-int C1', evaluated: true },
  ],
};

export default function RoomMembersPage() {
  const router = useRouter();
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const room = ROOM_INFO[roomId as string];
  const members = ROOM_MEMBERS[roomId as string] ?? [];
  const pendingCount = members.filter((m) => !m.evaluated).length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.darkBrown} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <AppText weight="bold" style={styles.headerTitle}>{room?.title ?? 'Room'}</AppText>
          {room?.time && <AppText style={styles.headerSubtitle}>{room.time}</AppText>}
        </View>
        <View style={{ width: 22 }} />
      </View>

      {pendingCount > 0 && (
        <View style={styles.pendingBanner}>
          <Ionicons name="alert-circle-outline" size={16} color={COLORS.darkBrown} />
          <AppText style={styles.pendingBannerText}>
            {pendingCount} student{pendingCount > 1 ? 's' : ''} waiting for evaluation
          </AppText>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {members.map((member) => (
          <View key={member.id} style={styles.memberCard}>
            <Image
            source={require('../../../../assets/images/martin.jpg')}
            style={styles.avatarPlaceholder}
            />
            <View style={{ flex: 1 }}>
              <AppText weight="bold" style={styles.memberName}>{member.name}</AppText>
              <AppText style={styles.memberLevel}>{member.level}</AppText>
            </View>

            {member.evaluated ? (
              <View style={styles.evaluatedBadge}>
                <Ionicons name="checkmark-circle" size={14} color={COLORS.success} />
                <AppText style={styles.evaluatedText}>Evaluated</AppText>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.evaluateButton}
                activeOpacity={0.85}
                onPress={() => router.push(`/(host)/evaluation/${roomId}/${member.id}`)}
              >
                <AppText weight="bold" style={styles.evaluateButtonText}>Evaluate</AppText>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {members.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={40} color={COLORS.placeholder} />
            <AppText style={styles.emptyText}>No members found for this room.</AppText>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 12, paddingBottom: 12,
  },
  backButton: { width: 22 },
  headerTitle: { fontSize: 17, color: COLORS.darkBrown },
  headerSubtitle: { fontSize: 12, color: COLORS.placeholder, marginTop: 2 },

  pendingBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 24,
    backgroundColor: COLORS.goldLight, borderRadius: 14, paddingVertical: 10, paddingHorizontal: 14,
    marginBottom: 16,
  },
  pendingBannerText: { fontSize: 13, color: COLORS.darkBrown },

  scrollContent: { paddingHorizontal: 24, paddingBottom: 40, gap: 12 },

  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 60, gap: 12 },
  emptyText: { fontSize: 14, color: COLORS.placeholder },

  memberCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: COLORS.white, borderRadius: 18, borderWidth: 1, borderColor: COLORS.border,
    padding: 16,
  },
  avatarPlaceholder: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.gold },
  memberName: { fontSize: 15, color: COLORS.darkBrown },
  memberLevel: { fontSize: 12, color: COLORS.placeholder, marginTop: 2 },

  evaluateButton: { backgroundColor: COLORS.gold, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 9 },
  evaluateButtonText: { fontSize: 13, color: COLORS.white },

  evaluatedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: COLORS.successBg, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8,
  },
  evaluatedText: { fontSize: 12, color: COLORS.success },
});