import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Colors } from '../themes';

export interface curve_controller { 
topGaap: number,
  pageBackground: string,
  headerBackground: string
  headerBackgroundTwo?: string
}

const HeaderCurve = ({ topGaap, pageBackground, headerBackground, headerBackgroundTwo }: curve_controller) => {
  return (
    <> 
      <View style={{backgroundColor: pageBackground, ...styles.curveContainer}}>
        <View style={{backgroundColor: headerBackground, ...styles.leftCurve}}>
          <View style={{backgroundColor: pageBackground, ...styles.leftInnerRadius}}></View>
        </View>
        <View style={{ backgroundColor: headerBackgroundTwo ?? headerBackground, ...styles.rightCurve }}>
          <View style={{backgroundColor: pageBackground, ...styles.rightInnerRadius}}></View>
        </View>
      </View>

      {/* <View style={{top: topGaap, backgroundColor: headerBackground, ...styles.leftCurve}}>
          <View style={{backgroundColor: pageBackground, ...styles.leftInnerRadius}}></View>
      </View>
      <View style={{top: topGaap, backgroundColor: headerBackground, ...styles.rightCurve}}>
        <View style={{backgroundColor: pageBackground, ...styles.rightInnerRadius}}></View>
      </View> */}
    </>
  );
};

 

const styles = StyleSheet.create({
  curveContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',  
    // position: 'relative',
    // width: '100%',
    // zIndex: 1 
  },
  leftCurve: { 
    width: 24,
    height: 24,
    borderBottomRightRadius: 100, 
    // position: 'absolute',
    // left: 0,
    // zIndex: 1
  },
  rightCurve: { 
    width: 24,
    height: 24,
    borderBottomLeftRadius: 100, 
    // position: 'absolute',
    // right: 0,
    // zIndex: 1
  },
  leftInnerRadius: { 
    width: 24,
    height: 24,
    position: 'absolute',
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50, 
  }, 
    rightInnerRadius: { 
    width: 24,
    height: 24,
    position: 'absolute',
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50
  }
});

export default HeaderCurve;