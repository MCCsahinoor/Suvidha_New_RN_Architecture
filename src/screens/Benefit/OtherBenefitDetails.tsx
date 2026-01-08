import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import HeaderCurve from '../../components/HeaderCurve';
import { Colors, Fonts } from '../../themes';
import styles from './style';
import Card from '../../components/Card';
import AttendanceIcon from '../../assets/svg/AttendanceIcon.svg';
import NoDataFound from '../../components/NoDataFound';
import {
    SchemeDetailsDto,
    I_Benefit_Details

} from '../../Interfaces/benefit.interface';

const OtherBenefitDetails = ({ route, navigation }: any) => {
    const { responseData } = route.params;
    const [benefitDetails, setBenefitDetails] = useState<I_Benefit_Details.SchemeDetails[]>([SchemeDetailsDto])

    useEffect(() => {
        setBenefitDetails(responseData)
    }, [responseData])


    return (
        <>
            <HeaderCurve
                topGaap={119}
                headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'}
                pageBackground={'#F2F2F2'}
            />
            <ScrollView style={{ backgroundColor: '#F2F2F2' }}>
                <View style={{ padding: 15, }}>
                    {benefitDetails && benefitDetails.length > 0 ? (
                        benefitDetails.map((item, index) => {
                            return (
                                <View style={{ marginBottom: 15 }} key={index}>
                                    <Card>
                                        <View style={{ minHeight: 150, backgroundColor: Colors.ui_dark_bg }}>
                                            <View style={{ ...styles.attendanceWrapper, alignItems: 'flex-start', backgroundColor: Colors.color_white, borderBottomRightRadius: 9, borderBottomLeftRadius: 9 }}>
                                                <View style={{ width: '15%' }}>
                                                    <View style={{ ...styles.attendanceIcon }}>
                                                        <AttendanceIcon />
                                                    </View>
                                                </View>
                                                <View
                                                    style={{
                                                        ...styles.attendanceContent,
                                                        width: '85%',
                                                        paddingLeft: 15,
                                                    }}>
                                                    <View style={{ paddingRight: 10, flex: 1 }}>
                                                        <View style={{ paddingBottom: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            <Text style={{ ...styles.textId }}>{item.Scheme_Id}</Text>
                                                            {item.Status.toLowerCase() == 'pending' ?
                                                                (<View style={{ ...styles.pendingGroup }}>
                                                                    <Text style={{ ...styles.pending }}>{item.Status}</Text>
                                                                </View>) :
                                                                item.Status.toLowerCase() == 'sent to dealer' ?
                                                                    (<View style={{ ...styles.sendtoDealerGrp }}>
                                                                        <Text style={{ ...styles.sendtoDealer }}>{item.Status}</Text>
                                                                    </View>) :
                                                                    (<View style={{ ...styles.redeemedGrp }}>
                                                                        <Text style={{ ...styles.redeemed }}>{item.Status}</Text>
                                                                    </View>)}
                                                        </View>
                                                        <View
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                paddingBottom: 10,
                                                            }}>
                                                            <Text style={{ ...styles.textBold }}>Scheme:</Text>
                                                            <Text style={{ ...styles.paraText }}>{((item.Scheme_Name ?? '') != '') ? item.Scheme_Name : '-'}</Text>
                                                        </View>
                                                        <View
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                paddingBottom: 10,
                                                            }}>
                                                            <Text style={{ ...styles.textBold }}>Reward:</Text>
                                                            <Text style={{ ...styles.paraText }}>{item.Reward}</Text>
                                                        </View>
                                                    </View>
                                                </View>

                                            </View>
                                            <View style={{
                                                display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10,
                                            }}>
                                                <View style={{
                                                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
                                                }}>
                                                    <Text style={{ color: Colors.color_white, paddingRight: 5, fontFamily: Fonts.OpenSans300Light }}>End date:</Text>
                                                    <Text style={{ color: Colors.color_white, fontFamily: Fonts.OpenSans600SemiBold }}>{item.End_Date}</Text>
                                                </View>
                                                <View style={{
                                                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
                                                }}>
                                                    <Text style={{ color: Colors.color_white, paddingRight: 5, fontFamily: Fonts.OpenSans300Light }}>Qty:</Text>
                                                    <Text style={{ color: Colors.color_white, fontFamily: Fonts.OpenSans600SemiBold }}>{item.Qty}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </Card>
                                </View>
                            )
                        })
                    ) : (
                        <View style={{ marginVertical: 10 }}>
                            <NoDataFound content={'No'}></NoDataFound>
                        </View>
                    )}

                </View>
            </ScrollView >
        </>
    )
}

export default OtherBenefitDetails;