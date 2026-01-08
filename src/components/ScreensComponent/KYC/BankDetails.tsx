/* eslint-disable prettier/prettier */
import React, { useEffect, useState, memo } from 'react';
import { View, Text, Pressable, ImageBackground, ScrollView, Image, SafeAreaView, Platform, KeyboardAvoidingView } from 'react-native';
import { AppImages, Colors, Fonts } from '../../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonLarge from '../../ButtonLarge';
import Bank from '../../../assets/svg/bank.svg';
import InputFields from '../../inputField';
import InputFieldWithValidate from '../../inputFieldWithValidate';
import InputDropdown from '../../inputDropdown';
import FileUpload from '../../../assets/svg/fileUpload.svg';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { GetBankAccTypeLov, GetValidateIFSC } from '../../../services/KYC/kyc.services';
import { I_ACCOUNT_TYPE, I_Error_FormData, I_KYC_BANK_FormData, I_RECEIVED_IFSC_DATA, I_SEND_PAINTER_IFSC_VALIDATION } from '../../../Interfaces/kyc.interface';
import { setPainterKYCData } from '../../../store/features/PainterKYC/PainterKYCData';
import { setApiCallLoader } from '../../../store/features/apiCallLoader/apiCallLoader';
import { setbottomSheetHandler } from '../../../store/features/bottomSheetHandler/bottomSheetHandler';
import { setuploadImageHandler } from '../../../store/features/fileUpload/uploadImageUrlSlice';
import { numberRegex } from '../../../utils/regexList';
import { UserGroupArr } from '../../../utils/hierarchyLoginCheck';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import SingelSelectdropdownWithLocalSearch from '../../SingelSelectdropdownWithLocalSearch';
import { CommonToastModel } from '../../../utils/ToastMessageModel';
import { screenHeight } from '../../../utils/scale';


const BankDetails = () => {
  const dispatch = useDispatch();
  // API CALL CHECK IF API CALL START THEN BUTTON DESABLED
  const isAPICall = useSelector((state: any) => state.apiCallLoader);
  // USER KYC STORE DATA
  const allKycData = useSelector((state: any) => state.setPainterKYCData);
  // USER PROFILE DATA
  const userProfileData = useSelector((state: any) => state.userProfileData);
  // OPEN CAMERA MODEL
  const onPressCameraOption = () => {
    dispatch(setbottomSheetHandler({ modelAction: true, modelName: 'bank_images' }));
  };
  const [errors, setErrors] = useState<Partial<I_Error_FormData>>({});
  const [formData, setFormData] = useState<I_KYC_BANK_FormData>({
    ifsc_code: '',
    bank_name: '',
    branch_name: '',
    hdn_acc_no: '',
    acc_no: '',
    acc_type: 'SBA',
    acc_img: '',
    ifsc_code_valid: false
  });
  const [clearTextBox, setClearTextBox] = useState<boolean>(false);
  const [passbookImageValidate, setPassbookImageValidate] = useState<string>('');
  const [accountType, setAccountType] = useState<I_ACCOUNT_TYPE.I_MODI_ACCOUNT_TYPE[]>([]);
  const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
  const [getExecutiveLogin, setExecutiveLogin] = useState('');
  const [getModelViewImageError, setModelViewImageError] = useState(false);
  const { t } = useTranslation();


  useEffect(() => {
    if (executiveLoginCheck) {
      setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
    }
  }, [executiveLoginCheck]);


  // BANK DETAILS FORM VALIDATION ERROR MASSAGE SET
  const validateForm = () => {
    const newErrors: Partial<I_KYC_BANK_FormData> = {};

    if (formData.ifsc_code.trim() === '') {
      newErrors.ifsc_code = i18n.t('IFSCError');
    }
    if (formData.bank_name.trim() === '') {
      newErrors.bank_name = i18n.t('BankNameMandatory');
    }
    if (formData.branch_name.trim() === '') {
      newErrors.branch_name = i18n.t('BranchNameMandatory');
    }
    if (formData.ifsc_code_valid == false) {
      newErrors.ifsc_code = i18n.t('IFSCcodeisnotValid');
    }
    if (formData.hdn_acc_no.trim() === '') {
      newErrors.hdn_acc_no = i18n.t('Acc/No.isMandatory');
    }
    if (formData.acc_no.trim() === '') {
      newErrors.acc_no = i18n.t('ConfirmAcc/No.isMandatory');
    }
    if (formData.acc_no != formData.hdn_acc_no) {
      newErrors.acc_no = i18n.t('MismatchInAcc/Nos');
    }
    if (formData.acc_type === '') {
      newErrors.acc_type = i18n.t('AccountTypeSelectionisMandatory');
    }
    if ((formData.acc_img == null && isPassbookImage == null) || (formData.acc_img == '' && isPassbookImage == '')) {
      newErrors.acc_img = i18n.t('PassbookimageisMandatory');
      setPassbookImageValidate(i18n.t('PassbookimageisMandatory'));
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // BANK DETAILS FORM VALIDATION
  const handleChange = (name: string, value: any) => {
    if ((name == 'hdn_acc_no' || name == 'acc_no') && numberRegex.test(value) == false) {
      setErrors({
        ...errors,
        [name]: i18n.t('Onlynumbersareallow'),
      });

      // Update the form data with the new value
      setFormData({
        ...formData,
        // [name]: value,
        [name]: typeof value === 'object' ? value.value : value,
      });

      setClearTextBox(false);
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });

      // Update the form data with the new value
      setFormData({
        ...formData,
        [name]: value,
      });

      setClearTextBox(false);
    }

    if (name == 'ifsc_code') {
      setFormData(prevDate => ({
        ...prevDate,
        bank_name: '',
        branch_name: '',
        ifsc_code_valid: false
      }));
    }
  };

  // GET IMAGE HOSTED URL FROM CAMERA COMPONENT
  const [isPassbookImage, setPassbookImage] = useState('');
  const user_img = useSelector((state: any) => state.uploadUrl);
  useEffect(() => {
    if (user_img != '') { setPassbookImage(user_img); }
  }, [user_img]);

  // WHEN RECEIVED IMAGE PATH THEN SET IMAGE TO PASSBOOK IMAGE
  useEffect(() => {
    if (isPassbookImage) {
      setFormData(prevDate => ({ ...prevDate, acc_img: isPassbookImage }));
      dispatch(setuploadImageHandler(''));
      setPassbookImageValidate('');
    }
  }, [isPassbookImage]);

  // REMOVE IMAGE
  const removeImg = () => {
    setPassbookImage('');
    setFormData(prevDate => ({ ...prevDate, acc_img: '' }));
  };


  // VALIDATE IFSC CODE
  const validateIfscCode = (): void => {
    let data: I_SEND_PAINTER_IFSC_VALIDATION = {
      ifsc: formData.ifsc_code,
    };
    if (formData.ifsc_code.length > 0) {
      dispatch(setApiCallLoader(true));
      GetValidateIFSC<I_SEND_PAINTER_IFSC_VALIDATION, I_RECEIVED_IFSC_DATA>(data).then(response => {
        setErrors({
          ...errors,
          ['bank_name']: '',
          ['branch_name']: '',
          ['ifsc_code']: '',
        });
        dispatch(setApiCallLoader(false));
        if (response) {
          setFormData(prevDate => ({
            ...prevDate,
            ifsc_code: response.IFSC,
            bank_name: response.BANK,
            branch_name: response.BRANCH,
            ifsc_code_valid: true
          }));
        } else {
          CommonToastModel('error', i18n.t('Somethingwentwrong'), 5000);
        }
      }).catch((err: any) => {
        dispatch(setApiCallLoader(false));
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
      });
    } else {
      CommonToastModel('error', i18n.t('PleaseEnteryourIFCScode'), 5000);
    }
  };

  // GET ACCOUNT TYPE LOV DATA
  useEffect(() => {
    GetBankAccTypeLovData();
  }, []);


  // BANK ACCOUNT TYPE LOV GET
  const GetBankAccTypeLovData = async (): Promise<void> => {
    GetBankAccTypeLov<any, I_ACCOUNT_TYPE.BANK_ACCOUNT_TYPE>()
      .then(response => {
        if (response && response.data && response.data.length > 0) {
          let accountTypeData: I_ACCOUNT_TYPE.I_MODI_ACCOUNT_TYPE[] = [];
          response.data.forEach(value => {
            accountTypeData.push({
              code: value.code,
              label: value.value,
              value: value.code,
              value_seq: value.value_seq,
            });
          });
          setAccountType(accountTypeData);
        }
      })
      .catch(err => {
        // console.error(err);
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
      });
  };

  // IF formData.acc_img & isPassbookImage is !null THEN SUCCESSFULL DATA STORE TO REDUX STORE AND GO TO ID PROOF SCREEN
  const goToNext = () => {
    if (!UserGroupArr.includes(getExecutiveLogin.toLowerCase())) {
      const isValid = validateForm();
      if (isValid) {
        saveBankDetails();
        return true;
      } else {
        dispatch(setPainterKYCData({
          ...allKycData,
          bankDetails: formData,
          idProof: null,
          isValidate: allKycData.isValidate.filter((value: string) => value === 'bankDetails').length > 0 ? allKycData.isValidate.filter((value: string) => value != 'bankDetails') : allKycData.isValidate,
        }),
        );
        return false;
      }
    } else {
      dispatch(setPainterKYCData({
        ...allKycData,
        selectedTab: 'idProof',
        isValidate: allKycData.isValidate.filter((value: string) => value === 'bankDetails').length > 0 ? allKycData.isValidate : [...allKycData.isValidate, 'bankDetails'],
      }),
      );
    }

  };

  const saveBankDetails = (): void => {
    dispatch(
      setPainterKYCData({
        ...allKycData,
        selectedTab: 'idProof',
        bankDetails: formData,
        idProof: null,
        isValidate: allKycData.isValidate.filter((value: string) => value === 'bankDetails').length > 0 ? allKycData.isValidate : [...allKycData.isValidate, 'bankDetails'],
      }),
    );
  };


  const cancel = () => {
    dispatch(
      setPainterKYCData({
        ...allKycData,
        selectedTab: 'basicInformation',
      }),
    );
  };





  // DATA SET to FROM DATA IF DATA ADDED IN setPainterKYCData STORE
  useEffect(() => {
    let ifscValid = false
    if (allKycData && allKycData.bankDetails) {
      const bankDetailsData = allKycData.bankDetails;
      if (bankDetailsData &&
        bankDetailsData.ifsc_code != '' && bankDetailsData.ifsc_code != null && bankDetailsData.ifsc_code != undefined &&
        bankDetailsData.bank_name != '' && bankDetailsData.bank_name != null && bankDetailsData.bank_name != undefined &&
        bankDetailsData.branch_name != '' && bankDetailsData.branch_name != null && bankDetailsData.branch_name != undefined) {
        ifscValid = true
      }
      setFormData({
        ifsc_code: bankDetailsData.ifsc_code,
        bank_name: bankDetailsData.bank_name,
        branch_name: bankDetailsData.branch_name,
        hdn_acc_no: bankDetailsData.hdn_acc_no,
        acc_no: bankDetailsData.acc_no,
        acc_type: bankDetailsData.acc_type,
        acc_img: bankDetailsData.acc_img,
        ifsc_code_valid: ifscValid
      });
      setPassbookImage(bankDetailsData.acc_img);
    } else {
      if (userProfileData && userProfileData.length > 0) {
        const kycDataInfo = userProfileData[0].kyc_details.length > 0 ? userProfileData[0].kyc_details[0] : '';
        if (kycDataInfo && (kycDataInfo ?? '') != '' &&
          kycDataInfo.ifsc_code != '' && kycDataInfo.ifsc_code != null && kycDataInfo.ifsc_code != undefined &&
          kycDataInfo.bank_name != '' && kycDataInfo.bank_name != null && kycDataInfo.bank_name != undefined &&
          kycDataInfo.branch_name != '' && kycDataInfo.branch_name != null && kycDataInfo.branch_name != undefined) {
          ifscValid = true
        }
        setFormData({
          ifsc_code: kycDataInfo.ifsc_code,
          bank_name: kycDataInfo.bank_name,
          branch_name: kycDataInfo.branch_name,
          hdn_acc_no: kycDataInfo.acc_no,
          acc_no: kycDataInfo.acc_no,
          acc_type: kycDataInfo.acc_type,
          acc_img: kycDataInfo.acc_img,
          ifsc_code_valid: ifscValid
        });
        setPassbookImage(kycDataInfo.acc_img);
      }
    }
  }, [allKycData, userProfileData]);



  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }} keyboardVerticalOffset={Platform.OS === 'ios' ? 65 : 0} >
        <ScrollView style={{ height: screenHeight - (Platform.OS === 'android' ? 300 : 400) }} keyboardShouldPersistTaps="handled">
          <View style={{ ...styles.container, flex: 1 }}>
            <View style={{ ...styles.sectionHeader }}>
              <Bank width={25} height={25} style={{ marginRight: 3 }} />
              <Text style={{ ...styles.sectionHeaderText }}>{t("BankDetails")}</Text>
            </View>

            <View style={{ marginTop: 5 }}>
              <InputFieldWithValidate
                showLabel={true}
                label={t("IFSCCode")}
                showPlaceholder={true}
                placeholder={t("EnterIFSCCode")}
                onChange={(val: any) => handleChange('ifsc_code', val)}
                keyboardType={'default'}
                validate={validateIfscCode}
                isWhatsappVerified={formData.ifsc_code_valid}
                editable={UserGroupArr.includes(getExecutiveLogin.toLowerCase()) ? false : true}
                isRequiredMark={true}
                error={errors.ifsc_code}
                disabled={isAPICall}
                isAPICall={isAPICall}
                defaultValue={formData.ifsc_code}
                autoCapitalize={'characters'}
                maxLength={11}
                onEndEditing={() => { }} />

              <InputFields
                showLabel={true}
                label={t("BankName")}
                showPlaceholder={true}
                placeholder={t("BankNamePlaceholder")}
                onChange={(val: any) => handleChange('bank_name', val)}
                keyboardType={'default'}
                isRequiredMark={true}
                error={errors.bank_name}
                defaultValue={formData.bank_name}
                editable={false}
              />
              <InputFields
                showLabel={true}
                label={t("BranchName")}
                showPlaceholder={true}
                placeholder={t("BranchNamePlaceholder")}
                onChange={(val: any) => handleChange('branch_name', val)}
                keyboardType={'default'}
                isRequiredMark={true}
                error={errors.branch_name}
                defaultValue={formData.branch_name}
                editable={false}
              />
              <InputFields
                showLabel={true}
                label={t("AccountNumber")}
                showPlaceholder={true}
                placeholder={t("AccountNumberPlaceholder")}
                onChange={(val: any) => handleChange('hdn_acc_no', val)}
                keyboardType={'numeric'}
                isRequiredMark={true}
                error={errors.hdn_acc_no}
                defaultValue={formData.hdn_acc_no}
                editable={UserGroupArr.includes(getExecutiveLogin.toLowerCase()) ? false : true}
              />
              <InputFields
                showLabel={true}
                label={t("ConfirmAccountNumber")}
                showPlaceholder={true}
                placeholder={t("ConfirmYourAccountNumber")}
                onChange={(val: any) => handleChange('acc_no', val)}
                keyboardType={'numeric'}
                isRequiredMark={true}
                error={errors.acc_no}
                defaultValue={formData.acc_no}
                editable={UserGroupArr.includes(getExecutiveLogin.toLowerCase()) ? false : true}
              />

              <SingelSelectdropdownWithLocalSearch
                optionData={accountType}
                showLabel={true}
                label={t("AccountType")}
                showPlaceholder={true}
                placeholder={t("AccountTypePlaceholder")}
                selectedValue={(val: any) => handleChange('acc_type', val.value)}
                error={errors.acc_type}
                isRequiredMark={true}
                defaultValue={formData.acc_type}
                resetTextBox={clearTextBox}
                editable={UserGroupArr.includes(getExecutiveLogin.toLowerCase()) ? true : false}
              />


              {/* <InputDropdown
              dropDownlabel={t("AccountType")}
              placeholder={t("AccountTypePlaceholder")}
              optionData={accountType}
              isRequiredMark={true}
              onChange={(val: any) => handleChange('acc_type', val)}
              error={errors.acc_type}
              resetTextBox={clearTextBox}
              defaultValue={formData.acc_type}
              editable={UserGroupArr.includes(getExecutiveLogin.toLowerCase()) ? true : false}
            /> */}

              <View style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 12, color: Colors.color_black, fontFamily: Fonts.OpenSans600SemiBold }}>
                  {t("UploadCancelledChequeOrPassbookImages")}{' '}
                  <Text style={{ color: 'red' }}>*</Text>
                </Text>
                {!isPassbookImage ? (
                  <>
                    <Pressable
                      onPress={() => {
                        onPressCameraOption();
                      }}>
                      <View style={{ ...styles.uploadDoc }}>
                        <FileUpload />
                        {/* <Text style={{ ...styles.uploadDocHeader }}>
                        {t("UploadYourCancelledChequeOrPassbookFrontPageImage")}
                      </Text> */}
                        <Text style={{ ...styles.uploadDocSubHeader }}>
                          {t("Image3MBAlert")}
                        </Text>
                      </View>
                    </Pressable>
                    {passbookImageValidate && (
                      <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.error]}>
                          {passbookImageValidate}
                        </Text>
                      </View>
                    )}
                  </>
                ) : (
                  <View style={{ ...styles.uploadDoc, padding: 5, }}>
                    {getModelViewImageError ? (
                      <Image
                        source={{ uri: AppImages.NoImagesAvailable }}
                        style={{ ...styles.backgroundContainerCover, backgroundColor: '#E9E9E9' }}
                        resizeMode="contain"
                      />
                    ) : (
                      <ImageBackground
                        source={{ uri: isPassbookImage }}
                        resizeMode="cover"
                        onError={() => setModelViewImageError(true)}
                        style={{ ...styles.backgroundContainerCover }}
                        imageStyle={{ borderRadius: 8 }}>
                        {!UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && (
                          <Ionicons style={{ ...styles.deleteImages }} size={20} name="close-outline" onPress={() => { removeImg(); }} />
                        )}
                      </ImageBackground>
                    )}
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* <SafeAreaView style={{ zIndex: 11, flex: 1, backgroundColor: 'white' }}> */}
      <View style={{ ...styles.fixedButton }}>
        <View style={{ width: '48%', marginRight: 5 }}>
          <ButtonLarge
            title={t("Back")}
            onPress={cancel}
            fillBtn={false}
            key={'Canel'}
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
            onPress={goToNext}
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
      {/* </SafeAreaView> */}

    </>
  );
};

export default memo(BankDetails);
