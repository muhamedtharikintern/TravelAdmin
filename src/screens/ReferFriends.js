import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function ReferFriends({ navigation }) {
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

        <Text style={styles.header}>Refer Friends</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* REFERRAL CARD */}
            <View style={styles.card}>
              <View style={styles.cardRow}>

          {/* LEFT IMAGE */}
          <Image
            source={require('../assets/gift.png')} // replace with your image
            style={styles.cardImage}
          />

          {/* RIGHT CONTENT */}
          <View style={styles.content}>
            <Text style={styles.cardText}>
              Earn upto ₹28 per friend you invite to Travel
            </Text>

            <View style={styles.codeRow}>
              <Text style={styles.code}>C25VEN01</Text>
              <Icon name="copy" size={16} color="#fff" />
            </View>
          </View>

  </View>
</View>

        {/* INVITE */}
        <TouchableOpacity style={styles.inviteCard}>
          <Text style={styles.inviteText}>
            🎁 Invite Friends to Travel
          </Text>

          <Text style={styles.inviteBtn}>INVITE</Text>
        </TouchableOpacity>

        {/* HOW IT WORKS */}
        <View style={styles.rowBetween}>
          <Text style={styles.section}>HOW IT WORKS?</Text>
          <Text style={styles.link}>T&Cs</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Your friend completes 1 order{"\n"}
            <Text style={styles.sub}>
              within 7 days of registration
            </Text>
          </Text>

          <Text style={styles.earn}>
            You earn{"\n"}50 🪙
          </Text>
        </View>

        {/* BUTTONS */}
        <TouchableOpacity style={styles.outlineBtn}>
          <Text style={styles.outlineText}>
            Find Friends to Refer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.primaryText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },


  backIcon: {
  width: 40,
  height: 40,
  resizeMode: 'contain',
},

  backBtn: {
    backgroundColor: "#e5e7eb",
    padding: 8,
    borderRadius: 20,
    marginRight: 10,
  },

  header: {
    fontSize: 18,
    fontWeight: "600",
  },

  content: {
    padding: 15,
  },

 card: {
  backgroundColor: '#F1F3F6',
  borderRadius: 16,
  padding: 16,
  marginHorizontal: 16,
  marginBottom: 20, 
  elevation: 2,
},

cardRow: {
  flexDirection: 'row',
  alignItems: 'center',
},

cardImage: {
  width: 80,
  height: 80,
  resizeMode: 'contain',
  marginRight: 12,
},

content: {
  flex: 1,
},

cardText: {
  fontSize: 14,
  color: '#333',
  fontWeight: '500',
  marginBottom: 10,
},

codeRow: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#0F7A6C',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
  alignSelf: 'flex-start',
},

code: {
  color: '#fff',
  fontWeight: '600',
  marginRight: 6,
},
  
inviteCard: {
  backgroundColor: "#e5e7eb",
  borderRadius: 15,
  padding: 15,
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 20,
  marginHorizontal: 16, 
},

  inviteText: {
    fontWeight: "500",
  },

  inviteBtn: {
    color: "#2563eb",
    fontWeight: "600",
  },

 rowBetween: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 10,
  marginHorizontal: 16, 
},

  section: {
    fontSize: 12,
    fontWeight: "600",
  },

  link: {
    fontSize: 12,
    color: "#2563eb",
  },

infoCard: {
  backgroundColor: "#e5e7eb",
  borderRadius: 15,
  padding: 15,
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 30,
  marginHorizontal: 16, 
},

  infoText: {
    fontSize: 13,
  },

  sub: {
    fontSize: 11,
    color: "#666",
  },

  earn: {
    color: "green",
    fontWeight: "600",
  },

 outlineBtn: {
  borderWidth: 1.5,
  borderColor: "#0f766e",
  padding: 15,
  borderRadius: 30,
  alignItems: "center",
  marginBottom: 15,
  marginHorizontal: 16,
  marginTop:215,
},

  outlineText: {
    color: "#0f766e",
    fontWeight: "600",
  },

primaryBtn: {
  backgroundColor: "#0f766e",
  padding: 15,
  borderRadius: 30,
  alignItems: "center",
  marginHorizontal: 16,
},

  primaryText: {
    color: "#fff",
    fontWeight: "600",
  },
});