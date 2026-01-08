/* eslint-disable prettier/prettier */

import React, { useState, memo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Colors, Fonts } from '../../../themes';
import Card from '../../Card';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import PhotoViewer from '../../ImageViewer';
import { useSelector } from 'react-redux';
import { filename } from '../../../utils/uriToFileName';
import RNFS from 'react-native-fs';
import NoDataFound from '../../NoDataFound';
import { useTranslation } from 'react-i18next';
import { ddmmyyyConverter } from '../../../utils/formatDate';
import HeaderCurve from '../../HeaderCurve';
import { CommonToastModel } from '../../../utils/ToastMessageModel';
import CallColorIcon from '../../../assets/svg/callColorIcon';
import { useRoute } from '@react-navigation/native';

const Certificate = ({ navigation }: any) => {

  const userProfileData = useSelector((state: any) => state.userProfileData);
  const [userCertificate, setUserCertificate] = useState<any>(null);
  const [showPhotoViewer, setShowPhotoViewer] = useState<boolean>(false);
  const [photoViewerImg, setPhotoViewerImg] = useState<{ url: string; title: string; }>({ url: '', title: '' });
  // const { key } = route;
  const { t } = useTranslation();

  const route = useRoute();
  console.log(route.name);   // Current route name 

  useEffect(() => {
    setShowPhotoViewer(false);
    setPhotoViewerImg({ url: '', title: '' });
  }, []);

  useEffect(() => {
    if (userProfileData && userProfileData.length > 0 && userProfileData[0].certificate_details && userProfileData[0].certificate_details.length > 0) {
      setUserCertificate(userProfileData[0] && userProfileData[0].certificate_details);
    }
  }, [userProfileData]);


  function onClickImg(item: any) {
    if (item) {
      setPhotoViewerImg({
        url: item.certificate_img,
        title: item.module_desc
      });
      setShowPhotoViewer(true);
    }
  }

  const shareContent = async (item: any) => {
    if (item) {
      console.log(item.certificate_img);
      const url = item.certificate_img;
      const filePath = `${RNFS.DocumentDirectoryPath}/${filename(item.certificate_img)}`;
      console.log(filePath)
      const downloadResult = RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath,
        background: true,
        discretionary: true,
        progress: (res) => {
          console.log(res)
          const percentage = ((100 * res.bytesWritten) / res.contentLength) | 0;
          const progress = `Progress ${percentage}%`;
          console.log(`Progress: ${progress}`);
        },
      }).promise

      if ((await downloadResult).statusCode === 200) {
        console.log('File downloaded to:', filePath);

        // Share the file
        const shareOptions = {
          title: 'Share File',
          url: `file://${filePath}`,
          failOnCancel: false,
        };

        Share.open(shareOptions)
          .then((res) => console.log('File shared successfully:', res))
          .catch((err: any) => {

            CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
          });
      } else {
        console.log('Failed to download file');
      }
    }
  };

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
      {route && route.name && route.name.includes("Certifiacte") && (
        <HeaderCurve
          topGaap={119}
          headerBackground={'#36686D'}
          headerBackgroundTwo={'#84A2A5'}
          pageBackground={Colors.color_white}
        />
      )}
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={{ ...styles.container }}>
          <Text style={{ ...styles.headerText }}>{t("ProfessionalCertificate")}</Text>
          {userCertificate && userCertificate.length > 0 ? (
            <>
              {userCertificate.map((item: any, index: any) => (
                <View key={index} style={{ ...styles.certificateContainer }}>
                  {new Date(item.exp_date) < new Date() &&
                    <View style={{ ...styles.cardContainerLabel }}>
                      <Text style={{ ...styles.cardContainerLabelText }}>
                        {t("Expired")}
                      </Text>
                    </View>
                  }
                  <Card>
                    <View style={{ ...styles.certificateList }}>
                      <Pressable onPress={() => { onClickImg(item); }}>
                        <ImageBackground
                          source={{ uri: item.certificate_img }}
                          style={{ height: 90, width: 80, ...styles.certificate }}
                          resizeMode="cover"
                          imageStyle={{ borderRadius: 8 }}>
                          <View
                            style={{ height: 90, width: 80, ...styles.certificateInner }}>
                            <View style={{ ...styles.expandIcon }}>
                              <CallColorIcon width={20} height={20} />
                            </View>
                          </View>
                        </ImageBackground>
                      </Pressable>
                      <View style={{ paddingTop: 10 }}>
                        <Text style={{ ...styles.certificateName }}>
                          {item.module_desc}
                        </Text>
                        <Text style={{ ...styles.certificateCompleted }}>
                          <Text style={{ color: Colors.color_dark_gray }}> {t("CompletedOn")}: </Text>{ddmmyyyConverter(item.to_date, 'DD MMM YYYY')}
                        </Text>
                        <Text style={{ ...styles.certificateValid }}>
                          <Text style={{ color: Colors.color_dark_gray }}> {t("ValidTill")}: </Text> {ddmmyyyConverter(item.exp_date, 'DD MMM YYYY')}
                        </Text>
                        {new Date(item.exp_date) < new Date() &&
                          <View style={{ marginTop: -8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 70 }}>
                              <Pressable onPress={() => navigation.navigate('bookMyTraning')} style={{ ...styles.clickToCallAction }}>
                                <Text style={{ ...styles.clickToCall }}>{item.exp_desc}</Text>
                              </Pressable>
                            </View>
                          </View>
                        }
                      </View>
                      <Pressable style={{ ...styles.shareCard }} onPress={() => { shareContent(item); }}>
                        <Ionicons name="share-social-sharp" size={20} style={{ color: Colors.color_dark_gray }} />
                      </Pressable>
                    </View>
                  </Card>
                </View>
              ))}
            </>
          ) : (
            <View style={{ marginTop: 20 }}>
              <NoDataFound content={t("NoCertificateAchieved")}></NoDataFound>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerText: {
    color: Colors.ui_dark_bg,
    fontSize: 17,
    fontFamily: Fonts.poppins500Medium,
    textTransform: 'capitalize',
  },
  certificateContainer: {
    marginTop: 10,
    marginBottom: 10
  },
  clickToCall: {
    color: '#068863',
    fontSize: 11,
    fontFamily: Fonts.OpenSans600SemiBold,
    textAlign: 'center',
    textDecorationLine: 'underline',
    // marginLeft: 6,
  },
  clickToCallAction: {
    padding: 8,
    paddingVertical: 5,
    width: 150,
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  cardContainerLabel: {
    backgroundColor: Colors.ui_light_bg,
    position: 'absolute',
    padding: 5,
    top: -10,
    right: 10,
    zIndex: 10,
    borderRadius: 100,
    paddingHorizontal: 10,
  },
  cardContainerLabelText: {
    color: Colors.color_white,
    fontSize: 11,
    fontFamily: Fonts.OpenSans600SemiBold,
  },
  certificateList: {
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  certificate: {
    marginRight: 10,
  },
  certificateName: {
    color: Colors.ui_dark_bg,
    fontSize: 13,
    fontFamily: Fonts.poppins500Medium,
    textTransform: 'capitalize',
    width: '70%'
  },
  certificateCompleted: {
    fontFamily: Fonts.poppins500Medium,
    color: Colors.color_semi_dark_gray,
    fontSize: 12,
  },
  certificateValid: {
    color: Colors.color_semi_dark_gray,
    fontFamily: Fonts.poppins500Medium,
    fontSize: 12,
  },
  shareCard: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  certificateInner: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    alignContent: 'center',
    alignItems: 'center',
  },
  expandIcon: {
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 100,
  },
});

export default memo(Certificate);
