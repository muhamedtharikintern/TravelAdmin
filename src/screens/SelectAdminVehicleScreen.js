import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert, 
  Image,
} from 'react-native';

const API_URL = "https://traveladmin.duckdns.org";


const VEHICLES = [
  { id: '1', title: 'Bike', subtitle: 'Bike Taxi & Delivery', icon: require('../assets/bike.png') },
  { id: '2', title: 'Scooty', subtitle: 'Scooty Taxi & Delivery', icon: require('../assets/scooty.png') },
  { id: '3', title: 'Auto', subtitle: 'Auto Lite, etc', icon: require('../assets/auto.png') },
  { id: '4', title: 'Cab Premium', subtitle: 'Airport Cabs, etc', icon: require('../assets/car.png') },
  { id: '5', title: 'Mini 3W', subtitle: 'Delivery, etc', icon: require('../assets/mini3w.png') },
  { id: '6', title: 'Pickup 9ft', subtitle: 'Delivery, etc', icon: require('../assets/pickup.png') },
  { id: '7', title: '3 Wheeler', subtitle: 'Delivery, etc', icon: require('../assets/3w.png') },
  { id: '8', title: 'Tata Ace(Any)', subtitle: 'Delivery, etc', icon: require('../assets/tataace.png') },
  { id: '9', title: 'Pickup 8ft', subtitle: 'Delivery, etc', icon: require('../assets/pickup2.png') },
  { id: '10', title: 'Tata 407', subtitle: 'Delivery, etc', icon: require('../assets/tata407.png') },
  { id: '11', title: '14ft', subtitle: 'Delivery, etc', icon: require('../assets/truck.png') },
  { id: '12', title: '17ft', subtitle: 'Delivery, etc', icon: require('../assets/truck2.png') },
];

const SelectadminVehicleScreen = ({ navigation, route}) => {
  const [selected, setSelected] = useState('1');
  const [loading, setLoading] = useState(false);

  const mobileNo = route?.params?.mobileNo;
  const token = route?.params?.token;

 const handleConfirm = async () => {
  const selectedVehicle = VEHICLES.find(
    v => v.id === selected
  );

  if (!selectedVehicle) {
    Alert.alert(
      'Error',
      'Please select a vehicle'
    );
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      `${API_URL}/auth/update-vehicle`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicleType:selectedVehicle.title,
        }),
      }
    );

    const result =
      await response.json();

    console.log(
      'Update vehicle response:',result
    );

    if (result.success) {
      navigation.navigate(
        'RideOrPorter',
        {
          vehicleType:selectedVehicle.title,
          mobileNo,   
          token,
        }
      );
    } else {
      Alert.alert(
        'Error',
        result.message ||
          'Failed to update vehicle'
      );
    }

  } catch (error) {
    console.log('Error:', error);

    Alert.alert(
      'Error',
      error.message
    );
  } finally {
    setLoading(false);
  }
};

  const renderItem = ({ item }) => {
    const isSelected = selected === item.id;

    return (
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.7}
        onPress={() => setSelected(item.id)}
      >
        {/* ICON */}
        <View style={styles.iconWrapper}>
          <Image source={item.icon} style={styles.icon} />
        </View>

        {/* TEXT */}
        <View style={styles.textContainer}>
          <Text style={[
            styles.title,
            isSelected && styles.selectedTitle
          ]}>
            {item.title}
          </Text>

          <Text style={styles.subtitle}>
            {item.subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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

        <Text style={styles.headerTitle}>Select Vehicle</Text>
      </View>

      {/* LIST */}
      <FlatList
        data={VEHICLES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* BUTTON */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.confirmBtn}
        onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm Vehicle</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default SelectadminVehicleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop:20,
  },

  /* HEADER */
  header: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
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

  /* ROW */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  icon: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },

  textContainer: {
    marginLeft: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },

  selectedTitle: {
    color: '#117A7A',
  },

  subtitle: {
    fontSize: 15,
    color: '#666',
    marginTop: 2,
  },

  /* BUTTON */
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },

  confirmBtn: {
    height: 56,
    backgroundColor: '#117A7A',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});