import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppText from '../../../shared/components/AppText';

// LOKASI FILE: src/modules/notifications/pages/NotificationsModal.tsx
// (fitur global yang dipicu dari icon lonceng di header, BUKAN bagian dari module profile)
//
// NOTE: Ini didesain sebagai MODAL (presentation: 'modal' di expo-router),
// bukan bottom sheet kecil — supaya list notifikasi punya ruang cukup dan
// gampang di-dismiss dengan tombol X atau swipe-down (default modal iOS/Android).
//
// Setup routing (expo-router):
// app/(app)/notifications.tsx  ->  export { default } from '.../NotificationsModal';
// lalu di app/(app)/_layout.tsx tambahkan:
//   <Stack.Screen name="notifications" options={{ presentation: 'modal', headerShown: false }} />
//
// Trigger dari header, misal di HomeHeader.tsx:
//   <TouchableOpacity onPress={() => router.push('/(app)/notifications')}>
//     <Ionicons name="notifications-outline" size={22} color={COLORS.darkBrown} />
//   </TouchableOpacity>

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

type NotifCategory = 'session' | 'billing' | 'system';

type Notification = {
  id: string;
  category: NotifCategory;
  title: string;
  description: string;
  time: string;
  group: 'Today' | 'Earlier';
  read: boolean;
};

const ICONS: Record<NotifCategory, keyof typeof Ionicons.glyphMap> = {
  session: 'calendar-outline',
  billing: 'card-outline',
  system: 'notifications-outline',
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1', category: 'session', group: 'Today', read: false,
    title: 'Session starting soon',
    description: 'Your "Conversational Fluency" session with Damar starts in 45 minutes.',
    time: '10 min ago',
  },
  {
    id: '2', category: 'billing', group: 'Today', read: false,
    title: 'Payment successful',
    description: 'Your VIP membership has been renewed for October.',
    time: '3 hrs ago',
  },
  {
    id: '3', category: 'system', group: 'Earlier', read: true,
    title: 'New feature: Progress tracking',
    description: 'You can now track your learning milestones from the Progress tab.',
    time: 'Yesterday',
  },
  {
    id: '4', category: 'session', group: 'Earlier', read: true,
    title: 'Session completed',
    description: 'You completed "Grammar Workshop" with Damar. Great job!',
    time: '2 days ago',
  },
];

export default function NotificationsModal() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const grouped = ['Today', 'Earlier'] as const;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.grabberWrapper}>
        <View style={styles.grabber} />
      </View>

      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <AppText weight="bold" style={styles.headerTitle}>Notifications</AppText>
          {unreadCount > 0 && (
            <View style={styles.unreadCountBadge}>
              <AppText style={styles.unreadCountText}>{unreadCount}</AppText>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="close" size={24} color={COLORS.darkBrown} />
        </TouchableOpacity>
      </View>

      {unreadCount > 0 && (
        <TouchableOpacity style={styles.markAllRow} onPress={markAllAsRead}>
          <AppText style={styles.markAllText}>Mark all as read</AppText>
        </TouchableOpacity>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notifications.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={40} color={COLORS.placeholder} />
            <AppText style={styles.emptyText}>You're all caught up!</AppText>
          </View>
        )}

        {grouped.map((groupName) => {
          const items = notifications.filter((n) => n.group === groupName);
          if (items.length === 0) return null;
          return (
            <View key={groupName} style={{ marginBottom: 8 }}>
              <AppText weight="bold" style={styles.groupLabel}>{groupName}</AppText>
              {items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.notifCard, !item.read && styles.notifCardUnread]}
                  activeOpacity={0.7}
                  onPress={() => markAsRead(item.id)}
                >
                  <View style={styles.notifIconBox}>
                    <Ionicons name={ICONS[item.category]} size={18} color={COLORS.darkBrown} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.notifTitleRow}>
                      <AppText weight="bold" style={styles.notifTitle}>{item.title}</AppText>
                      {!item.read && <View style={styles.unreadDot} />}
                    </View>
                    <AppText style={styles.notifDesc}>{item.description}</AppText>
                    <AppText style={styles.notifTime}>{item.time}</AppText>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },

  grabberWrapper: { alignItems: 'center', paddingTop: 8 },
  grabber: { width: 40, height: 4, borderRadius: 2, backgroundColor: COLORS.border },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 12,
  },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 19, color: COLORS.darkBrown },
  unreadCountBadge: {
    backgroundColor: COLORS.error, borderRadius: 10, minWidth: 20, height: 20,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6,
  },
  unreadCountText: { fontSize: 11, color: COLORS.white },

  markAllRow: { paddingHorizontal: 24, paddingBottom: 12, alignItems: 'flex-end' },
  markAllText: { fontSize: 13, color: COLORS.gold },

  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },

  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 60, gap: 12 },
  emptyText: { fontSize: 14, color: COLORS.placeholder },

  groupLabel: { fontSize: 13, color: COLORS.placeholder, marginBottom: 10, marginTop: 8 },

  notifCard: {
    flexDirection: 'row', gap: 12, backgroundColor: COLORS.white,
    borderRadius: 18, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: COLORS.border,
  },
  notifCardUnread: { backgroundColor: COLORS.goldLight, borderColor: COLORS.gold },

  notifIconBox: {
    width: 38, height: 38, borderRadius: 12, backgroundColor: COLORS.white,
    alignItems: 'center', justifyContent: 'center',
  },
  notifTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  notifTitle: { fontSize: 14, color: COLORS.darkBrown, flexShrink: 1 },
  unreadDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.error },
  notifDesc: { fontSize: 12.5, color: COLORS.darkBrown, opacity: 0.75, marginTop: 4, lineHeight: 18 },
  notifTime: { fontSize: 11, color: COLORS.placeholder, marginTop: 6 },
});