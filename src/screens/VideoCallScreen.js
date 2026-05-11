import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

const VideoCallScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      {/* BACKGROUND IMAGE */}
      <Image
        source={require('../assets/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* HEADER — top bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.name}>John Franx</Text>
          <Text style={styles.timer}>00:50</Text>
        </View>
      </View>

      {/* SELF VIDEO PREVIEW */}
      <View style={styles.previewContainer}>
        <Image
          source={require('../assets/self.png')}
          style={styles.previewImage}
        />
        <View style={styles.cameraIcon}>
          <Image
            source={require('../assets/camera.png')}
            style={{ width: 18, height: 18, resizeMode: 'contain' }}
          />
        </View>
      </View>

      {/* BOTTOM CONTROLS */}
      <View style={styles.bottomContainer}>
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.controlBtn}>
            <Image source={require('../assets/mic.png')} style={styles.icn} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn}>
            <Image source={require('../assets/speaker.png')} style={styles.icn} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn}>
            <Image source={require('../assets/novideo.png')} style={styles.icn} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.endCallBtn}>
            <Image source={require('../assets/hangup.png')} style={styles.icn} />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

export default VideoCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  /* BACKGROUND */
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },

  /* HEADER */
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight + 10 || 54,
    paddingBottom: 14,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  headerText: {
    flex: 1,
    alignItems: 'center',
    marginRight: 36, // offset to visually center against back button
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  timer: {
    fontSize: 13,
    color: '#ccc',
    marginTop: 2,
  },

  /* SELF PREVIEW */
  previewContainer: {
    position: 'absolute',
    right: 16,
    bottom: 110,
    width: 80,
    height: 110,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cameraIcon: {
    position: 'absolute',
    top: 6,
    left: 6,
  },

  /* BOTTOM CONTROLS */
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  controlBtn: {
    width: 60,
    height: 60,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icn: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});