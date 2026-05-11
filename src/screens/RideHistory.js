import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function RideHistory({ navigation }) {
  return (
    <View style={styles.container}>
      {/* HEADER */}
    <View style={styles.headerRow}>
  <TouchableOpacity
    style={styles.backBtn}
    onPress={() => navigation.goBack()}
  >
    <Image
      source={require('../assets/back.png')}
      style={styles.backIcon}
    />
  </TouchableOpacity>

  <Text style={styles.header}>Ride History</Text>
</View>

      {/* EMPTY STATE */}
      <View style={styles.center}>
        {/* ICON / ILLUSTRATION */}
        <Image
        source={require("../assets/ridehistory.png")}
        style={styles.scooter}/>

        {/* TITLE */}
        <Text style={styles.title}>No rides taken yet</Text>

        {/* SUBTEXT */}
        <Text style={styles.sub}>
          Your ride orders in future will appear here
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#f3f4f6",
},

  backIcon: {
  width: 40,
  height: 40,
  resizeMode: 'contain',
},

headerRow: {
  height: 60,
  justifyContent: "center",
  alignItems: "center",
},

 backBtn: {
  position: "absolute", 
  left: 15,
  backgroundColor: "#e5e7eb",
  padding: 8,
  borderRadius: 20,
},

header: {
  fontSize: 16,
  fontWeight: "600",
  textAlign: "center",
},

 center: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 20,
},

  scooter: {
    marginBottom: 20,
    width:218,
    height:218,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },

  sub: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});