/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';
import { AppImages, Colors, Fonts } from '../../themes';
import * as utils from '../../utils';

const CheckInternet = ({isConnected, setIsConnected}: any) => {
  // const [isConnected, setIsConnected] = useState<any>(false);
  const netInfo = useNetInfo();
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {!isConnected && (
        <ScrollView style={{backgroundColor: '#fff'}}>
          <View style={{height: utils.Scale.screenHeight, ...stylesIn.centerContent}}>
            {/* <LottieView source={{ uri: AppImages.LottyNoNet }} style={{width: 200, height: 200, transform: 'scale(1.5)'}} autoPlay loop />  */}
            <LottieView source={require('../../assets/lotty/NoNet.json')} style={{ width: 200, height: 200, transform: 'scale(1.5)' }} autoPlay loop />
            <Text style={{...stylesIn.mainHeading}}>No Internet Connection!</Text>
            <Text style={{...stylesIn.subHeading}}>You are not connected to internet.</Text>
            <Text style={{...stylesIn.subHeading}}>Please check your connection</Text>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default CheckInternet;

const stylesIn = StyleSheet.create({ 
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  mainHeading: {
    fontSize: 20,
    fontFamily: Fonts.OpenSans600SemiBold,
    color: Colors.ui_dark_bg,
    marginBottom: 10
  },
  subHeading: {
    fontSize: 13,
    fontFamily: Fonts.OpenSans500Medium,
    color: Colors.color_gray,
  }
});
