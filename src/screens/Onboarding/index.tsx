import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  PermissionsAndroid,
  Platform
} from 'react-native';
import styles from './styles';
import ButtonLarge from '../../components/ButtonLarge';
import ModalComponent from '../../components/Modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '../../themes';
import PermissionHandler from '../PermissionHandler/PermissionHandler';
import { useDispatch, useSelector } from 'react-redux';
import { setApiCallLoader } from '../../store/features/apiCallLoader/apiCallLoader';
import Animated, { FadeInDown } from 'react-native-reanimated'; 
import Accordion from '../../components/Accordion';

const permissionOptionArr = [
  {
    icon: "location-outline",
    optionName: "Location",
    iconSize: 25,
    subText: "Geolocation collects location data to enable tracking user's trips to work and calculate distance travelled even when the app is closed or not in use. This data will be uploaded to Berger's Server. Users may view your location history from this application. Based on their distance covered in kilometers the registered users will get travelling expenses/incentives from the company.",
  },
  {
    icon: "folder-open-outline",
    optionName: "Storage",
    iconSize: 25,
    subText: "",
  },
  {
    icon: "camera-outline",
    optionName: "Camera",
    iconSize: 25,
    subText: "",
  },
  {
    icon: "images-outline",
    optionName: "Library",
    iconSize: 25,
    subText: "",
  },
  {
    icon: "notifications-outline",
    optionName: "Notification",
    iconSize: 25,
    subText: "",
  },
];

const OnbordingScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [openPermissionModal, setOpenPermissionModal] = useState(false);
  const [accessPermission, setAccessPermission] = useState(false);

  // API CALL CHECK IF API CALL START THEN BUTTON DESABLED
  const isAPICall = useSelector((state: any) => state.apiCallLoader);
  const navigateTologin = (): void => {
    if (Platform.OS === "android") {
      checkAllPermission();
    } else {
      navigation.replace("Login");
    }
  };

  const checkAllPermission = () => {
    dispatch(setApiCallLoader(true));
    Promise.all([
      PermissionsAndroid.check("android.permission.ACCESS_FINE_LOCATION"),
      PermissionsAndroid.check("android.permission.ACCESS_COARSE_LOCATION"),
      PermissionsAndroid.check("android.permission.CAMERA"),
      PermissionsAndroid.check("android.permission.READ_CONTACTS"),
      PermissionsAndroid.check("android.permission.READ_EXTERNAL_STORAGE"),
      PermissionsAndroid.check("android.permission.RECORD_AUDIO"),
      PermissionsAndroid.check("android.permission.WRITE_EXTERNAL_STORAGE"),
      PermissionsAndroid.check("android.permission.POST_NOTIFICATIONS"),
    ]).then((result) => {
      result.forEach((res) => {
        dispatch(setApiCallLoader(false));
        if (res === true) {
          navigation.replace("Login");
        } else {
          setOpenPermissionModal(true);
        }
      });
    });
  };

  const acceptPermission = () => {
    setOpenPermissionModal(false);
    setAccessPermission(true);
    dispatch(setApiCallLoader(true));
  };

  // const [mode, setmode] = useState('');
  // useEffect(() => {
  //   const modeRun = process.env.NODE_ENV
  //   if (modeRun) { 
  //     setmode(modeRun)
  //     console.log(modeRun)
  //   }
  // }, [])

  const directLogin = () => {
    navigation.replace("Login");
    setOpenPermissionModal(false);
  }

  return (
    <>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flex: 1
      }}>
        <View style={{ ...styles.container }}>
          <Animated.View entering={FadeInDown.duration(1000)}>
            <Image
              style={[styles.logo]}
              source={require("../../assets/images/bergerLogo.png")}
            />
          </Animated.View>
          <Animated.Text
            entering={FadeInDown.duration(1000).delay(200)}
            style={styles.appNameHeading}
          >
            SUVIDHA
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.duration(1000).delay(500)}
            style={styles.heading}
          >
            Your Vision, Our Expertise{" "}
          </Animated.Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 50 }}>
        <Animated.View entering={FadeInDown.duration(1000).delay(900)}>
          <ButtonLarge
            title={"Get Started"}
            onPress={navigateTologin}
            fillBtn={true}
            key={"GetStarted"}
            showIcon={true}
            iconName="angle-double-right"
            paddingVertical={10}
            paddingHorizontal={10}
            fontSize={19}
            iconSize={19}
            isAPICall={isAPICall}
            disabled={isAPICall}
          />
        </Animated.View>
      </View>
      {openPermissionModal === true && (
        <ModalComponent>
          <View style={stylesIn.centeredView}>
            <View style={stylesIn.modalView}>
              <Ionicons style={styles.closeAccess} name="close-circle-outline" onPress={() => { directLogin(); }} />
              <Text style={stylesIn.modalText}>We need access to:</Text>
              <Text
                style={{
                  fontSize: 12,
                  marginBottom: 15,
                  fontFamily: Fonts.poppins400Regular,
                }}
              >
                To provide a better service, Please allow respective permission.
              </Text>
              <ScrollView style={stylesIn.permissionList}>
                {/* <View style={{ width: '100%', marginTop: 5, maxHeight: '50%' }}> */}

                {permissionOptionArr.map((item: any, index: number) => (
                  <View
                    key={index}
                    style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row" }} >
                    <Accordion
                      key={index}
                      title={item.optionName}
                      isLock={item.subText.length > 0}
                      isDisable={item.subText.length == 0}
                      icon={item}
                      showLockIcon={false}>
                      <View >
                        <Text style={stylesIn.title}>{item.subText}</Text>
                      </View>
                    </Accordion>
                  </View>
                ))}
              </ScrollView>
              <View style={{ ...stylesIn.fixedButton }}>
                <ButtonLarge
                  title={"Accept"}
                  onPress={acceptPermission}
                  fillBtn={true}
                  key={""}
                  showIcon={false}
                  iconName=""
                  paddingVertical={7}
                  paddingHorizontal={5}
                  fontSize={15}
                  iconSize={19}
                />
              </View>
            </View>
          </View>
        </ModalComponent>
      )}

      {accessPermission && <PermissionHandler navigation={navigation} />}
    </>
  );
};

export default OnbordingScreen;

const stylesIn = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalText: {
    marginTop: 5,
    color: Colors.ui_dark_bg,
    fontFamily: Fonts.poppins600SemiBold,
    fontSize: 18,
  },
  modalOptionText: {
    color: '#000',
    fontSize: 16,
    fontFamily: Fonts.poppins400Regular,
  },
  fixedButton: {
    backgroundColor: Colors.color_white,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    color: Colors.color_black,
    fontSize: 12,
    fontFamily: Fonts.OpenSans500Medium,
    textAlign: 'justify'
  },
  permissionList: {
    width: '100%',
    marginTop: 5,
    maxHeight: '35%',
  },
});
