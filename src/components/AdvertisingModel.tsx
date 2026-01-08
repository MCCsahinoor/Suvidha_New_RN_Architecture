import React, { FC, memo, useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, Image, Modal, ActivityIndicator } from "react-native";
import { AppImages, Colors, Fonts } from "../themes";
import ButtonLarge from "./ButtonLarge"; 
import LottieView from "lottie-react-native";
import CustomToastUI from "./CustomToastUI";
// import alertIcon from '../assets/lotty/alert.json';
// import doacumentIcon from '../assets/lotty/document.json';
import RenderHtml from 'react-native-render-html';
import Ionicons from "react-native-vector-icons/Ionicons";

const icons = {
    alert: AppImages.LottyAlert,
    document: AppImages.LottyDocument
};
export interface I_AdvertisingModel {
    skipNow: Function;
    confirmAction: Function;
    allowSkip: Boolean;
    confirmActionButtonText: string;
    subHeaderText: string;
    skipButtonText?: string;
    isAPICall?: any;
    bothSolidButton?: any;
    iconName?: string | "alert";
    htmlMessage?: boolean;
    hideModal?: Function;
    modalVisible?: boolean;
}
//Dynamic  icon view
const getIcon = (iconName?: string) => {
    return icons[iconName as keyof typeof icons] || icons.alert;
};
const AdvertisingModel: FC<I_AdvertisingModel> = ({ modalVisible, skipNow, confirmAction, allowSkip, subHeaderText, confirmActionButtonText, skipButtonText, isAPICall, bothSolidButton, iconName, hideModal, htmlMessage }) => {
    const iconSource = getIcon(iconName);
    return (

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <Pressable >
                <View style={styles.centeredView} >
                    <View style={styles.modalView}>
                        <View style={styles.modalViewContent}>
                            <Image
                                source={{ uri: subHeaderText }}
                                style={{
                                    width: '100%',
                                    height: 400,
                                    resizeMode: 'contain'
                                }}
                                onLoadStart={() => (
                                    <ActivityIndicator
                                        size="large"
                                        color={Colors.color_white}
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            right: 0,
                                            top: 0,
                                            bottom: 0,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    />
                                )}
                            />

                            <View style={styles.fixedButton}>
                                {allowSkip && (
                                    <Ionicons
                                        onPress={() => hideModal?.()}
                                        name={'close-circle-outline'}
                                        size={30}
                                        style={{ color: '#fff', marginRight: 10, backgroundColor: '#000', borderRadius: 100 }}
                                    />
                                )}

                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
            <CustomToastUI />
        </Modal >
    )

}

export default AdvertisingModel;

const styles = StyleSheet.create({
    profileInfo: {
        padding: 10,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalView: {
        position: 'absolute',
        top: '0%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%',
    },
    modalViewContent: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: 15,
    },
    modalText: {
        marginBottom: 0,
        marginTop: 5,
        color: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins500Medium,
        fontSize: 16,
        textAlign: 'center',
    },
    fixedButton: {
        position: 'absolute',
        top: 5,
        right: 0,
    },

    centeredView: {
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        height: '100%',
        marginTop: 'auto',
    },
    modalSubText: {
        color: Colors.color_semi_dark_gray,
        fontFamily: Fonts.poppins600SemiBold,
        fontSize: 11,
        textAlign: 'center'
    }
})