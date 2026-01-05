/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import NestedDrawerMenu from './NestedDrawerMenu'; 
import { Colors, Fonts } from '../themes';
// import DropDownPicker from 'react-native-dropdown-picker'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { UserGroupArr } from '../utils/hierarchyLoginCheck';
import { LOCAL_STORAGE_SET } from '../helper/LocalStorageHelper';
import { LOCAL_STORAGE_KEY } from '../utils/localStorageKeys';
import { appLanguageCheckReducer } from '../store/features/appLanguage/appLanguageChange';
import { DELETE_LOV_ALL, I_GET_FOR_LANGUAGE_SET, I_GET_LANGUAGE, I_SEND_FOR_LANGUAGE } from '../Interfaces/language.interface';
import { AppApplicableLanguag, UpdateUserApplicableLanguag } from '../services/Language/language.services'; 
import { CommonToastModel } from '../utils/ToastMessageModel';
import { GetDeleteAccountFlagIos } from '../services/Auth/auth.services';
import ProfileCard from './profileCard';
import SingelSelectdropdownWithLocalSearch from './SingelSelectdropdownWithLocalSearch';

const CustomDrawer = (props: any) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('en');
  const [label, setLabel] = useState('English');
  const [items, setItems] = useState<any>([]);
  const [isFocus, setIsFocus] = useState(false);

  const userProfileData = useSelector((state: any) => state.userProfileData);
  const dispatch = useDispatch()
  const virtualuserProfileData = useSelector((state: any) => state.virtualUser);
  const [name, setName] = useState('?');
  const [profileImage, setProfileImage] = useState('');
  const [number, setNumber] = useState();
  const navigation = useNavigation<any>();
  const deviseDetails = useSelector((state: any) => state.deviseDetails);
  const [getDeviseVersion, setDeviseVersion] = useState('');

  const [iosDeleteYN, setIosDeleteYN] = useState(false);

  useEffect(() => {
    if (!UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && userProfileData && userProfileData.length > 0) {
      setName(userProfileData[0]['painter_name']);
      // setProfileImage(userProfileData[0]['user_img']);
      setProfileImage(userProfileData[0]['profile_pic']);
      setNumber(userProfileData[0]['painter_mobile']);
    }

    if (UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && virtualuserProfileData && Object.keys(virtualuserProfileData).length > 0) {
      setName(virtualuserProfileData['login_user_first_name'] + ' ' + virtualuserProfileData['login_user_last_name']);
      setProfileImage('');
      setNumber(virtualuserProfileData['login_user_mobile_number']);
    }
  }, [userProfileData, virtualuserProfileData]);


  const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
  const [getExecutiveLogin, setExecutiveLogin] = useState('');
  useEffect(() => {
    if (executiveLoginCheck) {
      setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
    }
  }, [executiveLoginCheck]);

  useEffect(() => {
    if (deviseDetails) {
      setDeviseVersion(deviseDetails.version);
    }
  }, [deviseDetails]);

  const appApplicableLang = useSelector((state: any) => state.appApplicableLanguage);
  const appLanguage = useSelector((state: any) => state.appLanguageChange);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      GetDeleteAccountFlagCheck();
    } else {
      setIosDeleteYN(false);
    }
    if (appApplicableLang.length > 0) {
      const transformedArray = appApplicableLang.map((item: { lang_desc: any; lang_code: any; }) => ({
        label: item.lang_desc,
        value: item.lang_code
      }));
      setItems(transformedArray)
    } else {
      GetApplicableLanguageList()
    }
  }, [appApplicableLang])

  const GetApplicableLanguageList = async (): Promise<void> => {
    AppApplicableLanguag<any, I_GET_LANGUAGE.Root>()
      .then(response => {
        if (response && response.data && response.data.length > 0) {
          const transformedArray = response.data.map((item: { lang_desc: any; lang_code: any; }) => ({
            label: item.lang_desc,
            value: item.lang_code
          }));
          setItems(transformedArray)
        }
      })
  };

  const GetDeleteAccountFlagCheck = async (): Promise<void> => {
    GetDeleteAccountFlagIos<any, DELETE_LOV_ALL.RootDeleteLOV>()
      .then(response => { 
        if (response && response.data) {
          if (response.data.lov_value == 'Y') {
            setIosDeleteYN(true);
          }
          else {
            setIosDeleteYN(false);
          }
        }
      })
  };


  useEffect(() => {
    if ((appLanguage ?? '') != '') {
      setValue(appLanguage);
    }
  }, [appLanguage]);

  const changeUser = (): void => {
    navigation.navigate('ExecutiveLogin');
  }



  const applicableLanguag = (lang: string): void => {
    let data: I_SEND_FOR_LANGUAGE = {
      user_id: '',
      lang_code: lang,
    };
    UpdateUserApplicableLanguag<I_SEND_FOR_LANGUAGE, I_GET_FOR_LANGUAGE_SET>(data).then(response => {
      console.log(response);
    }).catch(err => {
      // console.log(err);
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  };


  const handlePress = () => {
    navigation.navigate('DeleteAccount');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <ImageBackground blurRadius={5} source={require('../assets/images/loginBg.png')} style={{ padding: 20, marginTop: -5, paddingHorizontal: 10, paddingTop: 60 }}>
        <ProfileCard fontColor={'white'} showRating={!UserGroupArr.includes(getExecutiveLogin.toLowerCase())} showVerify={true} name={name} profileImage={profileImage} number={number} respresentiveShow={true} />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, }}>
          <View style={{ borderBottomColor: '#9DB2B9', borderBottomWidth: 1, width: '100%', top: 16, position: 'absolute', }} />
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
            {UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && (
              <View style={{ width: 120, marginRight: 10, marginTop: Platform.OS === 'android' ? -13 : 0 }}>
                <Pressable onPress={() => { changeUser() }} style={{ backgroundColor: Colors.button_dark_bg, paddingVertical: 6.2, borderRadius: 10 }}>
                  <Text style={{ textAlign: 'center', color: 'white', fontFamily: Fonts.poppins500Medium, fontSize: 13 }}>Change User</Text>
                </Pressable>
              </View>
            )}
            <View style={{ width: 120, marginTop: -15 }}>
              <SingelSelectdropdownWithLocalSearch
                optionData={items}
                showLabel={false}
                label={''}
                showPlaceholder={true}
                placeholder={isFocus ? 'Select' : 'Select'}
                defaultValue={value}
                selectedValue={(item: any) => {
                  applicableLanguag(item.value);
                  dispatch(appLanguageCheckReducer(item.value));
                  setValue(item.value);
                  setLabel(item.label);
                  setIsFocus(false);
                  LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.LANGUAGE_SELECT, item.value);
                  props.navigation && props.navigation.closeDrawer();
                }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
      <DrawerContentScrollView {...props}>

        <View style={{ flex: 1, marginTop: -20 }}>
          <NestedDrawerMenu />
          {iosDeleteYN && (
            <Pressable onPress={() => handlePress()}
              style={{
                padding: 10,
                paddingRight: 10,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
                margin: 10
              }}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 2,
                }}>
                <Image source={require('../assets/images/trash-bin.png')} style={{
                  width: 25,
                  height: 25,
                  marginRight: 10,
                  resizeMode: 'contain',
                }} />
                <Text
                  style={{ color: Colors.color_black, fontFamily: Fonts.OpenSans600SemiBold }}>
                  Delete Account
                </Text>
              </Pressable>
            </Pressable>
          )}

        </View>

      </DrawerContentScrollView>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 14, fontFamily: Fonts.OpenSans600SemiBold, textAlign: 'center', color: Colors.color_dark_gray }}>
          App Version: {getDeviseVersion}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color: Colors.color_gray,
    fontSize: 14,
    fontFamily: Fonts.OpenSans600SemiBold
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: Fonts.OpenSans600SemiBold
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: Fonts.OpenSans600SemiBold
  },
  itemContainerStyle: {
    padding: 0,
    borderColor: Colors.color_semi_dark_gray,
    borderWidth: 1,
    margin: 0,
    fontFamily: Fonts.OpenSans600SemiBold
  },
  itemContainerInnerStyle: {
    maxHeight: 'auto',
    fontFamily: Fonts.OpenSans600SemiBold
  },
});

export default CustomDrawer;
