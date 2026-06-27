import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

const TakeSelfieScreen = ({ navigation, route }) => {
  const mobileNo = route?.params?.mobileNo;

  const camera = useRef(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const frontCamera = useCameraDevice('front');
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission]);

  const takeSelfie = async () => {
    if (!camera.current || !isCameraReady) {
      Alert.alert('Camera not ready', 'Please wait for camera to initialize.');
      return;
    }
    try {
      const photo = await camera.current.takePhoto({ flash: 'off' });

      // ✅ Pass local path to ConfirmSelfie — no token needed here
      navigation.navigate('ConfirmSelfie', {
        mobileNo,
        selfieUri: photo.path,
      });
    } catch (err) {
      console.log('Selfie error:', JSON.stringify(err));
      Alert.alert('Error', err?.message || 'Failed to capture selfie. Please try again.');
    }
  };

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.permissionText}>Camera permission is required.</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!frontCamera) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.permissionText}>Front camera not available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Selfie</Text>
      </View>

      {/* CAMERA PREVIEW */}
      <View style={styles.previewContainer}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={frontCamera}
          isActive={true}
          photo={true}
          onInitialized={() => setIsCameraReady(true)}
          onError={(err) => console.log('Camera error:', err)}
        />

        {/* FACE FRAME OVERLAY */}
        <View style={styles.faceFrame}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
      </View>

      {/* SHUTTER BUTTON */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.shutterOuter, !isCameraReady && { opacity: 0.4 }]}
          onPress={takeSelfie}
          disabled={!isCameraReady}
        >
          <View style={styles.shutterInner} />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default TakeSelfieScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F6F6' },
  header: {
    alignItems: 'center', marginTop: 10,
    paddingHorizontal: 20, height: 44, justifyContent: 'center',
  },
  backIcon: { width: 40, height: 40, resizeMode: 'contain' },
  backBtn: {
    position: 'absolute', left: 20, top: 0,
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#EAEAEA', justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: '600', color: '#3A3A3A' },
  previewContainer: {
    marginTop: 30, marginHorizontal: 20, height: 380,
    borderRadius: 16, overflow: 'hidden', backgroundColor: '#000',
  },
  faceFrame: {
    position: 'absolute', top: '20%', left: '15%', width: '70%', height: '55%',
  },
  corner: { position: 'absolute', width: 28, height: 28, borderColor: '#FFFFFF' },
  topLeft:     { top: 0,    left: 0,  borderTopWidth: 3,    borderLeftWidth: 3  },
  topRight:    { top: 0,    right: 0, borderTopWidth: 3,    borderRightWidth: 3 },
  bottomLeft:  { bottom: 0, left: 0,  borderBottomWidth: 3, borderLeftWidth: 3  },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3 },
  bottomContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 20,
  },
  shutterOuter: {
    width: 90, height: 90, borderRadius: 45,
    borderWidth: 4, borderColor: '#CFCFCF',
    justifyContent: 'center', alignItems: 'center',
  },
  shutterInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#CFCFCF' },
  permissionText: { textAlign: 'center', marginTop: 40, color: '#3A3A3A', fontSize: 16 },
  button: {
    backgroundColor: '#117A7A', margin: 20,
    paddingVertical: 16, borderRadius: 30, alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
});