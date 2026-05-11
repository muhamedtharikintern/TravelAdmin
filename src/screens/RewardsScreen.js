import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function RewardsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* TOP YELLOW HEADER */}
      <View style={styles.header}>
        {/* BACK */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
            <Image
            source={require('../assets/back.png')} 
            style={styles.backIcon}
          />
        </TouchableOpacity>

        {/* TITLE */}
        <Text style={styles.headerTitle}>Rewards</Text>

        {/* ILLUSTRATION (emoji fallback) */}
        <Image
        source={require("../assets/reward.png")}
        style={styles.gift}/>
      </View>

      {/* FLOATING CARD */}
   {/* GREY WRAPPER */}
<View style={styles.wrapper}>
  <View style={styles.innerCard}>
    <View style={styles.row}>
      
      {/* COINS */}
      <View style={styles.col}>
        <Text style={styles.label}>Coins</Text>
        <View style={styles.coinRow}>
          <Text style={styles.value}>0</Text>
          <Text style={styles.coin}>🪙</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* VOUCHERS */}
      <View style={styles.col}>
        <Text style={styles.label}>Vouchers</Text>
        <Text style={styles.value}>0</Text>
      </View>
    </View>
  </View>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#f3f4f6",
},

header: {
  height: 250,
  backgroundColor: "#facc15",
  paddingTop: 50,
  paddingHorizontal: 15,
},

backIcon: {
  width: 40,
  height: 40,
  resizeMode: 'contain',
},

backBtn: {
  backgroundColor: "#fff",
  padding: 8,
  borderRadius: 20,
  width: 40,
  height:40,
  alignItems: "center",
  justifyContent: "center",
},

headerTitle: {
  position: "absolute",
  top: 55,
  alignSelf: "center",
  fontWeight: "600",
  fontSize: 16,
},

gift: {
  position: "absolute",
  right: 20,
  bottom: 20,
  width: 257,
  height: 172,
  marginTop:40,
},


wrapper: {
  backgroundColor: "#d1d5db",
  marginHorizontal: 20,
  marginTop: 40, 
  borderRadius: 20,
  padding: 10,
},

/* 🔥 INNER CARD */
innerCard: {
  backgroundColor: "#f9fafb",
  borderRadius: 16,
  paddingVertical: 15,
  paddingHorizontal: 10,
},

row: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

col: {
  flex: 1,
  alignItems: "center",
},

label: {
  fontSize: 14,
  color: "#333",
  marginBottom: 6,
},

value: {
  fontSize: 16,
  fontWeight: "600",
},

coinRow: {
  flexDirection: "row",
  alignItems: "center",
},

coin: {
  marginLeft: 4,
},

divider: {
  width: 1,
  height: 35,
  backgroundColor: "#ccc",
},
});