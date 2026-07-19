import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
  errorBg: '#FCE4E4',
};

const ACTIVE_SESSIONS = [
  { device: 'iPhone 14 Pro', location: 'Bandung, Indonesia', current: true, lastActive: 'Active now' },
  { device: 'Windows PC - Chrome', location: 'Bandung, Indonesia', current: false, lastActive: '2 days ago' },
];

export default function SecurityPage() {
  const router = useRouter();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleLogoutDevice = (device: string) => {
    Alert.alert('Log out device', `Log out from "${device}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => {/* TODO: call API */} },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action is permanent and cannot be undone. All your data will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete Account', style: 'destructive', onPress: () => {/* TODO: call API */} },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.darkBrown} />
        </TouchableOpacity>
        <AppText weight="bold" style={styles.headerTitle}>Security</AppText>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AppText weight="bold" style={styles.sectionTitle}>Login</AppText>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={() => router.push('/(app)/change-password')}>
            <View style={styles.rowLeft}>
              <Ionicons name="key-outline" size={20} color={COLORS.darkBrown} />
              <AppText style={styles.rowLabel}>Change Password</AppText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.placeholder} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.darkBrown} />
              <View>
                <AppText style={styles.rowLabel}>Two-Factor Authentication</AppText>
                <AppText style={styles.rowHelper}>Add an extra layer of security</AppText>
              </View>
            </View>
            <Switch
              value={twoFactorEnabled}
              onValueChange={setTwoFactorEnabled}
              trackColor={{ false: COLORS.border, true: COLORS.gold }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        <AppText weight="bold" style={styles.sectionTitle}>Active Sessions</AppText>
        <View style={styles.card}>
          {ACTIVE_SESSIONS.map((session, index) => (
            <View key={index}>
              <View style={styles.deviceRow}>
                <View style={styles.deviceIconBox}>
                  <Ionicons
                    name={session.device.toLowerCase().includes('iphone') ? 'phone-portrait-outline' : 'desktop-outline'}
                    size={20}
                    color={COLORS.darkBrown}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.deviceTitleRow}>
                    <AppText weight="bold" style={styles.deviceName}>{session.device}</AppText>
                    {session.current && (
                      <View style={styles.currentBadge}>
                        <AppText style={styles.currentBadgeText}>This device</AppText>
                      </View>
                    )}
                  </View>
                  <AppText style={styles.deviceMeta}>{session.location} • {session.lastActive}</AppText>
                </View>
                {!session.current && (
                  <TouchableOpacity onPress={() => handleLogoutDevice(session.device)}>
                    <AppText style={styles.logoutLink}>Log out</AppText>
                  </TouchableOpacity>
                )}
              </View>
              {index !== ACTIVE_SESSIONS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        <AppText weight="bold" style={[styles.sectionTitle, { color: COLORS.error }]}>Danger Zone</AppText>
        <View style={[styles.card, styles.dangerCard]}>
          <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={handleDeleteAccount}>
            <View style={styles.rowLeft}>
              <Ionicons name="trash-outline" size={20} color={COLORS.error} />
              <View>
                <AppText style={[styles.rowLabel, { color: COLORS.error }]}>Delete Account</AppText>
                <AppText style={styles.rowHelper}>Permanently delete your account and data</AppText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.error} />
          </TouchableOpacity>
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

  sectionTitle: { fontSize: 15, color: COLORS.darkBrown, marginBottom: -6 },

  card: { backgroundColor: COLORS.white, borderRadius: 20, paddingHorizontal: 16, borderWidth: 1, borderColor: COLORS.border },
  dangerCard: { borderColor: COLORS.errorBg },

  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  rowLabel: { fontSize: 14, color: COLORS.darkBrown },
  rowHelper: { fontSize: 12, color: COLORS.placeholder, marginTop: 2 },

  divider: { height: 1, backgroundColor: COLORS.border },

  deviceRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 16 },
  deviceIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.goldLight, alignItems: 'center', justifyContent: 'center' },
  deviceTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  deviceName: { fontSize: 14, color: COLORS.darkBrown },
  deviceMeta: { fontSize: 12, color: COLORS.placeholder, marginTop: 2 },
  currentBadge: { backgroundColor: COLORS.goldLight, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  currentBadgeText: { fontSize: 10, color: COLORS.darkBrown },
  logoutLink: { fontSize: 13, color: COLORS.error },
});