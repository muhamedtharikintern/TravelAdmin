import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

const EditProfileScreen = ({ navigation, route }) => {
  const API_URL = 'https://traveladmin.duckdns.org';
  const mobileNo = route?.params?.mobileNo;
  const token = route?.params?.token;

  const [gender, setGender] = useState('male');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [selfieUrl, setSelfieUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // ✅ Fetch user profile (including selfie) on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setFetching(true);
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log('Profile:', JSON.stringify(result));

      if (result.success) {
        const user = result.user;
        setFullName(user.fullName || '');
        setDob(user.DOB || '');
        setGender(user.gender || 'male');
        setSelfieUrl(user.selfieUrl || null); // ✅ selfie URL from MongoDB
      }
    } catch (err) {
      console.log('Fetch profile error:', err);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!dob.trim()) {
      Alert.alert('Error', 'Please enter your date of birth');
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/edit-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName,
          DOB: dob,
          gender,
        }),
      });

      const result = await response.json();
      console.log('Edit profile result:', JSON.stringify(result));

      if (result.success) {
        navigation.navigate('VehicleDetails', { mobileNo, token });
      } else {
        Alert.alert('Error', result.message || 'Something went wrong');
      }
    } catch (err) {
      console.log('Submit error:', err);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Photo and Name</Text>
      </View>

      {/* PROFILE IMAGE */}
      <View style={styles.imageSection}>
        {fetching ? (
          <View style={styles.profileImagePlaceholder}>
            <ActivityIndicator color="#117A7A" size="large" />
          </View>
        ) : (
          <Image
            source={
              selfieUrl
                ? { uri: selfieUrl }
                : require('../assets/user.png') // fallback placeholder
            }
            style={styles.profileImage}
          />
        )}

        {/* FACE FRAME */}
        <View style={styles.faceFrame}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('TakeSelfie', { mobileNo, token })}>
          <Text style={styles.editPhotoText}>Edit Profile Photo</Text>
        </TouchableOpacity>
      </View>

      {/* FORM */}
      <View style={styles.form}>

        {/* FULL NAME */}
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="John Wick"
            placeholderTextColor="#7A7A7A"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        {/* DOB */}
        <Text style={styles.label}>Date of Birth</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="01-01-1990"
            placeholderTextColor="#7A7A7A"
            style={styles.input}
            value={dob}
            onChangeText={(text) => {
              // Auto-format DD-MM-YYYY
              const cleaned = text.replace(/[^0-9]/g, '');
              let formatted = cleaned;
              if (cleaned.length >= 3 && cleaned.length <= 4)
                formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
              else if (cleaned.length > 4)
                formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4, 8)}`;
              setDob(formatted);
            }}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        {/* GENDER */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderRow}>

          <TouchableOpacity style={styles.genderBtn} onPress={() => setGender('male')}>
            <Text style={styles.genderText}>Male</Text>
            <View style={[styles.radioOuter, gender === 'male' && styles.radioActive]}>
              {gender === 'male' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.genderBtn} onPress={() => setGender('female')}>
            <Text style={styles.genderText}>Female</Text>
            <View style={[styles.radioOuter, gender === 'female' && styles.radioActive]}>
              {gender === 'female' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

        </View>
      </View>

      {/* SUBMIT BUTTON */}
      <TouchableOpacity
        style={[styles.submitBtn, loading && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" size="large" />
        ) : (
          <Text style={styles.submitText}>Submit</Text>
        )}
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F6F6', paddingHorizontal: 20 },
  header: { alignItems: 'center', marginTop: 10 },
  backIcon: { width: 40, height: 40, resizeMode: 'contain' },
  backBtn: {
    position: 'absolute', left: 0,
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#EAEAEA', justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: '600', color: '#3A3A3A' },
  imageSection: { alignItems: 'center', marginTop: 30 },
  profileImage: { width: 110, height: 110, borderRadius: 55 },
  profileImagePlaceholder: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center',
  },
  faceFrame: { position: 'absolute', top: 20, width: 90, height: 90 },
  corner: { position: 'absolute', width: 20, height: 20, borderColor: '#FFFFFF' },
  topLeft:     { top: 0,    left: 0,  borderTopWidth: 2,    borderLeftWidth: 2  },
  topRight:    { top: 0,    right: 0, borderTopWidth: 2,    borderRightWidth: 2 },
  bottomLeft:  { bottom: 0, left: 0,  borderBottomWidth: 2, borderLeftWidth: 2  },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 },
  editPhotoText: { marginTop: 12, fontSize: 16, color: '#2F80ED', fontWeight: '500' },
  form: { marginTop: 30 },
  label: { fontSize: 18, fontWeight: '600', color: '#3A3A3A', marginBottom: 10, marginTop: 15 },
  inputBox: {
    height: 60, borderRadius: 30, borderWidth: 1.5,
    borderColor: '#CFCFCF', justifyContent: 'center',
    paddingHorizontal: 20, backgroundColor: '#FFFFFF',
  },
  input: { fontSize: 18, color: '#2E2E2E' },
  genderRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  genderBtn: {
    width: '48%', height: 60, borderRadius: 30, borderWidth: 1.5,
    borderColor: '#CFCFCF', flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 20, backgroundColor: '#FFFFFF',
  },
  genderText: { fontSize: 16, color: '#6B6B6B' },
  radioOuter: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: '#CFCFCF',
    alignItems: 'center', justifyContent: 'center',
  },
  radioActive: { borderColor: '#117A7A' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#117A7A' },
  submitBtn: {
    position: 'absolute', bottom: 30, left: 20, right: 20,
    height: 60, borderRadius: 30, backgroundColor: '#117A7A',
    justifyContent: 'center', alignItems: 'center',
  },
  submitText: { fontSize: 18, color: '#FFFFFF', fontWeight: '600' },
});