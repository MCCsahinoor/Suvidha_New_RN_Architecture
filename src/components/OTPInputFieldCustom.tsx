import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Fonts } from '../themes';

interface OTPInputProps {
  onOtpChange?: (otp: string) => void;
  onOtpComplete?: (otp: string) => void;
  onReset?: any;
  length?: number;
}

const OTPInputCustom = ({ onOtpChange, onOtpComplete, onReset, length = 4 }: OTPInputProps) => {
  const safeLength = length && length > 0 ? length : 4;
  const [digits, setDigits] = useState<string[]>(() => Array(safeLength).fill(''));
  
  // Store refs in a ref array - initialize with proper length
  const createRefsArray = (len: number): React.RefObject<TextInput>[] => {
    const refs: React.RefObject<TextInput>[] = [];
    for (let i = 0; i < len; i++) {
      refs.push(React.createRef<TextInput>() as React.RefObject<TextInput>);
    }
    return refs;
  };
  
  const digitInputsRef = useRef<React.RefObject<TextInput>[]>(createRefsArray(safeLength));
  
  // Update refs array when length changes
  useEffect(() => {
    if (digitInputsRef.current.length !== safeLength) {
      digitInputsRef.current = Array(safeLength)
        .fill(null)
        .map((_, i) => digitInputsRef.current[i] || React.createRef<TextInput>());
    }
  }, [safeLength]);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text) || text === '') {
      const newDigits = [...digits];
      newDigits[index] = text;
      setDigits(newDigits);

      if (text.length === 1 && index < safeLength - 1 && digitInputsRef.current[index + 1]) {
        digitInputsRef.current[index + 1]?.current?.focus();
      }

      onOtpChange?.(newDigits.join(''));

      if (newDigits.every((digit) => digit && digit.length === 1)) {
        onOtpComplete?.(newDigits.join(''));
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && digits[index] === '' && index > 0 && digitInputsRef.current[index - 1]) {
      digitInputsRef.current[index - 1]?.current?.focus();
    }
  };

  // Update digits when length or onReset changes
  useEffect(() => {
    setDigits(Array(safeLength).fill(''));
  }, [onReset, safeLength]);




  return (
    <View style={styles.container}>
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          style={{
            ...styles.input,
            width: length > 4 ? "15%" : "20%"
          }}
          value={digit || ''}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          ref={digitInputsRef.current[index]}
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
    backgroundColor: 'transparent',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontFamily: Fonts.OpenSans600SemiBold,
  },
});

export default OTPInputCustom;
