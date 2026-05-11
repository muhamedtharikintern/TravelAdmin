import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

const ConfirmSelfieScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Image
            source={require('../assets/back.png')} 
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Selfie</Text>
      </View>

      {/* SELFIE PREVIEW */}
      <View style={styles.previewContainer}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
          }}
          style={styles.image}
        />

        {/* FACE FRAME OVERLAY */}
        <View style={styles.faceFrame}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.retakeBtn}
        onPress={() => navigation.navigate('TakeSelfie')}>
          <Text style={styles.retakeText}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadBtn}
        onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default ConfirmSelfieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 20,
  },

  /* HEADER */
  header: {
    alignItems: 'center',
    marginTop: 10,
  },

  backIcon: {
  width: 40,
  height: 40,
  resizeMode: 'contain',
},

  backBtn: {
    position: 'absolute',
    left: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3A3A3A',
  },

  /* PREVIEW */
  previewContainer: {
    marginTop: 30,
    height: 598,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#DDD',
  },

  image: {
    width: 392,
    height: 598,
  },

  /* FACE FRAME */
  faceFrame: {
    position: 'absolute',
    top: '20%',
    left: '15%',
    width: '70%',
    height: '60%',
  },

  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#FFFFFF',
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },

  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },

  /* ACTIONS */
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },

  retakeBtn: {
    width: '48%',
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#117A7A',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  retakeText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2E2E2E',
  },

  uploadBtn: {
    width: '48%',
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: '#117A7A',
    alignItems: 'center',
  },

  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});