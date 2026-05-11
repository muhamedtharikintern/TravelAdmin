import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';


const RegisterNewContactScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.container}>

      {/* BACK BUTTON */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
         <Image
            source={require('../assets/back.png')} 
            style={styles.backIcon}
          />
      </TouchableOpacity>

      {/* TITLE */}
      <Text style={styles.title}>Enter your New Phone Number</Text>

      {/* INPUT */}
      <View style={styles.inputContainer}>
        <Text style={styles.code}>+91</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      {/* INFO TEXT */}
      <Text style={styles.infoText}>
        By proceeding, you agree to get offers and other communication via calls and SMS.
      </Text>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EnterOTP')} // update route
        >
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default RegisterNewContactScreen;

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
    marginTop: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* TITLE */
  title: {
    marginTop: 60,
    textAlign: 'center',
    fontSize: 22,
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

  code: {
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

  /* INFO TEXT */
  infoText: {
    marginTop: 20,
    fontSize: 15,
    color: '#777',
    lineHeight: 22,
  },

  /* BOTTOM BUTTON */
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },

  button: {
    backgroundColor: '#147A78',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});