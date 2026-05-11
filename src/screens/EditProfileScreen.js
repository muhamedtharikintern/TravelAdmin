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
import Feather from 'react-native-vector-icons/Feather';

const EditProfileScreen = ({ navigation }) => {
  const [gender, setGender] = useState('male');

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

        <Text style={styles.title}>Photo and Name</Text>
      </View>

      {/* PROFILE IMAGE */}
      <View style={styles.imageSection}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
          }}
          style={styles.profileImage}
        />

        {/* FACE FRAME */}
        <View style={styles.faceFrame}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>

        <TouchableOpacity>
          <Text style={styles.editPhotoText}>Edit Profile Photo</Text>
        </TouchableOpacity>
      </View>

      {/* FORM */}
      <View style={styles.form}>

        {/* FULL NAME */}
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="John Wick"
            placeholderTextColor="#7A7A7A"
            style={styles.input}
          />
        </View>

        {/* DOB */}
        <Text style={styles.label}>Date of Birth</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="01-01-1958"
            placeholderTextColor="#7A7A7A"
            style={styles.input}
          />
        </View>

        {/* GENDER */}
        <Text style={styles.label}>Gender</Text>

        <View style={styles.genderRow}>
          {/* MALE */}
          <TouchableOpacity
            style={styles.genderBtn}
            onPress={() => setGender('male')}
          >
            <Text style={styles.genderText}>Male</Text>

            <View style={[
              styles.radioOuter,
              gender === 'male' && styles.radioActive
            ]}>
              {gender === 'male' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          {/* FEMALE */}
          <TouchableOpacity
            style={styles.genderBtn}
            onPress={() => setGender('female')}
          >
            <Text style={styles.genderText}>FeMale</Text>

            <View style={[
              styles.radioOuter,
              gender === 'female' && styles.radioActive
            ]}>
              {gender === 'female' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* SUBMIT BUTTON */}
      <TouchableOpacity style={styles.submitBtn}
      onPress={() => navigation.navigate('VehicleDetails')}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default EditProfileScreen;

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

  /* IMAGE SECTION */
  imageSection: {
    alignItems: 'center',
    marginTop: 30,
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  faceFrame: {
    position: 'absolute',
    top: 20,
    width: 90,
    height: 90,
  },

  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#FFFFFF',
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },

  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },

  editPhotoText: {
    marginTop: 12,
    fontSize: 16,
    color: '#2F80ED',
    fontWeight: '500',
  },

  /* FORM */
  form: {
    marginTop: 30,
  },

  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3A3A3A',
    marginBottom: 10,
    marginTop: 15,
  },

  inputBox: {
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#CFCFCF',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },

  input: {
    fontSize: 18,
    color: '#2E2E2E',
  },

  /* GENDER */
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  genderBtn: {
    width: '48%',
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#CFCFCF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },

  genderText: {
    fontSize: 16,
    color: '#6B6B6B',
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CFCFCF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioActive: {
    borderColor: '#117A7A',
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#117A7A',
  },

  /* BUTTON */
  submitBtn: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#117A7A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});