import React, { useCallback, useEffect, useRef, useState, lazy, memo, Suspense } from 'react';
import { View, ScrollView, StyleSheet, Text, Pressable, Image, RefreshControl, Animated } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Colors, Fonts } from '../../themes'; 
import Ionicons from "react-native-vector-icons/Ionicons"; 
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Polygon } from 'react-native-svg';
// const DataTable = lazy(() => import ( DataTable ) from 'react-native-paper');
import {
    NoticeDetailsDto,
    I_Benefit_Details,
    InsigniaClubAnnualDetail,
    IConsistencyBonusDetails

} from '../../Interfaces/benefit.interface';
import { useDispatch, useSelector } from 'react-redux';
import { setPullToRefresh } from '../../store/features/menu/pullToRefresh'; 
import { setbottomSheetHandler } from '../../store/features/bottomSheetHandler/bottomSheetHandler';
import BenefitNotice from '../Benefit/BenefitNotice';
import DynamicShimmerPlaceholder from '../../utils/dynamicShimmerPlaceholder';
import { setBenefitNotice } from '../../store/features/businessDetails/benefitNoticeShowOnLogin';
import LottieView from 'lottie-react-native'; 
import AlertInfo from '../../components/alertInfo';
import { formatNumberWithCommas } from '../../utils/INRConverter';
import { setPageChangeCall } from '../../store/features/menu/pageChange';
import { useTranslation } from 'react-i18next';
import { ddmmyyyConverter } from '../../utils/formatDate';
import PendingLeadAcceptCard from '../../components/ScreensComponent/PendingLeadAccept';
// import InsigniaClubQualification from './BusinessComponents/InsigniaClubQualification';
// import LegendCircleQualification from './BusinessComponents/LegendCircleQualification';
import NoDataFound from '../../components/NoDataFound';
import Card from '../../components/Card';
import RewardAlertInfo from '../../components/rewardAlertInfo';
// import BusinessDetailsData from './BusinessComponents/BusinessDetailsData';
const ConsistencyBonus = lazy(() => import('./BusinessComponents/ConsistencyBonus'));
const InsigniaClubQualification = lazy(() => import('./BusinessComponents/InsigniaClubQualification'));
const LegendCircleQualification = lazy(() => import('./BusinessComponents/LegendCircleQualification'));
const BusinessDetailsData = lazy(() => import('./BusinessComponents/BusinessDetailsData'));

const HomeBenefit = ({ navigation }: any) => {
    const userProfileData = useSelector((state: any) => state.userProfileData);
    const [RewardDetails, setRewardDetails] = useState<I_Benefit_Details.RewardDetails>()
    const [CashRewards, setCashRewards] = useState<I_Benefit_Details.CashRewardsDetails[]>([])
    const [GetBusinessDetails, setBusinessDetails] = useState<I_Benefit_Details.BusinessDetails>()
    const [SchemeDetails, setSchemeDetails] = useState<I_Benefit_Details.SchemeDetails[]>([])
    const [NoticeDetails, setNoticeDetails] = useState<I_Benefit_Details.NoticeDetails>(NoticeDetailsDto)
    const [InsigniaClubAnnualDetails, setInsigniaClubAnnualDetails] = useState<InsigniaClubAnnualDetail[]>([])
    const [ConsistencyBonusDetails, setConsistencyBonusDetails] = useState<IConsistencyBonusDetails>()
    const [showLoader, setShowLoader] = useState(false);
    const isAPICall = useSelector((state: any) => state.apiCallLoader);
    const dispatch = useDispatch();
    // const bottomSheetRef = useRef(null);
    const [RewardModal, setRewardModal] = useState(false);
    const [SchemeModal, setSchemeModal] = useState(false);
    const [getIsUpdate, setIsUpdate] = useState(false);
    const { t } = useTranslation();
    const { pendingLeads } = useSelector((state: any) => state.PendingLeadsData);

    const [addUrl, setAddUrl] = useState<string | null>(null);
    const [addUrlYn, setAddUrlYn] = useState<'Y' | 'N'>('N');
    const [addSkipYn, setAddSkipYn] = useState<'Y' | 'N'>('N');
    const [videoCompleted, setVideoCompleted] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);

    useEffect(() => {
        const profile = Array.isArray(userProfileData) ? userProfileData[0] : userProfileData;
        if (profile) {
            setAddUrl(profile?.add_url || null);
            setAddUrlYn((profile?.add_url_yn as 'Y' | 'N') || 'N');
            setAddSkipYn((profile?.add_skip_yn as 'Y' | 'N') || 'N');
            setVideoCompleted(false);
            const shouldShow = ((profile?.add_url_yn as 'Y' | 'N') === 'Y') && !!(profile?.add_url);
            setShowVideoModal(shouldShow);
        }
    }, [userProfileData]);

    const [mcqVisible, setMcqVisible] = useState(false);
    const [mcqQuestionText, setMcqQuestionText] = useState('');
    const [mcqOptions, setMcqOptions] = useState<Array<{ id: string | number; label: string; isCorrect?: 'Y' | 'N' | boolean }>>([]);
    const [mcqQuestionId, setMcqQuestionId] = useState<number>(0);
    const [mcqOrderNo, setMcqOrderNo] = useState<number>(0);
    const [lastVideoSkipped, setLastVideoSkipped] = useState<'Y' | 'N'>('N');

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const res: any = await PainterQuestionDetails<any, any>();
    //             if (res?.response_code === 1 && res?.data) {
    //                 const q = res.data;
    //                 const questionText = q.qd_question_details || q.qd_question_description || '';
    //                 const options = Array.isArray(q.question_details)
    //                     ? q.question_details.map((o: any) => ({
    //                         id: o.qa_auto_id,
    //                         label: o.qa_question_option,
    //                         isCorrect: o.is_correct,
    //                     }))
    //                     : [];
    //                 if (questionText && options.length > 0) {
    //                     setMcqQuestionText(questionText);
    //                     setMcqOptions(options);
    //                     // Do not show immediately; will open after video Next
    //                     setMcqQuestionId(Number(q.qd_auto_id) || 0);
    //                     setMcqOrderNo(Number(q.qd_order) || 0);
    //                 }
    //             }
    //         } catch (e) {
    //             // silent fail
    //         }
    //     })();
    // }, []);


    const goToDetails = () => {
        // navigation.navigate('OtherBenefitDetails', { responseData: SchemeDetails });
        setSchemeModal(true)
    }
    const goToDetailsSelloutDBT = () => {
        console.log("fhghjghjgkgjkjkhjkhkjlh");
        navigation.navigate('SelloutDBT');
    }
    const goToDetailsValueToken = () => {
        navigation.navigate('SelloutDBT');
    };
    const [refreshing, setRefreshing] = useState(false);
    const [defaultEmail, setDefaultEmail] = useState(userProfileData[0]?.email_id || "");
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
        dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: true }));
        dispatch(setPageChangeCall(false))
    }, []);

    const customBottomSheetTitle = 'Important Notice';
    // GET BUSSINESS DETAILS
    const { BusinessDetails, status, error } = useSelector((state: any) => state.businessDetails);
    const bottomSheetHandler = useSelector((state: any) => state.bottomSheetHandler);
    const [skipButton, setSkipButton] = useState(false);

    useEffect(() => {
        if (isAPICall) { setShowLoader(true) }
        else { setShowLoader(false) }
    }, [isAPICall])

    useEffect(() => {
        // console.log("HOme Benefit Page") 
        if (!getIsUpdate && status == 'succeeded') {
            if (BusinessDetails.cash_rewards != null && BusinessDetails.cash_rewards != undefined) {
                setCashRewards(BusinessDetails.cash_rewards);
            }
            if (BusinessDetails.reward_details != null && BusinessDetails.reward_details != undefined) {
                setRewardDetails(BusinessDetails.reward_details);
            }
            if (BusinessDetails.business_details != null && BusinessDetails.business_details != undefined) {
                setBusinessDetails(BusinessDetails.business_details);
            }
            if (BusinessDetails.scheme_details != null && BusinessDetails.scheme_details != undefined) {
                setSchemeDetails(BusinessDetails.scheme_details);
            }
            if (BusinessDetails.notice_details != null && BusinessDetails.notice_details != undefined) {
                setNoticeDetails(BusinessDetails.notice_details);
                setIsUpdate(true)
            }
            if (BusinessDetails.insignia_club_annual_details != null && BusinessDetails.insignia_club_annual_details != undefined) {
                setInsigniaClubAnnualDetails(BusinessDetails.insignia_club_annual_details);
            }
            if (BusinessDetails.ConsistencyBonusDetails != null && BusinessDetails.ConsistencyBonusDetails != undefined) {
                setConsistencyBonusDetails(BusinessDetails.ConsistencyBonusDetails);
            }
        }

    }, [BusinessDetails])

    //OPENING BENEFIT NOTICE MODAL 
    // useEffect(() => {
    //     if (bottomSheetHandler && Object.keys(bottomSheetHandler).length != 0) {
    //         if (bottomSheetHandler.modelAction == true) {
    //             if (
    //                 bottomSheetHandler.modelName == 'BenefitNotice' &&
    //                 bottomSheetRef.current
    //             ) {
    //                 (bottomSheetRef.current as any).open()
    //             }
    //         }
    //     } else {
    //         (bottomSheetRef.current as any).close();
    //         dispatch(setbottomSheetHandler(false));
    //     }
    // }, [bottomSheetHandler]);

    //OPENING BENEFIT NOTICE MODAL
    const open = () => {
        dispatch(setbottomSheetHandler({
            modelAction: true,
            modelName: 'BenefitNotice',
        }),);
    };

    // CLOSE BENEFIT NOTICE MODAL
    // const closeSheet = (): void => {
    //     if (bottomSheetRef.current) {
    //         (bottomSheetRef.current as any).close();
    //         dispatch(setbottomSheetHandler(false));
    //     } else {
    //         console.error('bottomSheetRef is null');
    //     }

    //     dispatch(setBenefitNotice({ showNotice: true, todayDate: ddmmyyyConverter(new Date(), 'DD/MM/YYYY') }))
    // };

    const slideAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(slideAnim, {
                    toValue: 80,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(slideAnim, {
                    toValue: 10,
                    duration: 1000,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, [slideAnim]);

    const [tripDetails, setTripDetails] = useState<any>('')
    const openRewardModal = (trip: any) => {
        setRewardModal(true)
        setTripDetails(trip)
    }


    useEffect(() => {
        console.log("cashrewards", CashRewards);

    }, [CashRewards])



    return (
        <>

            <ScrollView style={{ backgroundColor: '#F2F2F2' }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={{ marginBottom: 50 }}>
                    {/* ============================ Pending Leads ============================ */}
                    {pendingLeads && pendingLeads.length > 0 && (
                        <PendingLeadAcceptCard navigation={navigation} />
                    )}

                    {status === 'loading' && (
                        <View style={{ width: '100%', paddingHorizontal: 15 }}>
                            <DynamicShimmerPlaceholder borderRadius={5} height={100} width={'100%'} count={5} />
                        </View>
                    )}

                    {status === 'failed' && (
                        <View style={{ width: '100%', paddingHorizontal: 15, marginTop: 50 }}>
                            <NoDataFound content={t('No data found')} />
                        </View>
                    )}

                    {/* ============================ Important Notice ============================ */}
                    {status === 'succeeded' && NoticeDetails && NoticeDetails != null && NoticeDetails != undefined && NoticeDetails?.Notice && NoticeDetails.Notice != '' && NoticeDetails.Notice != null && (
                        <View style={{ paddingHorizontal: 15, marginBottom: 30, marginTop: 10 }}>
                            <View style={{ marginBottom: 20, marginVertical: 10 }}>
                                <View style={{ marginLeft: 20, }}>
                                    <Card>
                                        <View style={{ paddingLeft: 32, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                                            <Text style={{ color: '#3E797F', fontFamily: Fonts.poppins500Medium, fontSize: 15 }}>{t("ImportantNotice")}</Text>
                                            <Pressable onPress={() => open()}>
                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 5, alignItems: 'center' }}>
                                                    <Text style={{ color: Colors.color_black, fontFamily: Fonts.OpenSans400Regular, fontSize: 11 }}>{t("ViewDetails")}</Text>
                                                    <Ionicons name="chevron-forward-circle-outline" size={20} style={{ color: Colors.color_black }} />
                                                </View>
                                            </Pressable>
                                        </View>
                                    </Card>
                                </View>
                                <View style={{ position: 'absolute', zIndex: 1, top: -2, left: -3 }}>
                                    <Image source={require('../../assets/images/hexagon.png')} style={{ height: 50, width: 50, }} />
                                </View>

                            </View>
                        </View>
                    )}

                    {/* ============================ Cash Rewards ============================ */}
                    {status === 'succeeded' && CashRewards && CashRewards.length > 0 && (
                        <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
                            <React.Fragment>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, position: 'relative' }}>
                                    {RewardDetails && RewardDetails != null && (
                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <LinearGradient
                                                colors={['#3E797F00', '#3E797F', '#3E797F00']}
                                                useAngle={true}
                                                angle={90}
                                                start={{ x: 0.1, y: 0.9 }}
                                                end={{ x: 0.1, y: 0.9 }}
                                                locations={[0.1, 1, 1]}
                                                style={{ width: '30%', height: 32 }}
                                            />
                                            <View style={{ padding: 5, backgroundColor: '#3E797F', height: 32, paddingHorizontal: 10, width: '40%' }}>
                                                <Text style={{ textAlign: 'center', color: Colors.color_white, fontSize: 14, fontFamily: Fonts.poppins500Medium }}>FY: {RewardDetails.fin_yr}</Text>
                                            </View>
                                            <LinearGradient
                                                colors={['#3E797F00', '#3E797F', '#3E797F00']}
                                                useAngle={true}
                                                angle={-90}
                                                start={{ x: 0.1, y: 0.9 }}
                                                end={{ x: 0.1, y: 0.9 }}
                                                locations={[0.1, 1, 1]}
                                                style={{ width: '30%', height: 32 }}
                                            />
                                        </View>
                                    )}

                                </View>
                                <View style={{ backgroundColor: 'white', borderRadius: 10, paddingBottom: 5 }}>
                                    <DataTable>
                                        <DataTable.Header style={{ ...styles.TableHeader, }}>
                                            <DataTable.Title style={{ flex: 2.5 }} textStyle={styles.title}>
                                                {t("CashRewards")} (₹)
                                            </DataTable.Title>
                                            <DataTable.Title style={{ flex: 1.5 }} textStyle={styles.title} numeric>
                                                {t("Earned")}
                                            </DataTable.Title>
                                            <DataTable.Title style={{ flex: 1.8 }} textStyle={styles.title} numeric>
                                                {t("Redeemed")}
                                            </DataTable.Title>
                                            <DataTable.Title style={{ flex: 1.5 }} textStyle={styles.title} numeric>
                                                {t("Advance")}
                                            </DataTable.Title>
                                            <DataTable.Title style={{ flex: 1.2, }} textStyle={styles.title} numeric>
                                                {t("due")}
                                            </DataTable.Title>
                                        </DataTable.Header>
                                        <>
                                            <DataTable.Row style={{ ...styles.tableRowStyle }}>
                                                <DataTable.Cell style={{ display: 'flex', flex: 6, width: '100%', minHeight: 30 }}>
                                                    <View style={{ backgroundColor: Colors.ui_ultra_light_bg, position: 'absolute', padding: 10, top: -2, left: '-6%', width: '112%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                                        <Text style={{ color: Colors.ui_dark_bg, fontSize: 10, fontFamily: Fonts.OpenSans700Bold }}>** {t("LastUpdatedOn")}: {CashRewards[0].data_as_on_date}</Text>
                                                        <View style={{ position: 'absolute', left: 0, bottom: -9, }}>
                                                            <Svg width={9} height={9}>
                                                                <Polygon points="0,0 100,0 90,100" fill="#7A8C8D" />
                                                            </Svg>
                                                        </View>
                                                        <View style={{ position: 'absolute', right: 0, bottom: -9, transform: [{ rotateY: '180deg' }] }}>
                                                            <Svg width={9} height={9}>
                                                                <Polygon points="0,0 100,0 90,100" fill="#7A8C8D" />
                                                            </Svg>
                                                        </View>
                                                    </View>
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                            {CashRewards.map((item: I_Benefit_Details.CashRewardsDetails, index: any) => {
                                                return (
                                                    <DataTable.Row style={{ ...styles.tableRowStyle }} key={index}>
                                                        <DataTable.Cell style={{ flex: 2.5, minHeight: 30 }}>
                                                            <Text style={{ ...styles.wrapText }}>{item.cash_rewards}</Text>
                                                        </DataTable.Cell>
                                                        <DataTable.Cell style={{ flex: 1.5 }} textStyle={styles.colTitle} numeric>
                                                            {/* <Pressable
                                                                onPress={() => {
                                                                    if (item.cash_rewards === 'Sellout DBT') {
                                                                        navigation.navigate('ValueTokenDBT', { reward_type: 'S' });
                                                                    } else if (item.cash_rewards === 'Value Token') {
                                                                        navigation.navigate('ValueTokenDBT', { reward_type: 'V' });
                                                                    }
                                                                }}
                                                            > */}
                                                            <Pressable
                                                                onPress={() => {
                                                                    if (item.cash_rewards === 'Sellout DBT') {
                                                                        navigation.navigate('SelloutDBT');
                                                                    } else if (item.cash_rewards === 'Value Token') {
                                                                        navigation.navigate('ValueTokenDBT');
                                                                    }
                                                                }}
                                                            >

                                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                                    <Text style={styles.colTitle}>
                                                                        {item.earned != 0 ? formatNumberWithCommas(item.earned) : '-'}
                                                                    </Text>

                                                                    {(item.cash_rewards === "Sellout DBT" || item.cash_rewards === "Value Token") && (

                                                                        <Ionicons
                                                                            name="information-circle-outline"
                                                                            size={15}
                                                                            color={Colors.color_black}
                                                                            style={{ marginRight: -10 }}
                                                                        />


                                                                    )}
                                                                </View>
                                                            </Pressable>



                                                        </DataTable.Cell>
                                                        <DataTable.Cell style={{ flex: 1.8, }} textStyle={styles.colTitle} numeric>
                                                            {item.redeemed != 0 ? formatNumberWithCommas(item.redeemed) : '-'}
                                                        </DataTable.Cell>
                                                        <DataTable.Cell style={{ flex: 1.5, }} textStyle={styles.colTitle} numeric>
                                                            {item.advance != 0 ? formatNumberWithCommas(item.advance) : '-'}
                                                        </DataTable.Cell>
                                                        <DataTable.Cell style={{ flex: 1.2, }} textStyle={styles.colTitle} numeric>
                                                            {item.due != 0 ? formatNumberWithCommas(item.due) : '-'}
                                                        </DataTable.Cell>
                                                    </DataTable.Row>
                                                );
                                            })}

                                            {status == 'succeeded' && BusinessDetails.cast_reward_total &&
                                                <DataTable.Row style={{ backgroundColor: Colors.ui_dark_bg, ...styles.tableRowStyle }}>
                                                    <DataTable.Cell style={{ flex: 2.5 }} textStyle={{ ...styles.colTotalTitle, }}>
                                                        {t("Total")}
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={{ flex: 1.5 }} textStyle={{ ...styles.colTotalTitle, }} numeric>
                                                        {BusinessDetails.cast_reward_total.earned != 0 ? formatNumberWithCommas(BusinessDetails.cast_reward_total.earned) : '-'}
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={{ flex: 1.8 }} textStyle={{ ...styles.colTotalTitle, }} numeric>
                                                        {BusinessDetails.cast_reward_total.redeemed != 0 ? formatNumberWithCommas(BusinessDetails.cast_reward_total.redeemed) : '-'}
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={{ flex: 1.5 }} textStyle={{ ...styles.colTotalTitle, }} numeric>
                                                        {BusinessDetails.cast_reward_total.advance != 0 ? formatNumberWithCommas(BusinessDetails.cast_reward_total.advance) : '-'}
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={{ flex: 1.2 }} textStyle={{ ...styles.colTotalTitle, }} numeric>
                                                        {BusinessDetails.cast_reward_total.due != 0 ? formatNumberWithCommas(BusinessDetails.cast_reward_total.due) : '-'}
                                                    </DataTable.Cell>
                                                </DataTable.Row>}

                                            {SchemeDetails && SchemeDetails.length > 0 &&
                                                <View style={{ padding: 5 }}>
                                                    <Pressable onPress={() => goToDetails()}>
                                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 5, alignItems: 'center' }}>
                                                            <Text style={{ fontSize: 12, fontFamily: Fonts.OpenSans500Medium }}>{t("ClickHereToViewOtherDetails")}</Text>
                                                            <Ionicons
                                                                name="arrow-forward-outline"
                                                                size={15}
                                                                style={{ color: Colors.color_black }} />
                                                        </View>
                                                    </Pressable>
                                                </View>
                                            }
                                        </>
                                    </DataTable>
                                </View>
                            </React.Fragment>
                        </View>
                    )}

                    {/* ============================ Business Details ============================ */}
                    {status === 'succeeded' && GetBusinessDetails && GetBusinessDetails != null && (
                        <View style={{ paddingHorizontal: 15 }}>
                            <Suspense fallback={<View style={{ marginTop: 15 }}><DynamicShimmerPlaceholder borderRadius={5} height={100} width={'100%'} count={1} /></View>}>
                                <BusinessDetailsData GetBusinessDetails={GetBusinessDetails} />
                            </Suspense>
                        </View>
                    )}

                    {/* ============================ Consistency Bonus ============================ */}
                    {status === 'succeeded' && ConsistencyBonusDetails && ConsistencyBonusDetails != null && (
                        <View style={{ paddingHorizontal: 15 }}>
                            <Suspense fallback={<View style={{ marginTop: 15 }}><DynamicShimmerPlaceholder borderRadius={5} height={100} width={'100%'} count={1} /></View>}>
                                <ConsistencyBonus consistencyBonusDetails={ConsistencyBonusDetails} />
                            </Suspense>
                        </View>
                    )}

                    {/* ============================ Lift & Win ============================ */}
                    {status === 'succeeded' && RewardDetails && RewardDetails != null && (
                        <View style={{ paddingHorizontal: 15 }}>
                            <View style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 30 }}>
                                <DataTable>
                                    <DataTable.Header style={{ ...styles.TableHeader, }}>
                                        <DataTable.Title style={{ flex: 3 }} textStyle={styles.title}>
                                            Lift & Win
                                        </DataTable.Title>
                                        <DataTable.Title style={{ flex: 2 }} textStyle={styles.title} numeric>
                                            {t("Points")}
                                        </DataTable.Title>
                                        <DataTable.Title style={{ flex: 2 }} textStyle={styles.title} numeric>
                                            {t("Value")} (₹)
                                        </DataTable.Title >
                                        <DataTable.Title style={{ flex: 1, }} textStyle={{ ...styles.title, paddingLeft: 10 }}>
                                            {t("Trip")}
                                        </DataTable.Title>
                                    </DataTable.Header>

                                    <DataTable.Row style={{ ...styles.tableRowStyle }}>
                                        <DataTable.Cell style={{ display: 'flex', flex: 6, width: '100%', minHeight: 30 }}>
                                            <View style={{ backgroundColor: Colors.ui_ultra_light_bg, position: 'absolute', padding: 10, top: -2, left: '-6%', width: '112%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                                <Text style={{ color: Colors.ui_dark_bg, fontSize: 10, fontFamily: Fonts.OpenSans700Bold }}>** {t("LastUpdatedOn")}: {RewardDetails.data_as_on_date}</Text>
                                                <View style={{ position: 'absolute', left: 0, bottom: -9, }}>
                                                    <Svg width={9} height={9}>
                                                        <Polygon points="0,0 100,0 90,100" fill="#7A8C8D" />
                                                    </Svg>
                                                </View>
                                                <View style={{ position: 'absolute', right: 0, bottom: -9, transform: [{ rotateY: '180deg' }] }}>
                                                    <Svg width={9} height={9}>
                                                        <Polygon points="0,0 100,0 90,100" fill="#7A8C8D" />
                                                    </Svg>
                                                </View>
                                            </View>
                                        </DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row style={{ ...styles.tableRowStyle }}>
                                        <DataTable.Cell style={{ flex: 3, minHeight: 30 }}>
                                            <Text style={{ ...styles.wrapText }}>Tier Reward</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={styles.colTitle} numeric>
                                            {RewardDetails.basic_point != 0 ? formatNumberWithCommas(RewardDetails.basic_point) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={styles.colTitle} numeric>
                                            {RewardDetails.basic_value != 0 ? formatNumberWithCommas(RewardDetails.basic_value) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }} >
                                            <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 10, paddingLeft: 10, textAlign: 'center' }}>-</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                    {/* <DataTable.Row style={{ ...styles.tableRowStyle }}>
                                        <DataTable.Cell style={{ flex: 3, minHeight: 30 }}>
                                            <Text style={{ ...styles.wrapText }}>Qtrly Dhamaka Q1</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={styles.colTitle} numeric>
                                            {RewardDetails.qtr1_point != 0 ? formatNumberWithCommas(RewardDetails.qtr1_point) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={{ ...styles.colTitle, paddingRight: 5.5 }} numeric>
                                            {RewardDetails.qtr1_value != 0 ? formatNumberWithCommas(RewardDetails.qtr1_value) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }}>
                                            <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 10, paddingLeft: 10, textAlign: 'center' }}>-</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row> */}
                                    <DataTable.Row style={{ ...styles.tableRowStyle }}>
                                        <DataTable.Cell style={{ flex: 3, minHeight: 30 }}>
                                            <Text style={{ ...styles.wrapText }}>Welcome Dhamaka</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={styles.colTitle} numeric>
                                            {RewardDetails.welcome_dhamaka_point_q1 != 0 && !isNaN(RewardDetails.welcome_dhamaka_point_q1) ? formatNumberWithCommas(RewardDetails.welcome_dhamaka_point_q1) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={{ ...styles.colTitle, paddingRight: 5.5 }} numeric>
                                            {RewardDetails.qtr1_value != 0 && !isNaN(RewardDetails.qtr1_value) ? formatNumberWithCommas(RewardDetails.qtr1_value) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }}>
                                            <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 10, paddingLeft: 10, textAlign: 'center' }}>-</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                    <DataTable.Row style={{ ...styles.tableRowStyle }}>
                                        <DataTable.Cell style={{ flex: 3, minHeight: 30 }}>
                                            <Text style={{ ...styles.wrapText }}>Qtrly Dhamaka Q2</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={styles.colTitle} numeric>
                                            {RewardDetails.qtr2_point != 0 ? formatNumberWithCommas(RewardDetails.qtr2_point) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={{ ...styles.colTitle, paddingRight: 6 }} numeric>
                                            {RewardDetails.qtr2_value != 0 ? formatNumberWithCommas(RewardDetails.qtr2_value) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }}>
                                            <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 10, paddingLeft: 10, textAlign: 'center' }}>-</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                    <DataTable.Row style={{ ...styles.tableRowStyle }}>
                                        <DataTable.Cell style={{ flex: 3, minHeight: 30 }}>
                                            <Text style={{ ...styles.wrapText }}>Qtrly Dhamaka Q3</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={styles.colTitle} numeric>
                                            {RewardDetails.qtr3_point != 0 ? formatNumberWithCommas(RewardDetails.qtr3_point) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={{ ...styles.colTitle, paddingRight: 10 }} numeric>
                                            {RewardDetails.qtr3_value != 0 ? formatNumberWithCommas(RewardDetails.qtr3_value) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }}>
                                            <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 10, paddingLeft: 10, textAlign: 'center' }}>-</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                    <DataTable.Row style={{ ...styles.tableRowStyle }}>
                                        <DataTable.Cell style={{ flex: 3, minHeight: 30 }}>
                                            <Text style={{ ...styles.wrapText }}>Qtrly Dhamaka Q4</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={styles.colTitle} numeric>
                                            {RewardDetails.qtr4_point != 0 ? formatNumberWithCommas(RewardDetails.qtr4_point) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={{ ...styles.colTitle, paddingRight: 10 }} numeric>
                                            {RewardDetails.qtr4_value != 0 ? formatNumberWithCommas(RewardDetails.qtr4_value) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }}>
                                            <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 10, paddingLeft: 10, textAlign: 'center' }}>-</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                    <DataTable.Row style={{ ...styles.tableRowStyle }}>
                                        <DataTable.Cell style={{ flex: 3, minHeight: 30 }}>
                                            <Text style={{ ...styles.wrapText }}>{RewardDetails.trip_name || '-'}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={styles.colTitle} numeric>
                                            {(RewardDetails.go_goa_carnival_point || RewardDetails.qtr4_value != 0) ? formatNumberWithCommas(RewardDetails.go_goa_carnival_point) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={{ ...styles.colTitle, paddingRight: 10 }} numeric>
                                            -
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }}>
                                            {RewardDetails.go_goa_carnival_reward && RewardDetails.go_goa_carnival_reward.length > 0 ?
                                                <Pressable onPress={() => openRewardModal(RewardDetails && RewardDetails.go_goa_carnival_reward ? RewardDetails.go_goa_carnival_reward : '')}>
                                                    <View >
                                                        <LottieView
                                                            source={require('../../assets/lotty/travel_two.json')}
                                                            style={{ width: 50, height: 50 }}
                                                            autoPlay
                                                            loop
                                                        />
                                                    </View>
                                                </Pressable> : <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 10, paddingLeft: 10, textAlign: 'center' }}>-</Text>}
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                    {/* <DataTable.Row style={{ ...styles.tableRowStyle }}>
                                        <DataTable.Cell style={{ flex: 3, minHeight: 30 }}>
                                            <Text style={{ ...styles.wrapText }}>100 Year Bonus</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={styles.colTitle} numeric>
                                            {RewardDetails.years_100_bonus_point != 0 ? formatNumberWithCommas(RewardDetails.years_100_bonus_point) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={{ ...styles.colTitle, paddingRight: 8 }} numeric>
                                            {RewardDetails.years_100_bonus_value != 0 ? formatNumberWithCommas(RewardDetails.years_100_bonus_value) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }}>
                                            <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 10, paddingLeft: 10, textAlign: 'center' }}>-</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row> */}

                                    <DataTable.Row style={{ ...styles.tableRowStyle }}>
                                        <DataTable.Cell style={{ flex: 3, minHeight: 30 }}>
                                            <Text style={{ ...styles.wrapText }}>{t("AnnualReward")}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={styles.colTitle} numeric>
                                            {RewardDetails.annual_reward != 0 ? formatNumberWithCommas(RewardDetails.annual_reward) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={{ ...styles.colTitle, paddingRight: 10 }} numeric> - </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }}>
                                            {RewardDetails.annual_reward_trip != null && RewardDetails.annual_reward_trip.length > 0 ?
                                                <Pressable onPress={() => openRewardModal(RewardDetails && RewardDetails.annual_reward_trip ? RewardDetails.annual_reward_trip : '')}>
                                                    <LottieView source={require('../../assets/lotty/travel_two.json')} style={{ width: 50, height: 50 }} autoPlay loop />
                                                </Pressable> : <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 10, paddingLeft: 10, textAlign: 'center' }}>-</Text>}
                                        </DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row style={{ backgroundColor: Colors.ui_dark_bg, ...styles.tableRowStyle, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                        <DataTable.Cell style={{ flex: 3 }} textStyle={{ ...styles.colTotalTitle }}>Total</DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={{ ...styles.colTotalTitle }} numeric>
                                            {RewardDetails.total_points != 0 ? formatNumberWithCommas(RewardDetails.total_points) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 2 }} textStyle={{ ...styles.colTotalTitle }} numeric>
                                            {RewardDetails.total_earning != 0 ? formatNumberWithCommas(RewardDetails.total_earning) : '-'}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1, }} textStyle={{ ...styles.colTotalTitle }}> </DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>
                            </View>
                        </View>
                    )}

                    {/* ============================ Legend Circle Qualification ============================ */}
                    {status === 'succeeded' && RewardDetails && RewardDetails != null && (
                        <View style={{ paddingHorizontal: 15 }}>
                            <Suspense fallback={<View style={{ marginTop: 15 }}><DynamicShimmerPlaceholder borderRadius={5} height={100} width={'100%'} count={1} /></View>}>
                                <LegendCircleQualification rewardDetails={RewardDetails} openRewardModal={(value) => openRewardModal(value)} />
                            </Suspense>
                        </View>
                    )}

                    {/* ============================ InsigniaClubQualification ============================ */}
                    {status === 'succeeded' && InsigniaClubAnnualDetails && InsigniaClubAnnualDetails != null && (
                        <View style={{ paddingHorizontal: 15 }}>
                            <Suspense fallback={<View style={{ marginTop: 15 }}><DynamicShimmerPlaceholder borderRadius={5} height={100} width={'100%'} count={1} /></View>}>
                                <InsigniaClubQualification insigniaDetails={InsigniaClubAnnualDetails} openRewardModal={(value) => openRewardModal(value)} />
                            </Suspense>
                        </View>
                    )}
                </View>
            </ScrollView>


            {/* // NOTIFICATION MODAL // */}
            {/* <BottomSheet
                scrollEnabled={true}
                ref={bottomSheetRef}
                closeOnDragDown={true}
                onClose={() => closeSheet()}
                contentHeight={true}
                sheetTitle={customBottomSheetTitle}>
                <View style={{}}>
                    <BenefitNotice Notice={NoticeDetails.Notice} ></BenefitNotice>
                </View>
            </BottomSheet> */}

            {RewardModal && (
                <RewardAlertInfo
                    skipNow={() => setRewardModal(false)}
                    confirmAction={() => setRewardModal(false)}
                    allowSkip={false}
                    subHeaderText={t("TicketDetailsAndLocation")}
                    // headerText={RewardDetails && RewardDetails.annual_reward_trip ? RewardDetails.annual_reward_trip : ''}
                    headerText={tripDetails}
                    confirmActionButtonText={t("close")} />
            )}

            {/* // SCHEME MODEL // */}
            {SchemeModal && (
                <AlertInfo
                    skipNow={() => setSchemeModal(false)}
                    confirmAction={() => setSchemeModal(false)}
                    allowSkip={false}
                    headerText={t("Rewards")}
                    subHeaderText={t("CurrentlyNoGiftAndOtherBenefitsHasBeenInitiated")}
                    confirmActionButtonText={t("close")} />
            )}

            {/* <MCQModal
                modalVisible={mcqVisible}
                hideModal={() => setMcqVisible(false)}
                questionText={mcqQuestionText}
                options={mcqOptions}
                questionId={mcqQuestionId}
                questionOrderNo={mcqOrderNo}
                videoSkipYn={lastVideoSkipped}
                onSubmit={() => setMcqVisible(false)}
            /> */}

            {/* {showVideoModal && addUrlYn === 'Y' && !!addUrl && (
                <ModalComponent>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.color_black }}>
                        <View style={{ width: '92%', borderRadius: 12, overflow: 'hidden', backgroundColor: Colors.color_black }}>
                            <CustomVideoPlayer
                                source={addUrl}
                                autoPlay
                                loop={false}
                                muted={false}
                                addSkipYn={addSkipYn}
                                onEnd={() => setVideoCompleted(true)}
                                onError={() => { }}
                                onSkip={() => {
                                    setLastVideoSkipped('Y');
                                    setShowVideoModal(false);
                                    setMcqVisible(true);
                                }}
                                onNext={() => {
                                    setLastVideoSkipped('N');
                                    setShowVideoModal(false);
                                    setMcqVisible(true);
                                }}
                            />
                        </View>
                    </View>
                </ModalComponent>
            )} */}
        </>
    );
};

export default memo(HomeBenefit);

const styles = StyleSheet.create({
    pending: {
        color: '#EC9600',
        fontSize: 10,
        fontFamily: Fonts.OpenSans600SemiBold,
        textAlign: 'center'
    },
    pendingGroup: {
        backgroundColor: 'rgba(235.88, 150.10, 0, 0.22)',
        padding: 2,
        paddingHorizontal: 8,
        borderRadius: 100
    },
    customCard: {
        backgroundColor: Colors.color_white
    },
    dateLabel: {
        fontSize: 13,
        fontFamily: Fonts.OpenSans600SemiBold,
        color: Colors.color_dark_gray,
        marginLeft: 5
    },
    head: {
        backgroundColor: '#D9D9D9',
        paddingLeft: 9,
        paddingRight: 0
    },
    wrapText: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 10,
        paddingRight: 10,
        fontFamily: Fonts.OpenSans700Bold
    },
    title: {
        color: Colors.color_white,
        fontSize: 10,
        paddingRight: 5,
        marginTop: -8,
        letterSpacing: 0.2,
        height: 50,
        fontFamily: Fonts.OpenSans500Medium,
    },
    colTitle: {
        color: 'black',
        fontSize: 9,
        paddingRight: 5,
        // padding: 0,
        fontFamily: Fonts.OpenSans500Medium,
    },
    colTotalTitle: {
        fontSize: 10,
        paddingRight: 5,
        color: Colors.color_white,
        fontFamily: Fonts.OpenSans700Bold,
    },
    TableHeader: {
        paddingHorizontal: 10,
        backgroundColor: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins600SemiBold,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 35,
    },
    tableRowStyle: {
        minHeight: 30,
        paddingHorizontal: 10,
        borderBottomColor: '#3F7A80',
    },
    noDataEntry: {
        // No Redemption History
        color: '#494949',
        fontSize: 11,
        fontFamily: Fonts.poppins400Regular,
        textAlign: 'center'
    },
    fixedButton: {
        backgroundColor: Colors.color_white,
        paddingHorizontal: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    totalRowCell: {
        fontSize: 11,
        paddingRight: 10,
        fontFamily: Fonts.OpenSans700Bold,
        color: Colors.color_white,
    },

    animatedBorder: {
        position: 'absolute',
        width: 3,
        height: 100,
        backgroundColor: '#FFF',
        opacity: 0.5,
        zIndex: 5,
        top: -10
    },
    container: {
        backgroundColor: Colors.color_white
    },
    loginBg: {
        height: 300,
        padding: 20,
    },
    hederMain: {
        color: Colors.color_white,
        fontFamily: Fonts.OpenSans700Bold,
        fontSize: 30,
        marginBottom: 30
    },
    subHederMain: {
        color: Colors.color_white,
        fontFamily: Fonts.OpenSans600SemiBold,
        fontSize: 14,
    },
    curve: {
        position: "absolute",
        bottom: 0,
        left: 0,
    },
    centerContent: {
        paddingHorizontal: 15
    },
    smslogo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    centerLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    otpHeader: {
        color: Colors.semi_dark_text_color,
        fontSize: 25,
        fontFamily: Fonts.poppins500Medium,
        marginTop: 20,
        textAlign: 'center',
    },
    otpSub: {
        color: Colors.color_gray,
        fontSize: 16,
        fontFamily: Fonts.OpenSans600SemiBold,
        textAlign: 'center',
        marginBottom: 20
    },
    otpTimer: {
        color: Colors.color_dark_gray,
        fontSize: 27,
        // fontFamily: Fonts.OpenSans700,
        textAlign: 'center',
        fontFamily: Fonts.OpenSans500Medium
    },
    containerOTP: {
        flex: 1,
        paddingBottom: 300,
    },
    resendText: {
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: Fonts.OpenSans600SemiBold
    },
    resendButton: {
        color: '#2F6EFF',
        fontFamily: Fonts.OpenSans600SemiBold
    },
    listPainter: {
        borderWidth: 1,
        borderColor: Colors.color_gray,
        backgroundColor: Colors.color_light_gray,
        margin: 5,
        padding: 10,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    listPainterName: {
        marginLeft: 10,
        fontFamily: Fonts.OpenSans600SemiBold,
        fontSize: 15,
        color: Colors.color_gray,
        textTransform: 'capitalize'
    },
    inputSearch: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'red'
    },
    loaderApicall: {
        position: 'absolute',
        right: 10,
        top: 13,
        transform: 'scale(1.2)'
    },
    header: {
        fontSize: 16,
        fontFamily: Fonts.poppins500Medium,
        color: Colors.ui_dark_bg,
        textTransform: 'capitalize',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '5%'
    },



});






