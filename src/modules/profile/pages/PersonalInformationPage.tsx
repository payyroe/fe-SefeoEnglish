import React, { useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppText from '../../../shared/components/AppText';

const COLORS = {
  background: '#FDFAF6',
  darkBrown: '#543A14',
  gold: '#CEAD82',
  goldLight: '#FFF3E2',
  white: '#FFFFFF',
  placeholder: '#B3A491',
  border: '#EFE7DA',
};

export default function PersonalInformationPage() {
  const router = useRouter();

  // TODO: ganti dengan data asli dari API / auth context
  const [fullName, setFullName] = useState('Nanda Maulana');
  const [email, setEmail] = useState('nanda.maulana@email.com');
  const [phone, setPhone] = useState('+62 812-3456-7890');
  const [dob, setDob] = useState('12 March 1998');

  const handleSave = () => {
    // TODO: panggil API update profile di sini
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.darkBrown} />
        </TouchableOpacity>
        <AppText weight="bold" style={styles.headerTitle}>Personal Information</AppText>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarWrapper}>
          <Image
            source={require('../../../../assets/images/martin.jpg')}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarButton} activeOpacity={0.85}>
            <Ionicons name="camera" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.fieldGroup}>
          <AppText style={styles.label}>Full Name</AppText>
          <View style={styles.inputBox}>
            <Ionicons name="person-outline" size={18} color={COLORS.placeholder} />
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Your full name"
              placeholderTextColor={COLORS.placeholder}
            />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <AppText style={styles.label}>Email Address</AppText>
          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={18} color={COLORS.placeholder} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="you@email.com"
              placeholderTextColor={COLORS.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <AppText style={styles.label}>Phone Number</AppText>
          <View style={styles.inputBox}>
            <Ionicons name="call-outline" size={18} color={COLORS.placeholder} />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+62 ..."
              placeholderTextColor={COLORS.placeholder}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <AppText style={styles.label}>Date of Birth</AppText>
          <TouchableOpacity style={styles.inputBox} activeOpacity={0.85}>
            <Ionicons name="calendar-outline" size={18} color={COLORS.placeholder} />
            <AppText style={[styles.input, { paddingVertical: 0 }]}>{dob}</AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.fieldGroup}>
          <AppText style={styles.label}>English Level</AppText>
          <View style={[styles.inputBox, styles.inputBoxDisabled]}>
            <Ionicons name="school-outline" size={18} color={COLORS.placeholder} />
            <AppText style={styles.input}>Intermediate B2</AppText>
            <Ionicons name="lock-closed-outline" size={14} color={COLORS.placeholder} />
          </View>
          <AppText style={styles.helperText}>Determined by your placement test result.</AppText>
        </View>

        <TouchableOpacity activeOpacity={0.85} onPress={handleSave}>
          <LinearGradient
            colors={[COLORS.gold, COLORS.darkBrown]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveButton}
          >
            <AppText weight="bold" style={styles.saveButtonText}>Save Changes</AppText>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 12, paddingBottom: 16,
  },
  backButton: { width: 22 },
  headerTitle: { fontSize: 18, color: COLORS.darkBrown },

  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },

  avatarWrapper: { alignSelf: 'center', marginBottom: 28, position: 'relative' },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: COLORS.gold },
  editAvatarButton: {
    position: 'absolute', bottom: 0, right: 0,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: COLORS.darkBrown, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: COLORS.background,
  },

  fieldGroup: { marginBottom: 18 },
  label: { fontSize: 13, color: COLORS.darkBrown, marginBottom: 8 },
  inputBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: COLORS.white, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border,
    paddingHorizontal: 16, height: 52,
  },
  inputBoxDisabled: { backgroundColor: COLORS.goldLight },
  input: { flex: 1, fontSize: 14, color: COLORS.darkBrown },
  helperText: { fontSize: 12, color: COLORS.placeholder, marginTop: 6 },

  saveButton: { borderRadius: 30, paddingVertical: 10, alignItems: 'center', marginTop: 12 },
  saveButtonText: { color: COLORS.white, fontSize: 15 },
});