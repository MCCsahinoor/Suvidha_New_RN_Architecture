import React, { FC, memo } from 'react';
import { FlatList, View } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export interface I_Shimmer {
  borderRadius: number;
  height: number;
  width: any;
  count: number;
}

const DynamicShimmerPlaceholder: FC<I_Shimmer> = (props) => {
  const placeholders = [];

  // Create multiple placeholders based on the count 
  for (let i = 0; i < props.count; i++) {
    placeholders.push(
      <View key={i} style={{ width: '100%' }}>
        <ShimmerPlaceholder
          style={{
            height: props.height,
            width: props.width,
            borderRadius: props.borderRadius,
            marginBottom: 10,
          }}
          shimmerColors={[
            '#dce0e5',
            '#f0f2f4',
            '#dce0e5',
          ]}></ShimmerPlaceholder>
      </View>,
    );
  }

  return <>{placeholders}</>; // Render the placeholders as an array
};

export default memo(DynamicShimmerPlaceholder);
