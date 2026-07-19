import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from './AppText';

const COLORS = {
  darkBrown: '#543A14',
  placeholder: '#B3A491',
};

type Props = {
  name: string;
  avatarUrl?: string;
  onPressNotification?: () => void;
};

export default function HomeHeader({ name, avatarUrl, onPressNotification }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        {/* <Image
          source={avatarUrl ? { uri: avatarUrl } : require('../../../assets/images/avatar-placeholder.png')}
          style={styles.avatar}
        /> */}
        <View>
          <AppText style={styles.greeting}>Good Morning</AppText>
          <AppText weight="bold" style={styles.name}>{name}</AppText>
        </View>
      </View>
      <TouchableOpacity onPress={onPressNotification}>
        <Ionicons name="notifications-outline" size={24} color={COLORS.darkBrown} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.placeholder,
  },
  name: {
    fontSize: 18,
    color: COLORS.darkBrown,
  },
});