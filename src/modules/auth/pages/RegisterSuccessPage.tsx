import React from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import AppText from '@/src/shared/components/AppText';

const COLORS = {
  background: '#FDFAF6',
  darkBrown: '#543A14',
  gold: '#CEAD82',
  goldLight: '#FFF3E2',
  inputBg: '#FDFAF6',
  bgBlack: '#1A1A1A',
  white: '#FFFFFF',
  error: '#E5484D',
  placeholder: '#B3A491',
} as const;

export default function RegisterSuccessPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        {/* Logo (versi polos, tanpa kotak hitam) */}
        <View style={styles.logoWrapper}>
          <AppText style={styles.logoText}>SEFEO</AppText>
        </View>

        <AppText weight="bold" style={styles.title}>Welcome to SEFEO</AppText>
        <AppText style={styles.subtitle}>Your account was created successfully!</AppText>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.replace('/login')}
          style={styles.buttonWrapper}
        >
          <LinearGradient
            colors={[COLORS.gold, COLORS.darkBrown]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.loginButton}
          >
            <AppText weight="bold" style={styles.loginButtonText}>Login</AppText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    marginBottom: 24,
  },
  logoText: {
    color: COLORS.gold,
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 3,
  },
  title: {
    fontSize: 26,
    color: COLORS.darkBrown,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.gold,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  buttonWrapper: {
    width: '100%',
  },
  loginButton: {
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
  },
});