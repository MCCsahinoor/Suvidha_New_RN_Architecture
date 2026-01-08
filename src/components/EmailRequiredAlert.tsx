import React, { FC, memo, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import ButtonLarge from "./ButtonLarge";
import { Colors, Fonts } from "../themes";
import CustomToastUI from "./CustomToastUI";
import InputFields from '../components/inputField';
import { useTranslation } from "react-i18next";

export interface I_EmailValidationAlert {
    defaultEmail: string;
    onValidate: (email: string) => void;
    onClose: () => void;
    isAPICall?: boolean;
}

const EmailValidationAlert: FC<I_EmailValidationAlert> = ({
    defaultEmail,
    onValidate,
    onClose,
    isAPICall,

}) => {
    const [email, setEmail] = useState<string>(defaultEmail);
    const [errors, setErrors] = useState<{ email?: string }>({});
    const [formData, setFormData] = useState<{ email: string }>({ email: defaultEmail });
    const { t } = useTranslation();

    useEffect(() => {
        setEmail(defaultEmail);
        setFormData({ email: defaultEmail });
    }, [defaultEmail]);

    // const handleChange = (name: string, value: string) => {
    //     setErrors({ ...errors, [name]: '' });
    //     setFormData({ ...formData, [name]: value });
    //     setEmail(value);
    // };
    const handleChange = (name: string, value: string) => {
        const trimmedValue = value.trim();
        setErrors({ ...errors, [name]: '' });
        setFormData({ ...formData, [name]: trimmedValue });
        setEmail(trimmedValue);
    };

    const validateEmailFormat = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleValidation = () => {
        const emailValue = formData.email.trim();

        if (!emailValue) {
            setErrors({ email: 'Please provide an email ID' });
            return;
        }

        if (!validateEmailFormat(emailValue)) {
            setErrors({ email: 'Please enter a valid email ID' });
            return;
        }

        onValidate(emailValue);
    };

    return (
        <Modal animationType="slide" transparent={true}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.headerText}>{t("VerifyYourEmailID")}</Text>
                    <View style={styles.inputRow}>
                        <View style={{ width: '100%' }}>
                            <InputFields
                                showLabel={true}
                                label={'Email ID'}
                                showPlaceholder={true}
                                placeholder={t("EnterYourEmailID")}
                                onChange={(val: string) => handleChange('email', val)}
                                keyboardType={'default'}
                                error={errors.email}
                                isRequiredMark={true}
                                defaultValue={defaultEmail}
                                editable={true}
                            />
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10
                            }}>
                                <View style={{ flex: 1 }}>
                                    <ButtonLarge
                                        title={'Skip now'}
                                        onPress={() => onClose()}
                                        fillBtn={false}
                                        key={'skip'}
                                        showIcon={false}
                                        iconName=""
                                        paddingHorizontal={8}
                                        paddingVertical={6}
                                        fontSize={13}
                                        iconSize={19}
                                        disabled={isAPICall}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>

                                    <ButtonLarge
                                        title="Validate"
                                        onPress={handleValidation}
                                        fillBtn={true}
                                        fontSize={13}
                                        paddingHorizontal={8}
                                        paddingVertical={6}
                                        isAPICall={isAPICall}
                                        disabled={isAPICall}
                                        showIcon={false}
                                        iconName={""}
                                        iconSize={0}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <CustomToastUI />
            </View>
        </Modal>
    );
};

export default memo(EmailValidationAlert);

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
        fontSize: 16,
        fontFamily: Fonts.poppins600SemiBold,
        color: Colors.ui_dark_bg,
        marginBottom: 15,
    },
    inputRow: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
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
});
