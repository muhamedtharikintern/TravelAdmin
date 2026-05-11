import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const RidePaymentComplete = ({ navigation }) => {
  const [isOnDuty, setIsOnDuty] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Icon name="arrow-left" size={20} color="#333333" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Your Ride Completed</Text>

        <View style={{ width: 40 }} />
      </View>

      {/* CONTENT CENTER */}
      <View style={styles.content}>

        {/* SUCCESS ICON */}
        <View style={styles.successCircle}>
          <Icon name="check" size={60} color="#FFFFFF" />
        </View>

        {/* TITLE */}
        <Text style={styles.successTitle}>
          Payment successful
        </Text>

        {/* SUBTEXT */}
        <Text style={styles.subText}>
          Your Ride completed
        </Text>

        <Text style={styles.subText}>
          Successfully Paid ₹120
        </Text>

      </View>

      {/* TOGGLE */}
      <TouchableOpacity
        style={[
          styles.toggleContainer,
          { backgroundColor: isOnDuty ? '#16A34A' : '#BDBDBD' },
        ]}
        onPress={() => setIsOnDuty(!isOnDuty)}
      >
        <Text style={styles.toggleText}>
          {isOnDuty ? 'ON DUTY' : 'OFF DUTY'}
        </Text>

        <View
          style={[
            styles.toggleCircle,
            { alignSelf: isOnDuty ? 'flex-end' : 'flex-start' },
          ]}
        />
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default RidePaymentComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },

  /* CONTENT */
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  /* SUCCESS ICON */
  successCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  /* TEXTS */
  successTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },

  subText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },

  /* TOGGLE */
  toggleContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    height: 48,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },

  toggleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  toggleCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
});