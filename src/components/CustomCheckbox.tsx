import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../themes';
import { Fonts } from '../themes';

export interface CustomCheckboxProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  label?: string;
  labelPosition?: 'left' | 'right';
  size?: number;
  checkedColor?: string;
  uncheckedColor?: string;
  borderColor?: string;
  disabled?: boolean;
  labelStyle?: object;
  containerStyle?: object;
  checkmarkColor?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onToggle,
  label,
  labelPosition = 'right',
  size = 24,
  checkedColor = Colors.color_soft_green,
  uncheckedColor = Colors.color_white,
  borderColor = Colors.color_semi_dark_gray,
  disabled = false,
  labelStyle,
  containerStyle,
  checkmarkColor,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onToggle(!checked);
    }
  };

  const checkboxStyle = {
    width: size,
    height: size,
    borderRadius: size * 0.2,
    borderWidth: 2,
    borderColor: disabled ? Colors.color_semi_dark_gray : (checked ? checkedColor : borderColor),
    backgroundColor: disabled ? Colors.color_light_gray : (checked ? checkedColor : uncheckedColor),
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  };


  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, containerStyle]}
    >
      {label && labelPosition === 'left' && (
        <Text style={[styles.label, labelStyle, disabled && styles.disabledLabel]}>
          {label}
        </Text>
      )}
      <View style={checkboxStyle}>
        {checked && (
          <Ionicons 
            name="checkmark-sharp" 
            size={size * 0.7} 
            color={checkmarkColor || Colors.color_white} 
          />
        )}
      </View>
      {label && labelPosition === 'right' && (
        <Text style={[styles.label, labelStyle, disabled && styles.disabledLabel]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 14,
    color: Colors.color_black,
    fontFamily: Fonts.OpenSans400Regular,
    flexShrink: 1,
  },
  disabledLabel: {
    color: Colors.color_semi_dark_gray,
  },
});

export default CustomCheckbox;

