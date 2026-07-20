import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import AppText from '../../../shared/components/AppText';

const COLORS = {
  background: '#FDFAF6',
  darkBrown: '#543A14',
  gold: '#CEAD82',
  white: '#FFFFFF',
};

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/Sefeo.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <AppText weight="bold" style={styles.title}>Payment Success</AppText>
        <AppText style={styles.subtitle}>
          The administrator will confirm your payment
        </AppText>

        <TouchableOpacity
          activeOpacity={0.85}
          style={{ width: '100%' }}
          onPress={() => router.replace('/(app)')}
        >
          <LinearGradient
            colors={[COLORS.gold, COLORS.darkBrown]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.homeButton}
          >
            <AppText weight="bold" style={styles.homeButtonText}>Home</AppText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logo: { width: 100, height: 100, marginBottom: 24, borderRadius: 10 },
  title: { fontSize: 28, color: COLORS.darkBrown, marginBottom: 12 },
  subtitle: {
    fontSize: 15,
    color: COLORS.gold,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  homeButton: { borderRadius: 30, paddingVertical: 10, alignItems: 'center' },
  homeButtonText: { color: COLORS.white, fontSize: 18 },
});