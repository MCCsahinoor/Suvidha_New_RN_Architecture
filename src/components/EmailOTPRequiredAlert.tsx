import React, { FC, memo, useEffect, useState } from "react";
import { Keyboard, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import ButtonLarge from "./ButtonLarge";
import { Colors, Fonts } from "../themes";
import CustomToastUI from "./CustomToastUI"; 
import { useTranslation } from "react-i18next";
import OTPInputCustom from "./OTPInputFieldCustom";

export interface I_EmailValidationAlert {
    email?: string;
    onValidate: (email: string, otpCode: string) => void;
    onClose: () => void;
    isAPICall?: boolean;
    onResend: () => void;
    onChangeEmail: () => void;
    resetTrigger?: number;
}

const EmailOTPRequiredAlert: FC<I_EmailValidationAlert> = ({
    email = "",
    onValidate,
    onClose,
    isAPICall,
    onResend,
    onChangeEmail,
    resetTrigger
}) => {
    const maximumCodeLength = 6;
    //const [email, setEmail] = useState("");
    const [otpCode, setOTPCode] = useState('');
    const [reset, setReset] = useState(false);
    const [isPinReady, setIsPinReady] = useState(false);
    const [isKeyBoardOpen, setisKeyBoardOpen] = useState(false);
    const { t } = useTranslation();
    const handleOtpChange = (otp: string) => {
        if (otp.length === 0) setOTPCode('');
    };
    const handleOtpComplete = (otp: string) => {
        setOTPCode(otp);
    };
    useEffect(() => {
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
    }, []);

    useEffect(() => {
        setOTPCode('');
        setIsPinReady(false);
    }, [resetTrigger]);

    return (
        <Modal animationType="slide" transparent={true}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.otpHeader}>{t("ValidateYourEmail")}</Text>
                    <Text style={styles.headerText}>{t("OTPhasbeensendon")}</Text>
                    <Text style={styles.headerText}>{email}</Text>
                    <View style={styles.inputRow}>
                        <View style={{ marginHorizontal: 15 }}>
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
                                length={maximumCodeLength}
                            />
                        </View>
                        <View style={{}}>
                            {!isKeyBoardOpen && (
                                <ButtonLarge
                                    title={"Verify OTP"}
                                    onPress={() => onValidate(email, otpCode)}
                                    fillBtn={true}
                                    key={'sendOTP'}
                                    showIcon={false}
                                    iconName=""
                                    paddingVertical={6}
                                    paddingHorizontal={8}
                                    fontSize={13}
                                    iconSize={0}
                                    isAPICall={isAPICall}
                                    disabled={otpCode.length < 4 || isAPICall}
                                />
                            )}
                        </View>
                    </View>
                    <View style={styles.textRow}>
                        <Text onPress={onResend} style={styles.text}>{t("ResendOTP")} </Text>
                        <Text onPress={onChangeEmail} style={styles.text}>{t("ChangeEmailId")} </Text>
                    </View>
                </View>
                <CustomToastUI />
            </View>
        </Modal>
    );
};

export default memo(EmailOTPRequiredAlert);


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        width: "100%",
        backgroundColor: "#fff",
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        padding: 20,
        alignItems: "center",
        elevation: 5,
    },
    headerText: {
        color: Colors.color_gray,
        fontSize: 14,
        fontFamily: Fonts.OpenSans600SemiBold,
        textAlign: 'center',
        marginBottom: 2
    },
    text: {
        color: '#2F6EFF',
        fontFamily: Fonts.OpenSans600SemiBold,
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 12

    },
    subHeaderText: {
        fontSize: 16.5,
        fontFamily: Fonts.poppins600SemiBold,
        color: Colors.ui_dark_bg,
        marginBottom: 8,
    },
    inputRow: {
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 15,
        // gap: 20,
    },
    textRow: {
        display: "flex",
        flexDirection: "row",
        gap: 163,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.button_dark_bg,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        color: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins400Regular,
    },
    otpHeader: {
        color: Colors.semi_dark_text_color,
        fontSize: 16,
        fontFamily: Fonts.poppins500Medium,
        marginTop: 3,
        marginBottom: 10,
        textAlign: 'center',
    },
});
