import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const OrderPage = ({ navigation }) => {
  const [isOnDuty, setIsOnDuty] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
           <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.goBack()}
            >
               <Image
                source={require('../assets/back.png')}
                style={styles.backIcon}
              />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>1 Order</Text>

        <View style={{ width: 40 }} />
      </View>

      {/* CARD */}
      <View style={styles.card}>
        
        {/* CLOSE BUTTON */}
        <TouchableOpacity style={styles.closeBtn}
        onPress={()=> navigation.navigate("GoOnDuty")}>
          <Image
          source={require('../assets/cross.png')}
          style={{height:40,width:40}}
          resizeMode='contain'/>
        </TouchableOpacity>

        {/* PRICE */}
        <Text style={styles.price}>₹100 + 20</Text>

        {/* ROUTE SECTION */}
        <View style={styles.routeContainer}>

          {/* LEFT LINE */}
          <View style={styles.lineContainer}>
            <View style={styles.dot} />
            <View style={styles.verticalLine} />
            <Icon name="arrow-down" size={18} color="#333333" />
          </View>

          {/* RIGHT CONTENT */}
          <View style={styles.routeDetails}>

            {/* PICKUP */}
            <Text style={styles.distance}>2.8Km</Text>
            <Text style={styles.locationTitle}>Anna Nagar Bus stop</Text>
            <Text style={styles.address}>
              Model School Rd, Anna Nagar, Chennai-600009
            </Text>

            {/* SPACING */}
            <View style={styles.sectionGap} />

            {/* DROP */}
            <Text style={styles.distance}>4.0Km</Text>
            <Text style={styles.locationTitle}>AGS Villivakkam</Text>
            <Text style={styles.address}>
              Amman Koil St, Rajiv Gandhi Nagar, Chennai-600049
            </Text>

          </View>
        </View>

        {/* EXTRA TEXT */}
        <Text style={styles.extraText}>
          Customer added ₹10.0 extra
        </Text>

        {/* ACCEPT BUTTON */}
        <TouchableOpacity style={styles.acceptBtn}
        onPress={()=> navigation.navigate("StartYourTrip")}>
          <Text style={styles.acceptText}>Accept</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default OrderPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  backIcon:{
    width:40,
    height:40,
    resizeMode:"contain",
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },

  /* CARD */
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#16A34A',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  closeBtn: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  price: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 20,
  },

  /* ROUTE */
  routeContainer: {
    flexDirection: 'row',
  },

  lineContainer: {
    alignItems: 'center',
    marginRight: 12,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333333',
    marginTop: 6,
  },

  verticalLine: {
    width: 2,
    height: 100,
    backgroundColor: '#333333',
    marginVertical: 4,
  },

  routeDetails: {
    flex: 1,
  },

  distance: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },

  locationTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },

  address: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },

  sectionGap: {
    height: 16,
  },

  /* EXTRA TEXT */
  extraText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#16A34A',
  },

  /* BUTTON */
  acceptBtn: {
    marginTop: 20,
    backgroundColor: '#117A7A',
    height: 56,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  acceptText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  /* TOGGLE */
  toggleContainer: {
    marginTop: 20,
    height: 40,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },

  toggleText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
});