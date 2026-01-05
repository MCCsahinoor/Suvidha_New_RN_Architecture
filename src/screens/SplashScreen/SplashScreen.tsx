import { useEffect, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Easing,
  Platform,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';  
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useDispatch, useSelector } from 'react-redux';
import { DeviceInformation } from '../../utils/deveiceInfo';
import { LOCAL_STORAGE_KEY } from '../../utils/localStorageKeys';
import { deviceInfoDataReducer } from '../../store/features/devicesInfo/deviseDetails';
import { GetAppVersion, GetAppVersionIos } from '../../services/Auth/auth.services';
import { CommonToastModel } from '../../utils/ToastMessageModel';
import { AppApplicableLanguag } from '../../services/Language/language.services';
import { setappApplicableLanguage } from '../../store/features/appLanguage/appApplicableLanguage';
import { LOCAL_STORAGE_REMOVE } from '../../helper/LocalStorageHelper';
import { executiveLoginCheckReducer } from '../../store/features/login/executiveLoginCheck';
import { GetUserProfile } from '../../services/Profile/Profile.services';
import { setProfileData } from '../../store/features/userProfile/profileSlice';
import { getWindowDimensions } from '../../utils/scale';
import { Colors, Fonts } from '../../themes';
import { store } from '../../store/app/store';
//import { getFCMToken, getMesseges } from '../../utils/FCMToken'; 
// import messaging from '@react-native-firebase/messaging';
// import Notifee, {
//   AndroidImportance,
//   AndroidVisibility,
// } from '@notifee/react-native';  

const SplashScreen = ({ navigation }: any) => {
  const virtualuserProfileData = useSelector((state: any) => state.virtualUser);
  // IF NAVIGATION HISTORY FOUND THEN RESET NAVIGATION HISTORY
  const previousScreenName = navigation?.getState()?.routes[navigation?.getState()?.index - 1]?.name;
  useEffect(() => {
    if (previousScreenName == 'Home') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SplashScreen' }], // Navigate to the Home screen after reset
      });
    }
  }, [previousScreenName]);

  const rotationDegree = useRef(new Animated.Value(0)).current;
  const zoomIn = useRef(new Animated.Value(0)).current;
  const durationMs = 1500;
  const durationTimeMs = 8000;
  const dispatch = useDispatch();
  const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
  const [statusUpdate, setStatusUpdate] = useState("Please Wait..")

  const startRotationAnimation = (
    durationMs: number,
    rotationDegree: Animated.Value,
  ): void => {
    Animated.loop(
      Animated.timing(rotationDegree, {
        toValue: 360,
        duration: durationMs,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const startZoomInAnimation = (
    durationTimeMs: number,
    zoomIn: Animated.Value,
  ): void => {
    Animated.loop(
      Animated.timing(zoomIn, {
        toValue: 100,
        duration: durationTimeMs,
        delay: 2500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { iterations: 1 },
    ).start();
  };

  useEffect(() => {
    startZoomInAnimation(durationTimeMs, zoomIn);
  }, [durationTimeMs, zoomIn]);

  useEffect(() => {
    startRotationAnimation(durationMs, rotationDegree);
  }, [durationMs, rotationDegree]);

  useEffect(() => {
    setStatusUpdate("Setting up your device...")
    DeviceInformation();
    setTimeout(() => {
      getDeviceInfo();
    }, 3000);
  }, []);

  // FCM PUSH NOTIFICATION START
  useEffect(() => {
    //fcmToken();
  }, []);

  useEffect(() => {
    subscribeToMessages();
  }, []);

  useEffect(() => {
    subscribeToMessagesForBackgroud();
  }, []);

  const subscribeToMessages = () => {
    // return messaging().onMessage(async (remoteMessage: any) => {
    //   console.log('Received FCM message:', remoteMessage);
    //   await Notifee.createChannel({
    //     id: 'default',
    //     name: 'Default Channel',
    //     importance: AndroidImportance.HIGH,
    //     visibility: AndroidVisibility.PUBLIC,
    //   });
    //   await Notifee.displayNotification({
    //     title: remoteMessage.notification.title,
    //     body: remoteMessage.notification.body,
    //     android: {
    //       channelId: 'default',
    //       importance: AndroidImportance.HIGH,
    //       visibility: AndroidVisibility.PUBLIC,
    //     },
    //   });
    // });
  };

  // const fcmToken = () => {
  //   getFCMToken().then((token: any) => {
  //     // console.log("token", token);
  //     LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.FCM_TOKEN, token);
  //   });
  // };

  const subscribeToMessagesForBackgroud = () => {
    // return messaging().setBackgroundMessageHandler(
    //   async (remoteMessage: any) => {
    //     await Notifee.createChannel({
    //       id: 'default',
    //       name: 'Default Channel',
    //       importance: AndroidImportance.HIGH,
    //       visibility: AndroidVisibility.PUBLIC,
    //     });
    //     await Notifee.displayNotification({
    //       title: remoteMessage.notification.title,
    //       body: remoteMessage.notification.body,
    //       android: {
    //         channelId: 'default',
    //         importance: AndroidImportance.HIGH,
    //         visibility: AndroidVisibility.PUBLIC,
    //       },
    //     });
    //   },
    // );
  };
  // FCM PUSH NOTIFICATION END


  const getDeviceInfo = async (): Promise<void> => {
    try {
      const jsonValue = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.DEVICEINFO);
      const localDevices = jsonValue ? JSON.parse(jsonValue) : null;
      dispatch(deviceInfoDataReducer(localDevices));
      if (localDevices) {
        const data = { Version: localDevices.buildNumber };
        const isAndroid = Platform.OS === 'android';
        setStatusUpdate("Setting up device...")
        handleAppVersionDetails(data, isAndroid);
      } else {
        setStatusUpdate("Device info not found in storage.")
        console.error("Device info not found in local storage.");
      }
    } catch (error) {
      setStatusUpdate("Error fetching device info")
      console.error("Error fetching device info:", error);
    }
  };

  const handleAppVersionDetails = async (data: { Version: string }, isAndroid: boolean): Promise<void> => {
    const getAppVersion = isAndroid ? GetAppVersion : GetAppVersionIos;
    getAppVersion(data).then((response: any) => {
      console.log("response", response)
      if (response && response.response_code == 1) {
        if ((response.data.vr_code ?? '') != '') {
          setStatusUpdate("New version available...")
          navigation.replace('NewVersion', { obsolete: response.data.vr_obsolete_yn });
        } else {
          checkLoginProfile();
        }
      }
    }).catch(err => {
      checkLoginProfile();
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  };

  const checkLoginProfile = async () => {
    const token = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
    const languageSelected = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_SELECT);
    if (token) {
      setStatusUpdate("Application language check...")
      AppApplicableLang()
      if (executiveLoginCheck.IsRepresentative.toLowerCase() === 'y' && !virtualuserProfileData) {
        commonLogoutFunction();
      } else {
        if (languageSelected === '') {
          navigation.replace('language');
        } else {
          setStatusUpdate("Profile checking...")
          GetUserProfileCheck();
        }
      }
    } else {
      setStatusUpdate("User validate successfully...")
      if (Platform.OS === 'android') {
        navigation.replace('Onbording');
      } else {
        navigation.replace('IOSOnboarding');
      }
    }
  }

  const AppApplicableLang = () => {
    AppApplicableLanguag().then((response: any) => {
      if (response && response.data && response.data.length > 0) {
        dispatch(setappApplicableLanguage(response.data));
      } else {
        dispatch(setappApplicableLanguage([]));
      }
    }).catch(err => {
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  }

  const commonLogoutFunction = () => {
    LOCAL_STORAGE_REMOVE();
    store.dispatch(executiveLoginCheckReducer({ IsRepresentative: '', UserGroupCode: '' }));
    if (Platform.OS === 'android') {
      navigation.replace('Onbording');
    } else {
      navigation.replace('IOSOnboarding');
    }
  };

  const GetUserProfileCheck = () => {
    GetUserProfile().then((response: any) => {
      if (response && response.data && response.data.length > 0) {
        setStatusUpdate("User validate Successfully...")
        dispatch(setProfileData(response.data));
        navigation.replace('Home');
      } else {
        navigation.replace('Home');
      }
    }).catch(err => {
      // navigation.replace('Home');
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  }



  return (
    <>
      {/* <ScrollView style={{ backgroundColor: 'white', }}> */}
      {/* <View style={{ paddingTop: 35 }}> */}
      <LinearGradient
        style={{
          height: getWindowDimensions().height,
          width: getWindowDimensions().width,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
        colors={[Colors.color_white, Colors.color_white]}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{ height: 100, width: 100, borderRadius: 40, zIndex: 9 }}
        />
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.zoomIn,
              {
                transform: [
                  {
                    scale: zoomIn.interpolate({
                      inputRange: [0, 360],
                      outputRange: [0, 360],
                    }),
                  },
                ],
              },
            ]}></Animated.View>
        </View>
        <View style={styles.container} accessibilityRole="progressbar">
          <View style={[styles.background, { borderColor: '#94B2B5' }]} />
          <Animated.View
            style={[
              styles.progress,
              { borderTopColor: '#fff' },
              {
                transform: [
                  {
                    rotateZ: rotationDegree.interpolate({
                      inputRange: [0, 360],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          />
          {/* <Button onPress={handlePress} title="Click me" />  */}
        </View>
      </LinearGradient>
      <View style={{ position: 'absolute', width: '100%', bottom: 20 }}>
        <Text style={{ textAlign: 'center', fontFamily: Fonts.poppins500Medium, color: Colors.ui_dark_bg }}>{statusUpdate}</Text>
      </View>
      {/* </View>
      </ScrollView> */}
    </>
  );
};

const height = 120;
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#281034',
  },
  container: {
    width: height,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: height / 2,
    borderWidth: 6,
  },
  progress: {
    width: '100%',
    height: '100%',
    borderRadius: height / 2,
    borderLeftColor: 'rgba(52, 52, 52, 0.1)',
    borderRightColor: 'rgba(52, 52, 52, 0.1)',
    borderBottomColor: 'rgba(52, 52, 52, 0.1)',
    borderWidth: 6,
    position: 'absolute',
  },
  zoomIn: {
    width: 100,
    height: 100,
    backgroundColor: '#94B2B5',
    borderRadius: 100,
  },
});

export default SplashScreen;
