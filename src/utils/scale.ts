/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */

import {
  Dimensions,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native'; 
const {width, height} = Dimensions.get('window');

const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

/**
 * Guideline sizes are based on the designs for iPhone X screen mobile device
 * iPhone X Resolution: 375 x 812 dp.
 */
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const X_WIDTH = 812;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 896;
const XSMAX_HEIGHT = 896;
const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV
    ? width >= X_WIDTH ||
      height >= X_HEIGHT ||
      width >= XSMAX_WIDTH ||
      height >= XSMAX_HEIGHT
    : false;

const statusBarHeight = Platform.select({
  ios: isIPhoneX() ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0,
});

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const lowerDevice = () => {
  if (height < 737 || width < 366) {
    return true;
  }
  return false;
};

export {
  horizontalScale,
  verticalScale,
  moderateScale,
  lowerDevice,
  isIPhoneX,
  statusBarHeight,
  screenHeight,
  screenWidth,
};

// check windown orientation wise width and height
export const getWindowDimensions = () => {
  const {width, height} = useWindowDimensions();
  return {width, height};
};

// check windown orientation
export const isPortrait = () => {
  const {height, width} = getWindowDimensions();
  return height > width;
};
