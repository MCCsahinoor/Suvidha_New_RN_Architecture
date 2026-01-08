/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState, memo } from 'react';
import { RefreshControl, View, Text, ScrollView, Image, Pressable, Linking } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { setbottomSheetHandler } from '../../store/features/bottomSheetHandler/bottomSheetHandler';
import { setApiCallLoader } from '../../store/features/apiCallLoader/apiCallLoader';
import { setPullToRefresh } from '../../store/features/menu/pullToRefresh';
import { I_quick_links_data } from '../../Interfaces/menuData.interface';
import { UserGroupArr } from '../../utils/hierarchyLoginCheck';
import { setPageChangeCall } from '../../store/features/menu/pageChange';
import { EsamLogingTokenEntry } from '../../services/Auth/auth.services';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import DynamicShimmerPlaceholder from '../../utils/dynamicShimmerPlaceholder';
import QuickLinksLoader from '../../components/ScreensComponent/loader/quickLinksLoader';
import { CommonToastModel } from '../../utils/ToastMessageModel';
import { Platform } from 'react-native';
import { AppImages } from '../../themes';
import HomePageBannerSlider from '../../components/HomePageSlider';

const HomeQuickLinks = ({ navigation }: any) => {
  // const navigateToBuildYourProfile = (): void => {
  //   navigation.navigate('BuildYourProfileScreen');
  // };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setApiCallLoader(false));
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const { t } = useTranslation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: true }));
    dispatch(setPageChangeCall(false))
  }, []);
  const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
  const [getExecutiveLogin, setExecutiveLogin] = useState('');

  // GET PROFILE DATA FROM STORE
  const userProfileData = useSelector((state: any) => state.userProfileData);
  const [painterProfileData, setPainterProfileData] = useState<any>([]);
  const [errors, setErrors] = useState<any>('')
  const handleError = (index: number) => {
    const newErrors = [...errors];
    newErrors[index] = true;
    setErrors(newErrors);
  };
  useEffect(() => {
    if (userProfileData && userProfileData.length > 0) {
      setPainterProfileData(userProfileData)
    } else {
      setPainterProfileData([])
    }
  }, [userProfileData]);

  useEffect(() => {
    if (executiveLoginCheck) {
      setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
    }
  }, [executiveLoginCheck]);

  // IF BUILD YOUR PROFILE APPLICABLE THEN ACCRESS BUILD YOUR PROFILE, ELSE SHOWING APPLICABLE MSG. 
  function buildTourProfile() {
    if (userProfileData) {
      if (painterProfileData && painterProfileData[0].build_your_profile_applicable_yn.toLowerCase() != 'n') {
        if (painterProfileData[0].view_painter_cv_yn.toLowerCase() == 'n') {
          navigation.navigate('BuildYourProfile')
        } else {
          // navigation.navigate('PainterCVCard')
          dispatch(setbottomSheetHandler({ modelAction: true, modelName: 'BYP', }))
          // autoClose()
        }
      } else {
        CommonToastModel('error', painterProfileData[0].build_your_profile_applicable_msg, 5000);
      }
    };
  }

  // ALL QUICK LINKS 
  const { quickLinks, status, error } = useSelector((state: any) => state.quickLinksMenu);


  // OPEN MY COLOR APP
  const openMyColorApp = () => {
    const urlAndroid = 'https://play.google.com/store/apps/details?id=com.bergervis';
    const urlIOS = "https://apps.apple.com/in/app/berger-my-colour/id6448659259"
    Linking.openURL(Platform.OS === 'ios' ? urlIOS : urlAndroid);
  };

  // OPEN ESAMBANDH
  const openeSambandh = () => {
    if (Platform.OS === 'android') {
      EsamLogingTokenEntry<any, any>().then(response => {
        console.log("response", response)
        if (response && response.response_code === 1) {
          let eSamOpenUrl = `https://buyer.shop.bergerpaints.com/landing?token=` + response.token
          // let eSamOpenUrl = `https://testesambuyer.bergerpaints.com/landing?token=` + response.token
          console.log(eSamOpenUrl)
          Linking.openURL(eSamOpenUrl);
        } else {
          CommonToastModel('error', i18n.t('UnableToLoginPleaseTryAgain'), 5000);
        }
      }).catch(err => {
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
      });
    } else {
      const urlIOS = "https://apps.apple.com/us/app/esambandh/id6477482052"
      Linking.openURL(urlIOS);
    }

  }

  const openPage = (link: string) => {
    console.log("aaaaaaaaaaaaaaaaaaaa", link)
    navigation.navigate(link)
  }


  const goToQuickLinks = (link: string) => {
    if (link) {
      if (link == 'BuildYourProfile') {
        buildTourProfile();
      } else if (link == 'MyColour') {
        openMyColorApp();
      } else if (link == 'eSambandh') {
        openeSambandh()
      }
        // else if (link == 'LeadsInfo') {
      //   // dispatch(setbottomSheetHandler({ modelAction: true, modelName: 'Leads info' }))
      //   navigation.navigate('LeadsInfo') 
      // }
      // else if (link == 'ScanToken') {
      //   dispatch(setbottomSheetHandler({ modelAction: true, modelName: 'Scan Token', }))
      // }
      else if (link == 'VisitMeetQR') {
        if (UserGroupArr.includes(getExecutiveLogin.toLowerCase())) {
          CommonToastModel('error', i18n.t('ApplicableForPainterOnly'), 5000);
        } else {
          dispatch(setbottomSheetHandler({ modelAction: true, modelName: 'VisitMeetQR', }))
          autoClose()
        } 
      } else { 
        openPage(link)
      }
    }
  }


  const autoClose = () => {
    setTimeout(() => {
      dispatch(setbottomSheetHandler({}));
    }, 2000);
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: '#F2F2F2' }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{ ...styles.container }}>
          <View style={styles.quickLinksCards}>

            {status === 'succeeded' && quickLinks.map((doc: I_quick_links_data, index: number) => {
              const isDisabled = doc.menu_name === "Visit/Meet QR" && UserGroupArr.includes(getExecutiveLogin.toLowerCase());

              return (
                <View style={{ width: '48%' }} key={index}>
                  <Pressable
                    onPress={() => {
                      if (!isDisabled) {
                        goToQuickLinks(doc.mobile_link);
                      } else {
                        CommonToastModel('error', i18n.t("ApplicableForPainterOnly"), 5000);
                      }
                    }}
                  >

                    <View style={styles.cardQuickLInks}>
                      <View style={styles.quickLinksIcons}>
                        <View style={styles.iconContainer}>
                          {errors[index] ? (
                            <Image
                              source={{ uri: AppImages.NoImagesAvailable }}
                              style={{ width: 45, height: 45, resizeMode: 'contain', }}
                            />
                          ) : (
                            <Image
                              style={{ width: 45, height: 45, resizeMode: 'contain', }}
                              source={{ uri: doc.icon }}
                              onError={() => handleError(index)}
                            />
                          )}
                        </View>
                      </View>
                      <Text
                        style={[styles.title, { color: isDisabled ? 'gray' : 'black' }]}
                        numberOfLines={1}
                      >
                        {doc.menu_name}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              );
            })}


            {status === 'loading' && (
              <QuickLinksLoader />
            )}
          </View>

          <View style={{ marginBottom: 20 }}>
            <HomePageBannerSlider />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default memo(HomeQuickLinks);


