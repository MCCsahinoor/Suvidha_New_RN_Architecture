import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Colors, Fonts } from '../themes';
import HeaderCurve from './HeaderCurve';


const CustomLineTabBar = ({ state, descriptors, navigation, position, headerCurveColor }: any) => {
    return (
        <>
            <View style={{ paddingHorizontal: 0 }}>
                <View style={{ width: '100%', flexDirection: 'row', backgroundColor: Colors.color_white, paddingTop: 5 }}>
                    {state.routes.map((route: { key: string | number; name: any; }, index: React.Key | null | undefined) => {
                        const { options } = descriptors[route.key];
                        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        return (
                            <Pressable
                                key={index}
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{
                                    flex: 1, alignItems: 'center', justifyContent: 'center',
                                    borderBottomColor: isFocused ? Colors.ui_dark_bg : Colors.color_white,
                                    borderBottomWidth: 2,
                                    paddingVertical: 5
                                }} >
                                <Text style={{
                                    fontSize: 13,
                                    color: isFocused ? Colors.ui_dark_bg : 'black',
                                    paddingVertical: isFocused ? 5 : 0,
                                    borderRadius: isFocused ? 100 : 0,
                                    fontFamily: isFocused ? Fonts.OpenSans700Bold : Fonts.OpenSans500Medium
                                }}>{label}</Text>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
        </>

    );
};


export default CustomLineTabBar;