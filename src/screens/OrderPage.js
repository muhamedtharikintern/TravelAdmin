import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, Image, ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSocket } from '../socket';

const OrderPage = ({ navigation, route }) => {
  const captainId = route.params?.captainId || "CAPTAIN_ID_HERE";

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [vehicleType, setVehicleType] = useState(null);

  useEffect(() => {
    const registerCaptain = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        // Step 1: Fetch captain profile to get vehicleType
        const res = await fetch('https://traveladmin.duckdns.org/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const captainVehicleType = data.user?.vehicleType;

        console.log('🚗 Captain vehicleType:', captainVehicleType);
        setVehicleType(captainVehicleType);

        // Step 2: Register with socket including vehicleType
        const socket = getSocket();
        socket.emit("captain:register", { captainId, vehicleType: captainVehicleType });
        console.log('✅ Captain registered with socket');

        // Step 3: Listen for orders matching vehicleType
        const newOrderHandler = (incomingOrder) => {
          console.log("📦 New order received:", incomingOrder);
          setOrder(incomingOrder);
          setWaiting(false);
        };

        socket.on("captain:new_order", newOrderHandler);

        return () => {
          socket.off("captain:new_order", newOrderHandler);
        };

      } catch (err) {
        console.log('❌ Register error:', err);
      }
    };

    registerCaptain();
  }, [captainId]);

  const handleAccept = async () => {
    if (!order) return;
    setLoading(true);
    try {
      const response = await fetch("https://traveladmin.duckdns.org/order/accept-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.orderId, captainId }),
      });
      const data = await response.json();
      if (data.success) {
        navigation.navigate("StartYourTrip", {
          orderId: order.orderId,
          pickupLocation: order.pickupLocation,
          dropLocation: order.dropLocation,
          amount: order.amount,
        });
      }
    } catch (error) {
      console.log("❌ Accept error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = () => {
    setOrder(null);
    setWaiting(true);
    navigation.navigate("GoOnDuty");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {waiting ? "Waiting for Orders..." : "1 Order"}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* VEHICLE TYPE BADGE */}
      {vehicleType && (
        <View style={styles.vehicleBadge}>
          <Text style={styles.vehicleBadgeText}>🚗 {vehicleType}</Text>
        </View>
      )}

      {/* WAITING STATE */}
      {waiting && (
        <View style={styles.waitingBox}>
          <ActivityIndicator size="large" color="#117A7A" />
          <Text style={styles.waitingText}>Looking for new orders...</Text>
        </View>
      )}

      {/* ORDER CARD */}
      {order && (
        <View style={styles.card}>
          {/* CLOSE BUTTON */}
          <TouchableOpacity style={styles.closeBtn} onPress={handleReject}>
            <Image
              source={require('../assets/cross.png')}
              style={{ height: 40, width: 40 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* PRICE */}
          <Text style={styles.price}>₹{order.amount}</Text>

          {/* ROUTE */}
          <View style={styles.routeContainer}>
            <View style={styles.lineContainer}>
              <View style={styles.dot} />
              <View style={styles.verticalLine} />
              <Icon name="arrow-down" size={18} color="#333333" />
            </View>
            <View style={styles.routeDetails}>
              <Text style={styles.distance}>Pickup</Text>
              <Text style={styles.locationTitle}>{order.pickupLocation}</Text>
              <View style={styles.sectionGap} />
              <Text style={styles.distance}>Drop</Text>
              <Text style={styles.locationTitle}>{order.dropLocation}</Text>
            </View>
          </View>

          {/* VEHICLE TYPE */}
          <Text style={styles.extraText}>🚗 {order.vehicleType}</Text>

          {/* ACCEPT BUTTON */}
          <TouchableOpacity
            style={[styles.acceptBtn, loading && { opacity: 0.7 }]}
            onPress={handleAccept}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.acceptText}>Accept</Text>
            }
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderPage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backIcon: { width: 40, height: 40, resizeMode: 'contain' },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#EDEDED',
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#333333' },
  vehicleBadge: {
    alignSelf: 'center',
    backgroundColor: '#E6F7F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#117A7A',
  },
  vehicleBadgeText: { color: '#117A7A', fontWeight: '600', fontSize: 13 },
  waitingBox: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  waitingText: { fontSize: 16, color: '#666', fontWeight: '500' },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#16A34A',
    elevation: 3,
  },
  closeBtn: {
    position: 'absolute', right: 16, top: 16,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#EDEDED',
    justifyContent: 'center', alignItems: 'center',
  },
  price: { fontSize: 32, fontWeight: '700', color: '#333333', marginBottom: 20 },
  routeContainer: { flexDirection: 'row' },
  lineContainer: { alignItems: 'center', marginRight: 12 },
  dot: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: '#333333', marginTop: 6,
  },
  verticalLine: { width: 2, height: 80, backgroundColor: '#333333', marginVertical: 4 },
  routeDetails: { flex: 1 },
  distance: { fontSize: 13, fontWeight: '600', color: '#888', marginBottom: 2 },
  locationTitle: { fontSize: 18, fontWeight: '600', color: '#333333', marginBottom: 4 },
  sectionGap: { height: 16 },
  extraText: { marginTop: 20, fontSize: 18, fontWeight: '600', color: '#16A34A' },
  acceptBtn: {
    marginTop: 20, backgroundColor: '#117A7A',
    height: 56, borderRadius: 999,
    justifyContent: 'center', alignItems: 'center',
  },
  acceptText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});