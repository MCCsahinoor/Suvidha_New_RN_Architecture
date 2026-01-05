/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, TextInput, KeyboardTypeOptions, TouchableWithoutFeedback, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Fonts } from '../themes';
import { Colors } from '../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { englishTextRegex } from '../utils/regexList';
import i18n from '../i18n'; 

export interface I_Input {
  showLabel: boolean;
  label?: string;
  placeholder: string;
  onChange: Function;
  onKeyPress?: Function;
  keyboardType: KeyboardTypeOptions;
  maxLength?: number;
  value?: any;
  error?: string;
  isRequiredMark?: boolean;
  defaultValue?: string;
  resetTextBox?: boolean;
  isSearchIcon?: boolean;
  editable?: boolean;
  onEndEditing?: Function;
  width?: string;
  showPlaceholder?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
}

const InputFields = ({
  showLabel,
  label,
  placeholder,
  onChange,
  onKeyPress,
  keyboardType,
  maxLength,
  value,
  error,
  isRequiredMark,
  defaultValue,
  resetTextBox,
  isSearchIcon,
  onEndEditing,
  editable,
  width,
  autoCapitalize,
  showPlaceholder,
  returnKeyType
}: I_Input) => {
  const inputRef = useRef<TextInput>(null);
  const [inputError, setInputError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || '');

  const resetInputBox = () => {
    (inputRef as any).current.clear();
    setCurrentValue('');
  };

  useEffect(() => {
    if (resetTextBox) resetInputBox();
  }, [resetTextBox]);

  const handleTextChange = (input: string) => {
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


  return (
    <View
      style={{ marginBottom: error || inputError ? 0 : 10, width: Platform.OS === 'ios' ? '100%' : '100%' }}
    >
      <View style={{ position: 'relative' }}>

        <TextInput
          style={[
            styles.inputStyles,
            {
              // borderColor: error || inputError ? '#ffa5a1' : '#F2F2F2',
              borderColor: '#F2F2F2',
              backgroundColor: '#F2F2F2',
              paddingLeft: isSearchIcon ? 45 : 10,
            },
          ]}
          keyboardType={keyboardType}
          secureTextEntry={false}
          placeholder={isFocused ? placeholder : ''}
          placeholderTextColor={Colors.color_gray}
          onKeyPress={e => (onKeyPress ? onKeyPress(e) : null)}
          onChangeText={handleTextChange}
          maxLength={maxLength}
          value={currentValue}
          defaultValue={defaultValue}
          ref={inputRef}
          editable={editable}
          autoCapitalize={autoCapitalize}
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
        {isSearchIcon && (
          <Ionicons style={styles.searchIcon} name="search" size={28} />
        )}
      </View>
      {(error || inputError) && (
        <Text style={styles.error}>{error || inputError}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyles: {
    width: '100%',
    fontSize: 15,
    color: Colors.color_dark_gray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 42,
    marginTop: 10,
    fontFamily: Fonts.OpenSans600SemiBold,
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
    fontFamily: Fonts.OpenSans600SemiBold
  },
  error: {
    color: '#dc3545',
    fontSize: 10,
    // fontStyle: 'italic',
    textAlign: 'right',
    fontFamily: Fonts.poppins400Regular,
    marginTop: 2,
  },
  astrik: {
    color: '#dc3545',
    fontSize: 12
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 16,
    left: 9,
  },
});

export default React.memo(InputFields);
