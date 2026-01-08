import React, { FC, memo } from "react";
import { Pressable, Text, View, StyleSheet, Image, Modal } from "react-native";
import { AppImages, Colors, Fonts } from "../themes";
import ButtonLarge from "./ButtonLarge"; 
import LottieView from "lottie-react-native";
import CustomToastUI from "./CustomToastUI";

export interface I_AlertInfo {
    skipNow: Function;
    confirmAction: Function;
    allowSkip: Boolean;
    headerText: string;
    confirmActionButtonText: string;
    subHeaderText?: string;
    skipButtonText?: string;
    isAPICall?: any;
}

const RewardAlertInfo: FC<I_AlertInfo> = ({ skipNow, confirmAction, allowSkip, headerText, subHeaderText, confirmActionButtonText, skipButtonText, isAPICall }) => {
    return (
        <Modal animationType="slide" transparent={true}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ alignItems: 'center', marginTop: -50, marginBottom: 0, }}>
                        <LottieView
                            // source={{ uri: AppImages.LottyLWReward }}
                            source={require('../assets/lotty/travel_four.json')}
                            style={{ width: 100, height: 70, transform: 'scale(2)' }}
                            autoPlay
                            loop
                        />
                    </View>
                    {subHeaderText && (
                        <Text style={{ ...styles.modalSubText, marginTop: 30 }}> {subHeaderText} </Text>
                    )}
                    <Text style={{ ...styles.modalText, marginTop: subHeaderText ? 10 : 40 }}>{headerText}</Text>

                    <View style={styles.fixedButton}>
                        {allowSkip && (
                            <View style={{ width: '45%' }}>
                                <ButtonLarge
                                    title={skipButtonText ? skipButtonText : 'Skip for now'}
                                    onPress={() => skipNow()}
                                    fillBtn={false}
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
            <CustomToastUI /> 
        </Modal>

    )

}

export default memo(RewardAlertInfo);

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
        color: Colors.ui_light_bg,
        fontFamily: Fonts.poppins600SemiBold,
        fontSize: 18,
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
        color: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins600SemiBold,
        fontSize: 16,
        textAlign: 'center'
    }
})