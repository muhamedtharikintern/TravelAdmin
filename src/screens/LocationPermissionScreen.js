import React, { useEffect } from 'react';
import { View, Text, PermissionsAndroid } from 'react-native';

const LocationPermissionScreen = ({ navigation }) => {

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigation.navigate("LanguageSelection");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);
};

export default LocationPermissionScreen;