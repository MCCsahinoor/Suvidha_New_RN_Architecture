/* eslint-disable prettier/prettier */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import styles from './styles'; 
import { AppImages, Colors } from '../../../themes';
import { I_CATEGORIES_LIST } from '../../../Interfaces/product.interface';
import { useSelector } from 'react-redux';
import ButtonLarge from '../../ButtonLarge';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Pressable } from 'react-native';
import { GetCategoryList } from '../../../services/Products/products.services';
import { CommonToastModel } from '../../../utils/ToastMessageModel';
import Card from '../../Card';


export interface I_Categories_Filter {
    onPress: (id: string, type: string) => void;
    selectedCategories: string;
}

const CategoriesFilterList: FC<I_Categories_Filter> = ({ onPress, selectedCategories }) => {

    const [allCategories, setAllCategories] = useState<I_CATEGORIES_LIST.Category[]>([]);
    const allProductCategories = useSelector((state: any) => state.productsCategories);
    const [getSelectedCategories, setSelectedCategories] = useState('')
    const [getSelectedCategoriesType, setSelectedCategoriesType] = useState('')
    const userDepo = useSelector((state: any) => state.loginUserDepotData);
    const [errors, setErrors] = useState<any>('')

    const handleError = (index: number) => {
        const newErrors = [...errors];
        newErrors[index] = true;
        setErrors(newErrors);
    };

    // useEffect(() => {
    //     if (allProductCategories) { setAllCategories(allProductCategories) }
    // }, [allProductCategories]);


    useEffect(() => {
        if (allProductCategories) {
            setAllCategories(allProductCategories)
        } else {
            GetAllCategoryList();
        }
    }, [allProductCategories]);

    // IF NO DATA FOUND IN STORE THEN API CALL
    const GetAllCategoryList = async (): Promise<void> => {
        const data: any = {
            depot_codes: [userDepo],
            keyword: ''
        }
        setAllCategories([]);
        GetCategoryList<any, any>(JSON.stringify(data)).then(response => {
            if (response && response.data && response.data.length > 0) {
                let allGetCategoryList = response.data as I_CATEGORIES_LIST.Category[];
                setAllCategories(allGetCategoryList)
            } else {
                console.log("NO DATA")
                setAllCategories([]);
            }
        }).catch(err => {
            setAllCategories([]);
            CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
        });
    };


    useEffect(() => {
        if (selectedCategories) { setSelectedCategories(selectedCategories) }
    }, [selectedCategories]);

    const selectCategory = (id: string, type: 'mainCategories' | 'subCategories') => {
        if (id) {
            setSelectedCategories(id)
            setSelectedCategoriesType(type)
        } else {
            setSelectedCategories(allCategories[0].id)
            setSelectedCategoriesType('mainCategories')
        }
    }




    return (
        <>
            <View style={{ ...styles.bookletContent, marginBottom: 10, marginTop: 10 }}>
                <Text style={{ ...styles.headerText }}>Filter Categories</Text>
            </View>
            <ScrollView style={{ height: 300, }}>
                {allCategories && allCategories.length > 0 && allCategories.map((item, index) => (
                    <View key={index}>
                        <Pressable onPress={() => selectCategory(item.id, "mainCategories")} style={{ ...styles.filterListStyle }}>
                            <View style={{ marginVertical: 8, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                                {errors[index] ? (
                                    <Image source={{ uri: AppImages.NoImagesAvailable }} style={{ height: 40, width: 40, resizeMode: 'cover', borderRadius: 8 }} />
                                ) : (
                                    <Image source={{ uri: item.images[0].url }} onError={() => handleError(index)} style={{ height: 40, width: 40, resizeMode: 'cover', borderRadius: 8 }} />
                                )}
                                <Text style={{ ...styles.filterbookletText }}>{item.name}</Text>

                                {item.id === getSelectedCategories && (
                                    <View style={{ ...styles.checkMark }}>
                                        <Ionicons name="checkmark-circle" size={18} style={{ color: Colors.color_glow_green }} />
                                    </View>
                                )}
                            </View>
                            <View style={{ position: 'relative' }}>
                                {item.child && item.child.length > 0 && (
                                    <Text style={{ ...styles.childLength }}>{item.child.length} more sub categories</Text>
                                )}
                            </View>
                        </Pressable>
                        {item.child && item.child.length > 0 && (
                            <View style={{ backgroundColor: Colors.color_light_gray, padding: 10, display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', flexDirection: 'row' }}>
                                {item.child.map((subChild, indexSub) => (
                                    <Pressable onPress={() => selectCategory(subChild.id, "subCategories")} style={{ width: '31%', margin: 3 }} key={indexSub}>
                                        <Card>
                                            <View style={{ padding: 2 }}>
                                                {errors[index] ? (
                                                    <Image source={{ uri: AppImages.NoImagesAvailable }} style={{ height: 40, width: 40, resizeMode: 'cover', borderRadius: 8 }} resizeMode="contain" />
                                                ) : (
                                                    <Image source={{ uri: subChild.images[0].url }} style={{ height: 40, width: 40, resizeMode: 'cover', borderRadius: 8 }} onError={() => handleError(index)} />
                                                )}
                                                <Text numberOfLines={1} style={{ ...styles.filterbookletText, fontSize: 10, textTransform: 'capitalize', marginLeft: 5 }}>{subChild.name.toLowerCase()}</Text>
                                                {subChild.id === getSelectedCategories && (
                                                    <View style={{ ...styles.checkMark }}>
                                                        <Ionicons name="checkmark-circle" size={18} style={{ color: Colors.color_glow_green }} />
                                                    </View>
                                                )}
                                            </View>
                                        </Card>
                                    </Pressable>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
            <View >
                <ButtonLarge
                    title={'Apply'}
                    onPress={() => onPress(getSelectedCategories, getSelectedCategoriesType)}
                    fillBtn={true}
                    key={'InvitePainter'}
                    showIcon={false}
                    iconName=""
                    paddingVertical={7}
                    paddingHorizontal={5}
                    fontSize={15}
                    iconSize={19}
                />
            </View>
        </>
    );
};

export default CategoriesFilterList;
