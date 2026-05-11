import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function PaymentsScreen({ navigation }) {
  const [selected, setSelected] = useState("cash");

  const Radio = ({ value }) => (
    <View style={[styles.radio, selected === value && styles.radioActive]} />
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={18} />
        </TouchableOpacity>

        <Text style={styles.header}>Payments</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* TOTAL */}
        <View style={styles.rowBetween}>
          <Text style={styles.total}>Total Fare</Text>
          <Text style={styles.amount}>₹287</Text>
        </View>

        <View style={styles.dashed} />

        {/* WALLETS */}
        <Text style={styles.section}>Wallets</Text>

        <View style={styles.card}>
          {/* TRAVEL WALLET */}
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.title}>Travel Wallet</Text>
              <Text style={styles.red}>Low Balance: ₹0.0</Text>

              <TouchableOpacity style={styles.addBtn}>
                <Text>+ Add Money</Text>
              </TouchableOpacity>
            </View>

            <Radio value="wallet" />
          </View>

          {/* AMAZON PAY */}
          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <Text style={styles.title}>AmazonPay</Text>
            <Text style={styles.link}>LINK</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Cashback upto ₹25 | once per month
            </Text>
          </View>
        </View>

        {/* UPI */}
        <Text style={styles.section}>Pay by any UPI app</Text>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.rowBetween}
            onPress={() => setSelected("paytm")}
          >
            <Text style={styles.title}>Paytm</Text>
            <Radio value="paytm" />
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Cashback offer available
            </Text>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.rowBetween}
            onPress={() => setSelected("gpay")}
          >
            <Text style={styles.title}>Gpay</Text>
            <Radio value="gpay" />
          </TouchableOpacity>
        </View>

        {/* PAY LATER */}
        <Text style={styles.section}>Pay Later</Text>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.rowBetween}
            onPress={() => setSelected("paylater")}
          >
            <Text style={styles.title}>Pay at drop</Text>
            <Radio value="paylater" />
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Pay by scanning QR after ride
            </Text>
          </View>
        </View>

        {/* OTHERS */}
        <Text style={styles.section}>Others</Text>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.rowBetween}
            onPress={() => setSelected("cash")}
          >
            <Text style={styles.title}>Cash</Text>
            <Radio value="cash" />
          </TouchableOpacity>
        </View>

         <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate("PaymentSuccess")}>
                  <Text style={styles.buttonText}>Proceed to Pay</Text>
                </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e5e7eb" },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },

  backBtn: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    marginRight: 10,
  },

  header: { fontSize: 16, fontWeight: "600" },

  content: { padding: 15 },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  total: { fontSize: 16 },
  amount: { fontSize: 16, fontWeight: "600" },

  dashed: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    marginVertical: 10,
    borderColor: "#ccc",
  },

  section: {
    fontSize: 14,
    marginVertical: 10,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },

  title: { fontSize: 14, fontWeight: "500" },

  red: { color: "red", fontSize: 12, marginVertical: 5 },

  addBtn: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 5,
    alignSelf: "flex-start",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },

  link: { color: "#2563eb" },

  infoBox: {
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },

  infoText: { fontSize: 12, color: "#555" },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
  },

  radioActive: {
    borderColor: "#0f766e",
    backgroundColor: "#0f766e",
  },
});