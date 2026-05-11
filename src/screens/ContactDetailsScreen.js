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

const ContactDetailsScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');

const sendOTP = async () => {

  try {

    // SEND OTP USING FIREBASE
    const confirmation =
    await auth().signInWithPhoneNumber(
      `+91${phone}`
    );

    // NAVIGATE TO OTP SCREEN
    navigation.navigate(
      'EnterOTP',
      {
        confirmation,
        mobileNo: phone,
      }
    );

  } catch (error) {

    console.log(error);

    Alert.alert(
      'Error',
      error.message
    );

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
            source={require('../assets/phone.png')} // replace with your image
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
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={phone}
          onChangeText={setPhone}
          placeholder=""
          placeholderTextColor="#999"
        />
      </View>

      {/* CHANGE NUMBER BUTTON */}
      <TouchableOpacity style={styles.secondaryBtn}
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

  /* BACK */
  backBtn: {
    marginTop: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* IMAGE */
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

    /* SHADOW */
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

  /* TITLE */
  title: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },

  /* INPUT */
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

  countryCode: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },

  /* SECONDARY BUTTON */
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

  /* PRIMARY BUTTON */
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