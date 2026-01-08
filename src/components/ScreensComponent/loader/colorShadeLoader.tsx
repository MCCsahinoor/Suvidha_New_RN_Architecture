import React, { FC, memo } from 'react';
import { FlatList, View } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import DynamicShimmerPlaceholder from '../../../utils/dynamicShimmerPlaceholder';



const ColorShadeLoader: FC<any> = () => {

    return (
        <View style={{ width: "100%", paddingHorizontal: 0, display: 'flex', flexDirection: 'row', gap: 5, justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View>
            <View style={{ width: '31%' }}><DynamicShimmerPlaceholder borderRadius={5} height={60} width={"100%"} count={1} /></View> 
        </View>
    );
};

export default ColorShadeLoader;