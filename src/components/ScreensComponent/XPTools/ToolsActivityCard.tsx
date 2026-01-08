import React, { memo, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import DateIcon from '../../../assets/svg/calendar.svg'; 
import { AppImages, Colors, Fonts } from "../../../themes";
import DynamicShimmerPlaceholder from "../../../utils/dynamicShimmerPlaceholder";
import { ddmmyyyConverter } from "../../../utils/formatDate";
import Card from "../../Card";


const ToolsActivityCard = ({
    ActivityList,
    ReachEndFlag,
    onRefresh,
    showLoader,
    nestedScrollEnabled,
    totalCount
}: any) => {
    const [refreshing, setRefreshing] = useState(false);
    let ReachEnd: any = false;

    return (
        <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={ActivityList}
            numColumns={1}
            renderItem={({ item, index }: any) => (
                <>
                    <View style={{ ...styles.req_group }}>
                        <Card>
                            <View style={{ padding: 10, display: 'flex', flexDirection: 'row', paddingBottom: 5 }}>
                                {/* {(item.img_url ?? '') != '' ? ( */}
                                <Image source={{ uri: (item.img_url ?? '') != '' ? item.img_url : AppImages.NoImagesAvailableTransparent }} style={{ ...styles.toolsImages }} />
                                {/*) : (
                                     <Image source={require('../../../assets/images/empty.png')} style={{ ...styles.toolsImages }} />
                                 )}*/}

                                <View style={{ marginLeft: 5 }}>
                                    <View style={{ ...styles.dateGroup }}>
                                        <DateIcon />
                                        <Text style={{ ...styles.labelText, marginLeft: 5 }}>{ddmmyyyConverter(item.requested_on, 'DD MMMM YYYY')}</Text>
                                    </View>
                                    <View style={{ ...styles.flexBoxWrap }}>
                                        <Text style={{ ...styles.highlitedText }}>Tools: </Text>
                                        <Text style={{ ...styles.labelText }}>{item.tool_desc}</Text>
                                    </View>
                                    <View style={{ ...styles.flexBoxWrap }}>
                                        <Text style={{ ...styles.highlitedText }}>Serial No.: </Text>
                                        <Text style={{ ...styles.labelText }}>{(item.tool_serial_no ?? '') != '' ? item.tool_serial_no : '-'}</Text>
                                    </View>
                                    {item.remarks && (
                                        <View style={{ ...styles.flexBoxWrap }}>
                                            <Text style={{ ...styles.highlitedText }}>Remarks: </Text>
                                            <Text style={{ ...styles.labelText }}>{item.remarks ? item.remarks : '-'}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                            <View style={{ padding: 10, borderWidth: 0, borderTopColor: Colors.color_semi_dark_gray, borderTopWidth: 1, position: 'relative' }}>
                                {item.status_updated_on && (
                                    <View style={{ ...styles.deviderHorizontal }} ></View>
                                )}
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ ...styles.statusListTwo }}>
                                        <View style={{ ...styles.statusList }}></View>
                                    </View>
                                    <View style={{ ...styles.flexBoxWrap }}>
                                        <Text style={{ ...styles.highlitedText }}>Status: </Text>
                                        <Text style={{ ...styles.labelText }}>{item.req_status_desc}</Text>
                                    </View>
                                </View>
                                {item.status_updated_on && (
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ ...styles.statusListTwo }}>
                                            <View style={{ ...styles.statusList }}></View>
                                        </View>
                                        <View style={{ ...styles.flexBoxWrap }}>
                                            <Text style={{ ...styles.highlitedText }}>Update On: </Text>
                                            <Text style={{ ...styles.labelText }}> {ddmmyyyConverter(item.status_updated_on, 'DD MMMM YYYY')}</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </Card>
                        <Text style={{ ...styles.req_type_group }} >{item.req_type_desc}</Text>
                    </View>
                </>

            )}
            keyExtractor={(item) => item.index}
            onEndReached={() => {
                ActivityList.length > totalCount ? ReachEndFlag(!ReachEnd) : ReachEndFlag(false)
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
                showLoader ? (
                    <View style={{ width: "100%", paddingHorizontal: 10, marginTop: 5 }}>
                        <DynamicShimmerPlaceholder borderRadius={5} height={100} width={"100%"} count={2} />
                    </View>
                ) : null
            }
            refreshing={refreshing}
            onRefresh={() => {
                //   onRefresh();
            }}
            nestedScrollEnabled={nestedScrollEnabled} // Enable nested scrolling
        />
    )
}

export default memo(ToolsActivityCard);

const styles = StyleSheet.create({
    flexBoxWrap: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
    imageBox: {
        width: "31%",
        borderRadius: 10,
    },
    boxImgStyle: {
        height: "100%",
        position: "relative",
    },
    clrCode: {
        fontSize: 10,
        fontFamily: Fonts.OpenSans400Regular,
    },
    brdrBox: {
        borderColor: "#fff",
        borderWidth: 1,
        borderStyle: "solid",
        elevation: 4,
    },
    toolsImages: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    req_type_group: {
        position: 'absolute',
        top: -9,
        right: 8,
        backgroundColor: Colors.ui_dark_bg,
        color: Colors.color_white,
        fontFamily: Fonts.OpenSans400Regular,
        fontSize: 10.5,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 100
    },
    req_group: {
        marginHorizontal: 15,
        marginVertical: 10,
        position: 'relative'
    },
    highlitedText: {
        fontSize: 13,
        fontFamily: Fonts.poppins600SemiBold,
        color: Colors.ui_dark_bg
    },
    dateGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 5
    },
    labelText: {
        fontFamily: Fonts.OpenSans400Regular,
        fontSize: 13,
    },
    statusList: {
        backgroundColor: Colors.ui_dark_bg,
        width: 8,
        height: 8,
        borderRadius: 100
    },
    statusListTwo: {
        backgroundColor: Colors.ui_light_bg,
        width: 18,
        height: 18,
        borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginTop: -3
    },
    deviderHorizontal: {
        height: 20,
        backgroundColor: Colors.ui_light_bg,
        width: 4,
        position: 'absolute',
        top: 24,
        left: 16.5
    }
});
