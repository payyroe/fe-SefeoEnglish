import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = { track: '#F1E7D8', gold: '#CEAD82', goldLight: '#8B622E' };

type Props = {
  progress: number;
  height?: number;
  trackColor?: string;
  gradientColors?: [string, string];
};

export default function ProgressBar({
  progress,
  height = 8,
  trackColor = COLORS.track,
  gradientColors = [COLORS.gold, COLORS.goldLight],
}: Props) {
  const width = `${Math.min(Math.max(progress, 0), 100)}%` as const;

  return (
    <View style={[styles.track, { height, backgroundColor: trackColor, borderRadius: height / 2 }]}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.fill, { width, borderRadius: height / 2 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', overflow: 'hidden' },
  fill: { height: '100%' },
});