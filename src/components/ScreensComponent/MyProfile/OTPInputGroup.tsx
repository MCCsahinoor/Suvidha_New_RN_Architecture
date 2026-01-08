import React, { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react';
import { View, TextInput, Platform } from 'react-native';

interface OtpInputProps {
    length?: number;
    onComplete?: (otp: string) => void;
    disabled?: boolean;
}

const OtpInputGroup: React.FC<OtpInputProps> = ({
    length = 4,
    onComplete,
    disabled = false,
}) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null | any)[]>([]);

    // Initialize refs array
    if (inputRefs.current.length !== length) {
        inputRefs.current = Array(length).fill(null);
    }

    const handleChange = (index: number, value: any) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Call onComplete when all digits are filled
        if (newOtp.every(digit => digit !== '')) {
            onComplete?.(newOtp.join(''));
        }
    };

    const handleKeyDown = (index: number, e: any) => {
        const key = e.nativeEvent.key;

        if (key === 'Backspace' && !otp[index] && index > 0) {
            // Move to previous input on backspace if current input is empty
            inputRefs.current[index - 1]?.focus();
        } else if (/^\d$/.test(key) && index < length - 1) {
            // Move to next input when typing a number
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        // e.preventDefault();
        // const pastedData = e.clipboardData.getData('text/plain');
        // const pastedNumbers = pastedData.replace(/[^0-9]/g, '').slice(0, length);

        // const newOtp = [...otp];
        // pastedNumbers.split('').forEach((digit: string, index: number) => {
        //   newOtp[index] = digit;
        // });
        // setOtp(newOtp);

        // // Focus last input or first empty input
        // const lastFilledIndex = newOtp.findIndex(digit => !digit);
        // const focusIndex = lastFilledIndex === -1 ? length - 1 : lastFilledIndex;
        // inputRefs.current[focusIndex]?.focus();

        // if (newOtp.every(digit => digit !== '')) {
        //   onComplete?.(newOtp.join(''));
        // }
    };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 2 ,paddingHorizontal:12}}>
            {otp.map((digit, index) => (
                <TextInput
                    key={index}
                    ref={el => {
                        inputRefs.current[index] = el;
                    }}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    editable={!disabled}
                    onChangeText={value => handleChange(index, value)}
                    onKeyPress={e => handleKeyDown(index, e)}
                    style={{
                        width: Platform.OS === 'ios' ? 48 : 45,
                        height: Platform.OS === 'ios' ? 48 : 45,
                        textAlign: 'center',
                        borderWidth: 1,
                        borderRadius: 8,
                        borderColor: '#000',
                        margin: Platform.OS === 'ios' ? 5 : 1,
                    }}
                />
            ))}
        </View>
    );
};

export default OtpInputGroup;
