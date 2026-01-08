/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { AppImages, Colors, Fonts } from '../../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonLarge from '../../ButtonLarge';
import { setbottomSheetHandler } from '../../../store/features/bottomSheetHandler/bottomSheetHandler';
import { useDispatch, useSelector } from 'react-redux';
import { setbuildYourProfileData } from '../../../store/features/BuildYourProfile/buildYourProfileStore';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { resetUploadProfileImage, setUploadProfileImage } from '../../../store/features/BuildYourProfile/buildYourProfileImageStore';

const ProfileImage = ({ navigation }: any) => {

  const dispatch = useDispatch();
  const [flag, setFlag] = useState({ status: false });
  const user_IdProofImage = useSelector((state: any) => state.uploadUrl); // UPLOAD DOC IMAGES GET FROM STORES //
  const userProfileData = useSelector((state: any) => state.userProfileData); // GET USER PROFILE INFO
  const [isCameraOption, setCameraOption] = useState('');
  const [isProfileImage, setProfileImage] = useState(''); // Set image
  const [getProfileImageReviewed, setProfileImageReviewed] = useState('');
  const buildYourProfileStore = useSelector((state: any) => state.buildYourProfileData);
  const { t } = useTranslation();
  const uploadedTempImage = useSelector((state: any) => state.uploadProfileImage);
  const onPressCameraOption = () => {
    dispatch(setbottomSheetHandler({ modelAction: true, modelName: 'profileImageBYP' }));
  };

  //   useEffect(() => {
  //   return () => {
  //     if (!isProfileImageUploaded) {
  //       dispatch(resetBuildYourProfileData());
  //     }
  //   };
  // }, []);


  //// PROFILE IMAGE SET ////
  // useEffect(() => {
  //   if (userProfileData && userProfileData.length > 0) {
  //     setProfileImage(userProfileData[0].user_img);
  //   }
  // }, [userProfileData]);

  useEffect(() => {
    if (uploadedTempImage && uploadedTempImage !== '') {
      setProfileImage(uploadedTempImage);
    } else if (userProfileData && userProfileData.length > 0) {
      setProfileImage(userProfileData[0].user_img);
    }
  }, [uploadedTempImage, userProfileData]);




  //// PROFILE IMAGE Reviewed SET ////
  useEffect(() => {
    if (userProfileData && userProfileData.length > 0) {
      setProfileImageReviewed(userProfileData[0].reviewed_yn);
    }
  }, [userProfileData]);

  //// UPLOAD DOC IMAGES ////
  // useEffect(() => {
  //   if (user_IdProofImage != '') {
  //     setProfileImage(user_IdProofImage);
  //   }
  // }, [user_IdProofImage]);
  useEffect(() => {
    if (user_IdProofImage != '') {
      setProfileImage(user_IdProofImage);
      dispatch(setUploadProfileImage(user_IdProofImage)); // ✅ Save to persist
    }
  }, [user_IdProofImage]);


  // Retack Image
  // const retakePhoto = () => {
  //   setProfileImage('');
  // };

  const retakePhoto = () => {
    setProfileImage('');
    dispatch(resetUploadProfileImage()); // Clear temp stored image too
  };

  // Upload Images
  // const uploadPhoto = () => {
  //   dispatch(
  //     setbuildYourProfileData({
  //       ...buildYourProfileStore,
  //       selectedTab: 'generalInformation',
  //       profileImage: isProfileImage,
  //       isValidate: buildYourProfileStore.isValidate.filter((value: string) => value === 'profileImage').length > 0 ? buildYourProfileStore.isValidate : [...buildYourProfileStore.isValidate, 'profileImage'],
  //     }),
  //   );
  // };
  const uploadPhoto = () => {
    dispatch(
      setbuildYourProfileData({
        ...buildYourProfileStore,
        selectedTab: 'generalInformation',
        profileImage: isProfileImage,
        isValidate: buildYourProfileStore.isValidate.filter((value: string) => value === 'profileImage')
          ? buildYourProfileStore.isValidate
          : [...buildYourProfileStore.isValidate, 'profileImage'],
      })
    );

  };



  const [errorProfileImage, seterrorProfileImage] = useState(false);
  useEffect(() => {
    seterrorProfileImage(false);
  }, []);

  return (
    <>
      <ScrollView style={{ backgroundColor: Colors.color_white }}>
        {!isProfileImage ? (
          <View style={{ ...styles.container }}>
            <View style={{ ...styles.headerContainer }}>
              <Text style={{ ...styles.headerText }}>{t("Set Profile Photo")}</Text>
              <Text style={{ ...styles.subHeaderText }}>
                {t("CapturePhotoPecognised")}
              </Text>
            </View>

            <View style={{ marginVertical: 30, paddingHorizontal: 5 }}>
              <ImageBackground source={{ uri: userProfileData[0].user_img ? userProfileData[0].user_img : 'https://bpilmobile.bergerindia.com/VIRTUAL_DOCS/SUVIDHA_API/Application/Application_Image/avatar.png' }}
                resizeMode="cover" style={{ ...styles.backgroundContainer }} imageStyle={{ borderRadius: 8 }}>
                <Pressable
                  style={styles.captureImage}
                  onPress={() => { onPressCameraOption(); }}>
                  <Ionicons name={'camera-outline'} size={30} color={Colors.ui_dark_bg} />
                </Pressable>
              </ImageBackground>
              <Text style={{ marginTop: 20, ...styles.subHeaderText }}> {t("CaptureSubText")} </Text>
            </View>
          </View>
        ) : (
          <View>
            <View style={{ ...styles.container }}>
              <View style={{ ...styles.headerContainer }}>
                <Text style={{ ...styles.headerText }}>
                  {t("ProfilePhotoUploaded")}
                </Text>
                <Text style={{ ...styles.subHeaderText }}>
                  {t("UploadProfileImageSuccess")}
                </Text>
              </View>
              <View style={{ marginVertical: 0, paddingHorizontal: 5 }}>
                <View
                  style={{
                    marginVertical: 30,
                    paddingHorizontal: 5,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {errorProfileImage ? (
                    <ImageBackground source={{ uri: AppImages.NoImagesAvailable }}
                      resizeMode="cover"
                      style={{ ...styles.backgroundContainerCover }}
                      imageStyle={{ borderRadius: 1000 }}>
                      {getProfileImageReviewed && (
                        <View style={{ ...styles.underReview, backgroundColor: getProfileImageReviewed == 'Y' ? Colors.color_glow_green : '#D9D9D9' }}>
                          <Ionicons
                            name={'checkmark-done-outline'}
                            size={30} color={getProfileImageReviewed == 'Y' ? 'white' : Colors.color_dark_gray}
                          />
                        </View>
                      )}
                    </ImageBackground>
                  ) : (
                    <ImageBackground onError={() => seterrorProfileImage(true)} source={{ uri: isProfileImage ? isProfileImage : userProfileData[0].user_img }}
                      resizeMode="cover"
                      style={{ ...styles.backgroundContainerCover }}
                      imageStyle={{ borderRadius: 1000 }}>
                      {getProfileImageReviewed && (
                        <View style={{ ...styles.underReview, backgroundColor: getProfileImageReviewed == 'Y' ? Colors.color_glow_green : '#D9D9D9' }}>
                          <Ionicons
                            name={'checkmark-done-outline'}
                            size={30} color={getProfileImageReviewed == 'Y' ? 'white' : Colors.color_dark_gray}
                          />
                        </View>
                      )}
                    </ImageBackground>
                  )}
                </View>
                {getProfileImageReviewed && (
                  <Text style={{ ...styles.subHeaderText }}>
                    {getProfileImageReviewed == 'Y' ? i18n.t('YourImageProfileHasBeenApproved') : i18n.t('TheVerificationMightTakeSomeTime')}
                  </Text>
                )}

              </View>
            </View>
            <View style={{ ...styles.fixedButton }}>
              <View style={{ width: '48%', marginRight: 5 }}>
                <ButtonLarge
                  title={t("RetakePhoto")}
                  onPress={retakePhoto}
                  fillBtn={true}
                  key={'RetakePhoto'}
                  showIcon={false}
                  iconName=""
                  paddingVertical={7}
                  paddingHorizontal={5}
                  fontSize={15}
                  iconSize={19}
                />
              </View>
              <View style={{ width: '48%' }}>
                <ButtonLarge
                  title={t("UploadPhoto")}
                  onPress={uploadPhoto}
                  fillBtn={true}
                  key={'UploadPhoto'}
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
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 5,
  },
  headerContainer: {
    marginTop: 0,
  },
  headerText: {
    textAlign: 'center',
    color: Colors.ui_dark_bg,
    fontSize: 20,
    fontFamily: Fonts.poppins500Medium,
    textTransform: 'capitalize',
  },
  subHeaderText: {
    textAlign: 'center',
    color: Colors.dark_text_color,
    fontSize: 14,
    fontFamily: Fonts.OpenSans600SemiBold,
  },
  captureImage: {
    backgroundColor: Colors.color_white,
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderColor: Colors.color_light_gray,
    borderWidth: 1,
    shadowColor: Colors.shadow_light,
    elevation: 10,
  },
  backgroundContainer: {
    height: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundContainerCover: {
    height: 250,
    width: 250,
  },
  fixedButton: {
    backgroundColor: Colors.color_white,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  underReview: {
    width: 50,
    height: 50,
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'absolute',
    right: 15,
    borderWidth: 3,
    borderColor: 'white',
  },
});

export default ProfileImage;
