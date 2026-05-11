import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const DriverLicenseScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Image
            source={require('../assets/back.png')} 
            style={styles.backIcon}
          />
          </TouchableOpacity>

          <Text style={styles.title}>Driving License</Text>
        </View>

        {/* FRONT SIDE */}
        <View style={styles.uploadBox}>
          <Text style={styles.uploadTitle}>Front side of your DL</Text>

          <TouchableOpacity style={styles.uploadBtn}>
            <Feather name="image" size={18} color="#555" />
            <Text style={styles.uploadText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>

        {/* BACK SIDE */}
        <View style={styles.uploadBox}>
          <Text style={styles.uploadTitle}>Back side of your DL</Text>
          <Text style={styles.uploadSubtitle}>
            Upload the back side even if it is blank.
          </Text>

          <TouchableOpacity style={styles.uploadBtn}>
            <Feather name="image" size={18} color="#555" />
            <Text style={styles.uploadText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>

        {/* INPUT */}
        <Text style={styles.label}>Enter Driving License number</Text>

        <TextInput
          style={styles.input}
          placeholder=""
          placeholderTextColor="#999"
        />

        <Text style={styles.helper}>Eg: TN1234567890098765</Text>
        <Text style={styles.helper}>Special characters are not allowed</Text>

        {/* SAMPLE IMAGE */}
        <Image
          source={require('../assets/license.png')}
          style={styles.sampleImage}
          resizeMode="contain"
        />

      </ScrollView>

      {/* SUBMIT BUTTON */}
      <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate('TakeSelfie')}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default DriverLicenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },

  /* HEADER */
  header: {
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
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

  /* UPLOAD BOX */
  uploadBox: {
    marginTop: 30,
    marginHorizontal: 20,
    borderWidth: 1.5,
    borderColor: '#BDBDBD',
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 30,
    alignItems: 'center',
  },

  uploadTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6E6E6E',
    marginBottom: 20,
  },

  uploadSubtitle: {
    fontSize: 14,
    color: '#8A8A8A',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
  },

  uploadText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#4A4A4A',
  },

  /* INPUT */
  label: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#3A3A3A',
  },

  input: {
    marginTop: 15,
    marginHorizontal: 20,
    height: 55,
    borderRadius: 30,
    borderWidth: 1.2,
    borderColor: '#BDBDBD',
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#F6F6F6',
  },

  helper: {
    marginTop: 8,
    marginHorizontal: 20,
    fontSize: 14,
    color: '#7A7A7A',
  },

  /* SAMPLE IMAGE */
  sampleImage: {
    marginTop: 20,
    marginHorizontal: 20,
    height: 226,
    width:358,
    borderRadius: 12,
    justifyContent:'center'
  },

  /* BUTTON */
  button: {
    backgroundColor: '#117A7A',
    margin: 20,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});