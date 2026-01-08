import React, { useEffect, useRef, useState, memo, FC } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, Image, ImageBackground, ScrollView, SafeAreaView, Platform, KeyboardAvoidingView } from 'react-native';
import { AppImages, Colors, Fonts } from '../../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonLarge from '../../ButtonLarge';
import Pin from '../../../assets/svg/pin.svg';
import InputFields from '../../inputField';
import FileUpload from '../../../assets/svg/fileUpload.svg';
import Card from '../../Card';
import styles from './styles';
import { setPainterKYCData } from '../../../store/features/PainterKYC/PainterKYCData';
import { useDispatch, useSelector } from 'react-redux';
import { setbottomSheetHandler } from '../../../store/features/bottomSheetHandler/bottomSheetHandler';
import BottomSheet from '../../BottomSheet';
import { GetMpKycDocTypeLov, saveUserKYC } from '../../../services/KYC/kyc.services';
import { I_IDPROOF_kycPayload, I_ID_PROOF, I_REDUX_KYC_DATA, I_RESPONSE_KYC_SUBMIT, I_SUBMIT_USER_KYC } from '../../../Interfaces/kyc.interface';
import { filename } from '../../../utils/uriToFileName';
import { kycDataFormatter, kycUserProfileDataFormatterForIdProof } from '../../../utils/kycDataFormatter';
import { setApiCallLoader } from '../../../store/features/apiCallLoader/apiCallLoader';
import AlertInfo from '../../alertInfo';
import { setPullToRefresh } from '../../../store/features/menu/pullToRefresh';
import { adharValid, licenseRegex, Passportregex, regpan } from '../../../utils/regexList';
import { setProfileData } from '../../../store/features/userProfile/profileSlice';
import { UserGroupArr } from '../../../utils/hierarchyLoginCheck';
import useDebounce from '../../../utils/useDebounces';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { CommonToastModel } from '../../../utils/ToastMessageModel';
import { setuploadImageHandler } from '../../../store/features/fileUpload/uploadImageUrlSlice';
import { screenHeight } from '../../../utils/scale';

export interface I_kyc {
  documents: I_IDPROOF_kycPayload[];
}
export interface I_Basic_Info {
  onPressBackHome: Function;
}
const IdProof: FC<I_Basic_Info> = ({ onPressBackHome }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const allKycData = useSelector((state: any) => state.setPainterKYCData);
  const userProfileData = useSelector((state: any) => state.userProfileData);
  const idProofValArr: I_IDPROOF_kycPayload[] = [
    { doc_path: '', doc_id: 'voter_card', doc_unique_no: '' },
    { doc_path: '', doc_id: 'pan', doc_unique_no: '' },
    { doc_path: '', doc_id: 'driving_license', doc_unique_no: '' },
    { doc_path: '', doc_id: 'passport', doc_unique_no: '' },
    { doc_path: '', doc_id: 'aadhar', doc_unique_no: '' },
  ];

  // FOR OTP BOTTOM SHEET
  const bottomSheetRef = useRef(null);
  const [getImageName, setImageName] = useState('');
  const [getModalTitle, setModalTitle] = useState('');
  const [getInputLabel, setInputLabel] = useState('');
  const [getInputPlaceholder, setInputPlaceholder] = useState('');
  const [getFileFrameTitle, setFileFrameTitle] = useState('');
  const [getFileFrameLabel, setFileFrameLabel] = useState('');
  const [selectedDoc, setSelectedDoc] = useState('');
  const [selectedDocNumber, setSelectedDocNumber] = useState<any>('');
  const debouncedValue = useDebounce(selectedDocNumber, 500);
  const [idProof, setIdProof] = useState<I_ID_PROOF.I_MODI_USER_ID_PROOF[]>([]);
  const [idProofValues, setIdProofValues] = useState(idProofValArr);
  const [idProofImage, setIdProofImage] = useState('');
  const user_IdProofImage = useSelector((state: any) => state.uploadUrl); // UPLOAD DOC IMAGES GET FROM STORES //
  const [submitKycModel, setSubmitKycModel] = useState(false);
  const IdProofLov = useSelector((state: any) => state.idProofLovKYCData); // ID PROOF LOV DATA GET FROM REDUX //
  const isAPICall = useSelector((state: any) => state.apiCallLoader); // API CALL CHECK IF API CALL START THEN BUTTON DESABLED
  const [errors, setErrors] = useState<any>('')
  const [errorsImages, setErrorsImage] = useState<any>('')
  const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
  const [isSubmitedFlag, SetIsSubmitedFlag] = useState<boolean>(false)
  const [getModelViewImageError, setModelViewImageError] = useState(false);
  const [changeIdNo, setOnChangeIdNo] = useState<any>('')
  const [getExecutiveLogin, setExecutiveLogin] = useState('');
  const [getEditModeCheck, setEditModeCheck] = useState(false);
  const [copyidProofImages, setCopyIdProofImages] = useState<any>('');
  const [copySelectedDocNumber, setCopySelectedDocNumber] = useState<any>('');
  const [userKycDetails, setKYCdetails] = useState<any>([]);

  useEffect(() => {
    if (userProfileData && userProfileData.length > 0) {
      setKYCdetails(userProfileData[0].kyc_details);
    }
  }, [userProfileData]);

  useEffect(() => {
    if (executiveLoginCheck) {
      setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
    }
  }, [executiveLoginCheck]);

  // IMAGE PATH ERROR HENDEL
  const handleError = (index: number) => {
    const newErrors = [...errorsImages];
    newErrors[index] = true;
    setErrorsImage(newErrors);
  };

  useEffect(() => {
    if (IdProofLov) {
      setIdProof(IdProofLov);
    }
  }, [IdProofLov]);

  useEffect(() => {
    if (idProofValues && idProofValues.length > 0) {
      // setModelViewImageError(false)
      idProofValues.map((doc: I_IDPROOF_kycPayload) => {
        if (doc.doc_id === selectedDoc) {
          if (debouncedValue) {
            doc.doc_unique_no = debouncedValue;
          }
          if (idProofImage) {
            doc.doc_path = idProofImage;
            doc.docFileName = idProofImage;
          }
        }
        idProof.map((docLables: any) => {
          if (doc.doc_id === docLables.value) {
            doc.docName = docLables.label;
          }
        });
      });
    } else {
      // setIdProofValues(idProofValArr)
    }
  }, [idProofValues, idProof, idProofImage, selectedDoc, debouncedValue]);

  const onPressCameraOption = () => {
    dispatch(setbottomSheetHandler({ modelAction: true, modelName: 'kyc_idProof_img' }));
  };

  //// UPLOAD DOC IMAGES ////
  useEffect(() => {
    if (user_IdProofImage != '') {
      setIdProofImage(user_IdProofImage);
    }
  }, [user_IdProofImage]);

  useEffect(() => {
    if (idProofImage) {
      let tempARR = JSON.parse(JSON.stringify(idProofValues));
      tempARR.forEach((doc: any) => {
        if (doc.doc_id === selectedDoc) {
          doc.doc_path = idProofImage;
          doc.docFileName = idProofImage;
          doc.prev_url = idProofImage;
          doc.doc_unique_no = changeIdNo
        }
      });
      setIdProofValues(tempARR);
      // console.log("sdsd", tempARR)
    }
  }, [idProofImage]);

  //// REMOVE UPLOAD DOC IMAGES ////
  const removeImg = (index: any) => {
    setIdProofImage('');
    let tempARR = JSON.parse(JSON.stringify(idProofValues));
    tempARR.forEach((doc: any, indexNow: any) => {
      if (indexNow === index) {
        doc.doc_path = '';
        doc.docFileName = '';
        doc.prev_url = '';
      }
    });
    setIdProofValues(tempARR);
    setModelViewImageError(false);
    setOnChangeIdNo(idProofValues[index].doc_unique_no)
  };

  const removeDoc = (type: any, index: any) => {
    let tempARR = JSON.parse(JSON.stringify(idProofValues));
    tempARR.forEach((doc: any, indexNow: any) => {
      if (indexNow === index) {
        doc.doc_path = '';
        doc.docFileName = '';
        doc.doc_unique_no = '';
      }
    });
    setIdProofValues(tempARR);
    dispatch(setPainterKYCData({
      ...allKycData,
      selectedTab: 'idProof',
      idProof: tempARR,
    }),
    );
  };

  const openUploadModal = (idObj: any, validatedId: any, isCheckIdProof: any) => {
    if (validatedId && !UserGroupArr.includes(getExecutiveLogin.toLowerCase())) {
      setModalTitle(i18n.t('SelectAndVerifyYourIdProof'));
      let digitNumber: any = 0;
      digitNumber = idObj.value === 'aadhar' ? '12' + i18n.t('Digit') : idObj.value === 'voter_card' ? '10' + i18n.t('Digit') : idObj.value === 'pan' ? '10' + i18n.t('Digit') : idObj.value === 'passport' ? '' : idObj.value === 'driving_license' ? '' : '';
      setInputLabel(i18n.t('enter') + digitNumber + idObj.alias + ' ' + i18n.t('number'));
      // setInputPlaceholder('Enter ' + idObj.alias + ' Number');
      // setFileFrameTitle('Upload ' + idObj.alias + ' Images');
      // setFileFrameLabel('Upload your ' + idObj.alias + ' Front image');
      setInputPlaceholder(i18n.t('uploadIDNumber', { label: idObj.alias }));
      setFileFrameTitle(i18n.t('uploadIDImge', { label: idObj.alias }));
      setFileFrameLabel(i18n.t('uploadImageHeader', { label: idObj.alias }));
      setSelectedDoc(idObj.value);
      setEditModeCheck(isCheckIdProof)

      setCopySelectedDocNumber("")
      setCopyIdProofImages("")
      setSelectedDocNumber("")
      let _tempARR = JSON.parse(JSON.stringify(idProofValues));
      const result = _tempARR.find((doc: { doc_id: any; }) => doc.doc_id === idObj.value);
      if (result) {
        setCopySelectedDocNumber(result.doc_unique_no)
        setCopyIdProofImages(result.doc_path)
        setSelectedDocNumber(result.doc_unique_no)
        dispatch(setuploadImageHandler(''));
        setIdProofImage('');
      }
      // _tempARR.forEach((doc: any, indexNow: any) => {
      //   if (doc.doc_id === idObj.value) {
      //     setCopySelectedDocNumber(doc.doc_unique_no)
      //     setCopyIdProofImages(doc.doc_path)
      //     setSelectedDocNumber(doc.doc_unique_no)
      //   }
      // });


      if (bottomSheetRef.current) {
        (bottomSheetRef.current as any).open();
      }
    }
    setErrors('')
  };



  const getInfo = (e: Event, index: number): void => {
    // let docNumber: any = e
    setSelectedDocNumber(e);
  };

  useEffect(() => {
    if (debouncedValue) {
      //console.log('Searching for:', debouncedValue);
      idProofValues.map((doc: any) => {
        if (doc.doc_id === selectedDoc) {
          if (selectedDoc == 'aadhar') {
            if (adharValid.test(debouncedValue) && debouncedValue != '') {
              doc.doc_unique_no = debouncedValue;
              setErrors('')
            } else {
              setErrors('Enter Valid Aadhar Number')
            }
          } else if (selectedDoc == 'pan') {
            if (regpan.test(debouncedValue) && debouncedValue != '') {
              doc.doc_unique_no = debouncedValue;
              setErrors('')
            } else {
              setErrors('Enter Valid PAN Number')
            }
          } else if (selectedDoc == 'driving_license') {
            if (licenseRegex.test(debouncedValue) && debouncedValue != '') {
              doc.doc_unique_no = debouncedValue;
              setErrors('')
            } else {
              setErrors('Enter Valid Driving License Number')
            }
          } else if (selectedDoc == 'passport') {
            if (Passportregex.test(debouncedValue) && debouncedValue != '') {
              doc.doc_unique_no = debouncedValue;
              setErrors('')
            } else {
              setErrors('Enter Valid Passport Number')
            }
          }
        }
      });
      setIdProofValues(JSON.parse(JSON.stringify(idProofValues)));
    }
  }, [debouncedValue]);

  // const cancelDoc = (index: number) => {
  //   setSelectedDocNumber('');
  //   setSelectedDoc('');
  //   setImageName('');
  //   setErrors('')
  //   if (bottomSheetRef.current) {
  //     (bottomSheetRef.current as any).close();
  //   } else {
  //     // console.error('bottomSheetRef is null');
  //   }
  // };

  const cancelDoc = (index: number, docData: any) => {
    if (getEditModeCheck === true) {
      if (bottomSheetRef.current) { (bottomSheetRef.current as any).close(); }
      let _tempARR = idProofValues;
      _tempARR.forEach((doc: any, indexNow: any) => {
        if (indexNow === index) {
          doc.doc_unique_no = copySelectedDocNumber;
          doc.doc_path = copyidProofImages;
          doc.docFileName = copyidProofImages;
        }
      });
      setIdProofValues(JSON.parse(JSON.stringify(_tempARR)));

      dispatch(setPainterKYCData(JSON.parse(JSON.stringify(
        {
          ...allKycData,
          selectedTab: 'idProof',
          idProof: _tempARR,
          isValidate: allKycData.isValidate.filter((value: string) => value === 'idProof').length > 0 ? allKycData.isValidate.filter((value: string) => value != 'idProof') : allKycData.isValidate,
        }
      ))));
    } else {
      logicCheck();
    }
  };

  const logicCheck = () => {

    if (idProofValues && idProofValues.length > 0) {
      // let tempARR = JSON.parse(JSON.stringify(idProofValues));
      // tempARR.forEach((doc: any) => {
      //   if (doc.doc_id === selectedDoc && (doc.doc_unique_no == '' || doc.doc_path == null || doc.doc_path == '')) {
      //     doc.doc_path = '';
      //     doc.docFileName = '';
      //     doc.prev_url = '';
      //     doc.doc_unique_no = ''
      //     console.log("doc>>>>>>>>>>>>>>>>", doc)
      //   }
      //   setIdProofValues(tempARR);
      // });
      const updatedDocuments = idProofValues.map((doc) => {
        if (doc.doc_id === selectedDoc) {
          return {
            ...doc,
            docFileName: '',
            doc_path: '',
            doc_unique_no: '',
            prev_url: '',
          };
        }
        return doc;
      });
      setIdProofValues(updatedDocuments);
    }
    if (bottomSheetRef.current) {
      (bottomSheetRef.current as any).close();
    }
    setSelectedDocNumber('');
    setSelectedDoc('');
    setImageName('');
    setErrors('')
  }

  const backToPrev = () => {
    dispatch(setPainterKYCData({
      ...allKycData,
      selectedTab: 'bankDetails',
    }),
    );
    setSelectedDoc('');
    setSelectedDocNumber('');
    setIdProofValues(idProofValArr);
    setIdProofImage('');
    setImageName('');
  };

  // DATA SET to FROM DATA IF DATA ADDED IN setPainterKYCData STORE
  useEffect(() => {
    if (isSubmitedFlag == false && allKycData && allKycData.idProof) {
      const storeidProofData = allKycData.idProof;
      setIdProofValues(storeidProofData);
    } else {
      if (isSubmitedFlag == false && userProfileData && userProfileData.length > 0) {
        const userProfileIdProof = kycUserProfileDataFormatterForIdProof(userProfileData[0].doc_details);
        setIdProofValues(userProfileIdProof);
        dispatch(setPainterKYCData({
          ...allKycData,
          selectedTab: 'idProof',
          idProof: userProfileIdProof,
          isValidate: allKycData.isValidate.filter((value: string) => value === 'idProof').length > 0 ? allKycData.isValidate.filter((value: string) => value != 'idProof') : allKycData.isValidate,
        }));

      }
    }
  }, [allKycData, userProfileData]);

  const checkDocType = (element: any): boolean => {
    const storeidProofData = allKycData.idProof ? allKycData.idProof : userProfileData[0] && userProfileData[0].doc_details;
    const filteredData = storeidProofData && storeidProofData.filter((item: { doc_path: string; doc_unique_no: string }) => item.doc_path !== '' && item.doc_unique_no !== '');
    if (idProof && filteredData) {
      return filteredData.filter((item: any) => item.doc_id === element.value).length > 0 ? true : false;
    } else {
      return false;
    }
  };

  const submitDoc = (type?: any) => {
    setSelectedDocNumber('');
    setSelectedDoc('');
    setImageName('');
    if (bottomSheetRef.current) {
      (bottomSheetRef.current as any).close();
    }

    dispatch(setPainterKYCData(JSON.parse(JSON.stringify(
      {
        ...allKycData,
        selectedTab: 'idProof',
        idProof: idProofValues,
        isValidate: allKycData.isValidate.filter((value: string) => value === 'idProof').length > 0 ? allKycData.isValidate.filter((value: string) => value != 'idProof') : allKycData.isValidate,
      }
    ))),
    );
  };

  const [errorMessage, setErrorMessage] = useState('');

  const finalKYCSubmit = () => {
    if (!UserGroupArr.includes(getExecutiveLogin.toLowerCase())) {
      const filteredData = idProofValues.filter(
        (item: { doc_path: string; doc_unique_no: string }) =>
          item.doc_path !== '' && item.doc_unique_no !== ''
      );
      const hasAadhaar = filteredData.some(
        (item: { doc_id: string }) => item.doc_id === 'aadhar'
      );
      const hasPan = filteredData.some(
        (item: { doc_id: string }) => item.doc_id === 'pan'
      );
      const isAadharRequired = userProfileData && userProfileData[0].adhar_req === 'Y';
      if (isAadharRequired && !hasAadhaar) {

        setErrorMessage('Aadhaar card is mandatory!');
        return;
      }
      if (!isAadharRequired && !hasAadhaar && !hasPan) {
        setErrorMessage('Either Aadhaar card or PAN card is mandatory!');
        return;
      }
      setErrorMessage('');
      setSubmitKycModel(true);
    } else {
      onPressBackHome();
      SetIsSubmitedFlag(true);
      dispatch(
        setPainterKYCData({
          basicInformation: null,
          bankDetails: null,
          idProof: null,
          selectedTab: 'basicInformation',
          isValidate: [],
        })
      );
    }
  };


  const onPressClose = () => {
    if (bottomSheetRef.current) {
      (bottomSheetRef.current as any).close();
    }
  };

  // FINAL SUBMIT KYC //
  const finalUserKycSubmit = () => {
    if (allKycData && userProfileData) {
      dispatch(setApiCallLoader(true));
      submitKyc(kycDataFormatter(allKycData));
    }
  };


  const submitKyc = (formatedKycdata: I_SUBMIT_USER_KYC.KYC_DATA): void => {
    saveUserKYC<I_SUBMIT_USER_KYC.KYC_DATA, I_RESPONSE_KYC_SUBMIT>(formatedKycdata).then(response => {
      dispatch(setApiCallLoader(false));
      skipNow();
      if (response.response_code == 1) {
        dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: true }));
        SetIsSubmitedFlag(true)
        CommonToastModel('success', response.response_message, 5000);
        onPressBackHome();
        dispatch(setProfileData([]));
        dispatch(setPainterKYCData({
          basicInformation: null,
          bankDetails: null,
          idProof: null,
          selectedTab: 'basicInformation',
          isValidate: [],
        }));
      } else {
        CommonToastModel('error', response.response_message, 5000);
      }
    }).catch((err: any) => {
      skipNow();
      dispatch(setApiCallLoader(false));
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  };

  const skipNow = () => {
    setSubmitKycModel(false);
  };

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }} keyboardVerticalOffset={Platform.OS === 'ios' ? 65 : 0} >
        <ScrollView style={{ backgroundColor: Colors.color_white, height: screenHeight - (Platform.OS === 'android' ? 300 : 400) }} keyboardShouldPersistTaps="handled">
          <View style={{ ...styles.container, flex: 1 }}>
            <View style={{ ...styles.sectionHeader }}>
              <Pin width={25} height={25} style={{ marginRight: 3 }} />
              <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={{ ...styles.sectionHeaderText }}>{t("IDProofDetails")}</Text>
                <Text style={{ fontSize: 9, color: Colors.color_dark_orange, fontFamily: Fonts.OpenSans600SemiBold }}>
                  {t("Atleast1DocumentisMandatory")}
                </Text>
                {/* {userProfileData?.adhar_req === 'Y' && (
                  <Text style={{ color: 'red', fontSize: 12 }}>
                    Aadhaar card is mandatory
                  </Text>
                )} */}
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ color: Colors.color_black, fontFamily: Fonts.OpenSans600SemiBold }}> {t("SelectAndVerifyYourIdProof")} </Text>
              <View style={{ marginTop: 10 }}>
                {/* <Text>{JSON.stringify(idProof, null, 4)}</Text> */}
                {idProof && idProof.length > 0 && (
                  <View style={{ ...styles.chipsGroup }}>
                    {idProof.map((item, index) => (
                      <View key={index} style={{
                        ...styles.chips,
                        backgroundColor: checkDocType(item) ? 'rgba(38, 192, 13, 0.25)' : Colors.color_light_gray,
                        borderColor: checkDocType(item) ? '#rgba(38, 192, 13, 1)' : '#E3E3E3',
                      }}>
                        <Text style={{ fontSize: 13, fontFamily: Fonts.OpenSans600SemiBold }} onPress={() => { openUploadModal(item, !item.validatedId, checkDocType(item)); }}> {item.label} </Text>
                        {checkDocType(item) && (
                          <Ionicons name="checkmark-circle-outline" size={20} style={{ marginLeft: 0 }} />
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </View>
              {errorMessage && <Text style={[styles.error]}>{errorMessage}</Text>}
            </View>

            {idProofValues.length > 0 ? (
              <View style={{ marginHorizontal: 5, marginTop: 10 }}>
                {idProofValues.map((doc: any, index) => doc.doc_path && doc.doc_unique_no && (
                  <View style={{ marginVertical: 5 }} key={index}>
                    <Card style={{ padding: 5 }}>
                      <View style={{ flexDirection: 'row', width: '100%', margin: 10, alignContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '30%' }}>
                          {errorsImages[index] ? (
                            <Image source={{ uri: AppImages.NoImagesAvailable }} style={{ height: 80, width: 80, borderRadius: 8, resizeMode: 'cover' }} resizeMode="contain" />
                          ) : (
                            <Image
                              style={{ height: 80, width: 80, borderRadius: 8, resizeMode: 'cover' }}
                              onError={() => handleError(index)}
                              source={{ uri: doc.doc_path }}
                            />
                          )}
                        </View>
                        <View
                          style={{ width: '70%', flexDirection: 'column', justifyContent: 'flex-start' }}>
                          <Text style={{ fontFamily: Fonts.OpenSans600SemiBold, color: Colors.ui_dark_bg, }}>
                            {doc.docName}
                          </Text>
                          <Text style={{ fontFamily: Fonts.OpenSans600SemiBold, width: 160, }} numberOfLines={1}>
                            {doc.doc_unique_no}
                          </Text>
                          <Text style={{ width: 190, color: Colors.color_gray, fontSize: 12, fontFamily: Fonts.OpenSans600SemiBold }} numberOfLines={1}>
                            {filename(doc.docFileName)}
                          </Text>
                        </View>
                      </View>
                      {!UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && (
                        <Ionicons style={{ ...styles.deleteCards }} size={20} name="close-outline" onPress={() => { removeDoc(doc.doc_id, index); }} />
                      )}
                    </Card>
                  </View>
                ))}
              </View>
            ) : (
              <View style={{ ...styles.noDataFound }}>
                <Image source={require('../../../assets/images/id-card.png')} style={{ height: 60, width: 60, resizeMode: 'contain', marginRight: 10 }} />
                <View>
                  <Text style={{ ...styles.noDataFoundHeader }}> {t("NoIDProofSelected")} </Text>
                  <Text style={{ ...styles.noDataFoundSubHeader }}> {t("PleaseSelectIDProofFirst")} </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={{ ...styles.fixedButton, paddingHorizontal: 15 }}>
        {/* {userKycDetails.length > 0 && userKycDetails[0] && userKycDetails[0].kyc_status && ( */}
        <View style={{
          width: userKycDetails.length > 0 && userKycDetails[0] && userKycDetails[0]?.kyc_status && (userKycDetails[0].kyc_status ?? '' != '') && (userKycDetails[0].kyc_status.toLowerCase() === 'submitted' || userKycDetails[0].kyc_status.toLowerCase() === 'completed') ? '100%' : '50%',
          marginRight: 5,
        }} >
          <ButtonLarge
            title={t("Back")}
            onPress={backToPrev}
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
        {/*)}*/}
        {userKycDetails && userKycDetails[0] && (userKycDetails[0].kyc_status.toLowerCase() != 'submitted' && userKycDetails[0].kyc_status.toLowerCase() != 'completed') && (
          <View style={{ width: '50%' }}>
            <ButtonLarge
              title={!UserGroupArr.includes(getExecutiveLogin.toLowerCase()) ? i18n.t('Submit') : i18n.t('Backtohome')}
              onPress={finalKYCSubmit}
              fillBtn={true}
              key={'Submit'}
              showIcon={false}
              iconName=""
              paddingVertical={7}
              paddingHorizontal={5}
              fontSize={15}
              iconSize={19}
            />
          </View>
        )}

      </View>


      <BottomSheet
        scrollEnabled={true}
        ref={bottomSheetRef}
        closeOnDragDown={true}
        onClose={() => onPressClose()}
        contentHeight={true}
        goBackKey={'closeNotReq'}
        sheetTitle={getModalTitle}>
        <>
          {/* <Text>{selectedDoc}</Text>
          <Text>{JSON.stringify(idProofValues, null, 4)}</Text> */}
          {idProofValues && idProofValues.length > 0 && idProofValues.map((doc: any, index) => doc.doc_id === selectedDoc && (
            <View key={index}>
              <InputFields
                showLabel={true}
                label={getInputLabel}
                showPlaceholder={true}
                placeholder={getInputPlaceholder}
                onChange={(event: any) => getInfo(event, index)}
                keyboardType={'default'}
                isRequiredMark={true}
                error={errors}
                autoCapitalize={'characters'}
                defaultValue={doc.doc_unique_no}
              />

              <View style={{ marginTop: 5 }}>
                <Text style={{ fontSize: 12, color: Colors.color_black, fontFamily: Fonts.OpenSans600SemiBold }}> {getFileFrameTitle} </Text>
                {!doc.doc_path ? (
                  <Pressable onPress={() => { onPressCameraOption(); }} style={{ marginTop: -5 }}>
                    <View style={{ ...styles.uploadDoc }}>
                      <FileUpload />
                      <Text style={{ ...styles.uploadDocHeader }}> {getFileFrameLabel} </Text>
                      <Text style={{ ...styles.uploadDocSubHeader }}>
                        {t("Image3MBAlert")}{' '}
                      </Text>
                    </View>
                  </Pressable>
                ) : (
                  <View style={{ ...styles.uploadedDoc, padding: 2, paddingTop: 0 }}>
                    <View style={{ ...styles.uploadedDocContainer }}>
                      {doc.doc_path && (
                        <>
                          {getModelViewImageError ? (
                            <ImageBackground source={{ uri: AppImages.NoImagesAvailable }} style={{ ...styles.backgroundContainerCover }} imageStyle={{ borderRadius: 8 }}>
                              <Ionicons style={{ ...styles.deleteImages }} size={20} name="close-outline" onPress={() => { removeImg(index); }} />
                            </ImageBackground>
                          ) : (
                            <ImageBackground source={{ uri: doc.doc_path }} onError={() => setModelViewImageError(true)} style={{ ...styles.backgroundContainerCover }} imageStyle={{ borderRadius: 8 }}>
                              <Ionicons style={{ ...styles.deleteImages }} size={20} name="close-outline" onPress={() => { removeImg(index); }} />
                            </ImageBackground>
                          )}
                        </>
                      )}
                    </View>
                  </View>
                )}
              </View>
              <View style={{ ...styles.fixedButton, paddingHorizontal: 0 }}>
                <View style={{ width: '48%', marginRight: 5 }}>
                  <ButtonLarge
                    title={t("close")}
                    onPress={() => cancelDoc(index, doc)}
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
                    onPress={() => submitDoc(selectedDoc)}
                    fillBtn={true}
                    key={'Submit'}
                    showIcon={false}
                    iconName=""
                    paddingVertical={7}
                    paddingHorizontal={5}
                    fontSize={15}
                    iconSize={19}
                    // disabled={!doc.doc_path || !doc.doc_unique_no}
                    disabled={!doc.doc_path || !selectedDocNumber || errors !== ''}
                  />
                </View>
              </View>
            </View>
          ))}
        </>
      </BottomSheet>

      {submitKycModel && (
        <AlertInfo
          skipNow={() => skipNow()}
          confirmAction={() => finalUserKycSubmit()}
          allowSkip={true}
          headerText={t("SuvidhaKYC")}
          subHeaderText={t("KYCCOnfirmation")}
          confirmActionButtonText={t("SubmitKYC")}
          skipButtonText={t("Cancel")}
          isAPICall={isAPICall}
        />
      )}
    </>
  );
};

export default memo(IdProof);
