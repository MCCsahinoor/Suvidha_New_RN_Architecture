import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { I_Benefit_Details } from '../../../Interfaces/benefit.interface';
import { useTranslation } from 'react-i18next';
import { Svg, Polygon } from 'react-native-svg';
import { Fonts } from '../../../themes';
import { Colors } from '../../../themes';
import { formatNumberWithCommas } from '../../../utils/INRConverter';

interface BusinessDetailsDataProps {
    GetBusinessDetails: I_Benefit_Details.BusinessDetails;
}

const BusinessDetailsData: React.FC<BusinessDetailsDataProps> = ({ GetBusinessDetails }) => {
    const { t } = useTranslation();

    return (
        <View style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 30 }}>
            <DataTable >
                <DataTable.Header style={{ ...styles.TableHeader, }}>
                    <DataTable.Title style={{ flex: 2.5 }} textStyle={styles.title}>
                        {t("Business")}
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 1.5 }} textStyle={styles.title} numeric>
                        {t("Received")}
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 1.8 }} textStyle={styles.title} numeric>
                        {t("Converted")}
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 2 }} textStyle={styles.title} numeric>
                        {t("JobValue")} (₹)
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 1 }} textStyle={styles.title} numeric>
                        {t("Csat")}
                    </DataTable.Title>
                </DataTable.Header>
                <DataTable.Row style={{ ...styles.tableRowStyle }}>
                    <DataTable.Cell style={{ display: 'flex', flex: 6, width: '100%', minHeight: 30 }}>
                        <View style={{ backgroundColor: Colors.ui_ultra_light_bg, position: 'absolute', padding: 10, top: -2, left: '-6%', width: '112%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ color: Colors.ui_dark_bg, fontSize: 10, fontFamily: Fonts.OpenSans700Bold }}>** {t("LastUpdatedOn")}: {GetBusinessDetails.data_as_on_date}</Text>
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

                <DataTable.Row style={{ ...styles.tableRowStyle }}>
                    <DataTable.Cell style={{ flex: 2.5, }}>
                        <Text style={{ ...styles.wrapText, paddingTop: 5, paddingBottom: 5 }}>{GetBusinessDetails.bgl_Business}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1.5 }} textStyle={styles.colTitle} numeric>
                        {GetBusinessDetails.bgl_Received != 0 ? GetBusinessDetails.bgl_Received : '-'}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1.8 }} textStyle={styles.colTitle} numeric>
                        {GetBusinessDetails.bgl_Converted != 0 ? GetBusinessDetails.bgl_Converted : '-'}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 2 }} textStyle={styles.colTitle} numeric>
                        {GetBusinessDetails.bgl_Job_Value != 0 ? formatNumberWithCommas(GetBusinessDetails.bgl_Job_Value) : '-'}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1 }} textStyle={styles.colTitle} numeric>
                        {GetBusinessDetails.bgl_Csat != 0 ? GetBusinessDetails.bgl_Csat : '-'}
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={{ ...styles.tableRowStyle }}>
                    <DataTable.Cell style={{ flex: 2.5, }}>
                        <Text style={{ ...styles.wrapText }}>{GetBusinessDetails.ol_Business}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1.5 }} textStyle={styles.colTitle} numeric>
                        {GetBusinessDetails.ol_Received != 0 ? GetBusinessDetails.bgl_Received : '-'}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1.8 }} textStyle={styles.colTitle} numeric>
                        {GetBusinessDetails.ol_Converted != 0 ? GetBusinessDetails.ol_Converted : '-'}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 2 }} textStyle={styles.colTitle} numeric>
                        {GetBusinessDetails.ol_Job_Value != 0 ? formatNumberWithCommas(GetBusinessDetails.ol_Job_Value) : '-'}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1 }} textStyle={styles.colTitle} numeric>
                        {GetBusinessDetails.ol_Csat != 0 ? GetBusinessDetails.ol_Csat : '-'}
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={{ backgroundColor: Colors.ui_dark_bg, ...styles.tableRowStyle, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                    <DataTable.Cell style={{ flex: 2.5 }} textStyle={{ ...styles.colTotalTitle, }}>{GetBusinessDetails.tot_Business}</DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1.5 }} textStyle={{ ...styles.colTotalTitle, }} numeric>
                        {GetBusinessDetails.tot_Received != 0 ? GetBusinessDetails.tot_Received : '-'}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1.8 }} textStyle={{ ...styles.colTotalTitle, }} numeric>
                        {GetBusinessDetails.tot_Converted != 0 ? GetBusinessDetails.tot_Converted : '-'}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 2 }} textStyle={{ ...styles.colTotalTitle, }} numeric>
                        {GetBusinessDetails.tot_Job_Value != 0 ? formatNumberWithCommas(GetBusinessDetails.tot_Job_Value) : '-'}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1 }} textStyle={{ ...styles.colTotalTitle, }} numeric>
                        {GetBusinessDetails.tot_Csat != 0 ? GetBusinessDetails.tot_Csat : '-'}
                    </DataTable.Cell>
                </DataTable.Row>

            </DataTable>
        </View>
    );
};

export default BusinessDetailsData;


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


});