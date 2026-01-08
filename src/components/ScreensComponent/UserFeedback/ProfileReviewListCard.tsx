import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { Colors, Fonts } from '../../../themes'; 
import StarRating from '../../RatingShow';
import InitialAvatar from '../../InitialAvatar';
import DynamicShimmerPlaceholder from '../../../utils/dynamicShimmerPlaceholder'; 
import { useTranslation } from 'react-i18next';
import Card from '../../Card';
interface CsatReview {
    pntr_guid: string;
    pntr_csat: number;
    rate_total: number;
    rate_five: number;
    rate_three: number;
    rate_one: number;
    creation_date: string;
    lead_id: string;
    customer_name: string;
    feedback: string;
}
interface ProfileReviewListCard {
    ProfileReviewList?: CsatReview[];
    ReachEndFlag?: (value: boolean) => void;
    showLoader?: boolean;
    onRefreshFlag?: (refreshing: boolean) => void;
    refreshing?: boolean;
}
const ProfileReviewListCard = ({
    ProfileReviewList,
    ReachEndFlag,
    showLoader,
    onRefreshFlag,
    refreshing
}: ProfileReviewListCard) => {

    const { t } = useTranslation();
    let ReachEnd: any = false;

    const onRefresh = useCallback(() => {
        if (onRefreshFlag) {
            onRefreshFlag(true);
        }
    }, [onRefreshFlag]);


    return (
        <>
            <FlatList
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                data={ProfileReviewList}
                numColumns={1}
                renderItem={({ item }: any) => (
                    <View style={{ marginHorizontal: 15, marginVertical: 5 }}>
                        <Card>
                            <View style={styles.box}>
                                <InitialAvatar
                                    name={item.customer_name || "-"}
                                    size={55}
                                    fontSize={17}
                                    style={styles.avatar}
                                />
                                <View style={styles.infoContainer}>
                                    <View style={styles.container}>
                                        <Text style={styles.label}>{t("Name")}: </Text>
                                        <Text style={styles.value}>{item.customer_name ?? "-"}</Text>
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={styles.label}>{t("LeadId")}: </Text>
                                        <Text style={styles.value}>{item.lead_id ?? "-"}</Text>
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={styles.label}>{t("Rating")}: </Text>
                                        <View style={{ marginTop: 2 }}>
                                            <StarRating
                                                startSize={14}
                                                starRating={item.pntr_csat}
                                                stroke={'gray'}
                                                fill={'#FFE606'}
                                                starLabel={true}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={styles.label}>{t("Review")}: </Text>
                                        <Text style={styles.value}>{item.feedback ?? "-"}</Text>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    </View>
                )}
                keyExtractor={(item) => item.lead_id.toString()}
                onEndReached={() => {
                    if (ReachEndFlag) {
                        ReachEndFlag(!ReachEnd);
                    }
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() =>
                    showLoader ? (
                        <View style={{ width: "100%", paddingHorizontal: 10, marginTop: 5 }}>
                            <DynamicShimmerPlaceholder
                                borderRadius={5}
                                height={100}
                                width={"100%"}
                                count={2}
                            />
                        </View>
                    ) : null
                }
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        </>
    );
};

export default ProfileReviewListCard;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 10,
    },
    label: {
        fontSize: 12,
        fontFamily: Fonts.poppins600SemiBold,
        color: Colors.ui_dark_bg,
    },
    value: {
        marginLeft: 5,
        fontSize: 12,
        fontFamily: Fonts.OpenSans500Medium,
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        marginLeft: 10,
    },
    avatar: {

    },
    infoContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        marginRight: 10,
    },
});
