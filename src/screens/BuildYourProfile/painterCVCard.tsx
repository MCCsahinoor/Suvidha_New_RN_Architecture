import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Platform, PermissionsAndroid, Pressable, Dimensions, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppImages, Colors, Fonts } from '../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InitialAvatar from '../../components/InitialAvatar';
import StarRating from '../../components/RatingShow';
import ButtonLarge from '../../components/ButtonLarge';
import InputBox from '../../components/phoneNumberInput';
import { useDispatch, useSelector } from 'react-redux';
import { phoneNumberRegex } from '../../utils/regexList';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import styles from './styles'
import Contacts from 'react-native-contacts';
import ModalComponent from '../../components/Modal';
import LottieView from 'lottie-react-native';
import AlertInfo from '../../components/alertInfo';
import { PainterProtfolioWhatsappShare } from '../../services/BuildYourProfile/byp.services';
import { setApiCallLoader } from '../../store/features/apiCallLoader/apiCallLoader';
import { CommonToastModel } from '../../utils/ToastMessageModel';
import { UserGroupArr } from '../../utils/hierarchyLoginCheck';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactSelecter from '../../components/contactSelecter';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import CallColorIcon from '../../assets/svg/callColorIcon';
import WhatsappColorIcon from '../../assets/svg/whatsappColorIcon';
import EnvelopeColorIcon from '../../assets/svg/envelopeColor';
import { removeExtraWhiteSpace } from '../../utils/blankWhiteSpace';

const PainterCVCard = ({ navigation }: any) => {

    // const navigation = useNavigation();
    const userProfileData = useSelector((state: any) => state.userProfileData); // GET USER PROFILE INFO
    const [getUserProfileData, setUserProfileData] = useState<any>(null);
    const [getlanguageDataString, setlanguageDataString] = useState<any>([]);
    const [errors, setErrors] = useState<Partial<any>>({});
    const [formData, setFormData] = useState<any>({ mobileNumber: '' });
    const customBottomSheetTitle = i18n.t('enterWhatsappNumber');
    const [isKeyBoardOpen, setisKeyBoardOpen] = useState(false);
    const [contact, setContact] = useState(null as any);
    const [hasPermission, setHasPermission] = useState(false);
    const [selectContactModel, setSelectContactModel] = useState(false);
    const [syncContact, setSyncContact] = useState(true);
    const [contactPermissionCheck, setcontactPermissionCheck] = useState(false);
    const isAPICall = useSelector((state: any) => state.apiCallLoader);
    const dispatch = useDispatch();
    const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
    //Executive Login Check
    const [getExecutiveLogin, setExecutiveLogin] = useState('');
    const [showWhatsappShareBottomSheet, setShowWhatsappShareBottomSheet] = useState(false);

    useEffect(() => {
        if (executiveLoginCheck) {
            setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
        }
    }, [executiveLoginCheck]);

    // GET USER DETAILS AND SET USE STATE
    useEffect(() => {
        if (userProfileData) {
            setUserProfileData(userProfileData[0])
            languageDataString(userProfileData && userProfileData[0].language)
        }
    }, [userProfileData])

    const languageDataString = (languagesString: string) => {
        const languages = languagesString.split(',');
        setlanguageDataString(languages)
    }

    // NAVIGATION TO BACK
    const handleBack = () => {
        navigation.goBack();
    };

    // UPDATE PROFILE
    const updateProfile = () => {
        navigation.navigate('BuildYourProfile');
    };

    // FOR OTP BOTTOM SHEET OPEN 
    const share = () => {
        setShowWhatsappShareBottomSheet(true)
    };

    // FOR OTP BOTTOM SHEET CLOSE
    const onPressClose = () => {
        setShowWhatsappShareBottomSheet(false)
    };

    // PHONE NUMBER VALIDATION
    const validateForm = () => {
        const newErrors: Partial<any> = {};
        const safeTrim = (value: string | null | undefined) => (value ?? '').trim();
        const painterMobile = safeTrim(formData.mobileNumber);
        if (painterMobile === '') {
            newErrors.mobileNumber = 'Contact number is required';
        } else if (formData.mobileNumber.trim().length !== 10) {
            newErrors.mobileNumber = 'Contact number must be 10 digits long';
        } else if (!phoneNumberRegex.test(formData.mobileNumber.trim())) {
            newErrors.mobileNumber = 'Invalid contact number format';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [multipleNumbers, setMultipleNumber] = useState<string[]>([]);
    const addConatct = () => {
        const isValid = validateForm();
        console.log(isValid)
        if (isValid) {
            addNumbers(formData.mobileNumber)
            setFormData({ mobileNumber: '' });
            return true;
        } else {
            return false;
        }
    }

    const addNumbers = (newNumbers: string[]) => {
        if (!formData.mobileNumber) {
            CommonToastModel('error', 'Please add at least one whatsapp number.', 2500);
        } else {
            const duplicates = multipleNumbers.filter((number) => newNumbers.includes(number));
            if (duplicates.length > 0) {
                CommonToastModel('error', `The following numbers are already added: ${duplicates.join(', ')}`, 2500);
                return;
            }
            setMultipleNumber((prevNumbers: any) => [...prevNumbers, newNumbers]);
        }
    };

    const delContact = (number: string) => {
        setMultipleNumber((prevNumbers: string[]) => prevNumbers.filter((item) => item !== number));
    };

    // ERROR HELDAL
    const handleChange = (name: string, value: any) => {
        setErrors({ ...errors, [name]: '' });
        setFormData({ ...formData, [name]: value });
    };

    // FINAL WHATSAPP NUMBER SUBMIT (FOR WHATSAPP SHARE)
    const whatsappSend = () => {
        if (multipleNumbers.length > 0) {
            UserLoginSendOTPApi(multipleNumbers)
        } else {
            CommonToastModel('error', 'Please enter at least one contact number', 2000);
        }
    }

    //  WHATSAPP SHARE
    const UserLoginSendOTPApi = (mobileNumber: string[]): void => {
        let data: any = {
            whatsapp_no: mobileNumber,
        };
        dispatch(setApiCallLoader(true));
        PainterProtfolioWhatsappShare<any, any>(data).then(response => {
            dispatch(setApiCallLoader(false));
            if (response && response.response_code == "1") {
                CommonToastModel('success', response.response_message, 2000);
            } else {
                CommonToastModel('error', response.response_message, 2000);
            }
            setTimeout(() => { onPressClose(); }, 10);
            setFormData({ mobileNumber: '' });
            setMultipleNumber([]);
        }).catch(err => {
            dispatch(setApiCallLoader(false));
            setMultipleNumber([]);
            CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
        });
    };


    // CONTACT PERMISSION CHECK
    useEffect(() => {
        requestContactPermission();
    }, []);

    const requestContactPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
            setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        } else {
            setHasPermission(true);  // iOS permissions are handled automatically
        }
    };

    // "+91", "-"" and "blank space" remove from number
    const cleanPhoneNumber = (phoneNumber: any) => {
        if (!phoneNumber) return '';
        return phoneNumber.replace(/^\+91/, '').replace(/-/g, '');
    };

    // CONTACT PICK AND SELECT CONTACT MODEL OPEN
    const selectContactHandler = async () => {
        try {
            setcontactPermissionCheck(false)
            requestContactPermission();
            if (hasPermission) {
                setcontactPermissionCheck(false)
                setSyncContact(false)
                const contacts = await Contacts.getAll();
                console.log(">>>>>>>>", contacts)
                const contactList = contacts.map(contact => {
                    return {
                        name: Platform.OS === 'android' ? contact.displayName : contact.givenName,
                        phoneNumber: contact.phoneNumbers ? cleanPhoneNumber(contact.phoneNumbers[0]?.number) : undefined,
                    };
                }).filter(contact => contact.phoneNumber !== undefined && contact.phoneNumber !== '');
                if (contactList) {
                    setSyncContact(true)
                    setContact(contactList)
                    setSelectContactModel(true)
                } else {
                    setSyncContact(true)
                    setContact([])
                    setSelectContactModel(false)
                }
            } else {
                setcontactPermissionCheck(true)
                console.log('Contacts permission denied');
            }
        } catch (e) {
            console.log(e);
        }
    };



    // CLOSE CONTACT MODEL
    const closeContactModel = async () => {
        setSelectContactModel(false)
    }

    // GET SELECTED CONTACT NUMBER
    function handleDataFromChild(data: any) {
        closeContactModel();
        multipleNumbers.push(data.replace(/\s/g, ''))
        setMultipleNumber(JSON.parse(JSON.stringify(multipleNumbers)))
        // setFormData({ mobileNumber: data });
    }

    // CONTACT PERMISSION DENIED MODEL CLOSE
    const cancel = () => {
        setcontactPermissionCheck(false)
    };

    // CONTACT PERMISSION DENIED MODEL CONFIRM TO OPEN APP SETTINGS
    const confirm = () => {
        setcontactPermissionCheck(false)
        onPressClose();
        Linking.openSettings();
    };

    const { t } = useTranslation();

    const LanguageListLov = useSelector((state: any) => state.preferredLanguageData);
    const [painterLang, setPainterLang] = useState('');
    // useEffect(() => {
    //     if (userProfileData && userProfileData.length > 0) {
    //         const languageCodes = userProfileData[0].language && userProfileData[0].language.split(",");
    //         console.log("LanguageListLov:", LanguageListLov);
    //         const selectedLanguages = LanguageListLov && LanguageListLov.filter((lang: { lang_code: any; }) => {
    //             console.log(".....>>>>>>>>>>selectedLanguages", selectedLanguages);
    //             return languageCodes.includes(lang.lang_code);
    //         });
    //         if (selectedLanguages && selectedLanguages.length > 0) {

    //             const selectedLanguageDescriptions = selectedLanguages.map((lang: { lang_desc: any; }) => lang.lang_desc);
    //             console.log("selectedLanguageDescriptions..................", selectedLanguages);

    //             setPainterLang(selectedLanguageDescriptions);
    //         } else {
    //         }
    //     }
    // }, [userProfileData]);
    useEffect(() => {
        if (userProfileData && userProfileData.length > 0) {
            const languageDescriptions = userProfileData[0].language?.split(",").map((desc: string) => desc.trim());
            console.log("languageDescriptions:", languageDescriptions);

            if (LanguageListLov && languageDescriptions) {
                const selectedLanguages = LanguageListLov.filter(
                    (lang: { lang_desc: string }) => languageDescriptions.includes(lang.lang_desc)
                );

                console.log("Selected Languages: ", selectedLanguages);

                if (selectedLanguages.length > 0) {
                    const selectedLanguageDescriptions = selectedLanguages.map(
                        (lang: { lang_desc: string }) => lang.lang_desc
                    );
                    setPainterLang(selectedLanguageDescriptions);
                }
            }
        }
    }, [userProfileData, LanguageListLov]);



    const languages = Array.isArray(painterLang) ? painterLang : [painterLang];

    useEffect(() => {
        console.log("multipleNumbers", multipleNumbers);
    }, [multipleNumbers])



    return (
        <>
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <LinearGradient colors={[Colors.ui_light_bg, Colors.ui_dark_bg]} >
                    <SafeAreaView>
                        <View style={{ paddingTop: Platform.OS === 'android' ? 0 : 0, }}>
                            <View style={styles.headercontainerBYP}>
                                <TouchableOpacity onPress={handleBack} style={{ marginRight: 10 }}>
                                    <Ionicons name="chevron-back-outline" size={30} color={Colors.color_white} />
                                </TouchableOpacity>
                                <Text style={styles.pageTitle} numberOfLines={1}>{t("YourProfile")}</Text>
                            </View>
                            <View style={{ ...styles.imageexpertContractor }}>
                                <Image source={require('../../assets/images/expertContractor.png')} style={{ height: 45, width: 160, borderRadius: 8, resizeMode: 'contain', }} />
                                <View style={{ height: 120 }}></View>
                            </View>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
                {/* <ImageCurve style={{ marginTop: -49, width: Dimensions.get('window').width + 20, }}></ImageCurve> */}
                <View style={{ marginTop: -120, justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{ backgroundColor: '#fff', width: '100%', height: 200, position: 'absolute', bottom: -180, transform: 'scale(1.5)', borderTopLeftRadius: 170, borderTopRightRadius: 170 }}></View>
                    <InitialAvatar name={getUserProfileData && getUserProfileData.painter_name ? getUserProfileData.painter_name : '-'} profilePic={getUserProfileData && getUserProfileData.user_img} size={120} fontSize={40}></InitialAvatar>
                </View>
                <View style={[
                    styles.containerBYP,
                    getUserProfileData && getUserProfileData.reviewed_yn && getUserProfileData.reviewed_yn.toLowerCase() === 'y' ? styles.styleIfReviewed : styles.styleIfNotReviewed]}>
                    <View>
                        <Text style={{ width: getUserProfileData && getUserProfileData.reviewed_yn && getUserProfileData.reviewed_yn.toLowerCase() === 'y' ? 200 : 'auto', ...styles.profileName }} numberOfLines={5}>{getUserProfileData && getUserProfileData.painter_name ? getUserProfileData.painter_name : '-'}</Text>
                        {getUserProfileData && getUserProfileData.csat_rating > 0 && (
                            <View style={getUserProfileData && getUserProfileData.reviewed_yn && getUserProfileData.reviewed_yn.toLowerCase() === 'y' ? styles.ratingGrouping : styles.styleIfNotReviewed}>
                                {/* <Text style={{ ...styles.rating }}>{formatNumber(getUserProfileData && getUserProfileData.csat_rating ? getUserProfileData.csat_rating : 0)}</Text> */}


                                <Text style={{ ...styles.rating }}>{getUserProfileData && getUserProfileData.csat_rating ? getUserProfileData.csat_rating : 0}</Text>
                                <View style={{ marginLeft: 5, marginTop: 4 }}>
                                    <StarRating startSize={18} starRating={getUserProfileData && getUserProfileData.csat_rating ? getUserProfileData.csat_rating : 0} stroke={'#E0E0E0'} fill={'#FFE606'} starLabel={false} />
                                    <Text style={{ fontFamily: Fonts.OpenSans500Medium }}>{getUserProfileData && getUserProfileData.pntr_revw ? getUserProfileData.pntr_revw : 0} Reviews</Text>
                                </View>
                            </View>
                        )}
                    </View>
                    {getUserProfileData && getUserProfileData.painter_qr_code && getUserProfileData.reviewed_yn && getUserProfileData.reviewed_yn.toLowerCase() === 'y' && (
                        <View>
                            <Image source={{ uri: getUserProfileData && getUserProfileData.painter_qr_code }} style={{ width: 90, height: 90, resizeMode: 'contain' }} />
                        </View>
                    )}
                </View>
                {getUserProfileData && getUserProfileData.reviewed_yn === '' && (
                    <View style={{ padding: 10, backgroundColor: 'rgba(189, 255, 0, 0.30)' }}>
                        <Text style={{ textAlign: 'center', fontFamily: Fonts.OpenSans500Medium, color: Colors.color_black }}> {getUserProfileData.build_your_profile_current_status_message ?? '-'} </Text>
                    </View>
                )}
                <View style={{ ...styles.CvcontainerBYP }}>
                    <View>
                        <Text style={{ ...styles.painterHeader }}>Contact Details</Text>
                        <View style={{ ...styles.contcatGrouping }}>
                            <View style={{ ...styles.contcatInfo }}>
                                <View style={{ marginRight: 7 }}>
                                    <CallColorIcon width={17} height={17} />
                                </View>
                                <Text style={{ fontFamily: Fonts.OpenSans500Medium }}>+91 {getUserProfileData && getUserProfileData.painter_mobile ? getUserProfileData.painter_mobile : '-'}</Text>
                            </View>
                            <View style={{ ...styles.contcatInfo }}>
                                <View style={{ marginRight: 7 }}>
                                    <WhatsappColorIcon width={17} height={17} />
                                </View>
                                <Text style={{ fontFamily: Fonts.OpenSans500Medium }}>+91 {getUserProfileData && getUserProfileData.wa_ph_no ? getUserProfileData.wa_ph_no : '-'}</Text>
                            </View>
                            <View style={{ ...styles.contcatInfo }}>
                                <View style={{ marginRight: 7 }}>
                                    <EnvelopeColorIcon width={17} height={17} />
                                </View>
                                <Text style={{ fontFamily: Fonts.OpenSans500Medium }}>{getUserProfileData && getUserProfileData.email_id ? removeExtraWhiteSpace(getUserProfileData.email_id, { preserveNewlines: true }) : '-'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ ...styles.cvDataGroup }}>
                        <Text style={{ ...styles.painterHeader }}>Location</Text>
                        <View style={{ ...styles.contcatGrouping }}>
                            <Text style={{ fontFamily: Fonts.OpenSans500Medium }}>{getUserProfileData && getUserProfileData.full_address ? getUserProfileData.full_address : '-'}</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.cvDataGroup }}>
                        <Text style={{ ...styles.painterHeader }}>Languages</Text>
                        <View style={{ ...styles.contcatGrouping }}>
                            {/* {getlanguageDataString.map((language: string, index: number) => (
                                <View style={{ ...styles.contcatInfo }} key={index}>
                                    <Text style={{ fontFamily: Fonts.OpenSans500Medium }}>{language}</Text>
                                </View>
                            ))} */}
                            {languages.map((lang, index) => (
                                <View key={index} style={styles.contcatInfo}>
                                    <Text>{lang}</Text>
                                </View>
                            ))}

                        </View>
                    </View>
                </View>
                {getUserProfileData && (
                    <View style={{ backgroundColor: '#EFEEEE', padding: 8, paddingBottom: 10 }}>
                        <Text style={{ textAlign: 'center', fontFamily: Fonts.OpenSans500Medium }}>Valid Upto: {getUserProfileData.card_expiry_date ? getUserProfileData.card_expiry_date : '-'}</Text>
                    </View>
                )}
            </ScrollView>
            {!UserGroupArr.includes(getExecutiveLogin.toLowerCase()) &&
                <View style={{ ...styles.fixedButton, paddingBottom: Platform.OS === 'android' ? 0 : 30, }}>
                    {getUserProfileData && getUserProfileData.reviewed_yn && getUserProfileData.reviewed_yn.toLowerCase() === 'y' && (
                        <View style={{ width: '48%', marginRight: 5 }}>
                            <ButtonLarge
                                title={t("ShareProfile")}
                                onPress={share}
                                fillBtn={true}
                                key={'Share Profile'}
                                showIcon={true}
                                iconName={'share-alt'}
                                paddingVertical={7}
                                paddingHorizontal={5}
                                fontSize={15}
                                iconSize={19}
                            />
                        </View>
                    )}
                    <View style={{ width: getUserProfileData && getUserProfileData.reviewed_yn && getUserProfileData.reviewed_yn.toLowerCase() === 'y' ? '48%' : '90%' }}>
                        <ButtonLarge
                            title={t("UpdateProfile")}
                            onPress={updateProfile}
                            fillBtn={true}
                            key={'Update Profile'}
                            showIcon={true}
                            iconName={'edit'}
                            paddingVertical={7}
                            paddingHorizontal={5}
                            fontSize={15}
                            iconSize={19}
                        />
                    </View>
                </View>
            }
            {/* // WHATSAPP NUMBER ENTRY MODEL // */}
            <CustomBottomSheet
                isVisible={showWhatsappShareBottomSheet}
                onClose={() => onPressClose()}
                sheetTitle={customBottomSheetTitle}
            >
                <View style={{ ...styles.centerContent, paddingHorizontal: isAPICall ? 15 : 0 }}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ width: '85%' }}>
                                <InputBox
                                    keyboardType="numeric"
                                    label=""
                                    showLabel={false}
                                    countryFlag={false}
                                    showPlaceholder={true}
                                    placeholder={t("enterWhatsappNumber")}
                                    key={'mobileNumber'}
                                    maxLength={10}
                                    onChange={(val: any) => handleChange('mobileNumber', val)}
                                    defaultValue={formData.mobileNumber}
                                    error={errors.mobileNumber}
                                />
                            </View>
                            <Pressable style={{ ...styles.addContactPicker }} onPress={addConatct}>
                                <Text style={{ color: 'white', fontFamily: Fonts.OpenSans500Medium }}>Add</Text>
                            </Pressable>
                        </View>
                        {multipleNumbers.length > 0 && (
                            <>
                                {multipleNumbers.map((item: string, index: number) => (
                                    <View style={{ paddingVertical: 10, borderBottomColor: Colors.color_light_gray, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }} key={index}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="person-circle-outline" size={20} />
                                            <Text style={{ marginLeft: 5, fontFamily: Fonts.OpenSans500Medium }}>+91 {item}</Text>
                                        </View>
                                        <Pressable onPress={() => delContact(item)}>
                                            <Ionicons name="trash" size={18} style={{ color: Colors.color_light_red }} />
                                        </Pressable>
                                    </View>
                                ))}
                            </>
                        )}

                        {syncContact ? (
                            <Pressable style={{ ...styles.openContactPicker }} onPress={selectContactHandler}>
                                <FontAwesome name="address-book" size={15} color={Colors.color_dark_gray} style={{ marginTop: 2 }} />
                                <Text style={{ ...styles.openContactPickerContent }}>{t("OpenContacts")}</Text>
                            </Pressable>

                        ) : (
                            <View style={{ ...styles.openContactPicker, marginRight: 10 }}>
                                <Text style={{ ...styles.openContactPickerContent, marginRight: 15 }}>{t("ContactSyncInProgress")}</Text>
                                <LottieView source={{ uri: AppImages.LottyloaderDot }} style={{ width: 20, height: 20, transform: 'scale(4)' }} autoPlay loop />
                            </View>
                        )}
                        <View style={{ backgroundColor: 'white' }}>
                            {!isKeyBoardOpen && (
                                <ButtonLarge
                                    title={t("Send")}
                                    onPress={whatsappSend}
                                    fillBtn={true}
                                    key={'send'}
                                    showIcon={false}
                                    iconName=""
                                    paddingVertical={10}
                                    paddingHorizontal={10}
                                    fontSize={18}
                                    iconSize={19}
                                    isAPICall={isAPICall}
                                    disabled={isAPICall || multipleNumbers.length === 0} />
                            )}
                        </View>
                    </View>
                </View>
            </CustomBottomSheet>



            {selectContactModel && (
                <ModalComponent>
                    <View style={{ backgroundColor: 'white', height: Dimensions.get('window').height, padding: 15 }}>
                        <ContactSelecter allContacts={contact} close={() => closeContactModel()} sendDataToParent={handleDataFromChild} />
                    </View>
                </ModalComponent>
            )}

            {contactPermissionCheck && (
                <AlertInfo
                    skipNow={() => cancel()}
                    confirmAction={() => confirm()}
                    allowSkip={true}
                    headerText={t("ContactPermissionDenied")}
                    subHeaderText={t("CContactPermissionDeniedSubHead")}
                    confirmActionButtonText={t("SetPermission")}
                    skipButtonText={t("Cancel")}
                />
            )}
        </>
    );
};


export default PainterCVCard;
