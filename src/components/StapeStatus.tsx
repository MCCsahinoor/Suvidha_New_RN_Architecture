/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '../themes';
import i18n from '../i18n';
import { useSelector } from 'react-redux';

export interface I_Stape_Icon_Box {
  icon: string;
  label: string;
  isActive: boolean;
  isValidate: boolean;
}

export interface I_Stepes {
  icon1: string;
  label1: string;
  tabCode1: string;
  icon2: string;
  label2: string;
  tabCode2: string;
  icon3: string;
  label3: string;
  tabCode3: string;
}

const getBuildYourProfileStepes = () => ({
  icon1: 'camera-outline',
  label1: i18n.t('ProfileImage'),
  tabCode1: 'profileImage',
  icon2: 'person-circle-outline',
  label2: i18n.t('GeneralInfo'),
  tabCode2: 'generalInformation',
  icon3: 'briefcase-outline',
  label3: i18n.t('Expertise'),
  tabCode3: 'expertise',
});

const getKYCStepes = () => ({
  icon1: 'person-circle-outline',
  label1: i18n.t('BasicInformation'),
  tabCode1: 'basicInformation',
  icon2: 'business-outline',
  label2: i18n.t('BankDetailsWithBreake'),
  tabCode2: 'bankDetails',
  icon3: 'attach-outline',
  label3: i18n.t('IDProofDetails'),
  tabCode3: 'idProof',
});

const getNewLeadEntryStepes = () => ({
  icon1: 'person-circle-outline',
  label1: i18n.t('Connect'),
  tabCode1: 'connect',
  icon2: 'location-outline',
  label2: i18n.t('Address'),
  tabCode2: 'address',
  icon3: 'briefcase-outline',
  label3: i18n.t('Requirement'),
  tabCode3: 'requirement',
});

export interface props {
  pageName: STEPES_FOR_PAGES;
  dataStep: any;
}
export enum STEPES_FOR_PAGES {
  NEW_LEAD_ENTRY = 'new-lead-entry',
  BUILD_PROFILE = 'build-profile',
  KYC = 'kyc',
}

const StapeStatus = ({ pageName, dataStep }: props) => {
  const [selectedStepObject, setSelectedStepObject] = useState<I_Stepes>(
    pageName === STEPES_FOR_PAGES.BUILD_PROFILE ? getBuildYourProfileStepes() : getKYCStepes(),
  );

  useEffect(() => {
    setSelectedStepObject(
      pageName === STEPES_FOR_PAGES.BUILD_PROFILE ? getBuildYourProfileStepes() : getKYCStepes()
    );
  }, [pageName]);

  useEffect(() => {
    setSelectedStepObject(
      pageName === STEPES_FOR_PAGES.NEW_LEAD_ENTRY ? getNewLeadEntryStepes() : getBuildYourProfileStepes()
    );
  }, [pageName]);

  useEffect(() => {
    const handleLanguageChange = () => {
      setSelectedStepObject(
        pageName === STEPES_FOR_PAGES.BUILD_PROFILE ? getBuildYourProfileStepes() : getKYCStepes()
      );
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [pageName]);

  // KYC STATUS SHOW START //
  const [userKycDetails, setKYCdetails] = useState<any>([]);
  const userProfileData = useSelector((state: any) => state.userProfileData);
  useEffect(() => {
    if (userProfileData && userProfileData.length > 0) {
      setKYCdetails(userProfileData[0].kyc_details);
    }
  }, [userProfileData]);
  // KYC STATUS SHOW END //

  const stepIconBox = ({ icon, label, isActive, isValidate }: I_Stape_Icon_Box) => {
    return (
      <>
        <View style={[styles.stepGrouping]}>
          <View style={{ backgroundColor: isActive === true ? Colors.color_white : isValidate === true ? Colors.color_active_stepper : Colors.color_like_disabled, borderWidth: 1, borderColor: isValidate === true ? Colors.color_active_stepper : 'white', ...styles.stepIconContainer }}>
            <Ionicons name={icon} size={30} color={Colors.ui_dark_bg} />
          </View>
          <Text numberOfLines={2} style={{ color: isActive === true ? Colors.color_white : isValidate === true ? Colors.color_white : Colors.color_like_disabled, ...styles.stepLabel }}>
            {label}
          </Text>
        </View>
      </>
    );
  };

  return (
    <>
      <View style={{ paddingBottom: 15 }}>
        <View style={[styles.stepContainer]}>
          <View>
            {stepIconBox({
              icon: selectedStepObject.icon1,
              label: selectedStepObject.label1,
              isValidate: dataStep && dataStep.isValidate && dataStep.isValidate.filter((value: string) => value === selectedStepObject.tabCode1).length > 0 ? true : false,
              isActive: dataStep.selectedTab == selectedStepObject.tabCode1 ? true : false,
            })}
            <View style={{ backgroundColor: dataStep && dataStep.isValidate && dataStep.isValidate.filter((value: string) => value === selectedStepObject.tabCode1).length > 0 ? Colors.color_active_stepper : Colors.color_like_disabled, ...styles.rectangle }} />
          </View>

          <View>
            {stepIconBox({
              icon: selectedStepObject.icon2,
              label: selectedStepObject.label2,
              isValidate: dataStep && dataStep.isValidate && dataStep.isValidate.filter((value: string) => value === selectedStepObject.tabCode2).length > 0 ? true : false,
              isActive: dataStep.selectedTab == selectedStepObject.tabCode2 ? true : false,
            })}
            <View style={{ backgroundColor: dataStep && dataStep.isValidate && dataStep.isValidate.filter((value: string) => value === selectedStepObject.tabCode2).length > 0 ? Colors.color_active_stepper : Colors.color_like_disabled, ...styles.rectangle }} />
          </View>

          <View>
            {stepIconBox({
              icon: selectedStepObject.icon3,
              label: selectedStepObject.label3,
              isValidate: dataStep && dataStep.isValidate && dataStep.isValidate.filter((value: string) => value === selectedStepObject.tabCode3).length > 0 ? true : false,
              isActive: dataStep.selectedTab == selectedStepObject.tabCode3 ? true : false,
            })}
          </View>
        </View>

        {pageName === STEPES_FOR_PAGES.KYC && (userKycDetails.length > 0 && userKycDetails[0] && userKycDetails[0].kyc_status) &&
          (userKycDetails[0].kyc_status.toLowerCase() === 'completed' || userKycDetails[0].kyc_status.toLowerCase() === 'submitted') && (
            <View style={{ paddingTop: 10 }}>
              <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontFamily: Fonts.OpenSans500Medium }}>
                Your KYC Status is: {userKycDetails[0].kyc_status.toUpperCase()}
              </Text>
            </View>
          )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  rectangle: {
    width: 100,
    height: 2.5,
    // marginLeft: -35,
    // marginRight: -30,
    // marginTop: -15,
    maxWidth: 100,
    minWidth: 140,
    position: 'absolute',
    left: 50,
    top: 25,
  },
  stepLabel: {
    fontSize: 13,
    fontFamily: Fonts.OpenSans600SemiBold,
    textTransform: 'capitalize',
    width: 85,
    textAlign: 'center',
  },
  stepIconContainer: {
    padding: 10,
    borderRadius: 100,

  },
  stepGrouping: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
  },
});

export default StapeStatus;
