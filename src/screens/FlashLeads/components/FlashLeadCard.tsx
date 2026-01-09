import React, { FC, useState, useEffect } from 'react';
import { Button, Pressable, ScrollView, Text, View } from 'react-native';
import { ddmmyyyConverter } from '../../../utils/formatDate';
import Card from '../../../components/Card';
import Timer from '../../../components/Timer'; 
// import Calendar from '../../../assets/svg/calendarTwo.svg'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import styles from '../style/FlashLeadStyle';
import ButtonLarge from '../../../components/ButtonLarge';
// import LinearGradient from 'react-native-linear-gradient';
import { AppImages, Fonts } from '../../../themes'; 
// import { ProgressBar } from 'react-native-paper';
// import CallColorIco from '../../../assets/svg/callColorIco.svg';
import { useTranslation } from 'react-i18next';
import { ILead } from '../interface/item.interface';
import { MakeCall, UpdateAcceptanceLeadDetails } from '../../../services/LeadsInfo/leadsInfo.service'; 
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/app/store';
import { fetchLeadsPending } from '../../../store/features/PendingLeads/PendingLeadsStore';
// import { I_LEADS_INFO } from '../../../Interfaces/leadsInfo.interface';
import AlertInfo from '../../../components/alertInfo';
import i18n from '../../../i18n';
import LottieView from 'lottie-react-native';
import { CommonToastModel } from '../../../utils/ToastMessageModel';
import LeadsUsersIcon from '../../../assets/svg/leadsUsers';
import ClockIcon from '../../../assets/svg/clock';
import LocationTwoIcon from '../../../assets/svg/locationTwo';
export interface I_FlashLeadCard {
    item: ILead;
    timer: string;
    onTimerEnd: (lead_guid: string) => void;
}
const FlashLeadCard: FC<I_FlashLeadCard> = ({ item, timer, onTimerEnd }) => {
    const dispatch: AppDispatch = useDispatch();
    const [time, setTime] = useState(0);
    const { t } = useTranslation();
    //const [timeInSeconds, setTimeInSeconds] = useState<string>('00:00:00');
    const [timeInMinutes, setTimeInMinutes] = useState<number>(0);
    const [progress, setProgress] = useState(1);
    const [isAPICall, setIsAPICall] = useState(false);
    const [clickedToCall, setClickedToCall] = useState<boolean>(false);
    const [isAPICallForClickToCall, setisAPICallForClickToCall] = useState<boolean>(false);
    const [clickedToAcceptReject, setclickedToAcceptReject] = useState(false);
    const [approveFlag, setapproveFlag] = useState('')
    const [finalSubmitLeadData, setFinalSubmitLeadData] = useState<any>(null)
    const [callData, setCallData] = useState<{
        to_mobile: string,
        lead_guid: string,
        lead_id: string
    }>({ to_mobile: '', lead_guid: '', lead_id: '' });

    // const convertTimeToSeconds = (timeString: string): number => {
    //     const [hours, minutes, seconds] = timeString.split(':').map((unit) => parseInt(unit, 10));
    //     return hours * 3600 + minutes * 60 + seconds;
    // };

    // const formatTime = (seconds: number): string => {
    //     const hours = Math.floor(seconds / 3600);
    //     const minutes = Math.floor((seconds % 3600) / 60);
    //     const remainingSeconds = seconds % 60;
    //     return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
    // };

    // useEffect(() => {
    //     const initialTime = convertTimeToSeconds(timer);
    //     setTimeInSeconds(formatTime(initialTime));
    //     if (initialTime > 0) {
    //         const timerInterval = setInterval(() => {
    //             setTimeInSeconds((prevTime) => {
    //                 const prevTimeInSeconds = convertTimeToSeconds(prevTime);

    //                 const newTime = prevTimeInSeconds - 1;
    //                 const newProgress = newTime / initialTime;
    //                 setProgress(newProgress);
    //                 if (newTime <= 0) {
    //                     clearInterval(timerInterval);
    //                     onTimerEnd(item.lead_guid);
    //                     return '00:00:00';
    //                 }
    //                 return formatTime(newTime);
    //             });
    //         }, 1000);
    //         return () => clearInterval(timerInterval);
    //     }
    // }, [timer, onTimerEnd, item.lead_guid]);

    const convertTimeToMinutes = (timeString: string): number => {
        const [hours, minutes] = timeString.split(':').map((unit) => parseInt(unit, 10));
        return hours * 60 + minutes;
    };
    useEffect(() => {
        const initialTimeInMinutes = parseInt(timer, 10);
        if (isNaN(initialTimeInMinutes) || initialTimeInMinutes <= 0) {
            setTimeInMinutes(0);
            return;
        }
        setTimeInMinutes(initialTimeInMinutes);

        const timerInterval = setInterval(() => {
            setTimeInMinutes((prevTime) => {
                const newTime = prevTime - 1;
                const newProgress = newTime / initialTimeInMinutes;
                setProgress(newProgress);

                if (newTime <= 0) {
                    clearInterval(timerInterval);
                    onTimerEnd(item.lead_guid);
                    return 0;
                }
                return newTime;
            });
        }, 60000);

        return () => clearInterval(timerInterval);
    }, [timer, onTimerEnd, item.lead_guid]);

    const formatTime = (minutes: number): string => {
        return `${minutes < 10 ? '0' + minutes : minutes} min`;
    };

    // const getProgressBarColor = (timeInMinutes: number) => {
    //     if (timeInMinutes < 5) { return 'rgb(255, 87, 87)'; }
    //     else if (timeInMinutes < 10) { return 'rgb(230, 180, 0)'; }
    //     else { return 'rgb(44, 152, 44)'; }
    // }



    const handleAcceptReject = (item: ILead, flag: 'Y' | 'N') => {
        const data = {
            lead_guid: item.lead_guid,
            lead_id: item.lead_id,
            accept_lead: flag
        };
        setclickedToAcceptReject(true)
        setFinalSubmitLeadData(data)
    };

    const finalSubmitLeads = async () => {
        try {
            setIsAPICall(true);
            const response = await UpdateAcceptanceLeadDetails<any, any>(finalSubmitLeadData);
            if (response.response_code === 1) {
                dispatch(fetchLeadsPending());
                setIsAPICall(false);
                setFinalSubmitLeadData(null)
                CommonToastModel('success', response.response_message, 5000);
            }
            else {
                setIsAPICall(false);
                setFinalSubmitLeadData(null)
                CommonToastModel('error', response.response_message, 5000);
            }
        } catch (error) {
            setIsAPICall(false);
            setFinalSubmitLeadData(null)
        }
    }

    const clickToCall = (item: ILead) => {
        setClickedToCall(true);
        setCallData({
            to_mobile: item.lead_contact_no,
            lead_guid: item.lead_guid,
            lead_id: item.lead_id
        })
    }
    const cancelCall = () => {
        setClickedToCall(false);
        setclickedToAcceptReject(false)
        setCallData({
            to_mobile: '',
            lead_guid: '',
            lead_id: '',
        });
    };
    const confirmCall = () => {
        setisAPICallForClickToCall(true);
        MakeCall(callData).then((response: any) => {
            setisAPICallForClickToCall(false);
            if (response && response.response_code == 1) {
                setClickedToCall(false);
                setCallData({
                    to_mobile: '',
                    lead_guid: '',
                    lead_id: '',
                });
                CommonToastModel('success', i18n.t('Call placed successfully'), 5000);
            }
        }).catch(err => {
            setisAPICallForClickToCall(false);
            CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
        })
    }
    const visitRunningCount = useSelector((state: any) => state.holdRunningVisit);





    return (
        <ScrollView style={{ backgroundColor: '#F2F2F2' }}>
            <>
                <View style={{ marginHorizontal: 15 }} >
                    <View style={{ marginVertical: 15, marginBottom: 30 }}>
                        <View style={{ zIndex: 5 }}>
                            <Card>
                                {/* <View style={{ width: '82.5%' }}>
                                    <ProgressBar progress={progress} color={getProgressBarColor(convertTimeToSeconds(timeInSeconds))} style={{ height: 8 }} />
                                    <ProgressBar progress={progress} color={getProgressBarColor(timeInMinutes)} style={{ height: 8 }} />
                                </View> */}
                                <View style={{ ...styles.cardContainer }}>
                                    <View style={{ ...styles.cardContainerLabelGroup }}>
                                        <LottieView
                                            source={{ uri: AppImages.LottyTimer }}
                                            style={{ width: 30, height: 30, }}
                                            autoPlay
                                        />
                                        <Text style={{ ...styles.cardContainerLabelText }}>
                                            {formatTime(timeInMinutes)}
                                        </Text>
                                    </View>
                                    <Text style={{ ...styles.leadHeader }}>
                                        {item.lead_id}
                                    </Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'relative', marginTop: -20 }}>
                                        <Timer data={time} />
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <View style={{ ...styles.iconLabel }}>
                                            <View >
                                                <LeadsUsersIcon />
                                            </View>
                                            <Text style={{ ...styles.leadData, flex: 1 }}>
                                                <Text style={{ color: 'black' }}>{t("Name")}: </Text>{item.lead_contact_name}
                                            </Text>
                                        </View>
                                        {/* <View style={{ ...styles.dateandTime }}>
                                            <View style={{ ...styles.iconLabel }}>
                                                <View style={{ marginBottom: -2.5 }}>
                                                    <Calendar />
                                                </View>
                                                <Text style={{ ...styles.leadData }}>
                                                    <Text style={{ color: 'black' }}>{t("Date")}: </Text>{item.lead_date}
                                                </Text>
                                            </View>
                                            <View style={{ ...styles.iconLabel }}>
                                                <View style={{ marginBottom: -3 }}>
                                                    <Clock />
                                                </View>
                                                <Text style={{ ...styles.leadData }}>
                                                    <Text style={{ color: 'black' }}>{t("Time")}:</Text> {item.lead_time}
                                                </Text>
                                            </View>
                                        </View> */}
                                        <View style={{ marginBottom: -3 }}>
                                            <View style={{ ...styles.iconLabel }}>

                                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                                    <View style={{ marginTop: 2 }}>
                                                        <LocationTwoIcon />
                                                    </View> 
                                                    <Text style={{ ...styles.leadData, flex: 1 }}>
                                                        <Text style={{ color: 'black' }}>{t("Address")}:</Text> {item.lead_address}
                                                    </Text>
                                                </View>

                                            </View>
                                        </View>
                                        <View style={{ marginTop: -3 }}>
                                            <View style={{ ...styles.iconLabel }}>
                                                <View style={{ marginTop: 1 }}>
                                                    <Ionicons name="briefcase-outline" size={18} />
                                                </View>
                                                <Text style={{ ...styles.leadData, flex: 1 }}>
                                                    <Text style={{ color: 'black' }}>{t("ServiceRequirement")}:</Text> {item.painting_type}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ marginTop: -3 }}>
                                            <View style={{ ...styles.iconLabel }}>
                                                <View style={{ marginTop: 1 }}>
                                                    <ClockIcon />
                                                </View>
                                                <Text style={{ ...styles.leadData, flex: 1 }}>
                                                    <Text style={{ color: 'black' }}>{t("AppoitmentDate")}:</Text> {ddmmyyyConverter(item.lead_appoinments_fixed_date, 'DD/MM/YYYY LT')}
                                                </Text>
                                            </View>
                                        </View>
                                        <View>
                                            <View style={{ ...styles.iconLabel, flexDirection: 'row', alignItems: 'center' }}>
                                                {/* <View style={{ marginBottom: -2 }}>
                                                    <Ionicons name="briefcase-outline" size={19} />
                                                </View>
                                                <Text style={{ ...styles.leadData, flex: 1 }}>
                                                    <Text style={{ color: 'black' }}>{t("Lead type")}:</Text> {item.lead_type}
                                                </Text> */}
                                                <View style={{ marginTop: -8 }}>
                                                    <View style={{ ...styles.dateandTime }}>
                                                        <View style={{ ...styles.iconLabel }}>
                                                            <View style={{ marginBottom: -2.5 }}>
                                                                <ClockIcon />
                                                            </View>
                                                            <Text style={{ ...styles.leadData }}>
                                                                <Text style={{ color: 'black' }}>{t("Leadallocatedon")}: </Text>{ddmmyyyConverter(item.painter_allocated_date, 'DD/MM/YYYY LT')}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            {clickedToCall && (
                                                <AlertInfo
                                                    skipNow={() => cancelCall()}
                                                    confirmAction={() => confirmCall()}
                                                    allowSkip={true}
                                                    headerText={t("Do you want to place a call?")}
                                                    subHeaderText={t("Call will be placed")}
                                                    confirmActionButtonText={t("Confirm")}
                                                    skipButtonText={t("Cancel")}
                                                    isAPICall={isAPICallForClickToCall}

                                                />
                                            )}
                                        </View>
                                        {/* <View style={{ ...styles.dateandTime }}>
                                            <View style={{ ...styles.iconLabel }}>
                                                <View style={{ marginBottom: -3 }}>
                                                    <Clock />
                                                </View>
                                                <Text style={{ ...styles.leadData }}>
                                                    <Text style={{ color: 'black' }}>{t("Leadallocatedon")}: </Text>{ddmmyyyConverter(item.painter_allocated_date, 'DD/MM/YYYY LT')}
                                                </Text>
                                            </View>
                                        </View> */}
                                        {/*<View style={{ marginTop: -8 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                <Pressable onPress={() => clickToCall(item)} style={{ ...styles.clickToCallAction }}>
                                                    <CallColorIco />
                                                    <Text style={{ ...styles.clickToCall }}>{t("Click to call")}</Text>
                                                </Pressable>
                                            </View>
                                        </View> */}
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                                        <View style={{ width: '48%', }}>
                                            <ButtonLarge
                                                title={t('Accept')}
                                                onPress={() => {
                                                    handleAcceptReject(item, "Y")
                                                    setapproveFlag('Accept')
                                                }}
                                                fillBtn={true}
                                                key={'Approve'}
                                                showIcon={false}
                                                iconName=""
                                                paddingVertical={4}
                                                paddingHorizontal={2}
                                                fontSize={12}
                                                iconSize={19}
                                                bgColor={'rgb(123,222,123)'}
                                                isAPICall={isAPICall}
                                                disabled={isAPICall}
                                            />

                                        </View>
                                        <View style={{ width: '48%' }}>

                                            <ButtonLarge
                                                title={t('Reject')}
                                                onPress={() => {
                                                    handleAcceptReject(item, "N")
                                                    setapproveFlag('Reject')
                                                }}
                                                fillBtn={true}
                                                key={'Reject'}
                                                showIcon={false}
                                                iconName=""
                                                paddingVertical={4}
                                                paddingHorizontal={2}
                                                fontSize={12}
                                                iconSize={19}
                                                bgColor={'rgb(255,123,123)'}
                                                isAPICall={isAPICall}
                                                disabled={isAPICall}
                                            />
                                        </View>

                                        {clickedToAcceptReject && (
                                            <AlertInfo
                                                skipNow={() => cancelCall()}
                                                confirmAction={() => finalSubmitLeads()}
                                                allowSkip={true}
                                                headerText={approveFlag === 'Accept' ? t('AreYouSureYouWantToAcceptThisLead') : t('AreYouSureYouWantToRejectThisLead')}
                                                confirmActionButtonText={t("Confirm")}
                                                skipButtonText={t("Cancel")}
                                                isAPICall={isAPICall}
                                            />
                                        )}

                                    </View>
                                </View>
                            </Card>
                        </View>
                    </View>
                </View>
            </>
        </ScrollView >
    );
};

export default FlashLeadCard;






