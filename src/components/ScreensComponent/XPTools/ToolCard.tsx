import React, { FC, useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductDetailsLoader from '../loader/productDetailsLoader';
import ButtonLarge from '../../ButtonLarge';
import { AppImages, Colors, Fonts } from '../../../themes';
import { I_Tools, I_TOOLS_UspList } from '../../../Interfaces/xpTools.interface';
import DynamicShimmerPlaceholder from '../../../utils/dynamicShimmerPlaceholder';
import { useSelector } from 'react-redux';
import { UserGroupArr } from '../../../utils/hierarchyLoginCheck';

export interface I_ToolCard {
    item: I_Tools;
    showLoader: boolean,
    PurchaseRequest: Function,
    DemoRequest: Function,
    ServicesRequest: Function,
}

const ToolCard: FC<I_ToolCard> = ({ item, showLoader, PurchaseRequest, DemoRequest, ServicesRequest }) => {
    const [getExecutiveLogin, setExecutiveLogin] = useState('');
    const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
    const isAPICall = useSelector((state: any) => state.apiCallLoader);
    useEffect(() => {
        if (executiveLoginCheck) {
            setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
        }
    }, [executiveLoginCheck]);

    return (
        <View style={styles.cardContainer}>
            {showLoader ? (
                <DynamicShimmerPlaceholder borderRadius={5} height={200} width={'100%'} count={1} />
            ) : (
                <>
                    <View style={styles.imgBg}>
                        {item.img_url != '' ? (
                            <Image
                                source={{ uri: item.img_url }}
                                style={styles.toolImage}
                            />
                        ) : (
                            <Image source={{ uri: AppImages.noTools }} style={{ ...styles.toolImage, opacity: 0.5 }} />
                        )}
                    </View>
                    <View style={styles.contentBox}>
                        <Text style={styles.xpToolTitle}>{item.tool_desc}</Text>
                        <View style={styles.uspListContainer}>
                            {item.usp_list.map((uspItem: I_TOOLS_UspList, index: number) => (
                                <View key={index} style={styles.uspItem}>
                                    <Ionicons name="checkmark-circle" size={18} style={styles.uspIcon} />
                                    <View style={styles.uspTextContainer}>
                                        <Text style={styles.paraText}>{uspItem.usp_desc}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                        <View style={styles.buttonContainer}>
                            {item.visible_purchase_request_button_yn.toLowerCase() === 'y' && !UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && (
                                <View style={styles.buttonWrapper}>
                                    <ButtonLarge
                                        title={'Purchase Request'}
                                        onPress={() => PurchaseRequest()}
                                        fillBtn={true}
                                        key={'Canel'}
                                        showIcon={false}
                                        iconName=""
                                        paddingVertical={4}
                                        paddingHorizontal={2}
                                        fontSize={12}
                                        iconSize={19}
                                        margin={0}
                                        isAPICall={isAPICall}
                                        disabled={isAPICall}
                                    />
                                </View>
                            )}
                            {item.visible_demo_request_button_yn.toLowerCase() === 'y' && !UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && (
                                <View style={styles.buttonWrapper}>
                                    <ButtonLarge
                                        title={'Demo Request'}
                                            onPress={() => DemoRequest(item.tool_code)}
                                        fillBtn={true}
                                        key={''}
                                        showIcon={false}
                                        iconName=""
                                        paddingVertical={4}
                                        paddingHorizontal={2}
                                        fontSize={12}
                                        iconSize={19}
                                        margin={0}
                                        isAPICall={isAPICall}
                                        disabled={isAPICall}
                                    />
                                </View>
                            )}
                            {item.visible_service_request_button_yn.toLowerCase() === 'y' && !UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && (
                                <View style={styles.buttonWrapper}>
                                    <ButtonLarge
                                        title={'Services Request'}
                                        onPress={() => ServicesRequest(item.tool_code)}
                                        fillBtn={true}
                                        key={''}
                                        showIcon={false}
                                        iconName=""
                                        paddingVertical={4}
                                        paddingHorizontal={2}
                                        fontSize={12}
                                        iconSize={19}
                                        margin={0}
                                        isAPICall={isAPICall}
                                        disabled={isAPICall}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </>
            )}

        </View>
    );
};

export default ToolCard;

const styles = StyleSheet.create({
    cardContainer: {},
    imgBg: {
        backgroundColor: '#83A9AC',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 10,
        width: '100%',
        textAlign: 'center',
    },
    toolImage: {
        height: 250,
        width: '100%',
        resizeMode: 'contain',
    },
    contentBox: {
        backgroundColor: '#fff',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        padding: 10,
    },
    xpToolTitle: {
        fontSize: 14,
        fontFamily: Fonts.OpenSans700Bold,
        lineHeight: 17,
        color: '#141B34',
        paddingRight: 10,
        flex: 1,
        flexWrap: 'wrap',
    },
    uspListContainer: {
        marginTop: 10,
        paddingRight: 10,
    },
    uspItem: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        marginBottom: 5,
    },
    uspIcon: {
        color: Colors.color_soft_green,
    },
    uspTextContainer: {
        flex: 1,
    },
    paraText: {
        color: Colors.color_black,
        fontSize: 12,
        fontFamily: Fonts.OpenSans400Regular,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    buttonWrapper: {
        width: '48%',
        marginRight: 5,
        marginBottom: 5
    },
});
