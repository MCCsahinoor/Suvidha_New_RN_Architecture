import React from 'react'
import { AppImages, Colors, Fonts } from '../../themes';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import * as utils from '../../utils';
const PainterRegistrationProgress = () => {
    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={{ height: utils.Scale.screenHeight, ...stylesIn.centerContent }}>
                {/* <LottieView source={{ uri: AppImages.LottyNoNet }} style={{width: 200, height: 200, transform: 'scale(1.5)'}} autoPlay loop />  */}
                {/* <LottieView source={require('../../assets/lotty/registration-progress.json')} style={{ width: 150, height: 150, transform: 'scale(3)' }} autoPlay loop /> */}
                <LottieView
                    source={{ uri: AppImages.LottySandClock }}
                    style={{ width: 150, height: 150, transform: 'scale(1.5)', marginBottom: 40 }}
                    autoPlay
                />
                <Text style={{ ...stylesIn.mainHeading }}>Registration is under progress</Text>
                <Text style={{ ...stylesIn.subHeading }}>Please check after some time.</Text>
                {/* <Text style={{...stylesIn.subHeading}}>Please check your connection</Text> */}
            </View>
        </ScrollView>
    )
}

export default PainterRegistrationProgress

const stylesIn = StyleSheet.create({
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainHeading: {
        fontSize: 20,
        fontFamily: Fonts.OpenSans600SemiBold,
        color: Colors.ui_dark_bg,
        marginBottom: 10
    },
    subHeading: {
        fontSize: 13,
        fontFamily: Fonts.OpenSans500Medium,
        color: Colors.color_gray,
    }
});
