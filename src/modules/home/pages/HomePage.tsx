import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppText from '../../../shared/components/AppText';
import HomeHeader from '../../../shared/components/HomeHeader';
import BottomNav from '../../../shared/components/BottomNav';

const COLORS = {
  background: '#FDFAF6',
  darkBrown: '#543A14',
  gold: '#CEAD82',
  goldLight: '#FFF3E2',
  white: '#FFFFFF',
  error: '#E5484D',
  errorBg: '#FCE4E4',
  placeholder: '#B3A491',
};

export default function HomePage() {
  const router = useRouter();

  // TODO: ganti dengan data asli dari API (status placement test & upcoming session)
  const [hasScheduledTest] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <HomeHeader name="Nanda Maulana" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!hasScheduledTest ? (
          <>
            <AppText weight="bold" style={styles.title}>Welcome to SEFEO</AppText>
            <AppText style={styles.subtitle}>
              Let's find your starting point to personalize your journey.
            </AppText>

            <View style={styles.actionCard}>
              <View style={styles.badge}>
                <AppText weight="bold" style={styles.badgeText}>! Action Required</AppText>
              </View>
              <AppText weight="bold" style={styles.actionTitle}>Placement Test Required</AppText>
              <AppText style={styles.actionDesc}>
                To unlock your personalized learning path, live sessions, and progress tracking,
                please complete a short 15-minute assessment.
              </AppText>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => router.push('/(app)/placement-test')}
              >
                <LinearGradient
                  colors={[COLORS.gold, COLORS.darkBrown]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.primaryButton}
                >
                  <AppText weight="bold" style={styles.primaryButtonText}>Schedule now</AppText>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.sessionCard}>
              <View style={styles.sessionHeader}>
                <View style={styles.sessionHeaderLeft}>
                  <Ionicons name="calendar-outline" size={18} color={COLORS.darkBrown} />
                  <AppText weight="bold" style={styles.sessionHeaderTitle}>Upcoming session</AppText>
                </View>
                <View style={styles.timeBadge}>
                  <AppText style={styles.timeBadgeText}>In 45 mins</AppText>
                </View>
              </View>

              <View style={styles.sessionInfoRow}>
                <View style={styles.avatarSmallPlaceholder} />
                <View>
                  <AppText weight="bold" style={styles.sessionTitle}>Placement test</AppText>
                  <AppText style={styles.sessionSubtitle}>with Instrutor Damar</AppText>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => router.push('/(app)/placement-test')}
              >
                <LinearGradient
                  colors={[COLORS.gold, COLORS.darkBrown]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.primaryButton}
                >
                  <AppText weight="bold" style={styles.primaryButtonText}>Join Room</AppText>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <AppText weight="bold" style={styles.sectionTitle}>Choose Your Path</AppText>
            <AppText style={styles.sectionDesc}>
              Select the membership that fits your English learning goals.
            </AppText>

            {/* Reguler plan */}
            <View style={styles.planCard}>
              <AppText weight="bold" style={styles.planTitle}>Reguler</AppText>
              <AppText style={styles.planDesc}>
                Access the core community features at your own pace.
              </AppText>
              {['Practice community access', 'Standard learning materials', 'Waiting invitation for live sessions'].map(
                (item) => (
                  <View key={item} style={styles.featureRow}>
                    <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.darkBrown} />
                    <AppText style={styles.featureText}>{item}</AppText>
                  </View>
                )
              )}
              <View style={styles.outlineButton}>
                <AppText weight="bold" style={styles.outlineButtonText}>Current Plan</AppText>
              </View>
            </View>

            {/* VIP plan */}
            <View style={styles.vipCard}>
              <View style={styles.recommendedBadge}>
                <AppText style={styles.recommendedText}>RECOMMENDED</AppText>
              </View>
              <View style={styles.vipTitleRow}>
                <AppText weight="bold" style={styles.planTitle}>VIP</AppText>
                <Ionicons name="star-outline" size={20} color={COLORS.gold} />
              </View>
              <AppText style={styles.planDesc}>
                Access the core community features at your own pace.
              </AppText>
              {['Practice community access', 'Standard learning materials', 'Waiting invitation for live sessions'].map(
                (item) => (
                  <View key={item} style={styles.featureRow}>
                    <Ionicons name="checkmark-circle" size={18} color={COLORS.gold} />
                    <AppText style={styles.featureText}>{item}</AppText>
                  </View>
                )
              )}
              <TouchableOpacity activeOpacity={0.85}>
                <LinearGradient
                  colors={[COLORS.gold, COLORS.darkBrown]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.primaryButton}
                >
                  <AppText weight="bold" style={styles.primaryButtonText}>Join VIP</AppText>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({  
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40, gap: 4 },

  title: { fontSize: 26, color: COLORS.darkBrown, marginTop: 40, textAlign: 'center' },
  subtitle: { fontSize: 14, color: COLORS.gold, textAlign: 'center', marginTop: 8, marginBottom: 24 },

  actionCard: {
    backgroundColor: COLORS.goldLight,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: COLORS.errorBg,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 16,
  },
  badgeText: { color: COLORS.error, fontSize: 12 },
  actionTitle: { fontSize: 24, color: COLORS.darkBrown, textAlign: 'center', marginBottom: 12 },
  actionDesc: { fontSize: 14, color: COLORS.gold, textAlign: 'center', marginBottom: 20, lineHeight: 20 },

  sessionCard: {
    backgroundColor: COLORS.goldLight,
    borderRadius: 24,
    padding: 20,
    marginBottom: 28,
  },
  sessionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sessionHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sessionHeaderTitle: { fontSize: 15, color: COLORS.darkBrown },
  timeBadge: { backgroundColor: COLORS.gold, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  timeBadgeText: { fontSize: 12, color: COLORS.white },
  sessionInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  avatarSmallPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.gold },
  sessionTitle: { fontSize: 15, color: COLORS.darkBrown },
  sessionSubtitle: { fontSize: 13, color: COLORS.placeholder },

  sectionTitle: { fontSize: 18, color: COLORS.darkBrown, marginTop: 4 },
  sectionDesc: { fontSize: 13, color: COLORS.darkBrown, marginBottom: 16, opacity: 0.7 },

  planCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EFE7DA',
  },
  vipCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: COLORS.gold,
  },
  vipTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  recommendedBadge: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.gold,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: -20,
    marginRight: -20,
    marginBottom: 8,
  },
  recommendedText: { fontSize: 10, color: COLORS.white },
  planTitle: { fontSize: 22, color: COLORS.darkBrown },
  planDesc: { fontSize: 13, color: COLORS.darkBrown, opacity: 0.7, marginVertical: 8 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  featureText: { fontSize: 13, color: COLORS.darkBrown },

  outlineButton: {
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  outlineButtonText: { color: COLORS.darkBrown, fontSize: 15 },

  primaryButton: { borderRadius: 30, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
  primaryButtonText: { color: COLORS.white, fontSize: 15 },
});