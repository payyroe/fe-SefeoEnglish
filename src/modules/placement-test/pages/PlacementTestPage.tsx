import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppText from '../../../shared/components/AppText';
import BottomNav from '../../../shared/components/BottomNav';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = {
  background: '#FDFAF6',
  darkBrown: '#543A14',
  gold: '#CEAD82',
  goldLight: '#FFF3E2',
  white: '#FFFFFF',
  placeholder: '#B3A491',
  circleBg: '#F1E7D8',
};

const PREP_ITEMS = [
  { icon: 'headset-outline', text: 'Find a quiet room and use a headset for the best audio quality during the speaking portion.' },
  { icon: 'wifi-outline', text: 'Ensure your internet connection is stable. A wired connection is recommended if possible.' },
  { icon: 'happy-outline', text: "Don't stress! This is just to understand your current level so we can personalize your learning journey." },
];

const OVERVIEW_STEPS = [
  { title: 'Introduction', desc: '5 mins • Meet your evaluator' },
  { title: 'Speaking Assessment', desc: '10 mins • Casual conversation topics' },
  { title: 'Grammar & Vocabulary', desc: '10 mins • Screen-sharing exercises' },
  { title: 'Wrap-up & Placement', desc: '5 mins • Immediate feedback' },
];

export default function PlacementTestPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={COLORS.darkBrown} />
        </TouchableOpacity>
        <AppText weight="bold" style={styles.headerTitle}>Placement Test</AppText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Host + schedule card */}
        <View style={styles.card}>
          <View style={styles.hostRow}>
            <Image style={styles.avatarPlaceholder} source={require('@/assets/images/martin.jpg')} />
            <View>
              <AppText weight="bold" style={styles.hostName}>Damar Muhammad</AppText>
              <AppText style={styles.hostRole}>Host senior</AppText>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={18} color={COLORS.darkBrown} />
            <AppText style={styles.infoText}>Tomorrow, June 24th</AppText>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={18} color={COLORS.darkBrown} />
            <View>
              <AppText style={styles.infoText}>10:00 AM - 10.30 AM (GMT)</AppText>
              <AppText style={styles.infoSubtext}>30 Minutes duration</AppText>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="videocam-outline" size={18} color={COLORS.darkBrown} />
            <View>
              <AppText style={styles.infoText}>Video Call (Google Meet)</AppText>
              <AppText style={styles.infoSubtext}>Link will be active 5 mins before meet</AppText>
            </View>
          </View>
        </View>

        {/* How to prepare */}
        <View style={styles.whiteCard}>
          <AppText weight="bold" style={styles.sectionTitle}>How to Prepare</AppText>
          {PREP_ITEMS.map((item) => (
            <View key={item.text} style={styles.prepRow}>
              <View style={styles.iconCircle}>
                <Ionicons name={item.icon as any} size={18} color={COLORS.darkBrown} />
              </View>
              <AppText style={styles.prepText}>{item.text}</AppText>
            </View>
          ))}
        </View>

        {/* Test overview */}
        <View style={styles.whiteCard}>
          <AppText weight="bold" style={styles.sectionTitle}>Test Overview</AppText>
          {OVERVIEW_STEPS.map((step, index) => (
            <View key={step.title} style={styles.timelineRow}>
              <View style={styles.timelineDotColumn}>
                <View style={[styles.timelineDot, index === 0 && styles.timelineDotActive]} />
                {index !== OVERVIEW_STEPS.length - 1 && <View style={styles.timelineLine} />}
              </View>
              <View style={styles.timelineContent}>
                <AppText weight="bold" style={styles.timelineTitle}>{step.title}</AppText>
                <AppText style={styles.timelineDesc}>{step.desc}</AppText>
              </View>
            </View>
          ))}
        </View>

        {/* Actions */}
        <TouchableOpacity activeOpacity={0.85} style={{ marginTop: 24 }}>
            <LinearGradient
              colors={[COLORS.gold, COLORS.darkBrown]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.joinButton}
            >
              <Ionicons name="videocam" size={18} color={COLORS.white} />
              <AppText weight="bold" style={styles.joinButtonText}>Join Test Session</AppText>
            </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rescheduleButton} activeOpacity={0.7}>
          <AppText weight="bold" style={styles.rescheduleText}>Reschedule</AppText>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 10,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1EDE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 22, color: COLORS.darkBrown },

  scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40, gap: 16 },

  card: { backgroundColor: COLORS.goldLight, borderRadius: 24, padding: 20 },
  hostRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatarPlaceholder: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.gold },
  hostName: { fontSize: 17, color: COLORS.darkBrown },
  hostRole: { fontSize: 13, color: COLORS.placeholder },
  divider: { height: 1, backgroundColor: '#EAD9BE', marginVertical: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 10 },
  infoText: { fontSize: 14, color: COLORS.darkBrown },
  infoSubtext: { fontSize: 12, color: COLORS.placeholder, marginTop: 2 },

  whiteCard: { backgroundColor: COLORS.white, borderRadius: 24, padding: 20 },
  sectionTitle: { fontSize: 18, color: COLORS.darkBrown, marginBottom: 16 },

  prepRow: { flexDirection: 'row', gap: 12, marginBottom: 16, alignItems: 'flex-start' },
  iconCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.circleBg,
    alignItems: 'center', justifyContent: 'center',
  },
  prepText: { flex: 1, fontSize: 14, color: COLORS.darkBrown, lineHeight: 20 },

  timelineRow: { flexDirection: 'row', gap: 12 },
  timelineDotColumn: { alignItems: 'center', width: 20 },
  timelineDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: COLORS.gold },
  timelineDotActive: { backgroundColor: COLORS.gold, shadowColor: COLORS.gold, shadowOpacity: 0.6, shadowRadius: 8, elevation: 4 },
  timelineLine: { width: 2, flex: 1, minHeight: 32, backgroundColor: '#2A2A2A', marginVertical: 2 },
  timelineContent: { flex: 1, paddingBottom: 20 },
  timelineTitle: { fontSize: 15, color: COLORS.darkBrown },
  timelineDesc: { fontSize: 12, color: COLORS.placeholder, marginTop: 2 },

  joinButton: {
    flexDirection: 'row',
    gap: 15,
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButtonText: { color: COLORS.white, fontSize: 15 },
  rescheduleButton: {
    borderWidth: 1.5, borderColor: '#EAD9BE', borderRadius: 30,
    paddingVertical: 10, alignItems: 'center',
  },
  rescheduleText: { color: '#D8B98A', fontSize: 15 },
});