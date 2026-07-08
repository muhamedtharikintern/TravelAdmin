import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactDetailsScreen = ({ navigation }) => {
  const API_URL = "https://traveladmin.duckdns.org";
  const [phone, setPhone] = useState('');

  const sendOTP = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      const mobileNo = `+91${phone}`;

      // Step 1: Check if user exists in backend
      const loginRes = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNo }),
      });

      const loginRaw = await loginRes.text();
      console.log('LOGIN RAW RESPONSE:', loginRaw);

      let loginData;
      try {
        loginData = JSON.parse(loginRaw);
      } catch (e) {
        Alert.alert('Server Error', `Login endpoint unreachable.\nStatus: ${loginRes.status}`);
        return;
      }

      console.log('LOGIN DATA:', loginData);
      console.log('isRegistered:', loginData.isRegistered);

      // ✅ Check multiple possible field names in case backend uses a different key
      const receivedToken =
        loginData.token ??
        loginData.authToken ??
        loginData.accessToken ??
        loginData?.data?.token ??
        null;

      console.log('🔍 Resolved token from login response:', receivedToken);

      if (loginData.success && receivedToken) {
        await AsyncStorage.setItem('token', receivedToken);
        console.log('LOGIN TOKEN SAVED:', receivedToken);
      } else {
        console.log('⚠️ No token in login response — backend may not issue one for unregistered numbers yet.');
      }

      // Step 2: Send OTP via Firebase (for both new and existing users)
      const confirmation = await auth().signInWithPhoneNumber(mobileNo);
      console.log('OTP sent to:', mobileNo);

      // Step 3: Navigate to OTP screen
      navigation.navigate('EnterOTP', {
        confirm: confirmation,
        mobileNo,
        token: receivedToken,
      });

    } catch (error) {
      console.log('CATCH ERROR:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* BACK BUTTON */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/back.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* IMAGE */}
      <View style={styles.imageWrapper}>
        <View style={styles.imageCircle}>
          <Image
            source={require('../assets/phone.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* TITLE */}
      <Text style={styles.title}>
        Enter your Phone Number to Drive
      </Text>

      {/* PHONE INPUT */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter 10-digit number"
          placeholderTextColor="#999"
          maxLength={10}
        />
      </View>

      {/* CHANGE NUMBER BUTTON */}
      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigation.navigate('RegisterNewContact')}
      >
        <Text style={styles.secondaryText}>Changed registered number</Text>
      </TouchableOpacity>

      {/* PROCEED BUTTON */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={sendOTP}
      >
        <Text style={styles.primaryText}>Proceed</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default ContactDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  backBtn: {
    marginTop: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    marginTop: 40,
    alignItems: 'center',
  },
  imageCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E9EEF2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: 70,
    height: 70,
  },
  title: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  inputContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 40,
    paddingHorizontal: 20,
    height: 60,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  secondaryBtn: {
    marginTop: 300,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  primaryBtn: {
    marginTop: 20,
    backgroundColor: '#147A78',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});