import React, { FC, memo } from 'react';
import { FlatList, View } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import DynamicShimmerPlaceholder from '../../../utils/dynamicShimmerPlaceholder';



const ProductDetailsLoader: FC<any> = () => {

    return (
        <View>
            <DynamicShimmerPlaceholder borderRadius={5} height={20} width={"100%"} count={1} />
            <DynamicShimmerPlaceholder borderRadius={5} height={100} width={"100%"} count={1} />
            <DynamicShimmerPlaceholder borderRadius={5} height={200} width={"100%"} count={1} />
            <DynamicShimmerPlaceholder borderRadius={5} height={100} width={"100%"} count={5} />
        </View>
    );
};

export default ProductDetailsLoader;