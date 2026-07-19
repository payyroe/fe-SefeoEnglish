import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from './AppText';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = { darkBrown: '#543A14', gold: '#CEAD82', white: '#FFFFFF', };

type Props = { label?: string; compact?: boolean };

export default function VipBadge({ label = 'VIP MEMBER', compact = false }: Props) {
  return (
    <View>
        <LinearGradient 
        colors={[COLORS.darkBrown, COLORS.gold]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.badge, compact && styles.badgeCompact]}
        >
      <Ionicons name="ribbon-outline" size={compact ? 12 : 14} color={COLORS.white} />
      <AppText weight="bold" style={[styles.text, compact && styles.textCompact]}>{label}</AppText>
        </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 20,
    paddingHorizontal: 20, paddingVertical: 5,
  },
  badgeCompact: { paddingHorizontal: 8, paddingVertical: 3 },
  text: { color: COLORS.white, fontSize: 14 },
  textCompact: { fontSize: 13 },
});