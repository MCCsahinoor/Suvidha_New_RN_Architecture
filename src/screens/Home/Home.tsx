import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HomeTabsTop from './TabsTopHome'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuData, setData } from '../../store/features/menu/menuSlice';
import { Animated, Dimensions, Image, PanResponder, Pressable, Text, View } from 'react-native';
import { setbottomSheetHandler } from '../../store/features/bottomSheetHandler/bottomSheetHandler';
import styles from './styles'; 
import { GetUserProfile } from '../../services/Profile/Profile.services';
import { setProfileData } from '../../store/features/userProfile/profileSlice';
import { setPullToRefresh } from '../../store/features/menu/pullToRefresh';
import AlertInfo from '../../components/alertInfo';
import ModalComponent from '../../components/Modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PainterSplashScreenDetails, PainterQuestionDetails } from '../../services/Profile/Profile.services';
import { useFocusEffect, useNavigationState } from '@react-navigation/native';
import { fetchQuickLinksData, setQuickLinks } from '../../store/features/menu/quickLinks';
import { I_GET_QUICK_LINKS } from '../../Interfaces/menuData.interface';
import { getBannerList } from '../../services/Banner/banner.services';
// import { setbannertHandler } from '../../store/features/banner/bannerHandler';
import { I_HOME_BANNER_GET } from '../../Interfaces/home.interface';
import { GetBusinessDetails } from '../../services/BusinessDetails/businessDetails.service';
import { fetchBusinessDetails, setBusinessDetails } from '../../store/features/businessDetails/businessDetails';
import { setApiCallLoader } from '../../store/features/apiCallLoader/apiCallLoader';
import { I_Benefit_Details, NoticeDetailsDto } from '../../Interfaces/benefit.interface';
import { UserGroupArr } from '../../utils/hierarchyLoginCheck';
import { setScanTokentHandler } from '../../store/features/tokenData/scanTokenData';
import { setPageChangeCall } from '../../store/features/menu/pageChange';
import { useTranslation } from 'react-i18next';
import { GetMessage } from '../../services/CommonAPI/commonapi.services';
import { fetchNotificationCount } from '../../store/features/userProfile/NotificationCount';
import { I_GET_LANGUAGE } from '../../Interfaces/language.interface';
import { AppApplicableLanguag, GetLanguageList } from '../../services/Language/language.services';
import { setappApplicableLanguage } from '../../store/features/appLanguage/appApplicableLanguage';
import { ddmmyyyConverter } from '../../utils/formatDate';
import { fetchBannerList } from '../../store/features/banner/bannerHandler';
import { AppDispatch } from '../../store/app/store';
import SoundPlayer from 'react-native-sound-player';
// import Sound from 'react-native-sound';
import { fetchLeadsPending } from '../../store/features/PendingLeads/PendingLeadsStore';
import { setpreferredLanguage } from '../../store/features/languageSlice/preferredLanguageSlice';
// import * as SignalR from '@microsoft/signalr';  
import { CommonToastModel } from '../../utils/ToastMessageModel';
import { Colors } from '../../themes';
import { fetchTutorials } from '../../store/features/Tutorials/tutorials';
import { LOCAL_STORAGE_KEY } from '../../utils/localStorageKeys';
import { SendEmailOtp, ValidateEmailOtp } from '../../services/EmailVerify/emailVerify.services';
import EmailValidationAlert from '../../components/EmailRequiredAlert';
import EmailOTPRequiredAlert from '../../components/EmailOTPRequiredAlert';
import HomeBottomFooter from '../../components/HomeBottomFooter';
import CustomVideoPlayer from '../../components/CustomVideoPlayer';
import MCQModal from '../../components/MCQModal';
import AdvertisingModel from '../../components/AdvertisingModel';
import CustomBottomSheet from '../../components/CustomBottomSheet';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const HomeScreens = ({ navigation }: any) => { 
  const customBottomSheetTitle = '';
  // const dispatch = useDispatch();
  const dispatch: AppDispatch = useDispatch();
  const pullState = useSelector((state: any) => state.pullToRefreshSlice);
  const [kycModal, setKycModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const bottomSheetHandler = useSelector((state: any) => state.bottomSheetHandler);
  const [isPullToRefresh, setisPullToRefresh] = useState(false);
  const [NoticeDetails, setNoticeDetails] = useState<I_Benefit_Details.NoticeDetails>(NoticeDetailsDto)
  const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck); // EXECUTIVE LOGIN CHECK
  const [getExecutiveLogin, setExecutiveLogin] = useState('');
  const userProfileData = useSelector((state: any) => state.userProfileData); // GET PROFILE DATA FROM STORE
  const [kycModelCounter, setKycModelCounter] = useState<number>(0);
  const [getPageChangeProfileCall, setPageChangeProfileCall] = useState(false);
  const AttandenceScanData = useSelector((state: any) => state.scanTokenData);
  const [updateModalFlag, setupdateModalFlag] = useState(false);
  const getPageChangeCall = useSelector((state: any) => state.pageChange);
  const { t } = useTranslation();
  const LanguageListLov = useSelector((state: any) => state.preferredLanguageData);
  // const [socketConnection, setSocketConnection] = useState<any>(null);
  // const [connectionOn, setConnectionOn] = useState<any>(null);
  const [userId, setUserId] = useState();
  const { banners } = useSelector((state: any) => state.bannerData);
  const { quickLinks } = useSelector((state: any) => state.quickLinksMenu);
  const [advertisingModel, setAdvertisingModel] = useState(false);
  const socketConnectionRef = useRef<any>(null);
  const [isEmailValidationShow, setIsEmailValidationShow] = useState(false);
  const [isEmailOTPShow, setIsEmailOTPShow] = useState(false);
  const [emailForOTP, setEmailForOTP] = useState("");
  const [isAPICalled, setIsAPICalled] = useState(false);
  const [resetOTPTrigger, setResetOTPTrigger] = useState(0);
  const [defaultEmail, setDefaultEmail] = useState(userProfileData[0]?.email_id || "");
  const [refreshing, setRefreshing] = useState(false);
  const [notificationYNforWarranty, setNotificationYNforWarranty] = useState(userProfileData[0]?.notification_yn || "");
  const [notificationURL, setNotificationURL] = useState(userProfileData[0]?.notification_url || "");
  // Splash video + MCQ sequence
  const [splashItems, setSplashItems] = useState<any[]>([]);
  const [currentSplashIndex, setCurrentSplashIndex] = useState<number>(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [mcqVisible, setMcqVisible] = useState(false);
  const [mcqQuestionText, setMcqQuestionText] = useState('');
  const [mcqOptions, setMcqOptions] = useState<Array<{ id: string | number; label: string; isCorrect?: 'Y' | 'N' | boolean }>>([]);
  const [mcqQuestionId, setMcqQuestionId] = useState<number>(0);
  const [mcqOrderNo, setMcqOrderNo] = useState<number>(0);
  const [lastVideoSkipped, setLastVideoSkipped] = useState<'Y' | 'N'>('N');
  const [visitMeetQRModalVisible, setVisitMeetQRModalVisible] = useState(false);
  const [buildYourProfileModalVisible, setBuildYourProfileModalVisible] = useState(false);



  useEffect(() => {
    if (executiveLoginCheck) {
      setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
    }
  }, [executiveLoginCheck]);

  useEffect(() => {
    if (userProfileData && userProfileData.length > 0) {
      setNotificationYNforWarranty(userProfileData[0]?.notification_yn || "");
      setNotificationURL(userProfileData[0]?.notification_url || "");
    } 
  }, [userProfileData]);

  const fetchSplashScreenDetails = async () => {
    try {
      const res: any = await PainterSplashScreenDetails<any, any>();

      if (
        res?.response_code === 1 &&
        Array.isArray(res?.data) &&
        res.data.length > 0
      ) {
        const playable = res.data.filter(
          (d: any) => d.add_url_yn === 'Y' && d.add_url
        );

        if (playable.length > 0) {
          setSplashItems(playable);
          setCurrentSplashIndex(0);
          setShowVideoModal(true);
        }
      }
    } catch (error) {
      // optional: console.error(error);
    }
  };

  const currentSplash = splashItems[currentSplashIndex] || null;
  const handleAdvanceToNext = () => {
    const nextIdx = currentSplashIndex + 1;
    if (nextIdx < splashItems.length) {
      setCurrentSplashIndex(nextIdx);
      setShowVideoModal(true);
    } else {
      setShowVideoModal(false);
    }
  };

  useEffect(() => {
    if (bottomSheetHandler && Object.keys(bottomSheetHandler).length !== 0) {
      if (bottomSheetHandler.modelAction === true) {
        if (bottomSheetHandler.modelName === 'VisitMeetQR') {
          setVisitMeetQRModalVisible(true)
        } else if (bottomSheetHandler.modelName === 'BYP') {
          setBuildYourProfileModalVisible(true)
        }
      }
    } else {
      setBuildYourProfileModalVisible(false)
      setVisitMeetQRModalVisible(false)
    }
  }, [bottomSheetHandler]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: true }));
    dispatch(setPageChangeCall(false))
  }, []);

  useEffect(() => {
    if (bottomSheetHandler && Object.keys(bottomSheetHandler).length !== 0) {
      if (bottomSheetHandler.modelAction === true) {
        if (bottomSheetHandler.modelName === 'VisitMeetQR') {
          setVisitMeetQRModalVisible(true)
        } else if (bottomSheetHandler.modelName === 'BYP') {
          setBuildYourProfileModalVisible(true)
        }
      }
    } else {
      setVisitMeetQRModalVisible(false)
      setBuildYourProfileModalVisible(false)
    }
  }, [bottomSheetHandler]);

  const closeSheet = (modelName: string): void => {
    dispatch(setbottomSheetHandler({}));
    setVisitMeetQRModalVisible(false)
    setBuildYourProfileModalVisible(false)
  };

 

  const expertContractorLeads = () => {
    navigation.navigate('LeadsInfo');
  };
  const goVisitForQRCod = () => {
    navigation.navigate('VisitQRList');
    dispatch(setbottomSheetHandler({}));
  };
  const viewCV = () => {
    navigation.navigate('PainterCVCard');
    dispatch(setbottomSheetHandler({}));
  };
  const viewProfileDashboard = () => {
    navigation.navigate('WhatsappStatusPage');
    dispatch(setbottomSheetHandler({}));
  }

  const makeSoundEffect = () => {
    playSong();
    getInfo();
  };

  const playSong = () => {
    try {
      SoundPlayer.playAsset(require('../../assets/sounds/silent.mp3'))
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

  const goYourAttendance = () => {
    setupdateModalFlag(false)
    closeSheet('VisitMeetQR')
    dispatch(setScanTokentHandler({
      scanType: 'MeetAttendance',
      scanData: ''
    }));
    makeSoundEffect()
    navigation.navigate('QRScan');
  }
  const state = navigation.getState();
  const history = state.routes;
  if (history.length > 1) {
    if (history[history.length - 2].name === 'Home') {
      if (updateModalFlag === true) {
        setupdateModalFlag(false)
      }
    }
  }
  useEffect(() => {
    if (AttandenceScanData.scanType == 'MeetAttendance' && (AttandenceScanData.scanData ?? '') != '') {
      if (updateModalFlag == false) {
        setupdateModalFlag(true)
        navigation.navigate('MeetSuccess', { details: AttandenceScanData.scanData });
        dispatch(setScanTokentHandler({
          scanType: '',
          scanData: ''
        }));
      }
    }
  }, [AttandenceScanData])
  let BenefitNoticeModal: any = useSelector((state: any) => state.BenefitNoticeHandler);
  const skipNow = () => {
    setKycModal(false);
    setKycModelCounter(0);
    showImportentNotice()
  };
  const skipUpdateProfile = () => { setProfileModal(false) }
  const updateKyc = () => {
    navigation.navigate('KycOnbording');
    setKycModal(false);
    setKycModelCounter(0);
  };
  const updateProfile = () => {
    navigation.navigate('myProfile');
    setProfileModal(false);
  };


  useEffect(() => {
    if (!getPageChangeCall) {
      dispatch(setPageChangeCall(true))
      if (pullState && pullState['pageName'] == 'HomeScreens' && pullState['pullAction'] == true) {
        setisPullToRefresh(true);
      } else {
        setisPullToRefresh(false);
      }
    }
  }, [getPageChangeCall]);

  const { BusinessDetails, status, error } = useSelector((state: any) => state.businessDetails);

  useEffect(() => {
    if (status == 'succeeded' && (BusinessDetails.notice_details ?? '')) {
      setNoticeDetails(BusinessDetails.notice_details)
    }
    dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: false }));
    setisPullToRefresh(false)
  }, [BusinessDetails])

  useEffect(() => {
    if (getPageChangeProfileCall) {
      GetUserProfile<any, I_GET_QUICK_LINKS>().then((response) => {
        if (response && response.data && response.data.length > 0) {
          mandatoryCheck(response.data, executiveLoginCheck && executiveLoginCheck['UserGroupCode'])
          dispatch(setProfileData(response.data));
          dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: false }));
          setisPullToRefresh(false);
          setPageChangeProfileCall(false);
        }
      }).catch(err => {
        dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: false }));
        setisPullToRefresh(false);
        setPageChangeProfileCall(false);
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
      });
    }

  }, [getPageChangeProfileCall]);


  useFocusEffect(
    React.useCallback(() => {
      setPageChangeProfileCall(true);
    }, []),
  );
  useEffect(() => {
    AppApplicableLanguag<any, I_GET_LANGUAGE.Root>()
      .then(response => {
        if (response && response.data && response.data.length > 0) {
          dispatch(setappApplicableLanguage(response.data));
        } else {
          dispatch(setappApplicableLanguage([]));
        }
      })
  }, []);

  useEffect(() => {
    if (isPullToRefresh) {
      const data = {
        "RowOffset": 0,
        "FetchNextRows": 0
      }
      // dispatch(fetchBannerList()); // BANNER LIST
      dispatch(fetchQuickLinksData()); // QUICK LINKS
      dispatch(fetchMenuData()); // SIDE MENU
      dispatch(fetchNotificationCount(data)) // NOTIFICATION COUNT
      dispatch(fetchBusinessDetails()) // GET BUSINESS DETAILS
      dispatch(fetchLeadsPending()); // Pending leads
      dispatch(fetchTutorials()); 
    }
  }, [isPullToRefresh]);

  const routeName = useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });
  const showImportentNotice = () => {
    if (NoticeDetails && NoticeDetails != null && NoticeDetails.Notice && NoticeDetails.Notice != '' && NoticeDetails.Notice != null) {
      if (BenefitNoticeModal.todayDate != ddmmyyyConverter(new Date(), 'DD/MM/YYYY')) {
        dispatch(setbottomSheetHandler({
          modelAction: true,
          modelName: 'BenefitNotice',
        }),);
      } else {
        if (BenefitNoticeModal.showNotice != true) {
          dispatch(setbottomSheetHandler({
            modelAction: true,
            modelName: 'BenefitNotice',
          }),);
        }
      }
    }
  }
  const mandatoryCheck = (prodileAllData: any, getExecutiveLogin: any) => {
    if (routeName == 'Home') {
      let kycModalDataNow: boolean = false;
      if (prodileAllData && prodileAllData.length > 0 && getExecutiveLogin && !UserGroupArr.includes(getExecutiveLogin.toLowerCase())) {
        if (prodileAllData[0].view_profile_cart_yn.toLowerCase() == 'y') {
          setProfileModal(true);
          kycModalDataNow = false;
        } else {
          setProfileModal(false);
          if (prodileAllData[0].view_kyc_cart_yn.toLowerCase() == 'y') {
            kycModalDataNow = true;
          } else {
            kycModalDataNow = false;
            showImportentNotice();
          }
        }
        setKycModal(kycModalDataNow)
      } else {
        setKycModal(false);
        setProfileModal(false);
      }
      if (kycModelCounter == 0) {
        setKycModelCounter(1);
        setKycModal(kycModalDataNow)
      }
    }
  };


  useEffect(() => {
    if (LanguageListLov.length == 0) {
      GetApplicableLanguageList();
    }
  }, [LanguageListLov]);


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



  useEffect(() => {
    if (userProfileData && userProfileData.length > 0) {
      setUserId(userProfileData[0]['user_id']);
    }
  }, [userProfileData]);


  useEffect(() => {
    dispatch(fetchBusinessDetails());
    getPendingLeads()
    dispatch(fetchTutorials());
    getTimestamp();
    setInterval(() => {
      getPendingLeads()
    }, 300000);
  }, []);


  const getPendingLeads = async () => {
    const token: any = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)
    if (token) {
      dispatch(fetchLeadsPending());
    }
  }

  useEffect(() => {
    if (banners && banners.length === 0) {
      dispatch(fetchBannerList());
    }
  }, [banners])

 

  const storeTimestamp = async () => {
    try {
      const currentTimestamp = new Date().getTime();
      await AsyncStorage.setItem('initialTimestamp', JSON.stringify(currentTimestamp));
      await AsyncStorage.setItem('emailValidationShown', 'false'); // reset shown flag
    } catch (error) {
      console.error('Error storing timestamp:', error);
    }
  };

  const getTimestamp = async () => { 
    try {
      const storedTimestamp = await AsyncStorage.getItem('initialTimestamp');
      const shownFlag = await AsyncStorage.getItem('emailValidationShown');
      const currentTimeStamp = new Date().getTime();

      if (storedTimestamp) {
        const timestamp = JSON.parse(storedTimestamp);
        const differenceInHours = (currentTimeStamp - timestamp) / (1000 * 60 * 60);
        if (differenceInHours >= 24) {
          await storeTimestamp();
          dispatch(fetchQuickLinksData());
          dispatch(fetchMenuData());
          dispatch(fetchTutorials());
          await fetchSplashScreenDetails(); 
          advertisingModelOpen();

          if (userProfileData?.[0]?.email_required_validation === "Y") {
            setIsEmailValidationShow(true);
            await AsyncStorage.setItem('emailValidationShown', 'true');
          }
        } else if (shownFlag !== 'true' && userProfileData?.[0]?.email_required_validation === "Y") {
          setIsEmailValidationShow(true);
          await AsyncStorage.setItem('emailValidationShown', 'true');
        }

        return timestamp;
      } else {
        await storeTimestamp();
        dispatch(fetchQuickLinksData());
        dispatch(fetchMenuData());
        dispatch(fetchTutorials());
        await fetchSplashScreenDetails(); 
        advertisingModelOpen();
        if (userProfileData?.[0]?.email_required_validation === "Y") {
          setIsEmailValidationShow(true);
          await AsyncStorage.setItem('emailValidationShown', 'true');
        }
        return null;
      }
    } catch (error) {
      console.error('Error retrieving timestamp:', error);
      return null;
    }
  };

 

  const advertisingModelOpen = () => { 
    if (notificationYNforWarranty == 'Y') {
      setAdvertisingModel(true);
    }
  }


  const handleEmailValidate = async (email: string) => {
    setIsAPICalled(true);
    try {
      const response = await SendEmailOtp<{ email_id: string; otp: number }, { response_code: number, response_message: string }>({
        email_id: email,
        otp: 0
      }, {});

      if (response.response_code === 1) {
        CommonToastModel('success', response.response_message, 5000);
        setEmailForOTP(email);
        setIsEmailValidationShow(false);
        setIsEmailOTPShow(true);
      } else {
        CommonToastModel('error', "Invalid email or OTP.", 5000);
      }
    } catch (error) {
      CommonToastModel('error', "Something went wrong.", 5000);
    } finally {
      setIsAPICalled(false);
    }
  };

  const handleResendOTP = () => {
    handleEmailValidate(emailForOTP);
    setResetOTPTrigger(prev => prev + 1);
  };

  const handleChangeEmail = async () => {
    setEmailForOTP("");
    setDefaultEmail("");
    setIsEmailOTPShow(false);
    setIsEmailValidationShow(false);
    await storeTimestamp();
  };


  const handleValidate = async (email: string, otp: string) => {
    setIsAPICalled(true);
    try {
      const response = await ValidateEmailOtp<{ email_id: string; otp: number }, { response_code: number, response_message: string, errorMessage: string }>({
        email_id: email,
        otp: Number(otp)
      }, {});

      if (response.response_code === 1) {
        CommonToastModel('success', response.response_message, 5000);
        setIsEmailOTPShow(false);
        onRefresh();
      } else {
        CommonToastModel('error', response.errorMessage, 5000);
      }
    } catch (error) {
      CommonToastModel('error', "Something went wrong.", 5000);
    } finally {
      setIsAPICalled(false);
    }
  };

  const handleCloseValidation = async () => {
    setIsEmailValidationShow(false);
    await AsyncStorage.setItem('emailValidationShown', 'true');
  };
  // useEffect(() => {
  //   if (userProfileData?.length > 0) {
  //     if (userProfileData[0]?.email_required_validation === "Y") {
  //       setIsEmailValidationShow(true);
  //     } else {
  //       setIsEmailValidationShow(false);
  //     }
  //   }
  // }, [userProfileData]);
  useEffect(() => {
    dispatch(fetchTutorials());
  }, [])


  return (
    <>
      <HomeTabsTop navigation={navigation} />

      <HomeBottomFooter navigation={navigation} />

      <CustomBottomSheet
        onClose={() => closeSheet('Leads info')}
        sheetTitle={customBottomSheetTitle}
        isVisible={false}>
        <View style={{ ...styles.sheetCardWithBg }}>
          <View style={{ ...styles.innersheetCardWithBg }}>
            <Pressable onPress={() => expertContractorLeads()}>
              <View style={styles.sheetCardQuickLInks}>
                <View style={styles.quickLinksIcons}>
                  <View style={styles.iconContainer}>
                    <Image
                      style={{ width: 55, height: 55, resizeMode: 'contain' }}
                      source={require('../../assets/images/expertContracter.png')}
                    />
                  </View>
                </View>
                <Text style={[styles.titleSheet]} numberOfLines={3}>
                  Expert Contractor Leads
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={{ ...styles.innersheetCardWithBg }}>
            <Pressable>
              <View style={styles.sheetCardQuickLInks}>
                <View style={styles.quickLinksIcons}>
                  <View style={styles.iconContainer}>
                    <Image
                      style={{ width: 35, height: 35, resizeMode: 'contain' }}
                      source={require('../../assets/images/xp-logo.png')}
                    />
                  </View>
                </View>
                <Text style={[styles.titleSheet]} numberOfLines={3}>
                  Express Painting Leads &nbsp;
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </CustomBottomSheet>

      <CustomBottomSheet   
        onClose={() => closeSheet('BYP')}
        sheetTitle={customBottomSheetTitle}
        isVisible={buildYourProfileModalVisible} 
      >
        <View style={{ ...styles.sheetCardWithBg }}>
          <View style={{ ...styles.innersheetCardWithBg, width: '45%' }}>
            <Pressable onPress={() => viewCV()}>
              <View style={styles.sheetCardQuickLInks}>
                <View style={styles.quickLinksIcons}>
                  <View style={styles.iconContainer}>
                    <Image
                      style={{ width: 55, height: 55, resizeMode: 'contain' }}
                      source={require('../../assets/images/approved.png')}
                    />
                  </View>
                </View>
                <Text style={[styles.titleSheet]} numberOfLines={3}>
                  Share Profile
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={{ ...styles.innersheetCardWithBg, width: '45%' }}>
            <Pressable onPress={() => viewProfileDashboard()}>
              <View style={styles.sheetCardQuickLInks}>
                <View style={styles.quickLinksIcons}>
                  <View style={styles.iconContainer}>
                    <Image
                      style={{ width: 35, height: 35, resizeMode: 'contain' }}
                      source={require('../../assets/images/profileDashboard.png')}
                    />
                  </View>
                </View>
                <Text style={[styles.titleSheet]} numberOfLines={3}>
                  Profile Dashbaord
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </CustomBottomSheet>

      <CustomBottomSheet
        onClose={() => closeSheet('VisitMeetQR')}
        sheetTitle={customBottomSheetTitle}
        isVisible={visitMeetQRModalVisible}
      >
        <View style={{ ...styles.sheetCardWithBg }}>
          <View style={{ ...styles.innersheetCardWithBg, width: '48%' }}>
            <Pressable onPress={() => goVisitForQRCod()}>
              <View style={styles.sheetCardQuickLInks}>
                <View style={styles.quickLinksIcons}>
                  <View style={styles.iconContainer}>
                    <Image
                      style={{ width: 45, height: 55, resizeMode: 'contain' }}
                      source={require('../../assets/images/bergerAttence.png')}
                    />
                  </View>
                </View>
                <Text style={[styles.titleSheet]} numberOfLines={3}>
                  Berger employee attendance
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={{ ...styles.innersheetCardWithBg, width: '48%' }}>
            <Pressable onPress={() => goYourAttendance()}>
              <View style={styles.sheetCardQuickLInks}>
                <View style={styles.quickLinksIcons}>
                  <View style={styles.iconContainer}>
                    <Image
                      style={{ width: 35, height: 35, resizeMode: 'contain' }}
                      source={require('../../assets/images/meeting.png')}
                    />
                  </View>
                </View>
                <Text style={[styles.titleSheet]} numberOfLines={3}>
                  My Attendance
                </Text>
                <Text style={[styles.titleSheet]} numberOfLines={3}></Text>
              </View>
            </Pressable>
          </View>
        </View>
      </CustomBottomSheet>

      {kycModal && (
        <AlertInfo
          modalVisible={kycModal}
          skipNow={() => skipNow()}
          confirmAction={() => updateKyc()}
          allowSkip={true}
          headerText={t("PleaseUpdateYourKYC")}
          subHeaderText={userProfileData && userProfileData[0] && userProfileData[0].kyc_update_msg}
          confirmActionButtonText={t("UpdateKYC")}
        />
      )}

      {profileModal && (
        <AlertInfo
          skipNow={() => skipUpdateProfile()}
          confirmAction={() => updateProfile()}
          allowSkip={false}
          headerText={t("updateProfileHeader")}
          subHeaderText={''}
          confirmActionButtonText={t("Proceed")}
        />
      )}

      {advertisingModel && (
        <AdvertisingModel
          skipNow={() => setAdvertisingModel(false)}
          confirmAction={() => setAdvertisingModel(false)}
          allowSkip={true}
          htmlMessage={false}
          subHeaderText={notificationURL}
          confirmActionButtonText={t('close')}
          skipButtonText={t('Cancel')}
          isAPICall={false}
          hideModal={() => setAdvertisingModel(false)}
        />
      )}

      {isEmailValidationShow && (
        <EmailValidationAlert
          defaultEmail={defaultEmail}
          onValidate={handleEmailValidate}
          onClose={handleCloseValidation}
          isAPICall={isAPICalled}
        />
      )}

      {isEmailOTPShow && (
        <EmailOTPRequiredAlert
          email={emailForOTP}
          onValidate={handleValidate}
          onClose={() => setIsEmailOTPShow(false)}
          onResend={handleResendOTP}
          onChangeEmail={handleChangeEmail}
          isAPICall={isAPICalled}
          resetTrigger={resetOTPTrigger}
        />
      )}

      {executiveLoginCheck && (
        <>
          <MCQModal
            modalVisible={mcqVisible && currentSplash?.is_qust_applicable === 'Y'}
            hideModal={() => setMcqVisible(false)}
            questionText={mcqQuestionText}
            options={mcqOptions}
            questionId={mcqQuestionId}
            questionOrderNo={mcqOrderNo}
            videoSkipYn={lastVideoSkipped}
            screenMstrAutoId={currentSplash?.pss_auto_id || 0}
            onSubmit={() => {
              setMcqVisible(false);
              handleAdvanceToNext();
            }}
          />

          {/* Splash Video */}
          {showVideoModal && currentSplash?.add_url_yn === 'Y' && !!currentSplash?.add_url && (
            <ModalComponent>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <View style={{ width: '100%', borderRadius: 12, overflow: 'hidden', backgroundColor: Colors.color_black }}>
                  <CustomVideoPlayer
                    source={currentSplash.add_url}
                    autoPlay
                    loop={false}
                    muted={false}
                    addSkipYn={currentSplash.add_skip_yn}
                    screenId={currentSplash?.pss_auto_id || 0}
                    onQuestionsLoaded={({ questionText, options, questionId, orderNo }) => {
                      setMcqQuestionText(questionText);
                      setMcqOptions(options);
                      setMcqQuestionId(questionId);
                      setMcqOrderNo(orderNo);
                    }}
                    onEnd={() => { }}
                    onError={() => { }}
                    onSkip={async () => {
                      setLastVideoSkipped('Y');
                      setShowVideoModal(false);
                      if (currentSplash?.is_qust_applicable === 'Y') {
                        setMcqVisible(true);
                      } else {
                        handleAdvanceToNext();
                      }
                    }}
                    onNext={async () => {
                      setLastVideoSkipped('N');
                      setShowVideoModal(false);
                      if (currentSplash?.is_qust_applicable === 'Y') {
                        setMcqVisible(true);
                      } else {
                        handleAdvanceToNext();
                      }
                    }}
                  />
                </View>
              </View>
            </ModalComponent>
          )}
        </>
      )}

    </>
  );
};
export default memo(HomeScreens);
