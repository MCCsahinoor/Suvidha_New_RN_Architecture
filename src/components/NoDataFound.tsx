import React, {memo} from 'react';
import {View, Image, StyleSheet, Pressable, Text} from 'react-native';
import {Colors, Fonts} from '../themes';

const NoDataFound = ({content}: any) => {
  return (
    <View style={{...styles.noDataCard}}>
      <Image
        source={require('../assets/images/empty.png')}
        style={{...styles.noImage}}
      />
      <Text style={{...styles.noImageContent}}>
        {content ? content : 'No Data Found'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noImage: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  noImageContent: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: Fonts.poppins500Medium,
    color: Colors.ui_dark_bg,
  },
  noDataCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(NoDataFound);
