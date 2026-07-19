import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
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
    backCircle: '#F0E4D3',
  } as const;

const CODE_LENGTH = 4;

export default function OtpVerificationPage() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone?: string }>();

  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [error, setError] = useState<string | undefined>();
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Nomor yang ditampilkan di subtitle. Kalau ada param `phone`, sensornya
  // cuma nunjukin 3 digit terakhir biar mirip desain (+62xxx...1234).
  const displayPhone = phone ? maskPhone(phone) : '+62xxx';

  const handleChange = (text: string, index: number) => {
    // hanya terima 1 digit angka per kotak
    const digit = text.replace(/[^0-9]/g, '').slice(-1);

    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    if (error) setError(undefined);

    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (code.some((d) => d === '')) {
      setError('Please enter the full 4-digit code');
      return;
    }

    const fullCode = code.join('');
    // TODO: panggil API verifikasi OTP kamu di sini dengan `fullCode`
    console.log('Verifikasi kode:', fullCode);

    router.push('/register-success');
  };

  const handleResend = () => {
    // TODO: panggil API resend OTP kamu di sini
    console.log('Kirim ulang kode ke', phone);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={22} color={COLORS.darkBrown} />
            </TouchableOpacity>

            <AppText style={styles.title}>Enter Your Verification Code</AppText>
            <AppText style={styles.subtitle}>
              Enter the 4-digit code sent to{'\n'}
              {displayPhone}
            </AppText>

            <View style={styles.codeRow}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[styles.codeBox, error && styles.codeBoxError]}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                />
              ))}
            </View>

            {error && (
              <View style={styles.errorRow}>
                <Ionicons name="alert-circle-outline" size={16} color={COLORS.error} />
                <AppText style={styles.errorText}>{error}</AppText>
              </View>
            )}

            <View style={styles.resendRow}>
              <AppText style={styles.resendText}>Didn't receive a code? </AppText>
              <TouchableOpacity onPress={handleResend}>
                <AppText style={styles.resendLink}>Resend</AppText>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.85} onPress={handleVerify}>
            <LinearGradient
              colors={[COLORS.gold, COLORS.darkBrown]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.verifyButton}
            >
              <AppText weight="bold" style={styles.verifyButtonText}>Verify</AppText>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function maskPhone(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length <= 3) return `+62xxx`;
  return `+62xxx${digits.slice(-3)}`;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.backCircle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.darkBrown,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.gold,
    marginTop: 12,
    marginBottom: 28,
    lineHeight: 22,
  },
  codeRow: {
    flexDirection: 'row',
    gap: 14,
  },
  codeBox: {
    width: 64,
    height: 72,
    borderRadius: 16,
    backgroundColor: COLORS.inputBg,
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.darkBrown,
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#3D2B1E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  codeBoxError: {
    borderColor: COLORS.error,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 13,
    marginLeft: 6,
  },
  resendRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
    color: COLORS.darkBrown,
  },
  resendLink: {
    fontSize: 14,
    color: COLORS.darkBrown,
    fontWeight: '700',
  },
  verifyButton: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButtonText: {
    color: COLORS.white,
    fontSize: 18,
  },
});