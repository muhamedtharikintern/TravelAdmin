import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  Image, ActivityIndicator, Alert,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PermitUpload = ({ navigation, route }) => {
  const API_URL = 'https://traveladmin.duckdns.org';
  const mobileNo = route?.params?.mobileNo;
  const token = route?.params?.token;

  const [image, setImage] = useState(null);
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
    const reference = storage().ref(`permits/permit_${mobileNo}_${Date.now()}.jpg`);
    await reference.putFile(uri);
    return await reference.getDownloadURL();
  };

  const handleSubmit = async () => {
    if (!image) return Alert.alert('Error', 'Please upload your permit');

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
      const permitUrl = await uploadToFirebase(image);
      setUploading(false);

      const response = await fetch(`${API_URL}/auth/upload-permit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ permitUrl }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Success', 'Permit uploaded successfully!');
        navigation.navigate('VehicleInsuranceUpload', { mobileNo }); // ✅ pass params
      } else {
        Alert.alert('Error', result.message || 'Something went wrong');
      }
    } catch (error) {
      console.log('Submit error:', error);
      Alert.alert('Error', 'Failed to upload. Please try again.');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Permit</Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.label}>Upload Permit</Text>

        <View style={styles.uploadBox}>
          {image && (
            <Image source={{ uri: image }} style={styles.previewImage} resizeMode="cover" />
          )}
          <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
            {uploading ? (
              <ActivityIndicator color="#555" />
            ) : (
              <>
                <Feather name="image" size={20} color="#555" />
                <Text style={styles.uploadText}>{image ? 'Change Photo' : 'Upload Photo'}</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* SUBMIT */}
      <View style={styles.bottom}>
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
      </View>

    </SafeAreaView>
  );
};

export default PermitUpload;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4', justifyContent: 'space-between' },
  header: { alignItems: 'center', marginTop: 10 },
  backIcon: { width: 40, height: 40, resizeMode: 'contain' },
  backBtn: {
    position: 'absolute', left: 20,
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#E6E6E6', justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: '600', color: '#333' },
  content: { paddingHorizontal: 20, marginTop: 40 },
  label: { fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 20 },
  uploadBox: {
    borderWidth: 1.5, borderColor: '#555',
    borderStyle: 'dashed', borderRadius: 16,
    minHeight: 220, justifyContent: 'center', alignItems: 'center',
    paddingVertical: 20,
  },
  previewImage: { width: 280, height: 160, borderRadius: 12, marginBottom: 15 },
  uploadBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#D1D5D6', paddingVertical: 14,
    paddingHorizontal: 30, borderRadius: 30,
  },
  uploadText: { marginLeft: 10, fontSize: 16, color: '#333', fontWeight: '500' },
  bottom: { paddingHorizontal: 20, marginBottom: 30 },
  submitBtn: { backgroundColor: '#0F7A7A', borderRadius: 30, paddingVertical: 18, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});