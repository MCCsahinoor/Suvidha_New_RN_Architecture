/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
// import { UserAuthContext } from '../store/contextAuthProvider/authProvider';
import { useSelector } from 'react-redux'; 
import * as redirectLogin from '../utils/redirectLogin';
import { useDispatch } from 'react-redux';
import { I_Visit_Running_Counter, setUpdateRunningVisit } from '../store/features/Visit/HoldRunningVisit';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../themes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CheckInternet from '../screens/CheckInternet/CheckInternet';
import CustomToastUI from '../components/CustomToastUI';
import AppNavigator from './AppNavigator';


const Router = () => {
  const [isConnected, setIsConnected] = useState(true);
  const isLogged = useSelector((state: any) => state.loginData);

  return (
    <>
      {/* <SafeAreaProvider> */}
      <NavigationContainer
        ref={navigatorRef => {
          redirectLogin.setTopLevelNavigator(navigatorRef);
        }}>
        {isConnected === true ?
          <AppNavigator />
          : null}
        <CheckInternet
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
        <CustomToastUI />
      </NavigationContainer>
      {/* </SafeAreaProvider> */}
    </>
  );
};

export default Router;
