import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const citiesData = [
  'Chennai',
  'Tiruvalluru',
  'Kanchipuram',
  'Arakkonam',
  'Tindivanam',
  'Puducherry',
  'Tirupati',
  'Vellore',
  'Chittoor',
  'Villupuram',
  'Cuddalore',
  'Ambur',
  'Nellore',
];

const SearchCityScreen = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [search, setSearch] = useState('');

  const filteredCities = citiesData.filter(city =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* BACK BUTTON */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Image
            source={require('../assets/back.png')}
            style={styles.backIcon}
          />
      </TouchableOpacity>

      {/* SEARCH BAR */}
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#6B6B6B" />
        <TextInput
          placeholder="Search City"
          placeholderTextColor="#8A8A8A"
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* TITLE */}
      <Text style={styles.heading}>Nearest serviceable cities:</Text>

      {/* CITY LIST */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredCities.map((city, index) => {
          const isSelected = city === selectedCity;
          return (
            <TouchableOpacity
              key={index}
              style={styles.cityRow}
              onPress={() => setSelectedCity(city)}
            >
              <Image
                  source={require('../assets/location.png')}
                  style={styles.loc}
                  resizeMode='contain'/>

              <Text
                style={[
                  styles.cityText,
                  isSelected && styles.selectedCityText,
                ]}
              >
                {city}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* CTA BUTTON */}
      <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate('selectAdminvehicle')}>
        <Text style={styles.buttonText}>Confirm City</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default SearchCityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 20,
  },
  
  loc:{
  width:24,
  height:24,
},

  backIcon: {
  width: 40,
  height: 40,
  resizeMode: 'contain',
},

  /* BACK BUTTON */
  backBtn: {
    marginTop: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* SEARCH BAR */
  searchBar: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 52,
    backgroundColor: '#FFFFFF',
  },

  input: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2E2E2E',
    flex: 1,
  },

  /* HEADING */
  heading: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: '600',
    color: '#3A3A3A',
  },

  /* CITY LIST */
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },

  cityText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#3A3A3A',
    fontWeight: '500',
  },

  selectedCityText: {
    color: '#117A7A',
    fontWeight: '600',
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

    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    // Android
    elevation: 3,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});