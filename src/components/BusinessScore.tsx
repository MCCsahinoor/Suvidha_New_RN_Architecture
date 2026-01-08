import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Text, Pressable } from "react-native";
import { Fonts } from '../themes';

const BusinessScore = ({ navigation, painterCcore }: any) => {
    const rainbowColors = [
        { bg: '#fee2e2', txt: '#a20000' },
        { bg: '#fdf0e3', txt: '#a35102' },
        { bg: '#fdfde1', txt: '#a2a201' },
        { bg: '#e3fee3', txt: '#01a201' },
        { bg: '#e2e2fd', txt: '#01019e' },
        { bg: '#f3e4fe', txt: '#59009b' },
        { bg: '#f6e2fe', txt: '#6b0097' },
    ];

    // Initialize animated values for border color
    const borderColorAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start the sliding rainbow color animation loop
        Animated.loop(
            Animated.timing(borderColorAnim, {
                toValue: rainbowColors.length,
                duration: 700,
                useNativeDriver: false,
            })
        ).start();
    }, [borderColorAnim]);

    // Interpolate the color animation for the border
    const borderColorInterpolation = borderColorAnim.interpolate({
        inputRange: rainbowColors.map((_, index) => index),
        outputRange: rainbowColors.map((_, index) => _.bg),
    });

    const txtColorInterpolation = borderColorAnim.interpolate({
        inputRange: rainbowColors.map((_, index) => index),
        outputRange: rainbowColors.map((_, index) => _.txt),
    });


    const slideAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        // Start the sliding border animation loop
        Animated.loop(
            Animated.sequence([
                Animated.timing(slideAnim, {
                    toValue: 80,
                    duration: 2000,
                    useNativeDriver: false,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, [slideAnim]);


    return (
        // position: 'absolute', right: -13, top: 6, 
        <View style={{ overflow: 'hidden', borderRadius: 25, marginTop: 5, marginRight: 10 }}>
            <Animated.View
                style={[
                    { transform: [{ rotate: '15deg' }] },
                    styles.animatedBorder,
                    { left: slideAnim },
                ]}
            />
            <Pressable onPress={() => navigation.navigate('ScoreDetails')}>
                <Animated.View
                    style={[
                        styles.animatedBox,
                        { backgroundColor: borderColorInterpolation },
                    ]}
                >
                    <Animated.Text style={[styles.scoreTx, { color: txtColorInterpolation, }]}>Score: {painterCcore}</Animated.Text>
                </Animated.View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    animatedBorder: {
        position: 'absolute',
        width: 3,
        height: 20,
        backgroundColor: '#FFF',
        opacity: 0.8,
        zIndex: 5,
    },
    animatedBox: {
        // borderWidth: 2,
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FFF',
        // paddingHorizontal: 10,
        paddingTop: 2,
        height: 18,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        paddingHorizontal: 10
    },
    scoreTx: {
        fontSize: 9,
        lineHeight: 15,
        fontFamily: Fonts.poppins600SemiBold,
        textTransform: 'uppercase',
        margin: 0,
        padding: 0,
    }
});

export default BusinessScore;
