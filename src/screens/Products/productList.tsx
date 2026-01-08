import { Image, Pressable, ScrollView, Text, View } from "react-native";
import HeaderCurve from "../../components/HeaderCurve";
import { AppImages, Colors, Fonts } from "../../themes";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { GetCategoryDetails, GetSortByLov, SearchBrandsAll } from "../../services/Products/products.services";
import { I_CATEGORIES_LIST, I_LOV_DATA_SORT_BY, I_PRODUCT_LIST } from "../../Interfaces/product.interface";
import CategoriesFilterList from "../../components/ScreensComponent/Products/categoriesFilterList";
import ProductFilter from "../../components/ScreensComponent/Products/productFilter";
import DynamicShimmerPlaceholder from "../../utils/dynamicShimmerPlaceholder";
import { setcategoriesDetailsHandler } from "../../store/features/eSambandhProducts/categoriesDetails";
import { Chip } from 'react-native-paper';
import ProductWithDetailsCard from "../../components/ScreensComponent/Products/productWithDetailsCard";
import { CommonToastModel } from "../../utils/ToastMessageModel";
import CustomBottomSheet from "../../components/CustomBottomSheet";

const ProductList = ({ route, navigation }: any) => {

    const dispatch = useDispatch();
    const [elementVisible, setElementVisible] = useState(true);
    const { categorieId } = route.params;
    const [categoriesDetails, setCategoriesDetails] = useState<I_CATEGORIES_LIST.Category[]>([]);
    const [showLoader, setShowLoader] = useState(false);
    const [getallProduct, setAllProduct] = useState<I_PRODUCT_LIST.IGETProductList[]>([]);
    const [showProductLoader, setshowProductLoader] = useState(false);
    const [getChangeCategories, setChangeCategories] = useState('');
    const [getSelectedCategoriesType, setSelectedCategoriesType] = useState('');
    const [getSelectedFilterData, setSelectedFilterData] = useState<any>([]);
    const [getRawinitFilter, setRawinitFilter] = useState<{ [key: string]: string[] }>({});
    const [getSortLov, setSortLov] = useState<I_LOV_DATA_SORT_BY.Lov[]>([]);
    const [getSelectedSortLov, setSelectedSortLov] = useState<any>(null);
    const userDepo = useSelector((state: any) => state.loginUserDepotData);
    const [errors, setErrors] = useState<any>('')
    const [categoriesBottom, setCategoriesBottom] = useState(false);
    const [filterBottomSheet, setFilterBottomSheet] = useState(false);

    const handleError = (index: number) => {
        const newErrors = [...errors];
        newErrors[index] = true;
        setErrors(newErrors);
    };


    // CATEGORIES BOTTOM SHEET  
    const openCategoriesFilter = () => {
        console.log("Opening categories filter, setting categoriesBottom to true")
        setCategoriesBottom(prev => {
            console.log("Previous state:", prev, "Setting to true")
            return true
        })
    }
    const closeCategoriesBottomSheetRef = () => {
        setCategoriesBottom(false)
    }

    // FILTER
    const open = () => {
        setFilterBottomSheet(true)
        if (getSelectedFilterData) {
            let data = convertDataStructure(getSelectedFilterData)
            setRawinitFilter(data)
        }
    }
    const closeSheet = (): void => {
        setFilterBottomSheet(false)
    };

    const convertDataStructure = (data: any) => {
        if (data) {
            const dataStructure: any = {};
            data.forEach((item: { id: any; value: any; }) => {
                const { id, value } = item;
                if (!dataStructure[id]) {
                    dataStructure[id] = [];
                }
                dataStructure[id].push(value);
            });
            return dataStructure;
        } 
    };

    // CATEGORUES DETAILS API CALL
    const categoryDetails = async (categorieId: string): Promise<void> => {
        const data: any = {
            category_id: categorieId,
            depot_codes: [userDepo]
        }
        setShowLoader(true);
        setCategoriesDetails([])
        GetCategoryDetails<any, any>(JSON.stringify(data)).then(response => {
            if (response && response.data && response.data.length > 0) {
                let getCategoryDetails = response.data as I_CATEGORIES_LIST.Category[];
                setCategoriesDetails(getCategoryDetails)
                dispatch(setcategoriesDetailsHandler(getCategoryDetails));
                setShowLoader(false);
            } else {
                setCategoriesDetails([])
                setShowLoader(false);
                dispatch(setcategoriesDetailsHandler([]));
            }
        }).catch(err => {
            setCategoriesDetails([])
            setShowLoader(false);
            console.log("err categoryDetails", err)
            CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
        });
    };


    // BRANDS LIST API CALL
    const SearchBrands = async (categorieId: string, searchFilters?: any): Promise<void> => {
        if (!categorieId) {
            return
        }
        const data: any = {
            keyword: "",
            sort_by: getSelectedSortLov && getSelectedSortLov.lov_code ? getSelectedSortLov.lov_code : "",
            category: categorieId,
            depot_codes: [userDepo],
            search_filters: searchFilters && searchFilters.length > 0 ? searchFilters : []
        }
        setAllProduct([])
        setshowProductLoader(true)
        SearchBrandsAll<any, any>(JSON.stringify(data)).then(response => {
            setshowProductLoader(false)
            if (response && response.data && response.data.length > 0) {
                let getProductList = response.data as I_PRODUCT_LIST.IGETProductList[];
                setAllProduct(getProductList)
            } else {
                setAllProduct([])
            }
        }).catch(err => {
            setAllProduct([])
            setshowProductLoader(false)
            console.log("err SearchBrands", err)
            CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
        });
    };

    // BRANDS LIST API CALL
    const GetSortByLovData = async (): Promise<void> => {
        GetSortByLov<any, any>().then(response => {
            if (response && response.data && response.data.length > 0) {
                setSortLov(response.data)
                setSelectedSortLov(response.data[0])
            } else {
                setSortLov([])
            }
        }).catch(err => {
            console.log("err GetSortByLovData", err)
            CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
        });
    };


    useEffect(() => {
        if (categorieId) {
            GetSortByLovData();
            setChangeCategories(categorieId) // SET CATEGORIES ID ON LOCAL STATE
            categoryDetails(categorieId); //CATEGORIES API CALL
            SearchBrands(categorieId)
        }
    }, [categorieId]);

    // APPLY CATEGORY FILTER
    const applyCategoriesFilter = (categoryId: string, type: string) => {
        if (categoryId) {
            closeCategoriesBottomSheetRef()
            categoryDetails(categoryId); //CATEGORIES API CALL
            SearchBrands(categoryId);  // BRANDS API CALL
            setChangeCategories(categoryId) // SET CATEGORIES ID ON LOCAL STATE
            setSelectedCategoriesType(type) // SET CATEGORIES TYPE ON LOCAL STATE
        } else {
            CommonToastModel('error', 'No Category selected.', 2000);
        }
    };

    // PRODUCT FILTER //
    const handleApplyFilters = (selectedFilters: { [key: string]: string[] }) => {
        if (selectedFilters) {
            const searchFilters = convertToSearchFilters(selectedFilters);
            setRawinitFilter(selectedFilters)
            if (searchFilters) {
                setSelectedFilterData(searchFilters)
                closeSheet();
                SearchBrands(getChangeCategories, searchFilters);
            }
        } else {
            CommonToastModel('error', 'No filter selected.', 2000);
        }

    };
    const convertToSearchFilters = (input: { [x: string]: any[]; }) => {
        const searchFilters: { id: string; value: any; }[] = [];
        Object.keys(input).forEach((key) => {
            input[key].forEach((value) => {
                searchFilters.push({
                    id: key,
                    value: value
                });
            });
        });
        return searchFilters;
    };

    // REMOVE FILTER CHIP
    const handleRemoveFilter = (value: string) => {
        setSelectedFilterData((prevFilters: any[]) => prevFilters.filter((item: { value: string; }) => item.value !== value));
    };

    // GO TO PRODUCT DETAILS
    const productDetails = (id: string) => {
        navigation.navigate('ProductDetails', { 'brandId': id });
    };

    const changeLov = (item: any) => {
        setSelectedSortLov(JSON.parse(JSON.stringify(item)))
    };

    useEffect(() => {
        SearchBrands(getChangeCategories);
    }, [getSelectedSortLov])


    useEffect(() => {
        SearchBrands(getChangeCategories, getSelectedFilterData);
    }, [getSelectedFilterData])

    // Debug: Log when categoriesBottom state changes
    useEffect(() => {
        console.log("categoriesBottom state changed to:", categoriesBottom);
    }, [categoriesBottom])

    return (
        <>
            <HeaderCurve
                topGaap={119}
                headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'}
                pageBackground={'#fff'}
            /> 
            <View style={{ paddingHorizontal: 15, backgroundColor: '#fff' }}>
                {showLoader ? (
                    <View style={{ width: '100%' }}>
                        <DynamicShimmerPlaceholder borderRadius={5} height={20} width={'50%'} count={1} />
                        <DynamicShimmerPlaceholder borderRadius={5} height={80} width={'100%'} count={1} />
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={{ width: '30%', marginRight: 5 }}><DynamicShimmerPlaceholder borderRadius={100} height={25} width={'100%'} count={1} /></View>
                            <View style={{ width: '30%', marginRight: 5 }}><DynamicShimmerPlaceholder borderRadius={100} height={25} width={'100%'} count={1} /></View>
                            <View style={{ width: '30%' }}><DynamicShimmerPlaceholder borderRadius={100} height={25} width={'100%'} count={1} /></View>
                        </View>
                    </View>
                ) : (
                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 5, paddingBottom: 5 }}>
                            <Pressable
                                onPress={openCategoriesFilter}
                                android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
                            >
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, ...styles.filterBox }}>
                                    <Text style={{ color: Colors.color_dark_gray, fontFamily: Fonts.OpenSans500Medium }}>Categories</Text>
                                    <Ionicons name="filter-circle-outline" size={15} style={{ color: Colors.color_dark_gray }} />
                                </View>
                            </Pressable>

                            <Pressable onPress={() => { open(); }}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, ...styles.filterBox }}>
                                    <Text style={{ color: Colors.color_dark_gray, fontFamily: Fonts.OpenSans500Medium }}>Filters</Text>
                                    <Ionicons name="options" size={15} style={{ color: Colors.color_dark_gray }} />
                                </View>
                            </Pressable>

                            {elementVisible ?
                                <Pressable onPress={() => setElementVisible(!elementVisible)}>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, ...styles.filterBox }}>
                                        <Text style={{ color: Colors.color_dark_gray, fontFamily: Fonts.OpenSans500Medium }}>Sort By</Text>
                                        <Ionicons
                                            name="chevron-down"
                                            size={15}
                                            style={{ color: Colors.color_dark_gray }}
                                        />
                                    </View>
                                </Pressable>
                                :
                                <View style={{ marginLeft: -100, marginTop: -10 }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15, ...styles.sortBox }}>
                                            {getSortLov && getSortLov.length > 0 && getSortLov.map((item: I_LOV_DATA_SORT_BY.Lov, index: number) => (
                                                <Pressable onPress={() => changeLov(item)} key={index} style={{
                                                    backgroundColor: item.lov_code === (getSelectedSortLov && getSelectedSortLov.lov_code) ? Colors.ui_light_bg : 'white',
                                                    padding: item.lov_code === (getSelectedSortLov && getSelectedSortLov.lov_code) ? 5 : 0,
                                                    borderRadius: item.lov_code === (getSelectedSortLov && getSelectedSortLov.lov_code) ? 5 : 0,
                                                }}>

                                                    {errors[index] ? (
                                                        <Image source={{ uri: AppImages.NoImagesAvailable }} style={{
                                                            width: 18,
                                                            height: 18,
                                                            tintColor: item.lov_code === (getSelectedSortLov && getSelectedSortLov.lov_code) ? '#ffffff' : '#000000',
                                                        }} />
                                                    ) : (
                                                        <Image source={{ uri: item.lov_field1_value }}
                                                            style={{
                                                                width: 18,
                                                                height: 18,
                                                                tintColor: item.lov_code === (getSelectedSortLov && getSelectedSortLov.lov_code) ? '#ffffff' : '#000000',
                                                            }}
                                                            onError={() => handleError(index)}
                                                        />
                                                    )}
                                                </Pressable>
                                            ))}
                                        </View>
                                        <View>
                                            <Pressable onPress={() => setElementVisible(!elementVisible)}>
                                                <FontAwesome name='times-circle' size={20} style={{ color: Colors.color_light_red, }} />
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>

                            }
                        </View>
                    </View>
                )}
            </View >

            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ ...styles.container }}>
                    {categoriesDetails && categoriesDetails[0] && (
                        <>
                            <Text style={{ ...styles.headerText, }}>{categoriesDetails[0] && categoriesDetails[0].name}</Text>
                            <Text style={{ ...styles.paraText, }}>{categoriesDetails[0] && categoriesDetails[0].description}</Text>
                        </>
                    )}

                    {showProductLoader ? (
                        <View style={{ width: '100%', marginTop: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ width: '30%', marginRight: 5 }}><DynamicShimmerPlaceholder borderRadius={10} height={100} width={'100%'} count={1} /></View>
                                <View style={{ width: '70%', marginRight: 5 }}><DynamicShimmerPlaceholder borderRadius={10} height={100} width={'100%'} count={1} /></View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ width: '30%', marginRight: 5 }}><DynamicShimmerPlaceholder borderRadius={10} height={100} width={'100%'} count={1} /></View>
                                <View style={{ width: '70%', marginRight: 5 }}><DynamicShimmerPlaceholder borderRadius={10} height={100} width={'100%'} count={1} /></View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ width: '30%', marginRight: 5 }}><DynamicShimmerPlaceholder borderRadius={10} height={100} width={'100%'} count={1} /></View>
                                <View style={{ width: '70%', marginRight: 5 }}><DynamicShimmerPlaceholder borderRadius={10} height={100} width={'100%'} count={1} /></View>
                            </View>
                        </View>
                    ) : (
                        <>
                            <View style={{ backgroundColor: 'white', marginTop: 10, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
                                {getSelectedFilterData && getSelectedFilterData.length > 0 && getSelectedFilterData.map((item: any, index: number) => (
                                    <View key={index} style={{ marginBottom: 5, marginRight: 5 }}>
                                        <Chip onClose={() => handleRemoveFilter(item.value)} mode="outlined" style={{ alignSelf: 'baseline', borderRadius: 100, borderColor: Colors.ui_light_bg, backgroundColor: 'white' }}>{item.value}</Chip>
                                    </View>
                                ))}
                            </View>
                            <View style={{ marginTop: 10 }}>
                                {getallProduct && getallProduct.length > 0 && getallProduct.map((item, index) => (
                                    <View key={index} >
                                        <ProductWithDetailsCard productItem={item} productId={productDetails} />
                                    </View>
                                ))}
                            </View>
                        </>

                    )}
                </View>
            </ScrollView>

            {/* // CATEGORIES FILTER // */}
            <CustomBottomSheet
                isVisible={categoriesBottom}
                onClose={() => closeCategoriesBottomSheetRef()}
                hideCloseButton={true}
            >
                <CategoriesFilterList
                    onPress={(id, type) => { applyCategoriesFilter(id, type) }}
                    selectedCategories={getChangeCategories}
                />
            </CustomBottomSheet>

            {/* // PRODUCT FILTER // */}
            <CustomBottomSheet
                isVisible={filterBottomSheet}
                onClose={() => closeSheet()}
                hideCloseButton={true}
            >
                <ProductFilter onPress={handleApplyFilters} initialFilters={getRawinitFilter}></ProductFilter>
            </CustomBottomSheet>
        </>
    )

};

export default ProductList;
