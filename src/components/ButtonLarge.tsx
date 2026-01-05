/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { FC, memo } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
// import styles from './styles';
import { StyleSheet } from 'react-native';
import { Fonts } from '../themes';
import { Colors } from '../themes';
import { useTranslation } from 'react-i18next';

export interface I_Button {
  title: string;
  onPress: Function;
  fillBtn: boolean;
  showIcon: boolean;
  iconName: string;
  paddingVertical: number;
  paddingHorizontal: number;
  fontSize: number;
  iconSize: number;
  disabled?: boolean;
  isAPICall?: boolean;
  margin?: number | any;
  bgColor?: string
}

// ********** OUTLINE BUTTON HERE ********** //
const ButtonOutline: FC<I_Button> = ({
  title,
  onPress,
  fillBtn,
  showIcon,
  iconName,
  paddingVertical,
  paddingHorizontal,
  fontSize,
  iconSize,
  disabled,
  isAPICall,
  margin,
  bgColor
}) => {
  const { t } = useTranslation();
  return (
    <Pressable
      style={[
        styles.container,
        {
          alignSelf: 'center',
          backgroundColor: bgColor ?? Colors.color_white,
          paddingVertical: paddingVertical,
          borderWidth: 1.5,
          borderColor: bgColor ?? Colors.button_dark_bg,
          paddingHorizontal: paddingHorizontal,
          opacity: disabled ? 0.5 : 1,
          margin: margin ?? 10
        },
      ]}
      onPress={() => {
        onPress();
      }}
      disabled={disabled}>
      {!isAPICall ? (
        <>
          <Text
            style={[
              styles.buttonTitle,
              {
                color: Colors.button_dark_bg,
                fontSize: fontSize ? fontSize : 16,
              },
            ]}>
            {title}
          </Text>
          {showIcon && (
            <View style={{ marginLeft: 10 }}>
              <FontAwesome
                name={iconName}
                size={iconSize}
                color={Colors.button_dark_bg}
              />
            </View>
          )}
        </>
      ) : (
        <Text
          style={[
            styles.buttonTitle,
            {
              color: Colors.color_white,
              fontSize: fontSize ? fontSize : 16,
            },
          ]}>
          {t("PleaseWait")}
        </Text>
      )}
    </Pressable>
  );
};
// ********** OUTLINE BUTTON END ********** //

// ********** SOLID BUTTON HERE START********** //
const ButtonSolid = ({
  title,
  onPress,
  fillBtn,
  showIcon,
  iconName,
  paddingVertical,
  paddingHorizontal,
  fontSize,
  iconSize,
  disabled,
  isAPICall,
  margin,
  bgColor
}: I_Button) => {
  const { t } = useTranslation();
  return (
    <Pressable
      style={[
        styles.container,
        {
          alignSelf: 'center',
          backgroundColor: bgColor ?? Colors.button_dark_bg,
          paddingVertical: paddingVertical,
          paddingHorizontal: paddingHorizontal,
          opacity: disabled ? 0.5 : 1,
          borderWidth: 1.5,
          borderColor: bgColor ?? Colors.button_dark_bg,
          margin: margin ?? 10
        },
      ]}
      onPress={() => {
        onPress();
      }}
      disabled={disabled}>
      {!isAPICall ? (
        <>
          <Text
            style={[
              styles.buttonTitle,
              {
                color: Colors.color_white,
                fontSize: fontSize ? fontSize : 14,
              },
            ]}>
            {title}
          </Text>
          {showIcon && (
            <View style={{ marginLeft: 10 }}>
              <FontAwesome name={iconName} size={iconSize} color="#fff" />
            </View>
          )}
        </>
      ) : (
        <View style={{ ...styles.loaderStyle }}>
          <ActivityIndicator size="small" color="#fff" />
          <Text
            style={[
              styles.buttonTitle,
              {
                color: Colors.color_white,
                fontSize: fontSize ? fontSize : 16,
                marginLeft: 10,
              },
            ]}>
            {t("PleaseWait")}
          </Text>
        </View>
      )}
    </Pressable>
  );
};
// ********** SOLID BUTTON HERE END ********** //

const ButtonLarge = (props: I_Button) => {


  return props.fillBtn ? (
    <ButtonSolid {...props} />
  ) : (
    <ButtonOutline {...props} />
  );
};

// ********** BUTTONS CSS START ********** //
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    borderRadius: 10,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  buttonTitle: {
    fontSize: 16,
    fontFamily: Fonts.poppins500Medium,
    textAlign: 'center',
    lineHeight: 30,
  },
  iconStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  loaderStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
});
// ********** BUTTONS CSS END ********** //
export default memo(ButtonLarge);
