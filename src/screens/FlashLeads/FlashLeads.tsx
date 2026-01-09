import React, { FC, useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import FlashLeadCard from './components/FlashLeadCard';
import HeaderCurve from '../../components/HeaderCurve';
import { Colors } from '../../themes';
import { ILead } from './interface/item.interface';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeadsPending } from '../../store/features/PendingLeads/PendingLeadsStore';
import { AppDispatch } from '../../store/app/store';
import DynamicShimmerPlaceholder from '../../utils/dynamicShimmerPlaceholder';
import NoDataFound from '../../components/NoDataFound';
import { useTranslation } from 'react-i18next';

const FlashLead: FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [expiredLeads, setExpiredLeads] = useState<string[]>([]);
    const { status, error, pendingLeads } = useSelector((state: any) => state.PendingLeadsData);
    const { t } = useTranslation();

    const removeExpiredLead = (leadId: string) => {
        setExpiredLeads((prev) => [...prev, leadId]);
    };

    const convertTimeToMinutes = (timeString: string): number => {
        return parseInt(timeString, 10);
    };

    useEffect(() => {
        dispatch(fetchLeadsPending());
    }, [expiredLeads]);
    const sortedLeads = pendingLeads
        .filter((lead: ILead) => !expiredLeads.includes(lead.lead_guid))
        .sort((a: ILead, b: ILead) => {
            const timeA = convertTimeToMinutes(a.allocated_pending_time);
            const timeB = convertTimeToMinutes(b.allocated_pending_time);
            return timeA - timeB;
        });

    return (
        <>
            <HeaderCurve
                topGaap={119}
                headerBackground={'#36686D'}
                headerBackgroundTwo={'#84A2A5'}
                pageBackground={'#F2F2F2'}
            />
            <ScrollView style={{ backgroundColor: '#F2F2F2' }}>
                {status === 'succeeded' && sortedLeads.length > 0 ? (
                    <>
                        {sortedLeads.map((item: ILead) => (
                            <View key={item.lead_guid}>
                                <FlashLeadCard
                                    item={item}
                                    timer={item.allocated_pending_time}
                                    onTimerEnd={removeExpiredLead}
                                />
                            </View>
                        ))}
                    </>
                ) : (
                    status === 'loading' && (
                        <View style={{ marginTop: 5 }}>
                            <DynamicShimmerPlaceholder borderRadius={5} height={100} width={"100%"} count={1} />
                            <DynamicShimmerPlaceholder borderRadius={5} height={100} width={"100%"} count={1} />
                            <DynamicShimmerPlaceholder borderRadius={5} height={100} width={"100%"} count={1} />
                            <DynamicShimmerPlaceholder borderRadius={5} height={100} width={"100%"} count={1} />
                            <DynamicShimmerPlaceholder borderRadius={5} height={100} width={"100%"} count={1} />
                        </View>
                    )
                )}
                {status === 'failed' && (
                    <NoDataFound content={t('noContactFound')} />
                )}
            </ScrollView>
        </>
    );
};

export default FlashLead;
