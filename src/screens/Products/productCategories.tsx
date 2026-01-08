import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import HeaderCurve from "../../components/HeaderCurve";
import { AppImages, Colors, Fonts } from "../../themes";
import Card from "../../components/Card";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from './style';
import { useCallback, useEffect, useState } from "react";
import { GetCategoryList } from "../../services/Products/products.services";
import { I_CATEGORIES_LIST } from "../../Interfaces/product.interface";
import DynamicShimmerPlaceholder from "../../utils/dynamicShimmerPlaceholder";
import { setcategoriesHandler } from "../../store/features/eSambandhProducts/categoriesAll";
import { useDispatch, useSelector } from "react-redux";
import { CommonToastModel } from "../../utils/ToastMessageModel";
import React from "react";

const ProductCategories = ({ navigation }: any) => {

    const [allCategories, setAllCategories] = useState<I_CATEGORIES_LIST.Category[]>([]);
    const [showLoader, setShowLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const dispatch = useDispatch();
    const userDepo = useSelector((state: any) => state.loginUserDepotData);
    const [errors, setErrors] = useState<any>('')

    const handleError = (index: number) => {
        const newErrors = [...errors];
        newErrors[index] = true;
        setErrors(newErrors);
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
    }, []);

    useEffect(() => {
        GetFaqDashboard();
    }, []);

    useEffect(() => {
        if (refreshing) { GetFaqDashboard(); }
    }, [refreshing]);


    const GetFaqDashboard = async (): Promise<void> => {
        const data: any = {
            depot_codes: [userDepo],
            keyword: ''
        }
        setShowLoader(true);
        setRefreshing(false);
        setAllCategories([]);
        GetCategoryList<any, any>(JSON.stringify(data)).then(response => {
            if (response && response.data && response.data.length > 0) {
                let allGetCategoryList = response.data as I_CATEGORIES_LIST.Category[];
                setAllCategories(allGetCategoryList)
                dispatch(setcategoriesHandler(allGetCategoryList));
                setShowLoader(false);
            } else {
                setAllCategories([]);
                setShowLoader(false);
            }
        }).catch(err => {
            setAllCategories([]);
            setShowLoader(false);
            CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
        });
    };



    // GO TO Product Details
    const productDetails = (id: string) => {
        navigation.navigate('ProductList', { 'categorieId': id });
    };

    return (
        <>
            <HeaderCurve
                topGaap={119}
                headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'}
                pageBackground={'#F2F2F2'}
            />

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={{ ...styles.container }}>
                    {showLoader ? (
                        <View style={{ width: '100%' }}>
                            <DynamicShimmerPlaceholder
                                borderRadius={5}
                                height={80}
                                width={'100%'}
                                count={10}
                            />
                        </View>
                    ) : (
                        <>
                            {allCategories && allCategories.length > 0 && allCategories.map((item, index) => (
                                <View style={{ marginBottom: 10 }} key={index}>
                                    <Card>
                                        <Pressable onPress={() => productDetails(item.id)}>
                                            <View style={{ ...styles.bookletStyle }}>
                                                <View style={{ width: '25%' }}>
                                                    {errors[index] ? (
                                                        <Image source={{ uri: AppImages.NoImagesAvailable }} style={{ height: 65, width: '100%', resizeMode: 'cover', borderRadius: 8 }} />
                                                    ) : (
                                                        <Image source={{ uri: item.images[0].url }} style={{ height: 65, width: '100%', resizeMode: 'cover', borderRadius: 8 }} onError={() => handleError(index)} />
                                                    )}

                                                </View>
                                                <View style={{ ...styles.bookletContent, width: '75%', paddingLeft: 10 }}>
                                                    <Text style={{ ...styles.bookletText }}>{item.name}</Text>
                                                    <View >
                                                        <Ionicons
                                                            name="chevron-forward-circle-outline"
                                                            size={25}
                                                            style={{ color: Colors.color_dark_gray }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </Pressable>
                                    </Card>
                                </View>
                            ))}
                        </>
                    )}
                </View>
            </ScrollView>
        </>
    )

};

export default ProductCategories;