import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Pressable, useWindowDimensions, RefreshControl, TextInput } from 'react-native';
import HeaderCurve from '../../components/HeaderCurve';
import { Colors, Fonts } from '../../themes';

export interface I_BASIC_INFO_FormData {
    name: string;
    mobile: string;
    description: string;
}

import InputFields from '../../components/inputField';
import ButtonLarge from '../../components/ButtonLarge'; 
import AlertInfo from '../../components/alertInfo';



const DeleteAccount = () => {
    const [submitKycModel, setSubmitKycModel] = useState(false);
    const [formData, setFormData] = useState<I_BASIC_INFO_FormData>({
        name: '',
        mobile: '',
        description: ''
    });
    const [errors, setErrors] = useState<Partial<I_BASIC_INFO_FormData>>({});


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

    const validateForm = () => {
        const newErrors: Partial<I_BASIC_INFO_FormData> = {};
        const safeTrim = (value: string | null | undefined) => (value ?? '').trim();

        // DEPOT NAME
        if (safeTrim(formData.name) === '') {
            newErrors.name = 'Name is required.';
        }
        if (safeTrim(formData.mobile) === '') {
            newErrors.mobile = 'Mobile number is required.';
        }
        // if (safeTrim(formData.description) === '') {
        //     newErrors.description = 'Reason is required.';
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submit = () => {
        const isValid = validateForm();
        if (isValid) {
            saveBasicInfo();
            return true;
        } else {
            return false;
        }
    };


    const saveBasicInfo = (): void => {
        setSubmitKycModel(true)
        setFormData({
            name: '',
            mobile: '',
            description: ''
        })
    }
    const skipNow = () => {
        setSubmitKycModel(false);
    };

    return (
        <>
            <HeaderCurve
                topGaap={119}
                headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'}
                pageBackground={Colors.color_white}
            />
            <ScrollView style={{ backgroundColor: Colors.color_white }} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
                <View style={{ paddingHorizontal: 15, backgroundColor: Colors.color_white, marginTop: 20 }}>
                    <InputFields
                        showLabel={true}
                        label={'Name'}
                        showPlaceholder={true}
                        placeholder={'Enter Name'}
                        onChange={(val: any) => handleChange('name', val)}
                        keyboardType={'default'}
                        isRequiredMark={false}
                        error={errors.name}
                        defaultValue={formData.name}
                        editable={true}
                        autoCapitalize={'none'}
                    />
                    <InputFields
                        showLabel={true}
                        label={'Mobile Number'}
                        showPlaceholder={true}
                        placeholder={'Mobile Number'}
                        onChange={(val: any) => handleChange('mobile', val)}
                        keyboardType={'numeric'}
                        isRequiredMark={false}
                        error={errors.mobile}
                        editable={true}
                        defaultValue={formData.mobile}
                        maxLength={10}
                    />
                    <TextInput
                        style={{
                            width: '100%',
                            fontSize: 15,
                            color: Colors.color_black,
                            borderWidth: 1,
                            borderColor: '#F2F2F2',
                            backgroundColor: '#F2F2F2',
                            borderRadius: 8,
                            paddingHorizontal: 10,
                            marginTop: 15,
                            verticalAlign: 'top',
                            paddingLeft: 10,
                            fontFamily: Fonts.OpenSans600SemiBold,
                            height: 50,

                        }}
                        keyboardType="default"
                        secureTextEntry={false}
                        placeholder={'Enter Reason'}
                        placeholderTextColor={Colors.color_gray}
                        onChangeText={(val: any) => handleChange('description', val)}
                        value={formData.description}
                        defaultValue={formData.description}
                        editable={true}
                        multiline={true}
                        numberOfLines={10}
                    />
                </View>

            </ScrollView>
            <View style={{ paddingHorizontal: 15, backgroundColor: Colors.color_white, width: '100%' }}>
                <ButtonLarge
                    title={'Submit'}
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

            {submitKycModel && (
                <AlertInfo
                    skipNow={() => skipNow()}
                    confirmAction={() => skipNow()}
                    allowSkip={false}
                    headerText={"Your Account Deletion Request has been sent for Approval"}
                    subHeaderText={""}
                    confirmActionButtonText={"Okay"}
                    skipButtonText={'Ok'}
                    isAPICall={false}
                />
            )}
        </>
    );
};

export default DeleteAccount;

const styles = StyleSheet.create({
    loginBg: {
        height: 250,
        padding: 20,
    }
});
