import React, { useState } from 'react';
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

const AadharProfile = ({ navigation }) => {
  const [selected, setSelected] = useState('aadhar');

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

          <Text style={styles.headerTitle}>Aadhaar</Text>
        </View>

        {/* TITLE */}
        <Text style={styles.sectionTitle}>Select ID to upload</Text>

        {/* ID SELECTION */}
        <View style={styles.selectionRow}>
          <TouchableOpacity
            style={styles.optionBox}
            onPress={() => setSelected('aadhar')}
          >
            <Text style={styles.optionText}>Aadhaar</Text>

            <View style={[
              styles.radioOuter,
              selected === 'aadhar' && styles.radioActive
            ]}>
              {selected === 'aadhar' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionBox}
            onPress={() => setSelected('pan')}
          >
            <Text style={styles.optionText}>PAN Card</Text>

            <View style={[
              styles.radioOuter,
              selected === 'pan' && styles.radioActive
            ]}>
              {selected === 'pan' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* UPLOAD BOX */}
        <View style={styles.uploadContainer}>
          <TouchableOpacity style={styles.uploadBtn}>
            <Feather name="image" size={22} color="#444" />
            <Text style={styles.uploadText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>

        {/* INPUT */}
        <Text style={styles.inputLabel}>Enter Aadhaar Number</Text>

        <TextInput
          style={styles.input}
          placeholder=""
          placeholderTextColor="#999"
        />

        {/* SAMPLE IMAGE */}
        <Image
          source={require('../assets/aadhar.png')}
          style={styles.sampleImage}
        />

        {/* NOTE */}
        <Text style={styles.note}>
          Check Aadhaar number before you submit
        </Text>

      </ScrollView>

      {/* SUBMIT BUTTON */}
      <TouchableOpacity style={styles.submitBtn}
      onPress={() => navigation.navigate('PermitUpload')}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default AadharProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
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
    left: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },

  /* SECTION TITLE */
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 30,
    marginHorizontal: 20,
  },

  /* OPTIONS */
  selectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },

  optionBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#CFCFCF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginRight: 10,
  },

  optionText: {
    fontSize: 18,
    color: '#8A8A8A',
    fontWeight: '500',
  },

  /* RADIO */
  radioOuter: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#CFCFCF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioActive: {
    borderColor: '#0F7A7A',
  },

  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0F7A7A',
  },

  /* UPLOAD */
  uploadContainer: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#999',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 25,
    paddingVertical: 40,
    alignItems: 'center',
  },

  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6EAEA',
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 30,
  },

  uploadText: {
    fontSize: 16,
    color: '#444',
    marginLeft: 10,
    fontWeight: '500',
  },

  /* INPUT */
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 25,
    marginHorizontal: 20,
  },

  input: {
    borderWidth: 1.5,
    borderColor: '#CFCFCF',
    borderRadius: 30,
    height: 55,
    marginHorizontal: 20,
    marginTop: 12,
    paddingHorizontal: 20,
    backgroundColor: '#F4F4F4',
  },

  /* SAMPLE */
  sampleImage: {
    width: 358,
    height: 233,
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 12,
  },

  /* NOTE */
  note: {
    fontSize: 14,
    color: '#777',
    marginTop: 20,
    textAlign: 'center',
  },

  /* SUBMIT */
  submitBtn: {
    backgroundColor: '#0F7A7A',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
  },

  submitText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
  },
});