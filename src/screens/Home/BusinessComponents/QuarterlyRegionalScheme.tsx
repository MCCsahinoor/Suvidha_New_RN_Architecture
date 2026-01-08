import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AppImages, Colors, Fonts } from '../../../themes';
import { IConsistencyBonusDetails, InsigniaClubAnnualDetail } from '../../../Interfaces/benefit.interface';
import { ddmmyyyConverter } from '../../../utils/formatDate';
import { Svg, Polygon } from 'react-native-svg';
import { formatNumberWithCommas } from '../../../utils/INRConverter';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface quarterlyRegionalSchemeProps {
    quarterlyRegionalScheme: any;
    openRewardModal: (trip: any) => void;
}

const QuarterlyRegionalScheme: React.FC<quarterlyRegionalSchemeProps> = ({ quarterlyRegionalScheme, openRewardModal }) => {
    const { t } = useTranslation();

    const slideAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        // Start the sliding border animation loop
        Animated.loop(
            Animated.sequence([
                Animated.timing(slideAnim, {
                    toValue: 350,
                    duration: 5000,
                    useNativeDriver: false,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 5000,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, [slideAnim]);


    return (
        <View style={{ backgroundColor: Colors.ui_dark_bg, borderRadius: 10, marginTop: 30 }}>
            <View style={styles.container}>
                <View style={styles.ribbon}>
                    <Text style={styles.ribbonText}>NEW</Text>
                </View>
                <View style={{ position: 'absolute', left: 0, bottom: -9, }}>
                    <Svg width={5.5} height={9}>
                        <Polygon points="0,0 100,0 90,100" fill="#F99E00" />
                    </Svg>
                </View>
            </View>
            <View style={{ overflow: 'hidden' }}>
                <Animated.View
                    style={[
                        { transform: [{ rotate: '15deg' }] },
                        styles.animatedBorder,
                        { left: slideAnim },
                    ]}
                />
                <Text style={{ fontSize: 11.5, fontFamily: Fonts.poppins600SemiBold, textAlign: 'center', marginVertical: 10, marginBottom: 5, color: Colors.color_white }}>
                    Quarterly Regional Scheme
                </Text>
            </View>
            <DataTable>
                <DataTable.Header style={{ ...styles.TableHeader, }}>
                    <DataTable.Title style={{ flex: 2.5 }} textStyle={styles.title}>
                        Details
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
                    <DataTable.Title style={{ flex: 1.2, }} textStyle={styles.title} numeric>Action</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row style={{
                    ...styles.tableRowStyle,
                    backgroundColor: Colors.color_white,
                    height: 40,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderBottomWidth: 0
                }}>
                    <DataTable.Cell style={{ flex: 2.5 }}>
                        <Text style={{ ...styles.wrapText, paddingTop: 5, paddingBottom: 5 }}>Regional Scheme</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1.5, }} textStyle={styles.colTitle}>
                        -
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1.8, }} textStyle={styles.colTitle}>
                        -
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1.5 }} textStyle={styles.colTitle} numeric>
                        {quarterlyRegionalScheme.advnc != 0 ? formatNumberWithCommas(quarterlyRegionalScheme.advnc) : '-'}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1.2, }} textStyle={{ ...styles.colTitle, textAlign: 'center' }}>
                        <Pressable onPress={() => openRewardModal(quarterlyRegionalScheme)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="arrow-forward-outline" size={15} style={{ color: Colors.color_black }} />
                        </Pressable>
                    </DataTable.Cell>
                </DataTable.Row>

            </DataTable>
        </View>
    );
};

export default QuarterlyRegionalScheme;


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
        fontFamily: Fonts.OpenSans500Medium
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
        width: 50,
        height: 100,
        backgroundColor: '#FFF',
        opacity: 0.2,
        zIndex: 5,
        top: -10
    },

    container: {
        position: 'absolute',
        // top: -2,
        // left: -22,
        // transform: [{ rotate: '-45deg' }, { scale: 0.8 }],
        top: 10,
        zIndex: 10,
        left: -5,
    },
    ribbon: {
        backgroundColor: '#FBCE4C', // yellow/gold shade
        paddingVertical: 2,
        paddingHorizontal: 15,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 2,
    },
    ribbonText: {
        color: '#8B0000', // dark red
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'center',
    },
});