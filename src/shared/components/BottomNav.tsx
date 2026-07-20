import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import AppText from './AppText';
import { useUserRole } from '@/src/shared/context/UserRoleContext';

const COLORS = {
  darkBrown: '#543A14',
  gold: '#CEAD82',
  inactive: '#C9C1B4',
  white: '#FFFFFF',
};

const MEMBER_TABS = [
  { key: 'home', label: 'Home', icon: 'home-outline', path: '/(app)' },
  { key: 'session', label: 'Session', icon: 'calendar-outline', path: '/(app)/session' },
  { key: 'progress', label: 'Progress', icon: 'sync-outline', path: '/(app)/progress' },
  { key: 'profile', label: 'Profile', icon: 'person-outline', path: '/(app)/profile' },
] as const;

const HOST_TABS = [
  { key: 'home', label: 'Home', icon: 'home-outline', path: '/(host)' },
  { key: 'schedule', label: 'Schedule', icon: 'calendar-outline', path: '/(host)/schedule' },
  { key: 'profile', label: 'Profile', icon: 'person-outline', path: '/(app)/profile' },
] as const;

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { role } = useUserRole();

  const TABS = role === 'host' ? HOST_TABS : MEMBER_TABS;
  const homePath = role === 'host' ? '/(host)' : '/(app)';

  return (
    <View style={styles.wrapper}>
      {TABS.map((tab) => {
        const active = tab.key === 'home'
          ? pathname === '/' || pathname === homePath
          : pathname.includes(tab.key);

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => router.push(tab.path as any)}
          >
            <Ionicons
              name={tab.icon as any}
              size={22}
              color={active ? COLORS.gold : COLORS.inactive}
            />
            <AppText style={[styles.label, active && { color: COLORS.darkBrown }]}>
              {tab.label}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 11,
    color: '#C9C1B4',
  },
});