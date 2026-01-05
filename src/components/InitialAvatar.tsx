/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

import React, { memo, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import {
  generatePlaceholderName,
  generateRandomColorNumber,
  getContrastTextColor,
} from '../utils/generate';
import { AppImages, Colors, Fonts } from '../themes';

const InitialAvatar = ({ name, profilePic, size, fontSize }: any) => {
  const userPlaceholder = generatePlaceholderName(name);
  const placeholderBackground = generateRandomColorNumber(name);
  const textColor = getContrastTextColor(placeholderBackground);

  // const url = {uri: profilePic};

  const [error, setError] = useState(false);
  const [profileImage, setProfileImage] = useState(profilePic);
  useEffect(() => {
    setProfileImage(profilePic);
    setError(false);
  }, [profilePic]);

  return (
    <>
      {!profileImage ? (
        <View
          style={[
            styles.initialAvatar,
            { backgroundColor: placeholderBackground, height: size, width: size },
          ]}>
          <Text
            style={{
              color: textColor,
              fontFamily: Fonts.OpenSans600SemiBold,
              // fontWeight: 'bold',
              fontSize: fontSize,
              textTransform: 'uppercase',
            }}>
            {userPlaceholder}
          </Text>
        </View>
      ) : (
        <>
          {error ? (
            <ImageBackground
              resizeMode="cover"
              imageStyle={{ borderRadius: 100 }}
              source={{ uri: AppImages.NoImagesAvailable }}
              style={{ height: size, width: size }}></ImageBackground>
          ) : (
            <ImageBackground
              resizeMode="cover"
              source={{ uri: profileImage }}
              imageStyle={{ borderRadius: 100 }}
              style={{ height: size, width: size }}
              onError={() => setError(true)}
            />
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  initialAvatar: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.color_white,
    borderWidth: 1,
    shadowColor: Colors.shadow_light,
    elevation: 5,
    fontFamily: Fonts.PollerOneRegular
  },
});

export default memo(InitialAvatar);
