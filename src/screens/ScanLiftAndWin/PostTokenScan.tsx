/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import { AppImages, Colors, Fonts } from '../../themes';
import HeaderCurve from '../../components/HeaderCurve';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Worning from '../../assets/svg/product-white.svg';
import PackageWhite from '../../assets/svg/packageWhite.svg';
import Clock from '../../assets/svg/clockWhite.svg';
import { useSelector } from 'react-redux';
import { I_Benefit_Details } from '../../Interfaces/benefit.interface';
import ScanToken from '../../assets/svg/scanToken.svg';
import { useTranslation } from 'react-i18next';
import { ddmmyyyConverter } from '../../utils/formatDate';
// import Sound from 'react-native-sound';
import SoundPlayer from 'react-native-sound-player';
import { useFocusEffect } from '@react-navigation/native';
const PostTokenScan = ({ route, navigation }: any) => {
  const backgroundImage = require('../../assets/images/innerShadowOne.png');
  const { responseData } = route.params;
  const [RewardDetails, setRewardDetails] = useState<I_Benefit_Details.RewardDetails>()
  const [pageChnageFlag, setpageChnageFlag] = useState(false);
  // GET BUSSINESS DETAILS
  let BusinessDetailsTab: any = useSelector(
    (state: any) => state.businessDetails,
  );
  const scanToken = () => {
    navigation.goBack()
    setpageChnageFlag(false)
  };

  // const clickSound: any = new Sound(require('../../assets/sounds/success.mp3'), Sound.MAIN_BUNDLE, (error: any) => {
  //   if (error) {
  //     console.log("Failded to load the sound", error);
  //     return;
  //   }
  // });


  const makeSoundEffect = () => {
    // clickSound.play((success: any) => {
    //   console.log("success", success)
    //   if (success) {
    //     console.log('successfully finished playing');
    //   } else {
    //     console.log('playback failed due to audio decoding errors');
    //   }
    // })
    playSong();
    getInfo();
  };
  const playSong = () => {
    try {
      SoundPlayer.playAsset(require('../../assets/sounds/success.mp3'))
    } catch (e) {
      console.log('Cannot play the file');
    }
  };
  const getInfo = async () => {
    try {
      const info = await SoundPlayer.getInfo();
    } catch (e) {
    }
  };

  useEffect(() => {
    if (BusinessDetailsTab.reward_details != null && BusinessDetailsTab.reward_details != undefined) {
      setRewardDetails(BusinessDetailsTab.reward_details);
    }
  }, [])



  //========== For Page entry and exit ===========
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      if (!pageChnageFlag) {
        setpageChnageFlag(true)
        setTimeout(() => makeSoundEffect(), 100);
      }
      return () => {
        // Do something when the screen is unfocused
        // console.log('ColourantFillScreen is unfocused');
        // dispatch(isPageExit(false));
      };
    }, []),
  );

  const { t } = useTranslation();
  return (
    <>
      <HeaderCurve
        topGaap={119}
        headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'}
        pageBackground={'#fff'}
      />
      <ScrollView style={{ backgroundColor: Colors.color_white }}>
        <View style={styles.container}>
          <View style={styles.scannerCardUpper}>
            <ImageBackground source={backgroundImage} resizeMode="stretch" imageStyle={{ borderRadius: 7 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <LottieView
                  source={{ uri: AppImages.LottyAnimationSuccess }}
                  style={{ width: 200, height: 200, transform: 'scale(1.5)' }}
                  autoPlay
                  loop
                />
              </View>
              <View>
                {responseData.TokenType !== 'Lift And Win' && (
                  <Text
                    style={[styles.textColor, { fontSize: 16, color: '#07AD7E', fontFamily: Fonts.OpenSans500Medium }]}>
                    {t("youWillAchieve")}
                  </Text>
                )}

                {responseData.TokenType == 'Lift And Win' ? (
                  // <Text
                  // style={[
                  //   styles.textColor,
                  //   {
                  //     fontSize: 30,
                  //     color: '#07AD7E',
                  //     fontFamily: Fonts.PollerOneRegular,
                  //     marginBottom: 10,
                  //   },
                  // ]}>
                  // {Number(responseData.Denomination)} {t("points")}
                  // </Text>
                  <Text
                    style={[
                      styles.textColor,
                      {
                        fontSize: 17,
                        color: '#07AD7E',
                        marginBottom: 10,
                        fontFamily: Fonts.poppins600SemiBold,
                        textTransform: 'uppercase'
                      },
                    ]}>
                    {t("ScanSuccess")}
                  </Text>
                ) : (<Text
                  style={[
                    styles.textColor,
                    {
                      fontSize: 30,
                      color: '#07AD7E',
                      fontFamily: Fonts.PollerOneRegular,
                      marginBottom: 10,
                    },
                  ]}>
                  ₹ {Number(responseData.Denomination)}
                </Text>)}

              </View>
              <View style={styles.tokenContainer}>
                <View
                  style={{
                    borderColor: '#07AD7E',
                    borderWidth: 2,
                    overflow: 'hidden',
                    borderLeftWidth: 0,
                    position: 'absolute',
                    left: -2,
                    top: -30,
                    width: 30,
                    height: 50,
                    borderTopRightRadius: 150,
                    borderBottomRightRadius: 150,
                    backgroundColor: 'transparent',
                    zIndex: 1,
                  }}>
                  <View
                    style={{
                      width: 210,
                      height: 50,
                      right: 0,
                      backgroundColor: 'white',
                    }}
                  />
                </View>
                <View
                  style={{
                    borderColor: '#07AD7E',
                    borderWidth: 2,
                    overflow: 'hidden',
                    borderLeftWidth: 0,
                    position: 'absolute',
                    right: -2,
                    top: -30,
                    width: 30,
                    height: 50,
                    borderTopRightRadius: 150,
                    borderBottomRightRadius: 150,
                    backgroundColor: 'transparent',
                    zIndex: 1,
                    transform: [{ rotate: '180deg' }],
                  }}>
                  <View
                    style={{
                      width: 210,
                      height: 50,
                      right: 0,
                      backgroundColor: 'white',
                    }}
                  />
                </View>
                <View>
                  <Image
                    source={require('../../assets/images/dashLine.png')}
                    style={{
                      width: '100%',
                      marginTop: -23,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
                <View>
                  <Text style={{ fontFamily: Fonts.OpenSans500Medium, fontSize: 15, color: '#A0EAD5' }}>
                    {t("tokenCode")}
                  </Text>
                  <Text style={styles.tokenCode}>{responseData.TokenKey}</Text>
                </View>
                <View style={styles.tokenDetails}>
                  <View style={styles.tokenData}>
                    <Worning />
                    <Text style={{ marginLeft: 5, color: 'white', fontFamily: Fonts.OpenSans500Medium, }}>
                      {responseData.Product}
                    </Text>
                  </View>
                  <View style={styles.tokenData}>
                    <PackageWhite />
                    <Text style={{ marginLeft: 2, color: 'white', fontFamily: Fonts.OpenSans500Medium, }}>{responseData.PackSize}</Text>
                  </View>
                  <View style={styles.tokenData}>
                    <Clock />
                    <Text style={{ marginLeft: 5, color: 'white', fontFamily: Fonts.OpenSans500Medium, }}>{ddmmyyyConverter(new Date(), 'hh:mm A')}</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View >
        <View style={{ ...styles.walletBalance }}>
          {responseData.TokenType == 'Lift And Win' &&
            <>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                <Image
                  source={require('../../assets/images/reward.png')}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 8,
                    resizeMode: 'contain',
                  }}
                />
                <Text style={{ ...styles.walletBalanceHeader }}>{t("totalPointsEarn")}:</Text>
              </View>
              {(RewardDetails && RewardDetails != null) ?
                <Text style={{ ...styles.walletBalanceAmount }}>{RewardDetails.basic_point != 0 ? RewardDetails.basic_point : '0'}</Text>
                : (
                  <Text style={{ ...styles.walletBalanceAmount }}>0</Text>
                )}
            </>
          }
          {/* {responseData.TokenType != 'Lift And Win' &&
            <>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                <Image
                  source={require('../../assets/images/rupee-min.png')}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 8,
                    resizeMode: 'contain',
                  }}
                />
                <Text style={{ ...styles.walletBalanceHeader }}>Total Earn:</Text>
              </View>
              {RewardDetails && RewardDetails != null &&
                <Text style={{ ...styles.walletBalanceAmount }}>{RewardDetails.basic_value != 0 ? RewardDetails.basic_value : '-'}</Text>
              }
            </>

          } */}

        </View>
      </ScrollView >

      <View style={{ ...styles.fabPosition }}>
        <Pressable
          onPress={() => {
            scanToken();
          }}>
          <View style={[styles.fabStyle]}>
            <LottieView
              source={{ uri: AppImages.LottyScanToken }}
              style={{
                height: 25,
                width: 25,
                borderRadius: 8,
                alignSelf: 'center',
                transform: 'scale(2.5)',
                marginRight: 5,
              }}
              autoPlay
              loop
            />
            <Text style={{ ...styles.scanTokenText }}>{t("clickScanToken")}</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default PostTokenScan;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 5,
    paddingHorizontal: 15,
  },
  scannerCardUpper: {
    shadowRadius: 10,
    borderWidth: 1.5,
    borderColor: '#07AD7E',
    borderRadius: 10,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: '#ddd',
    backgroundColor: '#fff',
  },

  textColor: {
    color: Colors.color_black,
    alignSelf: 'center',
  },
  tokenDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  tokenContainer: {
    backgroundColor: '#07AD7E',
    padding: 15,
    paddingTop: 20,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  tokenCode: {
    color: Colors.color_white,
    fontFamily: Fonts.poppins600SemiBold,
    fontSize: 25,
  },
  tokenData: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletBalance: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7FBFB',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 50
  },
  walletBalanceHeader: {
    color: Colors.color_dark_gray,
    fontSize: 14,
    fontFamily: Fonts.OpenSans700Bold,
    marginLeft: 10,
  },
  walletBalanceAmount: {
    color: '#66898C',
    fontSize: 20,
    fontFamily: Fonts.OpenSans700Bold,
    textTransform: 'uppercase',
    textAlign: 'right'
  },
  fabPosition: {
    position: 'absolute',
    bottom: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // borderWidth: 1,
    borderColor: Colors.ui_light_bg,
    borderRadius: 20
  },
  fabStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    // minWidth: 100,
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 0,
    backgroundColor: Colors.ui_dark_bg,
    borderRadius: 25,
    color: '#fff',
  },
  scanTokenText: {
    color: Colors.color_white,
    fontSize: 14,
    fontFamily: Fonts.poppins500Medium,
  },
});
