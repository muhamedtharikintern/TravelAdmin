import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function SafetyToolkit({ navigation }) {
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

        <Text style={styles.header}>Safety toolkit</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* INTRO */}
        <Text style={styles.desc}>
          At Travel, your safety comes first. Here are some measures and
          provisions to ensure your safety.
        </Text>

        {/* IMAGE CARD */}
        <View style={styles.imageCard}>
          <Text style={{ fontSize: 60 }}>👨‍💻</Text>
        </View>

        {/* BULLETS */}
        <View style={styles.bullets}>
          <Text style={styles.bullet}>• Proactive safety checks</Text>
          <Text style={styles.bullet}>• Share live location</Text>
          <Text style={styles.bullet}>• Add trusted contacts</Text>
        </View>

        {/* SETTINGS */}
        <Text style={styles.sectionSmall}>Settings</Text>

        <TouchableOpacity style={styles.settingsCard}>
          <View>
            <Text style={styles.settingsTitle}>
              New trusted contacts
            </Text>
            <Text style={styles.settingsSub}>
              Share ride trip details with your loved ones in a single tap
            </Text>
          </View>
          <Icon name="chevron-right" size={18} />
        </TouchableOpacity>

        {/* WHAT WE OFFER */}
        <Text style={styles.section}>What we offer?</Text>

        {/* ITEM */}
        <View style={styles.item}>
          <Text style={styles.icon}>✨</Text>
          <View style={styles.textBox}>
            <Text style={styles.title}>
              24X7 Proactive Safety Checks
            </Text>
            <Text style={styles.sub}>
              • Drop at different location{"\n"}
              • Unplanned stops / Vehicle not moving{"\n"}
              • Route deviations during the ride
            </Text>
          </View>
        </View>

        <View style={styles.item}>
          <Text style={styles.icon}>📞</Text>
          <View style={styles.textBox}>
            <Text style={styles.title}>24X7 Call masking</Text>
            <Text style={styles.sub}>
              We keep identity and contact number confidential from Captains.
            </Text>
          </View>
        </View>

        <View style={styles.item}>
          <Text style={styles.icon}>🚨</Text>
          <View style={styles.textBox}>
            <Text style={styles.title}>SOS button</Text>
            <Text style={styles.sub}>
              Emergency response team will guide you instantly.
            </Text>
          </View>
        </View>

        <View style={styles.item}>
          <Text style={styles.icon}>🌙</Text>
          <View style={styles.textBox}>
            <Text style={styles.title}>
              Late night ride completion check
            </Text>
            <Text style={styles.sub}>
              Calls after rides between 10pm – 5am
            </Text>
          </View>
        </View>

        <View style={styles.item}>
          <Text style={styles.icon}>✅</Text>
          <View style={styles.textBox}>
            <Text style={styles.title}>Trip insurance</Text>
            <Text style={styles.sub}>
              All trips are insured from start to finish.
            </Text>
          </View>
        </View>

        {/* NOTE */}
        <Text style={styles.note}>
          Please note, all these safety features only work in case of an online
          ride through our app. Do not accept offline rides.
        </Text>

        {/* THINGS YOU CAN DO */}
        <Text style={styles.section}>THINGS YOU CAN DO</Text>

        {[
          {
            title: "Helmet always",
            desc:
              "Always ask for a helmet. Inform us if not provided.",
            icon: "🪖",
          },
          {
            title: "Live location sharing",
            desc:
              "Let family track your ride in real-time.",
            icon: "📡",
          },
          {
            title: "Your ride. Your rules",
            desc:
              "You can ask the captain to drive as per your comfort.",
            icon: "🏍️",
          },
          {
            title: "Add trusted Contacts",
            desc:
              "Reach your loved ones easily in emergencies.",
            icon: "🛡️",
          },
          {
            title: "Don’t share personal information",
            desc:
              "Avoid sharing number or location outside app.",
            icon: "🔒",
          },
          {
            title: "Always share feedback",
            desc:
              "Help us improve safety and experience.",
            icon: "💬",
          },
        ].map((item, i) => (
          <View key={i} style={styles.item}>
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={styles.textBox}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.sub}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },

  backBtn: {
    backgroundColor: "#e5e7eb",
    padding: 8,
    borderRadius: 20,
    marginRight: 10,
  },

  header: {
    fontSize: 16,
    fontWeight: "600",
  },

  content: {
    padding: 15,
    paddingBottom: 40,
  },

  desc: {
    fontSize: 14,
    color: "#444",
    marginBottom: 15,
  },

  imageCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },

  bullets: {
    marginBottom: 15,
  },

  bullet: {
    fontSize: 14,
    marginBottom: 5,
  },

  sectionSmall: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 10,
  },

  settingsCard: {
    backgroundColor: "#e5e7eb",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  settingsTitle: {
    fontWeight: "600",
  },

  settingsSub: {
    fontSize: 12,
    color: "#666",
  },

  section: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
  },

  item: {
    flexDirection: "row",
    marginBottom: 15,
  },

  icon: {
    fontSize: 20,
    marginRight: 10,
  },

  textBox: {
    flex: 1,
  },

  title: {
    fontWeight: "600",
    marginBottom: 3,
  },

  sub: {
    fontSize: 13,
    color: "#555",
  },

  note: {
    fontSize: 13,
    marginVertical: 15,
    color: "#444",
  },
});