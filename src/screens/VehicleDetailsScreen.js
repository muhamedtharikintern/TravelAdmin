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

const VehicleDetailsScreen = ({ navigation }) => {
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

          <Text style={styles.title}>Vehicle Number</Text>
        </View>

        {/* FRONT RC UPLOAD */}
        <View style={styles.uploadBox}>
          <Text style={styles.uploadTitle}>Front side of your RC</Text>

          <TouchableOpacity style={styles.uploadBtn}>
            <Feather name="image" size={20} color="#5F5F5F" />
            <Text style={styles.uploadText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>

        {/* BACK RC UPLOAD */}
        <View style={styles.uploadBox}>
          <Text style={styles.uploadTitle}>Back side of your RC</Text>

          <TouchableOpacity style={styles.uploadBtn}>
            <Feather name="image" size={20} color="#5F5F5F" />
            <Text style={styles.uploadText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>

        {/* INPUT */}
        <Text style={styles.label}>Enter Vehicle number</Text>

        <View style={styles.inputBox}>
          <TextInput
            placeholder=""
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>

        <Text style={styles.helper}>Eg: TN14 A 0007</Text>

        {/* SAMPLE IMAGE */}
        <Image
          source={require('../assets/vehicleno.png')}
          style={styles.sampleImage}
          resizeMode="contain"
        />

        {/* SUBMIT */}
        <TouchableOpacity style={styles.submitBtn}
        onPress={() => navigation.navigate('AadharProfile')}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default VehicleDetailsScreen;

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
    marginBottom: 20,
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

  /* UPLOAD BOX */
  uploadBox: {
    borderWidth: 1.5,
    borderColor: '#8C8C8C',
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 20,
  },

  uploadTitle: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 18,
    fontWeight: '500',
  },

  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6EAEA',
    paddingHorizontal: 25,
    height: 50,
    borderRadius: 25,
  },

  uploadText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#4A4A4A',
    fontWeight: '500',
  },

  /* INPUT */
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3A3A3A',
    marginTop: 10,
    marginBottom: 10,
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

  helper: {
    fontSize: 14,
    color: '#8A8A8A',
    marginTop: 10,
    marginBottom: 20,
  },

  /* IMAGE */
  sampleImage: {
    width: 358,
    height: 212,
    borderRadius: 8,
    marginBottom: 30,
  },

  /* BUTTON */
  submitBtn: {
    height: 60,
    borderRadius: 30,
    backgroundColor: '#117A7A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },

  submitText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});