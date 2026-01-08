/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import { View, Image, Platform, PermissionsAndroid } from 'react-native';
import styles from './styles';
import {Colors} from '../../themes';
import HeaderCurve from '../../components/HeaderCurve';
import StapeStatus, { STEPES_FOR_PAGES } from '../../components/StapeStatus';
import CameraOption from '../../components/CameraOptionSheetModel';
import ProfileImage from '../../components/ScreensComponent/BuildYourProfile/ProfileImage';
import GeneralInfo from '../../components/ScreensComponent/BuildYourProfile/GeneralInfo';
import Expertise from '../../components/ScreensComponent/BuildYourProfile/Expertise';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const BuildYourProfileScreen = ({ navigation }: any) => {

  const buildYourProfileStore = useSelector((state: any) => state.buildYourProfileData);
  const bottomSheetHandler = useSelector((state: any) => state.bottomSheetHandler);
  const [videoOption, setVideoOption] = useState(false);
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(false);
  const [getBuildYourProfile, setBuildYourProfile] = useState<any>({
    profileImage: null,
    generalInformation: null,
    expertise: null,
    selectedTab: 'profileImage',
  });

  const goToExpertise = (): void => { navigation.navigate('BuildProfileSuccess') };

  useEffect(() => {
    setBuildYourProfile(buildYourProfileStore);
  }, [buildYourProfileStore]);

  useEffect(() => {
    bottomSheetHandler.modelAction == true && bottomSheetHandler.modelName == 'expertiseWithVideo' ? setVideoOption(true) : setVideoOption(false);
  }, [bottomSheetHandler]);

  useEffect(() => {
    requestContactPermission();
  }, []);

  const requestContactPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
    } else {
      setHasPermission(true);  // iOS permissions are handled automatically
    }
  };

  return (
    <>
      <LinearGradient colors={['#36686D', '#84A2A5']} useAngle={true} angle={90} >
        <View style={{...styles.imageexpertContractor}}>
          <Image source={require('../../assets/images/expertContractor.png')} style={{ height: 45, width: 160, borderRadius: 8, resizeMode: 'contain' }} />
        </View>
        <View>
          <StapeStatus pageName={STEPES_FOR_PAGES.BUILD_PROFILE} dataStep={getBuildYourProfile} />
        </View>
      </LinearGradient>
      <HeaderCurve topGaap={119} headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'} pageBackground={'#fff'} /> 
      {getBuildYourProfile.selectedTab == 'profileImage' && (<ProfileImage />)}
      {getBuildYourProfile.selectedTab == 'generalInformation' && (<GeneralInfo />)}
      {getBuildYourProfile.selectedTab == 'expertise' && (<Expertise onPress={goToExpertise} navigation={navigation} />)}


      {videoOption === true ? (
        <CameraOption video={true} navigation={navigation} />
      ) : (
        <CameraOption />
      )}
    </>
  );
};

export default BuildYourProfileScreen;
