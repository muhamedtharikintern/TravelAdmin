import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import storage from '@react-native-firebase/storage';

const ConfirmSelfieScreen = ({ navigation, route }) => {
  const API_URL = 'https://traveladmin.duckdns.org';
  const mobileNo = route?.params?.mobileNo;
  const token = route?.params?.token;
  const selfieUri = route?.params?.selfieUri; // local path from TakeSelfie

  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!selfieUri) {
      Alert.alert('Error', 'No image found. Please retake.');
      return;
    }
    try {
      setUploading(true);

      // ✅ Upload to Firebase
      const reference = storage().ref(`selfies/selfie_${mobileNo}_${Date.now()}.jpg`);
      await reference.putFile(selfieUri);
      const selfieURL = await reference.getDownloadURL();

      // ✅ Save URL to MongoDB
      const response = await fetch(`${API_URL}/auth/upload-selfie`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mobileNo,
          selfieUrl: selfieURL,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Success', 'Selfie uploaded successfully!');
        navigation.navigate('EditProfile', { mobileNo, token });
      } else {
        Alert.alert('Error', result.message || 'Something went wrong');
      }
    } catch (err) {
      console.log('Upload error:', err);
      Alert.alert('Error', 'Failed to upload. Please try again.');
    } finally {
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
        <Text style={styles.title}>Selfie</Text>
      </View>

      {/* SELFIE PREVIEW — captured image */}
      <View style={styles.previewContainer}>
        <Image
          source={{ uri: selfieUri ? `file://${selfieUri}` : null }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* FACE FRAME OVERLAY */}
        <View style={styles.faceFrame}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>

        {/* UPLOADING OVERLAY */}
        {uploading && (
          <View style={styles.uploadingOverlay}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.uploadingText}>Uploading...</Text>
          </View>
        )}
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.retakeBtn, uploading && { opacity: 0.5 }]}
          onPress={() => navigation.navigate('TakeSelfie', { mobileNo, token })}
          disabled={uploading}
        >
          <Text style={styles.retakeText}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.uploadBtn, uploading && { opacity: 0.6 }]}
          onPress={handleUpload}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.uploadText}>Upload</Text>
          )}
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default ConfirmSelfieScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F6F6', paddingHorizontal: 20 },

  /* HEADER */
  header: { alignItems: 'center', marginTop: 10 },
  backIcon: { width: 40, height: 40, resizeMode: 'contain' },
  backBtn: {
    position: 'absolute', left: 0,
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#EAEAEA', justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: '600', color: '#3A3A3A' },

  /* PREVIEW */
  previewContainer: {
    marginTop: 30, height: 598,
    borderRadius: 6, overflow: 'hidden', backgroundColor: '#DDD',
  },
  image: { width: '100%', height: 598 },

  /* FACE FRAME */
  faceFrame: {
    position: 'absolute', top: '20%', left: '15%', width: '70%', height: '60%',
  },
  corner: { position: 'absolute', width: 30, height: 30, borderColor: '#FFFFFF' },
  topLeft:     { top: 0,    left: 0,  borderTopWidth: 3,    borderLeftWidth: 3  },
  topRight:    { top: 0,    right: 0, borderTopWidth: 3,    borderRightWidth: 3 },
  bottomLeft:  { bottom: 0, left: 0,  borderBottomWidth: 3, borderLeftWidth: 3  },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3 },

  /* UPLOAD OVERLAY */
  uploadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center', alignItems: 'center',
  },
  uploadingText: { color: '#FFF', marginTop: 10, fontSize: 15, fontWeight: '500' },

  /* ACTIONS */
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 },
  retakeBtn: {
    width: '48%', paddingVertical: 16, borderRadius: 30,
    borderWidth: 2, borderColor: '#117A7A',
    alignItems: 'center', backgroundColor: 'transparent',
  },
  retakeText: { fontSize: 18, fontWeight: '500', color: '#2E2E2E' },
  uploadBtn: {
    width: '48%', paddingVertical: 16,
    borderRadius: 30, backgroundColor: '#117A7A', alignItems: 'center',
  },
  uploadText: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
});