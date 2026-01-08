import { Image, LogBox, ScrollView, Text, TextInput, View, useWindowDimensions } from "react-native";
import HeaderCurve from "../../components/HeaderCurve";
import { Colors, Fonts } from "../../themes";
import styles from "./style";
import ButtonLarge from "../../components/ButtonLarge";
import { DataTable } from "react-native-paper";
import { GetAllShades, GetBrandDetails, ShareBrandDetailsResponseDto } from "../../services/Products/products.services";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { I_BRANDS_LIST, I_SINGLE_PRODUCT_DETAILS } from "../../Interfaces/product.interface";
import RenderHtml, { HTMLContentModel, HTMLElementModel } from "react-native-render-html";
import { useDispatch, useSelector } from "react-redux";
import { FAB } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import ColorShadeLoader from "../../components/ScreensComponent/loader/colorShadeLoader";
import ProductDetailsLoader from "../../components/ScreensComponent/loader/productDetailsLoader";
import { useTranslation } from "react-i18next";
import InputBox from '../../components/phoneNumberInput';
import { phoneNumberRegex } from "../../utils/regexList";
import { setApiCallLoader } from "../../store/features/apiCallLoader/apiCallLoader";
import { CommonToastModel } from "../../utils/ToastMessageModel";
import i18n from "../../i18n";
import { UserGroupArr } from "../../utils/hierarchyLoginCheck";
import ColorShadeCard from "../../components/ColorShadeCard";
import CustomBottomSheet from "../../components/CustomBottomSheet";

// Ignore specific warning
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

const ProductDetails = ({ route, navigation }: any) => {
  const { brandId } = route.params;
  const [getDetails, setDetails] = useState<I_SINGLE_PRODUCT_DETAILS.IGETSINGLEProductList | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const { width } = useWindowDimensions();
  const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
  const [getUserGroupCode, setUserGroupCode] = useState("");
  // const [SelectedBrand, setSelectedBrand] = useState('')
  const [loadedColorShadeList, setloadedColorShadeList] = useState<I_BRANDS_LIST.ColorShade[]>([]);
  const [searchColorShade, setsearchColorShade] = useState("");
  const [colorItemShade, setColorItemShade] = useState<I_BRANDS_LIST.ColorShade[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [FlatListShowLoader, setFlatListShowLoader] = useState(false);
  const [colorShowLoader, setColorShowLoader] = useState(false);
  let AllColorShadeList: I_BRANDS_LIST.ColorShade[];
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Partial<any>>({});
  const [formData, setFormData] = useState<any>({ mobileNumber: '' });
  const [selectedDataType, setSelectedDataType] = useState('');
  const isAPICall = useSelector((state: any) => state.apiCallLoader);
  const dispatch = useDispatch();
  const customBottomSheetTitle = i18n.t('enterWhatsappNumber');
  const [fabOpen, setFABOpen] = useState(false);
  const userDepo = useSelector((state: any) => state.loginUserDepotData);
  const [getExecutiveLogin, setExecutiveLogin] = useState('');
  const [bottomSheetShare, setBottomSheetShare] = useState(false);
  const [bottomSheetDetails, setBottomSheetDetails] = useState(false);

  useEffect(() => {
    if (executiveLoginCheck) {
      setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
    }
  }, [executiveLoginCheck]);
  // BRAND DETAILS API CALL
  const fetchBrandDetails = async (brandId: string) => {
    const data = {
      brands: [brandId],
      site_id: "",
      depot_codes: [userDepo],
    };
    setShowLoader(true);
    GetBrandDetails<any, any>(JSON.stringify(data)).then((response) => {
      if (response && response.data && response.data[0]) {
        setDetails(response.data[0]);
        setShowLoader(false);
      } else {
        setDetails(null);
        setShowLoader(false);
      }
    }).catch((err) => {
      setDetails(null);
      setShowLoader(false);
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  };

  useEffect(() => {
    if (brandId) {
      fetchBrandDetails(brandId);
    }
  }, [brandId]);

  // html <img> tag hendel
  const customRenderers = {
    img: ({ tnode }: any) => {
      const { src, alt, style } = tnode.attributes;
      const [imageError, setImageError] = useState(false);

      return (
        <>
          {!imageError ? (
            <Image
              style={{ width: '100%', height: 100 }} // Adjust height as needed
              source={{
                uri: src.startsWith('//') ? `https:${src}` : src,
              }}
              resizeMode={'contain'}
              onError={() => setImageError(true)}
            />
          ) : (
            <Image style={{ width: '100%', height: 100 }}
              source={{
                uri: 'https://bpilmobile.bergerindia.com/VIRTUAL_DOCS/SUVIDHA_API/Application/Application_Image/no_image_available.jpg', // Your fallback image URL
              }}
              resizeMode={'contain'}
            />
          )}
        </>
      );
    },
  };

  // html <p>, <il> tag hendel
  const customHTMLElementModels = {
    ul: HTMLElementModel.fromCustomModel({
      tagName: "ul",
      mixedUAStyles: {
        marginLeft: 5,
        width: "95%",
        textAlign: "left",
      },
      contentModel: HTMLContentModel.block,
    }),
    p: HTMLElementModel.fromCustomModel({
      tagName: "p",
      mixedUAStyles: {
        marginLeft: 0,
      },
      contentModel: HTMLContentModel.block,
    }),
  };
  // Remder IMG
  const renderersProps = {
    img: {
      enableExperimentalPercentWidth: true,
    },
  };

  useEffect(() => {
    if (executiveLoginCheck) {
      setUserGroupCode(executiveLoginCheck["UserGroupCode"]);
    }
  }, [executiveLoginCheck]);

  useEffect(() => {
    if ((brandId ?? "") != "" && (searchColorShade == "" || searchColorShade.length >= 3)) {
      // setloadedColorShadeList([])
      getAllshade();
    }
  }, [brandId, searchColorShade]);

  useEffect(() => {
    if (loadedColorShadeList.length == 0 && colorItemShade.length > 0) {
      loadMore(colorItemShade);
    }
  }, [loadedColorShadeList, colorItemShade]);

  const getAllshade = async () => {
    let flattenedShadesListGrpByShadeCard: any = [];
    let AllflattenedShadesListGrpByShadeCard: any = [];
    setColorShowLoader(true);
    let data: any = {
      brand_id: brandId,
      search_keyword: searchColorShade,
      shade_card_id: 0,
    };

    setColorItemShade([]);

    await GetAllShades(JSON.stringify(data)).then((response: any) => {
      if (response && response.data) {
        setloadedColorShadeList([]);
        setRefreshing(false);
        const allShades = [
          ...response.data.cb_shades,
          ...response.data.ncb_shades,
          ...response.data.bases,
        ];
        const flattenedShades = allShades.map((shade: any, index: any) => ({
          ...shade,
          key: index,
          backgroundColor: `rgb(${shade.shade_color_r}, ${shade.shade_color_g}, ${shade.shade_color_b})`,
        }));

        flattenedShadesListGrpByShadeCard = flattenedShades.reduce((prev: any, now: any) => {
          if (!prev[now.shade_card_desc]) {
            prev[now.shade_card_desc] = [];
          }
          prev[now.shade_card_desc].push(now);
          return prev;
        }, {});

        Object.keys(flattenedShadesListGrpByShadeCard).map((data) => {
          AllflattenedShadesListGrpByShadeCard = JSON.parse(JSON.stringify(AllflattenedShadesListGrpByShadeCard.concat(flattenedShadesListGrpByShadeCard[data])));
        });
        setColorItemShade(AllflattenedShadesListGrpByShadeCard);
        AllColorShadeList = JSON.parse(JSON.stringify(AllflattenedShadesListGrpByShadeCard));
        setColorShowLoader(false);
      } else {
        setColorItemShade([]);
        setloadedColorShadeList([]);
        setColorShowLoader(false);
        setRefreshing(false);
      }
    }).catch((err: any) => {
      setColorShowLoader(false);
      setRefreshing(false);
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  };

  const loadMore = (colorItemShade: any) => {
    setColorShowLoader(true);
    let orginalArrLLength: any = colorItemShade.length;
    let copyArrLength: any = loadedColorShadeList.length;
    if (Number(orginalArrLLength) > Number(copyArrLength)) {
      const loadnext = Number(orginalArrLLength) - Number(copyArrLength) >= 21 ? 9 : Number(orginalArrLLength) - Number(copyArrLength);
      if (copyArrLength > 0) {
        for (var i = 1; i <= loadnext; i++) {
          let index = copyArrLength - 1 + i;
          loadedColorShadeList.push(colorItemShade[index]);
        }
        setloadedColorShadeList(JSON.parse(JSON.stringify(loadedColorShadeList)));
      } else {
        let firstLoadLength: any = 0;
        if (Number(orginalArrLLength) >= 21) {
          firstLoadLength = 21;
        } else {
          firstLoadLength = orginalArrLLength;
        }
        for (let i = copyArrLength; i < firstLoadLength; i++) {
          loadedColorShadeList.push(colorItemShade[i]);
        }
        copyArrLength = loadedColorShadeList.length;
        setloadedColorShadeList(
          JSON.parse(JSON.stringify(loadedColorShadeList))
        );
      }
      setColorShowLoader(false);
    } else if (Number(orginalArrLLength) == Number(copyArrLength)) {
      setColorShowLoader(false);
    }
  };
  const GetReachEnd = (ReachEnd: any) => {
    if (ReachEnd) {
      setFlatListShowLoader(true);
      loadMore(colorItemShade);
    } else {
      setFlatListShowLoader(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setloadedColorShadeList([]);
  }, []);

  const colorDescFullDetails = () => {
    setBottomSheetDetails(true)
  }

  const closeSheet = (): void => {
    setBottomSheetDetails(false)
  };

  const handlePress = (share_type_desc: any) => {
    setSelectedDataType(share_type_desc)
    setBottomSheetShare(true)
  };

  const actions = useMemo(() => {
    return getDetails?.downloadables.map((item, index) => ({
      icon: index % 2 === 0 ? "file-check-outline" : "file-multiple-outline", // index % 2 === 0 checks if the index is even, and assigns "file-check-outline" for even indices and "file-multiple-outline" for odd indices.
      label: item.desc,
      onPress: () => handlePress(item.desc),
    })) || [];
  }, [getDetails]);

  const onPressClose = () => {
    setBottomSheetShare(false)
  };

  // PHONE NUMBER VALIDATION
  const validateForm = () => {
    const newErrors: Partial<any> = {};
    const safeTrim = (value: string | null | undefined) => (value ?? '').trim();
    const painterMobile = safeTrim(formData.mobileNumber);
    if (painterMobile === '') {
      newErrors.mobileNumber = i18n.t('ContactRequired');
    } else if (formData.mobileNumber.trim().length !== 10) {
      newErrors.mobileNumber = i18n.t('Contact10digitslong');
    } else if (!phoneNumberRegex.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = i18n.t('InvalidContact');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ERROR HELDAL
  const handleChange = (name: string, value: any) => {
    setErrors({ ...errors, [name]: '' });
    setFormData({ ...formData, [name]: value });
  };

  // FINAL WHATSAPP NUMBER SUBMIT (FOR WHATSAPP SHARE)
  const whatsappSend = () => {
    const isValid = validateForm();
    console.log(isValid)
    if (isValid) {
      console.log("FINAL SUBMIT", formData.mobileNumber)
      WhatsappShare(formData.mobileNumber)
      return true;
    } else {
      return false;
    }
  }

  //  WHATSAPP SHARE
  const WhatsappShare = (mobileNumber: string): void => {
    let data: any = {
      "brand_id": brandId,
      "whatsapp_no": mobileNumber,
      "share_type_desc": selectedDataType,
      "depot_code": userDepo
    };
    console.log(data)
    dispatch(setApiCallLoader(true));
    ShareBrandDetailsResponseDto<any, any>(data).then(response => {
      dispatch(setApiCallLoader(false));
      if (response && response.response_code == "1") {
        CommonToastModel('success', response.response_message, 5000);
      } else {
        CommonToastModel('error', response.response_message, 5000);
      }
      setTimeout(() => { onPressClose(); }, 10);
      setFormData({ mobileNumber: '' });
      setSelectedDataType('')
    }).catch(err => {
      dispatch(setApiCallLoader(false));
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  };


  return (
    <>
      <HeaderCurve topGaap={119} headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'} pageBackground={"#fff"} />
      {showLoader ? (
        <View style={{ width: "100%", backgroundColor: "#fff", paddingHorizontal: 15 }} >
          <ProductDetailsLoader />
        </View>
      ) : (
        <>
          {getDetails && (
            <>
              <View style={{ paddingHorizontal: 10, backgroundColor: "#fff" }}>
                <Text style={{ ...styles.headerText }}>
                  {getDetails.brand_name}
                </Text>
              </View>
              <ScrollView style={{ backgroundColor: "#fff" }}>
                <View style={{ ...styles.container }}>
                  <View>
                    <View>
                      <Text style={{ ...styles.paraText }}>
                        {getDetails.brand_short_desc}
                      </Text>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                      <Image
                        source={getDetails && getDetails.brand_media[0].url ? { uri: getDetails.brand_media[0].url } : require("../../assets/images/emptyBucket.png")}
                        style={{ height: 250, width: "100%", resizeMode: "contain", borderRadius: 8, }} />
                    </View>
                  </View>

                  {colorShowLoader ? (
                    <ColorShadeLoader />
                  ) : (
                    <>
                      <Text style={{ color: Colors.ui_dark_bg, ...styles.filterParaTitle }}> {t("colorShade")} </Text>
                      <View style={{ width: '100%', backgroundColor: '#fff', marginBottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', borderColor: 'gray', borderWidth: 1, borderRadius: 100, height: 43, paddingHorizontal: 5 }}>
                        <Ionicons style={[styles.searchIcon]} name="search" size={22} />
                        <TextInput
                          keyboardType="default"
                          secureTextEntry={false}
                          placeholder={t("searchColorShade")}
                          placeholderTextColor={Colors.color_gray}
                          value={searchColorShade}
                          onChangeText={(val: string) => setsearchColorShade(val)}
                          style={{ width: '90%', fontFamily: Fonts.OpenSans600SemiBold }}
                        />

                      </View>
                      {loadedColorShadeList && loadedColorShadeList.length > 0 ? (
                        <View style={{ height: 300 }}>
                          <ColorShadeCard
                            loadedColorShadeList={loadedColorShadeList}
                            ReachEndFlag={GetReachEnd}
                            onRefresh={onRefresh}
                            showLoader={FlatListShowLoader}
                            nestedScrollEnabled={true} // Enable nested scrolling
                          />
                        </View>
                      ) : (
                        <View style={{ ...styles.flexRowDetails, justifyContent: "center", marginTop: 100 }} >
                          <Image source={require("../../assets/images/colorCatelogue.png")} style={{ height: 50, width: 50, resizeMode: "contain", borderRadius: 8 }} />
                          <View style={{ paddingLeft: 10 }}>
                            <Text style={{ fontSize: 17, color: Colors.color_dark_gray, fontFamily: Fonts.OpenSans600SemiBold }}>
                              {t("noColorShadeFound")}
                            </Text>
                          </View>
                        </View>
                      )}
                    </>
                  )}

                  <View>
                    <Text style={{ ...styles.colorDesc, fontSize: 12 }}>{t("shadeDesc1")} <Text onPress={() => colorDescFullDetails()} style={{ color: Colors.ui_dark_bg }}>{t("shadeDesc2")}</Text></Text>
                  </View>

                  {/* Overview */}
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ color: Colors.ui_dark_bg, ...styles.filterParaTitle }} >
                      {t("Overview")}
                    </Text>
                    {(getDetails.b2b_brand_desc || getDetails.brand_desc) && (
                      <View style={{ display: "flex", flexDirection: "row", gap: 5, marginBottom: 5, }} >
                        <RenderHtml
                          contentWidth={width}
                          source={{ html: getUserGroupCode === "PAINTER" ? getDetails.b2b_brand_desc : getDetails.brand_desc }}
                          enableExperimentalMarginCollapsing={true}
                          customHTMLElementModels={customHTMLElementModels}
                          renderersProps={renderersProps}
                          renderers={customRenderers}
                        />
                      </View>
                    )}
                  </View>

                  <View style={{ marginVertical: 20, marginBottom: 100 }}>
                    <Text style={{ color: Colors.ui_dark_bg, ...styles.filterParaTitle }} >
                      {t("specifications")}
                    </Text>
                    <View style={{ marginTop: 10 }}>
                      <DataTable>
                        <DataTable.Header style={styles.head}>
                          <DataTable.Title textStyle={styles.title}>
                            Poperty
                          </DataTable.Title>
                          <DataTable.Title textStyle={{ ...styles.title }}>
                            Description
                          </DataTable.Title>
                        </DataTable.Header>
                        {getDetails &&
                          getDetails.brand_metafields.length > 0 &&
                          getDetails.brand_metafields.map((meta, index) => (
                            <DataTable.Row style={{ ...styles.row }} key={index} >
                              <DataTable.Cell>
                                <View style={{ paddingVertical: 5 }}>
                                  <Image
                                    source={{ uri: meta.image && meta.image.length > 0 && meta.image[0].url ? meta.image[0].url : require("../../assets/images/emptyBucket.png") }}
                                    style={{ height: 30, width: 30, resizeMode: "cover", borderRadius: 0, }} />
                                  <Text style={{ ...styles.colTitle }}>
                                    {meta["name"]}
                                  </Text>
                                </View>
                              </DataTable.Cell>
                              <DataTable.Cell>
                                <Text style={{ ...styles.colTitleSecond }}>
                                  {meta["value"]}
                                </Text>
                              </DataTable.Cell>
                            </DataTable.Row>
                          ))}
                      </DataTable>
                    </View>
                  </View>
                </View>
              </ScrollView>
              {!UserGroupArr.includes(getExecutiveLogin.toLowerCase()) &&
                <FAB.Group
                  open={fabOpen}
                  visible
                  color={Colors.ui_dark_bg}
                  icon={fabOpen ? "whatsapp" : "share-variant"}
                  actions={actions}
                  variant="surface"
                  onStateChange={({ open }) => setFABOpen(open)}
                />
              }
            </>
          )}
        </>
      )}




      <CustomBottomSheet
        isVisible={bottomSheetShare}
        onClose={() => onPressClose()}
        sheetTitle={customBottomSheetTitle}
      >
        <View style={{ ...styles.centerContent, paddingHorizontal: isAPICall ? 15 : 0 }}>
          <View>
            <InputBox
              keyboardType="numeric"
              label=""
              showLabel={false}
              countryFlag={false}
              showPlaceholder={true}
              placeholder={t("enterWhatsappNumber")}
              key={'mobileNumber'}
              maxLength={10}
              onChange={(val: any) => handleChange('mobileNumber', val)}
              defaultValue={formData.mobileNumber}
              error={errors.mobileNumber}
            />
            <View style={{ backgroundColor: 'white' }}>
              <ButtonLarge
                title={t("Send")}
                onPress={whatsappSend}
                fillBtn={true}
                key={'send'}
                showIcon={false}
                iconName=""
                paddingVertical={10}
                paddingHorizontal={10}
                fontSize={18}
                iconSize={19}
                isAPICall={isAPICall}
                disabled={isAPICall} />
            </View>
          </View>
        </View>
      </CustomBottomSheet>

      <CustomBottomSheet
        isVisible={bottomSheetDetails}
        onClose={() => closeSheet()}
        sheetTitle={''}
      >
        <View>
          <Text style={{ ...styles.colorDesc }}>{t("shadeDescFull")}</Text>
        </View>
      </CustomBottomSheet>


    </>
  );
};

export default ProductDetails;
