import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Image, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { AppImages, Colors, Fonts } from '../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { setSurfectPaintingDtlsHandler } from '../store/features/PrivateSiteHandler/surfectPaintingDtlsHandler';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native'; 
import { setDateRangeSlice } from '../store/features/DatePicker/dateRangePicker';
import { useTranslation } from 'react-i18next';


const CustomHeaderWithBack = ({ header, title, navigation, noOtherOption }: any) => {
  const dispatch = useDispatch();
  const visitRunningCount = useSelector((state: any) => state.holdRunningVisit);
  const { t } = useTranslation();
  // const navigation = useNavigation();
  const handleBack = () => {
    // IF NAVIGATION HISTORY FOUND THEN RESET QUOTATION DETAILS 
    // const previousScreenName = navigation?.getState()?.routes[navigation?.getState()?.index]?.name;
    // console.log("previousScreenName", previousScreenName)
    // const previousScreenParams = navigation?.getState()?.routes[navigation?.getState()?.index]?.params?.responseData;
    // if (previousScreenName == 'QuotationBuilder' && (previousScreenParams == 'Expert_Cont_Lead' || previousScreenParams == 'XPA_Lead')) {
    //   console.log(">>>>>>>>>>>>>>>>>>>>>")
    //   dispatch(setSurfectPaintingDtlsHandler([]))
    // }

    dispatch(setDateRangeSlice({ startDate: '', endDate: '' }))
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const goToHome = () => {
    dispatch(setDateRangeSlice({ startDate: '', endDate: '' }))
    if (navigation.canGoBack()) {
      navigation.pop(1);
    }
    navigation.replace('Home')
  }

  return (
    <View>
      <LinearGradient colors={['#36686D', '#84A2A5']} useAngle={true} angle={90} > 
          <View style={{ ...styles.headerContainer, paddingTop: Platform.OS === 'android' ? 50 : 0, }}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}>
              <TouchableOpacity onPress={handleBack} style={{ marginRight: 1 }}>
                <Ionicons name="chevron-back-outline" size={30} color={Colors.color_white} />
              </TouchableOpacity>
              <Text style={styles.pageTitle} numberOfLines={1}>{t(title)}</Text>
            </View>

            {title !== 'Help Desk' && (
              <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 5 }}>
                {
                  visitRunningCount.isVisitRunning && (
                    <Pressable onPress={() => navigation.navigate('VisitRunning', { details: visitRunningCount.details })}>
                      <View>
                        <LottieView
                          source={{ uri: AppImages.LottyVisitRunning }}
                          style={{ width: 40, height: 40 }}
                          autoPlay
                        />
                      </View>
                    </Pressable>
                  )
                }
                {!noOtherOption && (
                  <>
                    <Pressable style={{ paddingRight: 10 }} onPress={goToHome}>
                      <Ionicons name="home-outline" size={25} color={Colors.color_white} />
                    </Pressable>
                    <Pressable style={{ paddingRight: 10 }} onPress={() => navigation.navigate('HelpDesk')}>
                      <Image
                        source={require('../assets/images/support.png')}
                        style={{ height: 25, width: 30, resizeMode: 'contain' }}
                      />
                    </Pressable>
                  </>
                )}

              </View>

            )}
          </View> 
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 10,
    paddingBottom: 18,
    // paddingTop: 43,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pageTitle: {
    color: Colors.color_white,
    fontSize: 16,
    fontFamily: Fonts.OpenSans600SemiBold,
    // width: '59%'
  }
});

export default memo(CustomHeaderWithBack);
