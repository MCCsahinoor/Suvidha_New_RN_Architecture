// import React from 'react';
// import { Pressable, Text, View } from 'react-native';
// import { Colors, Fonts } from '../themes';
// import HeaderCurve from './HeaderCurve';
// import LinearGradient from 'react-native-linear-gradient';


// const CustomTabBar = ({ state, descriptors, navigation, position, headerCurveColor }: any) => {
//   return (
//     <>
//       {/* <View style={{ backgroundColor: Colors.ui_dark_bg, padding: 10, }}> */}
//       <View>
//         <LinearGradient colors={['#36686D', '#84A2A5']} useAngle={true} angle={90}>
//           <View style={{ padding: 10 }}>
//             <View style={{ width: '100%', flexDirection: 'row', backgroundColor: Colors.color_white, borderRadius: 100, paddingVertical: 5, paddingHorizontal: 5 }}>
//               {state.routes.map((route: { key: string | number; name: any; }, index: React.Key | null | undefined) => {
//                 const { options } = descriptors[route.key];
//                 const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

//             const isFocused = state.index === index;

//             const onPress = () => {
//               const event = navigation.emit({
//                 type: 'tabPress',
//                 target: route.key,
//               });

//               if (!isFocused && !event.defaultPrevented) {
//                 navigation.navigate(route.name);
//               }
//             };

//             const onLongPress = () => {
//               navigation.emit({
//                 type: 'tabLongPress',
//                 target: route.key,
//               });
//             };

//                 return (
//                   <Pressable
//                     key={index}
//                     accessibilityRole="button"
//                     accessibilityState={isFocused ? { selected: true } : {}}
//                     accessibilityLabel={options.tabBarAccessibilityLabel}
//                     testID={options.tabBarTestID}
//                     onPress={onPress}
//                     onLongPress={onLongPress}
//                     style={{
//                       flex: 1, alignItems: 'center', justifyContent: 'center',
//                       backgroundColor: isFocused ? Colors.ui_dark_bg : Colors.color_white,
//                       borderRadius: isFocused ? 100 : 100
//                     }}
//                   >
//                     <Text style={{
//                       fontSize: 13,
//                       color: isFocused ? Colors.color_white : 'black',
//                       paddingVertical: isFocused ? 5 : 0,
//                       borderRadius: isFocused ? 100 : 0,
//                       fontFamily: Fonts.OpenSans600SemiBold
//                     }}>{label}</Text>
//                   </Pressable>
//                 );
//               })}
//             </View>
//           </View>
//         </LinearGradient>
//       </View>
//       {/* </View> */}
//       <HeaderCurve topGaap={59} headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'} pageBackground={headerCurveColor} />
//     </>

//   );
// };


// export default CustomTabBar;


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../themes';
import HeaderCurve from './HeaderCurve';
import LinearGradient from 'react-native-linear-gradient';

interface CustomSwitchBoxProps {
  onPress: (value: string) => void;
  defaultTrue?: boolean;
  boxWidth?: number;
  boxheight?: number;
  fontSize?: number;
  elevation?: number;
  disabled?: boolean;
  options?: Array<{
    title: string;
    value: string;
  }>;
  selectedValue: string;
  bgColor?: string;
  selectedItemBgColor?: string;
  selectedItemTextColor?: string;
  otherItemTextColor?: string;
  headerCurveColor?: string;
  paddingHorizontal?: number;
}

const CustomTabBar: React.FC<CustomSwitchBoxProps> = ({
  onPress,
  defaultTrue = false,
  boxWidth,
  boxheight = 35,
  fontSize = 13,
  elevation = 4,
  disabled = false,
  options,
  selectedValue,
  bgColor = Colors.color_white + '30',
  selectedItemBgColor = Colors.color_white,
  selectedItemTextColor = Colors.color_white,
  otherItemTextColor = Colors.color_white,
  headerCurveColor,
  paddingHorizontal = 0
}) => {

  return (
    <>
      <LinearGradient colors={['#36686D', '#84A2A5']} useAngle={true} angle={90}>
        <View style={{paddingVertical: 5, paddingHorizontal: paddingHorizontal}}>
          <View
            style={{
              padding: 3,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: Colors.ui_light_bg,
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: elevation,
              width: '100%',
              backgroundColor: bgColor,
              borderRadius: 25,
              opacity: disabled ? 0.5 : 1,
            }}
          >
            {options &&
              options.map((option, index) => {
                const isSelected = selectedValue === option.value;
                return (
                  <View key={index} style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={
                        disabled
                          ? undefined
                          : () => {
                            onPress(option.value);
                          }
                      }
                      style={{
                        minHeight: boxheight,
                        backgroundColor: isSelected
                          ? selectedItemBgColor
                          : 'transparent',
                        paddingHorizontal: 8,
                        borderRadius: 22,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: isSelected ? '#000' : 'transparent',
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: isSelected ? 0.18 : 0,
                        shadowRadius: 1.5,
                        elevation: isSelected ? 2 : 0,
                      }}
                    >
                      <Text
                        style={{
                          color: isSelected
                            ? selectedItemTextColor
                            : otherItemTextColor,
                          textAlign: 'center',
                          fontSize: fontSize,
                          fontFamily: isSelected
                            ? Fonts.poppins600SemiBold
                            : Fonts.poppins500Medium,
                          lineHeight: 18,
                        }}
                      >
                        {option.title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        </View>
      </LinearGradient>

      <HeaderCurve topGaap={59} headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'} pageBackground={headerCurveColor ? headerCurveColor: '#F2F2F2'} />
    </>
  );
};

export default CustomTabBar;