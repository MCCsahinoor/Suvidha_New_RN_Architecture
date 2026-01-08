import React, { FC, useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import styles from '../../../screens/Products/style';
import { Colors, Fonts } from '../../../themes';
import Ionicons from "react-native-vector-icons/Ionicons";
import RenderHtml, { HTMLContentModel, HTMLElementModel } from 'react-native-render-html';
import { I_PRODUCT_LIST } from '../../../Interfaces/product.interface';

export interface I_ProductWithDetailsCard_C {
    productItem: I_PRODUCT_LIST.IGETProductList;
    productId: (id: string) => void;
}

const ProductWithDetailsCard: FC<I_ProductWithDetailsCard_C> = ({ productItem, productId }) => {

    const [getDetails, setDetails] = useState<any>(null);

    useEffect(() => {
        if (productItem) {
            setDetails(productItem);
        } else {
            setDetails(null);
        }
    }, [productItem]);


    const customHTMLElementModels = {
        'p': HTMLElementModel.fromCustomModel({
            tagName: 'p',
            mixedUAStyles: {
                margin: 0,
                fontSize: 12,
            },
            contentModel: HTMLContentModel.block
        }),
    };

    return (
        <>
            {getDetails && (
                <View style={{ marginBottom: 10, ...styles.bdrBtm }}>
                    <Pressable onPress={() => productId(getDetails.id)}>
                        <View style={{ ...styles.bookletStyle }}>
                            <View style={{ width: '25%' }}>
                                <Image
                                    source={{ uri: getDetails.brand_media && getDetails.brand_media[0].url ? getDetails.brand_media[0].url : '' }}
                                    style={{ height: 100, width: '100%', resizeMode: 'center', borderRadius: 8 }}
                                />
                            </View>
                            <View style={{ width: '75%', paddingLeft: 10 }}>
                                <View style={{ ...styles.bookletContent }}>
                                    <Text style={{ ...styles.bookletText }}>{getDetails && getDetails.brand_name ? getDetails.brand_name : ''}</Text>
                                    <View style={{}}>
                                        <Ionicons
                                            name="chevron-forward-circle-outline"
                                            size={25}
                                            style={{ color: Colors.color_dark_gray }}
                                        />
                                    </View>
                                </View>
                                <View style={{}}>
                                    <Text style={{ ...styles.paraText, fontSize: 11 }}>{getDetails && getDetails.brand_short_desc ? getDetails.brand_short_desc : ''} </Text>
                                    <View style={{ marginTop: 10, paddingRight: 10 }}>
                                        {getDetails.brand_usp && getDetails.brand_usp.length > 0 && getDetails.brand_usp.map((usp: any, index: number) => {
                                            const source = {
                                                html: usp
                                            };
                                            return (
                                                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, marginBottom: 5 }} key={index}>
                                                    <View>
                                                        <Ionicons name="checkmark-circle" size={18} style={{ color: Colors.color_dark_green }} />
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={{ ...styles.paraText }}>
                                                            <RenderHtml
                                                                contentWidth={50}
                                                                source={source}
                                                                customHTMLElementModels={customHTMLElementModels}
                                                                enableExperimentalMarginCollapsing={true}
                                                            />
                                                        </Text>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                </View>
            )}
        </>
    );
};

export default ProductWithDetailsCard;