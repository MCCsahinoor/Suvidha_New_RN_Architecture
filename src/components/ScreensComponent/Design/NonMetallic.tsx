/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import { Colors } from '../../../themes';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import PhotoViewer from '../../ImageViewer';
import { setPullToRefresh } from '../../../store/features/menu/pullToRefresh';
import FastImage from 'react-native-fast-image';
import i18n from '../../../i18n';

const NonMetallic = ({ navigation }: any) => {
  // GET DESIGN DATA
  const designsData = useSelector((state: any) => state.designsData);
  const [designList, setDesignList] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    dispatch(setPullToRefresh({ pageName: 'Design', pullAction: true }));
  }, []);

  // PHOTOVIEWER
  const [showPhotoViewer, setShowPhotoViewer] = useState<boolean>(false);
  const [photoViewerImg, setPhotoViewerImg] = useState<{
    url: string;
    title: string;
  }>({ url: '', title: '' });

  useEffect(() => {
    setShowPhotoViewer(false);
    setPhotoViewerImg({ url: '', title: '' });
  }, []);

  useEffect(() => {
    if (designsData.NonMetallic) {
      setDesignList(designsData.NonMetallic);
    }
  }, [designsData]);

  useEffect(() => { }, [designList]);

  // PHOTOVIEWER
  function onClickImg(item: any) {
    setPhotoViewerImg({
      url: item.design_image,
      title: i18n.t('nonMetallicDesign'),
    });
    setShowPhotoViewer(true);
  }

  if (showPhotoViewer) {
    return (
      <PhotoViewer
        imagesList={[]}
        singleImage={{ url: photoViewerImg.url, title: photoViewerImg.title }}
        sendDataToParent={setShowPhotoViewer}
      />
    );
  }

  return (
    <>
      <ScrollView
        style={{ backgroundColor: Colors.color_white }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={[styles.container, styles.threeGrid]}>
          {designList &&
            designList.length > 0 &&
            designList.map((item, index) => (
              <View key={index} style={[styles.imageBox]}>
                <Pressable
                  onPress={() => {
                    onClickImg(item);
                  }}>
                  <FastImage
                    style={{ ...styles.boxImgStyle, borderRadius: 8 }}
                    source={{ uri: item.design_image }}>
                    <Text style={[styles.textStyle]}>{item.design_type}</Text>
                  </FastImage>
                </Pressable>
              </View>
            ))}
        </View>
      </ScrollView>
    </>
  );
};

export default NonMetallic;
