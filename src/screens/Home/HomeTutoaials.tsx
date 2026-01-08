import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductTutorials from '../../components/ScreensComponent/Tutorials/productTutorials';
import AppTutorials from '../../components/ScreensComponent/Tutorials/AppTutorials';
import { useDispatch, useSelector } from 'react-redux';
import { tutorialsDataReducer } from '../../store/features/Tutorials/tutorials';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '../../store/app/store';
import CustomLineTabBar from '../../components/CustomLineTabBar';


const Tab = createMaterialTopTabNavigator();

const HomeTutoaials = () => {
    const [fullDataList, setFullDataList] = useState<any[]>([]);
    const dispatch: AppDispatch = useDispatch();
    const [showLoader, setShowLoader] = useState(false);
    const [isPullToRefresh, setisPullToRefresh] = useState(false);
    const { t } = useTranslation();
    const { product_tutorial, app_tutorial, status, error } = useSelector((state: any) => state.AllsuvidhaTutorials);
 


    useEffect(() => {
        if (fullDataList && fullDataList.length > 0) {
            const product_tutorial = fullDataList.filter(item =>
                item.category === 'product_tutorial'
            );
            const app_tutorial = fullDataList.filter(item =>
                item.category === 'app_tutorial'
            );

            dispatch(
                tutorialsDataReducer({
                    product_tutorial: product_tutorial ? product_tutorial : null,
                    app_tutorial: app_tutorial ? app_tutorial : null,
                }),
            );
        }
    }, [fullDataList])


    return (
        <Tab.Navigator tabBar={(props) => <CustomLineTabBar {...props} headerCurveColor="#F2F2F2" />}>
            <Tab.Screen name={t("ProductTutorials")} component={ProductTutorials} />
            <Tab.Screen name={t("APPTutorials")} component={AppTutorials} />
        </Tab.Navigator >
    );
}

export default HomeTutoaials;
