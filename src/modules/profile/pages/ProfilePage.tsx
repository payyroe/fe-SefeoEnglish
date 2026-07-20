import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppText from '../../../shared/components/AppText';
import BottomNav from '../../../shared/components/BottomNav';
import VipBadge from '../../../shared/components/VipBadge';

const COLORS = {
  background: '#FDFAF6',
  darkBrown: '#543A14',
  gold: '#CEAD82',
  goldLight: '#FFF3E2',
  white: '#FFFFFF',
  error: '#E5484D',
  border: '#EAD9BE',
};

const MENU_GROUPS = [
  [
    { icon: 'person-outline', title: 'Personal Information', subtitle: 'Name, Email, WhatsApp', route: '/(app)/personal-information' },
    { icon: 'card-outline', title: 'Membership & Billing', subtitle: 'Current Plan, Payment History', route: '/(app)/membership-billing' },
  ],
  [
    { icon: 'lock-closed-outline', title: 'Security', subtitle: 'Password', route: '/(app)/security' },
  ],
] as const;

export default function ProfilePage() {
  const router = useRouter();

  // TODO: ganti dengan data user asli dari API/auth session
  const role: 'member' | 'host' = 'member';
  const membershipTier: 'regular' | 'vip' = 'vip';

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => router.replace('/(auth)/login'),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Image
          source={require('../../../../assets/images/martin.jpg')}
          style={styles.avatar}
        />
        <AppText weight="bold" style={styles.name}>Nanda Maulana</AppText>
        {role === 'host' && <VipBadge label="HOST" />}
        {role === 'member' && membershipTier === 'vip' && <VipBadge label="VIP" />}

        {MENU_GROUPS.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.menuCard}>
            {group.map((item, index) => (
              <View key={item.title}>
                <TouchableOpacity
                  style={styles.menuRow}
                  activeOpacity={0.7}
                  onPress={() => router.push(item.route as any)}
                >
                  <View style={styles.iconBox}>
                    <Ionicons name={item.icon as any} size={20} color={COLORS.darkBrown} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <AppText weight="bold" style={styles.menuTitle}>{item.title}</AppText>
                    <AppText style={styles.menuSubtitle}>{item.subtitle}</AppText>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={COLORS.darkBrown} />
                </TouchableOpacity>
                {index !== group.length - 1 && <View style={styles.menuDivider} />}
              </View>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
          <AppText weight="bold" style={styles.logoutText}>Log out</AppText>
        </TouchableOpacity>
      </View>

      <BottomNav role={role} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 32, alignItems: 'center' },

  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { fontSize: 24, color: COLORS.darkBrown, marginBottom: 10 },

  menuCard: {
    width: '100%', backgroundColor: COLORS.white, borderRadius: 20,
    borderWidth: 1, borderColor: COLORS.border, marginTop: 24, overflow: 'hidden',
  },
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 18 },
  iconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.goldLight, alignItems: 'center', justifyContent: 'center' },
  menuTitle: { fontSize: 15, color: COLORS.darkBrown },
  menuSubtitle: { fontSize: 12, color: '#B3A491', marginTop: 2 },
  menuDivider: { height: 1, backgroundColor: COLORS.border, marginLeft: 72 },

  logoutButton: {
    width: '100%', borderWidth: 1.5, borderColor: COLORS.error, borderRadius: 30,
    paddingVertical: 13, alignItems: 'center', marginTop: 24,
  },
  logoutText: { color: COLORS.error, fontSize: 15 },
});