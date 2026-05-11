import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';


const DriverEntryScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

      {/* BACK BUTTON */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/back.png')} 
            style={styles.backIcon}
          />
      </TouchableOpacity>

      {/* ILLUSTRATION */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/ride.jpg')} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* TEXT */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Drive & Earn</Text>
        <Text style={styles.subtitle}>Up to ₹30000/ month</Text>
      </View>

      {/* PRIMARY BUTTON */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('ContactDetails')} 
      >
        <Text style={styles.primaryText}>Start Driving</Text>
      </TouchableOpacity>

      {/* DIVIDER */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* CUSTOMER CARD */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Home')} 
        activeOpacity={0.8}
      >
        <View style={styles.cardTextContainer}>
          <Text style={styles.customerTitle}>Customer?</Text>
          <Text style={styles.bookRide}>Book Ride</Text>

          <View style={styles.arrowRow}>
            <Image 
            source={require('../assets/right_arrow.png')}
            style={styles.arrow}
            resizeMode='contain'/>
            
          </View>
        </View>

        <Image
          source={require('../assets/bike.png')} // replace with bike image
          style={styles.bikeImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default DriverEntryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
  },

  /* BACK BUTTON */
  backBtn: {
    marginTop: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* IMAGE */
  imageContainer: {
    marginTop: 30,
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 220,
  },

  backIcon: {
  width: 40,
  height: 40,
  resizeMode: 'contain',
},

  arrow:{
    width:24,
    height:24,
  },
  /* TEXT */
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 18,
    color: '#555',
    fontWeight: '500',
  },

  /* BUTTON */
  primaryButton: {
    marginTop: 30,
    backgroundColor: '#147A78',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },

  primaryText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },

  /* DIVIDER */
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },

  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },

  /* CARD */
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DADADA',
    backgroundColor: '#FFF',
  },

  cardTextContainer: {
    flex: 1,
  },

  customerTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },

  bookRide: {
    marginTop: 4,
    fontSize: 18,
    color: '#147A78',
    fontWeight: '600',
  },

  arrowRow: {
    marginTop: 8,
  },

  bikeImage: {
    width: 90,
    height: 60,
  },
});