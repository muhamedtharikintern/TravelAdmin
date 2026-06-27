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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function SettingsScreen({ navigation,token }) {

  const handleLogout = () => {
  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('token');
          navigation.replace('LanguageSelection'); // your login screen name
        },
      },
    ]
  );
};
  const general = [
    {
      title: "Profile",
      sub: "+6625025660",
      icon: require('../assets/prof.png')
    },
    {
      title: "Favourites",
      sub: "Manage favourite locations",
      icon: require('../assets/fav.png'),
    },
    {
      title: "Preferencec",
      sub: "Manage preferences",
      icon: require('../assets/pref.png'),
    },
    {
      title: "App shortcuts",
      sub: "Create shortcuts on home launcher",
      icon:require('../assets/shortcuts.png'),
    },
  ];

  const others = [
    {
      title: "About",
      sub: "8.95.0",
      icon: require('../assets/about.png'),
    },
    {
      title: "Subscribe to Beta",
      sub: "Get early access to latest features",
      icon: require('../assets/subscribe.png'),
    },
    {
      title: "Logout",
      sub: "",
      icon: require('../assets/logout.png'),
    },
    {
      title: "Delete Account",
      sub: "",
      icon: require('../assets/delete.png'),
      danger: true,
    },
  ];

const renderItem = (item, index) => (
  <TouchableOpacity
    key={index}
    style={styles.row}
    onPress={item.title === 'Logout' ? handleLogout : undefined}
  >
    <Image source={item.icon} style={styles.icon} />
    <View style={{ flex: 1 }}>
      <Text style={[styles.title, item.danger && { color: 'red' }]}>
        {item.title}
      </Text>
      {item.sub !== '' && <Text style={styles.sub}>{item.sub}</Text>}
    </View>
  </TouchableOpacity>
);

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
     
       <Text style={styles.header}>Settings</Text>
     </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* GENERAL */}
        <Text style={styles.section}>GENERAL</Text>

        <View style={styles.card}>
          {general.map(renderItem)}
        </View>

        {/* OTHERS */}
        <Text style={styles.section}>OTHERS</Text>

        <View style={styles.card}>
          {others.map(renderItem)}
        </View>
      </ScrollView>
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
  position: "relative", 
},

backIcon:{
  width:40,
  height:40,
  resizeMode:"contain",
},

backBtn: {
  position: "absolute",
  left: 15,
  top: "50%",
  transform: [{ translateY: -20 }],
  backgroundColor: "#e5e7eb",
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
},

header: {
  fontSize: 18,
  fontWeight: "600",
  textAlign: "center",
},

  section: {
    fontSize: 12,
    fontWeight: "700",
    color: "#14b8a6",
    marginTop: 10,
    marginBottom: 8,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    overflow: "hidden",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  icon: {
    width:24,
    height:24,
    marginRight: 12,
  },

  title: {
    fontSize: 14,
    fontWeight: "500",
  },

  sub: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
});