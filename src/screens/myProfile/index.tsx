import React, { useEffect, useState, memo, useRef } from 'react';
import { View, Image, Text, ScrollView, Pressable, Platform, PermissionsAndroid } from 'react-native';
import { Colors } from '../../themes';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomTabBar from '../../components/CustomTabBar';
import MyProfileForm from '../../components/ScreensComponent/MyProfile/ProfileForm';
import KycInfo from '../../components/ScreensComponent/MyProfile/KYCInfo';
import Certificate from '../../components/ScreensComponent/MyProfile/Certificate';
import { useDispatch, useSelector } from 'react-redux';
import CameraOption from '../../components/CameraOptionSheetModel';
import ButtonLarge from '../../components/ButtonLarge';
import { I_GET_LANGUAGE } from '../../Interfaces/language.interface';
import { GetLanguageList } from '../../services/Language/language.services';
import styles from './styles';
import BottomSheet from '../../components/BottomSheet';
import { setpreferredLanguage } from '../../store/features/languageSlice/preferredLanguageSlice';
import { setbottomSheetHandler } from '../../store/features/bottomSheetHandler/bottomSheetHandler';
import { setuserProfileLanguageData } from '../../store/features/userProfile/userProfileLanguageSlice';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { CommonToastModel } from '../../utils/ToastMessageModel';
import CustomBottomSheet from '../../components/CustomBottomSheet';

const Tab = createMaterialTopTabNavigator();

const MyProfile = ({ route }: any) => {
  const dispatch = useDispatch();
  const [languageError, setLanguageError] = useState('');
  const [langList, setLangList] = useState<any[]>([]);
  const LanguageListLov = useSelector((state: any) => state.preferredLanguageData);
  const userProfileData = useSelector((state: any) => state.userProfileData);
  const bottomSheetHandler = useSelector((state: any) => state.bottomSheetHandler);
  const { t } = useTranslation();
  const [hasPermission, setHasPermission] = useState(false);
  const [selectedSwitchValue, setSelectedSwitchValue] = useState('Profile');
  const [bottomSheetLanguageModel, setBottomSheetLanguageModel] = useState(false);

  // LANGUAGE SELECTION START ******************************** 
  useEffect(() => {
    if (Object.keys(bottomSheetHandler).length != 0) {
      if (
        bottomSheetHandler.modelAction == true &&
        bottomSheetHandler.modelName == 'selectlanguage'
      ) {
        isChecking();
        setBottomSheetLanguageModel(true);
      }
      else {
        setBottomSheetLanguageModel(false);
      }
    } else {
      setBottomSheetLanguageModel(false);
    }
  }, [bottomSheetHandler]);


  // IF LANGUAGE LOV IS STORE IS REDUX PERSIST THEN API NOT CALLING
  useEffect(() => {
    if (LanguageListLov.length == 0) {
      GetApplicableLanguageList();
      setLangList(LanguageListLov)
    } else {
      setLangList(LanguageListLov)
    }
  }, [LanguageListLov]);

  // LANGUAGE LOV API IS CALLING
  const GetApplicableLanguageList = async (): Promise<void> => {
    GetLanguageList<any, I_GET_LANGUAGE.Root>().then(response => {
      if (response && response.data && response.data.length > 0) {
        response.data.map((lang: any) => {
          lang.isSelected = false;
        });
        dispatch(setpreferredLanguage(response.data));
      }
    }).catch(err => {
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  };

  // TOGGLALE LANGUAGE SELECT
  const getLang = (index: any): void => {
    const copylangList = JSON.parse(JSON.stringify(langList))
    const updatedLanguageData = copylangList.map((lang: any, i: number) => {
      if (i == index) lang.isSelected = !lang.isSelected;
      return lang;
    });
    setLangList(updatedLanguageData);
  };

  // CHECK LANG IS ALREADY SUBMITTED OR NOT
  // const isChecking = () => {
  //   if (userProfileData && userProfileData.length > 0 && LanguageListLov && LanguageListLov.length > 0) {
  //     let xx = LanguageListLov.filter((items: any) => {
  //       return items.isSelected === true
  //     })
  //     if (xx.length > 0) {
  //       // console.log("xx", xx)
  //       const copylangListNew = JSON.parse(JSON.stringify(LanguageListLov))
  //       setLangList(copylangListNew);
  //     } else {
  //       // console.log("userProfileData", userProfileData[0].language)
  //       const segmentsArray = userProfileData[0].language.split(',');
  //       const copylangList = JSON.parse(JSON.stringify(LanguageListLov))
  //       const updatedLanguageData = copylangList.map((lang: any) => {
  //         // lang.isSelected = segmentsArray.includes(lang.lang_desc || lang.lang_code) ? true : false;
  //         lang.isSelected = segmentsArray.includes(lang.lang_code) ? true : false;
  //         return lang;
  //       });
  //       setLangList(updatedLanguageData);
  //     }
  //   }

  // }
  const isChecking = () => {
    const selectedLangFromForm = bottomSheetHandler?.selectedLanguage;

    if (LanguageListLov && LanguageListLov.length > 0) {
      const updatedLanguageData = LanguageListLov.map((lang: any) => {
        lang.isSelected = false;

        if (selectedLangFromForm) {
          const selectedArray = selectedLangFromForm.split(',').map((s: string) => s.trim());
          lang.isSelected = selectedArray.includes(lang.lang_code) || selectedArray.includes(lang.lang_desc);
        }

        return lang;
      });
      setLangList(updatedLanguageData);
    }
  };



  const finalLanguageSubmit = () => {
    let count = langList.filter(lang => lang.isSelected).length;
    console.log(count)
    if (count > 0 && count <= 3) {
      let selectedLanguages = langList.filter(lang => lang.isSelected);
      let arr;
      arr = selectedLanguages.map((langs: any) => langs.lang_desc).join(',');
      dispatch(setuserProfileLanguageData(arr));
      setLanguageError("")
      closeSheet()
    } else {
      setLanguageError(i18n.t('Maximum3languagesCanBeSelected'));
    }
  }

  // CLOSE LANG SHEET
  const closeSheet = (): void => {
    setBottomSheetLanguageModel(false);
    dispatch(setbottomSheetHandler({}));
  };
  // LANGUAGE SELECTION END ********************************

  useEffect(() => {
    requestContactPermission();
  }, []);

  const requestContactPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
    } else {
      setHasPermission(true);  // iOS permissions are handled automatically
    }
  };

  return (
    <>


      <View style={{ flex: 1 }}>
        <CustomTabBar
          defaultTrue={false}
          onPress={(value: string) => {
            setSelectedSwitchValue(value);
          }}
          boxheight={35}
          fontSize={12}
          disabled={false}
          options={[
            { title: t("Profile"), value: 'Profile' },
            { title: t("KYC"), value: 'KYC' },
            { title: t("Certificate"), value: 'Certificate' },
          ]}
          selectedValue={selectedSwitchValue}
          bgColor={Colors.color_white}
          selectedItemBgColor={Colors.ui_dark_bg}
          selectedItemTextColor={Colors.color_white}
          otherItemTextColor={Colors.ui_light_bg}
          paddingHorizontal={10}
          headerCurveColor={'#fff'}
        />

        {selectedSwitchValue === 'Profile' && <View style={{ flex: 1 }}><MyProfileForm /></View>}
        {selectedSwitchValue === 'KYC' && <KycInfo />}
        {selectedSwitchValue === 'Certificate' && <Certificate />}
      </View>

      <CameraOption />

      <CustomBottomSheet
        isVisible={bottomSheetLanguageModel}
        onClose={() => closeSheet()}
        sheetTitle={t("SelectLanguage")}
        hideCloseButton={true}
      >
        <React.Fragment>
          {languageError && (
            <Text style={[styles.errorLang]}>{languageError}</Text>
          )}
          <ScrollView style={{ backgroundColor: 'white', marginTop: 2 }}>
            <View style={styles.languageList}>
              {langList &&
                langList.length > 0 &&
                langList.map((item: any, index: number) => (
                  <View key={index} style={{ width: '50%' }}>
                    <Pressable
                      // index={index}
                      onPress={() => {
                        getLang(index);
                      }}>
                      <View
                        style={[styles.langCard, { borderColor: item.isSelected ? Colors.ui_dark_bg : Colors.color_light_gray, borderWidth: item.isSelected ? 1 : 0.9 }]}>
                        <View style={{ width: '100%' }}>
                          {item.isSelected && (
                            <Image style={[styles.isCheck]} source={require('../../assets/images/checkmark-circle-01.png')} />
                          )}
                          <Text style={[styles.title]} numberOfLines={1}>
                            {item.lang_desc}
                          </Text>
                          <Text style={[styles.subTitle]} numberOfLines={1}>
                            {item.lang_translated_desc}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  </View>
                ))}
            </View>
          </ScrollView>
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{ width: '49%' }}>
              <ButtonLarge
                onPress={() => closeSheet()}
                title={t("Cancel")}
                fillBtn={false}
                key={'Submit'}
                showIcon={false}
                iconName=""
                paddingVertical={7}
                paddingHorizontal={5}
                fontSize={15}
                iconSize={19}
              />
            </View>
            <View style={{ width: '49%' }}>
              <ButtonLarge
                onPress={() => finalLanguageSubmit()}
                title={t("Submit")}
                fillBtn={true}
                key={'Submit'}
                showIcon={false}
                iconName=""
                paddingVertical={7}
                paddingHorizontal={5}
                fontSize={15}
                iconSize={19}
              />
            </View>
          </View>
        </React.Fragment>
      </CustomBottomSheet>
    </>
  );
};

export default MyProfile;
