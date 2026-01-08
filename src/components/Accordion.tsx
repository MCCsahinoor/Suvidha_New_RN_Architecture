/* eslint-disable prettier/prettier */

import React, { useEffect, useState, memo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"; 
import LockIcon from "../assets/svg/LockIcon.svg";
import UnlockIcon from "../assets/svg/UnlockIcon.svg";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Colors, Fonts } from "../themes";
import Ionicons from "react-native-vector-icons/Ionicons"; 
import RightArrowIcon from "../assets/svg/rightArrow";

const Accordion = (props: any) => {
  const { children } = props;
  const shareValue = useSharedValue(0);
  const [bodySectionHeight, setBodySectionHeight] = useState(0);
  const [isLock, setIsLock] = useState(false);
  const [getShowLockIcon, setShowLockIcon] = useState(false);
  
  // Ensure isDisable is a boolean, not a number
  const isDisable = props.isDisable === true || props.isDisable === 1;

  const bodyHeight = useAnimatedStyle(() => ({
    height: interpolate(shareValue.value, [0, 1], [0, bodySectionHeight]),
  }));

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(shareValue.value, [0, 1], [0, -90])}deg`,
        },
      ],
    };
  });

  const toggleButton = () => {
    if (shareValue.value === 0) {
      shareValue.value = withTiming(1, {
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
    } else {
      shareValue.value = withTiming(0, {
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
    }
  };

  const showToastMsg = (title: string) => { 
    console.log(title)
  };

  useEffect(() => {
    // Ensure isLock is a boolean, not a number
    setIsLock(props.isLock === true || props.isLock === 1);
  }, [props.isLock]);

  useEffect(() => {
    setShowLockIcon(props.showLockIcon);
  }, [props.showLockIcon]);

  return (
    <View style={styles.subContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btnStyle}
        onPress={toggleButton} disabled={isLock || isDisable}>
        <View style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
        }}>
          {props.icon != null && typeof props.icon === 'object' && props.icon.icon && typeof props.icon.icon === 'string' && (
            <Ionicons
              name={props.icon.icon}
              size={typeof props.icon.iconSize === 'number' ? props.icon.iconSize : 20}
              style={{ color: '#000', marginRight: 10 }}
            />
          )}
          <Text style={{ ...styles.title }}>{props.title != null ? String(props.title) : ''}</Text>
        </View>
        {props.isLock !== null && props.isLock !== undefined ? (
          <View style={styles.iconWrapper}>
            {/* {getShowLockIcon == true && (
              <>
                {!isLock ? (
                  <>
                    <Ionicons
                      name="information-circle-outline"
                      size={18} onPress={() => showToastMsg(props.title)}
                    />
                    <LockIcon style={styles.svgStyle} />
                  </>
                ) : (
                  <UnlockIcon style={styles.svgStyle} />
                )}
              </>
            )} */}
            {!props.isDisable && (
              <Animated.View style={iconStyle}>
                <RightArrowIcon width={17} height={17} />
              </Animated.View>
            )}
          </View>
        ) : ( 
            <Animated.View style={iconStyle}>
              <RightArrowIcon width={17} height={17} />
            </Animated.View> 
        )}
      </TouchableOpacity>

      <Animated.View style={[styles.descStyle, bodyHeight]}>
        <View
          style={styles.bodyContainer}
          onLayout={(event) => {
            setBodySectionHeight(event.nativeEvent.layout.height);
          }}
        >
          {children != null ? children : null}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  btnStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  subContainer: {
    // backgroundColor: 'white',
    paddingHorizontal: 8,
    marginBottom: 6,
    flex: 1,
    borderColor: Colors.color_light_gray,
    borderBottomWidth: 1,
  },
  svgStyle: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  descStyle: {
    overflow: "hidden",
  },
  title: {
    color: Colors.color_black,
    fontSize: 13,
    fontFamily: Fonts.poppins600SemiBold,
  },
  bodyContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingBottom: 20,
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default memo(Accordion);
