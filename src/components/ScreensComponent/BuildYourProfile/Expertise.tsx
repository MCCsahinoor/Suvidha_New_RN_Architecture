import React, { Fragment, Suspense, lazy, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Pressable } from 'react-native';
import { Colors, Fonts } from '../../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
const Accordion = lazy(() => import('../../Accordion')); 
import ButtonLarge from '../../ButtonLarge';
import { setbottomSheetHandler } from '../../../store/features/bottomSheetHandler/bottomSheetHandler';
import { useDispatch, useSelector } from 'react-redux';
import { I_EXPERTISE_LOV, I_RES_GET, I_SEND_BYP_DATA_SEVE, dataLov, uploadDocument } from '../../../Interfaces/buildYourProfile.interface';
import { setuploadImageHandler } from '../../../store/features/fileUpload/uploadImageUrlSlice';
import { setbuildProfileExpertiseData } from '../../../store/features/BuildYourProfile/buildProfileExpertise';
import { BuildYourProfileSave, PainterExpertiseDetailsLOV } from '../../../services/BuildYourProfile/byp.services';
import { buildYourProfileDataFormatter, processDocuments } from '../../../utils/buildYourProfileDataFormatter';
import NoDataFound from '../../NoDataFound';
import AlertInfo from '../../alertInfo';
import { setApiCallLoader } from '../../../store/features/apiCallLoader/apiCallLoader';
import DynamicShimmerPlaceholder from '../../../utils/dynamicShimmerPlaceholder';
import { setbuildYourProfileData } from '../../../store/features/BuildYourProfile/buildYourProfileStore';
import VideoThumbnail from '../../VideoThumbnail';
import { setPullToRefresh } from '../../../store/features/menu/pullToRefresh';
import { useTranslation } from 'react-i18next';
import { CommonToastModel } from '../../../utils/ToastMessageModel';
import PhotoViewer from '../../ImageViewer';
import FileUploadIcon from '../../../assets/svg/fileUpload';
import WarningIcon from '../../../assets/svg/worning';


const Expertise = ({ onPress, navigation }: any) => {
  const dispatch = useDispatch();
  const buildYourProfileStore = useSelector((state: any) => state.buildYourProfileData);
  const expertiseData = useSelector((state: any) => state.buildProfileExpertise);
  const [expertiseArr, setExpertiseArr] = useState<any[]>([]);
  const user_expertise = useSelector((state: any) => state.uploadUrl); // UPLOAD DOC IMAGES GET FROM STORES //
  const [getSelectedLov, setSelectedLov] = useState<any>(null);
  const userProfileData = useSelector((state: any) => state.userProfileData); // GET USER PROFILE INFO
  const [noDataFound, setNoDataFound] = useState(false);
  const [submitBYPAlert, setsubmitBYPAlert] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const isAPICall = useSelector((state: any) => state.apiCallLoader); // API CALL CHECK IF API CALL START THEN BUTTON DESABLED
  const [photoViewerImg, setPhotoViewerImg] = useState<{ url: string; title: string }>({ url: '', title: '' });
  const [showPhotoViewer, setShowPhotoViewer] = useState<boolean>(false);

  useEffect(() => {
    if (!expertiseData || expertiseData.length === 0) {
      expertiseDetailsLOV();
    } else {
      setExpertiseArr(expertiseData);
    }
  }, []);


  const expertiseDetailsLOV = async (): Promise<void> => {
    setNoDataFound(false)
    resetData();
    setShowLoader(true);
    PainterExpertiseDetailsLOV<any, I_EXPERTISE_LOV>().then(response => {
      setShowLoader(false);
      if (response && response.data) {
        const processedData = processDocuments(response.data);
        dispatch(setbuildProfileExpertiseData(processedData));
      } else {
        setNoDataFound(true)
        resetData();
      }
    }).catch(err => {
      setShowLoader(false);
      resetData();
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  };

  const resetData = () => {
    dispatch(setbuildProfileExpertiseData([]));
    setExpertiseArr([])
  }

  useEffect(() => {
    if (expertiseData) {
      setExpertiseArr(expertiseData)
    }
  }, [expertiseData]);


  const onPressCameraOption = (item: dataLov) => {
    setSelectedLov(item)
    const isVideoUploaded = item.documents.some((doc: uploadDocument) => doc.img_path.endsWith('.mp4'));
    if (isVideoUploaded) {
      dispatch(setbottomSheetHandler({ modelAction: true, modelName: 'expertiseWithNoVideo' }));
    } else {
      dispatch(setbottomSheetHandler({ modelAction: true, modelName: 'expertiseWithVideo' }));
    }
  };

  //// UPLOAD DOC IMAGES AND SET ////
  useEffect(() => {
    if (user_expertise != '') {
      const updatedExpertiseArr = expertiseArr.map(item => {
        if (item.lov_value === getSelectedLov.lov_value) {
          const dtlObj: uploadDocument = {
            id: 0,
            lov_code: getSelectedLov.lov_code,
            img_path: user_expertise,
            new_img_uploaded_path: user_expertise,
            selected_yn: 'Y',
            status: 'Pending',
            remarks: 'Under Review'
          };
          return {
            ...item,
            documents: [...item.documents, dtlObj],
          };
        }
        return item;
      });
      dispatch(setbuildProfileExpertiseData(updatedExpertiseArr));
    }
  }, [user_expertise]);


  useEffect(() => {
    dispatch(setuploadImageHandler(''));
  }, [expertiseArr]);

  //removing image from array
  const removeImg = (item: dataLov, indexImg: number) => {
    const updatedExpertiseArr = expertiseArr.map(removeItem => {
      if (removeItem.lov_value === item?.lov_value) {
        if (removeItem.documents && Array.isArray(removeItem.documents) && indexImg < removeItem.documents.length) {
          return {
            ...removeItem,
            documents: [
              ...removeItem.documents.slice(0, indexImg),
              ...removeItem.documents.slice(indexImg + 1)
            ]
          };
        } else {
          console.log("Invalid documents array or index out of bounds");
        }
      }
      return removeItem;
    });
    dispatch(setbuildProfileExpertiseData([...updatedExpertiseArr]));
  };

  const goToExpertise = (): void => {
    setsubmitBYPAlert(true);
  };

  const skipNow = () => {
    setsubmitBYPAlert(false);
  };

  const finalBYPSubmit = () => {
    setsubmitBYPAlert(false);
    dispatch(setApiCallLoader(true));
    saveGoToExpertise(buildYourProfileDataFormatter(expertiseData, buildYourProfileStore, userProfileData));
  }

  const saveGoToExpertise = async (data: I_SEND_BYP_DATA_SEVE): Promise<void> => {
    BuildYourProfileSave<I_SEND_BYP_DATA_SEVE, I_RES_GET>(data).then(response => {
      skipNow();
      dispatch(setApiCallLoader(false));
      if (response.response_code == 1) {
        dispatch(setbuildYourProfileData({
          profileImage: null,
          generalInformation: null,
          expertise: null,
          selectedTab: 'profileImage',
          isValidate: [],
        }));
        navigation.replace('BuildProfileSuccess');
        CommonToastModel('success', response.response_message, 5000);
        dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: true }));
        // expertiseDetailsLOV();
      } else {
        CommonToastModel('error', response.response_message, 5000);
      }
      console.log(response)
    }).catch(err => {
      skipNow();
      dispatch(setApiCallLoader(false));
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  };

  useEffect(() => {
    setShowPhotoViewer(false);
    setPhotoViewerImg({ url: '', title: '' });
  }, []);

  function onClickImg(item: uploadDocument) {
    setPhotoViewerImg({
      url: item.img_path,
      title: item.remarks ? item.remarks : '',
    });
    setShowPhotoViewer(true);
  }

  const onPressBackHome = () => {
    dispatch(
      setbuildYourProfileData({
        ...buildYourProfileStore,
        selectedTab: 'generalInformation',
      }),
    );
  };

  const { t } = useTranslation();
  // useEffect(() => {
  //   dispatch(setbuildProfileExpertiseData([])); // Reset state on load
  //   expertiseDetailsLOV(); // Fetch fresh data
  // }, []);


  return (
    <>
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={{ ...styles.container }}>
          <View style={{ ...styles.headerContainer }}>
            <Text style={{ ...styles.headerText }}>{t("Expertise")}</Text>
          </View>
          {showLoader ? (
            <View style={{ width: '100%', paddingHorizontal: 15 }}>
              <DynamicShimmerPlaceholder
                borderRadius={5}
                height={40}
                width={'100%'}
                count={5}
              />
            </View>
          ) : (
            <View style={{ ...styles.contentContainer }}>
              {expertiseArr.map((item, index) => (
                <Suspense key={index} fallback={<DynamicShimmerPlaceholder borderRadius={5} height={40} width={'100%'} count={1} />}>
                  <Accordion title={item.lov_value} isLock={item.enable_lock_yn} showLockIcon={true} >
                    <View style={styles.uploadFilesGrouping}>
                      <View style={styles.uploadCard}>
                        <Pressable onPress={() => { onPressCameraOption(item); }}>
                          <FileUploadIcon width={30} height={30} />
                        </Pressable>
                      </View>
                      {item.documents.length > 0 && item.documents.map((img: uploadDocument, indexImg: number) => (
                        <Fragment key={indexImg}>
                          {img.img_path && (
                            <Pressable onPress={() => { onClickImg(img) }}>
                              {!img.img_path.endsWith('.mp4') && (
                                <ImageBackground source={{ uri: img.img_path }} style={styles.successUpload} imageStyle={{ borderRadius: 6 }}>
                                  {img.status.toLowerCase() == 'pending' && (
                                    <Ionicons style={{ ...styles.deleteImages }} size={20} name="close-outline" onPress={() => { removeImg(item, indexImg); }} />
                                  )}
                                  {img.status.toLowerCase() == 'pending' && (
                                    <View style={{ ...styles.worningMsgContainer }}>
                                      <WarningIcon width={20} height={20} />
                                      <Text style={{ ...styles.worningMsg }}>{img.remarks}</Text>
                                    </View>
                                  )}
                                </ImageBackground>
                              )}
                              {img.img_path.endsWith('.mp4') && (
                                <VideoThumbnail videoUrl={img.img_path}>
                                  {img.status.toLowerCase() == 'pending' && (
                                    <Ionicons style={{ ...styles.deleteImages }} size={20} name="close-outline" onPress={() => { removeImg(item, indexImg); }} />
                                  )}
                                  {img.status.toLowerCase() == 'pending' && (
                                    <View style={{ ...styles.worningMsgContainer }}>
                                      <WarningIcon width={20} height={20} />
                                      <Text style={{ ...styles.worningMsg }}>{img.remarks}</Text>
                                    </View>
                                  )}
                                </VideoThumbnail>
                              )}
                            </Pressable>
                          )}
                        </Fragment>
                      ))}
                    </View>
                  </Accordion>
                </Suspense>
              ))}
            </View>
          )}
          {noDataFound && (
            <View style={{ marginVertical: 10 }}>
              <NoDataFound content={t("NoExpertiseDataFound")}></NoDataFound>
            </View>
          )}
        </View>
      </ScrollView>
      {!showLoader && (
        <View style={{ ...styles.fixedButtonExpertise }}>
          <View style={{ width: '48%', marginRight: 5 }}>
            <ButtonLarge
              title={t("Cancel")}
              onPress={() => {
                onPressBackHome();
              }}
              fillBtn={false}
              key={'Canel'}
              showIcon={false}
              iconName=""
              paddingVertical={7}
              paddingHorizontal={5}
              fontSize={15}
              iconSize={19}
            />
          </View>
          <View style={{ width: '48%' }}>
            <ButtonLarge
              title={t("Submit")}
              onPress={goToExpertise}
              fillBtn={true}
              key={'Submit'}
              showIcon={false}
              iconName=""
              paddingVertical={7}
              paddingHorizontal={5}
              fontSize={15}
              iconSize={19}
            />
          </View>
        </View>
      )}
      {submitBYPAlert && (
        <AlertInfo
          skipNow={() => skipNow()}
          confirmAction={() => finalBYPSubmit()}
          allowSkip={true}
          headerText={t("BuildYourProfile")}
          subHeaderText={t("BuildYourProfileSubHead")}
          confirmActionButtonText={t("yesSubmit")}
          skipButtonText={t("Back")}
          isAPICall={isAPICall}
        />
      )}

      {showPhotoViewer && photoViewerImg.url && (
        <PhotoViewer
          imagesList={[]}
          singleImage={{ url: photoViewerImg.url, title: photoViewerImg.title }}
          sendDataToParent={setShowPhotoViewer}
        />
      )}

    </>
  );

};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 5,
  },
  headerContainer: {
    marginTop: 0,
  },
  headerText: {
    textAlign: 'center',
    color: Colors.ui_dark_bg,
    fontSize: 20,
    fontFamily: Fonts.poppins500Medium,
    textTransform: 'capitalize',
  },
  subHeaderText: {
    textAlign: 'center',
    color: Colors.dark_text_color,
    fontSize: 14,
    fontFamily: Fonts.OpenSans600SemiBold,
  },
  contentContainer: {
    paddingHorizontal: 5,
    marginTop: 10,
  },
  uploadFilesGrouping: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  uploadCard: {
    backgroundColor: '#F6F6F6',
    padding: 18,
    borderRadius: 5,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ACABAB',
    marginBottom: 10,
  },
  successUpload: {
    marginLeft: 5,
    width: 72,
    height: 72,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 10,
    borderColor: Colors.color_dark_gray,
    borderWidth: 1,
  },
  worningMsg: {
    color: 'white',
    fontSize: 9,
    fontFamily: Fonts.OpenSans600SemiBold,
  },
  worningMsgContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 72,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 6,
    zIndex: 2
  },
  deleteImages: {
    position: 'absolute',
    right: -5,
    top: -8,
    backgroundColor: '#F17B7B',
    borderRadius: 100,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    width: 20,
    height: 21,
    zIndex: 999,
  },
  fixedButtonExpertise: {
    backgroundColor: Colors.color_white,
    paddingHorizontal: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default Expertise;

