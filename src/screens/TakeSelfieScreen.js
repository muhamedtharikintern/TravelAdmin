import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const TakeSelfieScreen = ({ navigation }) => {
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

      {/* CAMERA PREVIEW (STATIC MOCK) */}
      <View style={styles.previewContainer}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
          }}
          style={styles.previewImage}
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
        <TouchableOpacity style={styles.shutterOuter}
        onPress={() => navigation.navigate('ConfirmSelfie')}>
          <View style={styles.shutterInner} />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default TakeSelfieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },

  /* HEADER */
  header: {
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },

  backIcon: {
  width: 40,
  height: 40,
  resizeMode: 'contain',
},

  backBtn: {
    position: 'absolute',
    left: 20,
    top: 0,
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
    marginHorizontal: 20,
    height: 260,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#DDD',
  },

  previewImage: {
    width: 392,
    height: 344,
  },

  /* FACE FRAME */
  faceFrame: {
    position: 'absolute',
    top: '25%',
    left: '20%',
    width: '60%',
    height: '50%',
  },

  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
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

  /* SHUTTER */
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 60,
  },

  shutterOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: '#CFCFCF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  shutterInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#CFCFCF',
  },
});