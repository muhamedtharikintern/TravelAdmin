import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

const languages = [
  { id: 'ta', label: 'தமிழ்' },
  { id: 'ml', label: 'മലയാളം' },
  { id: 'en', label: 'English' },
  { id: 'te', label: 'తెలుగు' },
  { id: 'kn', label: 'ಕನ್ನಡ' },
  { id: 'hi', label: 'हिंदी' },
  { id: 'mr', label: 'मराठी' },
  { id: 'bn', label: 'বাংলা' },
];

const LanguageSelectionScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('en');

  return (
    <SafeAreaView style={styles.container}>
      
      {/* TOP BRAND AREA */}
      <View style={styles.topContainer}>
         <Image
               source={require('../assets/logo.png')}
               resizeMode="contain"
               />
      </View>

      {/* BOTTOM CARD */}
      <View style={styles.card}>

        <Text style={styles.title}>Select App Language</Text>

        {/* GRID */}
        <View style={styles.grid}>
          {languages.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.languageCard}
              onPress={() => setSelected(item.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.languageText}>{item.label}</Text>

              {/* RADIO */}
              <View
                style={[
                  styles.radioOuter,
                  selected === item.id && styles.radioOuterActive,
                ]}
              >
                {selected === item.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DriverEntry')}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default LanguageSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#147A78', // teal background
  },

  /* TOP */
  topContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    fontSize: 42,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 2,
  },

  subText: {
    marginTop: 6,
    fontSize: 16,
    color: '#FFFFFF',
    fontStyle: 'italic',
  },

  /* CARD */
  card: {
    flex: 0.6,
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },

  /* GRID */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  languageCard: {
    width: '48%',
    height: 70,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  languageText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },

  /* RADIO */
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioOuterActive: {
    borderColor: '#147A78',
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#147A78',
  },

  /* BUTTON */
  button: {
    marginTop: 10,
    backgroundColor: '#147A78',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});