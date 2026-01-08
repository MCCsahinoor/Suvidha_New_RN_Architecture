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
  Platform,
} from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Fonts } from '../themes';
import { Colors } from '../themes';

export interface I_Input {
  showLabel: boolean;
  label: string;
  showPlaceholder: boolean;
  placeholder: string;
  onChange: Function;
  onKeyPress?: Function;
  keyboardType: KeyboardTypeOptions;
  maxLength?: number;
  countryFlag?: boolean;
  error?: string;
  defaultValue?: string;
}
// let widthWindow = Dimensions.get('window').width;
// const inputWidth = widthWindow - 20 * 7;

const phoneNumberInput = ({
  showLabel,
  label,
  showPlaceholder,
  placeholder,
  onChange,
  onKeyPress,
  keyboardType,
  maxLength,
  countryFlag,
  error,
  defaultValue,
}: I_Input) => {
  return (
    <>
      <View style={{ position: 'relative' }}>
        {showLabel && <Text style={[styles.labelInput]}>{label}</Text>}
        <View style={{
          ...styles.inputStyles,
          borderColor: error ? '#ffa5a1' : '#D9D9D9',
          backgroundColor: error ? '#ffebea' : '#ffffff',
        }}>
          <View style={[styles.inputPrefix]}>
            {countryFlag && (
              <Image
                style={[styles.flag]}
                source={require('../assets/images/flag.png')}
              />
            )}
            <Text
              style={{
                fontSize: 17,
                color: Colors.color_black,
                fontFamily: Fonts.OpenSans600SemiBold,
                marginRight: 5
              }}>
              +91</Text>

            <TextInput
              style={{
                width: countryFlag === true ? '67%' : '80%',
                fontSize: 17,
                marginTop: Platform.OS === 'android' ? 4 : 1,
                color: Colors.color_black, 
                paddingLeft: Platform.OS === 'android' ? 0 : 10, 
              }}
              keyboardType={keyboardType}
              secureTextEntry={false}
              placeholder={showPlaceholder ? placeholder : ''}
              placeholderTextColor={'#cbd5e1'}
              onChange={e => (onChange ? onChange(e) : null)}
              onKeyPress={e => (onKeyPress ? onKeyPress(e) : null)}
              onChangeText={number => onChange(number)}
              maxLength={maxLength}
              {...(defaultValue ? { defaultValue } : {})}
            />
          </View>
        </View>
        <Text style={[styles.error]}>{error ? error : ''}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputStyles: {
    borderWidth: 1.5,
    borderColor: '#D9D9D9',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    marginTop: 5,
    fontFamily: Fonts.poppins600SemiBold,
  },
  inputPrefix: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 46,
    fontFamily: Fonts.poppins600SemiBold,
  },
  flag: {
    height: 48,
    width: 48,
    resizeMode: 'contain',
    marginRight: 10,
    //fontFamily: Fonts.OpenSans600SemiBold,
  },
  labelInput: {
    color: Colors.color_black,
    fontFamily: Fonts.poppins600SemiBold
  },

  error: {
    color: '#dc3545',
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'right',
    position: 'absolute',
    fontFamily: Fonts.poppins400Regular,
    right: 6,
    bottom: 2,
  },
});

export default phoneNumberInput;
