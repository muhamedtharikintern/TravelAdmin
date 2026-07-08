import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "https://traveladmin.duckdns.org";

const WhichCityScreen = ({ navigation, route }) => {
  const mobileNo = route?.params?.mobileNo;
  const routeToken = route?.params?.token;
  const [loading, setLoading] = useState(false);

  const handleConfirmCity = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const selectedCity = "Chennai";

      // ✅ Prefer AsyncStorage, fall back to the token passed via navigation
      let token = await AsyncStorage.getItem('token');
      console.log('🔑 Token from storage:', token);

      if (!token && routeToken) {
        console.log('↩️ Falling back to token from route params:', routeToken);
        token = routeToken;
        await AsyncStorage.setItem('token', token); // persist it for next time
      }

      console.log('📞 mobileNo:', mobileNo);

      if (!token) {
        console.log('❌ No token found in storage or route params');
        Alert.alert('Session expired', 'Please log in again.');
        return;
      }

      const response = await fetch(`${API_URL}/auth/update-city`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ City: selectedCity }),
      });

      if (!response.ok) {
        console.log('❌ Server responded with status:', response.status);
        Alert.alert('Error', `Server error (${response.status}). Please try again.`);
        return;
      }

      const result = await response.json();
      console.log("✅ City update result:", result);

      if (result.success) {
        navigation.navigate("selectAdminvehicle", {
          mobileNo,
          token,
        });
      } else {
        console.log('❌ City update failed:', result.message);
        Alert.alert('Failed', result.message || 'Could not update city. Please try again.');
      }

    } catch (error) {
      console.log('❌ Error:', error);
      Alert.alert('Network Error', error.message || 'Something went wrong. Please check your connection.');
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

      {/* ILLUSTRATION */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/small_map.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* TITLE */}
      <Text style={styles.title}>
        Which city do you want to ride?
      </Text>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>You will ride in</Text>

        <View style={styles.cityRow}>
          <View style={styles.leftSection}>
            <Image
              source={require('../assets/location.png')}
              style={styles.loc}
              resizeMode="contain"
            />
            <Text style={styles.cityText}>Chennai</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('searchcity', { mobileNo })}>
            <Text style={styles.changeText}>CHANGE</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CTA BUTTON */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleConfirmCity}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Confirm City</Text>
        )}
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default WhichCityScreen;

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
  loc: {
    width: 24,
    height: 24,
  },
  backBtn: {
    marginTop: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  image: {
    width: 140,
    height: 140,
  },
  title: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: '600',
    color: '#3A3A3A',
    lineHeight: 30,
  },
  card: {
    marginTop: 25,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 18,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 12,
    fontWeight: '500',
  },
  cityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityText: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 8,
    color: '#2E2E2E',
  },
  changeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#117A7A',
    letterSpacing: 0.5,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#117A7A',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});