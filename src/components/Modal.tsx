/* eslint-disable prettier/prettier */
import React, { memo } from 'react';
import { Modal, ScrollView, View } from 'react-native';
import CustomToastUI from './CustomToastUI';

const ModalComponent = (props: any) => {
  const { children } = props;

  return (
    <View>
      <Modal animationType="slide" transparent={true}>
        {children}
        <CustomToastUI />
      </Modal>
    </View>
  );
};

export default memo(ModalComponent);
