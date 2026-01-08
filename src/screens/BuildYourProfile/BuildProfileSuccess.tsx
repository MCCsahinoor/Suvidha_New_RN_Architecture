import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { AppImages, Colors, Fonts } from '../../themes';
import ButtonLarge from '../../components/ButtonLarge';
import LottieView from 'lottie-react-native';
import * as utils from '../../utils';
import { useDispatch } from 'react-redux';
import { setPullToRefresh } from '../../store/features/menu/pullToRefresh';
import { useTranslation } from 'react-i18next';

const BuildProfileSuccess = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const goToBack = (): void => {
    dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: true }));
    navigation.replace('Home')
  };

  const { t } = useTranslation();

  return (
    <>
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={{ height: (utils.Scale.getWindowDimensions().height - 70), ...styles.container }}>
          <LottieView
            source={{ uri: AppImages.LottyAnimationSuccess }}
            style={{ width: 200, height: 200, transform: 'scale(2)' }}
            autoPlay
            loop
          />
          <Text style={{ ...styles.congratulationsHeader }}>{t("Congratulations")}</Text>
          <Text style={{ ...styles.congratulationsSubHeader }}>{t("YourProfilehasSuccessfullySubmitted")}</Text>
          <View style={{ ...styles.backgroundText }}>
            <Text style={{ ...styles.congratulationsAlert }}>{t("ProfileUnderReview")}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 15, backgroundColor: Colors.color_white }}>
        <ButtonLarge
          title={t("Backtohome")}
          onPress={goToBack}
          fillBtn={true}
          key={'Back to home'}
          showIcon={false}
          iconName=""
          paddingVertical={10}
          paddingHorizontal={10}
          fontSize={19}
          iconSize={19}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 5,
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  congratulationsHeader: {
    color: '#00C22F',
    fontSize: 26,
    fontFamily: Fonts.OpenSans600SemiBold
  },
  congratulationsSubHeader: {
    color: Colors.color_black,
    fontSize: 16,
    fontFamily: Fonts.OpenSans600SemiBold,
    marginTop: 10,
  },
  congratulationsAlert: {
    color: Colors.color_dark_gray,
    fontSize: 14,
    fontFamily: Fonts.OpenSans600SemiBold,
    textAlign: 'center'
  },
  backgroundText: {
    backgroundColor: '#EDEDED',
    padding: 10,
    width: 200,
    textAlign: 'center',
    borderRadius: 100,
    marginTop: 30
  }
});

export default BuildProfileSuccess;