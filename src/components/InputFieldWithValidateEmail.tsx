/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    View,
    Text,
    TextInput,
    KeyboardTypeOptions,
    Pressable,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Fonts } from '../themes';
import { Colors } from '../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { UserGroupArr } from '../utils/hierarchyLoginCheck';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export interface I_Input {
    showLabel: boolean;
    label: string;
    showPlaceholder: boolean;
    placeholder: string;
    defaultValue?: string;
    onChange: Function;
    onKeyPress?: Function;
    keyboardType: KeyboardTypeOptions;
    maxLength?: number;
    error?: string;
    isRequiredMark?: boolean;
    disabled?: boolean;
    isAPICall?: boolean;
    validate: Function;
    isWhatsappVerified: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
    editable?: boolean;
    onEndEditing?: Function;
    value?: any;
    returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
    resetTextBox?: boolean;
}

const InputFieldWithValidateEmail = ({
    showLabel,
    label,
    value,
    showPlaceholder,
    placeholder,
    onChange,
    onKeyPress,
    keyboardType,
    maxLength,
    error,
    defaultValue,
    isRequiredMark,
    validate,
    isAPICall,
    disabled,
    isWhatsappVerified,
    autoCapitalize,
    editable = true,
    onEndEditing,
    returnKeyType,
    resetTextBox,
}: I_Input) => {
    const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
    const [getExecutiveLogin, setExecutiveLogin] = useState('');
    const [inputError, setInputError] = useState('');
    const inputRef = useRef<TextInput>(null);
    const prevDefaultValueRef = useRef<string | undefined>(undefined);
    const [isFocused, setIsFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState(value || '');

    const { t } = useTranslation();

    useEffect(() => {
        if (executiveLoginCheck) {
            setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
        }
    }, [executiveLoginCheck]);

    useEffect(() => {
        if (defaultValue !== prevDefaultValueRef.current) {
            prevDefaultValueRef.current = defaultValue;
            setCurrentValue(defaultValue?.trim() || '');
        }
    }, [defaultValue]);

    useEffect(() => {
        if (resetTextBox) resetInputBox();
    }, [resetTextBox]);

    const resetInputBox = () => {
        setCurrentValue('');
        inputRef.current?.clear();
    };

    const handleTextChange = (input: string) => {
        const trimmedInput = input.trim();
        setCurrentValue(trimmedInput);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (trimmedInput && !emailRegex.test(trimmedInput)) {
            setInputError(i18n.t('InvalidEmailFormat'));
        } else {
            setInputError('');
        }

        onChange(trimmedInput);
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <View style={{ marginBottom: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TextInput
                    style={{
                        fontSize: 15,
                        color: Colors.color_dark_gray,
                        borderWidth: 1,
                        borderColor: '#F2F2F2',
                        backgroundColor: '#F2F2F2',
                        width:
                            UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && !isWhatsappVerified
                                ? '100%'
                                : isWhatsappVerified
                                    ? '90%'
                                    : '73%',
                        ...styles.inputStyles,
                    }}
                    keyboardType={keyboardType}
                    placeholder={isFocused ? placeholder : ''}
                    placeholderTextColor={Colors.color_gray}
                    onKeyPress={e => (onKeyPress ? onKeyPress(e) : null)}
                    onChangeText={handleTextChange}
                    maxLength={maxLength}
                    defaultValue={defaultValue}
                    autoCapitalize={autoCapitalize}
                    editable={editable}
                    ref={inputRef}
                    value={currentValue}
                    onEndEditing={e => {
                        setIsFocused(false);
                        onEndEditing && onEndEditing(e);
                    }}
                    onFocus={() => setIsFocused(true)}
                    returnKeyType={returnKeyType ?? 'done'}
                />
                {showLabel && (
                    <TouchableWithoutFeedback onPress={focusInput}>
                        <Text
                            style={[
                                styles.floatingLabel,
                                (isFocused || currentValue) && styles.floatingLabelFocused,
                            ]}>
                            {label}
                            {isRequiredMark && <Text style={styles.astrik}> *</Text>}
                        </Text>
                    </TouchableWithoutFeedback>
                )}
                <View style={{ marginTop: 6 }}>
                    {!isWhatsappVerified ? (
                        !UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && (
                            <Pressable
                                style={{ ...styles.validateButton, opacity: isAPICall ? 0.5 : 1 }}
                                disabled={isAPICall}
                                onPress={() => validate()}>
                                {isAPICall ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={{ ...styles.validateButtonText }}>{t('Validate')}</Text>
                                )}
                            </Pressable>
                        )
                    ) : (
                        <Pressable style={styles.verifiedWhatsappIcon}>
                            <Ionicons name="checkmark-done-outline" style={{ color: 'green' }} size={28} />
                        </Pressable>
                    )}
                </View>
            </View>
            {(error || inputError) && <Text style={styles.error}>{error || inputError}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyles: {
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 42,
        marginTop: 10,
        fontFamily: Fonts.OpenSans600SemiBold,
    },
    validateButton: {
        backgroundColor: Colors.button_dark_bg,
        padding: 10,
        width: 80,
        borderRadius: 8,
        marginLeft: 10,
        marginTop: 5.5,
    },
    validateButtonText: {
        textAlign: 'center',
        color: Colors.color_white,
        fontFamily: Fonts.OpenSans500Medium,
        fontSize: 12.5,
    },
    astrik: {
        color: '#dc3545',
    },
    verifiedWhatsappIcon: {
        padding: 8,
        width: 80,
        borderRadius: 8,
    },
    error: {
        color: '#dc3545',
        fontSize: 10,
        fontStyle: 'italic',
        textAlign: 'right',
        position: 'absolute',
        right: 0,
        bottom: -13,
        fontFamily: Fonts.poppins400Regular,
    },
    floatingLabel: {
        position: 'absolute',
        left: 7,
        top: 20,
        fontSize: 15,
        color: Colors.color_gray,
        zIndex: 9999,
        fontFamily: Fonts.OpenSans600SemiBold,
    },
    floatingLabelFocused: {
        top: -6,
        fontSize: 12,
        marginTop: -3,
        color: Colors.color_black,
        fontFamily: Fonts.OpenSans600SemiBold,
    },
});

export default InputFieldWithValidateEmail;