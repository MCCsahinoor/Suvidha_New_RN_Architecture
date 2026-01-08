import React, { useEffect, useRef, useState, memo } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { phoneNumberRegex, emailRegEx, inValid } from '../../../utils/regexList';
import styles from './styles';
import { Colors, Fonts } from '../../../themes';
import InputFields from '../../inputField';
import ButtonLarge from '../../ButtonLarge';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InitialAvatar from '../../InitialAvatar';
import InputFieldWithValidate from '../../inputFieldWithValidate';
import Card from '../../Card';
import { GetUserProfile, SaveMyProfileDetails, ValidateWhatsappNoOTP, WhatsAppValidationSendOTP } from '../../../services/Profile/Profile.services';
import ModalComponent from '../../Modal';
import { I_SEND_PAINTER_EMAIL_OTP_VALIDATION, I_SEND_PAINTER_EMAIL_VALIDATION, I_SEND_PAINTER_WHATSAPP_OTP_VALIDATION, I_SEND_PAINTER_WHATSAPP_VALIDATION, I_SUBMIT_USER_PROFILE_DATA, } from '../../../Interfaces/userProfile.interface';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setApiCallLoader } from '../../../store/features/apiCallLoader/apiCallLoader';
import { setbottomSheetHandler } from '../../../store/features/bottomSheetHandler/bottomSheetHandler';
import BottomSheet from '../../BottomSheet';
import { setPullToRefresh } from '../../../store/features/menu/pullToRefresh';
import { setuploadImageHandler } from '../../../store/features/fileUpload/uploadImageUrlSlice';
import { useFocusEffect } from '@react-navigation/native';
import { CommonToastModel } from '../../../utils/ToastMessageModel';
import { UserGroupArr } from '../../../utils/hierarchyLoginCheck';
import AlertInfo from '../../alertInfo';
import { setuserProfileLanguageData } from '../../../store/features/userProfile/userProfileLanguageSlice';
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';
import { SendEmailOtp, ValidateEmailOtp } from '../../../services/EmailVerify/emailVerify.services';
import { setProfileData } from '../../../store/features/userProfile/profileSlice';
import OtpInputGroup from './OTPInputGroup';
import OTPInputCustom from '../../OTPInputFieldCustom';
import InputFieldWithValidateEmail from '../../InputFieldWithValidateEmail';
import ProfileOctagonIcon from '../../../assets/svg/ProfileOctagon';
import CallingIcon from '../../../assets/svg/calling';
import UserAddIcon from '../../../assets/svg/User-add';
import CustomBottomSheet from '../../CustomBottomSheet';

const MyProfileForm = ({ navigation }: any) => {
  const [getTeamMember, setTeamMember] = useState<any[]>([]);
  const [isKeyBoardOpen, setisKeyBoardOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [addMembersErrors, setAddMembersErrors] = useState<Partial<AddMemberFormData>>({});
  const [openOTPModal, setOpenOTPModal] = useState(false);
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const [isWhatsappNoVerified, setIsWhatsappNoVerified] = useState(false);
  const maximumCodeLength = 4;
  const dispatch = useDispatch();
  const [openOTPError, setOpenOTPError] = useState(false);
  const userProfileDataForReview = useSelector((state: any) => state.userProfileData); // GET USER PROFILE INFO
  const [getProfileImageReviewed, setProfileImageReviewed] = useState('');
  const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
  const [getExecutiveLogin, setExecutiveLogin] = useState('');
  const [submitKycModel, setSubmitKycModel] = useState(false);
  const LanguageListLov = useSelector((state: any) => state.preferredLanguageData);
  const { t } = useTranslation();
  const [reset, setReset] = useState(false);
  const [openEmailOTPModal, setOpenEmailOTPModal] = useState(false);
  const [otpCodeEmail, setOTPCodeEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [openEmailOTPError, setOpenEmailOTPError] = useState(false);
  const maximumCodeLengthEmail = 6;
  const [isAPICalledWtsp, setIsAPICalledWtsp] = useState(false);
  const [isAPICalledEmail, setIsAPICalledEmail] = useState(false);
  const [originalEmail, setOriginalEmail] = useState('');
  const [myTeamBottomSheetModel, setMyTeamBottomSheetModel] = useState(false);
  const [addTeamBottomSheetModel, setAddTeamBottomSheetModel] = useState(false);

  useEffect(() => {
    if (executiveLoginCheck) {
      setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
    }
  }, [executiveLoginCheck]);

  interface FormData {
    full_name: string;
    number: string;
    whatsapp_no: string;
    email_id: string;
    location: string;
    language: string;
    whatsapp_no_verified: boolean;
    email_verified: boolean;
    user_img: string;
  }

  interface AddMemberFormData {
    member_name: string;
    member_mobile_no: string;
  }

  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    number: '',
    whatsapp_no: '',
    email_id: '',
    location: '',
    language: '',
    whatsapp_no_verified: false,
    email_verified: false,
    user_img: '',
  });

  const [addMemberFormData, setaddMemberFormData] = useState<AddMemberFormData>(
    {
      member_name: '',
      member_mobile_no: '',
    },
  );

  useEffect(() => {
    setaddMemberFormData(addMemberFormData);
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setisKeyBoardOpen(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setisKeyBoardOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [addMemberFormData]);

  //// PROFILE IMAGE Reviewed SET ////
  useEffect(() => {
    if (userProfileDataForReview && userProfileDataForReview.length > 0) {
      setProfileImageReviewed(userProfileDataForReview[0].reviewed_yn);
    }
  }, [userProfileDataForReview]);

  // useEffect(() => {
  //   console.log('getTeamMember', getTeamMember);
  // }, [getTeamMember]);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    console.log('formData', formData);

    // Basic validation for each field
    if (formData.full_name.trim() === '') {
      newErrors.full_name = i18n.t('NameIsRequired');
    }

    if (formData.number.trim() === '') {
      newErrors.number = i18n.t('ContactRequired');
    } else if (formData.number.trim().length !== 10) {
      newErrors.number = i18n.t('Contact10digitslong');
    } else if (!phoneNumberRegex.test(formData.number.trim())) {
      newErrors.number = i18n.t('InvalidContact');
    }

    if (formData.whatsapp_no.trim() === '') {
      newErrors.whatsapp_no = i18n.t('ContactRequired');
    } else if (formData.whatsapp_no.trim().length !== 10) {
      newErrors.whatsapp_no = i18n.t('Contact10digitslong');
    } else if (!phoneNumberRegex.test(formData.whatsapp_no.trim())) {
      newErrors.whatsapp_no = i18n.t('InvalidContact');
    }

    // For email
    // if (formData.email_id.trim() === '') {
    //   newErrors.email_id = i18n.t('EmailRrequired');
    // } else
    if (formData.email_id.trim() !== '') {
      // if (inValid.test(formData.email_id) == true) {
      //   newErrors.email_id = i18n.t('EmptySpacesEmail');
      // }
      if (
        formData.email_id == '' &&
        formData.email_id != undefined &&
        formData.email_id != null
      ) {
        newErrors.email_id = i18n.t('EmailRrequired');
      }
      if (!formData.email_id.includes('@')) {
        newErrors.email_id = i18n.t('EmailNotValid');
      }
      if (formData.email_id.split('@').length > 1) {
        if (!formData.email_id.split('@')[1].includes('.')) {
          newErrors.email_id = i18n.t('EmailNotValid');
        }
        if (formData.email_id.split('@')[1].includes('..')) {
          newErrors.email_id = i18n.t('EmailNotValid');
        }
        if (
          formData.email_id.includes('@gmail') &&
          !formData.email_id.includes('com')
        ) {
          newErrors.email_id = i18n.t('EmailNotValid');
        }
      }
      // if (emailRegEx.test(formData.email_id) == false) {
      //   newErrors.email_id = i18n.t('YouInvalidEmailAddress');
      // }
    }

    // For email

    if (formData.location.trim() === '') {
      newErrors.location = i18n.t('LocationRequired');
    }

    if (formData.language.trim() === '') {
      newErrors.language = i18n.t('LanguageRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAddMemberForm = () => {
    const newAddMemberErrors: Partial<AddMemberFormData> = {};
    // Basic validation for each field
    if (!addMemberFormData.member_name) {
      newAddMemberErrors.member_name = i18n.t('NameIsRequired');
    }

    if (addMemberFormData.member_mobile_no.trim() === '') {
      newAddMemberErrors.member_mobile_no = i18n.t('PhoneRequired');
    } else if (addMemberFormData.member_mobile_no.trim().length !== 10) {
      newAddMemberErrors.member_mobile_no = i18n.t('Contact10digitslong');
    } else if (!phoneNumberRegex.test(addMemberFormData.member_mobile_no.trim())) {
      newAddMemberErrors.member_mobile_no = i18n.t('InvalidContact');
    } else if (addMemberFormData.member_mobile_no == userProfileData[0].painter_mobile || addMemberFormData.member_mobile_no == userProfileData[0].wa_ph_no) {
      newAddMemberErrors.member_mobile_no = i18n.t('PainterMobile/WhatsAPPCanNotAdd');
    }

    setAddMembersErrors(newAddMemberErrors);
    return Object.keys(newAddMemberErrors).length === 0;
  };

  const finalAddMembersSubmit = () => {
    const isValid = validateAddMemberForm();
    if (isValid) {
      const isDuplicate = getTeamMember.some((member: any) => member.member_mobile_no === addMemberFormData.member_mobile_no);
      if (isDuplicate) {
        CommonToastModel('error', i18n.t('MemberAlreadyExists'), 2000);
      } else {
        saveMemberData();
      }
      return true; // Indicate successful submission
    } else {
      return false; // Indicate submission failure
    }
  };

  const saveMemberData = () => {
    setTeamMember(prev => [...prev, addMemberFormData]);
    setaddMemberFormData({
      member_name: '',
      member_mobile_no: '',
    });
    setAddTeamBottomSheetModel(false)
  };
  const handleAddMemberChange = (name: string, value: any) => {
    const filteredValue = value.replace(/[^\x20-\x7E]/g, '');
    const errorMessage = value !== filteredValue ? i18n.t('OnlyEnglishAallowed') : '';
    setAddMembersErrors({
      ...addMembersErrors,
      [name]: errorMessage,
    });
    setaddMemberFormData({
      ...addMemberFormData,
      [name]: filteredValue,
    });
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

  const viewAllTeamMember = (): void => {
    setMyTeamBottomSheetModel(true)
  };

  const openAddteamMemberModal = (): void => {
    setAddTeamBottomSheetModel(true)
  };

  const removeMember = (index: number): void => {
    let newteam = getTeamMember.filter((member: any, i: number) => i !== index);
    setTeamMember(newteam);
  };

  const cancel = (): void => {
    setAddMembersErrors({});
    setaddMemberFormData({
      member_name: '',
      member_mobile_no: '',
    });

    setAddTeamBottomSheetModel(false)
  };
  const selectlanguage = () => {
    dispatch(setbottomSheetHandler({
      modelAction: true,
      modelName: 'selectlanguage',
      selectedLanguage: formData.language
    }));
  };


  const userProfileData = useSelector((state: any) => state.userProfileData);
  const user_img = useSelector((state: any) => state.uploadUrl);

  useEffect(() => {
    if (userProfileData && userProfileData.length > 0) {
      const languageCodes = userProfileData[0].language && userProfileData[0].language.split(",");
      const selectedLanguages = LanguageListLov && LanguageListLov.filter((lang: { lang_code: any; }) => languageCodes.includes(lang.lang_code));
      const selectedLanguageDescriptions = selectedLanguages.map((lang: { lang_desc: any; }) => lang.lang_desc);
      setOriginalEmail(userProfileData[0].email_id?.trim() || '');
      setFormData({
        full_name: userProfileData[0].painter_name,
        number: userProfileData[0].painter_mobile,
        whatsapp_no: userProfileData[0].wa_ph_no,
        email_id: userProfileData[0].email_id,
        location: userProfileData[0].full_address,
        language: selectedLanguageDescriptions.join(", ") != "" ? selectedLanguageDescriptions.join(", ") : userProfileData[0].language,
        whatsapp_no_verified: userProfileData[0].wa_valid === 'Y' ? true : false,
        email_verified: userProfileData[0].email_required_validation === 'Y' ? true : false,
        user_img: (user_img && user_img.includes("TEMP")) ? user_img : '',
      });
      setIsWhatsappNoVerified(
        userProfileData[0].wa_valid === 'Y' ? true : false,
      );
      setIsEmailVerified(
        userProfileData[0].email_valid === 'Y' ? true : false,
      )
      setTeamMember(userProfileData[0].team_members);
      if (userProfileData[0].wa_valid) {
        setErrors({})
      }
    }
  }, [userProfileData, user_img]);


  useFocusEffect(
    React.useCallback(() => {
      // setFormData(prevDate => ({ ...prevDate, user_img: userProfileData[0].user_img }));
      setFormData(prevDate => ({ ...prevDate, user_img: userProfileData[0].profile_pic }));
      return () => {
        dispatch(setuploadImageHandler(''));
        dispatch(setuserProfileLanguageData(''));
        setFormData(prevDate => ({ ...prevDate, user_img: '' }));
      };
    }, []),
  );

  // *************** set Language *************** //
  const selectedLang = useSelector((state: any) => state.profileLanguage);
  useEffect(() => {
    // console.log("selectedLang", selectedLang)
    if (selectedLang) {
      setFormData(prevDate => ({ ...prevDate, language: selectedLang }));
    }
  }, [selectedLang]);

  const validate = (): void => {
    if (!phoneNumberRegex.test(formData.whatsapp_no.trim())) {
      CommonToastModel('error', i18n.t('InvalidContact'), 5000);
    } else {
      let data: I_SEND_PAINTER_WHATSAPP_VALIDATION = {
        mobile_no: formData.whatsapp_no,
      };
      setIsAPICalledWtsp(true);
      WhatsAppValidationSendOTP(data).then((response: any) => {
        if (response.response_code === 1) {
          setIsAPICalledWtsp(false);
          setOpenOTPModal(true);
          CommonToastModel('success', response.response_message, 5000);
        } else {
          setIsAPICalledWtsp(false);
          CommonToastModel('error', response.response_message, 5000);
        }
        setErrors({})
      }).catch((err: any) => {
        setIsAPICalledWtsp(false);
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
      });
    }
  };
  const validateEmail = (): void => {
    if (!emailRegEx.test(formData.email_id.trim())) {
      CommonToastModel('error', i18n.t('InvalidEmail'), 5000);
    } else {
      let data: I_SEND_PAINTER_EMAIL_VALIDATION = {
        email_id: formData.email_id,
        otp: 0,
      };
      //dispatch(setApiCallLoader(true));
      setIsAPICalledEmail(true);
      SendEmailOtp(data, {}).then((response: any) => {
        if (response.response_code === 1) {
          //dispatch(setApiCallLoader(false));
          setIsAPICalledEmail(false);
          setOpenEmailOTPModal(true);
          CommonToastModel('success', response.response_message, 5000);
        } else {
          // dispatch(setApiCallLoader(false));
          setIsAPICalledEmail(false);
          CommonToastModel('error', response.response_message, 5000);
        }
        setErrors({})
      }).catch((err: any) => {
        //dispatch(setApiCallLoader(false));
        setIsAPICalledEmail(false);
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
      });
    }
  };

  const submitWhatsAppOTP = (): void => {
    if (otpCode) {
      setOpenOTPError(false)
      let data: I_SEND_PAINTER_WHATSAPP_OTP_VALIDATION = {
        mobile_no: formData.whatsapp_no,
        otp: parseInt(otpCode),
        user_id: '',
      };
      dispatch(setApiCallLoader(true));
      ValidateWhatsappNoOTP(data)
        .then((response: any) => {
          setErrors({})
          if (response.response_code === 1) {
            setOpenOTPModal(false);
            dispatch(setApiCallLoader(false));
            setOTPCode('');
            CommonToastModel('success', response.response_message);
            setFormData(prevDate => ({ ...prevDate, whatsapp_no_verified: true }));
            setIsWhatsappNoVerified(true)
          } else {
            CommonToastModel('error', response.response_message);
          }
        })
        .catch((err: any) => {
          setErrors({})
          dispatch(setApiCallLoader(false));
          CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
        });
    } else {
      setOpenOTPError(true)
    }
  };

  const submitEmailOTP = (): void => {
    if (otpCodeEmail) {
      setOpenEmailOTPError(false)
      let data: I_SEND_PAINTER_EMAIL_OTP_VALIDATION = {
        email_id: formData.email_id,
        otp: parseInt(otpCodeEmail),
      };
      dispatch(setApiCallLoader(true));
      ValidateEmailOtp(data, {})
        .then((response: any) => {
          setErrors({})
          if (response.response_code === 1) {
            setOpenEmailOTPModal(false);
            dispatch(setApiCallLoader(false));
            setOTPCodeEmail('');
            CommonToastModel('success', response.response_message);
            // setIsWhatsappNoVerified(true);
            setFormData(prevDate => ({ ...prevDate, whatsapp_no_verified: true }));
            setIsEmailVerified(true)
          } else {
            CommonToastModel('error', response.response_message);
          }
        })
        .catch((err: any) => {
          setErrors({})
          dispatch(setApiCallLoader(false));
          CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
        });
    } else {
      setOpenEmailOTPError(true)
    }
  };

  // const finalSubmit = () => {
  //   const isValid = validateForm();
  //   if (isValid) {
  //     // Perform submission logic here
  //     console.log(formData.whatsapp_no_verified)
  //     if (formData.whatsapp_no_verified == false || isWhatsappNoVerified == false) {
  //       setErrors({
  //         ...errors,
  //         ['whatsapp_no']: i18n.t('ValidateWhatsappNumber'),
  //       });
  //       // newErrors.whatsapp_no
  //     } else {
  //       // finalProfileSubmit();
  //       setSubmitKycModel(true);
  //     }
  //     if (formData.email_verified == false || isEmailVerified == false) {
  //       setErrors({
  //         ...errors,
  //         ['whatsapp_no']: i18n.t('ValidateEmail'),
  //       });
  //       // newErrors.whatsapp_no
  //     } else {
  //       // finalProfileSubmit();
  //       setSubmitKycModel(true);
  //     }
  //     if (formData.whatsapp_no_verified == false || isEmailVerified == false) {
  //       setErrors({
  //         ...errors,
  //         ['whatsapp_no']: i18n.t('ValidateWhatsappNumber'),
  //       });

  //       // newErrors.whatsapp_no
  //     } else {
  //       // finalProfileSubmit();
  //       setSubmitKycModel(true);
  //     }
  //     return true; // Indicate successful submission
  //   } else {
  //     return false; // Indicate submission failure
  //   }
  // };
  type FormErrors = {
    whatsapp_no?: string;
    email?: string;
  };

  //const [errors, setErrors] = useState<FormErrors>({});

  const finalSubmit = () => {
    const isValid = validateForm();

    if (!isValid) {
      return false;
    }

    const newErrors: Partial<FormData> = {};
    let hasError = false;

    if (formData.whatsapp_no_verified === false || isWhatsappNoVerified === false) {
      newErrors.whatsapp_no = i18n.t('ValidateWhatsappNumber');
      hasError = true;
    }

    if (isEmailVerified === false) {
      newErrors.email_id = i18n.t('ValidateYourEmail');
      hasError = true;
    }

    if (hasError) {
      setErrors({
        ...errors,
        ...newErrors,
      });
      return false;
    }

    // All validations passed
    setSubmitKycModel(true);
    return true;
  };

  const finalProfileSubmit = (): void => {
    // getTeamMember.map(())
    let data: I_SUBMIT_USER_PROFILE_DATA = {
      painter_guid: '',
      painter_code: '',
      painter_cont_id: '',
      painter_mobile_no: formData.number,
      user_id: '',
      user_img: (formData.user_img && formData.user_img.includes("TEMP")) ? formData.user_img : '',
      email_id: formData.email_id,
      wa_ph_no: formData.whatsapp_no,
      wa_valid_yn: formData.whatsapp_no_verified ? 'Y' : 'N',
      email_valid_yn: formData.email_verified ? 'Y' : 'N',
      full_addr: formData.location,
      work_area: '',
      state: '',
      city: '',
      locality: '',
      language: formData.language,
      team_members: getTeamMember,
    };
    skipNow();
    dispatch(setApiCallLoader(true));
    SaveMyProfileDetails(data)
      .then((response: any) => {
        dispatch(setApiCallLoader(false));
        if (response.response_code === 1) {
          setOpenOTPModal(false);
          setOpenEmailOTPModal(false);
          setOTPCode('');
          setOTPCodeEmail('');
          CommonToastModel('success', response.response_message, 5000);
          // dispatch(setProfileData([]));
          dispatch(setApiCallLoader(true));
          GetUserProfileCheck();
          dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: true }));
          navigation.pop(1)
          navigation.replace('Home')
        } else {
          CommonToastModel('error', response.response_message, 5000);
        }
      })
      .catch((err: any) => {
        skipNow();
        dispatch(setApiCallLoader(false));
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
      });
  };

  const GetUserProfileCheck = () => {
    GetUserProfile().then((response: any) => {
      if (response && response.data && response.data.length > 0) {
        dispatch(setProfileData(response.data));
        gotoHome()
      } else {
        gotoHome()
      }
      dispatch(setApiCallLoader(true));
    }).catch((err: { error: { response: { data: { errorMessage: string; }; }; }; }) => {
      gotoHome()
      dispatch(setApiCallLoader(true));
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  }

  const gotoHome = () => {
    navigation.pop(1)
    navigation.replace('Home')
  }

  const closeOTPModal = () => {
    setOpenOTPModal(false);
    setOTPCode('');
    dispatch(setApiCallLoader(false));
    setReset(prev => !prev)
  };

  const closeOTPModalEmail = () => {
    setOpenEmailOTPModal(false);
    setOTPCodeEmail('');
    dispatch(setApiCallLoader(false));
    setReset(prev => !prev)
  };

  const onPressCameraOption = () => {
    if (!UserGroupArr.includes(getExecutiveLogin.toLowerCase())) {
      dispatch(setbottomSheetHandler({ modelAction: true, modelName: 'PNTR_PORT_IMG' }));
    }
  };

  // API CALL CHECK IF API CALL START THEN BUTTON DESABLED
  const isAPICall = useSelector((state: any) => state.apiCallLoader);

  const onPressClose = (flag: string) => {
    if (flag === 'myTeam') {
      setMyTeamBottomSheetModel(false)
    }

    if (flag === 'addTeam') {
      setAddTeamBottomSheetModel(false)
    }
  };

  useEffect(() => {
    if (
      userProfileData &&
      userProfileData.length > 0 &&
      formData.whatsapp_no.length === 10
    ) {
      if (userProfileData[0].wa_ph_no != formData.whatsapp_no) {
        setFormData(prevDate => ({ ...prevDate, whatsapp_no_verified: false }));
        setIsWhatsappNoVerified(false);
      } else {
        setFormData(prevDate => ({ ...prevDate, whatsapp_no_verified: true }));
        setIsWhatsappNoVerified(true);
      }
    } else {
      setFormData(prevDate => ({ ...prevDate, whatsapp_no_verified: false }));
      setIsWhatsappNoVerified(false);
    }
  }, [formData.whatsapp_no]);

  useEffect(() => {
    if (userProfileData && userProfileData.length > 0 && userProfileData[0].email_id != "") {
      const profileEmail = userProfileData[0].email_id;
      const formEmail = formData.email_id?.trim() || '';
      if (formEmail != profileEmail) {
        setFormData(prev => ({ ...prev, email_verified: true }));
        setIsEmailVerified(false);
      } else {
        setFormData(prev => ({ ...prev, email_verified: false }));
        setIsEmailVerified(true);
      }
    }
    else {
      setFormData(prevDate => ({ ...prevDate, email_verified: false }));
      setIsEmailVerified(false);
    }
  }, [formData.email_id]);



  const skipNow = () => {
    setSubmitKycModel(false);
  };


  const handleOtpChange = (otp: string) => {
    if (otp.length === 0) setOTPCode('');
  };
  const handleOtpChangeEmail = (otp: string) => {
    if (otp.length === 0) setOTPCodeEmail('');
  };

  const handleOtpComplete = (otp: string) => {
    // let stringOtp = otp.toString();
    setOTPCode(otp);
  };
  const handleOtpCompleteEmail = (otp: string) => {
    // let stringOtp = otp.toString();
    setOTPCodeEmail(otp);
  }; 


  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'white', flex: 1 }} keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 100} >
        <View style={{ marginTop: 5, paddingHorizontal: 15, flex: 1 }}>
          <View style={{ ...styles.profilePicturePosition }}>
            <View style={{ width: '18%', ...styles.gridItem }}>
              <Pressable
                onPress={() => {
                  onPressCameraOption();
                }}>

                <View style={{ marginLeft: -10 }}>
                  <InitialAvatar
                    name={formData.full_name}
                    profilePic={formData.user_img}
                    size={90}
                    fontSize={17}
                  ></InitialAvatar>
                  <View style={{ ...styles.underReview, backgroundColor: Colors.ui_dark_bg, top: 60 }}>
                    <Ionicons
                      name={'pencil-outline'}
                      size={14}
                      color={Colors.color_white}
                    />
                  </View>
                </View>
              </Pressable>
            </View>
          </View>


          <InputFields
            showLabel={true}
            label={t("FullName")}
            showPlaceholder={true}
            placeholder={t("FullNamePlaceholder")}
            onChange={(val: any) => handleChange('full_name', val)}
            keyboardType={'default'}
            error={errors.full_name}
            isRequiredMark={true}
            defaultValue={formData.full_name}
            editable={false}
          />

          <InputFields
            showLabel={true}
            label={t("PhoneNumber")}
            showPlaceholder={true}
            placeholder={t("PhoneNumberPlaceholder")}
            onChange={(val: any) => handleChange('number', val)}
            keyboardType={'number-pad'}
            error={errors.number}
            isRequiredMark={true}
            maxLength={10}
            defaultValue={formData.number}
            editable={false}
          />

          <InputFieldWithValidate
            showLabel={true}
            label={t("WhatsappNumber")}
            showPlaceholder={true}
            placeholder={t("WhatsappNumberPlaceholder")}
            onChange={(val: any) => {
              handleChange('whatsapp_no', val);
            }}
            keyboardType={'number-pad'}
            error={errors.whatsapp_no}
            isRequiredMark={true}
            maxLength={10}
            defaultValue={formData.number}
            validate={validate}
            disabled={isAPICalledWtsp}
            isAPICall={isAPICalledWtsp}
            isWhatsappVerified={isWhatsappNoVerified}
            editable={UserGroupArr.includes(getExecutiveLogin.toLowerCase()) ? false : true}
          />

          <InputFieldWithValidateEmail
            showLabel={true}
            label={t("EmailId")}
            showPlaceholder={true}
            placeholder={t("EmailIdPlaceholder")}
            onChange={(val: any) => handleChange('email_id', val)}
            keyboardType={'default'}
            error={errors.email_id}
            isRequiredMark={true}
            //maxLength={100}
            defaultValue={formData.email_id}
            validate={validateEmail}
            disabled={isAPICalledEmail}
            isAPICall={isAPICalledEmail}
            isWhatsappVerified={isEmailVerified}
            editable={
              !isAPICalledWtsp &&
              !UserGroupArr.includes(getExecutiveLogin.toLowerCase())
            }
          />

          <InputFields
            showLabel={true}
            label={t("location")}
            showPlaceholder={true}
            placeholder={t("locationPlaceholder")}
            onChange={(val: any) => handleChange('location', val)}
            keyboardType={'default'}
            error={errors.location}
            isRequiredMark={true}
            defaultValue={formData.location}
            editable={UserGroupArr.includes(getExecutiveLogin.toLowerCase()) ? false : true}
          />

          <View style={{ position: 'relative' }}>
            <Pressable onPress={() => { selectlanguage(); }} style={{ backgroundColor: '#F2F2F2', width: '100%', height: 40, borderRadius: 8, paddingLeft: 10, paddingTop: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginTop: 10 }}>
              {formData.language ? (
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text style={{ color: Colors.color_black, fontSize: 12, marginTop: -30, fontFamily: Fonts.OpenSans600SemiBold }}>Language
                    <Text style={{ color: '#dc3545', fontSize: 12 }}> *</Text>
                  </Text>
                  <Text style={{ color: Colors.color_dark_gray, fontSize: 14, paddingTop: 10, fontFamily: Fonts.OpenSans600SemiBold, }}>{formData.language}</Text>
                </View>
              ) : (
                <Text style={{ color: Colors.color_black, fontSize: 12 }}>
                  <Text style={{
                    position: 'absolute',
                    left: 7,
                    top: 18,
                    fontSize: 15,
                    color: Colors.color_gray,
                    zIndex: 9999,
                    fontFamily: Fonts.OpenSans600SemiBold,
                  }}>Language
                    <Text style={{ color: '#dc3545', fontSize: 12 }}> *</Text>
                  </Text>
                </Text>
              )}

            </Pressable>
            {(errors.language) && (
              <Text style={{ ...styles.error, bottom: 0, right: 0 }}>{errors.language}</Text>
            )}
          </View>

          <View style={{ ...styles.generalInfoContainer, width: '100%' }}>
            <View style={{ width: '100%', marginVertical: 10 }}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
                  <Text style={{ ...styles.labelInput }}>{t("TeamMember")}</Text>

                  {!UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && (
                    <Pressable
                      style={{
                        position: 'absolute',
                        right: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}
                      onPress={() => openAddteamMemberModal()}>
                      <UserAddIcon width={25} height={25} />
                      <Text
                        style={{ fontSize: 15, marginRight: 10, color: '#456568', fontFamily: Fonts.OpenSans500Medium }}>
                        {t("AddMember")}
                      </Text>
                    </Pressable>
                  )}
                </View>

                <Pressable
                  onPress={() => {
                    viewAllTeamMember();
                  }}>
                  {getTeamMember && getTeamMember.length > 0 && (
                    <Ionicons
                      style={{ ...styles.dotContacts }}
                      size={30}
                      name="ellipsis-horizontal"
                    />
                  )}
                </Pressable>
              </View>

              {getTeamMember && getTeamMember.length > 0 ? (
                <Pressable
                  onPress={() => {
                    viewAllTeamMember();
                  }}>
                  <View
                    style={{
                      marginTop: 5,
                      width: '100%',
                      ...styles.groupingMember,
                    }}>
                    {getTeamMember && getTeamMember.length > 0 && (
                      <>
                        {getTeamMember.slice(0, 5).map((item, index) => (
                          <View key={index} style={{ marginLeft: -20 }}>
                            <InitialAvatar
                              name={item.member_name}
                              profilePic={item.profileImages}
                              size={45}
                              fontSize={17}></InitialAvatar>
                          </View>
                        ))}
                        {getTeamMember && getTeamMember.length > 5 && (
                          <Text style={styles.teamMemberCount}>
                            {getTeamMember.length}+
                          </Text>
                        )}
                      </>
                    )}
                  </View>
                </Pressable>
              ) : (
                null
              )}
            </View>
          </View>

        </View>
        </KeyboardAvoidingView>
      </ScrollView>
      {!UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && (
        <View
          style={{
            paddingHorizontal: 15,
            backgroundColor: Colors.color_white,
            borderTopColor: Colors.color_gray + '20',
            borderTopWidth: 0.5,
          }}>
          <ButtonLarge
            title={t("Submit")}
            onPress={finalSubmit}
            fillBtn={true}
            key={'Next'}
            showIcon={false}
            iconName=""
            paddingVertical={8}
            paddingHorizontal={10}
            fontSize={19}
            iconSize={19}
            isAPICall={isAPICall}
            disabled={isAPICall}
          />
        </View>
      )}

      <CustomBottomSheet
        isVisible={myTeamBottomSheetModel}
        onClose={() => { setMyTeamBottomSheetModel(false) }}
        sheetTitle={t("MyTeam")}
      >
        <ScrollView style={{ backgroundColor: Colors.color_white }}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
            <View style={{ marginHorizontal: 5, marginTop: 10 }}>
              {getTeamMember.map((member: any, index) => (
                <View style={{ margin: 5 }} key={index}>
                  <Card style={{ padding: 5 }}>
                    <View
                      style={{ flexDirection: 'row', width: '100%', margin: 10, alignContent: 'center', alignItems: 'center' }}>
                      <View style={{ marginRight: 20 }}>
                        <InitialAvatar name={member.member_name} profilePic={''} size={45} fontSize={17}></InitialAvatar>
                      </View>
                      <View
                        style={{ width: '70%', flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <Text
                          style={{ fontFamily: Fonts.OpenSans600SemiBold, color: Colors.ui_dark_bg }}>
                          {member.member_name}
                        </Text>
                        <Text style={{ fontFamily: Fonts.OpenSans600SemiBold }}>
                          {member.member_mobile_no}
                        </Text>
                      </View>
                    </View>
                    <Ionicons style={{ ...styles.deleteCards }} size={20} name="trash-outline"
                      onPress={() => { removeMember(index) }}
                    />
                  </Card>
                </View>
              ))}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </CustomBottomSheet>

      <CustomBottomSheet
        isVisible={addTeamBottomSheetModel}
        onClose={() => onPressClose('addTeam')}
        sheetTitle={t("AddTeamMember")}
        hideCloseButton={true}
      >
        <>
          <View style={{ paddingHorizontal: 0, justifyContent: 'center' }}>
            <View style={{ paddingHorizontal: 35, marginBottom: Platform.OS === 'ios' ? 15 : 0 }}>
              <View
                style={{ width: '100%', ...styles.alignCenter, marginBottom: 5 }}>
                <View style={{ marginRight: 10 }}>
                  <ProfileOctagonIcon width={30} height={30} />
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={{
                      borderColor: addMembersErrors.member_name ? '#ffa5a1' : '#F2F2F2',
                      backgroundColor: addMembersErrors.member_name ? '#ffebea' : '#F2F2F2', ...styles.customInput,
                    }}
                    keyboardType={'default'}
                    secureTextEntry={false}
                    placeholder={t("EnterName")}
                    placeholderTextColor={Colors.color_gray}
                    onChangeText={(val: any) =>
                      handleAddMemberChange('member_name', val)
                    }
                    value={addMemberFormData.member_name}
                  />
                </View>
              </View>
              {addMembersErrors && (
                <Text style={[styles.error]}>
                  {addMembersErrors.member_name}
                </Text>
              )}
            </View>

            <View style={{ paddingHorizontal: 35, marginBottom: Platform.OS === 'ios' ? 15 : 0 }}>
              <View
                style={{ width: '100%', ...styles.alignCenter, marginBottom: 5 }}>
                <View style={{ marginRight: 10 }}>
                  <CallingIcon width={30} height={30} />
                </View>
                <View
                  style={{ width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <TextInput
                    style={{
                      borderColor: addMembersErrors.member_mobile_no ? '#ffa5a1' : '#F2F2F2',
                      backgroundColor: addMembersErrors.member_mobile_no ? '#ffebea' : '#F2F2F2',
                      ...styles.customInput,
                    }}
                    keyboardType={'number-pad'}
                    secureTextEntry={false}
                    placeholder={t("EnterMobileNumber")}
                    placeholderTextColor={Colors.color_gray}
                    onChangeText={(val: any) =>
                      handleAddMemberChange('member_mobile_no', val)
                    }
                    maxLength={10}
                    value={addMemberFormData.member_mobile_no}
                  />
                </View>
              </View>
              {addMembersErrors && (
                <Text style={[styles.error]}>
                  {addMembersErrors.member_mobile_no}
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{ width: '50%', marginRight: 5 }}>
              <ButtonLarge
                title={t("close")}
                onPress={() => cancel()}
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
                title={t("Submit")}
                onPress={() => finalAddMembersSubmit()}
                fillBtn={true}
                key={'Submit'}
                showIcon={false}
                iconName=""
                paddingVertical={7}
                paddingHorizontal={5}
                fontSize={15}
                iconSize={19}
              // disabled={!doc.baseUrl || !doc.docNumber}
              />
            </View>
          </View>
        </>
      </CustomBottomSheet>


      {openOTPModal === true && (
        <ModalComponent>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{t("VerifyWhatsappNumber")}</Text>
              <Text style={{ marginBottom: 0, fontFamily: Fonts.OpenSans400Regular }}>
                {/* {t("OTPSend")} {formData.whatsapp_no} {t("mobileNumber")}{' '} */}
                {t("OTPSend")} {'******' + formData.whatsapp_no.slice(6)} {' '}
              </Text>
              <View style={{ width: '100%', marginTop: 5 }}>
                {/* <OTPInput
                  code={otpCode}
                  setCode={setOTPCode}
                  maximumLength={maximumCodeLength}
                  setIsPinReady={setIsPinReady}
                /> */}
                <OTPInputCustom
                  onOtpChange={handleOtpChange}
                  onOtpComplete={handleOtpComplete}
                  onReset={reset}
                />
                {openOTPError && (
                  <Text style={[styles.errorOtp]}>{t("EnterValideOTP")}</Text>
                )}
              </View>
              <View style={{ ...styles.fixedButton }}>
                <View style={{ width: '48%' }}>
                  <ButtonLarge
                    title={t("Cancel")}
                    onPress={() => closeOTPModal()}
                    fillBtn={false}
                    key={'cancel'}
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
                    title={t("SubmitOTP")}
                    onPress={submitWhatsAppOTP}
                    fillBtn={true}
                    key={''}
                    showIcon={false}
                    iconName=""
                    paddingVertical={7}
                    paddingHorizontal={5}
                    fontSize={isAPICall ? 13 : 15}
                    iconSize={19}
                    isAPICall={isAPICall}
                    disabled={isAPICall}
                  />
                </View>
              </View>
            </View>
          </View>
        </ModalComponent>
      )}


      {openEmailOTPModal === true && (
        <ModalComponent>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{t("VerifyEmailId")}</Text>
              <Text style={{ marginBottom: 0, fontFamily: Fonts.OpenSans400Regular }}>
                {t("OTPSend")} {formData.email_id} {' '}
              </Text>
              <View style={{ marginTop: 5, }}>

                <OtpInputGroup
                  length={6}
                  onComplete={(otp: string) => setOTPCodeEmail(otp)}
                  disabled={false}
                />
                {openEmailOTPError && (
                  <Text style={[styles.errorOtp]}>{t("EnterValideOTP")}</Text>
                )}
              </View>
              <View style={{ ...styles.fixedButton }}>
                <View style={{ width: '48%' }}>
                  <ButtonLarge
                    title={t("Cancel")}
                    onPress={() => closeOTPModalEmail()}
                    fillBtn={false}
                    key={'cancel'}
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
                    title={t("SubmitOTP")}
                    onPress={submitEmailOTP}
                    fillBtn={true}
                    key={''}
                    showIcon={false}
                    iconName=""
                    paddingVertical={7}
                    paddingHorizontal={5}
                    fontSize={isAPICall ? 13 : 15}
                    iconSize={19}
                    isAPICall={isAPICall}
                    disabled={isAPICall}
                  />
                </View>
              </View>
            </View>
          </View>
        </ModalComponent>
      )}


      {submitKycModel && (
        <AlertInfo
          skipNow={() => skipNow()}
          confirmAction={() => finalProfileSubmit()}
          allowSkip={true}
          headerText={t("MyProfileConfirmation")}
          subHeaderText={""}
          confirmActionButtonText={t("Submit")}
          skipButtonText={t("Cancel")}
          isAPICall={isAPICall}
        />
      )}
    </View>
  );
};

export default MyProfileForm;
