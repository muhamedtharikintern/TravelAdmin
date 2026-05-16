import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

const API_URL = "https://traveladmin.duckdns.org";

const RideOrPorterScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('RIDE');
  const [loading, setLoading] = useState(false);

  const mobileNo = route?.params?.mobileNo; 
  const token = route?.params?.token;

  const handleConfirm = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/update-service`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ serviceType: selected }),
      });

      const result = await response.json();
      console.log('Service update:', result);

      if (result.success) {
        navigation.navigate('DriverLicense', {
          mobileNo, 
          token,    
        });
      } else {
        Alert.alert('Error', result.message || 'Failed to update service');
      }

    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
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

      {/* TITLE */}
      <Text style={styles.title}>Choose Service’s</Text>

      {/* OPTIONS */}
      <View style={styles.optionsContainer}>

        {/* RIDE */}
        <TouchableOpacity
          style={styles.optionCard}
          activeOpacity={0.8}
          onPress={() => setSelected('RIDE')}
        >
          <Text style={styles.optionText}>RIDE</Text>

          <View style={[styles.radioOuter, selected === 'RIDE' && styles.radioActive]}>
            {selected === 'RIDE' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        {/* PORTER */}
        <TouchableOpacity
          style={styles.optionCard}
          activeOpacity={0.8}
          onPress={() => setSelected('PORTER')}
        >
          <Text style={styles.optionText}>PORTER</Text>

          <View style={[styles.radioOuter, selected === 'PORTER' && styles.radioActive]}>
            {selected === 'PORTER' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

      </View>

      {/* CTA BUTTON */}
      <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate('DriverLicense')}>
        <Text style={styles.buttonText}>Confirm Service’s</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default RideOrPorterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* TITLE */
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#3A3A3A',
    marginTop: -30,
  },

  /* OPTIONS */
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
  },

  optionCard: {
    width: '48%',
    height: 90,
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: '#BDBDBD',
    backgroundColor: '#F6F6F6',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
  },

  optionText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E2E2E',
  },

  /* RADIO */
  radioOuter: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioActive: {
    borderColor: '#117A7A',
  },

  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#117A7A',
  },

  /* BUTTON */
  button: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#117A7A',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});