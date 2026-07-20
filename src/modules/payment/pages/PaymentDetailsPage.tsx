import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as Clipboard from 'expo-clipboard';
import AppText from '../../../shared/components/AppText';

const COLORS = {
  background: '#FDFAF6',
  darkBrown: '#543A14',
  gold: '#CEAD82',
  goldLight: '#FFF3E2',
  white: '#FFFFFF',
  placeholder: '#B3A491',
  black: '#1A1A1A',
};

export default function PaymentDetailsPage() {
  const router = useRouter();
  const [proofUri, setProofUri] = useState<string | null>(null);

  const accountNumber = '9876 9846 8545';

  const handleCopy = async () => {
    await Clipboard.setStringAsync(accountNumber.replace(/\s/g, ''));
    Alert.alert('Copied', 'Account number copied to clipboard');
  };

  const handlePickProof = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow access to your photos to upload proof.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setProofUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!proofUri) {
      Alert.alert('Upload required', 'Please upload your payment proof first.');
      return;
    }

    // TODO: upload proofUri ke server / API submit confirmation
    console.log('Submit payment proof:', proofUri);

    router.push('/(app)/payment-success');
  };

  const handlePayLater = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={COLORS.darkBrown} />
        </TouchableOpacity>
        <AppText weight="bold" style={styles.headerTitle}>Payment Details</AppText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconCircle}>
          <Ionicons name="ribbon-outline" size={28} color={COLORS.darkBrown} />
        </View>
        <AppText weight="bold" style={styles.title}>Complete VIP Payment</AppText>
        <AppText style={styles.subtitle}>
          Secure your access to exclusive learning materials and private mentoring
        </AppText>

        {/* Order Summary */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="document-text-outline" size={20} color={COLORS.darkBrown} />
            <AppText weight="bold" style={styles.cardTitle}>Order Summary</AppText>
          </View>

          <View style={styles.summaryRow}>
            <AppText style={styles.summaryLabel}>Plan</AppText>
            <AppText weight="bold" style={styles.summaryValue}>VIP Membership (1 Month)</AppText>
          </View>
          <View style={styles.summaryRow}>
            <AppText style={styles.summaryLabel}>Order ID</AppText>
            <AppText weight="bold" style={styles.summaryValue}>#SF-0100-VIP</AppText>
          </View>
          <View style={styles.summaryRow}>
            <AppText weight="bold" style={styles.summaryLabel}>Total Amount</AppText>
            <AppText weight="bold" style={[styles.summaryValue, { color: COLORS.gold }]}>
              Rp.50,000
            </AppText>
          </View>
        </View>

        {/* Transfer Details */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="business-outline" size={20} color={COLORS.darkBrown} />
            <AppText weight="bold" style={styles.cardTitle}>Transfer Details</AppText>
          </View>

          <AppText style={styles.fieldLabel}>BANK NAME</AppText>
          <AppText weight="bold" style={styles.fieldValue}>BANK CENTRAL ASIA (BCA)</AppText>

          <AppText style={[styles.fieldLabel, { marginTop: 16 }]}>ACCOUNT NUMBER</AppText>
          <View style={styles.accountRow}>
            <AppText weight="bold" style={styles.fieldValue}>{accountNumber}</AppText>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
              <Ionicons name="copy-outline" size={16} color={COLORS.darkBrown} />
            </TouchableOpacity>
          </View>

          <AppText style={[styles.fieldLabel, { marginTop: 16 }]}>ACCOUNT HOLDER</AppText>
          <AppText weight="bold" style={styles.fieldValue}>Safeo English Community and Course</AppText>
        </View>

        {/* Upload Proof */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="cloud-upload-outline" size={20} color={COLORS.darkBrown} />
            <AppText weight="bold" style={styles.cardTitle}>Upload Payment Proof</AppText>
          </View>
          <AppText style={styles.uploadDesc}>
            Please upload a screenshot or photo of your transaction receipt.
          </AppText>

          <TouchableOpacity style={styles.uploadBox} onPress={handlePickProof} activeOpacity={0.7}>
            {proofUri ? (
              <Image source={{ uri: proofUri }} style={styles.previewImage} resizeMode="cover" />
            ) : (
              <>
                <Ionicons name="cloud-upload-outline" size={28} color={COLORS.darkBrown} />
                <AppText style={styles.uploadText}>
                  <AppText weight="bold" style={styles.uploadText}>Click to upload</AppText> or drag and drop
                </AppText>
                <AppText style={styles.uploadHint}>JPG, PNG or PDF (MAX. 5MB)</AppText>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <TouchableOpacity activeOpacity={0.85} onPress={handleSubmit} style={{ marginTop: 8 }}>
          <LinearGradient
            colors={[COLORS.gold, COLORS.darkBrown]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitButton}
          >
            <AppText weight="bold" style={styles.submitButtonText}>Submit Confirmation</AppText>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.payLaterButton} onPress={handlePayLater} activeOpacity={0.7}>
          <AppText weight="bold" style={styles.payLaterText}>i'll pay later</AppText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 10,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1EDE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 20, color: COLORS.darkBrown },

  scrollContent: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 40 },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  title: { fontSize: 24, color: COLORS.darkBrown, textAlign: 'center' },
  subtitle: {
    fontSize: 14,
    color: COLORS.gold,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 20,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EFE7DA',
  },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  cardTitle: { fontSize: 17, color: COLORS.darkBrown },

  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  summaryLabel: { fontSize: 14, color: COLORS.placeholder },
  summaryValue: { fontSize: 14, color: COLORS.darkBrown },

  fieldLabel: { fontSize: 11, color: COLORS.placeholder, letterSpacing: 0.5 },
  fieldValue: { fontSize: 15, color: COLORS.black, marginTop: 4 },
  accountRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  copyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.goldLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadDesc: { fontSize: 13, color: COLORS.placeholder, marginBottom: 16 },
  uploadBox: {
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    borderStyle: 'dashed',
    borderRadius: 16,
    minHeight: 140,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingVertical: 20,
  },
  uploadText: { fontSize: 13, color: COLORS.darkBrown, marginTop: 8 },
  uploadHint: { fontSize: 11, color: COLORS.placeholder, marginTop: 4 },
  previewImage: { width: '100%', height: 140 },

  submitButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  submitButtonText: { color: COLORS.white, fontSize: 15 },
  payLaterButton: {
    borderWidth: 1.5,
    borderColor: '#EAD9BE',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  payLaterText: { color: '#D8B98A', fontSize: 15 },
});