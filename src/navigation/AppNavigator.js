import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AdminIntroScreen from '../screens/AdminIntroScreen';
import LocationPermissionScreen from '../screens/LocationPermissionScreen';
import LanguageSelectionScreen from '../screens/LanguageSelectionScreen';
import DriverEntryScreen from '../screens/DriverEntryScreen';
import ContactDetailsScreen from '../screens/ContactDetailsScreen';
import RegisterNewContactScreen from '../screens/RegisterNewContactScreen';
import EnterOTPScreen from '../screens/EnterOTPScreen';
import WhichCityScreen from '../screens/WhichCityScreen';
import SearchCityScreen from '../screens/SearchCityScreen';
import SelectAdminVehicleScreen from '../screens/SelectAdminVehicleScreen';
import RideOrPorterScreen from '../screens/RideOrPorterScreen';
import DriverLicenseScreen from '../screens/DriverLicenseScreen';
import TakeSelfieScreen from '../screens/TakeSelfieScreen';
import ConfirmSelfieScreen from '../screens/ConfirmSelfieScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import VehicleDetailsScreen from '../screens/VehicleDetailsScreen';
import AadharProfile from '../screens/AadharProfile';
import PermitUpload from '../screens/PermitUpload';
import VehicleInsuranceUpload from '../screens/VehicleInsuranceUpload';
import FitnessCertificate from '../screens/FitnessCertificate';
import DutyDashboard from '../screens/DutyDashboard';
import AdminNotification from '../screens/AdminNotification';
import GoOnDuty from '../screens/GoOnDuty';
import OnDutyDashboard from '../screens/OnDutyDashboard';
import OrderPage from '../screens/OrderPage';
import StartYourTrip from '../screens/StartYourTrip';
import RidePaymentComplete from '../screens/RidePaymentComplete';
import AdminProfile from '../screens/AdminProfile';
import AdminEditProfile from '../screens/AdminEditProfile';
import MessageWithRider from "../screens/MessageWithRider";
import CallScreen from '../screens/CallScreen';
import VideoCallScreen from '../screens//VideoCallScreen';
import ReferFriends from "../screens/ReferFriends";
import RewardsScreen from "../screens/RewardsScreen";
import PowerPass from "../screens/PowerPass";
import ClaimInsurance from "../screens/ClaimInsurance";
import SettingsScreen from "../screens/SettingsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import RideHistory from "../screens/RideHistory";
import SafetyToolkit from "../screens/SafetyToolkit";



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
<Stack.Navigator>
      <Stack.Screen name="AdminIntro" component={AdminIntroScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="LocationPermission" component={LocationPermissionScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="DriverEntry" component={DriverEntryScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="RegisterNewContact" component={RegisterNewContactScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="EnterOTP" component={EnterOTPScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Whichcity" component={WhichCityScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="searchcity" component={SearchCityScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="selectAdminvehicle" component={SelectAdminVehicleScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="RideOrPorter" component={RideOrPorterScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="DriverLicense" component={DriverLicenseScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="TakeSelfie" component={TakeSelfieScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ConfirmSelfie" component={ConfirmSelfieScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="AadharProfile" component={AadharProfile} options={{ headerShown: false }}/>
      <Stack.Screen name="PermitUpload" component={PermitUpload}  options={{ headerShown: false }}/>
      <Stack.Screen name="VehicleInsuranceUpload" component={VehicleInsuranceUpload} options={{ headerShown: false }}/>
      <Stack.Screen name="FitnessCertificate" component={FitnessCertificate} options={{ headerShown: false }}/>
      <Stack.Screen name="DutyDashboard" component={DutyDashboard} options={{ headerShown: false }}/>
      <Stack.Screen name="AdminNotification" component={AdminNotification} options={{ headerShown: false }}/>
      <Stack.Screen name="GoOnDuty" component={GoOnDuty} options={{ headerShown: false }}/>
      <Stack.Screen name="OnDutyDashboard" component={OnDutyDashboard} options={{ headerShown: false }}/>
      <Stack.Screen name="OrderPage" component={OrderPage} options={{ headerShown: false }}/>
      <Stack.Screen name="StartYourTrip" component={StartYourTrip} options={{ headerShown: false }}/>
      <Stack.Screen name="RidePaymentComplete" component={RidePaymentComplete} options={{ headerShown: false }}/>
      <Stack.Screen name="AdminProfile" component={AdminProfile} options={{ headerShown: false }}/>
      <Stack.Screen name="AdminEditProfile" component={AdminEditProfile} options={{ headerShown: false }}/>
      <Stack.Screen name="MessageWithRider" component={MessageWithRider} options={{ headerShown: false }} />
      <Stack.Screen name="CallScreen" component={CallScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="VideoCallScreen" component={VideoCallScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ReferFriends" component={ReferFriends} options={{ headerShown: false }}/>
      <Stack.Screen name="Rewards" component={RewardsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="PowerPass" component={PowerPass} options={{ headerShown: false }}/>
      <Stack.Screen name="ClaimInsurance" component={ClaimInsurance}options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="RideHistory" component={RideHistory} options={{ headerShown: false }}/>
      <Stack.Screen name="SafetyToolkit" component={SafetyToolkit} options={{ headerShown: false }}/>
     
    </Stack.Navigator>
  );
}