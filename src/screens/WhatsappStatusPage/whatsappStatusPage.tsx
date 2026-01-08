import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Colors, Fonts } from '../../themes';
import WhatsappStatus from '../../components/ScreensComponent/WhatsappStatus';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRef, useState } from 'react';
import { ddmmyyyConverter, getModifiedDateAsISOString } from '../../utils/formatDate';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setbottomSheetHandler } from '../../store/features/bottomSheetHandler/bottomSheetHandler';
import { setDateRangeSlice } from '../../store/features/DatePicker/dateRangePicker';
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';
import { DataTable } from 'react-native-paper';
import { GetWhatsappShareQrScanDetails, GetWhatsAppStatusType } from '../../services/WhatsappStatus/WhatsappStatus.Service';
import DynamicShimmerPlaceholder from '../../utils/dynamicShimmerPlaceholder';
import HeaderCurve from '../../components/HeaderCurve';
import SingelSelectdropdownWithLocalSearch from '../../components/SingelSelectdropdownWithLocalSearch';
import DateRangePickerModel from '../../components/DateRangePickerModel';
import Calendar from '../../assets/svg/calendar';
import CustomBottomSheet from '../../components/CustomBottomSheet';
interface WhatsAppStatus {
    code: string;
    value: string;
    value_seq: number;
}
interface WhatsAppStatusResponse {
    data: WhatsAppStatus[];
    response_code: number;
    response_message: string;
}
interface WhatsappShareQrScanDetails {
    WhatsappNumber: string;
    WhatsappDatetime: string;
    WhatsappDelStatus: string;
}

interface GetWhatsappShareQrScanDetailsResponse {
    [x: string]: any;
    TotalRowCount: number;
    WhatsappShareQrScanDetails: WhatsappShareQrScanDetails[];
}
interface WhatsappShareQrScanItem {
    // key: number;
    no: string;
    dates: string;
    status: string;
}



const WhatsappStatusPage = (props: any) => {
    const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });
    const [isFocus, setIsFocus] = useState(false);
    const [statusvalue, setStatusValue] = useState('');
    const [page, setPage] = React.useState<number>(0);
    const [dropdownData, setDropdownData] = useState<{ label: string; value: string }[]>([]);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [apiData, setApiData] = useState<any>([]);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [isApiCall, setIsApiCall] = useState(false);
    const dateRangeSelector = useSelector((state: any) => state.dateRangeSlice);
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [showPicker, setShowPicker] = useState(false);
    let isCloseFlag = false
    const customBottomSheetTitle = '';

    const open = () => {
        isCloseFlag = false
        setShowPicker(true);
    };


    const closeSheet = (SelectedDate?: any): void => { 
        setShowPicker(false)
        dispatch(setbottomSheetHandler({}));
        if (isCloseFlag == false) { 
            if ((SelectedDate ?? '') != '' && (SelectedDate.startDate ?? '') != '') {
                isCloseFlag = true
                setDateRange({
                    startDate: new Date(SelectedDate.startDate).toISOString(),
                    endDate: new Date(SelectedDate.endDate).toISOString(),
                });

                dispatch(setDateRangeSlice({
                    startDate: new Date(SelectedDate.startDate).toISOString(),
                    endDate: new Date(SelectedDate.endDate).toISOString(),
                }))
            }
            else {
                isCloseFlag = true
                console.log("dateRangeSelector", dateRangeSelector)
                setDateRange({
                    startDate: ddmmyyyConverter(dateRangeSelector['startDate'], 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                    endDate: ddmmyyyConverter(dateRangeSelector['startDate'], 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                });

                dispatch(setDateRangeSlice({
                    startDate: ddmmyyyConverter(dateRangeSelector['startDate'], 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                    endDate: ddmmyyyConverter(dateRangeSelector['startDate'], 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                }))
            }
        }
    };

    const defaultDateRange = () => {
        if (dateRangeSelector && dateRangeSelector?.startDate) {
            const defalutDate = {
                startDate: new Date(dateRangeSelector['startDate']).toISOString(),
                endDate: new Date(dateRangeSelector['endDate']).toISOString(),
            }
            setDateRange(JSON.parse(JSON.stringify(defalutDate)));
            dispatch(setDateRangeSlice(JSON.parse(JSON.stringify(defalutDate))));
        } else {
            setDateRange({
                startDate: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() - 1,
                    new Date().getDate(),
                ).toISOString(),
                endDate: new Date().toISOString(),
            });
            const defalutDate = {
                startDate: getModifiedDateAsISOString('YYYY-MM-DD', 1),
                endDate: new Date().toISOString(),
            }
            dispatch(setDateRangeSlice(JSON.parse(JSON.stringify(defalutDate))));
        }

    };
    useEffect(() => {
        defaultDateRange();
    }, []);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response: WhatsAppStatusResponse = await GetWhatsAppStatusType();
                if (response?.data) {
                    const transformedData = response.data.map(item => ({
                        label: item.value,
                        value: item.code,
                    }));
                    setDropdownData(transformedData);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);


    useEffect(() => {
        setIsApiCall(true);
        const fetchData = async () => {
            try {

                if (dateRange?.startDate && dateRange?.endDate) {
                    const rowCount = page === 0 ? 1 : page * itemsPerPage + 1;
                    const fetchRows = itemsPerPage;
                    const response = await GetWhatsappShareQrScanDetails<any, GetWhatsappShareQrScanDetailsResponse>({
                        from_date: dateRange.startDate,
                        to_date: dateRange.endDate,
                        delStatus: statusvalue,
                        RowCount: rowCount,
                        FetchNextRows: fetchRows,
                    });
                    if (response?.data) {
                        setApiData(response.data.WhatsappShareQrScanDetails);
                        setTotalRowCount(response.data.TotalRowCount);
                    }
                }
                setIsApiCall(false);
            } catch (error) {
                setIsApiCall(false);
            }
        };
        fetchData();
    }, [page, itemsPerPage, statusvalue, dateRange]);




    const from = page * itemsPerPage + 1;
    const to = Math.min((page + 1) * itemsPerPage, totalRowCount);


    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };


    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);

    };
    useEffect(() => {
        if (statusvalue) {

            setFilteredData(apiData.filter((item: any) => item.WhatsappDelStatus === statusvalue));
        } else {
            setFilteredData(apiData);
        }
    }, [statusvalue, apiData]);


    const filterDataByDateRange = (data: any[], startDate: string | undefined, endDate: string | undefined) => {
        if (!startDate || !endDate) {
            return [];
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        return data.filter((item) => {
            const itemDate = new Date(item.WhatsappDatetime);
            return itemDate >= start && itemDate <= end;
        });
    };
    useEffect(() => {
        const filteredData = filterDataByDateRange(
            apiData,
            dateRange?.startDate,
            dateRange?.endDate
        );
        setFilteredData(filteredData);
    }, [apiData, dateRange]);





    return (
        <>
            <HeaderCurve
                topGaap={119}
                headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'}
                pageBackground={'#F2F2F2'}
            />
            <ScrollView style={{ backgroundColor: '#F2F2F2' }}>
                <WhatsappStatus navigation={navigation} isDashboard={false} />
                <View
                    style={{
                        paddingHorizontal: 15,
                        marginBottom: 10,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: 2,
                    }}>
                    <Pressable
                        onPress={() => {
                            open();
                        }}
                        style={{ width: '45%' }}>
                        <Text style={{
                            fontSize: 12,
                            color: Colors.color_black, fontFamily: Fonts.OpenSans500Medium, marginLeft: 3
                        }}>
                            {t("SelectDateRange")}
                        </Text>
                        <View style={{ ...styles.sameInline }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Calendar width={18} height={18} />
                                <Text style={{ marginLeft: 5, fontSize: 12, fontFamily: Fonts.OpenSans500Medium, }}>
                                    {dateRange && dateRange['startDate'] ? `${ddmmyyyConverter(dateRange['startDate'], 'DD MMM')} - ${ddmmyyyConverter(dateRange['endDate'], 'DD MMM')}` : 'Date'}</Text>
                            </View>
                            <View>
                                <Ionicons name={'chevron-down-outline'} size={15} color="gray" />
                            </View>
                        </View>
                    </Pressable>
                    <View style={{ width: 175 }}>
                        <View style={{ marginTop: -5, marginBottom: -10 }}>
                            <SingelSelectdropdownWithLocalSearch
                                optionData={dropdownData}
                                showLabel={true}
                                label={t("Status")}
                                showPlaceholder={true}
                                placeholder={t("SelectStatus")}
                                defaultValue={statusvalue}
                                selectedValue={(item: any) => {
                                    setStatusValue(item.value);
                                }}
                                changeBackground={'#FFFF'}
                                changeHeight={38.5}
                                changeFontSize={12}
                                changeColor={Colors.color_black}
                                changeLabelSize={13}
                            />

                        </View>

                    </View>
                </View>

                <DataTable style={{ paddingHorizontal: 8, }}  >
                    <DataTable.Header style={{ ...styles.TableHeader, }}>
                        <DataTable.Title style={{ flex: 2.5 }} textStyle={styles.title}>
                            {t("WhatsAppNumberes")}
                        </DataTable.Title>
                        <DataTable.Title style={{ flex: 2.5 }} textStyle={styles.title}>
                            {t("Dates")}
                        </DataTable.Title>
                        <DataTable.Title style={{ flex: 1.5 }} textStyle={styles.title}>
                            {t("Status")}
                        </DataTable.Title>

                    </DataTable.Header>
                    <>

                        {/* {apiData.length > 0 ? ( 
                            apiData.map((item: any, index: number) => (
                                <DataTable.Row style={{ ...styles.tableRowStyle }} key={index}>
                                    <DataTable.Cell style={{ flex: 2.5 }} textStyle={styles.colTitle}>
                                        {item.WhatsappNumber}
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{ flex: 2.5 }} textStyle={styles.colTitle}>
                                        {ddmmyyyConverter(item.WhatsappDatetime, 'DD-MM-YYYY')}
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{ flex: 1.5 }} textStyle={styles.colTitle}>
                                        {item.WhatsappDelStatus ? item.WhatsappDelStatus.charAt(0).toUpperCase() + item.WhatsappDelStatus.slice(1) : '-'}
                                    </DataTable.Cell>

                                </DataTable.Row>
                            ))
                        ) : (
                            <DataTable.Row>
                                <DataTable.Cell>No data available</DataTable.Cell>
                            </DataTable.Row>
                        )} */}

                        {!isApiCall && (
                            <>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item: any, index: number) => (
                                        <DataTable.Row style={{ ...styles.tableRowStyle }} key={index}>
                                            <DataTable.Cell style={{ flex: 2.5 }} textStyle={styles.colTitle}>
                                                {item.WhatsappNumber}
                                            </DataTable.Cell>
                                            <DataTable.Cell style={{ flex: 2.5 }} textStyle={styles.colTitle}>
                                                {ddmmyyyConverter(item.WhatsappDatetime, 'DD-MM-YYYY')}
                                            </DataTable.Cell>
                                            <DataTable.Cell style={{ flex: 1.5 }} textStyle={styles.colTitle}>
                                                {item.WhatsappDelStatus
                                                    ? item.WhatsappDelStatus.charAt(0).toUpperCase() + item.WhatsappDelStatus.slice(1)
                                                    : '-'}
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    ))
                                ) : (
                                    <DataTable.Row>
                                        <DataTable.Cell style={{ justifyContent: 'center' }}>
                                            {t("Nodataavailable")}
                                        </DataTable.Cell>
                                    </DataTable.Row>

                                )}
                            </>
                        )}
                        {isApiCall && (
                            <View style={{ marginTop: 5 }}>
                                <DynamicShimmerPlaceholder borderRadius={5} height={50} width={"100%"} count={1} />
                                <DynamicShimmerPlaceholder borderRadius={5} height={50} width={"100%"} count={1} />
                                <DynamicShimmerPlaceholder borderRadius={5} height={50} width={"100%"} count={1} />
                                <DynamicShimmerPlaceholder borderRadius={5} height={50} width={"100%"} count={1} />
                                <DynamicShimmerPlaceholder borderRadius={5} height={50} width={"100%"} count={1} />
                            </View>
                        )}
                    </>
                    {!isApiCall && (
                        <DataTable.Pagination
                            page={page}
                            numberOfPages={Math.ceil(totalRowCount / itemsPerPage)}
                            onPageChange={handlePageChange}
                            onItemsPerPageChange={handleItemsPerPageChange}
                            label={`${from}-${to} of ${totalRowCount}`}
                        />
                    )}
                </DataTable>
            </ScrollView>


            <CustomBottomSheet
                isVisible={showPicker}
                onClose={() => { setShowPicker(false) }}
                hideCloseButton={true}
            >
                <DateRangePickerModel
                    model={dateRange}
                    onClose={(startDate?: any) =>
                        closeSheet(startDate)}
                />
            </CustomBottomSheet>
        </>
    );
};


const styles = StyleSheet.create({
    sameInline: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    },
    placeholderStyle: {
        color: Colors.color_gray,
        fontSize: 14,
        fontFamily: Fonts.OpenSans600SemiBold
    },
    selectedTextStyle: {
        fontSize: 14,
        fontFamily: Fonts.OpenSans600SemiBold
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        fontFamily: Fonts.OpenSans600SemiBold
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    itemContainerInnerStyle: {
        maxHeight: 'auto',
        fontFamily: Fonts.OpenSans600SemiBold
    },
    itemContainerStyle: {
        padding: 0,
        borderColor: Colors.color_semi_dark_gray,
        borderWidth: 1,
        margin: 0,
        fontFamily: Fonts.OpenSans600SemiBold
    },
    wrapText: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 13,

        paddingRight: 10,
        //fontFamily: Fonts.OpenSans700Bold,
        color: '#696969'
    },
    TableHeader: {
        paddingHorizontal: 10,
        backgroundColor: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins600SemiBold,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 35,
    },
    tableRowStyle: {
        minHeight: 30,
        paddingHorizontal: 10,
        borderBottomColor: '#3F7A80',
        backgroundColor: Colors.color_white
    },
    title: {
        color: Colors.color_white,
        fontSize: 10,
        paddingRight: 5,
        marginTop: -8,
        letterSpacing: 0.2,
        fontFamily: Fonts.OpenSans500Medium,
    },
    colTitle: {
        color: 'black',
        fontSize: 12,
        paddingRight: 5,
        // padding: 0,
        fontFamily: Fonts.OpenSans500Medium,
    },
    wrapTextStatus: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 13,

        paddingRight: 10,
        //fontFamily: Fonts.OpenSans700Bold,
        color: '#696969',

        textAlign: 'left',


    },
    titleStatus: {
        color: Colors.color_white,
        fontSize: 10,
        paddingRight: 5,
        marginTop: -8,
        letterSpacing: 0.2,
        fontFamily: Fonts.OpenSans500Medium,
        //marginLeft: 38

    }




});
export default WhatsappStatusPage;
