/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

import React, { FC, memo, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { Colors, Fonts } from '../themes'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import InitialAvatar from './InitialAvatar';
import StarRating from './RatingShow';

export interface I_Profile {
  fontColor: string;
  showRating: boolean;
  showVerify: boolean;
  name: string;
  number?: number;
  profileImage: string;
  respresentiveShow?: any
}

const ProfileCard: FC<I_Profile> = ({ fontColor, showRating, showVerify, name, number, profileImage, respresentiveShow }) => {

  const userProfileData = useSelector((state: any) => state.userProfileData);
  const virtualuserProfileData = useSelector((state: any) => state.virtualUser);
  const [csat, setCsat] = useState(0);
  const [virtualuserProfileName, setVirtualuserProfileName] = useState('');
  const [getProfileImageReviewed, setProfileImageReviewed] = useState('');

  useEffect(() => {
    if (userProfileData && userProfileData.length > 0) {
      setCsat(userProfileData[0]['csat_rating']);
    }
  }, [userProfileData]);

  useEffect(() => {
    if (virtualuserProfileData) {
      setVirtualuserProfileName(virtualuserProfileData['virtual_user_first_name']);
    }
  }, [virtualuserProfileData]);

  //// PROFILE IMAGE Reviewed SET ////
  useEffect(() => {
    if (userProfileData && userProfileData.length > 0) {
      setProfileImageReviewed(userProfileData[0].reviewed_yn);
    }
  }, [userProfileData]);

  return (
    <>
      <View style={{ width: '100%' }}>
        <View style={styles.headerContainerUser}>
          <View style={{ marginRight: showVerify ? 15 : 10, marginTop: showVerify ? 10 : 0, ...styles.gridItem }}>
            <View>
              {showVerify && (
                <>
                  {getProfileImageReviewed && (
                    <View style={{ ...styles.underReview, backgroundColor: getProfileImageReviewed == 'Y' ? Colors.color_glow_green : '#D9D9D9' }}>
                      <Ionicons name={'checkmark-done-outline'} size={15} color={getProfileImageReviewed == 'Y' ? 'white' : Colors.color_dark_gray} />
                    </View>
                  )}
                </>
              )}
              <InitialAvatar name={name} profilePic={profileImage} size={55} fontSize={17}></InitialAvatar>
            </View>
          </View>
          <View style={{ width: '75%', marginRight: 1, ...styles.gridItem }}>
            <Text style={{ ...styles.userName, color: fontColor }} numberOfLines={1}>
              {name}
            </Text>
            <View style={{ ...styles.userContactDetails }}>
              <Ionicons color={fontColor} name="call" size={16} />
              <Text style={{ ...styles.userContactNumbers, color: fontColor }}>
                {number}
              </Text>
            </View>
            {showRating && (<StarRating startSize={15} starRating={csat} stroke={'#fff'} fill={'#FFE606'} starLabel={false} />)}

            {virtualuserProfileData && respresentiveShow && (
              <View style={{ ...styles.loginAsContainer }}>
                <Text style={{ ...styles.loginAs }} numberOfLines={1}>Login as: <Text style={{ color: '#D3E4EA', fontFamily: Fonts.OpenSans500Medium }}>{virtualuserProfileName}</Text></Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainerUser: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  gridItem: {
    margin: 0,
  },
  userName: {
    color: Colors.color_white,
    fontSize: 17,
    fontFamily: Fonts.OpenSans600SemiBold,
    textTransform: 'capitalize',
    alignItems: 'center',
  },
  userContactDetails: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 3,
  },
  userContactNumbers: {
    color: Colors.color_white,
    marginLeft: 5,
    fontFamily: Fonts.OpenSans600SemiBold,
  },
  underReview: {
    backgroundColor: '#D9D9D9',
    width: 23,
    height: 23,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'absolute',
    right: -5,
    top: -5,
    borderWidth: 2,
    borderColor: 'white',
  },
  loginAs: {
    color: Colors.color_white,
    fontSize: 11,
    fontFamily: Fonts.OpenSans700Bold,
  },
  loginAsContainer: {
    marginTop: 10,
    borderTopColor: '#9DB2B9',
    borderTopWidth: 1,
    paddingTop: 5
  }
});

export default memo(ProfileCard);
