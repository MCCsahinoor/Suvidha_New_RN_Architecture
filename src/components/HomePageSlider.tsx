/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import { Modal, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import DynamicShimmerPlaceholder from '../utils/dynamicShimmerPlaceholder';
import ImageCarousel from './ImageCarousel';

const HomePageBannerSlider = () => {

    const { banners, status, error } = useSelector((state: any) => state.bannerData);

    useEffect(() => {
        console.log(banners)
    }, []);

    return (
        <>
            {status === 'succeeded' && banners && (
                <View style={{ paddingHorizontal: 10, zIndex: 0 }}> 
                    <ImageCarousel
                        data={banners}
                        height={180}
                        autoPlay={true}
                        autoPlayInterval={4000}
                        showPagination={true}
                        showNavigation={true}
                    />
                </View>
            )}
            {status === 'loading' && (
                <View style={{ paddingHorizontal: 10, zIndex: 0 }}>
                    <DynamicShimmerPlaceholder borderRadius={5} height={200} width={"100%"} count={1} />
                </View>
            )}
        </>

    );
};

export default HomePageBannerSlider;