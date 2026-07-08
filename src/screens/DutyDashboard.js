import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerCaptainSocket, setCaptainOffDuty } from '../socket';

const DutyDashboard = ({ navigation }) => {
  const [isOnDuty, setIsOnDuty] = useState(false);

  const toggleSwitch = async () => {
    const newState = !isOnDuty;
    setIsOnDuty(newState);
    await AsyncStorage.setItem("isOnDuty", newState ? "true" : "false"); // ✅ persist for OrderPage to read

    let captainId = await AsyncStorage.getItem("captainId");

    if (!captainId) {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Session expired", "Please log in again.");
        setIsOnDuty(false);
        await AsyncStorage.setItem("isOnDuty", "false");
        return;
      }
      try {
        const res = await fetch("https://traveladmin.duckdns.org/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!data?.user?._id) {
          Alert.alert("Session expired", "Please log in again.");
          setIsOnDuty(false);
          await AsyncStorage.setItem("isOnDuty", "false");
          return;
        }
        captainId = data.user._id;
        await AsyncStorage.setItem("captainId", captainId);
      } catch (err) {
        console.log("❌ Failed to fetch captain profile:", err);
        Alert.alert("Error", "Could not go on duty. Please try again.");
        setIsOnDuty(false);
        await AsyncStorage.setItem("isOnDuty", "false");
        return;
      }
    }

    if (newState) {
      // ✅ Register as available BEFORE navigating
      await registerCaptainSocket(captainId);
      //navigation.navigate("OnDutyDashboard");
    } else {
      // ✅ Explicitly mark off-duty so backend stops sending orders
      setCaptainOffDuty(captainId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('AdminProfile')}>
          <Image
            source={require('../assets/menu.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AdminNotification')}>
          <Image
            source={require('../assets/bell.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* TOGGLE SECTION */}
      <View style={styles.toggleWrapper}>
        <View style={styles.toggleContainer}>

          {/* TEXT */}
          <Text style={styles.toggleText}>
            {isOnDuty ? 'ON DUTY' : 'OFF DUTY'}
          </Text>

          {/* SWITCH */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.switch,
              isOnDuty && styles.switchActive,
            ]}
            onPress={toggleSwitch}
          >
            <View
              style={[
                styles.knob,
                isOnDuty && styles.knobActive,
              ]}
            />
          </TouchableOpacity>

        </View>
      </View>

      {/* GREETING */}
      <View style={styles.greetingContainer}>
        <Text style={styles.hiText}>Hi John Wick</Text>
        <Text style={styles.greeting}>Good Morning..!</Text>
      </View>

      {/* ILLUSTRATION */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/ride.jpg')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <TouchableOpacity>
            <Image
              source={require('../assets/home_black.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.navItem}>
          <TouchableOpacity
            onPress={() => navigation.navigate("OrderPage")}>
            <Image
              source={require('../assets/order.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
};

export default DutyDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    justifyContent: 'space-between',
  },

  /* TOP BAR */
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },

  /* TOGGLE */
  toggleWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },

  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#777',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
  },

  toggleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginRight: 15,
  },

  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },

  /* SWITCH TRACK */
  switch: {
    width: 70,
    height: 34,
    borderRadius: 20,
    backgroundColor: '#BDBDBD',
    justifyContent: 'center',
    padding: 3,
  },

  switchActive: {
    backgroundColor: '#0F7A7A',
  },

  /* KNOB */
  knob: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },

  knobActive: {
    alignSelf: 'flex-end',
  },

  /* GREETING */
  greetingContainer: {
    alignItems: 'center',
    marginTop: 30,
  },

  hiText: {
    fontSize: 20,
    color: '#444',
    marginBottom: 6,
  },

  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
  },

  /* IMAGE */
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  image: {
    width: '90%',
    height: 220,
  },

  /* BOTTOM NAV */
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },

  navItem: {
    alignItems: 'center',
  },

  navActive: {
    marginTop: 4,
    color: '#0F7A7A',
    fontWeight: '600',
  },

  navText: {
    marginTop: 4,
    color: '#555',
  },
});