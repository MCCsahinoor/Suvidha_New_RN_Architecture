import React, { FC, memo } from "react";
import { Pressable, Text, View, StyleSheet, Modal } from "react-native";
import { Colors, Fonts, AppImages } from "../themes";
import ButtonLarge from "./ButtonLarge";
import LottieView from "lottie-react-native";
import CustomToastUI from "./CustomToastUI";

type ResultType = 'success' | 'error' | 'info';

interface ResultAlertProps {
    modalVisible?: boolean;
    hideModal?: () => void;
    skipNow?: () => void;
    confirmAction: () => void;
    allowSkip?: boolean;
    headerText: string;
    subHeaderText?: string;
    confirmActionButtonText: string;
    skipButtonText?: string;
    isAPICall?: boolean;
    resultType?: ResultType;
}

const SUCCESS_JSON = AppImages.LottySuccessAnimation;
const ERROR_JSON = AppImages.LottyRejected;
const INFO_JSON = 'https://lottie.host/3b9b3b6b-4d9a-4b2b-8a2e-1f3f3e7f9c1a/info.json';

const ResultAlert: FC<ResultAlertProps> = ({
    modalVisible,
    hideModal,
    skipNow,
    confirmAction,
    allowSkip = false,
    headerText,
    subHeaderText,
    confirmActionButtonText,
    skipButtonText,
    isAPICall,
    resultType = 'info',
}) => {
    const lottieSrc =
        resultType === 'success' ? SUCCESS_JSON :
            resultType === 'error' ? ERROR_JSON : INFO_JSON;

    return (
        <Modal animationType="slide" transparent={true} visible={!!modalVisible}>
            <Pressable onPress={() => hideModal?.()}>
                <View style={styles.centeredView} >
                    <View style={styles.modalView}>
                        <View style={{ alignItems: 'center', marginTop: -30, marginBottom: 0 }}>
                            <LottieView
                                source={{ uri: lottieSrc }}
                                style={{ width: 100, height: 70, transform: [{ scale: 1.4 }] as any }}
                                autoPlay
                                loop={false}
                            />
                        </View>

                        {headerText !== "" && (
                            <Text style={styles.modalText}>{headerText}</Text>
                        )}
                        {subHeaderText && (
                            <Text style={styles.modalSubText}> {subHeaderText} </Text>
                        )}
                        <View style={styles.fixedButton}>
                            {allowSkip && (
                                <View style={{ width: '45%' }}>
                                    <ButtonLarge
                                        title={skipButtonText ? skipButtonText : 'Skip for now'}
                                        onPress={() => skipNow?.()}
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
            </Pressable>
            <CustomToastUI />
        </Modal >
    );
};

export default memo(ResultAlert);

const styles = StyleSheet.create({
    modalView: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
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
});


