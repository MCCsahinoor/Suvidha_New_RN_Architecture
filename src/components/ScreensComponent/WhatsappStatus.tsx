import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Colors, Fonts } from '../../themes';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import { GetWhatsappShareQrScanSummary } from '../../services/WhatsappStatus/WhatsappStatus.Service';
import { useTranslation } from 'react-i18next';
import { CommonToastModel } from '../../utils/ToastMessageModel';

export interface I_WhatsApp_Status {
    navigation: any;
    isDashboard: boolean;
}
interface IWhatsappData {
    TotalWhatsappShare: number;
    TotalWhatsappRead: number;
    TotalWhatsappDelivered: number;
    TotalQrScan: number;
    TotalUnicScan: number;
    TotalWhatsappShareConvertedLead: number;
}

const WhatsappStatus: FC<I_WhatsApp_Status> = ({ navigation, isDashboard }) => {
    const { t } = useTranslation();
    const [whatsappData, setWhatsappData] = useState({
        TotalWhatsappShare: 0,
        TotalWhatsappRead: 0,
        TotalWhatsappDelivered: 0,
        TotalQrScan: 0,
        TotalUnicScan: 0,
        TotalWhatsappShareConvertedLead: 0
    });

    const formatDateToISOString = (date: Date) => {
        return date.toISOString();
    };


    useEffect(() => {

        const currentDate = new Date();
        const fromDate = formatDateToISOString(currentDate);
        const toDate = formatDateToISOString(currentDate);

        const requestData = {
            from_date: '',
            to_date: '',
        };


        GetWhatsappShareQrScanSummary<typeof requestData, { data: IWhatsappData }>(requestData)
            .then((response) => {
                const responseData = response.data;
                setWhatsappData(responseData);
            })
            .catch((err) => {

                CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
            });
    }, []);


    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => navigation.navigate('WhatsappStatusPage')}
                style={styles.card}
            >
                <LinearGradient colors={['rgb(227,238,212)', 'rgba(107,144,113, 0.7)']} style={styles.linearGradient}>
                    <View style={{
                        paddingHorizontal: 4,
                        paddingVertical: 9,
                        // flex: 1
                    }}>

                        {isDashboard && (<Ionicons name='information-circle-outline' size={18} style={styles.thumbImageInfo} />)}
                        <Text style={styles.cardValue}>{whatsappData.TotalWhatsappShare}</Text>
                        <Text style={styles.wrapText}>{t("TotalWhatsappShare")}</Text>
                    </View>
                    <Image
                        source={require('../../assets/images/whatsapp.png')}
                        style={styles.thumbImage}
                    />
                </LinearGradient>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('WhatsappStatusPage')} style={styles.card}>
                <LinearGradient colors={['rgb(227,238,212)', 'rgba(107,144,113, 0.7)']} style={styles.linearGradient}>
                    <View style={{
                        paddingHorizontal: 4,
                        paddingVertical: 9,
                        //flex: 1
                    }}>

                        <Text style={styles.cardValue}>{whatsappData.TotalWhatsappDelivered}</Text>
                        <Text style={styles.wrapText}>{t("TotalDelivered")}</Text>
                    </View>
                    <Image
                        source={require('../../assets/images/whatsapp.png')}
                        style={styles.thumbImage}
                    />
                </LinearGradient>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('WhatsappStatusPage')} style={styles.card}>
                <LinearGradient colors={['rgb(227,238,212)', 'rgba(107,144,113, 0.7)']} style={styles.linearGradient}>
                    <View style={{
                        paddingHorizontal: 4,
                        paddingVertical: 9,
                        // flex: 1
                    }}>

                        <Text style={styles.cardValue}>{whatsappData.TotalWhatsappRead}</Text>
                        <Text style={styles.wrapText}>{t("TotalRead")}</Text>
                    </View>
                    <Image
                        source={require('../../assets/images/whatsapp.png')}
                        style={styles.thumbImage}
                    />
                </LinearGradient>
            </Pressable>

            <Pressable style={styles.card}>
                <LinearGradient colors={['rgb(227,238,212)', 'rgba(107,144,113, 0.7)']} style={styles.linearGradient}>
                    <View style={{
                        paddingHorizontal: 4,
                        paddingVertical: 9,
                        // flex: 1
                    }}>

                        <Text style={styles.cardValue}>{whatsappData.TotalUnicScan}</Text>
                        <Text style={styles.wrapText}>{t("TotalQRUniqueScan")}</Text>
                    </View>
                    <Image
                        source={require('../../assets/images/qr.png')}
                        style={styles.thumbImage}
                    />
                </LinearGradient>
            </Pressable>
            <Pressable style={styles.card}>
                <LinearGradient colors={['rgb(227,238,212)', 'rgba(107,144,113, 0.7)']} style={styles.linearGradient}>
                    <View style={{
                        paddingHorizontal: 4,
                        paddingVertical: 9,
                        // flex: 1
                    }}>

                        <Text style={styles.cardValue}>{whatsappData.TotalWhatsappShareConvertedLead}</Text>
                        <Text style={styles.wrapText}>{t("TotalLeadCount")}</Text>
                    </View>
                    <Image
                        source={require('../../assets/images/customer.png')}
                        style={styles.thumbImage}
                    />
                </LinearGradient>
            </Pressable>
        </View>
    );
};
export default WhatsappStatus;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 10,
        marginBottom: 15
    },
    linearGradient: {
        flex: 1,
        // paddingLeft: 15,
        //paddingRight: 15,
        borderRadius: 5,
        overflow: 'hidden',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingHorizontal: 4,
        //paddingVertical: 9,

    },
    wrapText: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 11,
        textAlign: 'center',
        fontFamily: Fonts.OpenSans600SemiBold,
        color: Colors.color_black
    },
    card: {
        overflow: 'hidden',
        width: '49%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    cardValue: {
        fontSize: 20,
        textAlign: 'center',
    },
    thumbImage: {
        height: 35,
        width: 35,
        position: 'absolute',
        left: -5,
        top: -5,
        opacity: 0.1,
    },
    thumbImageInfo: {
        position: 'absolute',
        right: 0,
        top: 0,
        opacity: 1,
    }

});
