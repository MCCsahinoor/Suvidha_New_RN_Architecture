import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ImageBackground, Image, Pressable, Keyboard, KeyboardAvoidingView, Platform, Dimensions, Linking, Alert, ScrollView } from 'react-native';
import InputBox from '../../components/phoneNumberInput';
import ButtonLarge from '../../components/ButtonLarge';
import { Colors, Fonts } from '../../themes';
import styles from './styles';
import * as utils from '../../utils';
import { UserLoginSendOTP, ValidateUserLoginOTP } from '../../services/Auth/auth.services';
// import { getHash, removeListener, startOtpListener, useOtpVerify} from 'react-native-otp-verify';
import { I_GET_USER_LOGIN, I_GET_USER_LOGIN_RESPONSE, I_GET_USER_OTP_RESPONSE, I_SEND_FOR_USER_OTP, } from '../../Interfaces/Auth.interface';
import { LOCAL_STORAGE_KEY } from '../../utils/localStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_STORAGE_SET } from '../../helper/LocalStorageHelper';
import { useDispatch } from 'react-redux';
import { setApiCallLoader } from '../../store/features/apiCallLoader/apiCallLoader';
import { useSelector } from 'react-redux';
import BottomSheet from '../../components/BottomSheet';
import { phoneNumberRegex } from '../../utils/regexList';
import { GetUserProfile } from '../../services/Profile/Profile.services';
import { setProfileData } from '../../store/features/userProfile/profileSlice';
import { executiveLoginCheckReducer } from '../../store/features/login/executiveLoginCheck';
import FourDigitInput from '../../components/OTPInputFieldCustom';
import { appLanguageCheckReducer } from '../../store/features/appLanguage/appLanguageChange';
import { useTranslation } from 'react-i18next';
import { setuserApplicableDepotCodeHandler } from '../../store/features/login/loginUserDepotData'; 
import { CommonToastModel } from '../../utils/ToastMessageModel';
import { Button } from 'react-native';
import CustomCheckbox from '../../components/CustomCheckbox';
import CustomBottomSheet from '../../components/CustomBottomSheet';

const LoginScreen = ({ navigation }: any) => {
  // FOR OTP BOTTOM SHEET
  const customBottomSheetTitle = '';
  const initialTimes = 5;
  // FOR OTP 4 DIGIT FINPUT FIELD
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileError, setMobileError] = useState(false);
  const [isKeyBoardOpen, setisKeyBoardOpen] = useState(false);
  const [time, setTime] = useState({ minutes: initialTimes, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const maximumCodeLength = 4;
  const dispatch = useDispatch(); 
  const [reset, setReset] = useState(false);
  const { t } = useTranslation();
  const [openOTPModel, setOpenOTPModel] = useState(false);
  //const phoneNumberRegex = /^[0-9]{10}$/;
  // useEffect(() => {
  //   navigation.dispatch(
  //     CommonActions.reset({
  //       index: 0,
  //       routes: [{ name: 'Login' }],
  //     })
  //   );
  // }, [])


  // AUTH SET FOR AUTH GURDS 
  const formatTime = (minutes: any, seconds: any) => {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
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

  // SMS AUTO READ BY USING HASKEYS STARTING
  const [getIsHakey, setIsHakey] = useState<any>('');
  useEffect(() => {
    dispatch(setApiCallLoader(false));

    // getHash()
    //   .then(hash => {
    //     setIsHakey(hash[0]);
    //   })
    //   .catch(console.log);

    // startOtpListener(message => {
    //   console.log(message);
    // });
    // return () => removeListener();
  }, []);
  // SMS AUTO READ BY USING HASKEYS END

  // const getNumber = (val: string): void => {
  //   if (val.length === 10) {
  //     setMobileError(false);
  //     setMobileNumber(val);
  //   } else {
  //     setMobileError(true);
  //   }
  // };
  const getNumber = (val: string): void => {
    if (val.length === 10 && phoneNumberRegex.test(val)) {
      setMobileError(false);
      setMobileNumber(val);
    } else {
      setMobileError(false);
    }
  };

  const handleOtpChange = (otp: string) => {
    if (otp.length === 0) setOTPCode('');
  };

  const handleOtpComplete = (otp: string) => {
    // let stringOtp = otp.toString();
    setOTPCode(otp);
  };

  // VALIDATE MOBILE NUMBER
  // const validateNumber = (): void => {

  //   if (!mobileNumber) {
  //     setMobileError(true);
  //   } else if (!phoneNumberRegex.test(mobileNumber)) {
  //     setMobileError(true);
  //   } else {
  //     LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.UNATHORIZEFLAG, 0)
  //     UserLoginSendOTPApi(mobileNumber);
  //   }
  // };
  const validateNumber = (): void => {

    if (!mobileNumber) {
      setMobileError(true);
    } else if (!phoneNumberRegex.test(mobileNumber)) {
      setMobileError(true);
    } else {
      setMobileError(false);
      LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.UNATHORIZEFLAG, 0);
      UserLoginSendOTPApi(mobileNumber);
    }
  };



  const UserLoginSendOTPApi = async (mobileNumber: string): Promise<void> => {
    const jsonValue = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.DEVICEINFO);
    const localDevices = jsonValue != null ? JSON.parse(jsonValue) : null;
    let data: I_GET_USER_LOGIN = {
      mobile_no: mobileNumber,
      haskey: getIsHakey ? getIsHakey : '',
      device_uuid: localDevices.uuid,
      device_name: localDevices.deviceName,
      model: localDevices.model,
      platform: localDevices.platformOS,
      operating_system: localDevices.platformOS,
      os_version: localDevices.platformVersion,
      manufacturer: localDevices.manufacturer,
      web_view_version: '',
    };
    dispatch(setApiCallLoader(true));
    UserLoginSendOTP<I_GET_USER_LOGIN, I_GET_USER_LOGIN_RESPONSE>(data).then(response => {
      dispatch(setApiCallLoader(false));
      if (response && response.response_code === 1) {
        // SUCCESS MESSAGE
        setMobileError(false); 
        setOpenOTPModel(true);
        // CommonToastModel('success', response.response_message, 5000);
        setIsActive(true);
        setTime({ minutes: initialTimes, seconds: 0 });
      } else if (response && response.response_code === -1) {
        // IF USER LOGIN TO ANOTHER DEVICE 
        CommonToastModel('error', response.response_message, 5000);
      } else {
        // OTHERS MESSAGE 
        CommonToastModel('error', response.response_message, 5000);
      }
    }).catch(err => {
      dispatch(setApiCallLoader(false));
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  };

  // VALIDATE OTP
  // const bottomSheetForRepresentative = useRef<BottomSheet>(null);
  const validateOtp = async (): Promise<void> => {
    const jsonValue = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.DEVICEINFO);
    const localDevices = jsonValue != null ? JSON.parse(jsonValue) : null;
    const fcmToken: any = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.FCM_TOKEN);
    let data: I_SEND_FOR_USER_OTP = {
      mobile_no: mobileNumber,
      otp: otpCode,
      device_uuid: localDevices.uuid,
      device_name: localDevices.deviceName,
      model: localDevices.model,
      platform: localDevices.platformOS,
      operating_system: localDevices.platformOS,
      os_version: localDevices.platformVersion,
      manufacturer: localDevices.manufacturer,
      web_view_version: '',
      fcm_token: fcmToken && fcmToken.slice(1, -1),
    };
    // console.log(data);
    dispatch(setApiCallLoader(true));
    ValidateUserLoginOTP<I_SEND_FOR_USER_OTP, I_GET_USER_OTP_RESPONSE>(data).then(response => {
      dispatch(setApiCallLoader(false)); 
      if (response && response.response_code === 1) {
        closeOTPModel()
        if (response && response.user_group_code.toLowerCase() !== 'representative') {
          LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.EXECUTIVE_LOGIN, 'painter');
          LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.TOKEN, response.access_token);
          LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.REFRESH_TOKEN, response.refresh_token);
          LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.LANGUAGE_SELECT, response.user_applicable_lang_code);
          dispatch(appLanguageCheckReducer(response.user_applicable_lang_code))
          dispatch(executiveLoginCheckReducer({ IsRepresentative: 'N', UserGroupCode: response.user_group_code }));
          dispatch(setuserApplicableDepotCodeHandler(response.virtual_user_depot_code))
          setMobileNumber('');
          setOTPCode('');
          setTime({ minutes: initialTimes, seconds: 0 });
          setIsActive(false);
          if (response.user_applicable_lang_code !== '') {
            GetUserProfileCheck();
          } else {
            navigation.replace('language');
          }
        } else {
          onPressClose()
          LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.TOKEN, response.access_token);
          LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.REFRESH_TOKEN, response.refresh_token);
          dispatch(executiveLoginCheckReducer({ IsRepresentative: 'Y', UserGroupCode: response.user_group_code }));
          LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.LANGUAGE_SELECT, 'en');
          dispatch(appLanguageCheckReducer('en'))
          navigation.navigate('ExecutiveLogin');
        }
      } else if (response && response.response_code === -2) {
        LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.LANGUAGE_SELECT, 'en');
        dispatch(appLanguageCheckReducer('en'))
        navigation.navigate('PainterRegistration', { phoneNumber: mobileNumber });
        // CommonToastModel('error', response.response_message, 5000);
        closeOTPModel()
      } else if (response && response.response_code === -4) {
        navigation.navigate('RegistrationProgress');
        closeOTPModel()
      } else if (response && response.response_code === -1) {
        CommonToastModel('error', response.response_message, 5000);
        // setTimeout(() => {
        //   closeOTPModel()
        // }, 5050);
      } else {
        CommonToastModel('error', response.response_message, 5000);
        setTimeout(() => {
          closeOTPModel()
        }, 5050);
      }
    }).catch(err => {
      dispatch(setApiCallLoader(false));
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  };

  const closeOTPModel = () => {
    setOpenOTPModel(false)
  }


  useEffect(() => {
    let interval: string | number | any;

    if (isActive && time.minutes >= 0 && time.seconds >= 0) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime.seconds === 0) {
            if (prevTime.minutes === 0) {
              // Timer reached 0, stop the timer
              setIsActive(false);
              clearInterval(interval);
              return prevTime;
            } else {
              // Decrease minutes and set seconds to 59
              return { minutes: prevTime.minutes - 1, seconds: 59 };
            }
          } else {
            // Decrease seconds
            return { ...prevTime, seconds: prevTime.seconds - 1 };
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Cleanup the interval when the component unmounts or when isActive changes
    return () => clearInterval(interval);
  }, [isActive, time]);

 

  // API CALL CHECK IF API CALL START THEN BUTTON DESABLED
  const isAPICall = useSelector((state: any) => state.apiCallLoader);

  const onPressClose = () => {
    setOTPCode('')
    setOpenOTPModel(false)
  };


  // GET USER PROFILE THEN REDIRECT TO HOME PAGE
  const GetUserProfileCheck = () => {
    dispatch(setApiCallLoader(true));
    GetUserProfile().then((response: any) => {
      dispatch(setApiCallLoader(false));
      if (response && response.data && response.data.length > 0) {
        dispatch(setProfileData(response.data));
        navigation.replace('Home');
      } else {
        navigation.replace('Home');
      }
    }).catch(err => {
      dispatch(setApiCallLoader(false));
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  }


  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled' style={{ backgroundColor: 'white' }}>
        <View style={{ backgroundColor: 'white' }}>
          <View style={{ ...styles.container }}>
            <ImageBackground style={styles.loginBg} source={require('../../assets/images/loginBg.png')}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.hederMain}>
                  {t("VerifyYour")} {'\n'}{t("PhoneNumber")}{' '}
                </Text>
                <Text style={styles.subHederMain}>
                  {t("OtpSendTextSubHead")}
                </Text>
              </View>
              <Image style={{ width: utils.Scale.getWindowDimensions().width, ...styles.curve }} source={require('../../assets/images/curve1.png')} />
            </ImageBackground>

            <View style={{ paddingHorizontal: 20 }}>
              <InputBox
                keyboardType="numeric"
                label={t("EnterRegisteredMobileNumber")}
                showLabel={true}
                showPlaceholder={false}
                countryFlag={true}
                placeholder=""
                key={'mobileNumber'}
                onChange={(val: string) => { setMobileNumber(val); getNumber(val); }}
                maxLength={10}
              />
              {mobileError && (
                <Text style={{ color: 'red', fontSize: 11, marginTop: 2, fontFamily: Fonts.poppins400Regular, textAlign: 'right' }}> {t("EnterRegisteredMobileNumberError")} </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15 }}>
        {/* {!isKeyBoardOpen && (
          <> */}
        <ButtonLarge
          title={t("SendOTP")}
          onPress={validateNumber}
          fillBtn={true}
          key={'sendOTP'}
          showIcon={false}
          iconName=""
          paddingVertical={10}
          paddingHorizontal={10}
          fontSize={19}
          iconSize={19}
          isAPICall={isAPICall}
          disabled={mobileNumber.length !== 10 || mobileError || isAPICall}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: -5 }}>
          <View style={{ marginTop: -5 }}> 
            <CustomCheckbox
              checked={true}
              onToggle={(checked) => {}}
              label=""
              size={25}
              disabled={true}
              checkedColor={Colors.ui_light_bg}
              checkmarkColor={Colors.color_black} 
              labelPosition="right"
            />
          </View>
          <Text style={{
            fontSize: 10,
            color: Colors.color_black,
            fontFamily: Fonts.OpenSans500Medium,
            textAlign: 'left',
            flexWrap: 'wrap',
            width: '90%',
            marginBottom: 5,
            marginLeft: 5
          }}>
            {t("ByprovidingmyphonenumberIagreetothe")}
            {' '}
            <Text
              style={{
                color: 'blue',
                textDecorationLine: 'underline',
                marginLeft: 3,
              }}
              onPress={() => Linking.openURL('https://www.bergerpaints.com/about-us/policies/terms-conditions')}
            >
              {t("TermsofService")}
            </Text>
            {` ${t("and")} `}
            <Text
              style={{
                color: 'blue',
                textDecorationLine: 'underline',
                marginLeft: 3,
              }}
              onPress={() => Linking.openURL('https://www.bergerpaints.com/about-us/policies/privacy-policy')}
            >
              {t("PrivacyPolicy")}
            </Text>
            {` ${t("oftheSuvidhaapp")}`}
          </Text>
        </View>
        {/* </>
        )} */}
      </View>

      {/* // OTP MODEL // */}
      <CustomBottomSheet
        isVisible={openOTPModel}
        onClose={onPressClose}
        sheetTitle={customBottomSheetTitle}
        hideCloseButton={true}
      >
        <View style={styles.centerContent}>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
            <View style={styles.centerLogo}>
              <Image style={styles.smslogo} source={require('../../assets/images/smsLogo.png')} />
            </View>
            <Text style={styles.otpHeader}>{t("OTPVerification")}</Text>
            <Text style={styles.otpSub}>
              {t("Enterthecodesenton")} {'******' + mobileNumber.slice(6)} {t("SMS/WhatsApp")}
            </Text>

            <Text style={styles.otpTimer}>
              {formatTime(time.minutes, time.seconds)}
            </Text>
            <Pressable style={styles.container} onPress={Keyboard.dismiss}> 
              <FourDigitInput onOtpChange={handleOtpChange} onOtpComplete={handleOtpComplete} onReset={reset} />
            </Pressable>
            <Text style={styles.resendText}>
              {t("IDidntReceiveAnyCode")} {' '}
              <Text style={styles.resendButton}
                onPress={() => {
                  setOTPCode('')
                  setReset(prev => !prev)
                  setTime({ minutes: initialTimes, seconds: 0 });
                  validateNumber();
                  dispatch(setApiCallLoader(false));
                }}>
                {t("RESEND")}
              </Text>
            </Text>

            <View style={{ backgroundColor: 'white', paddingHorizontal: 15 }}>
              {!isKeyBoardOpen && (
                <ButtonLarge
                  title={t("VerifyOTP")}
                  onPress={validateOtp}
                  fillBtn={true}
                  key={'sendOTP'}
                  showIcon={false}
                  iconName=""
                  paddingVertical={10}
                  paddingHorizontal={10}
                  fontSize={19}
                  iconSize={19}
                  isAPICall={isAPICall}
                  disabled={otpCode.length < 4 || isAPICall}
                />
              )}
            </View>
          </KeyboardAvoidingView>
        </View>
      </CustomBottomSheet>
    </>
  );
};


export default LoginScreen;


