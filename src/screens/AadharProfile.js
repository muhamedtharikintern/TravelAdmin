import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  TextInput, Image, ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AadharProfile = ({ navigation, route }) => {
  const API_URL = 'https://traveladmin.duckdns.org';
  const mobileNo = route?.params?.mobileNo;

  const [selected, setSelected] = useState('aadhar');
  const [image, setImage] = useState(null);
  const [idNumber, setIdNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const pickImage = () => {
    Alert.alert('Upload Photo', 'Choose an option', [
      { text: 'Camera',  onPress: openCamera },
      { text: 'Gallery', onPress: openGallery },
      { text: 'Cancel',  style: 'cancel' },
    ]);
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.didCancel || response.errorCode) return;
      setImage(response.assets[0].uri);
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.didCancel || response.errorCode) return;
      setImage(response.assets[0].uri);
    });
  };

  const uploadToFirebase = async (uri) => {
    const filename = `idproof/${selected}_${mobileNo}_${Date.now()}.jpg`;
    const reference = storage().ref(filename);
    await reference.putFile(uri);
    return await reference.getDownloadURL();
  };

  const handleSelectType = (type) => {
    setSelected(type);
    setIdNumber('');
    setImage(null);
  };

  const validateNumber = () => {
    if (selected === 'aadhar') {
      return /^\d{12}$/.test(idNumber);
    } else {
      return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(idNumber);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      return Alert.alert('Error', `Please upload your ${selected === 'aadhar' ? 'Aadhaar' : 'PAN'} card`);
    }
    if (!idNumber.trim()) {
      return Alert.alert('Error', `Please enter your ${selected === 'aadhar' ? 'Aadhaar' : 'PAN'} number`);
    }
    if (!validateNumber()) {
      return Alert.alert(
        'Invalid Number',
        selected === 'aadhar'
          ? 'Aadhaar number must be exactly 12 digits'
          : 'PAN must be in format: AAAAA9999A'
      );
    }

    try {
      setLoading(true);

      // ✅ Always get token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      console.log('🔑 Token:', token);

      if (!token) {
        Alert.alert('Error', 'Session expired. Please login again.');
        navigation.reset({ index: 0, routes: [{ name: 'ContactDetails' }] });
        return;
      }

      setUploading(true);
      const idUrl = await uploadToFirebase(image);
      setUploading(false);
      console.log('✅ ID proof uploaded:', idUrl);

      const response = await fetch(`${API_URL}/auth/upload-id-proof`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idType: selected,
          idUrl,
          idNumber,
        }),
      });

      const result = await response.json();
      console.log('✅ ID proof save result:', result);

      if (result.success) {
        Alert.alert('Success', 'ID proof uploaded successfully!');
        navigation.navigate('PermitUpload', { mobileNo });
      } else {
        Alert.alert('Error', result.message || 'Something went wrong');
      }

    } catch (error) {
      console.log('❌ Submit error:', error);
      Alert.alert('Error', 'Failed to upload. Please try again.');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Image source={require('../assets/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ID Proof</Text>
        </View>

        {/* TITLE */}
        <Text style={styles.sectionTitle}>Select ID to upload</Text>

        {/* ID SELECTION */}
        <View style={styles.selectionRow}>
          <TouchableOpacity style={styles.optionBox} onPress={() => handleSelectType('aadhar')}>
            <Text style={styles.optionText}>Aadhaar</Text>
            <View style={[styles.radioOuter, selected === 'aadhar' && styles.radioActive]}>
              {selected === 'aadhar' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionBox} onPress={() => handleSelectType('pan')}>
            <Text style={styles.optionText}>PAN Card</Text>
            <View style={[styles.radioOuter, selected === 'pan' && styles.radioActive]}>
              {selected === 'pan' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* UPLOAD BOX */}
        <View style={styles.uploadContainer}>
          {image && (
            <Image source={{ uri: image }} style={styles.previewImage} resizeMode="cover" />
          )}
          <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
            {uploading ? (
              <ActivityIndicator color="#444" />
            ) : (
              <>
                <Feather name="image" size={22} color="#444" />
                <Text style={styles.uploadText}>{image ? 'Change Photo' : 'Upload Photo'}</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* INPUT */}
        <Text style={styles.inputLabel}>
          Enter {selected === 'aadhar' ? 'Aadhaar' : 'PAN'} Number
        </Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          placeholder={selected === 'aadhar' ? '1234 5678 9012' : 'ABCDE1234F'}
          value={idNumber}
          onChangeText={(text) => {
            if (selected === 'aadhar') {
              setIdNumber(text.replace(/[^0-9]/g, '').slice(0, 12));
            } else {
              setIdNumber(text.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10));
            }
          }}
          keyboardType={selected === 'aadhar' ? 'numeric' : 'default'}
          autoCapitalize={selected === 'pan' ? 'characters' : 'none'}
          maxLength={selected === 'aadhar' ? 12 : 10}
        />

        {/* SAMPLE IMAGE */}
        <Image
          source={require('../assets/aadhar.png')}
          style={styles.sampleImage}
        />

        <Text style={styles.note}>
          Check {selected === 'aadhar' ? 'Aadhaar' : 'PAN'} number before you submit
        </Text>

      </ScrollView>

      {/* SUBMIT */}
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

export default AadharProfile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4' },
  header: { alignItems: 'center', marginTop: 10 },
  backIcon: { width: 40, height: 40, resizeMode: 'contain' },
  backBtn: {
    position: 'absolute', left: 20,
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#E6E6E6', justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#333' },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#333', marginTop: 30, marginHorizontal: 20 },
  selectionRow: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20 },
  optionBox: {
    flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#CFCFCF', borderRadius: 20,
    paddingVertical: 20, paddingHorizontal: 20, marginRight: 10,
  },
  optionText: { fontSize: 18, color: '#8A8A8A', fontWeight: '500' },
  radioOuter: {
    width: 26, height: 26, borderRadius: 13,
    borderWidth: 2, borderColor: '#CFCFCF',
    justifyContent: 'center', alignItems: 'center',
  },
  radioActive: { borderColor: '#0F7A7A' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#0F7A7A' },
  uploadContainer: {
    borderWidth: 1.5, borderStyle: 'dashed', borderColor: '#999',
    borderRadius: 12, marginHorizontal: 20, marginTop: 25,
    paddingVertical: 30, alignItems: 'center',
  },
  previewImage: { width: 280, height: 160, borderRadius: 12, marginBottom: 15 },
  uploadBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#E6EAEA', paddingHorizontal: 25,
    paddingVertical: 14, borderRadius: 30,
  },
  uploadText: { fontSize: 16, color: '#444', marginLeft: 10, fontWeight: '500' },
  inputLabel: { fontSize: 18, fontWeight: '600', color: '#333', marginTop: 25, marginHorizontal: 20 },
  input: {
    borderWidth: 1.5, borderColor: '#CFCFCF', borderRadius: 30,
    height: 55, marginHorizontal: 20, marginTop: 12,
    paddingHorizontal: 20, fontSize: 16, backgroundColor: '#F4F4F4',
  },
  sampleImage: { width: 358, height: 233, alignSelf: 'center', marginTop: 25, borderRadius: 12 },
  note: { fontSize: 14, color: '#777', marginTop: 15, marginBottom: 20, textAlign: 'center' },
  submitBtn: {
    backgroundColor: '#0F7A7A', marginHorizontal: 20, marginBottom: 20,
    borderRadius: 30, paddingVertical: 18, alignItems: 'center',
  },
  submitText: { fontSize: 18, color: '#FFF', fontWeight: '600' },
});