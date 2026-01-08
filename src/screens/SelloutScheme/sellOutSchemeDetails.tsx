import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import HeaderCurve from "../../components/HeaderCurve";
import { AppImages, Colors, Fonts } from "../../themes"; 
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from "react";
import { GetSellOutSchemeDetails } from "../../services/Scheme/scheme.services";
import { I_SELLOUT_DETAILS_GET_ALL, I_SELLOUT_DETAILS_ROUTE_DETAILS, I_SELLOUT_SCHEMES_DETAILS_SEND, PainterDeatils, detailsAll } from "../../Interfaces/selloutSchemes.interface";
import DynamicShimmerPlaceholder from "../../utils/dynamicShimmerPlaceholder";
import ButtonLarge from "../../components/ButtonLarge";
import RNFS from 'react-native-fs';
import { filename } from "../../utils/uriToFileName";
import Card from "../../components/Card";
import NoDataFound from "../../components/NoDataFound";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import LinearGradient from "react-native-linear-gradient";
import { CommonToastModel } from "../../utils/ToastMessageModel";
import React from "react";
import Calendar from "../../assets/svg/calendar";

const SellOutSchemeDetails = ({ route }: any) => {
    const { t } = useTranslation();
    const { details } = route.params;
    const [sellOutDetails, setsellOutDetails] = useState<I_SELLOUT_DETAILS_ROUTE_DETAILS | null>(null);
    const [selloutSchemesDetails, setSelloutSchemesDetails] = useState<any | null>(null);
    const [painterDetails, setPainterDetails] = useState<PainterDeatils | null>(null);
    const [showLoader, setShowLoader] = useState(false);
    const [downloadProgrress, setProgress] = useState(i18n.t('clickDownloadSchemesDoc'));
    const [showNoDataFound, setShowNoDataFound] = useState(false);

    useEffect(() => {
        setsellOutDetails(details);
        SelloutApiDetails(details);
    }, [details])


    const SelloutApiDetails = (details: I_SELLOUT_DETAILS_ROUTE_DETAILS): void => {
        if (details) {
            let data: I_SELLOUT_SCHEMES_DETAILS_SEND = {
                "scheme_id": details && details.sch_scheme_code,
                "year": null,
                "month": null,
            };
            setSelloutSchemesDetails(null)
            setPainterDetails(null)
            setShowLoader(true);
            setShowNoDataFound(false)
            GetSellOutSchemeDetails<I_SELLOUT_SCHEMES_DETAILS_SEND, I_SELLOUT_DETAILS_GET_ALL>(data).then(response => {
                console.log(response)
                setShowLoader(false);
                if (response && response.Data && response.Data.length > 0) {
                    setSelloutSchemesDetails(response.Data)
                } else {
                    setSelloutSchemesDetails(null)
                    setShowNoDataFound(true)
                }
                if (response && response.PainterDeatils) {
                    console.log(response.PainterDeatils)
                    setPainterDetails(response.PainterDeatils)
                }
            }).catch(err => {
                setShowLoader(false);
                CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
            });
        }
    };

    function calculatePercentage(pss_tgt: string, pss_ty: string) {
        let target = parseFloat(pss_tgt);
        let compited = parseFloat(pss_ty);
        let percentageChange = (compited / target);
        return percentageChange;
    }

    {/* Doc Download and open */ }
    const download = (file: string) => {
        if (sellOutDetails) {
            console.log(file);
            const url = file;
            const filePath = `${RNFS.DocumentDirectoryPath}/${filename(sellOutDetails.doc_url)}`;

            RNFS.downloadFile({
                fromUrl: url,
                toFile: filePath,
                background: true,
                discretionary: true,
                progress: (res) => {
                    // Handle download progress updates
                    const percentage = ((100 * res.bytesWritten) / res.contentLength) | 0;
                    const progress = `Progress ${percentage}%`;
                    // console.log(`Progress: ${progress}`);
                    setProgress(`Download ${progress}`)
                },
            }).promise.then((response) => {
                Linking.openURL(file).catch(() => {

                });
                setProgress(i18n.t('clickDownloadSchemesDoc'))
            }).catch((err) => {
                CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
                setProgress(i18n.t('clickDownloadSchemesDoc'))
            });
        }
    };

    return (
        <>
            <View>
                <LinearGradient colors={['#36686D', '#84A2A5']} useAngle={true} angle={90} >
                    <View style={{ ...styles.userStatus }}>
                        <View style={{ position: 'relative' }}>
                            <View style={{ ...styles.userId }}>
                                <Text style={{ color: Colors.color_white, fontSize: 12, fontFamily: Fonts.OpenSans600SemiBold, }}>{sellOutDetails && sellOutDetails.sch_scheme_code}</Text>
                            </View>
                            <Card>
                                <View style={{ ...styles.userCardStatus }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ ...styles.userName }}>{sellOutDetails && sellOutDetails.sch_scheme_name}</Text>
                                    </View>
                                    <View style={{ ...styles.iconAlign, marginTop: 8 }}>
                                        <Calendar width={18} height={18} />
                                        <Text style={{ ...styles.dateLabel }}> {sellOutDetails && sellOutDetails.period}</Text>
                                    </View>
                                    {painterDetails && (
                                        <View style={{ ...styles.iconAlign, marginTop: 8 }}>
                                            <Text style={{ ...styles.dateLabel }}>{painterDetails.painter_name} - {painterDetails.painter_mobile} - {painterDetails.painter_mobile}</Text>
                                        </View>
                                    )}
                                </View>
                            </Card>
                        </View>
                    </View>
                </LinearGradient>
            </View>


            <View>
                <LinearGradient colors={['#36686D', '#84A2A5']} useAngle={true} angle={90} >
                    <View style={{ paddingHorizontal: 15, }}>
                        {sellOutDetails && (
                            <ButtonLarge
                                title={downloadProgrress}
                                onPress={() => download(sellOutDetails.doc_url)}
                                fillBtn={false}
                                key={'InvitePainter'}
                                showIcon={true}
                                iconName={'download'}
                                paddingVertical={2}
                                paddingHorizontal={5}
                                fontSize={15}
                                iconSize={19}
                                disabled={downloadProgrress != i18n.t('clickDownloadSchemesDoc') ? true : false}
                            />
                        )}
                    </View>
                </LinearGradient>
            </View>



            <HeaderCurve
                topGaap={119}
                headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'}
                pageBackground={'#F2F2F2'}
            />

            <ScrollView style={{ backgroundColor: '#F2F2F2' }}>
                <View style={{ ...styles.containerDetails }}>
                    {/* {selloutSchemesDetails && selloutSchemesDetails.length > 0 && (
                        selloutSchemesDetails.map((item: detailsAll, index: number) => (
                            <View key={index} style={{ marginBottom: 10 }}>
                                <Card>
                                    <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderColor: '#00000020' }}>
                                        <Text style={{ ...styles.schemeName }}>{item.pss_schm_param}</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', }}>
                                            <Text style={{ ...styles.amountStyle, }}>{item.pss_tgt ?? '0.00'}</Text>

                                            {item.pss_status && item.pss_status.toLowerCase() === 'q' ? (
                                                <FontAwesome
                                                    name='caret-up'
                                                    size={30}
                                                    style={{ color: Colors.color_soft_green }}
                                                />
                                            ) : (
                                                <FontAwesome
                                                    name='caret-down'
                                                    size={30}
                                                    style={{ color: Colors.color_dark_red }}
                                                />
                                            )}

                                        </View>
                                    </View>
                                    <View style={{ paddingHorizontal: 20, paddingVertical: 15, }}>
                                        <View style={{ paddingBottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                                            <Text style={{ ...styles.progressAmount }}>{item.pss_ty ?? '0'}</Text>
                                            <Text style={{ ...styles.progressAmount }}>{item.pss_tgt ?? '0'}</Text>
                                        </View>
                                        {item.pss_tgt && item.pss_ty ? (
                                            <ProgressBar style={{ ...styles.prgressStyle }} progress={calculatePercentage(item.pss_tgt, item.pss_ty)} color="#07AD7E" />
                                        ) : (
                                            <ProgressBar style={{ ...styles.prgressStyle }} progress={0} color="#07AD7E" />
                                        )}
                                    </View>


                                    {item.Reward && (
                                        <View style={{ paddingHorizontal: 20, paddingBottom: 15, paddingTop: 5 }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                                                {item.pss_status && item.pss_status.toLowerCase() === 'q' && (
                                                    <View>
                                                        <LottieView
                                                            source={{ uri: AppImages.LottySchemeGift }}
                                                            style={{ width: 40, height: 10, transform: 'scale(4)' }}
                                                            autoPlay
                                                            loop
                                                        />
                                                    </View>
                                                )}
                                                <View style={{ flex: 1 }}>
                                                    <Text style={styles.dateLabel}>{item.Reward}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                </Card>
                            </View>
                        ))
                    )} */}


                    {selloutSchemesDetails && selloutSchemesDetails.length > 0 && (
                        selloutSchemesDetails.map((item: detailsAll, index: number) => (
                            <View key={index} style={{ marginBottom: 10 }}>
                                <Card>
                                    <View style={{ paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderColor: '#00000020' }}>
                                        <Text style={{ ...styles.schemeName }}>{item.pss_schm_param}</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'space-between', padding: 5, paddingHorizontal: 20 }}>
                                        <Text style={{ ...styles.amountStyle, }}>Target</Text>
                                        <Text style={{ ...styles.amountStyle, }}>{item.pss_tgt ?? '0.00'}</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'space-between', padding: 5, paddingHorizontal: 20 }}>
                                        <Text style={{ ...styles.amountStyle, }}>Actual</Text>
                                        <Text style={{ ...styles.amountStyle, }}>{item.pss_ty ?? '0.00'}</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'space-between', padding: 5, paddingHorizontal: 20 }}>
                                        <Text style={{ ...styles.amountStyle, }}>Status</Text>
                                        <Text style={{ ...styles.amountStyle, }}>
                                            {item.pss_status && item.pss_status.toLowerCase() === 'q' ? (
                                                <FontAwesome
                                                    name='thumbs-up'
                                                    size={25}
                                                    style={{ color: Colors.color_soft_green }}
                                                />
                                            ) : (
                                                <FontAwesome
                                                    name='thumbs-down'
                                                    size={25}
                                                    style={{ color: Colors.color_dark_red }}
                                                />
                                            )}
                                        </Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'space-between', padding: 5, paddingHorizontal: 20, marginBottom: 10 }}>
                                        <Text style={{ ...styles.amountStyle, }}>Reward</Text>
                                        <Text style={{ ...styles.amountStyle, }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', }}>
                                                {item.pss_status && item.pss_status.toLowerCase() === 'q' && (
                                                    <View>
                                                        <LottieView
                                                            source={{ uri: AppImages.LottySchemeGift }}
                                                            style={{ width: 40, height: 10, transform: 'scale(4)' }}
                                                            autoPlay
                                                            loop
                                                        />
                                                    </View>
                                                )}
                                                <Text style={{ ...styles.amountStyle, }}>{item.Reward ?? "-"}</Text>
                                            </View>
                                        </Text>

                                    </View>
                                </Card>
                            </View>
                        ))
                    )}
                    {showLoader && (
                        <View style={{ width: '100%' }}>
                            <DynamicShimmerPlaceholder borderRadius={5}
                                height={100}
                                width={"100%"}
                                count={5} />
                        </View>
                    )}

                    {showNoDataFound && (
                        <View style={{ marginVertical: 10 }}>
                            <NoDataFound content={t('noSchemeDataFound')}></NoDataFound>
                        </View>
                    )}
                </View>
            </ScrollView>

        </>

    );
};

export default SellOutSchemeDetails;

const styles = StyleSheet.create({
    containerDetails: {
        padding: 10,
        paddingTop: 0
    },
    prgressStyle: {
        backgroundColor: '#E8E8E8',
        height: 15,
        borderRadius: 10,
    },
    amountStyle: {
        fontSize: 14,
        fontFamily: Fonts.OpenSans600SemiBold,
        color: Colors.color_black,
        marginRight: 5
    },
    progressAmount: {
        fontSize: 16,
        fontFamily: Fonts.OpenSans700Bold,
        color: Colors.color_black,
    },
    dateLabel: {
        fontSize: 13,
        fontFamily: Fonts.OpenSans500Medium,
        color: Colors.color_dark_gray,
    },
    iconAlign: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    userStatus: {
        backgroundColor: Colors.ui_dark_bg,
        padding: 15,
        paddingBottom: 0,
        paddingTop: 30
    },
    userCardStatus: {
        padding: 15
    },
    userName: {
        color: Colors.ui_dark_bg,
        fontSize: 14,
        fontFamily: Fonts.OpenSans600SemiBold,
        textTransform: 'capitalize',
    },
    userIdStatus: {
        color: '#151A30',
        fontSize: 11.50,
        fontFamily: Fonts.OpenSans700Bold,
        textTransform: 'capitalize',
    },
    userId: {
        position: 'absolute',
        zIndex: 2,
        backgroundColor: Colors.soft_bg,
        padding: 5,
        borderRadius: 100,
        paddingHorizontal: 20,
        top: -18,
        right: 10,
        borderWidth: 3,
        borderColor: 'white',
    },
    schemeName: {
        color: Colors.ui_dark_bg,
        fontSize: 15,
        fontFamily: Fonts.OpenSans700Bold,
        textTransform: 'uppercase',
    },
});
