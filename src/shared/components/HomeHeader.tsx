import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from './AppText';
import VipBadge from './VipBadge';
import { router } from 'expo-router';

const COLORS = { darkBrown: '#543A14', placeholder: '#B3A491' };

type Props = {
  name: string;
  avatarUrl?: string;
  isVip?: boolean;
  onPressNotification?: () => void;
};

export default function HomeHeader({ name, avatarUrl, isVip = false, onPressNotification }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Image
          source={avatarUrl ? { uri: avatarUrl } : require('../../../assets/images/martin.jpg')}
          style={styles.avatar}
        />
        <View>
          <AppText style={styles.greeting}>Good Morning</AppText>
          <View style={styles.nameRow}>
            <AppText weight="bold" style={styles.name}>{name}</AppText>
            {isVip && <VipBadge compact />}
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => router.push('/notification')}>
        <Ionicons name="notifications-outline" size={22} color={COLORS.darkBrown} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 16, marginBottom: 15 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  greeting: { fontSize: 14, color: COLORS.placeholder },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  name: { fontSize: 18, color: COLORS.darkBrown },
});