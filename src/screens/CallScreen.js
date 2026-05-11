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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CallScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Image
          source={require('../assets/back.png')}
          style={styles.backIcon}/>
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.name}>John Franx</Text>
          <Text style={styles.timer}>00:50</Text>
        </View>
      </View>

      {/* PROFILE IMAGE */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/dp.png')}
          style={styles.profileImage}
        />
      </View>

      {/* BOTTOM CONTROLS */}
      <View style={styles.bottomContainer}>
        <View style={styles.divider} />

        <View style={styles.controlsRow}>
          {/* MIC */}
          <TouchableOpacity style={styles.controlBtn}>
              <Image
            source={require('../assets/mic.png')}
            style={styles.icn} />
          </TouchableOpacity>

          {/* SPEAKER */}
          <TouchableOpacity style={styles.controlBtn}>
              <Image
            source={require('../assets/speaker.png')}
            style={styles.icn} />
          </TouchableOpacity>

          {/* END CALL */}
          <TouchableOpacity style={styles.endCallBtn}>
            <Image
            source={require('../assets/hangup.png')}
            style={styles.icn} />
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#117A7A', // teal background
  },

  /* HEADER */
header: {
  height: 60,
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
},

icn:{
  height:60,
  width:60,
  resizeMode:'contain',
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
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
},

 headerText: {
  fontSize: 16,
  fontWeight: "600",
  textAlign: "center",
},


  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  timer: {
    fontSize: 16,
    color: '#E6F2F2',
    marginTop: 4,
  },

  /* PROFILE */
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 110,
    backgroundColor: '#FFFFFF',

    // shadow
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },

  /* BOTTOM */
  bottomContainer: {
    paddingBottom: 40,
  },

  divider: {
    height: 1,
    backgroundColor: '#D9E4E4',
    marginBottom: 30,
  },

  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  controlBtn: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },

  endCallBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});



