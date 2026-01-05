/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, ImageBackground, Text, ActivityIndicator, Keyboard, Pressable } from 'react-native';
import styles from './styles';
import InputFields from '../../components/inputField';
import { I_GET_USER_OTP_RESPONSE, I_SEND_PAINTER_LOGIN_DATA, I_SEND_PAINTER_SEARCH_DATA, PAINTER_LIST_DATA_ALL, } from '../../Interfaces/Auth.interface';
import { PainterSearch, ValidatePainterChangeLoginFromVirtualUser } from '../../services/Auth/auth.services';
import { useDispatch, useSelector } from 'react-redux';
import { setApiCallLoader } from '../../store/features/apiCallLoader/apiCallLoader';
import InitialAvatar from '../../components/InitialAvatar';
import { LOCAL_STORAGE_KEY } from '../../utils/localStorageKeys';
import { LOCAL_STORAGE_SET } from '../../helper/LocalStorageHelper'; 
import { setvirtualUserData } from '../../store/features/userProfile/virtualUserData';
import ButtonLarge from '../../components/ButtonLarge';
import { GetUserProfile } from '../../services/Profile/Profile.services';
import { setProfileData } from '../../store/features/userProfile/profileSlice';
import { executiveLoginCheckReducer } from '../../store/features/login/executiveLoginCheck';
import { setuserApplicableDepotCodeHandler } from '../../store/features/login/loginUserDepotData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonToastModel } from '../../utils/ToastMessageModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoDataFound from '../../components/NoDataFound';

const ExecutiveLogin = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [bottomSheetData, setBottomSheetData] = useState<any>([]);
  const [isKeyBoardOpen, setisKeyBoardOpen] = useState(false);
  const isAPICall = useSelector((state: any) => state.apiCallLoader);
  const [virtualUserId, setvirtualUserId] = useState<string>('');

  // IF NAVIGATION HISTORY FOUND THEN RESET NAVIGATION HISTORY
  const previousScreenName = navigation?.getState()?.routes[navigation?.getState()?.index - 1]?.name;
  console.log(previousScreenName)
  useEffect(() => {
    if (previousScreenName == 'Home') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'ExecutiveLogin' }], // Navigate to the Home screen after reset
      });
    }
  }, [previousScreenName]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setisKeyBoardOpen(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setisKeyBoardOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const getKeyWordValue = (val: any): void => {
    debouncedSearch(val);
  };

  const debouncedSearch = async (keyword: string): Promise<void> => {
    if (keyword.length > 0) {
      let data: I_SEND_PAINTER_SEARCH_DATA = {
        user_id: '',
        search_keyword: keyword,
      };
      dispatch(setApiCallLoader(true));
      PainterSearch<I_SEND_PAINTER_SEARCH_DATA, PAINTER_LIST_DATA_ALL.I_GET_PAINTER_LIST>(data).then(response => {
        dispatch(setApiCallLoader(false));
        if (response && response.data.length > 0) {
          setBottomSheetData(response.data);
        } else {
          setBottomSheetData([]);
        }
      }).catch(err => {
        dispatch(setApiCallLoader(false));
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
      });
    }
  }

  const virtualUser = (painterUserId: string, index: number): void => {
    setvirtualUserId(painterUserId)
  }



  const LoginVirtualUser = async () => {
    let _localrefreshToken: any = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
    let _refreshToken = _localrefreshToken?.slice(1, -1);

    if (virtualUserId) {
      let data: I_SEND_PAINTER_LOGIN_DATA = {
        session_id: '',
        painter_user_id: virtualUserId,
        refresh_token: _refreshToken,
      };
      dispatch(setApiCallLoader(true));
      ValidatePainterChangeLoginFromVirtualUser<I_SEND_PAINTER_LOGIN_DATA, I_GET_USER_OTP_RESPONSE>(data).then(response => {
        dispatch(setApiCallLoader(false));
        if (response && response.access_token && response.refresh_token) { 
          LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.TOKEN, response.access_token);
          LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.REFRESH_TOKEN, response.refresh_token);
          LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.LANGUAGE_SELECT, 'en');
          LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.PAINTER_ID, response.user_id);
          LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.EXECUTIVE_LOGIN, 'executive');
          dispatch(executiveLoginCheckReducer({ IsRepresentative: 'Y', UserGroupCode: response.user_group_code }));
          let virtual_user: any = {
            virtual_user_applicable_lang_code: response.virtual_user_applicable_lang_code,
            virtual_user_first_name: response.virtual_user_first_name,
            virtual_user_group_code: response.virtual_user_group_code,
            virtual_user_last_name: response.virtual_user_last_name,
            virtual_user_middle_name: response.virtual_user_middle_name,
            virtual_user_login: true,
            login_user_first_name: response.user_first_name,
            login_user_last_name: response.user_last_name,
            login_user_mobile_number: response.user_mobile_number,
          }

          dispatch(setuserApplicableDepotCodeHandler(response.virtual_user_depot_code))
          dispatch(setvirtualUserData(virtual_user));
          if (response.user_applicable_lang_code !== '') {
            // navigation.replace('Home');
            GetUserProfileCheck();
          } else {
            navigation.replace('language');
          }
        }
      }).catch(err => {
        dispatch(setApiCallLoader(false));
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
        // console.error(err);
      });
    } else {
      CommonToastModel('error', 'Please select painter', 5000);
    }
  };

  const CheckCanGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.pop(1)
    }
    navigation.replace('Home');

  }

  // GET USER PROFILE THEN REDIRECT TO HOME PAGE
  const GetUserProfileCheck = () => {
    dispatch(setApiCallLoader(true));
    GetUserProfile().then(async (response: any) => {
      dispatch(setApiCallLoader(false));
      if (response && response.data && response.data.length > 0) {
        dispatch(setProfileData(response.data));
        CheckCanGoBack()
      } else {
        CheckCanGoBack()
      }
    }).catch(err => {
      dispatch(setApiCallLoader(false));
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  }

  return (
    <>
      <View style={{ backgroundColor: 'white' }}>
        <ImageBackground
          style={styles.loginBg}
          source={require('../../assets/images/loginBg.png')}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.hederMain}>Search Painter</Text>
            <Text style={styles.subHederMain}>
              Search Painter for Virtual login
            </Text>
          </View>
        </ImageBackground>
        <View style={{ marginHorizontal: 20, marginTop: -20, position: 'relative' }}>
          <InputFields
            isSearchIcon={true}
            showLabel={false}
            showPlaceholder={true}
            placeholder={'Search Keyword..'}
            onChange={(val: string) => {
              getKeyWordValue(val);
            }}
            keyboardType={'default'}
          />
          {isAPICall && (
            <ActivityIndicator
              style={styles.loaderApicall}
              size="small"
              color="#3F7A80"
            />
          )}
        </View>
      </View>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ ...styles.container }}>
          <View style={{ marginHorizontal: 15 }}>
            {bottomSheetData && bottomSheetData.length > 0 ? (
              bottomSheetData.map(
                (item: PAINTER_LIST_DATA_ALL.I_GET_PAINTER, index: number) => (
                  <View key={index} style={{ width: '100%' }}>
                    <Pressable onPress={() => virtualUser(item.user_id, index)}>
                      <View style={styles.listPainter}>
                        <View style={styles.innerlistPainter}>
                          <InitialAvatar
                            name={item.painter_name}
                            size={45}
                            fontSize={17}></InitialAvatar>
                          <View style={{ display: 'flex' }}>
                            <Text style={styles.listPainterName} ><Ionicons name="person-circle-outline" size={17} />{item.painter_name}</Text>
                            <Text style={styles.listPainterOthers}><Ionicons name="bookmark" size={10} /> {item.painter_code} </Text>
                            <Text style={styles.listPainterOthers}><Ionicons name="call" size={10} /> {item.painter_mobile} </Text>
                          </View>
                        </View>
                        {item.user_id == virtualUserId && (
                          <Image
                            style={[styles.isCheck]}
                            source={require('../../assets/images/checkmark-circle-01.png')}
                          />
                        )}
                      </View>
                    </Pressable>
                  </View>
                ),
              )
            ) : (
              <View style={{ marginTop: 20 }}>
                <NoDataFound content={'No painter found\nPlease search a valide painter'} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {virtualUserId && (
        <View style={{ backgroundColor: 'white', paddingHorizontal: 15 }}>
          {!isKeyBoardOpen && (
            <>
              <ButtonLarge
                title={'Login With Selected Painter'}
                onPress={LoginVirtualUser}
                fillBtn={true}
                key={'sendOTP'}
                showIcon={false}
                iconName=""
                paddingVertical={10}
                paddingHorizontal={10}
                fontSize={17}
                iconSize={19}
                isAPICall={isAPICall}
                disabled={isAPICall}
              />
            </>
          )}
        </View>
      )}

    </>
  );
};

export default ExecutiveLogin;
