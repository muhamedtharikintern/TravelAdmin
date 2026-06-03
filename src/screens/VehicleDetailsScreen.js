import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  TextInput, Image, ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Feather from 'react-native-vector-icons/Feather';

const VehicleDetailsScreen = ({ navigation, route }) => {
  const API_URL = 'https://traveladmin.duckdns.org';
  const mobileNo = route?.params?.mobileNo;
  const token = route?.params?.token;

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [vehicleNo, setVehicleNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingFront, setUploadingFront] = useState(false);
  const [uploadingBack, setUploadingBack] = useState(false);

  // ✅ Same pattern as DL screen
  const pickImage = (side) => {
    Alert.alert('Upload Photo', 'Choose an option', [
      { text: 'Camera',  onPress: () => openCamera(side) },
      { text: 'Gallery', onPress: () => openGallery(side) },
      { text: 'Cancel',  style: 'cancel' },
    ]);
  };

  const openCamera = (side) => {
    launchCamera({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.didCancel || response.errorCode) return;
      const uri = response.assets[0].uri;
      side === 'front' ? setFrontImage(uri) : setBackImage(uri);
    });
  };

  const openGallery = (side) => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.didCancel || response.errorCode) return;
      const uri = response.assets[0].uri;
      side === 'front' ? setFrontImage(uri) : setBackImage(uri);
    });
  };

  // ✅ Same Firebase upload function as DL screen
  const uploadToFirebase = async (uri, filename) => {
    const reference = storage().ref(`rc/${filename}_${Date.now()}.jpg`);
    await reference.putFile(uri);
    const downloadURL = await reference.getDownloadURL();
    return downloadURL;
  };

  const handleSubmit = async () => {
    if (!frontImage) return Alert.alert('Error', 'Please upload front side of your RC');
    if (!backImage)  return Alert.alert('Error', 'Please upload back side of your RC');
    if (!vehicleNo.trim()) return Alert.alert('Error', 'Please enter your vehicle number');

    try {
      setLoading(true);

      setUploadingFront(true);
      const frontURL = await uploadToFirebase(frontImage, `RC_front_${mobileNo}`);
      setUploadingFront(false);

      setUploadingBack(true);
      const backURL = await uploadToFirebase(backImage, `RC_back_${mobileNo}`);
      setUploadingBack(false);

      const response = await fetch(`${API_URL}/auth/upload-rcdetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          RCFront: frontURL,
          RCBack: backURL,
          vehicleNo,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Success', 'RC uploaded successfully!');
        navigation.navigate('AadharProfile', { mobileNo, token }); 
      } else {
        Alert.alert('Error', result.message || 'Something went wrong');
      }
    } catch (error) {
      console.log('Submit error:', error);
      Alert.alert('Error', 'Failed to upload. Please try again.');
    } finally {
      setLoading(false);
      setUploadingFront(false);
      setUploadingBack(false);
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
          <Text style={styles.title}>Vehicle Number</Text>
        </View>

        {/* FRONT RC */}
        <View style={styles.uploadBox}>
          <Text style={styles.uploadTitle}>Front side of your RC</Text>

          {frontImage && (
            <Image source={{ uri: frontImage }} style={styles.previewImage} resizeMode="cover" />
          )}

          <TouchableOpacity style={styles.uploadBtn} onPress={() => pickImage('front')}>
            {uploadingFront ? (
              <ActivityIndicator color="#4A4A4A" />
            ) : (
              <>
                <Feather name="image" size={20} color="#5F5F5F" />
                <Text style={styles.uploadText}>{frontImage ? 'Change Photo' : 'Upload Photo'}</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* BACK RC */}
        <View style={styles.uploadBox}>
          <Text style={styles.uploadTitle}>Back side of your RC</Text>

          {backImage && (
            <Image source={{ uri: backImage }} style={styles.previewImage} resizeMode="cover" />
          )}

          <TouchableOpacity style={styles.uploadBtn} onPress={() => pickImage('back')}>
            {uploadingBack ? (
              <ActivityIndicator color="#4A4A4A" />
            ) : (
              <>
                <Feather name="image" size={20} color="#5F5F5F" />
                <Text style={styles.uploadText}>{backImage ? 'Change Photo' : 'Upload Photo'}</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* VEHICLE NUMBER INPUT */}
        <Text style={styles.label}>Enter Vehicle number</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="TN14 A 0007"
            placeholderTextColor="#999"
            style={styles.input}
            value={vehicleNo}
            onChangeText={(text) => setVehicleNo(text.toUpperCase())}
            autoCapitalize="characters"
          />
        </View>
        <Text style={styles.helper}>Eg: TN14 A 0007</Text>

        <Image
          source={require('../assets/vehicleno.png')}
          style={styles.sampleImage}
          resizeMode="contain"
        />

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

export default VehicleDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F6F6' },
  header: { paddingHorizontal: 20, marginTop: 10, alignItems: 'center', marginBottom: 10 },
  backIcon: { width: 40, height: 40, resizeMode: 'contain' },
  backBtn: {
    position: 'absolute', left: 20, top: 0,
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#EAEAEA', justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: '600', color: '#3A3A3A' },
  uploadBox: {
    marginTop: 20, marginHorizontal: 20,
    borderWidth: 1.5, borderColor: '#8C8C8C',
    borderStyle: 'dashed', borderRadius: 16,
    paddingVertical: 30, alignItems: 'center',
  },
  uploadTitle: { fontSize: 16, color: '#6B6B6B', marginBottom: 18, fontWeight: '500' },
  previewImage: { width: 280, height: 160, borderRadius: 12, marginBottom: 15 },
  uploadBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#E6EAEA', paddingHorizontal: 25,
    height: 50, borderRadius: 25,
  },
  uploadText: { marginLeft: 10, fontSize: 16, color: '#4A4A4A', fontWeight: '500' },
  label: { fontSize: 18, fontWeight: '600', color: '#3A3A3A', marginTop: 20, marginHorizontal: 20, marginBottom: 10 },
  inputBox: {
    marginHorizontal: 20, height: 60, borderRadius: 30,
    borderWidth: 1.5, borderColor: '#CFCFCF',
    justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#FFFFFF',
  },
  input: { fontSize: 18, color: '#2E2E2E' },
  helper: { fontSize: 14, color: '#8A8A8A', marginTop: 8, marginHorizontal: 20 },
  sampleImage: { marginTop: 20, marginHorizontal: 20, width: 358, height: 212, borderRadius: 8, marginBottom: 20 },
  submitBtn: {
    backgroundColor: '#117A7A', margin: 20,
    paddingVertical: 16, borderRadius: 30,
    alignItems: 'center',
  },
  submitText: { fontSize: 18, color: '#FFFFFF', fontWeight: '600' },
});