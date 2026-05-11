import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const GoOnDuty = ({ navigation }) => {
  const [isOnDuty, setIsOnDuty] = useState(false);

  const toggleDuty = () => {
    setIsOnDuty(!isOnDuty);
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={22} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>0 Orders</Text>
      </View>

      {/* CENTER CONTENT */}
      <View style={styles.centerContainer}>

        <Text style={styles.message}>
          Go On-Duty to receive order.
        </Text>

        {/* TOGGLE BUTTON */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.toggleContainer,
            isOnDuty && styles.toggleActive
          ]}
          onPress={toggleDuty}
        >

          {/* TEXT */}
          <Text style={[
            styles.toggleText,
            isOnDuty && styles.toggleTextActive
          ]}>
            {isOnDuty ? 'ON DUTY' : 'OFF DUTY'}
          </Text>

          {/* SWITCH */}
          <View style={[
            styles.switchTrack,
            isOnDuty && styles.switchTrackActive
          ]}>
            <View style={[
              styles.switchThumb,
              isOnDuty && styles.switchThumbActive
            ]} />
          </View>

        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

export default GoOnDuty;

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

  /* CENTER */
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    fontSize: 18,
    color: '#444',
    marginBottom: 30,
  },

  /* TOGGLE WRAPPER */
  toggleContainer: {
    width: 230,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#BDBDBD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
  },

  toggleActive: {
    borderColor: '#117A7A',
  },

  toggleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },

  toggleTextActive: {
    color: '#117A7A',
  },

  /* SWITCH */
  switchTrack: {
    width: 70,
    height: 34,
    borderRadius: 20,
    backgroundColor: '#8E8E8E',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },

  switchTrackActive: {
    backgroundColor: '#117A7A',
  },

  switchThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#E5E5E5',
  },

  switchThumbActive: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFFFFF',
  },
});