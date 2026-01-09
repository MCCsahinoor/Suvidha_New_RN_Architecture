import React, { useEffect, useState } from "react";
import HeaderCurve from "../../components/HeaderCurve";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors, Fonts } from "../../themes";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CommonToastModel } from "../../utils/ToastMessageModel";
import { GetScoreDetails } from "../../services/Profile/Profile.services";
import { I_SCORE_DETAILS } from "../../Interfaces/score.interface";
import { ddmmyyyConverter } from "../../utils/formatDate";
import DynamicShimmerPlaceholder from "../../utils/dynamicShimmerPlaceholder";

const ScoreDetails = () => {

    const [scoreDetails, setScoreDetails] = useState<I_SCORE_DETAILS>([] as unknown as I_SCORE_DETAILS);
    const [isApiCall, setIsApiCall] = useState(false);

    useEffect(() => {
        setIsApiCall(true)
        GetScoreDetails().then((response: any) => {
            if (response && response.data) {
                setIsApiCall(false)
                setScoreDetails(response.data)
            } else {
                setIsApiCall(false)
                setScoreDetails([] as unknown as I_SCORE_DETAILS)
            }
        }).catch(err => {
            setIsApiCall(false)
            CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
        });
    }, []);

    return (
        <>
            <HeaderCurve topGaap={119} headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'} pageBackground={'#F2F2F2'} />

            <ScrollView>
                {!isApiCall && (
                    <>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 10, paddingRight: 20 }}>
                            <Ionicons name='information-circle-outline' size={14} style={styles.thumbImageInfo} />
                            <Text style={{ fontSize: 11 }}>
                                Last Update On: {scoreDetails.last_updated_date ? ddmmyyyConverter(scoreDetails.last_updated_date, 'DD/MM/YYYY LT') : '-'}
                            </Text>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <LinearGradient colors={['#3E797F00', '#3E797F', '#3E797F00']} useAngle={true} angle={90} start={{ x: 0.1, y: 0.9 }} end={{ x: 0.1, y: 0.9 }} locations={[0.1, 1, 1]} style={{ width: '25%', height: 32 }} />
                            <View style={{ padding: 5, backgroundColor: '#3E797F', height: 32, paddingHorizontal: 10, width: '50%' }}>
                                <Text style={{ textAlign: 'center', color: Colors.color_white, fontSize: 14, fontFamily: Fonts.poppins500Medium }}>
                                    Buisness (Score {scoreDetails.business_score ?? '0'})
                                </Text>
                            </View>
                            <LinearGradient colors={['#3E797F00', '#3E797F', '#3E797F00']} useAngle={true} angle={-90} start={{ x: 0.1, y: 0.9 }} end={{ x: 0.1, y: 0.9 }} locations={[0.1, 1, 1]} style={{ width: '25%', height: 32 }} />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 20, paddingHorizontal: 20, paddingTop: 20 }}>
                            <View style={{ flex: 1, }}>
                                <LinearGradient colors={['rgb(227,238,212)', 'rgba(107,144,113, 0.7)']} style={{ borderRadius: 5, flex: 1, }}>
                                    <View style={[styles.linearGradient]}>
                                        <Image source={require('../../assets/images/review.png')} style={styles.thumbImage} />
                                        <Text style={styles.cardValue}>L&W Points</Text>
                                        <Text style={styles.wrapText}>
                                            {scoreDetails.lw_points ?? '0'}
                                        </Text>
                                    </View>
                                </LinearGradient>
                            </View>
                            <View style={{ flex: 1, borderRadius: 10 }}>
                                <LinearGradient style={{ borderRadius: 5, flex: 1, }}
                                    colors={['rgb(227,238,212)', 'rgba(107,144,113, 0.7)']}>
                                    <View style={[styles.linearGradient]}>
                                        <Image source={require('../../assets/images/phasing-state.png')} style={styles.thumbImage} />
                                        <Text style={styles.cardValue}>Status</Text>
                                        <Text style={{ ...styles.wrapText }}>
                                            {scoreDetails.painter_status ?? '-'}
                                        </Text>
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 }}>
                            <LinearGradient colors={['#3E797F00', '#3E797F', '#3E797F00']} useAngle={true} angle={90} start={{ x: 0.1, y: 0.9 }} end={{ x: 0.1, y: 0.9 }} locations={[0.1, 1, 1]} style={{ width: '20%', height: 32 }} />
                            <View style={{ padding: 5, backgroundColor: '#3E797F', height: 32, paddingHorizontal: 10, width: '60%' }}>
                                <Text style={{ textAlign: 'center', color: Colors.color_white, fontSize: 14, fontFamily: Fonts.poppins500Medium }}>
                                    Conversion (Score {scoreDetails.conversion_score ?? '0'})
                                </Text>
                            </View>
                            <LinearGradient colors={['#3E797F00', '#3E797F', '#3E797F00']} useAngle={true} angle={-90} start={{ x: 0.1, y: 0.9 }} end={{ x: 0.1, y: 0.9 }} locations={[0.1, 1, 1]} style={{ width: '20%', height: 32 }} />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 20, paddingHorizontal: 20, paddingTop: 20 }}>
                            <View style={{ flex: 1, }}>
                                <LinearGradient colors={['rgb(227,238,212)', 'rgba(107,144,113, 0.7)']} style={{ borderRadius: 5, flex: 1, }}>
                                    <View style={[styles.linearGradient]}>
                                        <Image source={require('../../assets/images/review.png')} style={styles.thumbImage} />
                                        <Text style={styles.cardValue}>Appointment Confirmed Leads</Text>
                                        <Text style={styles.wrapText}>
                                            {scoreDetails.appointment_confirmed_leads ?? '0'}
                                        </Text>
                                    </View>
                                </LinearGradient>
                            </View>
                            <View style={{ flex: 1, }}>
                                <LinearGradient style={{ borderRadius: 5, flex: 1, }}
                                    colors={['rgb(227,238,212)', 'rgba(107,144,113, 0.7)']}>
                                    <View style={[styles.linearGradient]}>
                                        <Image source={require('../../assets/images/phasing-state.png')} style={styles.thumbImage} />
                                        <Text style={styles.cardValue}>Conversion % (Won/Appointment Confirmed)</Text>
                                        <Text style={{ ...styles.wrapText }}>
                                            {scoreDetails.mps_lm_lead_conversion_percentage ?? '0'}
                                        </Text>
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 }}>
                            <LinearGradient colors={['#3E797F00', '#3E797F', '#3E797F00']} useAngle={true} angle={90} start={{ x: 0.1, y: 0.9 }} end={{ x: 0.1, y: 0.9 }} locations={[0.1, 1, 1]} style={{ width: '30%', height: 32 }} />
                            <View style={{ padding: 5, backgroundColor: '#3E797F', height: 32, paddingHorizontal: 10, width: '40%' }}>
                                <Text style={{ textAlign: 'center', color: Colors.color_white, fontSize: 14, fontFamily: Fonts.poppins500Medium }}>
                                    CSAT (Score {scoreDetails.csat_score ?? '0'})
                                </Text>
                            </View>
                            <LinearGradient colors={['#3E797F00', '#3E797F', '#3E797F00']} useAngle={true} angle={-90} start={{ x: 0.1, y: 0.9 }} end={{ x: 0.1, y: 0.9 }} locations={[0.1, 1, 1]} style={{ width: '30%', height: 32 }} />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 20, paddingHorizontal: 20, paddingTop: 20 }}>
                            <View style={{ flex: 1, }}>
                                <LinearGradient colors={['rgb(227,238,212)', 'rgba(107,144,113, 0.7)']} style={{ borderRadius: 5, flex: 1, }}>
                                    <View style={[styles.linearGradient]}>
                                        <Image source={require('../../assets/images/review.png')} style={styles.thumbImage} />
                                        <Text style={styles.cardValue}>CSAT Rating</Text>
                                        <Text style={styles.wrapText}>
                                            {scoreDetails.mps_csat_count ?? '0'}
                                        </Text>
                                    </View>
                                </LinearGradient>
                            </View>
                            <View style={{ flex: 1, borderRadius: 10 }}>
                                <LinearGradient style={{ borderRadius: 5, flex: 1, }}
                                    colors={['rgb(227,238,212)', 'rgba(107,144,113, 0.7)']}>
                                    <View style={[styles.linearGradient]}>
                                        <Image source={require('../../assets/images/phasing-state.png')} style={styles.thumbImage} />
                                        <Text style={styles.cardValue}>Number of Reviews</Text>
                                        <Text style={{ ...styles.wrapText }}>
                                            {scoreDetails.number_of_reviews ?? '0'}
                                        </Text>
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>
                    </>
                )}

                {isApiCall && (
                    <View style={{ width: '100%', paddingHorizontal: 15, marginTop: 15 }}>
                        <DynamicShimmerPlaceholder borderRadius={5} height={30} width={'100%'} count={1} />
                        <DynamicShimmerPlaceholder borderRadius={5} height={120} width={'100%'} count={1} />
                        <DynamicShimmerPlaceholder borderRadius={5} height={30} width={'100%'} count={1} />
                        <DynamicShimmerPlaceholder borderRadius={5} height={120} width={'100%'} count={1} />
                        <DynamicShimmerPlaceholder borderRadius={5} height={30} width={'100%'} count={1} />
                        <DynamicShimmerPlaceholder borderRadius={5} height={120} width={'100%'} count={1} />
                    </View>
                )}

            </ScrollView>
        </>
    );
}

export default ScoreDetails;

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
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        overflow: 'hidden',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
        paddingVertical: 9,
    },
    wrapText: {
        //flex: 1,
        //flexWrap: 'wrap',
        fontSize: 23,
        textAlign: 'center',
        fontFamily: Fonts.poppins600SemiBold,
        color: Colors.ui_dark_bg,
        marginTop: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: -1, height: 2 },
        textShadowRadius: 3,
    },
    card: {
        overflow: 'hidden',
        width: '49%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,

    },
    cardValue: {
        paddingTop: 7,
        fontSize: 12,
        textAlign: 'center',
        fontFamily: Fonts.poppins500Medium,
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
        // position: 'absolute',
        right: 0,
        top: 1,
        marginRight: 2,
        opacity: 1,
    },


});

