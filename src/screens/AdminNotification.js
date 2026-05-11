import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const AdminNotification = ({ navigation }) => {
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

        <Text style={styles.title}>Notifications</Text>
      </View>

      {/* EMPTY STATE */}
      <View style={styles.emptyContainer}>

        {/* BELL IMAGE */}
        <Image
          source={require('../assets/no-notification.png')} // replace with your asset
          style={styles.image}
          resizeMode="contain"
        />

        {/* TEXT */}
        <Text style={styles.emptyText}>
          You have no new notifications
        </Text>

      </View>

    </SafeAreaView>
  );
};

export default AdminNotification;

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

  /* EMPTY STATE */
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  image: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#444',
    textAlign: 'center',
  },
});