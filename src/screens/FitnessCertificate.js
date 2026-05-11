import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';


const FitnessCertificate = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
            <Image
            source={require('../assets/back.png')} 
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Fitness Certificate</Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.label}>Upload Fitness</Text>

        {/* DASHED UPLOAD BOX */}
        <View style={styles.uploadBox}>
          <TouchableOpacity style={styles.uploadBtn}>
            <Feather name="image" size={20} color="#555" />
            <Text style={styles.uploadText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SUBMIT BUTTON */}
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.submitBtn}
        onPress={() => navigation.navigate('DutyDashboard')}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default FitnessCertificate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    justifyContent: 'space-between',
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

  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },

  /* CONTENT */
  content: {
    paddingHorizontal: 20,
    marginTop: 40,
  },

  label: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },

  /* DASHED BOX */
  uploadBox: {
    height: 220,
    borderWidth: 1.5,
    borderColor: '#555',
    borderStyle: 'dashed',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* INNER BUTTON */
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1D5D6',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
  },

  uploadText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },

  /* BOTTOM */
  bottom: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  submitBtn: {
    backgroundColor: '#0F7A7A',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
  },

  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});