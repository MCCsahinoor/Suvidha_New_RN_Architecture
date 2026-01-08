/* eslint-disable prettier/prettier */

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, Image, ImageBackground, ScrollView } from 'react-native';
import { Colors, Fonts } from '../../../themes';
import InitialAvatar from '../../InitialAvatar';
import ButtonLarge from '../../ButtonLarge';
import Card from '../../Card';
import BottomSheet from '../../BottomSheet';
import { useDispatch, useSelector } from 'react-redux';
import { I_SAVE_GENERAL_INFO } from '../../../Interfaces/buildYourProfile.interface';
import { setbuildYourProfileData } from '../../../store/features/BuildYourProfile/buildYourProfileStore';
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';
import InputFieldWithValidateEmail from '../../InputFieldWithValidateEmail';
import { emailRegEx } from '../../../utils/regexList';
import { CommonToastModel } from '../../../utils/ToastMessageModel';
import { SendEmailOtp, ValidateEmailOtp } from '../../../services/EmailVerify/emailVerify.services';
import { UserGroupArr } from '../../../utils/hierarchyLoginCheck';
import ModalComponent from '../../Modal';
// import OTPInput from '../../OTPInput';
import { setApiCallLoader } from '../../../store/features/apiCallLoader/apiCallLoader';
import CustomBottomSheet from '../../CustomBottomSheet';
import CallingIcon from '../../../assets/svg/calling';
import WhatsAppIcon from '../../../assets/svg/whatsapp';
import EmailIcon from '../../../assets/svg/email';
import LocationIcon from '../../../assets/svg/location';
import LanguageIcon from '../../../assets/svg/language';
import GroupIcon from '../../../assets/svg/group';
import OTPInputCustom from '../../OTPInputFieldCustom';
interface FormData {
    email_id: string;
    email_verified: boolean;
}

const GeneralInfo = () => {

    const buildYourProfileStore = useSelector((state: any) => state.buildYourProfileData);
    const userProfileData = useSelector((state: any) => state.userProfileData);
    const dispatch = useDispatch();
    const customBottomSheetTitle = i18n.t('MyTeamMember');
    const { t } = useTranslation();
    const LanguageListLov = useSelector((state: any) => state.preferredLanguageData);
    const [painterLang, setPainterLang] = useState('');
    const [formData, setFormData] = useState<FormData>({
        email_id: '',
        email_verified: false,
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [isAPICalledEmail, setIsAPICalledEmail] = useState(false);
    const [openEmailOTPModal, setOpenEmailOTPModal] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [getExecutiveLogin, setExecutiveLogin] = useState('');
    const [otpCodeEmail, setOTPCodeEmail] = useState('');
    const [isPinReady, setIsPinReady] = useState(false);
    const [reset, setReset] = useState(false);
    const [openEmailOTPError, setOpenEmailOTPError] = useState(false);
    const isAPICall = useSelector((state: any) => state.apiCallLoader); 
    const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
    const [myTeamBottomSheetModel, setMyTeamBottomSheetModel] = useState(false);

    const onPressOpen = () => {
        setMyTeamBottomSheetModel(true)
    };

    const onPressClose = () => {
        setMyTeamBottomSheetModel(false)
    };

    const goToExpertise = () => {
        const data: I_SAVE_GENERAL_INFO = {
            painter_mobile: userProfileData[0].painter_mobile,
            wa_ph_no: userProfileData[0].wa_ph_no,
            email_id: formData.email_id,
            email_verified: isEmailVerified,
            full_address: userProfileData[0].full_address,
            language: userProfileData[0].language,
            team_members: userProfileData[0].team_members,
        };


        dispatch(setbuildYourProfileData({
            ...buildYourProfileStore,
            selectedTab: 'expertise',
            generalInformation: data,
            isValidate: buildYourProfileStore.isValidate.includes('generalInformation')
                ? buildYourProfileStore.isValidate
                : [...buildYourProfileStore.isValidate, 'generalInformation'],
        }));
    };

    const onPressBackHome = () => {
        dispatch(
            setbuildYourProfileData({
                ...buildYourProfileStore,
                selectedTab: 'profileImage',
                generalInformation: {
                    ...buildYourProfileStore.generalInformation,
                    email_id: formData.email_id || userProfileData[0].email_id,
                    email_verified: isEmailVerified,
                },

            }),
        );
    };

    const handleChange = (name: string, value: any) => {
        setErrors({ ...errors, [name]: '' });

        const backendEmail = userProfileData?.[0]?.email_id;
        const backendVerified = userProfileData?.[0]?.email_valid === 'Y';

        const isEmailSameAsBackend = value.trim().toLowerCase() === backendEmail?.trim().toLowerCase();
        const emailValid = isEmailSameAsBackend && backendVerified;

        const updatedForm = {
            ...formData,
            [name]: value,
            email_verified: emailValid,
        };

        setFormData(updatedForm);
        setIsEmailVerified(emailValid);

        dispatch(setbuildYourProfileData({
            ...buildYourProfileStore,
            generalInformation: {
                ...buildYourProfileStore.generalInformation,
                [name]: value,
                email_verified: emailValid,
            },
        }));
    };

    const validateEmail = () => {
        const email = formData.email_id.trim();
        if (!emailRegEx.test(email)) {
            CommonToastModel('error', i18n.t('InvalidEmail'), 5000);
            return;
        }

        const data = {
            email_id: email,
            otp: 0,
        };

        setIsAPICalledEmail(true);
        SendEmailOtp(data, {})
            .then((response: any) => {
                setIsAPICalledEmail(false);
                if (response.response_code === 1) {
                    setOpenEmailOTPModal(true);
                    CommonToastModel('success', response.response_message, 5000);
                } else {
                    CommonToastModel('error', response.response_message, 5000);
                }
            })
            .catch((err: any) => {
                setIsAPICalledEmail(false);
                CommonToastModel(
                    'error',
                    err?.error?.response?.data?.errorMessage || 'Something went wrong!',
                    8000
                );
            });
    };

    useEffect(() => {
        if (executiveLoginCheck) {
            setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
        }
    }, [executiveLoginCheck]);


    const closeOTPModalEmail = () => {
        setOpenEmailOTPModal(false);
        setOTPCodeEmail('');
        dispatch(setApiCallLoader(false));
        setReset(prev => !prev)
    };

    const submitEmailOTP = () => {
        if (!otpCodeEmail) {
            setOpenEmailOTPError(true);
            return;
        }

        const data = {
            email_id: formData.email_id,
            otp: parseInt(otpCodeEmail),
        };

        dispatch(setApiCallLoader(true));
        ValidateEmailOtp(data, {})
            .then((response: any) => {
                dispatch(setApiCallLoader(false));
                if (response.response_code === 1) {
                    setFormData(prev => ({ ...prev, email_verified: true }));
                    setIsEmailVerified(true);
                    setOpenEmailOTPModal(false);
                    setOTPCodeEmail('');

                    dispatch(setbuildYourProfileData({
                        ...buildYourProfileStore,
                        generalInformation: {
                            ...buildYourProfileStore.generalInformation,
                            email_id: formData.email_id,
                            email_verified: true,
                        },
                    }));

                    CommonToastModel('success', response.response_message);
                } else {
                    CommonToastModel('error', response.response_message);
                }
            })
            .catch((err: any) => { 
                dispatch(setApiCallLoader(false));
                console.log(err?.error);
                CommonToastModel(
                    'error',
                    err?.response?.data?.errorMessage || 'Something went wrong!',
                    8000
                );
            });
    };

    useEffect(() => {
        if (userProfileData?.[0]?.email_id) {
            const profileEmail = userProfileData[0].email_id;
            const emailValid = userProfileData[0].email_valid === 'Y';

            setFormData(prev => ({
                ...prev,
                email_id: prev.email_id || profileEmail,
                email_verified: emailValid,
            }));

            setIsEmailVerified(emailValid);
        }
    }, []);

    useEffect(() => {
        if (buildYourProfileStore?.generalInformation?.email_id) {
            const storeEmail = buildYourProfileStore.generalInformation.email_id;
            const storeEmailVerified = buildYourProfileStore.generalInformation.email_verified;

            setFormData(prev => ({
                ...prev,
                email_id: storeEmail,
                email_verified: storeEmailVerified
            }));

            setIsEmailVerified(storeEmailVerified);
        } else if (userProfileData?.[0]?.email_id) {
            const profileEmail = userProfileData[0].email_id;
            const emailValid = userProfileData[0].email_valid === 'Y';

            setFormData({
                email_id: profileEmail,
                email_verified: emailValid
            });

            setIsEmailVerified(emailValid);
        } else {
            setFormData({ email_id: '', email_verified: false });
            setIsEmailVerified(false);
        }
    }, [userProfileData]);
    useEffect(() => {
        if (
            userProfileData?.[0]?.email_valid === 'Y' &&
            userProfileData?.[0]?.email_required_validation === 'N'
        ) {
            dispatch(setbuildYourProfileData({
                ...buildYourProfileStore,
                generalInformation: {
                    ...buildYourProfileStore.generalInformation,
                    email_id: userProfileData[0].email_id,
                    email_verified: true,
                },
            }));
        }
    }, [userProfileData]);

    // useEffect(() => {
    //     if (userProfileData?.[0]?.email_id) {
    //         const email = userProfileData[0].email_id;
    //         const emailVerified = userProfileData[0].email_valid === 'Y';

    //         setFormData({
    //             email_id: email,
    //             email_verified: emailVerified,
    //         });

    //         setIsEmailVerified(emailVerified);
    //     }

    //     if (executiveLoginCheck) {
    //         setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
    //     }
    //     const languageCodes = userProfileData?.[0]?.language?.split(',') || [];
    //     const selectedLanguages = LanguageListLov?.filter((lang: any) =>
    //         languageCodes.includes(lang.lang_code)
    //     );
    //     const selectedLanguageDescriptions = selectedLanguages?.map((lang: any) => lang.lang_desc);
    //     setPainterLang(selectedLanguageDescriptions?.join(', ') || '');
    // }, []);

    useEffect(() => {
        const languageCodes = userProfileData[0].language && userProfileData[0].language.split(",");
        const selectedLanguages = LanguageListLov && LanguageListLov.filter((lang: { lang_code: any; }) => languageCodes.includes(lang.lang_code));
        const selectedLanguageDescriptions = selectedLanguages.map((lang: { lang_desc: any; }) => lang.lang_desc);
        setPainterLang(selectedLanguageDescriptions != "" ? selectedLanguageDescriptions : userProfileData[0].language)
        // setIsEmailVerified(
        //     userProfileData[0].email_valid === 'Y' ? true : false,
        // )
    }, [userProfileData])
    // useEffect(() => {
    //     if (userProfileData && userProfileData.length > 0 && userProfileData[0].email_id != "") {
    //         const profileEmail = userProfileData[0].email_id;
    //         setFormData({
    //             email_id: userProfileData[0].email_id,
    //             email_verified: userProfileData[0].email_required_validation === 'Y' ? true : false,
    //         });
    //         const formEmail = formData.email_id?.trim() || '';
    //         if (formEmail != profileEmail) {
    //             setFormData(prev => ({ ...prev, email_verified: true }));
    //             setIsEmailVerified(false);
    //         } else {
    //             setFormData(prev => ({ ...prev, email_verified: false }));
    //             setIsEmailVerified(true);
    //         }
    //     }
    //     else {
    //         setFormData(prevDate => ({ ...prevDate, email_verified: false }));
    //         setIsEmailVerified(false);
    //     }
    // }, [formData.email_id]);
    useEffect(() => {
        const storeEmail = buildYourProfileStore?.generalInformation?.email_id;
        const storeVerified = buildYourProfileStore?.generalInformation?.email_verified;

        const backendEmail = userProfileData?.[0]?.email_id || '';
        const backendVerified = userProfileData?.[0]?.email_valid === 'Y';

        if (storeEmail) {
            setFormData({
                email_id: storeEmail,
                email_verified: storeVerified || false,
            });
            setIsEmailVerified(storeVerified || false);
        } else if (backendEmail) {
            setFormData({
                email_id: backendEmail,
                email_verified: backendVerified,
            });
            setIsEmailVerified(backendVerified);
            dispatch(setbuildYourProfileData({
                ...buildYourProfileStore,
                generalInformation: {
                    email_id: backendEmail,
                    email_verified: backendVerified,
                },
            }));
        } else {
            setFormData({ email_id: '', email_verified: false });
            setIsEmailVerified(false);
        }
    }, []);

    return (
        <>
            <ScrollView style={{ backgroundColor: Colors.color_white }}>
                <View style={{ ...styles.container }}>
                    <View style={{ ...styles.headerContainer }}>
                        <Text style={{ ...styles.headerText }}>{t("GeneralInfo")}</Text>
                    </View>
                    <View style={{ ...styles.contentContainer }}>
                        <View style={styles.generalInfoContainer}>
                            <View style={styles.icon}>
                                <CallingIcon width={20} height={20} />
                            </View>
                            <View>
                                <Text style={styles.generalInfoHeader}>{t("PhoneNumber")}</Text>
                                <Text style={styles.generalInfoData}>{userProfileData[0].painter_mobile}</Text>
                            </View>
                        </View>
                        <View style={styles.generalInfoContainer}>
                            <View style={styles.icon}>
                                <WhatsAppIcon width={20} height={20} />
                            </View>
                            <View>
                                <Text style={styles.generalInfoHeader}>{t("WhatsappNumber")}</Text>
                                <Text style={styles.generalInfoData}>{userProfileData[0].wa_ph_no}</Text>
                            </View>
                        </View>
                        <View style={styles.generalInfoContainer}>
                            <View style={styles.icon}>
                                <EmailIcon width={20} height={20} />
                            </View>
                            {/* <View>
                                <Text style={styles.generalInfoHeader}>{t("EmailId")}</Text>
                                <Text style={styles.generalInfoData}>{userProfileData[0].email_id ?? "-"}</Text>
                            </View> */}
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <InputFieldWithValidateEmail
                                    showLabel={true}
                                    label={t("EmailId")}
                                    showPlaceholder={true}
                                    placeholder={t("EmailIdPlaceholder")}
                                    onChange={(val: any) => handleChange('email_id', val)}
                                    keyboardType={'default'}
                                    error={errors.email_id}
                                    isRequiredMark={true}
                                    defaultValue={formData.email_id}
                                    validate={validateEmail}
                                    disabled={isAPICalledEmail}
                                    isAPICall={isAPICalledEmail}
                                    isWhatsappVerified={formData.email_verified}
                                    editable={!UserGroupArr.includes(getExecutiveLogin.toLowerCase())}
                                />
                            </View>
                        </View>
                        <View style={styles.generalInfoContainer}>
                            <View style={styles.icon}>
                                <LocationIcon width={20} height={20} />
                            </View>
                            <View style={{ marginTop: -9 }}>
                                <Text style={styles.generalInfoHeader}>{t("location")}</Text>
                                <Text style={{ ...styles.generalInfoData, width: '85%' }} numberOfLines={2} >{userProfileData[0].full_address}</Text>
                            </View>
                        </View>
                        <View style={styles.generalInfoContainer}>
                            <View style={styles.icon}>
                                <LanguageIcon width={20} height={20} />
                            </View>
                            <View>
                                <Text style={styles.generalInfoHeader}>{t("Language")}</Text>
                                {/* <Text style={styles.generalInfoData}>{userProfileData[0].language}</Text> */}
                                <Text style={styles.generalInfoData}>{painterLang}</Text>
                            </View>
                        </View>
                        {userProfileData[0] && userProfileData[0].team_members && userProfileData[0].team_members.length > 0 && (
                            <View style={styles.generalInfoContainer}>
                                <View style={styles.icon}>
                                    <GroupIcon width={20} height={20} />
                                </View>
                                <View>
                                    <Text style={styles.generalInfoHeader}>{t("TeamMember")}</Text>
                                    <Pressable onPress={() => { onPressOpen(); }}>
                                        <View style={{ marginTop: 5, ...styles.groupingMember }}>
                                            {userProfileData[0] && userProfileData[0].team_members && userProfileData[0].team_members.length > 0 && (
                                                <>
                                                    {userProfileData[0].team_members.slice(0, 5).map((item: any, index: number) => (
                                                        <View key={index} style={{ marginLeft: -20 }}>
                                                            <InitialAvatar name={item.member_name} profilePic={''} size={45} fontSize={17}></InitialAvatar>
                                                        </View>
                                                    ))}
                                                    {userProfileData[0].team_members && userProfileData[0].team_members.length > 5 && (
                                                        <Text style={styles.teamMemberCount}>{userProfileData[0].team_members.length}+</Text>
                                                    )}
                                                </>
                                            )}
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
            <View style={{ ...styles.fixedButtongeneralInfo }}>
                <View style={{ width: '48%', marginRight: 5 }}>
                    <ButtonLarge
                        title={t("Back")}
                        onPress={() => {
                            onPressBackHome();
                        }}
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
                        onPress={goToExpertise}
                        fillBtn={true}
                        key={'Next'}
                        showIcon={false}
                        iconName=""
                        paddingVertical={7}
                        paddingHorizontal={5}
                        fontSize={15}
                        iconSize={19}
                    //disabled={!isEmailVerified}
                    />
                </View>
            </View>

            <CustomBottomSheet
                isVisible={myTeamBottomSheetModel}
                onClose={() => onPressClose()}
                sheetTitle={customBottomSheetTitle}
            >
                <View style={{ ...styles.myTeamContainer }}>
                    {userProfileData[0] && userProfileData[0].team_members && userProfileData[0].team_members.length > 0 && (
                        <>
                            {userProfileData[0].team_members.map((item: any, index: number) => (
                                <View key={index} style={{ marginBottom: 8 }}>
                                    <Card>
                                        <View style={{ ...styles.teamCard }}>
                                            <InitialAvatar name={item.member_name} profilePic={''} size={45} fontSize={17}></InitialAvatar>
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={styles.generalInfoHeader}>{item.member_name}</Text>
                                                <Text style={styles.generalInfoData}>{item.member_mobile_no}</Text>
                                            </View>
                                        </View>
                                    </Card>
                                </View>
                            ))}
                        </>
                    )}
                </View>
            </CustomBottomSheet>





            {openEmailOTPModal === true && (
                <ModalComponent>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{t("VerifyEmailId")}</Text>
                            <Text style={{ marginBottom: 0, fontFamily: Fonts.OpenSans400Regular }}>
                                {t("OTPSend")} {formData.email_id} {' '}
                            </Text>
                            <View style={{ paddingHorizontal: 12, marginTop: 5 }}>
                                {/* <OTPInput
                                    code={otpCodeEmail}
                                    setCode={setOTPCodeEmail}
                                    maximumLength={maximumCodeLengthEmail}
                                    setIsPinReady={setIsPinReady}
                                /> */}
                                <OTPInputCustom
                                    onOtpChange={(otp: string) => setOTPCodeEmail(otp)}
                                    onOtpComplete={(otp: string) => setOTPCodeEmail(otp)}
                                    onReset={reset}
                                    length={6}
                                />
                                {openEmailOTPError && (
                                    <Text style={[styles.errorOtp]}>{t("EnterValideOTP")}</Text>
                                )}
                            </View>
                            <View style={{ ...styles.fixedButton }}>
                                <View style={{ width: '50%' }}>
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
                                <View style={{ width: '50%' }}>
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
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 5
    },
    headerContainer: {
        marginTop: 0
    },
    headerText: {
        textAlign: 'center',
        color: Colors.ui_dark_bg,
        fontSize: 20,
        fontFamily: Fonts.poppins500Medium,
        textTransform: 'capitalize'
    },
    subHeaderText: {
        textAlign: 'center',
        color: Colors.dark_text_color,
        fontSize: 14,
        fontFamily: Fonts.OpenSans600SemiBold
    },
    contentContainer: {
        paddingHorizontal: 5,
        marginTop: 10
    },
    generalInfoHeader: {
        color: Colors.color_black,
        fontSize: 12,
        fontFamily: Fonts.OpenSans600SemiBold,
        textTransform: 'capitalize',
    },
    generalInfoContainer: {
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'nowrap'
    },
    generalInfoData: {
        fontSize: 15,
        color: Colors.color_dark_gray,
        //fontFamily: Fonts.poppins400Regular
    },
    icon: {
        marginRight: 10,
        marginTop: 10
    },
    groupingMember: {
        marginLeft: 20,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    teamMemberCount: {
        color: Colors.color_black,
        fontSize: 17,
        fontFamily: Fonts.OpenSans700Bold,
        marginLeft: 8,
    },
    myTeamContainer: {
        paddingHorizontal: 15,
    },
    teamCard: {
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    fixedButtongeneralInfo: {
        backgroundColor: Colors.color_white,
        paddingHorizontal: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
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
        width: '97%',
    },
    modalText: {
        marginBottom: 15,
        marginTop: 5,
        color: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins600SemiBold,
        fontSize: 18,
    },
    errorOtp: {
        color: '#dc3545',
        fontSize: 10,
        fontStyle: 'italic',
        textAlign: 'right',
        position: 'absolute',
        fontFamily: Fonts.poppins400Regular,
        right: 10,
        bottom: 0,
    },
    fixedButton: {
        //backgroundColor: Colors.color_white,
        paddingHorizontal: 5,
        // display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 15,
        //position: 'absolute',
        //bottom: -40,
        //gap: 40
    },
});

export default GeneralInfo;


