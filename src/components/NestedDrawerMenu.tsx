/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Linking, } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '../themes';
import { useNavigation } from '@react-navigation/native';
import { I_GET_MENU } from '../Interfaces/menuData.interface';
import { useDispatch, useSelector } from 'react-redux';
import { LOCAL_STORAGE_REMOVE } from '../helper/LocalStorageHelper';
import { SignOut } from '../services/Auth/auth.services';
import { setbottomSheetHandler } from '../store/features/bottomSheetHandler/bottomSheetHandler';
import { AppDispatch, store } from '../store/app/store'; 
import { setApiCallLoader } from '../store/features/apiCallLoader/apiCallLoader';
import { UserGroupArr } from '../utils/hierarchyLoginCheck';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { logoutUser } from '../store/features/login/logoutHandler';
import DynamicShimmerPlaceholder from '../utils/dynamicShimmerPlaceholder';
import { CommonToastModel } from '../utils/ToastMessageModel';
import { setScanTokentHandler } from '../store/features/tokenData/scanTokenData';
import AlertInfo from './alertInfo';
// import Sound from 'react-native-sound';
const MenuItem = ({ item, isChild, menuData, updateMenuData }: any) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const dispatchlogout = useDispatch<AppDispatch>();
  const [logOut, setLogOut] = useState(false);
  const navigation = useNavigation<any>();
  const isAPICall = useSelector((state: any) => state.apiCallLoader);
  // GET PROFILE DATA FROM STORE
  const userProfileData = useSelector((state: any) => state.userProfileData);
  const [painterProfileData, setPainterProfileData] = useState<any>([]);
  const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
  const [getExecutiveLogin, setExecutiveLogin] = useState('');
  const bottomSheetReVisitMeetQR = useRef(null);

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



  const handlePress = (item: I_GET_MENU.MenuList) => {
    if (item.menu_name === "Visit/Meet QR" && UserGroupArr.includes(getExecutiveLogin.toLowerCase())) {
      CommonToastModel('error', i18n.t("ApplicableForPainterOnly"), 5000);
      return;
    }
    if (item.child_menu != null) {
      setIsCollapsed(!isCollapsed);
      item.isCollapse = !item.isCollapse
      console.log("item.isCollapse", item.isCollapse)

      // if (item.isParent) {
      //   menuData.map((menus: any) => {
      //     if (menus.id != item.id && menus.isParent == true) {
      //       console.log("menus.id", menus.id, "item.id", item.id)
      //       menus.isCollapse = true
      //     }
      //   })
      // }

      // updateMenuData(menuData);

    } else {
      console.log(!isCollapsed)
      setIsCollapsed(false);
      redirect(item);
    }
  };




  // useEffect(() => {},[])
  // Function to recursively update the isCollapse property
  const updateMenuItems = (menus: any) => {
    return menus.map((item: any) => {
      if (item.isCollapse === false) {
        item.isCollapse = true;
      }
      if (item.child_menu) {
        item.child_menu = updateMenuItems(item.child_menu);
      }
      return item;
    });
  };

  const dispatch = useDispatch();

  const redirect = (val: I_GET_MENU.MenuList) => {
    if (val && val.mobile_link != '') {
      if (val.mobile_link.toLowerCase() === 'logout') {
        setIsCollapsed(true);
        menuData = JSON.parse(JSON.stringify(updateMenuItems(menuData)))
        updateMenuData(menuData);
        setLogOut(true);
      }
      else if (val.mobile_link.toLowerCase() === 'buildyourprofile') {
        if (userProfileData) {
          if (painterProfileData && painterProfileData[0].build_your_profile_applicable_yn.toLowerCase() != 'n') {
            if (painterProfileData[0].view_painter_cv_yn.toLowerCase() == 'n') {
              navigation.navigate('BuildYourProfile')
            } else {
              navigation.navigate('PainterCVCard')
            }
          } else {
            CommonToastModel('error', painterProfileData[0].build_your_profile_applicable_msg, 5000);
          }
        };
      }
      // else if (val.mobile_link.toLowerCase() === 'visitqrlist') {
      //   if (UserGroupArr.includes(getExecutiveLogin.toLowerCase())) { 
      //     CommonToastModel('error', i18n.t("ApplicableForPainterOnly"), 5000);
      //   } else {
      //     store.dispatch(setbottomSheetHandler({ modelAction: true, modelName: 'VisitMeetQR', }))
      //     autoClose()
      //   }
      // }
      else if (val.mobile_link.toLowerCase() === 'privacypolicy') {
        Linking.openURL('https://www.bergerpaints.com/about-us/policies/privacy-policy')
      } else if (val.mobile_link.toLowerCase() === 'myattendance') {
        if (UserGroupArr.includes(getExecutiveLogin.toLowerCase())) {
          CommonToastModel('error', i18n.t("ApplicableForPainterOnly"), 5000);
        } else {
          // setupdateModalFlag(false) 
          store.dispatch(setScanTokentHandler({
            scanType: 'MeetAttendance',
            scanData: ''
          }));
          // makeSoundEffect()
          navigation.navigate('QRScan');
        }
      }
      // else if (val.mobile_link.toLowerCase() === 'leadsinfo') {
      // autoClose()
      //   dispatch(
      //     setbottomSheetHandler({
      //       modelAction: true,
      //       modelName: 'Leads info',
      //     }),
      //   );
      // }
      // else if (val.mobile_link.toLowerCase() === 'scantoken') {
      // autoClose()
      //   dispatch(
      //     setbottomSheetHandler({
      //       modelAction: true,
      //       modelName: 'Scan Token',
      //     }),
      //   );
      // }
      else if (val.mobile_link) {
        // console.log(val.mobile_link)
        navigation.navigate(val.mobile_link);
      }
    }
  };

  // const autoClose = () => {
  //   store.dispatch(setbottomSheetHandler({}));
  // };

  // const clickSound: any = new Sound(require('../assets/sounds/silent.mp3'), Sound.MAIN_BUNDLE, (error: any) => {
  //   if (error) {
  //     console.log("Failded to load the sound", error);
  //     return;
  //   }
  // });

  // const makeSoundEffect = () => {
  //   clickSound.play((success: any) => {
  //     if (success) {
  //       console.log('successfully finished playing');
  //     } else {
  //       console.log('playback failed due to audio decoding errors');
  //     }
  //   });
  // };

  const confirm = () => {
    dispatch(setApiCallLoader(true));
    SignOut().then((response: any) => {
      if (response) {
        commonLogoutFunction();
      } else {
        commonLogoutFunction();
      }
    })
      .catch(err => {
        commonLogoutFunction();
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
      });
  };

  const commonLogoutFunction = () => {
    dispatchlogout(logoutUser());
    LOCAL_STORAGE_REMOVE();
    // store.dispatch(setvirtualUserData(null));
    // store.dispatch(executiveLoginCheckReducer({ IsRepresentative: '', UserGroupCode: '' }));
    // store.dispatch(setKycIdProofLov([]));
    // store.dispatch(setBenefitNotice({ showNotice: false, todayDate: '' }));
    // dispatch(setBenefitNotice({ showNotice: false, todayDate: '' }))
    // dispatch(setApiCallLoader(false));
    setLogOut(false);
    navigation.navigate('SplashScreen');
    CommonToastModel('error', i18n.t('LoggedOutSuccessfully'), 5000);
  };

  const cancel = () => {
    setLogOut(false);
  };

  const { t } = useTranslation();

  const preprocessMenu = (menu: I_GET_MENU.MenuList) => {
    if (menu.child_menu && menu.child_menu.length > 0) {
      menu.child_menu = menu.child_menu.map(child => ({
        ...child,
        hasSubChild: true,
      }));
    }
    return menu;
  };
  const isDisabledForExecutive = item.menu_name === "Visit/Meet QR" && UserGroupArr.includes(getExecutiveLogin.toLowerCase());
  const menuColor = isDisabledForExecutive ? Colors.color_gray : Colors.color_black;

  return (
    <View>
      <View style={{ paddingTop: isChild ? 0 : 10, paddingHorizontal: 10, paddingBottom: 0 }}>
        {/* <Pressable onPress={() => handlePress(item)}
          style={{
            padding: isChild ? 5 : 10,
            paddingRight: isChild ? 0 : 10,
            borderRadius: 8,
            borderBottomLeftRadius: item.isCollapse == false ? 0 : 8,
            borderBottomRightRadius: item.isCollapse == false ? 0 : 8,
            ...styles.menu,
          }}> */}
        <Pressable
          onPress={() => !isDisabledForExecutive && handlePress(item)}
          disabled={isDisabledForExecutive}
          style={{
            padding: isChild ? 5 : 10,
            paddingRight: isChild ? 0 : 10,
            borderRadius: 8,
            borderBottomLeftRadius: item.isCollapse == false ? 0 : 8,
            borderBottomRightRadius: item.isCollapse == false ? 0 : 8,
            //backgroundColor: isDisabledForExecutive ? '#f0f0f0' : '#FFFFFF',
            ...styles.menu,
          }}
        >
          <Pressable onPress={() => handlePress(item)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 2,
            }}>
            {isChild && item.hasSubChild != true && (
              <Ionicons
                style={{ marginRight: 10, marginLeft: 30 }}
                name={'ellipse-sharp'}
                size={6}
                color="gray"
              />
            )}

            {isChild && item.hasSubChild == true && (
              <Ionicons
                style={{ marginRight: 10, marginLeft: 35 }}
                name={'caret-forward-outline'}
                size={14}
                color="gray"
              />
            )}
            {!isChild && item.icon_img_yn === 'Y' && (
              <Image source={{ uri: item.icon }} style={[styles.menuImages]} />
            )}
            <Text
              onPress={() => !isDisabledForExecutive && handlePress(item)}
              style={{
                color: isDisabledForExecutive ? 'gray' : Colors.color_black,
                fontFamily: Fonts.OpenSans600SemiBold
              }}>
              {item.menu_name}
            </Text>

          </Pressable>
          {item.child_menu && item.child_menu.length > 0 && (
            <Ionicons
              name={item.isCollapse == false ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={menuColor}
            />
          )}

        </Pressable>
      </View>

      <Collapsible collapsed={item.isCollapse}>
        <View
          style={{
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: '#fff',
            borderBottomLeftRadius: item.isCollapse == false ? 8 : 0,
            borderBottomRightRadius: item.isCollapse == false ? 8 : 0,
          }}>
          {item.child_menu && item.child_menu.length > 0 && item.child_menu.map((childItem: I_GET_MENU.MenuList) => {
            // Preprocess the childItem before rendering
            const updatedChildItem = preprocessMenu(childItem);

            return (
              <View key={updatedChildItem.id}>
                <MenuItem item={updatedChildItem} isChild={true} />
              </View>
            );
          })}
        </View>
      </Collapsible>

      {logOut && (
        <AlertInfo
          skipNow={() => cancel()}
          confirmAction={() => confirm()}
          allowSkip={true}
          headerText={t("logOutHeader")}
          subHeaderText={t("logoutSubHead")}
          confirmActionButtonText={t("Confirm")}
          skipButtonText={t("Cancel")}
          isAPICall={isAPICall}
        />
      )}
    </View>
  );
};

const CollapsibleMenu = ({ menuData, updateMenuData }: any) => {
  return (
    <View>
      {menuData.map((item: I_GET_MENU.ChildMenu) => (
        <MenuItem key={item.id} item={item} isChild={false} menuData={menuData} updateMenuData={updateMenuData} />
      ))}
    </View>
  );
};



// Recursive function to add isCollapse: true to each object
const addIsCollapse = (menuData: any, flag: boolean) => {
  return menuData.map((menuItem: any) => {
    const updatedMenuItem = {
      ...menuItem,
      isCollapse: true,
      isParent: flag ? true : false
    };
    // console.log("updatedMenuItem", updatedMenuItem)
    if (updatedMenuItem.child_menu) {
      updatedMenuItem.child_menu = addIsCollapse(updatedMenuItem.child_menu, false);
    }
    return updatedMenuItem;
  });
}



// Usage in your component
const NestedDrawerMenu = () => {
  // let menuData = useSelector((state: any) => state.menuData);
  const { siteMenuData, status, error } = useSelector((state: any) => state.menuData);
  let menuData = addIsCollapse(siteMenuData, true);
  // console.log("menuData>>>>>>>>>>>>>>>>>", JSON.stringify(menuData))
  const [updatedMenuData, setUpdatedMenuData] = useState(menuData);

  const updateMenuData = (menuData: any) => {
    setUpdatedMenuData(menuData);
  };

  return (
    <View>
      {status === 'succeeded' && Array.isArray(menuData) && <CollapsibleMenu menuData={menuData} updateMenuData={updateMenuData} />}
      {status === 'loading' && (
        <View style={{ paddingHorizontal: 10, zIndex: 0 }}>
          <DynamicShimmerPlaceholder borderRadius={10} height={12} width={"100%"} count={1} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  menuImages: {
    width: 25,
    height: 25,
    marginRight: 10,
    resizeMode: 'contain',
  },
});
export default NestedDrawerMenu;
