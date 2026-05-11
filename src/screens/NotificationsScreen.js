import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function NotificationsScreen({ navigation }) {
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

        <Text style={styles.header}>Notifications</Text>
      </View>

      {/* EMPTY STATE */}
      <View style={styles.center}>
        {/* ICON */}
        <View style={styles.iconWrapper}>
          <Text style={styles.bell}>🔔</Text>

          <View style={styles.cross}>
            <Text style={styles.crossText}>✕</Text>
          </View>
        </View>

        {/* TEXT */}
        <Text style={styles.text}>
          You have no new notifications
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 15,
  },

  headerRow: {
  height: 60,
  justifyContent: "center",
  alignItems: "center",
  },

  backIcon: {
  width: 40,
  height: 40,
  resizeMode: 'contain',
},

 backBtn: {
  position: "absolute",
  left: 15, 
  backgroundColor: "#e5e7eb",
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
},

  header: {
    fontSize: 16,
    fontWeight: "600",
    textAlign:"center",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  iconWrapper: {
    position: "relative",
    marginBottom: 20,
  },

  bell: {
    fontSize: 80,
  },

  cross: {
    position: "absolute",
    right: -5,
    top: 10,
    backgroundColor: "#fb7185",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  crossText: {
    color: "#fff",
    fontWeight: "600",
  },

  text: {
    fontSize: 14,
    color: "#444",
  },
});