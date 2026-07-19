import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppText from '../../../shared/components/AppText';
import ProgressBar from '../../../shared/components/ProgressBar';
import VipBadge from '../../../shared/components/VipBadge';

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

const BILLING_HISTORY = [
  { label: 'VIP Membership - October', date: 'Oct 1, 2025', amount: 'Rp 299.000', status: 'Paid' },
  { label: 'VIP Membership - September', date: 'Sep 1, 2025', amount: 'Rp 299.000', status: 'Paid' },
  { label: 'VIP Membership - August', date: 'Aug 1, 2025', amount: 'Rp 299.000', status: 'Paid' },
];

export default function MembershipBillingPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.darkBrown} />
        </TouchableOpacity>
        <AppText weight="bold" style={styles.headerTitle}>Membership & Billing</AppText>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Current plan */}
        <View style={styles.planCard}>
          <View style={styles.planTopRow}>
            <View>
              <AppText style={styles.planLabel}>CURRENT PLAN</AppText>
              <View style={styles.planNameRow}>
                <AppText weight="bold" style={styles.planName}>VIP Membership</AppText>
                <VipBadge label="VIP" compact />
              </View>
            </View>
            <Ionicons name="star" size={26} color={COLORS.gold} />
          </View>

          <AppText style={styles.renewalText}>Renews on Nov 1, 2025 for Rp 299.000/month</AppText>

          <View style={styles.quotaBox}>
            <View style={styles.quotaHeader}>
              <AppText style={styles.quotaLabel}>Session Quota</AppText>
              <AppText weight="bold" style={styles.quotaValue}>8/10 Left</AppText>
            </View>
            <ProgressBar progress={80} height={10} />
          </View>

          <TouchableOpacity activeOpacity={0.85} onPress={() => router.push('/(app)/payment')}>
            <LinearGradient
              colors={[COLORS.gold, COLORS.darkBrown]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryButton}
            >
              <AppText weight="bold" style={styles.primaryButtonText}>Manage Plan</AppText>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelLink} activeOpacity={0.7}>
            <AppText style={styles.cancelLinkText}>Cancel membership</AppText>
          </TouchableOpacity>
        </View>

        {/* Payment method */}
        <AppText weight="bold" style={styles.sectionTitle}>Payment Method</AppText>
        <View style={styles.paymentCard}>
          <View style={styles.paymentLeft}>
            <View style={styles.cardIconBox}>
              <Ionicons name="card-outline" size={20} color={COLORS.darkBrown} />
            </View>
            <View>
              <AppText weight="bold" style={styles.paymentTitle}>Visa •••• 4242</AppText>
              <AppText style={styles.paymentSubtitle}>Expires 08/27</AppText>
            </View>
          </View>
          <TouchableOpacity>
            <AppText style={styles.changeLink}>Change</AppText>
          </TouchableOpacity>
        </View>

        {/* Billing history */}
        <AppText weight="bold" style={styles.sectionTitle}>Billing History</AppText>
        <View style={styles.historyCard}>
          {BILLING_HISTORY.map((item, index) => (
            <View key={index}>
              <View style={styles.historyRow}>
                <View style={{ flex: 1 }}>
                  <AppText weight="bold" style={styles.historyLabel}>{item.label}</AppText>
                  <AppText style={styles.historyDate}>{item.date}</AppText>
                </View>
                <View style={styles.historyRight}>
                  <AppText style={styles.historyAmount}>{item.amount}</AppText>
                  <View style={styles.statusBadge}>
                    <AppText style={styles.statusText}>{item.status}</AppText>
                  </View>
                </View>
                <TouchableOpacity style={styles.downloadButton}>
                  <Ionicons name="download-outline" size={18} color={COLORS.darkBrown} />
                </TouchableOpacity>
              </View>
              {index !== BILLING_HISTORY.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
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

  scrollContent: { paddingHorizontal: 24, paddingBottom: 40, gap: 20 },

  planCard: { backgroundColor: COLORS.white, borderRadius: 24, padding: 20, borderWidth: 1.5, borderColor: COLORS.gold },
  planTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  planLabel: { fontSize: 11, color: COLORS.placeholder, marginBottom: 4 },
  planNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  planName: { fontSize: 20, color: COLORS.darkBrown },
  renewalText: { fontSize: 13, color: COLORS.darkBrown, opacity: 0.7, marginTop: 12, marginBottom: 16 },

  quotaBox: { backgroundColor: COLORS.goldLight, borderRadius: 16, padding: 16, marginBottom: 16 },
  quotaHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  quotaLabel: { fontSize: 13, color: COLORS.darkBrown },
  quotaValue: { fontSize: 13, color: COLORS.gold },

  primaryButton: { borderRadius: 30, paddingVertical: 10, alignItems: 'center' },
  primaryButtonText: { color: COLORS.white, fontSize: 15 },
  cancelLink: { alignItems: 'center', marginTop: 14 },
  cancelLinkText: { fontSize: 13, color: COLORS.error },

  sectionTitle: { fontSize: 16, color: COLORS.darkBrown, marginBottom: -6 },

  paymentCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.white, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: COLORS.border,
  },
  paymentLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cardIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.goldLight, alignItems: 'center', justifyContent: 'center' },
  paymentTitle: { fontSize: 14, color: COLORS.darkBrown },
  paymentSubtitle: { fontSize: 12, color: COLORS.placeholder, marginTop: 2 },
  changeLink: { fontSize: 13, color: COLORS.gold },

  historyCard: { backgroundColor: COLORS.white, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  historyRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12 },
  historyLabel: { fontSize: 14, color: COLORS.darkBrown },
  historyDate: { fontSize: 12, color: COLORS.placeholder, marginTop: 2 },
  historyRight: { alignItems: 'flex-end' },
  historyAmount: { fontSize: 13, color: COLORS.darkBrown },
  statusBadge: { backgroundColor: COLORS.successBg, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, marginTop: 4 },
  statusText: { fontSize: 10, color: COLORS.success },
  downloadButton: { padding: 4 },
  divider: { height: 1, backgroundColor: COLORS.border },
});