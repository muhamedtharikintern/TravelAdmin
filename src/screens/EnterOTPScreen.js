import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';


const EnterOTPScreen = ({ navigation, route }) => {
  const API_URL ="https://traveladmin.duckdns.org";
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputs = useRef([]);
  const confirm = route?.params?.confirm;
  const mobileNo = route?.params?.mobileNo; // ✅ get mobileNo from previous screen

  const verifyOTP = async (otpCode) => {
    if (!confirm) {
      setError('Session expired. Please go back and try again.');
      return;
    }
    try {
      setLoading(true);
      setError('');

      // ✅ Step 1: Verify OTP with Firebase
      await confirm.confirm(otpCode);
      console.log('OTP verified successfully');

      // ✅ Step 2: Check if user exists in MongoDB
      await registerOrLoginUser();

    } catch (err) {
      console.log('OTP Error:', err);
      setError('Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputs.current[0].focus();
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register or Login user in MongoDB
  const registerOrLoginUser = async () => {
    try {
      // First try to login
      const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNo: mobileNo }),
      });

      const loginResult = await loginResponse.json();
      console.log('Login result:', loginResult);

      if (loginResult.success) {
        // ✅ Existing user - go to home
        console.log('Existing user logged in');
        navigation.navigate('Whichcity', {
          mobileNo: mobileNo,
          token: loginResult.token,
          user: loginResult.user,
        });

      } else {
        // ✅ New user - register them
        const registerResponse = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mobileNo: mobileNo,
            name: 'Captain',        // ← update this if you collect name earlier
            vehicleType: 'unknown', // ← update later in profile screen
            serviceType: 'unknown', // ← update later in profile screen
          }),
        });

        const registerResult = await registerResponse.json();
        console.log('Register result:', registerResult);

        if (registerResult.success) {
          console.log('New user registered');
          navigation.navigate('Whichcity', {
            mobileNo: mobileNo,
            token: registerResult.token,
            user: registerResult.user,
          });
        } else {
          Alert.alert('Error', registerResult.message || 'Registration failed');
        }
      }

    } catch (error) {
      console.log('API Error:', error);
      Alert.alert('Error', 'Failed to connect to server. Please try again.');
    }
  };

  const handleChange = (text, index) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }

    if (index === 5 && text) {
      const otpCode = newOtp.join('');
      verifyOTP(otpCode);
    }
  };

  const handleBackspace = (key, index) => {
    if (key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
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
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/phone.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* TITLE */}
      <Text style={styles.title}>Enter OTP</Text>

      {/* OTP BOXES */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={[
              styles.otpBox,
              digit ? styles.otpBoxFilled : null,
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            editable={!loading}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleBackspace(nativeEvent.key, index)
            }
          />
        ))}
      </View>

      {/* ERROR MESSAGE */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* LOADING */}
      {loading && (
        <ActivityIndicator style={styles.loader} size="large" color="#1A6B4A" />
      )}

    </SafeAreaView>
  );
};

export default EnterOTPScreen;

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
  imageContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },
  title: {
    marginTop: 40,
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  otpContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpBox: {
    width: 55,
    height: 65,
    borderWidth: 1,
    borderColor: '#9E9E9E',
    borderRadius: 14,
    textAlign: 'center',
    fontSize: 20,
    color: '#333',
    backgroundColor: '#FFF',
  },
  otpBoxFilled: {
    borderColor: '#1A6B4A',
    borderWidth: 2,
  },
  errorText: {
    color: 'red',
    marginTop: 15,
    fontSize: 13,
    textAlign: 'center',
  },
  loader: {
    marginTop: 30,
  },
});