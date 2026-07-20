import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import AppText from '@/src/shared/components/AppText'; // sesuain path relatif ke file lu

// Warna utama sesuai desain SEFEO
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
  black: '#000000',
} as const;

type FormErrors = {
  username?: string;
  password?: string;
  agree?: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // TODO: hapus toggle ini kalau API login udah bisa nentuin role otomatis.
  // Ini cuma buat mempermudah development sebelum backend role-nya siap.
  const [loginAs, setLoginAs] = useState<'member' | 'host'>('member');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!username.trim()) newErrors.username = 'Please fill out this field';
    if (!password.trim()) newErrors.password = 'Please fill out this field';
    if (!agree) newErrors.agree = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;

    console.log('Login dengan:', { username, password, loginAs });

    // TODO: nanti diganti manggil API login beneran.
    // Response API idealnya udah ngasih tau role user (member/host) dan
    // membership tier (regular/vip), lalu masing-masing halaman
    // (Home, Session, Profile, dst) tinggal fetch data user itu sendiri
    // buat nentuin tampilan & BottomNav-nya — bukan disimpen di context terpisah.
    router.replace(loginAs === 'host' ? '/(host)' : '/(app)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoBox}>
          <Image
            source={require('@/assets/images/Sefeo.jpeg')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          </View>

          {/* Heading */}
          <AppText weight="bold" style={styles.title}>Welcome</AppText>
          <AppText weight="bold" style={styles.subtitle}>Sign in to your account</AppText>

          {/* TODO: hapus blok ini kalau API login udah bisa nentuin role otomatis */}
          <View style={styles.roleToggleRow}>
            <TouchableOpacity
              style={[styles.roleToggleButton, loginAs === 'member' && styles.roleToggleButtonActive]}
              onPress={() => setLoginAs('member')}
            >
              <AppText style={[styles.roleToggleText, loginAs === 'member' && styles.roleToggleTextActive]}>
                Login as Member
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleToggleButton, loginAs === 'host' && styles.roleToggleButtonActive]}
              onPress={() => setLoginAs('host')}
            >
              <AppText style={[styles.roleToggleText, loginAs === 'host' && styles.roleToggleTextActive]}>
                Login as Host
              </AppText>
            </TouchableOpacity>
          </View>

          {/* Username */}
          <AppText style={styles.label}>Username</AppText>
          <TextInput
            style={[styles.input, errors.username && styles.inputError]}
            placeholder="Username"
            placeholderTextColor={COLORS.placeholder}
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (errors.username) setErrors((e) => ({ ...e, username: undefined }));
            }}
            autoCapitalize="none"
          />
          {errors.username && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle-outline" size={16} color={COLORS.error} />
              <AppText style={styles.errorText}>{errors.username}</AppText>
            </View>
          )}

          {/* Password */}
          <AppText style={[styles.label, { marginTop: 20 }]}>Password</AppText>
          <View style={[styles.input, styles.passwordRow, errors.password && styles.inputError]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor={COLORS.placeholder}
              value={password}
              secureTextEntry={!showPassword}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color={COLORS.darkBrown}
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle-outline" size={16} color={COLORS.error} />
              <AppText style={styles.errorText}>{errors.password}</AppText>
            </View>
          )}

          {/* Checkbox terms */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgree((v) => !v)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
              {agree && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
            </View>
            <AppText style={styles.checkboxLabel}>I agree to the terms and conditions</AppText>
          </TouchableOpacity>
          {errors.agree && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle-outline" size={16} color={COLORS.error} />
              <AppText style={styles.errorText}>{errors.agree}</AppText>
            </View>
          )}

          {/* Login button */}
          <TouchableOpacity activeOpacity={0.85} onPress={handleLogin} style={{ marginTop: 24 }}>
            <LinearGradient
              colors={[COLORS.gold, COLORS.darkBrown]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginButton}
            >
              <AppText weight="bold" style={styles.loginButtonText}>Login</AppText>
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Register link */}
          <View style={styles.registerRow}>
            <AppText style={styles.registerText}>Don't have an account? </AppText>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <AppText weight="bold" style={styles.registerLink}>Register</AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  logoBox: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  logoText: {
    color: COLORS.gold,
    fontSize: 16,
    letterSpacing: 2,
  },
  title: {
    fontSize: 32,
    color: COLORS.darkBrown,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gold,
    marginTop: 6,
    marginBottom: 28,
  },

  // TODO: hapus style ini juga kalau toggle role udah nggak dipakai
  roleToggleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
  },
  roleToggleButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  roleToggleButtonActive: {
    backgroundColor: COLORS.gold,
  },
  roleToggleText: {
    fontSize: 13,
    color: COLORS.gold,
  },
  roleToggleTextActive: {
    color: COLORS.white,
  },

  label: {
    fontSize: 14,
    color: COLORS.darkBrown,
    marginBottom: 8,
  },
  input: {
    height: 56,
    backgroundColor: COLORS.inputBg,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 0,
    fontSize: 15,
    color: COLORS.darkBrown,
    borderWidth: 1,
    borderColor: 'transparent',
    ...(Platform.OS === 'android' ? { textAlignVertical: 'center' as const } : {}),
    shadowColor: '#543A14',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.darkBrown,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 13,
    marginLeft: 6,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: COLORS.gold,
  },
  checkboxLabel: {
    fontSize: 14,
    color: COLORS.darkBrown,
  },
  loginButton: {
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 18,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.goldLight,
    marginTop: 32,
    marginBottom: 24,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 14,
    color: COLORS.darkBrown,
  },
  registerLink: {
    fontSize: 14,
    color: COLORS.gold,
  },

});