import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import CustomDrawer from '../components/Drawer';
import NewVersion from '../screens/NewVersionUpdate/NewVersion';
import OnbordingScreen from '../screens/Onboarding';
import IOSOnboardingScreen from '../screens/Onboarding/IosOnbording';
import LoginScreen from '../screens/loginWithOtp';
import PainterRegistration from '../screens/PainterRegistration';
import CustomHeaderWithBack from '../components/CustomHeaderWithBack';
import ExecutiveLogin from '../screens/ExecutiveLogin';
import LanguageSelection from '../screens/languageSelect';
import HomeScreen from '../screens/Home/Home';
import Header from '../components/Header';
import Faq from '../screens/FAQ/faq';
import HelpDesk from '../screens/HelpDesk/HelpDesk';
import ChatQuestions from '../screens/HelpDesk/ChatQuestions';
import ChatBot from '../screens/HelpDesk/ChatBot';
import ProfileReview from '../screens/ProfileReview/ProfileReview';
import HomeNewsFeeds from '../screens/Home/HomeNewsFeeds';
import SellOutScheme from '../screens/SelloutScheme/sellOutSchemeList';
import SellOutSchemeDetails from '../screens/SelloutScheme/sellOutSchemeDetails';
import PointsStatement from '../screens/PointsStatement';
import WhatsappStatusPage from '../screens/WhatsappStatusPage/whatsappStatusPage';
import PainterRegistrationProgress from '../screens/PainterRegistrationProgress';
import DeleteAccount from '../screens/DeleteAccount/deleteAccount';
import PainterCVCard from '../screens/BuildYourProfile/painterCVCard';
import BuildProfileSuccess from '../screens/BuildYourProfile/BuildProfileSuccess';
import BuildYourProfileScreen from '../screens/BuildYourProfile';
import MyProfile from '../screens/myProfile';
import ProductCategories from '../screens/Products/productCategories';
import ProductDetails from '../screens/Products/productDetails';
import ProductList from '../screens/Products/productList';

export interface RootStackParamList {
  [key: string]: undefined | object | any;
}

export type DrawerParamList = {
  [key: string]: undefined | object | any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="Home"
      screenOptions={{
        lazy: true,
        headerShown: false,
        swipeEnabled: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: 0,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
        drawerStyle: {
          width: 310
        }
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
      />
    </Drawer.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Main"
        component={DrawerNavigator}
      />
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewVersion"
        component={NewVersion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onbording"
        component={OnbordingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IOSOnboarding"
        component={IOSOnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PainterRegistration"
        component={PainterRegistration}
        options={{
          header: props => (
            <CustomHeaderWithBack {...props} title={'Painter Registration'} noOtherOption={true} />
          ),
        }}
      />
      <Stack.Screen
        name="ExecutiveLogin"
        component={ExecutiveLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="language"
        component={LanguageSelection}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: props => <Header {...props} />,
        }}
      />
      <Stack.Screen
        name="Faq"
        component={Faq}
        options={{
          header: props => <CustomHeaderWithBack {...props} title={'FAQ'} />,
        }}
      />
      <Stack.Screen
        name="HelpDesk"
        component={HelpDesk}
        options={{
          header: props => (
            <CustomHeaderWithBack {...props} title={'Help Desk'} />
          ),
        }}
      />
      <Stack.Screen
        name="ChatQuestions"
        component={ChatQuestions}
        options={{
          header: props => (
            <CustomHeaderWithBack {...props} title={'Chat with customer services'} />
          ),
        }}
      />
      <Stack.Screen
        name="chatBot"
        component={ChatBot}
        options={{
          header: props => (
            <CustomHeaderWithBack {...props} title={'Suvidha Chatbot'} />
          ),
        }}
      />
      <Stack.Screen
        name="ProfileReview"
        component={ProfileReview}
        options={{
          header: props => (
            <CustomHeaderWithBack {...props} title={'Customer Feedback'} />
          ),
        }}
      />
      <Stack.Screen
        name="HomeNewsFeeds"
        component={HomeNewsFeeds}
        options={{
          header: props => <CustomHeaderWithBack {...props} title={'newsFeeds'} />,
        }}
      />
      <Stack.Screen
        name="SelloutScheme"
        component={SellOutScheme}
        options={{
          header: props => (
            <CustomHeaderWithBack {...props} title={'Sellout Schemes'} />
          ),
        }}
      />
      <Stack.Screen
        name="sellOutSchemeDetails"
        component={SellOutSchemeDetails}
        options={{
          header: props => (
            <CustomHeaderWithBack {...props} title={'Scheme Details'} />
          ),
        }}
      />
      <Stack.Screen
        name="PointsStatement"
        component={PointsStatement}
        options={{
          header: props => (
            <CustomHeaderWithBack {...props} title={'Points Statement'} />
          ),
        }}
      />
      <Stack.Screen
        name="WhatsappStatusPage"
        component={WhatsappStatusPage}
        options={{
          header: props => (
            <CustomHeaderWithBack {...props} title={'Whatsapp Status'} />
          ),
        }}
      />
      <Stack.Screen
        name="RegistrationProgress"
        component={PainterRegistrationProgress}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{
          header: props => (
            <CustomHeaderWithBack {...props} title={'Delete Account'} />
          ),
        }}
      />
      <Stack.Screen
        name="PainterCVCard"
        component={PainterCVCard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BuildProfileSuccess"
        component={BuildProfileSuccess}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BuildYourProfile"
        component={BuildYourProfileScreen}
        options={{
          header: props => (
            <CustomHeaderWithBack {...props} title={'Build Your Profile'} />
          ),
        }}
      />
      <Stack.Screen
        name="myProfile"
        component={MyProfile}
        options={{
          header: props => (
            <CustomHeaderWithBack {...props} title={'My Profile'} />
          ),
        }}
      />
      <Stack.Screen
        name="Products"
        component={ProductCategories}
        options={{
          header: props => (
            <CustomHeaderWithBack {...props} title={'Product Categories'} />
          ),
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          header: props => (
            <CustomHeaderWithBack {...props} title={'Products Details'} />
          ),
        }}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{
          header: props => (
            <CustomHeaderWithBack {...props} title={'Explore Products'} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;

