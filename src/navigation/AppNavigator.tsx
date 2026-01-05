import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from '../components/Drawer';
import NewVersion from '../screens/NewVersionUpdate/NewVersion';
import OnbordingScreen from '../screens/Onboarding';
import IOSOnboardingScreen from '../screens/Onboarding/IosOnbording';
import LoginScreen from '../screens/loginWithOtp';
import PainterRegistration from '../screens/PainterRegistration';
import CustomHeaderWithBack from '../components/CustomHeaderWithBack';
import ExecutiveLogin from '../screens/ExecutiveLogin';
import LanguageSelection from '../screens/languageSelect';

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
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NewVersion" component={NewVersion} options={{ headerShown: false }} />
      <Stack.Screen name="Onbording" component={OnbordingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="IOSOnboarding" component={IOSOnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="PainterRegistration"
        component={PainterRegistration}
        options={{
          header: props => (
            <CustomHeaderWithBack {...props} title={'Painter Registration'} noOtherOption={true} />
          ),
        }}
      />
      <Stack.Screen name="ExecutiveLogin" component={ExecutiveLogin} options={{ headerShown: false }} />
      <Stack.Screen name="language" component={LanguageSelection} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AppNavigator;

