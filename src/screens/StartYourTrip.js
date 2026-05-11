import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const StartYourTrip = ({ navigation }) => {
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

        <Text style={styles.headerTitle}>You Start a Trip</Text>
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* MAP */}
        <View style={styles.map}>
           <Image
                 source={require('../assets/city_map.png')}
                 style={styles.map}
                 resizeMode="cover"
               />
        </View>

        {/* PICKUP STATUS */}
        <View style={styles.statusCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.statusTitle}>Pickup in 1 min</Text>
            <Text style={styles.statusSub}>
              Almost reached in passenger destination
            </Text>
          </View>
          <Text style={styles.bikeIcon}>🏍️</Text>
        </View>

        {/* PASSENGER PIN */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Passenger Pin</Text>

          <View style={styles.pinRow}>
            {[0, 0, 0, 7].map((digit, index) => (
              <View key={index} style={styles.pinBox}>
                <Text style={styles.pinDigit}>{digit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* DRIVER CARD */}
        <View style={styles.driverCard}>

          {/* DRIVER HEADER */}
          <View style={styles.driverHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.driverName}>Dexter</Text>
              <Text style={styles.driverPhone}>9941166608</Text>
            </View>

            {/* AVATAR */}
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>D</Text>
              </View>

              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>
          </View>

          {/* PRICE */}
          <View style={styles.priceRow}>
            <Text style={styles.cashText}>Cash</Text>
            <Text style={styles.priceText}>₹100 + 20</Text>
          </View>

          {/* MESSAGE BUTTON */}
          <TouchableOpacity style={styles.messageBtn}
          onPress={()=> navigation.navigate("MessageWithRider")}>
            <Icon name="message-circle" size={16} color="#374151" />
            <Text style={styles.messageText}>Message Dexter</Text>
          </TouchableOpacity>

        </View>

        {/* PICKUP LOCATION */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Pickup From</Text>

          <View style={styles.locationCard}>
            <Text style={styles.locationTitle}>AGS Villivakkam</Text>
            <Text style={styles.locationSub}>
              Amman Koll st, Rajiv Gandhi Nagar, Chennai-600049
            </Text>
          </View>
        </View>

        {/* CANCEL */}
        <View style={styles.cancelSection}>
          <TouchableOpacity
          onPress={()=> navigation.navigate("CancelReason")}>
            <Text style={styles.cancelText}>Cancel Ride</Text>
          </TouchableOpacity>
        </View>

        {/* ISSUE */}
        <View style={styles.issueRow}>
          <View style={styles.issueLeft}>
            <View style={styles.issueIcon}>
              <Text style={styles.issueIconText}>?</Text>
            </View>
            <Text style={styles.issueText}>Issue with Pickup?</Text>
          </View>

          <TouchableOpacity style={styles.feedbackBtn}>
            <Text style={styles.feedbackText}>Share feedback →</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

export default StartYourTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* HEADER */
header: {
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
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
},

headerTitle: {
  fontSize: 16,
  fontWeight: "600",
  textAlign: "center",
},

  scrollContainer: {
    paddingBottom: 100,
  },

  /* MAP */
  map: {
    margin: 16,
    height: 160,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mapPin: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pinText: {
    color: '#FFFFFF',
    fontSize: 18,
  },

  /* STATUS */
  statusCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  statusSub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },

  bikeIcon: {
    fontSize: 20,
  },

  /* PIN */
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
  },

  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },

  pinRow: {
    flexDirection: 'row',
  },

  pinBox: {
    width: 48,
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  pinDigit: {
    fontSize: 18,
    fontWeight: '700',
  },

  /* DRIVER */
  driverCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
  },

  driverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  driverName: {
    fontSize: 16,
    fontWeight: '600',
  },

  driverPhone: {
    fontSize: 12,
    color: '#6B7280',
  },

  avatarWrapper: {
    position: 'relative',
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 24,
    fontWeight: '700',
  },

  ratingBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  ratingText: {
    fontSize: 12,
    fontWeight: '700',
  },

  priceRow: {
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cashText: {
    fontSize: 12,
    color: '#6B7280',
  },

  priceText: {
    fontSize: 16,
    fontWeight: '700',
  },

  messageBtn: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  messageText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },

  /* LOCATION */
  locationCard: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 10,
  },

  locationTitle: {
    fontSize: 14,
    fontWeight: '600',
  },

  locationSub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },

  /* CANCEL */
  cancelSection: {
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },

  cancelText: {
    color: '#DC2626',
    fontWeight: '600',
  },

  /* ISSUE */
  issueRow: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  issueLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  issueIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  issueIconText: {
    color: '#FFFFFF',
    fontSize: 12,
  },

  issueText: {
    fontSize: 14,
  },

  feedbackText: {
    color: '#2563EB',
    fontWeight: '600',
  },

  /* TOGGLE */
  toggleContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    height: 48,
    borderRadius: 999,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  toggleText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  toggleCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
});