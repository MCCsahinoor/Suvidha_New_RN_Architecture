/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, PermissionsAndroid, Alert, Linking, BackHandler, Platform } from 'react-native';
import { AppImages, Colors, Fonts } from '../themes';
import { useIsFocused } from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
  useCameraPermission,
} from 'react-native-vision-camera';
import AlertInfo from './alertInfo';
import { useDispatch, useSelector } from 'react-redux';
import { setApiCallLoader } from '../store/features/apiCallLoader/apiCallLoader';
import { I_TokenScan } from '../Interfaces/ScanToken.interface';
import { ScanTokenRedemption } from '../services/ScanToken/scantoken.service';
import { setScanTokentHandler } from '../store/features/tokenData/scanTokenData';
import LottieView from 'lottie-react-native';
import ButtonLarge from './ButtonLarge';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

const QRScanner = ({ navigation }: any) => {
  const ScanTokenData = useSelector((state: any) => state.scanTokenData);
  const { height, width } = Dimensions.get('window');
  const maskRowHeight = Math.round((height - 300) / 20);
  const maskColWidth = (width - 300) / 2;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const camera = useRef<Camera>(null);
  const [scannedToken, setScannedToken] = useState<any>('');
  const [CameraPermissionNotGranted, setCameraPermissionNotGranted] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const codeScanner = useCodeScanner({
    codeTypes: [
      'code-128',
      'code-39',
      'code-93',
      'codabar',
      'ean-13',
      'ean-8',
      'itf',
      'upc-e',
      'qr',
      'pdf-417',
      'aztec',
      'data-matrix',
    ],
    onCodeScanned: codes => {
      setScannedToken(codes[0].value);
      // console.warn(`Scanned value --> ${codes[0].value} `);
    },
  });
  const { t } = useTranslation();
  useEffect(() => {
    if (scannedToken != '' && scannedToken != null && scannedToken != undefined) {
      dispatch(setScanTokentHandler({ scanType: ScanTokenData.scanType, scanData: scannedToken }));
      navigation.goBack();
    }
  }, [scannedToken])

  useEffect(() => {
    checkCameraPermission();
    // Small delay to ensure native module is initialized
    const timer = setTimeout(() => {
      if (device != null && hasPermission) {
        setIsCameraReady(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      if (isFocused && !hasPermission) {
        requestPermission().then(() => {
          setIsCameraReady(true);
          setCameraError(null);
        }).catch((err) => {
          setIsCameraReady(false);
          setCameraError('Failed to request camera permission');
          console.warn('Camera permission error:', err);
        });
      } else if (isFocused && hasPermission && device != null) {
        setIsCameraReady(true);
        setCameraError(null);
      } else if (isFocused && device == null) {
        setIsCameraReady(false);
        setCameraError('Camera device not available');
      } else {
        setIsCameraReady(false);
      }
    } catch (err: any) {
      setIsCameraReady(false);
      setCameraError(err?.message || 'Camera initialization error');
      console.warn('Camera initialization error:', err);
    }
  }, [isFocused, hasPermission, device, requestPermission]);


  const checkCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        // console.log('setCAMERAPermissionNotGranted....', granted);
        if (granted) {
          setCameraPermissionNotGranted(false);
        } else {
          setCameraPermissionNotGranted(true);
        }
      } else {
        setCameraPermissionNotGranted(false);
      }
    } catch (err) {
      // console.warn(err);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: i18n.t("cameraPermission"),
          message: i18n.t("appNeedsCameraAccess"),
          buttonNeutral: i18n.t("Ask Me Later"),
          buttonNegative: i18n.t("Cancel"),
          buttonPositive: i18n.t("Okey")
        }
      );

      console.log('settGranted....', granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setCameraPermissionNotGranted(true);
      } else {
        setCameraPermissionNotGranted(false);
        Alert.alert(
          i18n.t("Permission Denied"),
          i18n.t("cameraPermissionRequired"),
          [
            { text: i18n.t("Okey") }
          ]
        );
      }
    } catch (err) {
      // console.warn(err);
    }
  };

  const handleOpenSettings = () => {
    navigation.goBack();
    Linking.openSettings();
  };

  const windowHeight = Dimensions.get('window').height;


  return (
    <>
      {CameraPermissionNotGranted == true ? (
        <View style={{
          padding: 10, backgroundColor: 'white', height: windowHeight, flex: 1, justifyContent: 'center', alignItems: 'center'
        }}>
          <View style={{ ...styles.locationWarn }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: -60 }}>
              <LottieView
                source={{ uri: AppImages.LottyAlert }}
                style={{ width: 100, height: 100 }}
                autoPlay
                loop
              />
            </View>
            <Text style={{ ...styles.warnMsg }}>{t("cameraPermissionDenied")}</Text>
            <Text style={{ ...styles.warnMsgSubText }}>{t("cameraPermissionRequired")}</Text>
            <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%', }}>
              <View style={{ width: '50%', }}>
                <ButtonLarge
                  title={t('goToSettings')}
                  onPress={() => handleOpenSettings()}
                  fillBtn={true}
                  key={'goTo'}
                  showIcon={false}
                  iconName=""
                  paddingVertical={3}
                  paddingHorizontal={7}
                  fontSize={15}
                  iconSize={19}
                />
              </View>
            </View>
          </View>
          <View>
          </View>
        </View>
      ) : (
        <>
          {device != null && hasPermission && isCameraReady && isFocused ? (
            <View style={styles.fullWH}>
              <Camera
                ref={camera}
                codeScanner={codeScanner}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={isFocused}
              />
            <View style={{ position: 'absolute', zIndex: 9, width: '100%' }}>
              <Text style={styles.scanTextHeader}>
                {t("placeQRCode")}{' '}
              </Text>
              <Text style={styles.subscanTextHeader}>
                {t("scanWillStartAutomatically")}{' '}
              </Text>
            </View>
            <View style={styles.maskOutter}>
              <View
                style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]}
              />
              <View style={[{ flex: 30 }, styles.maskCenter]}>
                <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                <View style={styles.maskInner} />
                <View style={[{ width: maskColWidth }, styles.maskFrame]} />
              </View>
              <View
                style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]}
              />
            </View>
          </View>
          ) : (
            <View style={{
              padding: 10, backgroundColor: 'white', height: windowHeight, flex: 1, justifyContent: 'center', alignItems: 'center'
            }}>
              <Text style={{ ...styles.warnMsg }}>
                {cameraError 
                  ? cameraError
                  : device == null 
                    ? (t("cameraNotAvailable") || "Camera not available")
                    : !hasPermission 
                      ? (t("cameraPermissionRequired") || "Camera permission required")
                      : (t("loadingCamera") || "Loading camera...")
                }
              </Text>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default QRScanner;

const styles = StyleSheet.create({
  // textColor: {
  //   color: Colors.color_black,
  // },
  fullWH: {
    width: '100%',
    height: '100%',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 2,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },
  scanTextHeader: {
    textAlign: 'center',
    color: Colors.color_white,
    fontSize: 16,
    paddingTop: 50,
    fontFamily: Fonts.poppins700Bold,
  },
  subscanTextHeader: {
    textAlign: 'center',
    color: Colors.color_white,
    fontSize: 14,
    fontFamily: Fonts.poppins600SemiBold,
  },
  locationWarn: {
    padding: 15,
    backgroundColor: '#FFEFEF',
    borderWidth: 1,
    borderColor: '#FFDBDB',
    borderRadius: 8,
    marginTop: -50
  },
  warnMsg: {
    color: 'red',
    textAlign: 'center',
    fontFamily: Fonts.poppins500Medium,
    fontSize: 18
  },
  permissionInst: {
    color: 'red',
    fontFamily: Fonts.poppins400Regular,
    marginTop: 10,
    fontSize: 13
  },
  warnMsgSubText: {
    color: Colors.color_gray,
    textAlign: 'center',
    fontFamily: Fonts.OpenSans500Medium,
    fontSize: 14
  }
});
