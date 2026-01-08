import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AppImages, Colors, Fonts } from '../../../themes';
import { InsigniaClubAnnualDetail } from '../../../Interfaces/benefit.interface';
import { ddmmyyyConverter } from '../../../utils/formatDate';
import { Svg, Polygon } from 'react-native-svg';
import { formatNumberWithCommas } from '../../../utils/INRConverter';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
interface InsigniaClubQualificationProps {
    insigniaDetails: InsigniaClubAnnualDetail[];
    openRewardModal: (trip: any) => void;
}

const InsigniaClubQualification: React.FC<InsigniaClubQualificationProps> = ({ insigniaDetails, openRewardModal }) => {
    const { t } = useTranslation();

    return (
        <View style={{ backgroundColor: Colors.ui_superSoft_light_bg, borderRadius: 10, marginTop: 30 }}>
            <Text style={{ fontSize: 11.5, fontFamily: Fonts.poppins600SemiBold, textAlign: 'center', marginVertical: 10, marginBottom: 5, color: Colors.ui_dark_bg }}>Insignia Club Qualification</Text>
            <DataTable>
                <DataTable.Header style={{ ...styles.TableHeader }}>
                    {/* <DataTable.Title style={{ flex: 1, }} textStyle={{ ...styles.title, textAlign: 'left' }}> - </DataTable.Title> */}
                    <DataTable.Title style={{ flex: 1, }} textStyle={styles.title}>
                        {t("vol")}
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 3 }} textStyle={styles.title}>
                        {t("QualifiedforAnnualReward")}
                    </DataTable.Title >
                    <DataTable.Title style={{ flex: 1, }} textStyle={{ ...styles.title, paddingLeft: 10 }}>
                        {t("Trip")}
                    </DataTable.Title>
                </DataTable.Header>

                {/* <DataTable.Row style={{ ...styles.tableRowStyle }}>
                    <DataTable.Cell style={{ flex: 1, }} >
                        <View style={{ backgroundColor: Colors.ui_ultra_light_bg, position: 'absolute', padding: 10, top: -2, left: '-6%', width: '112%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ color: Colors.ui_dark_bg, fontSize: 10, fontFamily: Fonts.OpenSans700Bold }}>** {t("LastUpdatedOn")}: {insigniaDetails[0].data_as_on_date} </Text>
                            <View style={{ position: 'absolute', left: 0, bottom: -6.9, }}>
                                <Svg width={9} height={9}>
                                    <Polygon points="0,0 100,0 90,100" fill="#7A8C8D" />
                                </Svg>
                            </View>
                            <View style={{
                                position: 'absolute', right: 0, bottom: -6.9, transform: [{ rotateY: '180deg' }]
                            }}>
                                <Svg width={9} height={9}>
                                    <Polygon points="0,0 100,0 90,100" fill="#7A8C8D" />
                                </Svg>
                            </View>
                        </View>
                    </DataTable.Cell>
                </DataTable.Row> */}

                {insigniaDetails.map((item, index) => (
                    <DataTable.Row key={index} style={{
                        ...styles.tableRowStyle,
                        backgroundColor: Colors.color_white,
                        height: 40,
                        ...(index === insigniaDetails.length - 1 && {
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            borderBottomWidth: 0
                        })
                    }}>
                        {/* <DataTable.Cell style={{ flex: 1, }} textStyle={{ ...styles.colTitle, textAlign: 'left' }}> - </DataTable.Cell> */}
                        <DataTable.Cell style={{ flex: 1 }} textStyle={styles.colTitle}>
                            {item.insignia_annual_volume ? item.insignia_annual_volume.toLocaleString() : '-'}
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 3 }} textStyle={styles.colTitle}>
                            {item.qualified_for_annual_reward || '-'}
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1 }} textStyle={styles.colTitle}>
                            {/* {item.ticket || '-'} */}
                            {item.ticket ?
                                <Pressable onPress={() => openRewardModal(item.ticket)} style={{ height: 60, position: 'absolute', top: -5, right: 5, transform: [{ scale: 0.9 }] }} >
                                    <LottieView
                                        source={require('../../../assets/lotty/travel_two.json')}
                                        style={{ width: 50, height: 50, transform: 'scale(1.3)' }}
                                        autoPlay
                                        loop
                                    />
                                </Pressable> : <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 10, paddingLeft: 10, textAlign: 'center' }}>-</Text>}
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}

                {insigniaDetails.length === 0 && (
                    <DataTable.Row style={{
                        ...styles.tableRowStyle,
                        backgroundColor: Colors.color_white,
                        height: 40,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderBottomWidth: 0
                    }}>
                        <DataTable.Cell style={{ flex: 1 }} textStyle={{ ...styles.colTitle, textAlign: 'center' }}>-</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 3 }} textStyle={{ ...styles.colTitle, textAlign: 'center' }}>-</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1 }} textStyle={{ ...styles.colTitle, textAlign: 'center' }}>-</DataTable.Cell>
                    </DataTable.Row>
                )}

                {/* <DataTable.Row style={{ backgroundColor: Colors.ui_dark_bg, ...styles.tableRowStyle, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                    <DataTable.Cell style={{ flex: 1 }} textStyle={{ ...styles.colTotalTitle, textAlign: 'left' }}>Total</DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1 }} textStyle={{ ...styles.colTotalTitle }}>
                        {insigniaDetails.reduce((total, item) => total + (item.insignia_annual_volume || 0), 0).toLocaleString()}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 3, }} textStyle={{ ...styles.colTotalTitle }}> </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1, }} textStyle={{ ...styles.colTotalTitle }}> </DataTable.Cell>
                </DataTable.Row> */}
            </DataTable>
        </View>
    );
};

export default InsigniaClubQualification;


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
        textAlign: 'center',
        width: '100%',
    },
    colTitle: {
        color: 'black',
        fontSize: 9,
        fontFamily: Fonts.OpenSans500Medium,
        textAlign: 'center',
        width: '100%',
    },
    colTotalTitle: {
        fontSize: 9.7,
        color: Colors.color_white,
        fontFamily: Fonts.OpenSans700Bold,
        textAlign: 'center',
        width: '100%',
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


});