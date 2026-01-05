import React, { FC, memo, useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, Image, Modal } from "react-native";
import { AppImages, Colors, Fonts } from "../themes"; 
import LottieView from "lottie-react-native";
import CustomToastUI from "./CustomToastUI";
// import alertIcon from '../assets/lotty/alert.json';
// import doacumentIcon from '../assets/lotty/document.json';
import RenderHtml from 'react-native-render-html';
import ButtonLarge from "./ButtonLarge";
const icons = {
    alert: AppImages.LottyAlert,
    document: AppImages.LottyDocument
};
export interface I_AlertInfo {
    skipNow: Function;
    confirmAction: Function;
    allowSkip: Boolean;
    headerText: string;
    confirmActionButtonText: string;
    subHeaderText?: string;
    skipButtonText?: string;
    isAPICall?: any;
    bothSolidButton?: any;
    iconName?: string | "alert";
    htmlMessage?: boolean;
    hideModal?: Function;
    modalVisible?: boolean;
    showInfoIcon?: boolean;
}
//Dynamic  icon view
const getIcon = (iconName?: string) => {
    return icons[iconName as keyof typeof icons] || icons.alert;
};
const AlertInfo: FC<I_AlertInfo> = ({ modalVisible, skipNow, confirmAction, allowSkip, headerText, subHeaderText, confirmActionButtonText, skipButtonText, isAPICall, bothSolidButton, iconName, hideModal, htmlMessage }) => {
    const iconSource = getIcon(iconName);
    return (

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <Pressable onPress={() => hideModal?.()}>
                <View style={styles.centeredView} >
                    <View style={styles.modalView}>
                        <View style={{ alignItems: 'center', marginTop: -30, marginBottom: 0, }}>
                            <LottieView
                                // source={iconSource}
                                source={{ uri: iconSource }}
                                style={{ width: 100, height: 70, transform: 'scale(1.4)' }}
                                autoPlay
                                loop
                            />
                        </View>

                        {headerText !== "" && ( 
                            <Text style={styles.modalText}>{headerText}</Text>
                        )}
                        {subHeaderText && (
                            htmlMessage ? (
                                <RenderHtml contentWidth={50} source={{ html: subHeaderText }} />
                            ) : (
                                <Text style={styles.modalSubText}> {subHeaderText} </Text>
                            )
                        )}
                        <View style={styles.fixedButton}>
                            {allowSkip && (
                                <View style={{ width: '45%' }}>
                                    <ButtonLarge
                                        title={skipButtonText ? skipButtonText : 'Skip for now'}
                                        onPress={() => skipNow()}
                                        fillBtn={bothSolidButton ? bothSolidButton : false}
                                        key={'skip'}
                                        showIcon={false}
                                        iconName=""
                                        paddingVertical={3}
                                        paddingHorizontal={5}
                                        fontSize={13}
                                        iconSize={19}
                                        disabled={isAPICall}
                                    />
                                </View>
                            )}
                            <View style={{ width: allowSkip ? '45%' : '100%' }}>
                                <ButtonLarge
                                    title={confirmActionButtonText}
                                    onPress={() => confirmAction()}
                                    fillBtn={true}
                                    key={confirmActionButtonText}
                                    showIcon={false}
                                    iconName=""
                                    paddingVertical={3}
                                    paddingHorizontal={5}
                                    fontSize={13}
                                    iconSize={19}
                                    isAPICall={isAPICall}
                                    disabled={isAPICall}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
            <CustomToastUI />
        </Modal >
    )

}

export default memo(AlertInfo);

const styles = StyleSheet.create({
    profileInfo: {
        padding: 10,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalView: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
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
        backgroundColor: Colors.color_white,
        paddingHorizontal: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
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