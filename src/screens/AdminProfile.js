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
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://traveladmin.duckdns.org';

const AdminProfile = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [selfieUrl, setSelfieUrl] = useState(null);
  const [fetching, setFetching] = useState(true);

  const menuItems = [
    { icon: require('../assets/help.png'), label: 'Help', screen: "Help" },
    { icon: require('../assets/wallet.png'), label: 'Wallets', screen: "Wallet" },
    { icon: require('../assets/myrides.png'), label: 'My Rides', screen: "RideHistory" },
    { icon: require('../assets/safety.png'), label: 'Safety', screen: "SafetyToolkit" },
    { icon: require('../assets/refer.png'), label: 'Refer and Earn', screen: "ReferFriends" },
    { icon: require('../assets/rewards.png'), label: 'My Rewards', screen: "Rewards" },
    { icon: require('../assets/powerpass.png'), label: 'Power Pass', screen: "PowerPass" },
    { icon: require('../assets/not.png'), label: 'Notifications', screen: "Notifications" },
    { icon: require('../assets/claims.png'), label: 'Claims', screen: "ClaimInsurance" },
    { icon: require('../assets/settings.png'), label: 'Settings', screen: "Settings" },
  ];

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
        setFullName(user.fullName || '');
        setMobileNo(user.mobileNo || '');
        setSelfieUrl(user.selfieUrl || null);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile</Text>

          <View style={{ width: 40 }} />
        </View>

        {/* PROFILE CARD */}
        <View style={styles.card}>

          {/* USER INFO */}
          <View style={styles.row}>
            {fetching ? (
              <View style={styles.avatarPlaceholder}>
                <ActivityIndicator color="#117A7A" size="small" />
              </View>
            ) : (
              <Image
                source={
                  selfieUrl
                    ? { uri: selfieUrl }
                    : require('../assets/user.png')
                }
                style={styles.avatar}
              />
            )}
            <View style={styles.userInfo}>
              <TouchableOpacity
                onPress={() => navigation.navigate("AdminEditProfile")}>
                <Text style={styles.userName}>
                  {fetching ? 'Loading...' : (fullName || 'Add your name')}
                </Text>
                <Text style={styles.userPhone}>{mobileNo}</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require('../assets/r2.png')}
              style={styles.icon}
            />
          </View>


          {/* DIVIDER */}
          <View style={styles.divider} />

          {/* RATING */}
          <View style={styles.row}>
            <Image
              source={require('../assets/star.png')}
              style={[styles.icon, { tintColor: '#F4A100' }]}
            />
            <Text style={styles.ratingText}>5.00 My Rating</Text>
            <Image
              source={require('../assets/r2.png')}
              style={styles.icon}
            />
          </View>
        </View>

        {/* MENU LIST */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <View key={index}>
              <TouchableOpacity style={styles.menuItem}
                onPress={() => navigation.navigate(item.screen)}>
                <View style={styles.menuLeft}>
                  <Image source={item.icon} style={styles.icon} />
                  <Text style={styles.menuText}>{item.label}</Text>
                </View>
                <Image
                  source={require('../assets/r2.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>

              {/* DIVIDER */}
              {index !== menuItems.length - 1 && (
                <View style={styles.listDivider} />
              )}
            </View>
          ))}
        </View>

        {/* BANNER */}
        <View style={styles.banner}>
          <View>
            <Text style={styles.bannerTitle}>
              Earn money with Travel
            </Text>
            <Text style={styles.bannerSub}>
              Become a Captain!
            </Text>
          </View>

          <Image
            source={require('../assets/captain.png')}
            style={styles.bannerImage}
          />
        </View>

      </ScrollView>


    </SafeAreaView>
  );
};

export default AdminProfile;

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

  backIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
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

  /* CARD */
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  userInfo: {
    flex: 1,
    marginLeft: 12,
  },

  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },

  userPhone: {
    fontSize: 14,
    color: '#999999',
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },

  ratingText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },

  /* MENU */
  menuContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333333',
  },

  listDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },

  /* BANNER */
  banner: {
    margin: 16,
    backgroundColor: '#F1E8D8',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bannerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },

  bannerSub: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },

  bannerImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
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