/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  Image,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Fonts } from '../themes';
import { Colors } from '../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { UserGroupArr } from '../utils/hierarchyLoginCheck';
import { useTranslation } from 'react-i18next';
import { englishTextRegex } from '../utils/regexList';
import i18n from '../i18n';
import { TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

const InputFieldWithValidate = ({
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
  editable,
  onEndEditing,
  returnKeyType,
  resetTextBox
}: I_Input) => {


  // useEffect(() => {
  //   console.log('isWhatsappVerified', isWhatsappVerified);
  // }, [isWhatsappVerified]);

  const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
  const [getExecutiveLogin, setExecutiveLogin] = useState('');
  const [inputError, setInputError] = useState('');
  const inputRef = useRef<TextInput>(null);
  const prevDefaultValueRef = useRef<string | undefined>(undefined);
  const [isFocused, setIsFocused] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || '');

  useEffect(() => {
    if (executiveLoginCheck) {
      setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
    }
  }, [executiveLoginCheck]);

  const { t } = useTranslation();

  const handleTextChange = (input: string) => {
    // Regular expression to allow only English letters, numbers, and common punctuation
    const englishText = input.replace(englishTextRegex, '');
    if (input !== englishText) {
      setInputError(i18n.t('OnlyEnglishAallowed'));
    } else {
      setInputError('');
    }
    setCurrentValue(englishText);
    onChange(englishText);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    setCurrentValue(defaultValue)
  }, [defaultValue])

  // const resetInputBox = () => {
  //   (inputRef as any).current.clear();
  //   setCurrentValue('');
  // };
  useEffect(() => {
    if (defaultValue !== prevDefaultValueRef.current) {
      prevDefaultValueRef.current = defaultValue;
      setCurrentValue(defaultValue || '');
    }
  }, [defaultValue]);

  const resetInputBox = () => {
    setCurrentValue('');
    inputRef.current?.clear();
  };


  useEffect(() => {
    if (resetTextBox) resetInputBox();
  }, [resetTextBox]);

  return (
    <>
      <View style={{ marginBottom: 10 }}>
        {/* {showLabel && (
          <Text style={[styles.labelInput]}>
            {label}
            {isRequiredMark && <Text style={[styles.astrik]}> *</Text>}{' '}
          </Text>
        )} */}
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TextInput
            style={{
              fontSize: 15,
              color: Colors.color_dark_gray,
              borderWidth: 1,
              borderColor: '#F2F2F2',
              backgroundColor: '#F2F2F2',
              width: UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && !isWhatsappVerified ? '100%' : isWhatsappVerified ? '90%' : '73%',
              ...styles.inputStyles,
            }}
            keyboardType={keyboardType}
            secureTextEntry={false}
            placeholder={isFocused ? placeholder : ''}
            //placeholder={showPlaceholder ? placeholder : ''}
            placeholderTextColor={Colors.color_gray}
            onChange={e => (onChange ? onChange(e) : null)}
            onKeyPress={e => (onKeyPress ? onKeyPress(e) : null)}
            // onChangeText={number => onChange(number)}
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
              <>
                {!UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && (
                  <Pressable
                    style={{ ...styles.validateButton, opacity: isAPICall ? 0.5 : 1 }}
                    disabled={isAPICall}
                    onPress={() => validate()}>
                    {isAPICall ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={{ ...styles.validateButtonText }}>{t("Validate")}</Text>
                    )}
                  </Pressable>
                )}
              </>
            ) : (
              <Pressable style={{ ...styles.verifiedWhatsappIcon }}>
                <Ionicons name="checkmark-done-outline" style={{ color: 'green' }} size={28} />
              </Pressable>
            )}
          </View>
        </View>
        {(error || inputError) && <Text style={[styles.error]}>{error || inputError}</Text>}
      </View>
    </>
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
  labelInput: {
    color: Colors.color_gray,
    fontFamily: Fonts.OpenSans600SemiBold
  },
  validateButton: {
    backgroundColor: Colors.button_dark_bg,
    padding: 10,
    width: 80,
    borderRadius: 8,
    marginLeft: 10,
    marginTop: 5.5
    // position: 'absolute',
    // zIndex: 9999,
    // right: 5,
    // top: 5,
  },
  validateButtonText: {
    textAlign: 'center',
    color: Colors.color_white,
    fontFamily: Fonts.OpenSans500Medium,
    fontSize: 12.5
  },
  astrik: {
    color: '#dc3545',
  },
  verifiedWhatsappIcon: {
    padding: 8,
    width: 80,
    borderRadius: 8,
    // position: 'absolute',
    // zIndex: 9999,
    // right: -30,
    // top: 0,
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
    color: Colors.color_black,
  },
});

export default InputFieldWithValidate;
