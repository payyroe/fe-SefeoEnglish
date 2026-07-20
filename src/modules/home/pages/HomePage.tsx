import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppText from '../../../shared/components/AppText';
import HomeHeader from '../../../shared/components/HomeHeader';
import BottomNav from '../../../shared/components/BottomNav';
import VipBadge from '../../../shared/components/VipBadge';
import ProgressBar from '../../../shared/components/ProgressBar';
import { useUserRole } from '../../../shared/context/UserRoleContext';

const COLORS = {
  background: '#FDFAF6',
  darkBrown: '#543A14',
  gold: '#CEAD82',
  goldLight: '#FFF3E2',
  peach: '#F8DEBB',
  white: '#FFFFFF',
  error: '#E5484D',
  errorBg: '#FCE4E4',
  placeholder: '#B3A491',
  border: '#EFE7DA',
};

// 'none'      -> belum placement test
// 'scheduled' -> udah jadwal placement test, lagi milih paket (Reguler/VIP)
// 'regular'   -> udah member reguler (steady state, belum upgrade VIP)
// 'vip'       -> udah member VIP
type MembershipStatus = 'none' | 'scheduled' | 'regular' | 'vip';

const REGULAR_UPCOMING_SESSION = {
  title: 'Conversational Fluency',
  hostName: 'Damar',
};

const REGULAR_HISTORY = [
  { title: 'Business English Basics', subtitle: 'with Instructor Sarah • Oct 24' },
  { title: 'Grammar Workshop', subtitle: 'with Instructor Damar • Oct 22' },
  { title: 'Grammar Workshop', subtitle: 'with Instructor Damar • Oct 22' },
];

export default function HomePage() {
  const router = useRouter();
  const { membershipTier } = useUserRole();

  // TODO: ganti dengan data asli dari API
  const [membershipStatus] = useState<MembershipStatus>(
    membershipTier === 'vip' ? 'vip' : 'regular'
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <HomeHeader name="Nanda Maulana" isVip={membershipStatus === 'vip'} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {membershipStatus === 'none' && (
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
              <TouchableOpacity activeOpacity={0.85} onPress={() => router.push('/(app)/placement-test')}>
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
        )}

        {membershipStatus === 'scheduled' && (
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

              <TouchableOpacity activeOpacity={0.85} onPress={() => router.push('/(app)/placement-test')}>
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

            <View style={styles.planCard}>
              <AppText weight="bold" style={styles.planTitle}>Reguler</AppText>
              <AppText style={styles.planDesc}>Access the core community features at your own pace.</AppText>
              {['Practice community access', 'Standard learning materials', 'Waiting invitation for live sessions'].map((item) => (
                <View key={item} style={styles.featureRow}>
                  <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.darkBrown} />
                  <AppText style={styles.featureText}>{item}</AppText>
                </View>
              ))}
              <View style={styles.outlineButton}>
                <AppText weight="bold" style={styles.outlineButtonText}>Current Plan</AppText>
              </View>
            </View>

            <View style={styles.vipCard}>
              <View style={styles.recommendedBadge}>
                <AppText style={styles.recommendedText}>RECOMMENDED</AppText>
              </View>
              <View style={styles.vipTitleRow}>
                <AppText weight="bold" style={styles.planTitle}>VIP</AppText>
                <Ionicons name="star-outline" size={20} color={COLORS.gold} />
              </View>
              <AppText style={styles.planDesc}>Access the core community features at your own pace.</AppText>
              {['Practice community access', 'Standard learning materials', 'Waiting invitation for live sessions'].map((item) => (
                <View key={item} style={styles.featureRow}>
                  <Ionicons name="checkmark-circle" size={18} color={COLORS.gold} />
                  <AppText style={styles.featureText}>{item}</AppText>
                </View>
              ))}
              <TouchableOpacity activeOpacity={0.85} onPress={() => router.push('/(app)/payment')}>
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

        {membershipStatus === 'regular' && (
          <>
            {/* Account tier card */}
            <View style={styles.tierCard}>
              <View style={styles.tierHeaderRow}>
                <AppText style={styles.tierLabel}>ACCOUNT TIER</AppText>
                <TouchableOpacity activeOpacity={0.85} onPress={() => router.push('/(app)/payment')}>
                  <LinearGradient
                    colors={[COLORS.darkBrown, '#8A5A2B']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.joinVipButton}
                  >
                    <AppText weight="bold" style={styles.joinVipButtonText}>Join VIP</AppText>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <View style={styles.tierTitleRow}>
                <AppText weight="bold" style={styles.tierTitle}>Regular Member</AppText>
                <TouchableOpacity hitSlop={8}>
                  <Ionicons name="information-circle-outline" size={18} color={COLORS.placeholder} />
                </TouchableOpacity>
              </View>

              <AppText style={styles.tierDesc}>
                Unlock direct session booking and exclusive curriculum materials by upgrading to VIP status.
              </AppText>
            </View>

            {/* Upcoming session */}
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
                  <AppText weight="bold" style={styles.sessionTitle}>{REGULAR_UPCOMING_SESSION.title}</AppText>
                  <AppText style={styles.sessionSubtitle}>with Instrutor {REGULAR_UPCOMING_SESSION.hostName}</AppText>
                </View>
              </View>

              <TouchableOpacity activeOpacity={0.85} onPress={() => router.push('/(app)/session')}>
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

            {/* Recent History - vertical list style (bukan horizontal card) */}
            <View style={styles.whiteBorderCard}>
              <AppText weight="bold" style={styles.sectionTitle}>Recent History</AppText>
              {REGULAR_HISTORY.map((item, index, arr) => (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.historyRow}
                    activeOpacity={0.7}
                    onPress={() => router.push('/(app)/recent-history')}
                  >
                    <View>
                      <AppText weight="bold" style={styles.historyTitle}>{item.title}</AppText>
                      <AppText style={styles.historySubtitle}>{item.subtitle}</AppText>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={COLORS.darkBrown} />
                  </TouchableOpacity>
                  {index !== arr.length - 1 && <View style={styles.historyDivider} />}
                </View>
              ))}
            </View>
          </>
        )}

        {membershipStatus === 'vip' && (
          <>
            {/* Welcome back card */}
            <View style={styles.whiteBorderCard}>
              <View style={styles.welcomeRow}>
                <AppText weight="bold" style={styles.welcomeTitle}>Welcome back, Nanda</AppText>
                <VipBadge label="VIP" compact />
              </View>
              <AppText style={styles.welcomeDesc}>Ready for your next learning milestone?</AppText>

              <View style={styles.levelRow}>
                <View style={styles.levelIconBox}>
                  <Ionicons name="school-outline" size={22} color={COLORS.white} />
                </View>
                <View>
                  <AppText style={styles.levelLabel}>CURRENT LEVEL</AppText>
                  <AppText weight="bold" style={styles.levelValue}>Intermediate B2</AppText>
                </View>
              </View>
            </View>

            {/* Upcoming session */}
            <View style={styles.vipSessionCard}>
              <View style={styles.sessionHeader}>
                <View style={styles.sessionHeaderLeft}>
                  <Ionicons name="calendar-outline" size={18} color={COLORS.darkBrown} />
                  <AppText weight="bold" style={styles.sessionHeaderTitle}>Upcoming session</AppText>
                </View>
                <View style={styles.peachTimeBadge}>
                  <AppText style={styles.peachTimeBadgeText}>In 45 mins</AppText>
                </View>
              </View>

              <View style={styles.sessionInfoRow}>
                <View style={styles.avatarSmallPlaceholder} />
                <View>
                  <AppText weight="bold" style={styles.sessionTitle}>Conversational Fluency</AppText>
                  <AppText style={styles.sessionSubtitle}>with Instrutor Damar</AppText>
                </View>
              </View>

              <TouchableOpacity activeOpacity={0.85} onPress={() => router.push('/(app)/session')}>
                <LinearGradient
                  colors={[COLORS.darkBrown, COLORS.gold]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.primaryButton}
                >
                  <AppText weight="bold" style={styles.primaryButtonText}>Join Room</AppText>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Session Quota */}
            <View style={styles.whiteBorderCard}>
              <View style={styles.quotaHeader}>
                <AppText weight="bold" style={styles.quotaTitle}>Session Quota</AppText>
                <AppText weight="bold" style={styles.quotaValue}>8/10 Left</AppText>
              </View>
              <ProgressBar progress={80} height={10} />
              <AppText style={styles.quotaDesc}>
                You have 8 sessions remaining in your current monthly plan.
              </AppText>
            </View>

            {/* Recent History */}
            <View style={styles.whiteBorderCard}>
              <AppText weight="bold" style={styles.sectionTitle}>Recent History</AppText>
              {REGULAR_HISTORY.map((item, index, arr) => (
                <View key={index}>
                  <View style={styles.historyRow}>
                    <View>
                      <AppText weight="bold" style={styles.historyTitle}>{item.title}</AppText>
                      <AppText style={styles.historySubtitle}>{item.subtitle}</AppText>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={COLORS.darkBrown} />
                  </View>
                  {index !== arr.length - 1 && <View style={styles.historyDivider} />}
                </View>
              ))}
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
  scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40, gap: 16 },

  // existing "none" state styles
  title: { fontSize: 26, color: COLORS.darkBrown, marginTop: 24, textAlign: 'center' },
  subtitle: { fontSize: 14, color: COLORS.gold, textAlign: 'center', marginTop: 8, marginBottom: 8 },
  actionCard: { backgroundColor: COLORS.goldLight, borderRadius: 24, padding: 24, alignItems: 'center' },
  badge: { backgroundColor: COLORS.errorBg, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, marginBottom: 16 },
  badgeText: { color: COLORS.error, fontSize: 12 },
  actionTitle: { fontSize: 24, color: COLORS.darkBrown, textAlign: 'center', marginBottom: 12 },
  actionDesc: { fontSize: 14, color: COLORS.gold, textAlign: 'center', marginBottom: 20, lineHeight: 20 },

  // "scheduled" state styles
  sessionCard: { backgroundColor: COLORS.goldLight, borderRadius: 24, padding: 20 },
  sessionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sessionHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sessionHeaderTitle: { fontSize: 15, color: COLORS.darkBrown },
  timeBadge: { backgroundColor: COLORS.gold, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  timeBadgeText: { fontSize: 12, color: COLORS.white },
  sessionInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  avatarSmallPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.gold },
  sessionTitle: { fontSize: 15, color: COLORS.darkBrown },
  sessionSubtitle: { fontSize: 13, color: COLORS.placeholder },
  sectionTitle: { fontSize: 18, color: COLORS.darkBrown },
  sectionDesc: { fontSize: 13, color: COLORS.darkBrown, opacity: 0.7 },
  planCard: { backgroundColor: COLORS.white, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: COLORS.border },
  vipCard: { backgroundColor: COLORS.white, borderRadius: 24, padding: 20, borderWidth: 1.5, borderColor: COLORS.gold },
  vipTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  recommendedBadge: {
    alignSelf: 'flex-end', backgroundColor: COLORS.gold,
    borderTopRightRadius: 24, borderBottomLeftRadius: 16,
    paddingHorizontal: 12, paddingVertical: 6, marginTop: -20, marginRight: -20, marginBottom: 8,
  },
  recommendedText: { fontSize: 10, color: COLORS.white },
  planTitle: { fontSize: 22, color: COLORS.darkBrown },
  planDesc: { fontSize: 13, color: COLORS.darkBrown, opacity: 0.7, marginVertical: 8 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  featureText: { fontSize: 13, color: COLORS.darkBrown },
  outlineButton: { borderWidth: 1.5, borderColor: COLORS.gold, borderRadius: 30, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
  outlineButtonText: { color: COLORS.darkBrown, fontSize: 15 },
  primaryButton: { borderRadius: 30, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
  primaryButtonText: { color: COLORS.white, fontSize: 15 },

  // "regular" state styles
  tierCard: { backgroundColor: COLORS.goldLight, borderRadius: 24, padding: 20 },
  tierHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  tierLabel: { fontSize: 12, color: COLORS.placeholder, letterSpacing: 0.5 },
  joinVipButton: { borderRadius: 20, paddingHorizontal: 18, paddingVertical: 8 },
  joinVipButtonText: { color: COLORS.white, fontSize: 13 },
  tierTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  tierTitle: { fontSize: 22, color: COLORS.darkBrown },
  tierDesc: { fontSize: 14, color: COLORS.darkBrown, opacity: 0.75, lineHeight: 20 },

  // "vip" state styles
  whiteBorderCard: { backgroundColor: COLORS.white, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: COLORS.gold },
  welcomeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  welcomeTitle: { fontSize: 20, color: COLORS.darkBrown },
  welcomeDesc: { fontSize: 14, color: COLORS.darkBrown, opacity: 0.8, marginTop: 8, marginBottom: 16 },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  levelIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.gold, alignItems: 'center', justifyContent: 'center' },
  levelLabel: { fontSize: 11, color: COLORS.placeholder },
  levelValue: { fontSize: 15, color: COLORS.darkBrown, marginTop: 2 },

  vipSessionCard: { backgroundColor: COLORS.peach, borderRadius: 24, padding: 20 },
  peachTimeBadge: { backgroundColor: '#EFCB9C', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  peachTimeBadgeText: { fontSize: 12, color: COLORS.darkBrown },

  quotaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  quotaTitle: { fontSize: 18, color: COLORS.darkBrown },
  quotaValue: { fontSize: 16, color: COLORS.gold },
  quotaDesc: { fontSize: 13, color: COLORS.darkBrown, opacity: 0.7, marginTop: 12 },

  historyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
  historyTitle: { fontSize: 15, color: COLORS.darkBrown },
  historySubtitle: { fontSize: 12, color: COLORS.placeholder, marginTop: 2 },
  historyDivider: { height: 1, backgroundColor: COLORS.border },
});