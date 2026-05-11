import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image
} from 'react-native';

const AdminIntroScreen = ({ navigation }) => {

  // Auto navigate after 2.5s (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LocationPermission'); // change to your next screen
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#147A78" />

      {/* LOGO BLOCK */}
      <View style={styles.logoContainer}>

       <Image
       source={require('../assets/logo.png')}
       resizeMode="contain"
       />
      </View>
    </View>
  );
};

export default AdminIntroScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#147A78', // exact teal tone
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    transform: [{ translateY: 60 }], // 🔥 pushes slightly below center like design
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 64,
    fontStyle: 'italic',
    color: '#fff',
    fontWeight: '300',
    letterSpacing: 2,
  },

  car: {
    fontSize: 36,
    marginLeft: 6,
    marginTop: -20, // aligns icon to top-right of text
  },

  subTitle: {
    marginTop: 6,
    fontSize: 20,
    color: '#E6F2F2',
    fontStyle: 'italic',
    letterSpacing: 1,
  },
});