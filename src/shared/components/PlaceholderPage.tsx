import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from './AppText';
import BottomNav from './BottomNav';

const COLORS = {
  background: '#FDFAF6',
  darkBrown: '#543A14',
  placeholder: '#B3A491',
};

type Props = {
  title: string;
};

export default function PlaceholderPage({ title }: Props) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <AppText weight="bold" style={styles.title}>{title}</AppText>
        <AppText style={styles.subtitle}>Halaman ini masih dalam pengembangan</AppText>
      </View>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  title: { fontSize: 22, color: COLORS.darkBrown, marginBottom: 8 },
  subtitle: { fontSize: 14, color: COLORS.placeholder, textAlign: 'center' },
});