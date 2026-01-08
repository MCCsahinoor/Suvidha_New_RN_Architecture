import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { AppImages, Colors, Fonts } from '../../themes';
import { useDispatch, useSelector } from 'react-redux';
import { setPullToRefresh } from '../../store/features/menu/pullToRefresh';
import * as utils from '../../utils';
import LottieView from 'lottie-react-native';
import ButtonLarge from '../../components/ButtonLarge';
import { I_TokenScan } from '../../Interfaces/ScanToken.interface';
import { setApiCallLoader } from '../../store/features/apiCallLoader/apiCallLoader';
import { AddMeetAttendance } from '../../services/AddMeetAttendance/meetAttendance.service';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
// import Sound from 'react-native-sound';
import { CommonToastModel } from '../../utils/ToastMessageModel';
import SoundPlayer from 'react-native-sound-player';
const MeetAttandenceSuccess = ({ route, navigation }: any) => {
    const responseData = route.params.details;
    const dispatch = useDispatch();
    const isAPICall = useSelector((state: any) => state.apiCallLoader);
    const [updateModalFlag, setupdateModalFlag] = useState(false);
    const { t } = useTranslation();

    const goToBack = (): void => {
        dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: true }));
        navigation.replace('Home')

    };

    // const clickSound: any = new Sound(require('../../assets/sounds/success.mp3'), Sound.MAIN_BUNDLE, (error: any) => {
    //     if (error) {
    //         console.log("Failded to load the sound", error);
    //         return;
    //     }
    // });


    const makeSoundEffect = () => {
        // clickSound.play((success: any) => {
        //     console.log("success", success)
        //     if (success) {
        //         console.log('successfully finished playing');
        //     } else {
        //         console.log('playback failed due to audio decoding errors');
        //     }
        // })
        playSong();
        getInfo();
    };
    const playSong = () => {
        try {
            SoundPlayer.playAsset(require('../../assets/sounds/success.mp3'))
        } catch (e) {
            console.log('Cannot play the file');
        }
    };
    const getInfo = async () => {
        try {
            const info = await SoundPlayer.getInfo();
        } catch (e) {
        }
    };

    useEffect(() => {
        if ((responseData ?? '') != '') {
            if (updateModalFlag == false) {
                setupdateModalFlag(true)
                MarkAttendance(responseData)
            }
        }
    }, [responseData])

    const MarkAttendance = (AttendanceData: any) => {
        dispatch(setApiCallLoader(true));
        AddMeetAttendance<I_TokenScan.I_SEND_FOR_SCAN_ATTENDANCE_RESPONSE, I_TokenScan.I_GET_FOR_SCAN_ATTENDANCE_RESPONSE>(JSON.parse(AttendanceData)).then((response) => {
            if (response.response_code == 1) {
                dispatch(setApiCallLoader(false));
                setTimeout(() => makeSoundEffect(), 1000);
                CommonToastModel('success', response.response_message, 5000);
            } else {
                dispatch(setApiCallLoader(false));
                dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: true }));
                navigation.replace('Home')
                CommonToastModel('error', response.response_message, 5000);
            }
        }).catch((err) => {
            dispatch(setApiCallLoader(false));
            dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: true }));
            navigation.replace('Home')
            CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
        });
    }

    return (
        <>
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ height: (utils.Scale.getWindowDimensions().height - 70), ...styles.container }}>
                    {isAPICall ? (
                        <>
                            <LottieView
                                source={{ uri: AppImages.LottyLoader }}
                                style={{ width: 150, height: 150, transform: 'scale(2)' }}
                                autoPlay
                                loop />
                            <Text style={{ ...styles.congratulationsHeader, fontSize: 22 }}>{t("PleaseWait")}</Text>
                        </>
                    ) : (
                        <>
                            <LottieView
                                source={{ uri: AppImages.LottyAnimationSuccess }}
                                style={{ width: 200, height: 200, transform: 'scale(2)' }}
                                autoPlay
                                loop />
                            <Text style={{ ...styles.congratulationsHeader }}>{t("Congratulations")}</Text><Text style={{ ...styles.congratulationsSubHeader }}>{t("YourAttendanceHasAddedSuccessfully")}</Text>
                        </>
                    )}

                </View>
            </ScrollView>
            {!isAPICall &&
                <View style={{ paddingHorizontal: 15, backgroundColor: Colors.color_white }}>
                    <ButtonLarge
                        title={t("Backtohome")}
                        onPress={goToBack}
                        fillBtn={true}
                        key={'Back to home'}
                        showIcon={false}
                        iconName=""
                        paddingVertical={10}
                        paddingHorizontal={10}
                        fontSize={19}
                        iconSize={19}
                    />
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 5,
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    congratulationsHeader: {
        color: '#00C22F',
        fontSize: 26,
        fontFamily: Fonts.OpenSans600SemiBold
    },
    congratulationsSubHeader: {
        color: Colors.color_black,
        fontSize: 16,
        fontFamily: Fonts.OpenSans600SemiBold,
        marginTop: 10,
    },
    congratulationsAlert: {
        color: Colors.color_dark_gray,
        fontSize: 14,
        fontFamily: Fonts.OpenSans600SemiBold,
        textAlign: 'center'
    },
    backgroundText: {
        backgroundColor: '#EDEDED',
        padding: 10,
        width: 200,
        textAlign: 'center',
        borderRadius: 100,
        marginTop: 30
    }
});


export default MeetAttandenceSuccess
