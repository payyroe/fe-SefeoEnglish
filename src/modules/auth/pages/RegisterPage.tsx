import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
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

type FormErrors = {
  username?: string;
  whatsapp?: string;
  password?: string;
  confirmPassword?: string;
  learningGoal?: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [learningGoal, setLearningGoal] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const clearError = (field: keyof FormErrors) => {
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!username.trim()) newErrors.username = 'Please fill out this field';
    if (!whatsapp.trim()) newErrors.whatsapp = 'Please fill out this field';
    if (!password.trim()) newErrors.password = 'Please fill out this field';
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please fill out this field';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!learningGoal.trim()) newErrors.learningGoal = 'Please fill out this field';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validate()) return;

    // TODO: panggil API register kamu di sini, lalu kirim OTP ke nomor WhatsApp
    console.log('Register dengan:', { username, whatsapp, password, learningGoal });

    router.push({ pathname: '/otp-verif', params: { phone: whatsapp } });
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
          {/* Heading */}
          <AppText weight="bold" style={styles.title}>Create Account</AppText>
          <AppText weight="bold" style={styles.subtitle}>Sign up to get started</AppText>

          {/* Username */}
          <AppText style={styles.label}>Username</AppText>
          <TextInput
            style={[styles.input, errors.username && styles.inputError]}
            placeholder="Username"
            placeholderTextColor={COLORS.placeholder}
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (errors.username) clearError('username');
            }}
            autoCapitalize="none"
          />
          {errors.username && <ErrorText text={errors.username} />}

          {/* Nomor WhatsApp */}
          <AppText style={[styles.label, { marginTop: 20 }]}>Nomor WhatsApp</AppText>
          <TextInput
            style={[styles.input, errors.whatsapp && styles.inputError]}
            placeholder="Nomor WhatsApp"
            placeholderTextColor={COLORS.placeholder}
            value={whatsapp}
            onChangeText={(text) => {
              setWhatsapp(text);
              if (errors.whatsapp) clearError('whatsapp');
            }}
            keyboardType="phone-pad"
          />
          {errors.whatsapp && <ErrorText text={errors.whatsapp} />}

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
                if (errors.password) clearError('password');
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
          {errors.password && <ErrorText text={errors.password} />}

          {/* Confirm Password */}
          <AppText style={[styles.label, { marginTop: 20 }]}>Confirm Password</AppText>
          <View
            style={[styles.input, styles.passwordRow, errors.confirmPassword && styles.inputError]}
          >
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              placeholderTextColor={COLORS.placeholder}
              value={confirmPassword}
              secureTextEntry={!showConfirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword) clearError('confirmPassword');
              }}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword((v) => !v)}>
              <Ionicons
                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color={COLORS.darkBrown}
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && <ErrorText text={errors.confirmPassword} />}

          {/* Tujuan Belajar */}
          <AppText style={[styles.label, { marginTop: 20 }]}>Tujuan Belajar</AppText>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              errors.learningGoal && styles.inputError,
            ]}
            placeholder=""
            placeholderTextColor={COLORS.placeholder}
            value={learningGoal}
            onChangeText={(text) => {
              setLearningGoal(text);
              if (errors.learningGoal) clearError('learningGoal');
            }}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          {errors.learningGoal && <ErrorText text={errors.learningGoal} />}

          {/* Register button */}
          <TouchableOpacity activeOpacity={0.85} onPress={handleRegister} style={{ marginTop: 28 }}>
            <LinearGradient
              colors={[COLORS.gold, COLORS.darkBrown]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.registerButton}
            >
              <AppText weight="bold" style={styles.registerButtonText}>Register</AppText>
            </LinearGradient>
          </TouchableOpacity>

          {/* Login link */}
          <View style={styles.loginRow}>
            <AppText style={styles.loginText}>Already have an account? </AppText>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <AppText style={styles.loginLink}>Login here</AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ErrorText({ text }: { text: string }) {
  return (
    <View style={styles.errorRow}>
      <Ionicons name="alert-circle-outline" size={16} color={COLORS.error} />
      <Text style={styles.errorText}>{text}</Text>
    </View>
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
    paddingTop: 45,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    color: COLORS.darkBrown,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gold,
    marginTop: 6,
    marginBottom: 24,
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
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  textArea: {
    height: 120,
    paddingTop: 16,
    paddingBottom: 16,
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
  registerButton: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    color: COLORS.white,
    fontSize: 18,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: COLORS.darkBrown,
  },
  loginLink: {
    fontSize: 14,
    color: COLORS.darkBrown,
    fontWeight: '700',
  },
});