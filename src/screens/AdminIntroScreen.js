import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminIntroScreen = ({ navigation }) => {

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      setTimeout(() => {
        if (token) {
          console.log('User already logged in:', token);

          // User is logged in
          navigation.navigate('DutyDashboard'); // or Home screen
        } else {
          console.log('No token found');

          // User is not logged in
          navigation.navigate('LanguageSelection'); // Login screen
        }
      }, 2500);

    } catch (error) {
      console.log('Error reading token:', error);

      navigation.replace('ContactDetails');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#147A78" />

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 206, height: 134 }}
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
    width:206,
    height:134,
    alignItems: 'center',
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