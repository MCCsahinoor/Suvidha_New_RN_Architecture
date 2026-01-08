/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useState } from 'react';
import {
    View,
    Text,
    Pressable,
    Image,
    ScrollView,
} from 'react-native';
import styles from './styles';
import { AppImages, Colors, Fonts } from '../../../themes';
import { I_CATEGORIES_LIST, I_GET_CATEGORY_LIST_NORMAL_ORDER } from '../../../Interfaces/product.interface';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import NoDataFound from '../../NoDataFound';
import ButtonLarge from '../../ButtonLarge';
import CustomCheckbox from '../../CustomCheckbox';

export interface I_Product_Filter {
    onPress: (selectedFilters: { [key: string]: string[] }) => void;
    selectedCategories?: string;
    type?: string;
    initialFilters?: { [key: string]: string[] }; // New prop for initial filters
}

const ProductFilter: FC<I_Product_Filter> = ({ onPress, selectedCategories, type, initialFilters = {} }) => {
    const allProductCategoriesDetails = useSelector((state: any) => state.productCategoriesDetails);
    const [categoriesDetails, setCategoriesDetails] = useState<I_CATEGORIES_LIST.Category[]>([]);
    const [allFilterAbleProps, setAllFilterAbleProps] = useState<any>([]);
    const [selectedFilterGroups, setSelectedFilterGroups] = useState<{ [key: string]: I_GET_CATEGORY_LIST_NORMAL_ORDER.FilterValue[] }>({});
    const [selectedFilterData, setSelectedFilterData] = useState<I_GET_CATEGORY_LIST_NORMAL_ORDER.All_Filterable_Meta | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>(initialFilters);
    const [errors, setErrors] = useState<any>('')

    const handleError = (index: number) => {
        const newErrors = [...errors];
        newErrors[index] = true;
        setErrors(newErrors);
    };
    useEffect(() => {
        if (allProductCategoriesDetails) {
            setCategoriesDetails(allProductCategoriesDetails);
        }
    }, [allProductCategoriesDetails]);

    useEffect(() => {
        if (categoriesDetails) {
            optimizeDataFilter(categoriesDetails);
        }
    }, [categoriesDetails]);

    const optimizeDataFilter = (categoriesDetailsData: any) => {
        let selectedCatItem = categoriesDetailsData[0] as I_GET_CATEGORY_LIST_NORMAL_ORDER.Category;
        let filterProps: any[] = [];
        if (selectedCatItem && selectedCatItem.search_filters && selectedCatItem.search_filters?.length > 0) {
            selectedCatItem.search_filters?.forEach((filter: any) => {
                let filterItem: I_GET_CATEGORY_LIST_NORMAL_ORDER.All_Filterable_Meta = filter as I_GET_CATEGORY_LIST_NORMAL_ORDER.All_Filterable_Meta;
                filterProps.push(filterItem);
                setAllFilterAbleProps(filterProps);
                setSelectedFilterData(filterProps[0]);
            });
            setAllFilterAbleProps(filterProps);
            groupFilterValues(filterProps);
        } else {
            setSelectedFilterData(null);
        }
    };

    const groupFilterValues = (filterProps: I_GET_CATEGORY_LIST_NORMAL_ORDER.All_Filterable_Meta[]) => {
        let groupedFilters: { [key: string]: I_GET_CATEGORY_LIST_NORMAL_ORDER.FilterValue[] } = {};
        filterProps.forEach(filter => {
            filter.filter_values.forEach(value => {
                if (!groupedFilters[filter.filter_id]) {
                    groupedFilters[filter.filter_id] = [];
                }
                groupedFilters[filter.filter_id].push(value);
            });
        });
        setSelectedFilterGroups(groupedFilters);
    };

    const selectFilterRecod = (selectedItem: I_GET_CATEGORY_LIST_NORMAL_ORDER.All_Filterable_Meta) => {
        setSelectedFilterData(selectedItem);
    };

    const handleCheckboxChange = (filterId: string, value: string, isChecked: boolean) => {
        setSelectedFilters(prevState => {
            const newFilters = { ...prevState };
            if (isChecked) {
                if (!newFilters[filterId]) {
                    newFilters[filterId] = [];
                }
                newFilters[filterId].push(value);
            } else {
                if (newFilters[filterId]) {
                    newFilters[filterId] = newFilters[filterId].filter(item => item !== value);
                    if (newFilters[filterId].length === 0) {
                        delete newFilters[filterId];
                    }
                }
            }
            return newFilters;
        });
    };

    const handleReset = () => {
        setSelectedFilters({});
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={{ ...styles.bookletContent, marginBottom: 10 }}>
                    <Text style={styles.headerText}>Filter</Text>
                    {categoriesDetails && categoriesDetails[0] && categoriesDetails[0].search_filters && categoriesDetails[0].search_filters.length > 0 && (
                        <Text onPress={() => handleReset()} style={{ ...styles.sheenText, color: Colors.color_gray, }}><FontAwesome name='redo' size={15} /> Reset</Text>
                    )}
                </View>
                <View>
                    {categoriesDetails && categoriesDetails[0] && categoriesDetails[0].search_filters && categoriesDetails[0].search_filters.length > 0 ? (
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={{ width: '30%', borderRightColor: Colors.color_semi_dark_gray, borderRightWidth: 1, paddingRight: 0 }} >
                                {allFilterAbleProps.map((item: any, index: any) => (
                                    <View key={index}>
                                        <Pressable onPress={() => selectFilterRecod(item)}>
                                            <View style={{ padding: 2, borderBottomColor: Colors.color_light_gray, borderBottomWidth: index === allFilterAbleProps.length - 1 ? 0 : 1 }}>

                                                {errors[index] ? (
                                                    <Image source={{ uri: AppImages.NoImagesAvailable }} style={{ height: 30, width: 30, resizeMode: 'cover' }} resizeMode="contain" />
                                                ) : (
                                                    <Image source={{ uri: item.filter_image_url }} style={{ height: 30, width: 30, resizeMode: 'cover' }} onError={() => handleError(index)} />
                                                )}
                                                <Text style={{ fontSize: 12, textTransform: 'capitalize', marginLeft: 0, fontFamily: Fonts.poppins500Medium }}>{item.filter_name.toLowerCase()}</Text>
                                            </View>
                                        </Pressable>
                                        {selectedFilterData?.filter_id === item.filter_id && (
                                            <View style={{ backgroundColor: Colors.ui_dark_bg, position: 'absolute', right: 0, height: '100%', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} >
                                                <Text style={{ color: Colors.ui_dark_bg, fontSize: 10 }}>s</Text>
                                            </View>
                                        )}
                                    </View>
                                ))}
                            </View>
                            <View style={{ width: '70%' }}>
                                <ScrollView style={{ padding: 10, paddingTop: 0, maxHeight: 300 }}>
                                    {selectedFilterData && selectedFilterGroups[selectedFilterData.filter_id] && selectedFilterGroups[selectedFilterData.filter_id].length > 0 && selectedFilterGroups[selectedFilterData.filter_id].map((item: any, index: any) => (
                                        <View key={index} style={{ ...styles.activityItem, marginVertical: 5 }}>
                                            <View style={{ width: '85%' }}>
                                                <Text style={styles.label}>{item.value}</Text>
                                            </View>
                                            <View style={styles.checkboxContainer}>
                                                <CustomCheckbox
                                                    checked={selectedFilters[selectedFilterData.filter_id]?.includes(item.value) || false}
                                                    onToggle={(newValue) => handleCheckboxChange(selectedFilterData.filter_id, item.value, newValue)}
                                                    size={20}
                                                />
                                            </View>

                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    ) : (
                        <View style={{ marginVertical: 10 }}>
                            <NoDataFound content={'No Filter Found'}></NoDataFound>
                        </View>
                    )}
                </View>
            </View >

            {categoriesDetails && categoriesDetails[0] && categoriesDetails[0].search_filters && categoriesDetails[0].search_filters.length > 0 && (
                <View style={{ marginTop: 10 }}>
                    <ButtonLarge
                        title={'Apply'}
                        onPress={() => onPress(selectedFilters)}
                        fillBtn={true}
                        key={'ApplyFilters'}
                        showIcon={false}
                        iconName=""
                        paddingVertical={7}
                        paddingHorizontal={5}
                        fontSize={15}
                        iconSize={19}
                    />
                </View>
            )}
        </View >
    );
};

export default ProductFilter;