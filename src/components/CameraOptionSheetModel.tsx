/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useRef, useState, memo } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '../themes';
import { useDispatch, useSelector } from 'react-redux';
import ImageCorpPicker from './ImageCorpPicker';
import { ProgressBar } from 'react-native-paper'; 
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBottomSheet from './CustomBottomSheet';

const CameraOption = ({ navigation, action, optionSelect, video }: any) => {

  // const bottomSheetRef = useRef<any>(null);
  const customBottomSheetTitle = i18n.t('SelectCameraOption');
  const dispatch = useDispatch();
  const [selectedCameraOption, setCameraOption] = useState('');
  const bottomSheetHandler = useSelector((state: any) => state.bottomSheetHandler);
  const user_img = useSelector((state: any) => state.uploadUrl);
  const isAPICall = useSelector((state: any) => state.apiCallLoader);
  const fileUploadProgress = useSelector((state: any) => state.uploadProgress);
  const [cameraOptionSheetModel, setCameraOptionSheetModel] = useState(false);

  const { t } = useTranslation();

  const onSelectOption = (val: string) => {
    setCameraOption(val);
  };

  const onPressClose = () => {
    setCameraOption('');
    setCameraOptionSheetModel(false)
  };

  useEffect(() => {
    setCameraOptionSheetModel(false)
    setCameraOption('');
  }, [user_img]);

  useEffect(() => {
    if (Object.keys(bottomSheetHandler).length != 0) {
      if (
        bottomSheetHandler.modelAction == true &&
        (bottomSheetHandler.modelName == 'PNTR_PORT_IMG' ||
          bottomSheetHandler.modelName == 'profileImageBYP' ||
          bottomSheetHandler.modelName == 'expertiseWithVideo' ||
          bottomSheetHandler.modelName == 'expertiseWithNoVideo' ||
          bottomSheetHandler.modelName == 'bank_images' ||
          bottomSheetHandler.modelName == 'kyc_idProof_img')
      ) {
        // bottomSheetRef.current?.expand();
        setCameraOptionSheetModel(true)
      } else {
        setCameraOptionSheetModel(false)
      }
    } else {
      setCameraOptionSheetModel(false)
    }
  }, [bottomSheetHandler]);

  return (
    <>
      <CustomBottomSheet
        isVisible={cameraOptionSheetModel}
        onClose={() => onPressClose()}
        sheetTitle={!isAPICall ? customBottomSheetTitle : ''}
      >
        {!isAPICall ? (
          <View style={styles.centerContent}>
            <Pressable
              style={{ ...styles.action }}
              onPress={() => onSelectOption('camera')}>
              <Ionicons
                name="camera-outline"
                style={{ ...styles.actionIcon }}
                size={28}
              />
              <Text style={{ ...styles.actionLabel }}>{t("Camera")}</Text>
            </Pressable>
            <Pressable
              style={{ ...styles.action }}
              onPress={() => onSelectOption('gallery')}>
              <Ionicons
                name="image-outline"
                style={{ ...styles.actionIcon }}
                size={28}
              />
              <Text style={{ ...styles.actionLabel }}>{t("Gallery")}</Text>
            </Pressable> 
          </View>
        ) : (
          <View>
            <View style={{ ...styles.progressContainer }}>
              <Image
                source={require('../assets/images/upload.png')}
                style={{ ...styles.progressImage }}
              />
              <View style={{ ...styles.progressStatus }}>
                <ProgressBar
                  style={{ ...styles.prgressStyle }}
                  progress={fileUploadProgress.percentDeci}
                  color="#07AD7E"
                />
                <View style={{ ...styles.progressDetailsStatus }}>
                  <Text>
                    {fileUploadProgress.uploadSize} /{' '}
                    {fileUploadProgress.totalSize}
                  </Text>
                  <Text>{fileUploadProgress.uploadpercent}%</Text>
                </View>
              </View>
            </View>
            <View style={{ ...styles.progressText }}>
              <Text style={{ ...styles.progressTextStyle }}>
                {t("fileUploadProgressText")}
              </Text>
            </View>
          </View>
        )}
      </CustomBottomSheet>
      
      <SafeAreaView edges={['bottom']}>
        <ImageCorpPicker
          isPhoto={selectedCameraOption}
          cropRequired={bottomSheetHandler.modelName == 'PNTR_PORT_IMG' || bottomSheetHandler.modelName == 'profileImageBYP' ? true : false}
          navigation={navigation}
          imageOptimize={0.5}
          docType={bottomSheetHandler.modelName}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    fontSize: 16,
    fontFamily: Fonts.poppins500Medium,
    color: Colors.ui_dark_bg,
    textTransform: 'capitalize',
    marginBottom: 10,
  },
  action: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.color_light_gray,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    width: 80,
    height: 80,
    marginRight: 20,
    backgroundColor: '#FAFAFA',
  },
  actionIcon: {
    color: Colors.color_dark_gray,
  },
  actionLabel: {
    color: Colors.color_dark_gray,
    fontSize: 12,
    fontFamily: Fonts.poppins500Medium,
  },

  prgressStyle: {
    backgroundColor: '#E8E8E8',
    height: 10,
    borderRadius: 10,
  },
  progressContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  progressImage: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
  },
  progressStatus: {
    width: '80%',
    marginLeft: 10,
    marginTop: 5,
  },
  progressDetailsStatus: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressText: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
  progressTextStyle: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: Fonts.OpenSans500Medium,
  },
});

export default memo(CameraOption);
