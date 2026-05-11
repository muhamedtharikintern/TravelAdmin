import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";


export default function MessageWithRider({ navigation }) {
  const [message, setMessage] = useState("");

  const messages = [
    {
      id: "1",
      text: "Hiii!!!\nWhere are you??",
      time: "2:15 PM",
      sender: "me",
    },
    {
      id: "2",
      text: "Hiii!\nI’m almost reached near by you!!",
      time: "2:17 PM",
      sender: "driver",
    },
    {
      id: "3",
      text: "Okay\nI’m waiting...",
      time: "2:20 PM",
      sender: "me",
    },
    {
      id: "4",
      text: "👍",
      time: "",
      sender: "driver",
    },
  ];

  const renderItem = ({ item }) => {
    const isMe = item.sender === "me";

    return (
      <View style={styles.messageContainer}>
        {!isMe && (
          <Text style={styles.timeLeft}>{item.time}</Text>
        )}

        <View
          style={[
            styles.bubble,
            isMe ? styles.myBubble : styles.otherBubble,
          ]}
        >
          <Text
            style={isMe ? styles.myText : styles.otherText}
          >
            {item.text}
          </Text>
        </View>

        {isMe && (
          <Text style={styles.timeRight}>{item.time}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
        onPress={()=> navigation.goBack()}>
          <Image
          source={require('../assets/back.png')}
          style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Chat box</Text>
      </View>

      {/* DRIVER INFO */}
      <View style={styles.profileRow}>
        <TouchableOpacity
        onPress={()=>navigation.navigate("ReviewRider")}>
        <View style={styles.avatar}/>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>John Franx</Text>
          <Text style={styles.status}>online</Text>
        </View>

        <TouchableOpacity style={styles.iconBtn}
        onPress={()=> navigation.navigate("CallScreen")}>
          <Image
          source={require('../assets/mob.png')}
          style={{height:40,width:40,resizeMode:"contain"}}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn}
        onPress={()=> navigation.navigate("VideoCallScreen")}>
            <Image
          source={require('../assets/video.png')}
          style={{height:40,width:40,resizeMode:"contain"}}/>
        </TouchableOpacity>
      </View>

      {/* CHAT AREA */}
      <View style={styles.chatContainer}>
        <Text style={styles.date}>FEB 19, 2:32 PM</Text>

        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>

      {/* INPUT */}
      <View style={styles.inputRow}>
        <TextInput
          placeholder="If you reached call"
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />

        <TouchableOpacity style={styles.sendBtn}>
          <Image
          source={require('../assets/send.png')}
          style={{width:40,height:40, resizeMode:"contain"}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f766e" },

  backIcon:{
    width:40,
    height:40,
    resizeMode:"contain",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    alignItems: 'center',
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  avatar: {
    width: 45,
    height: 45,
    backgroundColor: "#000",
    borderRadius: 25,
    marginRight: 10,
  },

  name: {
    color: "#fff",
    fontWeight: "600",
  },

  status: {
    color: "#d1fae5",
    fontSize: 12,
  },

  iconBtn: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    marginLeft: 8,
  },

  chatContainer: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },

  date: {
    textAlign: "center",
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },

  messageContainer: {
    marginVertical: 5,
  },

  bubble: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 15,
  },

  myBubble: {
    backgroundColor: "#0f766e",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },

  otherBubble: {
    backgroundColor: "#e5e7eb",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },

  myText: {
    color: "#fff",
  },

  otherText: {
    color: "#000",
  },

  timeLeft: {
    fontSize: 10,
    color: "#888",
    marginBottom: 2,
  },

  timeRight: {
    fontSize: 10,
    color: "#888",
    alignSelf: "flex-end",
    marginTop: 2,
  },

  inputRow: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },

  sendBtn: {
    backgroundColor: "#0f766e",
    padding: 12,
    borderRadius: 25,
    marginLeft: 8,
  },
});