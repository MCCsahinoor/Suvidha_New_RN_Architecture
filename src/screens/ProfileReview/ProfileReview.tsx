import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native'; 
import { GetCsatReviewList, GetFeedbackLov } from '../../services/Profile/Profile.services';
import { Colors } from '../../themes';
import HeaderCurve from "../../components/HeaderCurve";
import NoDataFound from '../../components/NoDataFound';
import DynamicShimmerPlaceholder from '../../utils/dynamicShimmerPlaceholder';
import { useTranslation } from 'react-i18next';
import { fetchPainterReview } from '../../store/features/userProfile/PainterReviewDetails';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/app/store';
import SingelSelectdropdownWithLocalSearch from '../../components/SingelSelectdropdownWithLocalSearch';
import { GetXpLeadCategory } from '../../services/LeadsInfo/leadsInfo.service';
import { I_LEADS_INFO } from '../../Interfaces/leadsInfo.interface';
import { CommonToastModel } from '../../utils/ToastMessageModel';
import { useEvent } from 'react-native-reanimated';
import ProfileReviewListCard from '../../components/ScreensComponent/UserFeedback/ProfileReviewListCard';

interface CsatReview {
    pntr_guid: string;
    pntr_csat: number;
    rate_total: number;
    rate_five: number;
    rate_three: number;
    rate_one: number;
    creation_date: string;
    lead_id: string;
    customer_name: string;
    feedback: string;
}

const ProfileReview = () => {
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const [listOfReview, setListOfReview] = useState<CsatReview[]>([]);
    const [countOfReview, setCountOfReview] = useState<number>(0);
    const [rowOffset, setRowOffset] = useState(0);
    const [fetchrow, setFetchrows] = useState(10);
    const [ratingDropdownData, setRatingDropdownData] = useState([]);
    const [ratingDefaultValue, setRatingDefaultValue] = useState(null);
    const [leadCategory, setLeadCategory] = useState<I_LEADS_INFO.FilterCategory[]>([]);
    const [selectedLeadCategory, setSelectedLeadCategory] = useState('');
    const [rating, setRating] = useState('');
    const [lead, setLead] = useState('');
    const [showLoader, setShowLoader] = useState(true);
    const [flatListShowLoader, setFlatListShowLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const { ReviewMessages, ReviewCount } = useSelector((state: any) => state.PainterReviewCountData);
    const [dropdownWidth, setDropdownWidth] = useState(0);


    useEffect(() => {
        if (ReviewCount && ReviewMessages) {
            setCountOfReview(ReviewCount);
            const uniqueList = Array.from(new Set([...listOfReview, ...ReviewMessages].map(review => review.lead_id)))
                .map(lead_id => [...listOfReview, ...ReviewMessages]
                    .find(review => review.lead_id === lead_id));
            setListOfReview(uniqueList || []);
        } else {
            setCountOfReview(0);
            setListOfReview([]);
        }
        setShowLoader(false);
        setFlatListShowLoader(false);
        setRefreshing(false);
    }, [ReviewMessages]);

    useEffect(() => {
        setShowLoader(true);
        fetchData(rowOffset, fetchrow, rating, lead);
    }, []);

    const fetchData = (rowCount: any, fetchRows: any, leadType: any, filter: any) => {
        const data = {
            row_cout: rowCount,
            fetch_next_rows: fetchRows,
            leadType: leadType,
            filter: filter.code,
        };
        dispatch(fetchPainterReview(data));
    };

    const handleReachEnd = () => {
        if (listOfReview.length < countOfReview) {
            setFlatListShowLoader(true);
            const newOffset = rowOffset + fetchrow;
            setRowOffset(newOffset);
            fetchData(newOffset, fetchrow, rating, lead);
        } else {
            setFlatListShowLoader(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData(0, fetchrow, rating, lead);
    }, [rating, lead]);

    useEffect(() => {
        GetFeedbackLov()
            .then((response: any) => {
                if (response?.data) {
                    const formattedData = response.data.map((item: any) => ({
                        label: item.lov_value,
                        value: item.lov_code,
                    }));
                    setRatingDropdownData(formattedData);
                }
            })
            .catch(err => {
                CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
            });

        GetXpLeadCategory()
            .then((response: any) => {
                if (response?.data) {
                    const filteredCategories = response.data
                        .filter((item: I_LEADS_INFO.FilterCategory) => item.code !== 'GBSF_LEAD')
                        .map((item: I_LEADS_INFO.FilterCategory) => ({
                            code: item.code,
                            label: item.value,
                            value: item.code,
                        }));
                    setLeadCategory(filteredCategories);
                }
            })
            .catch(err => {
                CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
            });
    }, []);

    useEffect(() => {
        if (rating && lead) {
            setShowLoader(true);
            fetchData(0, fetchrow, rating, lead);
        }
    }, [rating, lead]);
    const handleRatingChange = (selectedItem: any) => {
        setRatingDefaultValue(selectedItem);
        setRating(selectedItem?.value || '');
    };

    const handleChangeDrop = (val: string) => {
        setSelectedLeadCategory(val);
        setLead(val);
    };
    return (

        <View style={{ backgroundColor: '#F2F2F2', paddingBottom: 30 }}>
            <HeaderCurve
                topGaap={119}
                headerBackground={'#36686D'}
                headerBackgroundTwo={'#84A2A5'}
                pageBackground={'#F2F2F2'}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, marginRight: 10, marginLeft: 15, }}>
                    <SingelSelectdropdownWithLocalSearch
                        optionData={ratingDropdownData}
                        showLabel={true}
                        label="Rating List"
                        showPlaceholder={true}
                        placeholder="Select"
                        defaultValue={ratingDefaultValue}
                        selectedValue={handleRatingChange}
                        changeBackground="#FFFF"
                    // onLayout={handleLayout}
                    />
                </View>
                <View style={{ flex: 1, marginRight: 15 }}>
                    <SingelSelectdropdownWithLocalSearch
                        optionData={leadCategory}
                        showLabel={true}
                        label={t("Lead Category")}
                        showPlaceholder={true}
                        placeholder={t("Select")}
                        defaultValue={selectedLeadCategory}
                        selectedValue={handleChangeDrop}
                        changeBackground={"#FFFF"}
                    />
                </View>
            </View>

            <View style={{ marginBottom: 150 }}>
                {showLoader ? (
                    <DynamicShimmerPlaceholder
                        borderRadius={5}
                        height={100}
                        width={"100%"}
                        count={5}
                    />
                ) : listOfReview.length > 0 ? (
                    <ProfileReviewListCard
                        ProfileReviewList={listOfReview}
                        ReachEndFlag={handleReachEnd}
                        onRefreshFlag={onRefresh}
                        showLoader={flatListShowLoader}
                        refreshing={refreshing}
                    />
                ) : (
                    <View style={{ marginTop: 200 }}>
                        <NoDataFound content={t('No data found')} />
                    </View>
                )}
            </View>
        </View>
    );
};

export default ProfileReview;
