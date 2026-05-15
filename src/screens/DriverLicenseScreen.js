import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';


const DriverLicenseScreen = ({ navigation, route }) => {
  const API_URL ="https://traveladmin.duckdns.org";
  const mobileNo = route?.params?.mobileNo; // ✅ get mobileNo from previous screen

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingFront, setUploadingFront] = useState(false);
  const [uploadingBack, setUploadingBack] = useState(false);

  const pickImage = (side) => {
    Alert.alert(
      'Upload Photo',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => openCamera(side) },
        { text: 'Gallery', onPress: () => openGallery(side) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const openCamera = (side) => {
    launchCamera({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
        return;
      }
      const uri = response.assets[0].uri;
      if (side === 'front') setFrontImage(uri);
      else setBackImage(uri);
    });
  };

  const openGallery = (side) => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
        return;
      }
      const uri = response.assets[0].uri;
      if (side === 'front') setFrontImage(uri);
      else setBackImage(uri);
    });
  };

  const uploadToFirebase = async (uri, filename) => {
    const reference = storage().ref(`licenses/${filename}_${Date.now()}.jpg`);
    await reference.putFile(uri);
    const downloadURL = await reference.getDownloadURL();
    return downloadURL;
  };

  const validateLicense = (number) => {
    const regex = /^[A-Z0-9]+$/;
    return regex.test(number);
  };

  const handleSubmit = async () => {
    if (!frontImage) {
      Alert.alert('Error', 'Please upload front side of your DL');
      return;
    }
    if (!backImage) {
      Alert.alert('Error', 'Please upload back side of your DL');
      return;
    }
    if (!licenseNumber.trim()) {
      Alert.alert('Error', 'Please enter your driving license number');
      return;
    }
    if (!validateLicense(licenseNumber)) {
      Alert.alert('Error', 'Special characters are not allowed');
      return;
    }

    try {
      setLoading(true);

      // Upload front image to Firebase
      setUploadingFront(true);
      const frontURL = await uploadToFirebase(frontImage, `front_${mobileNo}`);
      setUploadingFront(false);

      // Upload back image to Firebase
      setUploadingBack(true);
      const backURL = await uploadToFirebase(backImage, `back_${mobileNo}`);
      setUploadingBack(false);

      // ✅ Save to MongoDB - matching your schema fields exactly
      const response = await fetch(`${API_URL}/auth/upload-license`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobileNo: mobileNo,                  // ✅ schema field
          drivingLicenceFront: frontURL,        // ✅ schema field
          drivingLicenceBack: backURL,          // ✅ schema field
          drivingLicenceNo: licenseNumber,      // ✅ schema field
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Success', 'License uploaded successfully!');
        navigation.navigate('TakeSelfie', { mobileNo: mobileNo });
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
          <Text style={styles.title}>Driving License</Text>
        </View>

        {/* FRONT SIDE */}
        <View style={styles.uploadBox}>
          <Text style={styles.uploadTitle}>Front side of your DL</Text>

          {frontImage && (
            <Image source={{ uri: frontImage }} style={styles.previewImage} resizeMode="cover" />
          )}

          <TouchableOpacity style={styles.uploadBtn} onPress={() => pickImage('front')}>
            {uploadingFront ? (
              <ActivityIndicator color="#4A4A4A" />
            ) : (
              <>
                <Image source={require('../assets/upload.png')} style={{ height: 24, width: 24 }} />
                <Text style={styles.uploadText}>
                  {frontImage ? 'Change Photo' : 'Upload Photo'}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* BACK SIDE */}
        <View style={styles.uploadBox}>
          <Text style={styles.uploadTitle}>Back side of your DL</Text>
          <Text style={styles.uploadSubtitle}>
            Upload the back side even if it is blank.
          </Text>

          {backImage && (
            <Image source={{ uri: backImage }} style={styles.previewImage} resizeMode="cover" />
          )}

          <TouchableOpacity style={styles.uploadBtn} onPress={() => pickImage('back')}>
            {uploadingBack ? (
              <ActivityIndicator color="#4A4A4A" />
            ) : (
              <>
                <Image source={require('../assets/upload.png')} style={{ height: 24, width: 24 }} />
                <Text style={styles.uploadText}>
                  {backImage ? 'Change Photo' : 'Upload Photo'}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* INPUT */}
        <Text style={styles.label}>Enter Driving License number</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          value={licenseNumber}
          onChangeText={(text) => {
            const cleaned = text.toUpperCase().replace(/[^A-Z0-9]/g, '');
            setLicenseNumber(cleaned);
          }}
          maxLength={20}
          autoCapitalize="characters"
        />

        <Text style={styles.helper}>Eg: TN1234567890098765</Text>
        <Text style={styles.helper}>Special characters are not allowed</Text>

        <Image
          source={require('../assets/license.png')}
          style={styles.sampleImage}
          resizeMode="contain"
        />

      </ScrollView>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" size="large" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default DriverLicenseScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F6F6' },
  header: { paddingHorizontal: 20, marginTop: 10, alignItems: 'center' },
  backIcon: { width: 40, height: 40, resizeMode: 'contain' },
  backBtn: {
    position: 'absolute', left: 20, top: 0,
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: '600', color: '#3A3A3A' },
  uploadBox: {
    marginTop: 30, marginHorizontal: 20,
    borderWidth: 1.5, borderColor: '#BDBDBD',
    borderStyle: 'dashed', borderRadius: 16,
    paddingVertical: 30, alignItems: 'center',
  },
  uploadTitle: { fontSize: 16, fontWeight: '500', color: '#6E6E6E', marginBottom: 20 },
  uploadSubtitle: {
    fontSize: 14, color: '#8A8A8A', marginBottom: 20,
    textAlign: 'center', paddingHorizontal: 20,
  },
  previewImage: { width: 280, height: 160, borderRadius: 12, marginBottom: 15 },
  uploadBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#E5E5E5',
    paddingVertical: 14, paddingHorizontal: 30, borderRadius: 30,
  },
  uploadText: { marginLeft: 10, fontSize: 16, fontWeight: '500', color: '#4A4A4A' },
  label: { marginTop: 30, marginHorizontal: 20, fontSize: 18, fontWeight: '600', color: '#3A3A3A' },
  input: {
    marginTop: 15, marginHorizontal: 20, height: 55,
    borderRadius: 30, borderWidth: 1.2, borderColor: '#BDBDBD',
    paddingHorizontal: 20, fontSize: 16, backgroundColor: '#F6F6F6',
  },
  helper: { marginTop: 8, marginHorizontal: 20, fontSize: 14, color: '#7A7A7A' },
  sampleImage: { marginTop: 20, marginHorizontal: 20, height: 226, width: 358, borderRadius: 12 },
  button: {
    backgroundColor: '#117A7A', margin: 20,
    paddingVertical: 16, borderRadius: 30,
    alignItems: 'center', elevation: 3,
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
});