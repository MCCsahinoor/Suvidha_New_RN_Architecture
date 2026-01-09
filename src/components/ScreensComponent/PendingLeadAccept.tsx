import React, { FC, useEffect, useState } from 'react';
import { AppImages, Colors, Fonts } from '../../themes';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


const PendingLeadAcceptCard: FC<any> = ({ navigation }) => {
    const { t } = useTranslation();
    const { status, error, pendingLeads } = useSelector((state: any) => state.PendingLeadsData);

    return (
        <> 
            {pendingLeads && pendingLeads.length > 0 && (
                <Pressable onPress={() => navigation.navigate('NewLeads')} >
                    <View style={{ margin: 15 }}>
                        <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['rgb(240,213,109)', 'rgb(205,167,15)']} style={{ borderRadius: 8 }}>
                            <View style={{ ...styles.newLeadsCard }}>
                                <Text style={{ ...styles.newLeadsCardText }}>{t("Pendingleadstoaccept")}</Text>
                                <View style={{ ...styles.leadsCard }}>
                                    <Text style={{ ...styles.newLeadsCardText }}>{pendingLeads.length ?? 0}</Text>
                                </View>
                                <LottieView source={{ uri: AppImages.LottyConfetti }} style={{ ...styles.leadsCardLotty }} autoPlay loop />
                            </View>
                        </LinearGradient>
                    </View>
                </Pressable>
            )}
        </>

    );
};
export default PendingLeadAcceptCard;

const styles = StyleSheet.create({
    newLeadsCardText: {
        fontFamily: Fonts.OpenSans600SemiBold,
    },
    leadsCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.50)',
        width: 30,
        height: 30,
        position: 'absolute',
        right: 10,
        top: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 100,
        alignItems: 'center',
        alignContent: 'center'
    },
    leadsCardLotty: {
        width: 160,
        height: 160,
        transform: 'scale(2)',
        position: 'absolute',
        right: 0,
    },
    newLeadsCard: {
        // backgroundColor: 'rgb(159,207,183)',
        // margin: 15,
        textAlign: 'center',
        padding: 15,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
        overflow: 'hidden'
    },

});
