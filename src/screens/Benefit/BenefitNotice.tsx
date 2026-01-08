import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import RenderHtml from 'react-native-render-html';
import ButtonLarge from '../../components/ButtonLarge';
import { useDispatch, useSelector } from 'react-redux';
import { setPullToRefresh } from '../../store/features/menu/pullToRefresh';
import { setbottomSheetHandler } from '../../store/features/bottomSheetHandler/bottomSheetHandler';
import { setApiCallLoader } from '../../store/features/apiCallLoader/apiCallLoader';
import { AcceptancePainterAdvancePayment } from '../../services/BusinessDetails/businessDetails.service';
import { UserGroupArr } from '../../utils/hierarchyLoginCheck';
import { CommonToastModel } from '../../utils/ToastMessageModel';

const BenefitNotice = ({ Notice }: any) => {
    const dispatch = useDispatch()
    const isAPICall = useSelector((state: any) => state.apiCallLoader);

    const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);
    const [getExecutiveLogin, setExecutiveLogin] = useState('');
    useEffect(() => {
        if (executiveLoginCheck) {
            setExecutiveLogin(executiveLoginCheck['UserGroupCode']);
        }
    }, [executiveLoginCheck]);


    const Accept = () => {
        dispatch(setApiCallLoader(true));
        AcceptancePainterAdvancePayment().then((response: any) => {
            if (response.response_code == 1) {
                dispatch(setbottomSheetHandler({}));
                dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: true })); 
            } else {
                CommonToastModel('error', response.response_message, 5000);
                dispatch(setApiCallLoader(false));
            }
        }).catch((err) => {
            dispatch(setApiCallLoader(false));
            CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
        });

    }

    // const onRefresh = useCallback(() => {
    //     dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: true }));
    // }, []);
    return (
        <>
            <ScrollView>
                <View style={{ padding: 15, }}>
                    {Notice && Notice.length > 0 &&
                        <RenderHtml contentWidth={50} source={{ html: Notice }} />
                    }
                </View>
            </ScrollView>

            {!UserGroupArr.includes(getExecutiveLogin.toLowerCase()) && (
                <View style={{ display: 'none' }}>
                    <ButtonLarge
                        title={'Accept'}
                        fillBtn={true}
                        key={'Accept'}
                        onPress={() => Accept()}
                        showIcon={false}
                        iconName=""
                        paddingVertical={3}
                        paddingHorizontal={5}
                        fontSize={15}
                        iconSize={19}
                        isAPICall={isAPICall}
                        disabled={isAPICall}
                    />
                </View>
            )}
        </>

    )
}

export default BenefitNotice;

