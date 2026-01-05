/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
  AlertButton,
  Dimensions,
} from 'react-native';
import {Colors, Fonts} from '../themes';
import {ImageSourcePropType} from 'react-native'; 
import * as utils from '../utils';
export interface I_Button {
  title: string;
  subTitle: string;
  // photo?: ImageSourcePropType;
  id: string;
  getLang: (val: string) => void;
  lang: string;  
}

const Language = ({title, id, subTitle, getLang, lang}: I_Button) => { 

 
  return (
    <Pressable
      onPress={() => {
        getLang(id);
      }}>
      <View
        style={[
          styles.langCard,
          {
            borderColor: id === lang ? Colors.ui_dark_bg : Colors.color_light_gray,
            borderWidth: id === lang ? 1 : 0.9,
          },
        ]}>
        <View style={{width: (utils.Scale.getWindowDimensions().width - 105) / 2}}>
          <View>
            {id === lang && (
              <Image
                style={[styles.isCheck]}
                source={require('../assets/images/checkmark-circle-01.png')}
              />
            )}

            <Text style={[styles.title]} numberOfLines={1}>
              {title}
            </Text>
            <Text style={[styles.subTitle]} numberOfLines={1}>
              {subTitle}
            </Text>
            {/* <Image style={[styles.langImages]} source={photo} /> */}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  langCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: 5,
    padding: 10,
    paddingVertical: 20,
    borderRadius: 10,
    // borderWidth: 0.9,
    backgroundColor: 'white',
    // borderColor: Colors.color_light_gray,
    shadowColor: Colors.shadow_light,
    elevation: 10,
  },
  title: {
    color: Colors.color_black,
    fontFamily: Fonts.poppins600SemiBold,
    fontSize: 18,
    letterSpacing: 0.18,
  },
  subTitle: {
    color: Colors.color_black,
    fontFamily: Fonts.OpenSans400Regular,
  },
  isCheck: {
    position: 'absolute',
    right: -6,
    top: -15,
    width: 24,
    height: 24,
  },
  langImages: {
    position: 'absolute',
    right: -6,
    bottom: -15,
    width: 30,
    height: 30,
  },
});

export default Language;
