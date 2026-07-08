import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://traveladmin.duckdns.org';

const AdminEditProfile = ({ navigation }) => {
  const [fetching, setFetching] = useState(true);
  const [userData, setUserData] = useState({
    fullName: '',
    mobileNo: '',
    gender: '',
    DOB: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setFetching(true);

      const token = await AsyncStorage.getItem('token');
      console.log('🔑 Token:', token);

      if (!token) {
        Alert.alert('Session expired', 'Please log in again.');
        navigation.reset({ index: 0, routes: [{ name: 'ContactDetails' }] });
        return;
      }

      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log('👤 Profile:', JSON.stringify(result));

      if (result.success) {
        const user = result.user;
        setUserData({
          fullName: user.fullName || '',
          mobileNo: user.mobileNo || '',
          gender: user.gender || '',
          DOB: user.DOB || '',
        });
      } else {
        Alert.alert('Error', 'Could not load your profile.');
      }
    } catch (err) {
      console.log('❌ Fetch profile error:', err);
      Alert.alert('Network Error', 'Something went wrong. Please check your connection.');
    } finally {
      setFetching(false);
    }
  };

  // ✅ Build fields dynamically from fetched user data
  const fields = [
    {
      icon: require('../assets/prof.png'),
      title: 'Name',
      value: userData.fullName || 'Required',
      valueColor: userData.fullName ? '#999999' : '#FF6B6B',
      screen: 'EditProfile',
    },
    {
      icon: require('../assets/mob.png'),
      title: 'Phone Number',
      value: userData.mobileNo || 'Required',
      valueColor: userData.mobileNo ? '#999999' : '#FF6B6B',
      screen: null, // phone number likely shouldn't be editable here
    },
    {
      icon: require('../assets/email.png'),
      title: 'Email',
      value: 'Required', // not in schema yet
      valueColor: '#FF6B6B',
      screen: null,
    },
    {
      icon: require('../assets/gender.png'),
      title: 'Gender',
      value: userData.gender
        ? userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)
        : 'Required',
      valueColor: userData.gender ? '#999999' : '#FF6B6B',
      screen: 'EditProfile',
    },
    {
      icon: require('../assets/calendar.png'),
      title: 'Date of Birth',
      value: userData.DOB || 'Required',
      valueColor: userData.DOB ? '#999999' : '#FF6B6B',
      screen: 'EditProfile',
    },
    {
      icon: require('../assets/emergency.png'),
      title: 'Emergency contact',
      value: 'Add +', // not in schema yet
      valueColor: '#BDBDBD',
      screen: null,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../assets/back.png')}
              style={styles.icn}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile</Text>

          <View style={{ width: 40 }} />
        </View>

        {fetching ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color="#117A7A" size="large" />
          </View>
        ) : (
          /* FORM LIST */
          <View style={styles.listContainer}>
            {fields.map((item, index) => (
              <View key={index}>

                <TouchableOpacity
                  style={styles.row}
                  onPress={() => item.screen && navigation.navigate(item.screen)}
                  disabled={!item.screen}
                >

                  {/* LEFT ICON */}
                  <Image source={item.icon} style={styles.icn} />

                  {/* TEXT BLOCK */}
                  <View style={styles.textContainer}>
                    <Text style={styles.label}>{item.title}</Text>
                    <Text style={[styles.value, { color: item.valueColor }]}>
                      {item.value}
                    </Text>
                  </View>

                  {/* RIGHT ARROW */}
                  {item.screen && (
                    <Image
                      source={require('../assets/r2.png')}
                      style={styles.icn}
                    />
                  )}

                </TouchableOpacity>

                {/* DIVIDER */}
                {index !== fields.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        )}

      </ScrollView>

    </SafeAreaView>
  );
};

export default AdminEditProfile;

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
    paddingVertical: 16,
  },

  icn: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
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

  loaderContainer: {
    marginTop: 60,
    alignItems: 'center',
  },

  /* LIST */
  listContainer: {
    marginTop: 8,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  textContainer: {
    flex: 1,
    marginLeft: 16,
  },

  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
  },

  value: {
    fontSize: 16,
    marginTop: 6,
  },

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginLeft: 56,
  },

  /* TOGGLE */
  toggleContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
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