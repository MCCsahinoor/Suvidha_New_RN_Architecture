import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import { Colors, Fonts } from '../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface I_ACCEPT_RATING {
  starRating: number;
  stroke: string;
  fill: string;
  starLabel: boolean;
  startSize: number
}

const StarRating = ({ starRating, stroke, fill, starLabel, startSize }: I_ACCEPT_RATING) => {

  const wholeStars = Math.floor(starRating);
  const hasHalfStar = starRating % 1 !== 0;
  const totalStars = 5

  return (
    <>
      <View style={styles.container}>
        <View style={styles.stars}> 
          {[...Array(totalStars)].map((star, index) => {
            const starValue = index + 1;
            if (starValue <= wholeStars) {
              return (
                <View key={index}>
                  <Ionicons
                    key={index}
                    style={{ color: fill, ...styles.ratingNumber }}
                    name={'star'}
                    size={startSize}
                  />
                </View>
              );
            } else if (hasHalfStar && starValue === wholeStars + 1) {
              return (
                <Ionicons
                  key={index}
                  style={{ color: fill, ...styles.ratingNumber }}
                  name={'star-half-outline'}
                  size={startSize}
                />
              );
            } else {
              return (
                <Ionicons
                  key={index}
                  style={{ color: stroke, ...styles.ratingNumber, marginRight: 0 }}
                  name={'star-outline'}
                  size={startSize}
                />
              );
            }
          })}
        </View>
        {starLabel && (
          <View style={styles.rating}>
            <Text style={{ ...styles.CstRating, color: Colors.color_white, marginTop: -1.9 }}> |  </Text>
            {/* <Ionicons style={{ color: Colors.color_white, ...styles.ratingNumber, margin: 0, marginTop: -5 }} name={'star'} /> */}
            <Text style={{ fontSize: 13, color: Colors.color_white, ...styles.CstRating }}> {starRating} </Text>
          </View>
        )} 
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  rating: {
    marginLeft: 5,
    color: Colors.color_white,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -1
  },
  CstRating: {
    marginTop: 0,
    fontFamily: Fonts.poppins600SemiBold,
  },
  ratingNumber: {
    fontSize: 14,
    marginRight: 1
  }
});

export default StarRating;