/* eslint-disable prettier/prettier */

import React, { useEffect, useState, memo, FC } from 'react';
import { View, Text, Pressable, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Colors, Fonts } from '../../../themes';
import ButtonLarge from '../../ButtonLarge';
import User from '../../../assets/svg/userOne.svg';
import InputFields from '../../inputField';
import ProfileCard from '../../profileCard';
import { useDispatch, useSelector } from 'react-redux';
import { ddmmyyyConverter, formatDate, getCurrentDate } from '../../../utils/formatDate';
import { emailRegEx, inValid, phoneNumberRegex } from '../../../utils/regexList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { setbottomSheetHandler } from '../../../store/features/bottomSheetHandler/bottomSheetHandler';
import { setsetAndGetDate } from '../../../store/features/DatePicker/setAndGetDate';
import { setPainterKYCData } from '../../../store/features/PainterKYC/PainterKYCData';
import styles from './styles';
import { checkAge } from '../../../utils/KycDobCheck';
import { I_BASIC_INFO_FormData } from '../../../Interfaces/kyc.interface';
import { UserGroupArr } from '../../../utils/hierarchyLoginCheck';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { screenHeight } from '../../../utils/scale';


export interface I_Basic_Info {
  onPressBackHome: Function;
}

const BasicInformation: FC<I_Basic_Info> = ({ onPressBackHome }) => {
  const dispatch = useDispatch();
  const currentDate = getCurrentDate();
  const allKycData = useSelector((state: any) => state.setPainterKYCData);
  const [errors, setErrors] = useState<Partial<I_BASIC_INFO_FormData>>({});
  const [formData, setFormData] = useState<I_BASIC_INFO_FormData>({
    depot_name: '',
    dealer: '',
    painter_mobile: '',
    email: '',
    alternate_mobile: '',
    dob: '',
  });
  const userProfileData = useSelector((state: any) => state.userProfileData);
  const [userKycDetails, setKYCdetails] = useState<any>([]);
  const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
  const [getExecutiveLogin, setExecutiveLogin] = useState('');

  const { t } = useTranslation();

  useEffect(() => {
    if (executiveLoginCheck) {
      setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
    }
  }, [executiveLoginCheck]);

  const validateForm = () => {
    const newErrors: Partial<I_BASIC_INFO_FormData> = {};
    const safeTrim = (value: string | null | undefined) => (value ?? '').trim();

    // DEPOT NAME
    if (safeTrim(formData.depot_name) === '') {
      newErrors.depot_name = i18n.t('DepotNameIsRequired');
    }
    // DEALER NAME
    if (safeTrim(formData.dealer) === '') {
      newErrors.dealer = i18n.t('Dealerisrequired');
    }
    // MOBILE NUMBER
    const painterMobile = safeTrim(formData.painter_mobile);
    if (painterMobile === '') {
      newErrors.painter_mobile = i18n.t('ContactRequired');
    } else
      if (formData.painter_mobile.trim().length !== 10) {
        newErrors.painter_mobile = i18n.t('Contact10digitslong');
      } else if (!phoneNumberRegex.test(formData.painter_mobile.trim())) {
        newErrors.painter_mobile = i18n.t('InvalidContact');
      }
    // EMAIL
    const email = safeTrim(formData.email);
    // if (email === '') {
    //   newErrors.email = i18n.t('EmailRrequired');
    // } else
    if (formData.email.trim() !== '') {
      if (inValid.test(formData.email) == true) {
        newErrors.email = i18n.t('EmptySpacesNotAllowedInDealerEmail');
      }
      // if (
      //   formData.email == '' &&
      //   formData.email != undefined &&
      //   formData.email != null
      // ) {
      //   newErrors.email = i18n.t('Emailismandatory');
      // }
      if (!formData.email.includes('@')) {
        newErrors.email = i18n.t('EmailNotValid');
      }
      if (formData.email.split('@').length > 1) {
        if (!formData.email.split('@')[1].includes('.')) {
          newErrors.email = i18n.t('EmailNotValid');
        }
        if (formData.email.split('@')[1].includes('..')) {
          newErrors.email = i18n.t('EmailNotValid');
        }
        if (
          formData.email.includes('@gmail') &&
          !formData.email.includes('com')
        ) {
          newErrors.email = i18n.t('EmailNotValid');
        }
      }
      // if (emailRegEx.test(formData.email) == false) {
      //   newErrors.email = 'You have entered an invalid email address.';
      // }
    }
    // ALTERNATE MOBILE NUMBER
    const alternateMobile = safeTrim(formData.alternate_mobile);
    // if (alternateMobile === '') {
    //   newErrors.alternate_mobile = i18n.t('ContactRequired');
    // } else
    // if (formData.alternate_mobile.trim().length !== 10) {
    //   newErrors.alternate_mobile = i18n.t('Contact10digitslong');
    // } else
    // if (!phoneNumberRegex.test(formData.alternate_mobile.trim())) {
    //   newErrors.alternate_mobile = i18n.t('InvalidContact');
    // }
    // D.O.B
    const dob = safeTrim(formData.dob);
    if (dob === '') {
      newErrors.dob = i18n.t('DOBIsRequired')
    } else if (!checkAge(formData.dob)) {
      // console.log(checkAge(formData.dob));
      newErrors.dob = i18n.t('Agegreaterthan18');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: string, value: any) => {
    // Clear the error message for the current field
    setErrors({
      ...errors,
      [name]: '',
    });

    // Update the form data with the new value
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // const [formatedDOBDate, setFormatedDOBDate] = useState('');
  useEffect(() => {
    if (userProfileData && userProfileData.length > 0) {
      setKYCdetails(userProfileData);
      if (userProfileData[0].kyc_details && userProfileData[0].kyc_details.length > 0) {
        setFormData({
          depot_name: userProfileData[0].kyc_details[0]?.depot_name,
          dealer: userProfileData[0].kyc_details[0].dealer_code + '-' + userProfileData[0].kyc_details[0].dealer_name,
          painter_mobile: userProfileData[0].kyc_details[0].painter_mobile,
          email: userProfileData[0].kyc_details[0].email,
          alternate_mobile: userProfileData[0].kyc_details[0].alternate_mobile,
          dob: userProfileData[0].kyc_details[0].dob,
        });
      } else {
        setFormData({
          depot_name: userProfileData[0]?.depot_code,
          dealer: userProfileData[0].dlr_code + '-' + userProfileData[0].dlr_name,
          painter_mobile: userProfileData[0].painter_mobile,
          email: userProfileData[0].email_id,
          alternate_mobile: '',
          dob: '',
        });
      }

      // const userPlaceholder = formatDate(userProfileData[0].kyc_details[0].dob);
      // setFormatedDOBDate(userPlaceholder);
    }
  }, [userProfileData]);

  const cancel = () => {
    // navigation.navigate('KycOnbording');
    // navigation.goBack();
  };

  const submit = () => {
    if (!UserGroupArr.includes(getExecutiveLogin.toLowerCase())) {
      const isValid = validateForm();
      if (isValid) {
        saveBasicInfo();
        return true;
      } else {
        dispatch(
          setPainterKYCData({
            ...allKycData,
            isValidate: allKycData.isValidate.filter((value: string) => value === 'basicInformation').length > 0 ? allKycData.isValidate.filter((value: string) => value != 'basicInformation') : allKycData.isValidate,
          }),
        );
        return false;
      }
    } else {
      dispatch(setPainterKYCData({
        ...allKycData,
        selectedTab: 'bankDetails',
        isValidate: allKycData.isValidate.filter((value: string) => value === 'basicInformation').length > 0 ? allKycData.isValidate : [...allKycData.isValidate, 'basicInformation'],
      }));
    }

  };

  const open = () => {
    if (!UserGroupArr.includes(getExecutiveLogin.toLowerCase())) {
      dispatch(setbottomSheetHandler({ modelAction: true, modelName: 'kycDob' }));
      dispatch(setsetAndGetDate({ setDateValue: formData.dob ? formData.dob : currentDate, getDateValue: '' }));
    }
  };

  const dateDataSetGet = useSelector((state: any) => state.setAndGetDate);
  useEffect(() => {
    if (dateDataSetGet && dateDataSetGet.getDateValue) {
      setFormData(prevDate => ({
        ...prevDate,
        dob: dateDataSetGet.getDateValue,
      }));
    }
  }, [dateDataSetGet.getDateValue]);


  // console.log('FROM BASIC INFORMATION', allKycData);
  // DATA SET to FROM DATA IF DATA ADDED IN setPainterKYCData STORE
  useEffect(() => {
    if (allKycData && allKycData.basicInformation) {
      const basicInfoData = allKycData.basicInformation;
      setFormData({
        depot_name: basicInfoData.depot_name,
        dealer: basicInfoData.dealer,
        painter_mobile: basicInfoData.painter_mobile,
        email: basicInfoData.email,
        alternate_mobile: basicInfoData.alternate_mobile,
        dob: basicInfoData.dob,
      });
    }
  }, [userProfileData]);

  const saveBasicInfo = (): void => {
    const updatedFormData = {
      ...formData,
      painter_name: userKycDetails[0].painter_name,
      wa_ph_no: userProfileData[0].wa_ph_no ? userProfileData[0].wa_ph_no : '',
      dob: ddmmyyyConverter(formData.dob, 'YYYY-MM-DD')
    };
    dispatch(
      setPainterKYCData({
        ...allKycData,
        selectedTab: 'bankDetails',
        basicInformation: updatedFormData,
        isValidate: allKycData.isValidate.filter((value: string) => value === 'basicInformation').length > 0 ? allKycData.isValidate : [...allKycData.isValidate, 'basicInformation'],
      }),
    );
  };

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }} keyboardVerticalOffset={Platform.OS === 'ios' ? 65 : 0} >
        <ScrollView style={{ backgroundColor: 'white', height: screenHeight - (Platform.OS === 'android' ? 300 : 400) }} keyboardShouldPersistTaps="handled">
          <View style={{ ...styles.container, flex: 1 }}>
            <View style={{ marginBottom: 18 }}>
              {userKycDetails[0] && userProfileData[0] && (
                <ProfileCard
                  fontColor={'#333333'}
                  showRating={false}
                  respresentiveShow={false}
                  name={userKycDetails[0].painter_name}
                  number={userKycDetails[0].painter_mobile}
                  profileImage={userProfileData[0].user_img}
                  showVerify={false}></ProfileCard>
              )}
            </View>
            <View style={{ ...styles.sectionHeader }}>
              <User width={25} height={25} style={{ marginRight: 3 }} />
              <Text style={{ ...styles.sectionHeaderText }}>
                {t("KYCDetails")}
              </Text>
            </View>

            <View style={{ marginTop: 5 }}>
              <InputFields
                showLabel={true}
                label={t("Depot")}
                showPlaceholder={true}
                placeholder={t("DepotPlaceholder")}
                onChange={(val: any) => handleChange('depot_name', val)}
                keyboardType={'default'}
                isRequiredMark={true}
                editable={false}
                error={errors.depot_name}
                defaultValue={formData.depot_name}
              />
              <InputFields
                showLabel={true}
                label={t("Dealer")}
                showPlaceholder={true}
                placeholder={t("DealerPlaceholder")}
                onChange={(val: any) => handleChange('dealer', val)}
                keyboardType={'default'}
                isRequiredMark={true}
                editable={false}
                error={errors.dealer}
                defaultValue={formData.dealer}
              />
              <InputFields
                showLabel={true}
                label={t("mobileNumber")}
                showPlaceholder={true}
                placeholder={t("EnterMobileNumber")}
                onChange={(val: any) => handleChange('painter_mobile', val)}
                keyboardType={'numeric'}
                isRequiredMark={true}
                maxLength={10}
                error={errors.painter_mobile}
                defaultValue={formData.painter_mobile}
                editable={false}
              />
              <InputFields
                showLabel={true}
                label={t("EmailId")}
                showPlaceholder={true}
                placeholder={t("EmailId")}
                onChange={(val: any) => handleChange('email', val)}
                keyboardType={'default'}
                isRequiredMark={false}
                error={errors.email}
                defaultValue={formData.email}
                editable={UserGroupArr.includes(getExecutiveLogin.toLowerCase()) ? false : true}
                autoCapitalize={'none'}
              />
              <InputFields
                showLabel={true}
                label={t("AlternateMobile")}
                showPlaceholder={true}
                placeholder={t("AlternateMobile")}
                onChange={(val: any) => handleChange('alternate_mobile', val)}
                keyboardType={'numeric'}
                isRequiredMark={false}
                error={errors.alternate_mobile}
                editable={UserGroupArr.includes(getExecutiveLogin.toLowerCase()) ? false : true}
                defaultValue={formData.alternate_mobile}
                maxLength={10}
              />
              <Pressable
                onPress={() => { open(); }}>
                <InputFields
                  showLabel={true}
                  label={t("DOB")}
                  showPlaceholder={true}
                  placeholder={t("DOB")}
                  onChange={(val: any) => handleChange('dob', val)}
                  keyboardType={'default'}
                  editable={false}
                  error={errors.dob}
                  isRequiredMark={true}
                  defaultValue={formData.dob ? formatDate(formData.dob) : ''}
                />
                <Ionicons
                  name="chevron-down-outline"
                  size={15}
                  style={{ position: 'absolute', right: 10, top: 25 }}
                />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={{ ...styles.fixedButton }}>
        <View style={{ width: '48%', marginRight: 5 }}>
          <ButtonLarge
            title={t("Cancel")}
            onPress={() => {
              onPressBackHome();
            }}
            fillBtn={false}
            key={'Cancel'}
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
            title={t("next")}
            onPress={submit}
            fillBtn={true}
            key={'Next'}
            showIcon={false}
            iconName=""
            paddingVertical={7}
            paddingHorizontal={5}
            fontSize={15}
            iconSize={19}
          />
        </View>
      </View>
    </>
  );
};

export default memo(BasicInformation);
