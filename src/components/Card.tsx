import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Colors } from '../themes';

const Card = (props: any) => {
  const { children } = props;

  return (
    <View style={[styles.card]}>
      <View style={{ overflow: 'hidden' }}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.color_white,
    shadowColor: Colors.shadow_light,
    elevation: 15,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default Card;
