import {
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState, memo, useEffect, useRef } from 'react';
import HeaderCurve from '../../HeaderCurve';
import { AppImages, Colors, Fonts } from '../../../themes';
import LottieView from 'lottie-react-native';
import ButtonLarge from '../../ButtonLarge';
import { useTranslation } from 'react-i18next';

const ScratchDetails = ({ navigation, route }: any) => {
  const { eh_hdr_id, date, eh_total_amount, desc, gift_card_yn, gift_img, gift_desc, display_id, character_stamp } = route.params;

  const { t } = useTranslation();
  const scanHistory = () => {
    navigation.navigate('ScratchCardHistory');
  };

  const scanDone = () => {
    navigation.navigate('RewardsTable');
  };

  const animatedValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.2,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);


  return (
    <>
      <HeaderCurve
        topGaap={119}
        headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'}
        pageBackground={'#fff'}
      />
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={{ paddingHorizontal: 15 }}>
          <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
            <View style={{ width: 250, height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LottieView
                source={{ uri: AppImages.LottyConfetti }}
                style={{ width: 160, height: 160, position: 'absolute', transform: 'scale(1.5)' }}
                autoPlay
                loop
              />
              <Image
                source={require('../../../assets/images/imageBg.png')}
                style={{
                  height: 250,
                  width: 250,
                  borderRadius: 8,
                  resizeMode: 'contain',
                  position: 'absolute',
                }}
              />

              {eh_total_amount > 0 ? (
                <View style={{ backgroundColor: 'white' }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={require('../../../assets/images/rupee-min.png')}
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 8,
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <Text style={styles.pointsEarn}>₹ {eh_total_amount}</Text>
                </View>
              ) : (
                <View style={{ backgroundColor: 'white' }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                      {gift_img ? (
                        <Image
                          source={{ uri: gift_img }}
                          style={{
                            height: 100,
                            width: 100,
                            borderRadius: 8,
                            resizeMode: 'contain',
                          }}
                        />
                      ) : (
                        <Animated.Text
                          style={{
                            fontSize: 50,
                            color: '#5C2C92',
                            transform: [{ scale: animatedValue }],
                            textAlign: 'center',
                            fontFamily: Fonts.OpenSans700Bold,
                            marginTop: 25
                          }}
                        >
                              {character_stamp}
                        </Animated.Text>
                      )}
                    </View>
                  </View>
                    {/* <Text style={styles.pointsEarn}>{gift_desc}</Text> */}
                </View>
              )}
            </View>
          </View>
          <View style={{ marginBottom: 30 }}>
            {eh_total_amount > 0 ||
              (eh_total_amount === 0 &&
                gift_desc?.toLowerCase() !== "better luck next time") ? (
              <>
                <Text style={styles.headerScrach}>{t("Congratulations")}</Text>
                <Text style={styles.subHeaderScrach}>
                  {t("Youhavewonascratchcard")}
                </Text>
                <Text style={styles.subHeaderScrach}>{gift_desc}</Text>
                {eh_total_amount > 0 ? (
                  <Text style={styles.pointsEarn}>₹{eh_total_amount}</Text>
                ) : null}
              </>
            ) : (
              <>
                <Text style={styles.headerScrach}>{gift_desc}</Text>
                <Text style={styles.subHeaderScrach}>
                  {t("Tryagainforachancetowin")}
                </Text>
              </>
            )}
          </View>
          <View>
            <View style={styles.productDetails}>
              <Text style={styles.productInfo}>
                {desc}
              </Text>
              <Text style={styles.productInfo}>
                {display_id} | {date}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ ...styles.fixedButton, backgroundColor: '#fff', paddingHorizontal: 15 }}>
        <View style={{ width: '48%', marginRight: 5 }}>
          <ButtonLarge
            title={t("GotoHistory")}
            onPress={() => scanHistory()}
            fillBtn={false}
            key={'GotoHistory'}
            showIcon={false}
            iconName=""
            paddingVertical={7}
            paddingHorizontal={5}
            fontSize={15}
            iconSize={19}
          />
        </View>
        <View style={{ width: '48%' }}>
          <ButtonLarge
            title={t("Done")}
            onPress={() => scanDone()}
            fillBtn={true}
            key={'done'}
            showIcon={false}
            iconName=""
            paddingVertical={7}
            paddingHorizontal={5}
            fontSize={15}
            iconSize={19}
          />
        </View>
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  subHeaderScrach: {
    color: Colors.color_black,
    fontSize: 13,
    fontFamily: Fonts.OpenSans600SemiBold,
    textAlign: 'center',
  },
  headerScrach: {
    color: Colors.ui_dark_bg,
    fontSize: 20,
    fontFamily: Fonts.poppins600SemiBold,
    textAlign: 'center',
    marginVertical: 5,
  },
  productDetails: {
    backgroundColor: Colors.color_light_gray,
    padding: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: Colors.color_semi_dark_gray,
    borderRadius: 8,
  },
  productInfo: {
    textAlign: 'center',
    color: Colors.color_black,
  },
  pointsEarn: {
    color: '#141B34',
    fontSize: 25,
    fontFamily: Fonts.poppins500Medium,
    textAlign: 'center',
  },
  fixedButton: {
    backgroundColor: Colors.color_white,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default memo(ScratchDetails);
