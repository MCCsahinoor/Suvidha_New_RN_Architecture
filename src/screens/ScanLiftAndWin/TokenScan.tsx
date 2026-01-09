/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { memo, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import InputFields from '../../components/inputField';
import { AppImages, Colors, Fonts } from '../../themes';
import ButtonLarge from '../../components/ButtonLarge';
import HeaderCurve from '../../components/HeaderCurve';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetRedemptionPainterStatus, ScanTokenRedemption } from '../../services/ScanToken/scantoken.service';
import { setApiCallLoader } from '../../store/features/apiCallLoader/apiCallLoader';
import { I_TokenScan } from '../../Interfaces/ScanToken.interface';
import AlertInfo from '../../components/alertInfo';
import { useFocusEffect } from '@react-navigation/native';
import { setScanTokentHandler } from '../../store/features/tokenData/scanTokenData';
import { UserGroupArr } from '../../utils/hierarchyLoginCheck';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
// import Sound from 'react-native-sound';
import LottieView from 'lottie-react-native';
import { CommonToastModel } from '../../utils/ToastMessageModel';
import SoundPlayer from 'react-native-sound-player';


const TokenScan = ({ route, navigation }: any) => {
  const dispatch = useDispatch();
  const [tokenVal, setTokenVal] = useState('');
  const [errors, setErrors] = useState<Partial<any>>({});
  const [SubmitTokenModel, setSubmitTokenModel] = useState(false);
  const [tokenFlag, settokenFlag] = useState<string>('T');
  const [LiftWinModal, setLiftWinModal] = useState(false)
  const [UsedTokenAlert, setUsedTokenAlert] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [PainterDetails, setPainterDetails] = useState<I_TokenScan.I_GET_FOR_PAINTER_DETAILS_RESPONSE>();
  const isAPICall = useSelector((state: any) => state.apiCallLoader);
  const [updateModalFlag, setupdateModalFlag] = useState(false);
  const [UsedTokenMsg, setUsedTokenMsg] = useState('');
  const { t } = useTranslation();
  // const getInfo = (val: string): void => {
  //   const alphanumericRegex = /^[a-zA-Z0-9]*$/;
  //   if (alphanumericRegex.test(val) == true) {
  //     setTokenVal(val.trim());
  //     settokenFlag('T')
  //     setErrors({
  //       ...errors,
  //       ['token_val']: '',
  //     });
  //   } else {
  //     setTokenVal(val.trim());
  //     settokenFlag('T')
  //     setErrors({
  //       ...errors,
  //       ['token_val']: i18n.t("invalidTokenKey"),
  //     });
  //   }
  // };
  const getInfo = (val: string): void => {
    const maxLength = 20;
    const trimmedVal = val.trim();

    if (trimmedVal.length > maxLength) {
      return;
    }

    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    if (alphanumericRegex.test(trimmedVal)) {
      setTokenVal(trimmedVal);
      settokenFlag('T');
      setErrors({
        ...errors,
        ['token_val']: '',
      });
    } else {
      setTokenVal(trimmedVal);
      settokenFlag('T');
      setErrors({
        ...errors,
        ['token_val']: i18n.t("invalidTokenKey"),
      });
    }
  };


  const skipNow = () => {
    setSubmitTokenModel(false)
  }

  const ScanTokenData = useSelector((state: any) => state.scanTokenData);

  const [getExecutiveLogin, setExecutiveLogin] = useState('');
  const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
  useEffect(() => {
    if (executiveLoginCheck) {
      setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
    }
  }, [executiveLoginCheck]);

  //========== For Page entry and exit ===========
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      //console.log("GetPainterDetails", GetPainterDetails);

      GetPainterDetails()
      return () => {
        // Do something when the screen is unfocused
        // console.log('ColourantFillScreen is unfocused');
        // dispatch(isPageExit(false));
      };
    }, []),
  );

  const GetPainterDetails = () => {
    setShowLoader(true);
    dispatch(setApiCallLoader(true));
    // let temp_site_list: I_PrivateSite.DataFlagChanged[] = [];
    // setPainterDetails(null)
    GetRedemptionPainterStatus<any, I_TokenScan.I_GET_FOR_PAINTER_DETAILS_RESPONSE>({}).then((response) => {
      if (response.response_code == 1) {
        dispatch(setApiCallLoader(false));
        setPainterDetails(response)
      } else {
        dispatch(setApiCallLoader(false));
        CommonToastModel('error', response.response_message, 5000);
      }
    }).catch(err => {
      dispatch(setApiCallLoader(false));
      setShowLoader(false);
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);

    })
  }

  useEffect(() => {
    if (ScanTokenData.scanType == 'L&WToken' && (ScanTokenData.scanData ?? '') != '') {
      // setTokenVal(ScanTokenData.scanData)
      // settokenFlag('S')
      dispatch(setScanTokentHandler({
        scanType: '',
        scanData: ''
      }));
      if (updateModalFlag == false) {
        // setSubmitTokenModel(true)
        dispatch(setApiCallLoader(true));
        handelTokenScanSubmit(ScanTokenData.scanData, 'S')
      }
    }
  }, [ScanTokenData])

  useEffect(() => {
    GetPainterDetails();
  }, [])



  const validationCheckforsearchTokenbyValue = (tokennumber: any) => {
    const newErrors: Partial<any> = {};
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    if (tokennumber == '') {
      newErrors.token_val = i18n.t("pleaseEnterValidToken");
    }
    if (tokennumber) {
      if (alphanumericRegex.test(tokennumber) == false) {
        newErrors.token_val = i18n.t("invalidTokenKey");
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  }

  const handelTokenScanSubmit = (tokennumber: any, tokenFlag: any) => {
    setupdateModalFlag(true)
    const isValid = validationCheckforsearchTokenbyValue(tokennumber);
    if (isValid) {
      if ((PainterDetails?.val_program_member_id ?? '') != '') {
        TokenRedemption(tokennumber, tokenFlag)
      } else {
        setLiftWinModal(true)
      }
      return true;
    } else {
      skipNow()
      return false;
    }
  }

  // const clickSound: any = new Sound(require('../../assets/sounds/silent.mp3'), Sound.MAIN_BUNDLE, (error: any) => {
  //   if (error) {
  //     console.log("Failded to load the sound", error);
  //     return;
  //   }
  // });

  const makeSoundEffect = () => {
    // clickSound.play((success: any) => {
    //   if (success) {
    //     console.log('successfully finished playing');
    //   } else {
    //     console.log('playback failed due to audio decoding errors');
    //   }
    // });
    playSong();
    getInfoSong();
  };
  const playSong = () => {
    try {
      SoundPlayer.playAsset(require('../../assets/sounds/silent.mp3'))
    } catch (e) {
      console.log('Cannot play the file');
    }
  };
  const getInfoSong = async () => {
    try {
      const info = await SoundPlayer.getInfo();
    } catch (e) {
    }
  };




  const TokenRedemption = (tokennumber: any, falg: any) => {
    const data = {
      TokenNumber: tokennumber,
      EntryYn: falg == 'T' ? 'Y' : 'N'
    }
    dispatch(setApiCallLoader(true));
    ScanTokenRedemption<I_TokenScan.I_SEND_FOR_SCAN_TOKEN_RESPONSE, I_TokenScan.I_GET_FOR_SCAN_TOKEN_RESPONSE>(data).then((response) => {
      dispatch(setApiCallLoader(false));
      skipNow();
      if (response.response_code == 1) {
        setTokenVal('');
        CommonToastModel('success', response.response_message, 5000);
        makeSoundEffect()
        navigation.navigate('PostTokenScan', { responseData: response });
      } else {
        if (response.used_token_Check == 'Y') {
          setUsedTokenMsg(response.response_message)
          setUsedTokenAlert(true)
        } else {
          if (tokenFlag == 'S') {
            setTokenVal('')
          }
          CommonToastModel('error', response.response_message, 8000);
        }
      }
    }).catch((err) => { 
      CommonToastModel('error', (err.error && err.error.response && err.error.response.data && err.error.response.data.errorMessage) ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
      if (tokenFlag == 'S') {
        setTokenVal('')
      }
      dispatch(setApiCallLoader(false));
      skipNow();
    });
  }

  const scanClick = () => {
    if (!isAPICall) {
      // navigation.navigate('QR Scan', { scanType: route.params.scanType});
      if (!UserGroupArr.includes(getExecutiveLogin.toLowerCase())) {
        setupdateModalFlag(false)
        setErrors({
          ...errors,
          ['token_val']: '',
        });
        dispatch(setScanTokentHandler({
          scanType: 'L&WToken',
          scanData: ''
        }));
        navigation.navigate('QRScan');
      } else {
        CommonToastModel('error', i18n.t("applicablePainterOnly"), 5000);
      }
    } else {
      CommonToastModel('error', i18n.t("validatedPainterForToken"), 5000);
    }
  };

  useEffect(() => {
  }, [tokenVal]);

  return (
    <>
      <HeaderCurve
        topGaap={119}
        headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'}
        pageBackground={'#fff'}
      />
      <ScrollView style={{ backgroundColor: Colors.color_white }}>
        <View style={{ ...styles.container }}>
          <View style={{ marginTop: 5 }}>
            <InputFields
              showLabel={true}
              label={t('enterToken')}
              showPlaceholder={true}
              placeholder={t('pleaseEnterToken')}
              onChange={(val: string) => {
                getInfo(val);
              }}
              keyboardType={'default'}
              value={tokenVal}
              error={errors.token_val}
              autoCapitalize={'characters'}
              defaultValue={tokenVal}
              editable={PainterDetails?.lockStatus == 'N'}
              maxLength={20}
            />
          </View>
        </View>
        {!UserGroupArr.includes(getExecutiveLogin.toLowerCase()) &&
          <View style={{ ...styles.fixedButton }}>
            <View style={{ width: '48%' }}>
              <ButtonLarge
                title={t('validateToken')}
                onPress={() => {
                  // setSubmitTokenModel(true)
                  handelTokenScanSubmit(tokenVal, 'T')
                }}
                fillBtn={true}
                key={'Validate'}
                showIcon={false}
                iconName=""
                paddingVertical={7}
                paddingHorizontal={5}
                fontSize={15}
                iconSize={19}
                disabled={isAPICall}
                isAPICall={isAPICall}
              />
            </View>
          </View>
        }
        <View style={{ marginVertical: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
            <View
              style={{
                flex: 1,
                height: 2,
                backgroundColor: Colors.color_light_gray,
              }}
            />
            <View style={{
              width: 50,
              height: 50,
              backgroundColor: Colors.color_light_gray,
              paddingHorizontal: 10,
              borderRadius: 50,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center'
            }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  textAlignVertical: 'center',
                  color: Colors.ui_dark_bg,
                  fontFamily: Fonts.OpenSans500Medium
                }}>
                {t("OR")}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                height: 2,
                backgroundColor: Colors.color_light_gray,
              }}
            />
          </View>
        </View>
        <View style={{ width: '100%', height: '100%', marginTop: 15 }}>
          <Pressable onPress={() => scanClick()}> 
            <LottieView
              source={{ uri: AppImages.LottyScanToken }}
              style={{
                height: 100,
                width: 160,
                borderRadius: 8,
                alignSelf: 'center',
                transform: 'scale(2.5)'
              }}
              autoPlay
              loop
            />
            <Text
              style={{
                color: Colors.color_gray,
                alignSelf: 'center',
                fontSize: 14,
                marginTop: 20,
                fontFamily: Fonts.OpenSans500Medium
              }}>
              {t("clickScanToken")}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {SubmitTokenModel && (
        <AlertInfo
          skipNow={() => skipNow()}
          confirmAction={() => handelTokenScanSubmit(tokenVal, 'T')}
          allowSkip={true}
          headerText={t('submitConfrim')}
          confirmActionButtonText={t('Submit')}
          skipButtonText={t('Cancel')}
          isAPICall={isAPICall}
        />
      )}
      {LiftWinModal && (
        <AlertInfo
          skipNow={() => skipNow()}
          confirmAction={() => setLiftWinModal(false)}
          allowSkip={false}
          headerText={t('tokenScan')}
          subHeaderText={t('notRegisteredLift&Win')}
          confirmActionButtonText={t('close')}
          skipButtonText={t('Cancel')}
          isAPICall={isAPICall}
          hideModal={() => setLiftWinModal(false)}
        />
      )}
      {UsedTokenAlert && (
        <AlertInfo
          skipNow={() => setUsedTokenAlert(false)}
          confirmAction={() => setUsedTokenAlert(false)}
          allowSkip={false}
          htmlMessage={true}
          headerText={t('tokenScan')}
          subHeaderText={UsedTokenMsg}
          confirmActionButtonText={t('close')}
          skipButtonText={t('Cancel')}
          isAPICall={isAPICall}
          hideModal={() => setUsedTokenAlert(false)}
        />
      )}
    </>
  );
};

export default memo(TokenScan);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 5,
    paddingHorizontal: 15,
  },
  fixedButton: {
    backgroundColor: Colors.color_white,
    paddingHorizontal: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
});
