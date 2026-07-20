import React, { useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
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
};

// TODO: ganti dengan data asli berdasarkan studentId (fetch dari API)
const MEMBER_INFO: Record<string, { name: string; level: string }> = {
  m1: { name: 'Miguel Cruz', level: 'Beginner' },
  m2: { name: 'Nanda Maulana', level: 'Intermediate B2' },
  m5: { name: 'Michael Read', level: 'Intermediate' },
};

const SKILLS = ['Speaking', 'Grammar', 'Vocabulary', 'Fluency'] as const;
type Skill = (typeof SKILLS)[number];

export default function EvaluateMemberPage() {
  const router = useRouter();
  const { roomId, studentId } = useLocalSearchParams<{ roomId: string; studentId: string }>();
  const member = MEMBER_INFO[studentId as string];

  const [ratings, setRatings] = useState<Record<Skill, number>>({
    Speaking: 0, Grammar: 0, Vocabulary: 0, Fluency: 0,
  });
  const [notes, setNotes] = useState('');

  const setRating = (skill: Skill, value: number) => {
    setRatings((prev) => ({ ...prev, [skill]: value }));
  };

  const allRated = SKILLS.every((skill) => ratings[skill] > 0);

  const handleSubmit = () => {
    if (!allRated) {
      Alert.alert('Incomplete', 'Please rate all skills before submitting.');
      return;
    }
    // TODO: kirim payload { studentId, roomId, ratings, notes } ke API
    Alert.alert('Success', 'Evaluation submitted.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.darkBrown} />
        </TouchableOpacity>
        <AppText weight="bold" style={styles.headerTitle}>Evaluate</AppText>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.memberCard}>
        <Image
            source={require('../../../../assets/images/martin.jpg')}
            style={styles.avatarPlaceholder}
          />
          <View>
            <AppText weight="bold" style={styles.memberName}>{member?.name ?? 'Student'}</AppText>
            <AppText style={styles.memberLevel}>{member?.level ?? '-'}</AppText>
          </View>
        </View>

        <AppText weight="bold" style={styles.sectionTitle}>Skill Assessment</AppText>
        {SKILLS.map((skill) => (
          <View key={skill} style={styles.skillRow}>
            <AppText style={styles.skillLabel}>{skill}</AppText>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(skill, star)} hitSlop={6}>
                  <Ionicons
                    name={star <= ratings[skill] ? 'star' : 'star-outline'}
                    size={24}
                    color={COLORS.gold}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <AppText weight="bold" style={styles.sectionTitle}>Notes</AppText>
        <TextInput
          style={styles.notesInput}
          placeholder="Write feedback, strengths, or areas to improve..."
          placeholderTextColor={COLORS.placeholder}
          value={notes}
          onChangeText={setNotes}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity activeOpacity={0.85} onPress={handleSubmit}>
          <LinearGradient
            colors={[COLORS.gold, COLORS.darkBrown]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitButton}
          >
            <AppText weight="bold" style={styles.submitButtonText}>Submit Evaluation</AppText>
          </LinearGradient>
        </TouchableOpacity>
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

  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },

  memberCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: COLORS.white, borderRadius: 18, borderWidth: 1, borderColor: COLORS.border,
    padding: 16, marginBottom: 24,
  },
  avatarPlaceholder: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.gold },
  memberName: { fontSize: 16, color: COLORS.darkBrown },
  memberLevel: { fontSize: 12, color: COLORS.placeholder, marginTop: 2 },

  sectionTitle: { fontSize: 16, color: COLORS.darkBrown, marginBottom: 12 },

  skillRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border,
    paddingHorizontal: 16, paddingVertical: 14, marginBottom: 10,
  },
  skillLabel: { fontSize: 14, color: COLORS.darkBrown },
  starsRow: { flexDirection: 'row', gap: 4 },

  notesInput: {
    backgroundColor: COLORS.white, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border,
    padding: 16, fontSize: 14, color: COLORS.darkBrown, minHeight: 120, marginBottom: 24,
  },

  submitButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  submitButtonText: { color: COLORS.white, fontSize: 15 },
});