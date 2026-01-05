import React, { useState, useRef, memo, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Fonts } from '../themes';

const FourDigitInput = ({ onOtpChange, onOtpComplete, onReset }: any) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const digitInputs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text) || text === '') {
      const newDigits = [...digits];
      newDigits[index] = text;
      setDigits(newDigits);

      if (text.length === 1 && index < 3) {
        digitInputs[index + 1].current?.focus();
      }

      onOtpChange(newDigits.join(''));

      if (newDigits.every((digit) => digit.length === 1)) {
        onOtpComplete(newDigits.join(''));
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && digits[index] === '' && index > 0) {
      digitInputs[index - 1].current?.focus();
    }
  };


  useEffect(() => {
    setDigits(['', '', '', ''])
  }, [onReset])




  return (
    <View style={styles.container}>
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          ref={digitInputs[index]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  input: {
    borderColor: '#C8C6C6',
    borderWidth: 1.2,
    borderRadius: 5,
    padding: 12,
    width: "20%",
    backgroundColor: 'transparent',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontFamily: Fonts.OpenSans600SemiBold,
  },
});

export default memo(FourDigitInput);
