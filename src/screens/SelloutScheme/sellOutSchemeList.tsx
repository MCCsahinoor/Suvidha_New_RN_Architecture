import { Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts } from '../../themes';
import HeaderCurve from '../../components/HeaderCurve';
import Card from '../../components/Card';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { useCallback, useEffect, useRef, useState } from 'react';
// import MonthPicker from 'react-native-month-year-picker';
import { GetSellOutSchemeList } from '../../services/Scheme/scheme.services';
import { I_SELLOUT_SCHEMES_SEND, I_SELLOUT_SCHEMES_LIST, selloutData } from '../../Interfaces/selloutSchemes.interface';
import DynamicShimmerPlaceholder from '../../utils/dynamicShimmerPlaceholder';
import NoDataFound from '../../components/NoDataFound';
import { useTranslation } from 'react-i18next';
import { momentConvert } from '../../utils/formatDate';
import LinearGradient from 'react-native-linear-gradient';
import { CommonToastModel } from '../../utils/ToastMessageModel';
import React from 'react';
import CustomSwitch from '../../components/SwitchCustom';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import MonthAndYearPicker from '../../components/MonthAndYearPicker';
import Calendar from '../../assets/svg/calendar';

const SellOutScheme = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(true);
  const [selloutSchemesDataAll, setSelloutSchemesDataAll] = useState<any>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



  const onSelectSwitch = (index: number) => {
    SelloutList(index)
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);


  const onDateChange = (newDate: any) => {
    setShowPicker(false);
    if (newDate !== undefined) {
      setSelectedDate(newDate);
    }
  };

  useEffect(() => {
    SelloutList(1);
  }, [selectedDate])


  const SelloutList = (index: number): void => {
    let data: I_SELLOUT_SCHEMES_SEND = {
      "year": selectedDate && selectedDate.getFullYear() ? selectedDate.getFullYear() : new Date().getFullYear(),
      "month": selectedDate && months[selectedDate.getMonth()] ? momentConvert(selectedDate).month() + 1 : new Date().getMonth(),
      "start_end": index == 1 ? "start" : "end"
    };
    setShowLoader(true);
    setRefreshing(false)
    setSelloutSchemesDataAll(null)
    GetSellOutSchemeList<I_SELLOUT_SCHEMES_SEND, I_SELLOUT_SCHEMES_LIST>(data).then(response => {
      setShowLoader(false);
      if (response && response.Data && response.Data.length > 0) {
        setSelloutSchemesDataAll(response.Data);
      } else {
        setSelloutSchemesDataAll(null)
      }
    }).catch(err => {
      setShowLoader(false);
      CommonToastModel('error', err?.error?.response?.data?.errorMessage || err?.response?.data?.errorMessage || 'Something went wrong! Please try again sometime.', 8000);
    });
  };

  useEffect(() => {
    if (refreshing) {
      SelloutList(1)
    }
  }, [refreshing])

  // GO TO Scheme Details
  const schemeDetails = (item: selloutData) => {
    const currentDate = new Date();
    const dateData: any = {
      ...item,
      "year": selectedDate && selectedDate.getFullYear() ? selectedDate.getFullYear() : currentDate.getFullYear(),
      "month": selectedDate && months[selectedDate.getMonth()] ? months[selectedDate.getMonth()] : months[currentDate.getMonth()],
    }
    navigation.navigate('sellOutSchemeDetails', { details: dateData });
  };



  return (
    <>
      <LinearGradient colors={['#36686D', '#84A2A5']} useAngle={true} angle={90} >
        <View style={{ ...styles.schemeFilter }}>
          <View style={{ width: '48%' }}>
            <CustomSwitch
              selectionMode={1}
              roundCorner={true}
              option1={'Start'}
              option2={'End'}
              onSelectSwitch={onSelectSwitch}
              selectionColor={Colors.ui_dark_bg}
            />
          </View>
          <View style={{ width: '49%' }}>
            <Pressable
              onPress={() => { setShowPicker(true); }}>
              <View style={{ ...styles.sameInline }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  {/* <DateIcon /> */}
                  {selectedDate ? (
                    <Text style={{ fontFamily: Fonts.OpenSans500Medium }}>{`${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}</Text>
                  ) : (
                    <Text style={{ fontFamily: Fonts.OpenSans500Medium }}> {t("monthYear")}</Text>
                  )}
                </View>
                <View>
                  <Ionicons name={'chevron-down-outline'} size={17} color="gray" />
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </LinearGradient>

      <HeaderCurve
        topGaap={119}
        headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'}
        pageBackground={'#F2F2F2'}
      />

      <ScrollView style={{ backgroundColor: '#F2F2F2' }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{ ...styles.container }}>
          {selloutSchemesDataAll && selloutSchemesDataAll.length > 0 && (
            <>
              {selloutSchemesDataAll.map((item: selloutData, index: number) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Card>
                    <Pressable onPress={() => schemeDetails(item)}>
                      <View style={{ ...styles.container, marginTop: 10 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <View style={{ width: '90%' }}>
                            <View>
                              <Text style={{ ...styles.schemeName }}> {item.sch_scheme_name} </Text>
                            </View>
                            <View>
                              <Text style={{ ...styles.highLightText, marginTop: 0 }}> {item.sch_scheme_code} </Text>
                            </View>
                            <View style={{ ...styles.iconAlign, marginTop: 8 }}>
                              <Calendar width={18} height={18} />
                              <Text style={{ ...styles.dateLabel }}>
                                {' '} {item.period}
                              </Text>
                            </View>
                          </View>
                          <View >
                            <Ionicons name="chevron-forward-circle-outline" size={25} style={{ color: Colors.color_dark_gray }} />
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  </Card>
                </View>
              ))}
            </>
          )}

          {showLoader && (
            <View style={{ width: '100%' }}>
              <DynamicShimmerPlaceholder borderRadius={5}
                height={100}
                width={"100%"}
                count={5} />
            </View>
          )}

          {!showLoader && selloutSchemesDataAll === null && (
            <NoDataFound content={t('No data found')}></NoDataFound>
          )}
        </View>
      </ScrollView> 
      <CustomBottomSheet
        isVisible={showPicker}
        onClose={() => setShowPicker(false)}
        hideCloseButton={true}
      >
        <MonthAndYearPicker
          value={selectedDate}
          onChange={(newDate: Date) => onDateChange(newDate)}
          minimumDate={new Date(2001, 0)}
          maximumDate={new Date()}
          placeholder="Select Month & Year"
          requiredStar={true}
          disabled={false}
        />
      </CustomBottomSheet>
    </>
  );
};

export default SellOutScheme;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 0
  },
  pickerFonts: {
    marginLeft: 5,
  },
  sameInline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  schemeFilter: {
    //backgroundColor: Colors.ui_dark_bg,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  schemeName: {
    color: Colors.ui_dark_bg,
    fontSize: 14,
    fontFamily: Fonts.poppins600SemiBold,
    textTransform: 'uppercase',
  },
  iconAlign: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 13,
    fontFamily: Fonts.OpenSans600SemiBold,
    color: Colors.color_dark_gray,
    fontWeight: '300',
  },
  highLightText: {
    fontFamily: Fonts.OpenSans600SemiBold,
    color: Colors.color_black,
  },
});
