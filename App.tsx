/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component, useState } from 'react';
import { Alert, BackHandler, Platform, StatusBar, Text } from 'react-native'; 
import { persistor, store } from './src/store/app/store';
import { Provider, useSelector } from 'react-redux';
// import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';
import i18n from './src/i18n';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ErrorBoundary from './src/components/ErrorBoundary';
import Router from './src/navigation';

const SyncLanguageWithI18n: React.FC = () => {
  const appLanguage = useSelector((state: any) => state.appLanguageChange);

  React.useEffect(() => {
    if ((appLanguage ?? '') != '') {
      i18n.changeLanguage(appLanguage);
    }
  }, [appLanguage]);

  return null;
};

function App() {
 

  return (
    <>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle='light-content' />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ErrorBoundary>
              <SyncLanguageWithI18n />
              <Router />
            </ErrorBoundary>
          </PersistGate>
        </Provider>
    </>
  );
}

export default App;
