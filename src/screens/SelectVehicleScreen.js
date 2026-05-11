import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const vehicleData = [
  { name: 'Bike', desc: 'Bike Taxi & Delivery', icon: require('../assets/bike.png') },
  { name: 'Scooty', desc: 'Scooty Taxi & Delivery', icon: require('../assets/scooty.png') },
  { name: 'Auto', desc: 'Auto Lite, etc', icon: require('../assets/auto.png') },
  { name: 'Cab Premium', desc: 'Airport Cabs, etc', icon: require('../assets/car.png') },
  { name: 'Mini 3W', desc: 'Delivery, etc', icon: require('../assets/mini3w.png') },
  { name: 'Pickup 9ft', desc: 'Delivery, etc', icon: require('../assets/pickup9.png') },
  { name: '3 Wheeler', desc: 'Delivery, etc', icon: require('../assets/3w.png') },
  { name: 'Tata Ace(Any)', desc: 'Delivery, etc', icon: require('../assets/tataace.png') },
  { name: 'Pickup 8ft', desc: 'Delivery, etc', icon: require('../assets/pickup8.png') },
  { name: 'Tata 407', desc: 'Delivery, etc', icon: require('../assets/407.png') },
  { name: '14ft', desc: 'Delivery, etc', icon: require('../assets/14ft.png') },
  { name: '17ft', desc: 'Delivery, etc', icon: require('../assets/17ft.png') },
];

const SelectVehicleScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('Bike');

  return (
    <SafeAreaView style={styles.container}>

      {/* BACK */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={22} color="#2E2E2E" />
      </TouchableOpacity>

      {/* TITLE */}
      <Text style={styles.title}>Select Vehicle</Text>

      {/* LIST */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        {vehicleData.map((item, index) => {
          const isSelected = selected === item.name;

          return (
            <TouchableOpacity
              key={index}
              style={styles.row}
              onPress={() => setSelected(item.name)}
              activeOpacity={0.8}
            >
              {/* ICON CIRCLE */}
              <View style={styles.iconWrapper}>
                <Image source={item.icon} style={styles.icon} />
              </View>

              {/* TEXT */}
              <View style={styles.textContainer}>
                <Text style={[styles.name, isSelected && styles.selectedName]}>
                  {item.name}
                </Text>
                <Text style={styles.desc}>{item.desc}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* BUTTON */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm Vehicle</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default SelectVehicleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 20,
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
    marginTop: -30,
    color: '#3A3A3A',
  },

  /* LIST */
  list: {
    marginTop: 30,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  /* ICON CIRCLE */
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  icon: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },

  /* TEXT */
  textContainer: {
    marginLeft: 16,
  },

  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E2E2E',
  },

  selectedName: {
    color: '#117A7A',
  },

  desc: {
    fontSize: 14,
    color: '#7A7A7A',
    marginTop: 4,
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