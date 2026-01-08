/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Pressable, RefreshControl } from 'react-native';
import HeaderCurve from '../../components/HeaderCurve';
import { Colors, Fonts } from '../../themes';
import { DataTable } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { I_TokenScan } from '../../Interfaces/ScanToken.interface';
import { GetRedemptionPainterStatus, GetTokenRedemptionList } from '../../services/ScanToken/scantoken.service';
import { useSelector } from 'react-redux';
import NoDataFound from '../../components/NoDataFound';
import { I_Benefit_Details } from '../../Interfaces/benefit.interface';
import DynamicShimmerPlaceholder from '../../utils/dynamicShimmerPlaceholder';
import { useTranslation } from 'react-i18next';
import { ddmmyyyConverter } from '../../utils/formatDate';
import Svg, { Path, Polygon } from 'react-native-svg';
import { CommonToastModel } from '../../utils/ToastMessageModel';
import NoteIcon from '../../assets/svg/note';
import UserThreeIcon from '../../assets/svg/userThree';
import CallWhiteIcon from '../../assets/svg/callWhiteIcon';

const PointsStatement = ({ route, navigation }: any) => {
    const [refreshing, setRefreshing] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [PointStatementDetails, setPointStatementDetails] = useState<I_TokenScan.PointStatementDetails[]>([])
    const [PointStatementBillMonth, setPointStatementBillMonth] = useState<string>('');
    const [PainterDetails, setPainterDetails] = useState<I_TokenScan.I_GET_FOR_PAINTER_DETAILS_RESPONSE>();
    const [TotalPointTillDt, setTotalPointTillDt] = useState<any>(0)
    const [RewardDetails, setRewardDetails] = useState<any>(null)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
    }, []);

    useEffect(() => {
        if (refreshing == true) {
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            let fromMnt = today.getMonth() + 1 == 0 ? 12 : today.getMonth() + 1;
            let fromYear = today.getMonth() + 1 == 0 ? year - 1 : year;
            let PointStatementFromDate = ''
            let PointStatementToDate = ''
            let bill_month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(0, today.getMonth()));
            setPointStatementBillMonth(bill_month)
            if (Number(fromMnt) < 10) {
                PointStatementFromDate = fromYear + '-' + 0 + fromMnt + '-' + '01';
            } else {
                PointStatementFromDate = fromYear + '-' + fromMnt + '-' + '01';
            }
            let day = String(today.getDate()).padStart(2, '0');
            if (Number(month) < 10) {
                PointStatementToDate = year + '-' + 0 + month + '-' + day;
            } else {
                PointStatementToDate = year + '-' + month + '-' + day;
            } 
            setRefreshing(false)
            GetPointStatementDetails(PointStatementFromDate, PointStatementToDate);
            GetPainterDetails()
        }
    }, [refreshing])


    //========== For Page entry and exit ===========
    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            let fromMnt = today.getMonth() + 1 == 0 ? 12 : today.getMonth() + 1;
            let fromYear = today.getMonth() + 1 == 0 ? year - 1 : year;
            let PointStatementFromDate = ''
            let PointStatementToDate = ''
            let bill_month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(0, today.getMonth()));
            setPointStatementBillMonth(bill_month)
            if (Number(fromMnt) < 10) {
                PointStatementFromDate = fromYear + '-' + 0 + fromMnt + '-' + '01';
            } else {
                PointStatementFromDate = fromYear + '-' + fromMnt + '-' + '01';
            }
            let day = String(today.getDate()).padStart(2, '0');
            if (Number(month) < 10) {
                PointStatementToDate = year + '-' + 0 + month + '-' + day;
            } else {
                PointStatementToDate = year + '-' + month + '-' + day;
            }
            GetPointStatementDetails(PointStatementFromDate, PointStatementToDate);
            GetPainterDetails()
            return () => {
                // Do something when the screen is unfocused 
                // dispatch(isPageExit(false));
            };
        }, []),
    );

    const GetPainterDetails = () => {
        setShowLoader(true);
        // let temp_site_list: I_PrivateSite.DataFlagChanged[] = [];
        // setPainterDetails(null)
        GetRedemptionPainterStatus<any, I_TokenScan.I_GET_FOR_PAINTER_DETAILS_RESPONSE>({}).then((response) => {
            if (response.response_code == 1) {
                setPainterDetails(response)
            } else {
                CommonToastModel('error', response.response_message, 5000);
            }
        }).catch(err => {
            CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
            setShowLoader(false);

        })
    }

    const GetPointStatementDetails = (fromDate: string, toDate: string) => { 
        let TempTotalPointTillDt: any = 0
        let data = {
            FromDate: fromDate,
            ToDate: toDate
        }

        setShowLoader(true);
        // let temp_site_list: I_PrivateSite.DataFlagChanged[] = [];
        setPointStatementDetails([])
        setTotalPointTillDt(0)
        GetTokenRedemptionList<I_TokenScan.I_SEND_FOR_POINT_STATEMENT_RESPONSE, I_TokenScan.I_GET_FOR_POINT_STATEMENT_RESPONSE>(data).then((response) => {
            if (response.response_code == 1) {
                if (response && response.Data.TokenDetails && response.Data.TokenDetails.length > 0) {
                    setShowLoader(false);
                    setRefreshing(false);
                    setPointStatementDetails(response.Data.TokenDetails)
                    response.Data.TokenDetails.map(item => {
                        if (item.trx_point != null && item.trx_point != '' && item.trx_point != undefined) {
                            TempTotalPointTillDt = parseFloat(TempTotalPointTillDt) + parseFloat(item.trx_point)
                        }
                    })
                    setTotalPointTillDt(TempTotalPointTillDt)

                } else {
                    setPointStatementDetails([]);
                    setTotalPointTillDt(0)
                    setShowLoader(false);
                    setRefreshing(false);
                }

                if (response && response.Data.RewardDetails && response.Data.RewardDetails.length > 0) {
                    setRewardDetails(response.Data.RewardDetails[0]);
                } else {
                    setRewardDetails([])
                }
            } else {
                setShowLoader(false);
                setRefreshing(false);
                CommonToastModel('error', response.response_message, 5000);
            }
        }).catch(err => {
            setShowLoader(false);
            setRefreshing(false);
            CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);

        })
    }
    const { t } = useTranslation();
 
    


    return (
        <>
            <HeaderCurve
                topGaap={119}
                headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'}
                pageBackground={'#F2F2F2'}
            />
            <ScrollView style={{ backgroundColor: '#F2F2F2' }} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>{showLoader ? (
                <View style={{ width: '100%', paddingHorizontal: 15 }}>
                    <DynamicShimmerPlaceholder
                        borderRadius={5}
                        height={100}
                        width={'100%'}
                        count={7}
                    />
                </View>
            ) : (
                <>

                    {PainterDetails && PainterDetails != null &&
                        <View style={{ paddingHorizontal: 15 }}>
                            <View style={{ ...styles.cardWithBg }}>
                                {RewardDetails && RewardDetails != null &&
                                    <>
                                        <Text style={{ ...styles.statementAmount }}>{RewardDetails.basic_point != null && RewardDetails.basic_point !== 0 ? RewardDetails.basic_point : '0'}</Text>
                                        <Text style={{ ...styles.amountSubHeader }}>{t("pointsAccumulated")}</Text>
                                    </>
                                }
                                <View style={{ ...styles.cardWithBgSec }}>
                                    <View style={{ ...styles.cardWithBgSecRow, marginBottom: 3 }}>
                                        {/* <Text style={{ ...styles.cardText }}>#: {PainterDetails?.painter_code}</Text> */}
                                        <View style={{ ...styles.iconAlign }}>
                                            <NoteIcon width={10} height={12} />
                                            <Text style={{ ...styles.cardText, width: 500, marginLeft: 5 }} numberOfLines={3}>{PainterDetails?.dlr_dealer_name}</Text>
                                        </View>
                                    </View>
                                    {PainterDetails?.reps_name != '' &&
                                        <View style={{ ...styles.iconAlign }}>
                                            <View style={{ marginRight: 5, marginTop: -2, marginLeft: -2 }}>
                                                <UserThreeIcon width={13} height={13} />
                                            </View>
                                            <Text style={{ ...styles.cardText, marginBottom: 3 }}>{PainterDetails?.reps_name}</Text>
                                        </View>
                                    }
                                    {PainterDetails?.reps_mobile != '' &&
                                        <View style={{ ...styles.iconAlign }}> 
                                            <View style={{ marginRight: 5, marginTop: 1 }}>
                                                <CallWhiteIcon width={10} height={10} />
                                            </View>
                                            <Text style={styles.cardText}>{PainterDetails?.reps_mobile}</Text>
                                        </View>
                                    }

                                </View>

                            </View>
                        </View>
                    }
                    {PointStatementDetails && PointStatementDetails.length > 0 ? (
                        <>
                            <View style={{ backgroundColor: 'white', borderRadius: 10, paddingBottom: 5, marginTop: 20, marginHorizontal: 15 }}>
                                <DataTable >
                                    <DataTable.Header style={styles.head}>
                                        <DataTable.Title style={{ flex: 1 }} textStyle={styles.title}>{t("date")}</DataTable.Title>
                                        <DataTable.Title style={{ flex: 1.5 }} textStyle={styles.title}>{t("Product")}</DataTable.Title>
                                        <DataTable.Title style={{ flex: 2 }} textStyle={styles.title}>{t("token")}</DataTable.Title>
                                        {/* <DataTable.Title style={{ flex: 1 }} textStyle={styles.title}>Volume</DataTable.Title> */}
                                        <DataTable.Title style={{ flex: 1 }} textStyle={styles.title} numeric>{t("Points")}</DataTable.Title>
                                    </DataTable.Header>
                                    <DataTable.Row style={{ ...styles.tableRowStyle }}>
                                        <DataTable.Cell style={{ display: 'flex', flex: 6, width: '100%', minHeight: 30 }}>
                                            <View style={{ backgroundColor: Colors.ui_ultra_light_bg, position: 'absolute', padding: 10, top: -2, left: '-6%', width: '112%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                                <Text style={{ color: Colors.ui_dark_bg, fontSize: 10, fontFamily: Fonts.OpenSans700Bold }}>FY: {PointStatementDetails[0].fin_yr}</Text>
                                                <View style={{ position: 'absolute', left: 0, bottom: -9, }}>
                                                    <Svg width={9} height={9}>
                                                        <Polygon points="0,0 100,0 90,100" fill="#7A8C8D" />
                                                    </Svg>
                                                </View>
                                                <View style={{
                                                    position: 'absolute', right: 0, bottom: -9, transform: [
                                                        { rotateY: '180deg' }
                                                    ],
                                                }}>
                                                    <Svg width={9} height={9}>
                                                        <Polygon points="0,0 100,0 90,100" fill="#7A8C8D" />
                                                    </Svg>
                                                </View>
                                            </View>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                    {PointStatementDetails.map((item: I_TokenScan.PointStatementDetails, index: any) => {
                                        return (
                                            <DataTable.Row style={{ ...styles.row }} key={index}>
                                                <DataTable.Cell style={{ ...styles.customCell, flex: 1 }} textStyle={styles.colTitle}>{ddmmyyyConverter(item.trx_date, 'DD-MM')}</DataTable.Cell>
                                                <DataTable.Cell style={{ ...styles.customCell, flex: 1.5 }} textStyle={styles.colTitle}><Text style={styles.colTitle}>{item.trx_product}</Text></DataTable.Cell>
                                                <DataTable.Cell style={{ ...styles.customCell, flex: 2 }} textStyle={styles.colTitle}><Text style={styles.colTitle}>{item.trx_token}</Text></DataTable.Cell>
                                                {/* <DataTable.Cell style={{ ...styles.customCell, flex: 1 }} textStyle={styles.colTitle} numeric>{item.trx_volume}</DataTable.Cell> */}
                                                <DataTable.Cell style={{ ...styles.customCell, flex: 1, paddingRight: 10 }} textStyle={styles.colTitle} numeric>{item.trx_point}</DataTable.Cell>
                                            </DataTable.Row>

                                        )
                                    })}

                                    {TotalPointTillDt != null && TotalPointTillDt != undefined && TotalPointTillDt != 0 &&
                                        <>
                                            <DataTable.Row style={{ ...styles.row, backgroundColor: Colors.ui_dark_bg, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                                <DataTable.Cell style={{ ...styles.customCell, flex: 5 }} textStyle={styles.colTotalTitle}>{t('Totalpointstilldate')}</DataTable.Cell>
                                                <DataTable.Cell style={{ ...styles.customCell, flex: 1, paddingRight: 15 }} textStyle={styles.colTotalTitle} numeric>{TotalPointTillDt.toFixed(2)}</DataTable.Cell>
                                            </DataTable.Row>

                                        </>
                                    }
                                </DataTable>

                            </View>
                            {RewardDetails && RewardDetails != null &&
                                <View style={{ borderRadius: 10, paddingBottom: 5, marginHorizontal: 15, marginBottom: 50, marginTop: 20 }}>
                                    <View style={{ backgroundColor: 'white' }}>
                                        <DataTable>
                                            <DataTable.Header style={styles.headTwo}>
                                                <DataTable.Title style={{ flex: 1, justifyContent: 'center' }} textStyle={styles.title}>Q1</DataTable.Title>
                                                <DataTable.Title style={{ flex: 1, justifyContent: 'center' }} textStyle={styles.title}>Q2</DataTable.Title>
                                                <DataTable.Title style={{ flex: 1, justifyContent: 'center' }} textStyle={styles.title}>Q3</DataTable.Title>
                                                <DataTable.Title style={{ flex: 1, justifyContent: 'center' }} textStyle={styles.title}>Q4</DataTable.Title>
                                            </DataTable.Header>
                                            <DataTable.Row style={{ ...styles.tableRowStyle }}>
                                                <DataTable.Cell style={{ display: 'flex', flex: 6, width: '100%', minHeight: 30 }}>
                                                    <View style={{ backgroundColor: Colors.ui_ultra_light_bg, position: 'absolute', padding: 10, top: -2, left: '-6%', width: '112%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                                        <Text style={{ color: Colors.ui_dark_bg, fontSize: 10, fontFamily: Fonts.OpenSans700Bold }}>{t('DhamakaBonus')}</Text>
                                                        <View style={{ position: 'absolute', left: 0, bottom: -9, }}>
                                                            <Svg width={9} height={9}>
                                                                <Polygon points="0,0 100,0 90,100" fill="#7A8C8D" />
                                                            </Svg>
                                                        </View>
                                                        <View style={{
                                                            position: 'absolute', right: 0, bottom: -9, transform: [
                                                                { rotateY: '180deg' }
                                                            ],
                                                        }}>
                                                            <Svg width={9} height={9}>
                                                                <Polygon points="0,0 100,0 90,100" fill="#7A8C8D" />
                                                            </Svg>
                                                        </View>
                                                    </View>
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                            <DataTable.Row style={{ ...styles.rowTwo }}>
                                                <DataTable.Cell style={{ flex: 1, justifyContent: 'center' }} textStyle={styles.colTitle}>{RewardDetails.qtr1_point != 0 ? RewardDetails.qtr1_point : '-'}</DataTable.Cell>
                                                <DataTable.Cell style={{ flex: 1, justifyContent: 'center' }} textStyle={styles.colTitle}>{RewardDetails.qtr2_point != 0 ? RewardDetails.qtr2_point : '-'}</DataTable.Cell>
                                                <DataTable.Cell style={{ flex: 1, justifyContent: 'center' }} textStyle={styles.colTitle}>{RewardDetails.qtr3_point != 0 ? RewardDetails.qtr3_point : '-'}</DataTable.Cell>
                                                <DataTable.Cell style={{ flex: 1, justifyContent: 'center' }} textStyle={styles.colTitle}>{RewardDetails.qtr4_value != 0 ? RewardDetails.qtr4_value : '-'}</DataTable.Cell>
                                            </DataTable.Row>
                                        </DataTable>
                                    </View>
                                </View>

                            }
                        </>
                    ) : (
                        <View style={{ marginTop: 20 }}>
                            <NoDataFound content={t('No data found')}></NoDataFound>
                        </View>
                    )}
                </>
            )}
            </ScrollView>
        </>
    );
};

export default PointsStatement;

const styles = StyleSheet.create({
    cardWithBg: {
        backgroundColor: Colors.ui_dark_bg,
        padding: 10,
        borderRadius: 8
    },
    statementAmount: {
        color: Colors.color_white,
        fontSize: 36,
        fontFamily: Fonts.OpenSans600SemiBold
    },
    cardWithBgSec: {
        backgroundColor: '#70969A',
        borderRadius: 8,
        padding: 8,
        marginTop: 10,
    },
    amountSubHeader: {
        color: Colors.color_white,
        fontSize: 14,
        fontFamily: Fonts.OpenSans600SemiBold
    },
    cardWithBgSecRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardText: {
        color: Colors.color_white,
        fontSize: 13,
        fontFamily: Fonts.OpenSans600SemiBold
    },
    iconAlign: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    head: {
        // backgroundColor: '#86A5A8',
        // paddingLeft: 9,
        // paddingRight: 0
        paddingHorizontal: 10,
        backgroundColor: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins600SemiBold,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 35,
    },
    headTwo: {
        paddingHorizontal: 0,
        backgroundColor: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins600SemiBold,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 35,
    },
    title: {
        color: 'white',
        fontSize: 12,
        height: 35,
        paddingTop: 0,
        marginTop: -5,
        fontFamily: Fonts.poppins700Bold,
        paddingRight: 5,
        letterSpacing: 0.2,
        textAlign: 'center'
    },
    colTitle: {
        color: 'black',
        fontSize: 11,
        fontFamily: Fonts.OpenSans600SemiBold,
    },
    row: {
        paddingLeft: 9,
        paddingRight: 0,
        minHeight: 30,
        paddingHorizontal: 10,
        borderBottomColor: '#3F7A80',
    },
    rowTwo: {
        paddingLeft: 0,
        paddingRight: 0,
        minHeight: 30,
        paddingHorizontal: 10,
        borderBottomColor: '#3F7A80',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    customCell: {
        // height: 20,
    },
    colTotalTitle: {
        fontSize: 10,
        paddingRight: 5,
        color: Colors.color_white,
        fontFamily: Fonts.OpenSans700Bold,
    },
    tableRowStyle: {
        minHeight: 30,
        paddingHorizontal: 10,
        borderBottomColor: '#3F7A80',
    },
});
