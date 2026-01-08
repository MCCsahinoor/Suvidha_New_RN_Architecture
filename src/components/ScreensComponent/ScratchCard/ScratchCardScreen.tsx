import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import HeaderCurve from '../../HeaderCurve';
import { AppImages, Colors, Fonts } from '../../../themes';
import { ScratchCard } from 'rn-scratch-card-mcc';
import LottieView from 'lottie-react-native';
import { PainterScratchcardGetPending, PainterScratchcardUpdateScratch } from '../../../services/ScratchCard/Scratch.services';
import { CommonToastModel } from '../../../utils/ToastMessageModel';
import { useTranslation } from 'react-i18next';

const ScratchScreen = ({ navigation, route }: any) => {
  const scratchCardRef = useRef(null);
  const { character_stamp } = route.params;
  const { eh_hdr_id, date, eh_total_amount, desc, gift_img, gift_desc, display_id } = route.params;
  const [scratchPercentageData, setscratchPercentage] = useState(0);
  const [responseCode, setResponseCode] = useState(0);
  const [shouldReset, setShouldReset] = useState(false);
  const { t } = useTranslation();
  function handleScratch(scratchPercentage: number) {
    setscratchPercentage(scratchPercentage);
  }
  const scrachCardDetails = (hdrId: number, date: string, eh_total_amount: number, desc: string, gift_img: string, gift_desc: string, display_id: string, character_stamp: string): void => {
    navigation.navigate('ScratchDetails', {
      eh_hdr_id: hdrId,
      date: date,
      eh_total_amount: eh_total_amount,
      desc: desc,
      gift_img: gift_img,
      gift_desc: gift_desc,
      character_stamp: character_stamp,
      display_id: display_id,

    });
  };

  const PainterScratchCard = () => {
    PainterScratchcardUpdateScratch({ hdr_id: eh_hdr_id })
      .then((response: any) => {
        if (response && response.response_message) {
          setResponseCode(response.response_code);
          // CommonToastModel('success', response.response_message, 5000);
        }
      })
      .catch(err => {
        CommonToastModel('error', err?.error?.response?.data?.errorMessage || 'Something went wrong! Please try again.', 8000);
      });
  };
  // const PainterScratchCard = () => {
  //   PainterScratchcardUpdateScratch({ hdr_id })
  //     .then((response: any) => {
  //       if (response && response.response_message) {
  //         setResponseCode(response.response_code);
  //       }
  //     })
  //     .catch(err => {
  //       CommonToastModel('error', err?.error?.response?.data?.errorMessage || 'Something went wrong! Please try again.', 8000);

  //       // Reset ScratchCard on error
  //       // if (scratchCardRef.current) {
  //       //   scratchCardRef.current.reset();
  //       // }
  //     });
  // };


  useEffect(() => {
    if (scratchPercentageData > 80) {
      PainterScratchCard();
    }
  }, [scratchPercentageData, responseCode]);

  useEffect(() => {
    if (responseCode === 1) {
      setShouldReset(false);
    } else {
      setShouldReset(true);
      setscratchPercentage(0);
    }
  }, [responseCode]);

  return (
    <>
      <HeaderCurve
        topGaap={119}
        headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'}
        pageBackground={'#F2F2F2'}
      />
      <ScrollView style={{ backgroundColor: '#F2F2F2' }}>
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={styles.headerScrach}>Scratch and Win</Text>
          <Text style={styles.subHeaderScrach}>
            {t("ScratchthecardandgetachancetowinExcitingrewards")}
          </Text>
          <View style={{ padding: 20 }}>
            <View style={styles.scrachContainer}>
              <Pressable
                onPress={() => {
                  scrachCardDetails(eh_hdr_id, date, eh_total_amount, desc, gift_img, gift_desc, display_id, character_stamp);
                }}
                style={styles.background_view}>
                <LottieView
                  source={{ uri: AppImages.LottyGiftBox }}
                  style={{
                    width: 160,
                    height: 160,
                    transform: 'scale(1.2)',
                    position: 'absolute',
                    zIndex: 5,
                  }}
                  autoPlay
                  loop
                />
                <LottieView
                  source={{ uri: AppImages.LottyConfetti }}
                  style={{
                    width: 160,
                    height: 160,
                    transform: 'scale(2)',
                    position: 'absolute',
                  }}
                  autoPlay
                  loop
                />
              </Pressable>
              {scratchPercentageData < 80 && responseCode != 1 ? (
                // <ScratchCard
                //   source={{
                //     uri: AppImages.ScrachCard,
                //   }}
                //   brushWidth={100}
                //   onScratch={handleScratch}
                //   style={styles.scratch_card}
                // />
                <ScratchCard
                  // ref={scratchCardRef}
                  source={{
                    uri: AppImages.ScrachCard,
                  }}
                  brushWidth={100}
                  onScratch={handleScratch}
                  style={styles.scratch_card}
                />
                // <></>
              ) : (
                <Pressable
                  onPress={() => {
                    scrachCardDetails(eh_hdr_id, date, eh_total_amount, desc, gift_img, gift_desc, display_id, character_stamp);
                  }}
                  style={styles.scratch_card}></Pressable>
              )}
            </View>
          </View>
          <View>
            {scratchPercentageData < 80 && responseCode != 1 ? (
              <Text style={styles.subHeaderScrach}>
                {t("Scratchtheabovecardbyswipingonit")}

              </Text>
            ) : (
              <>
                <Text style={styles.subHeaderScrach}>
                  {t("Youhavewonareward")}

                </Text>
                <Pressable
                  onPress={() => {
                    scrachCardDetails(eh_hdr_id, date, eh_total_amount, desc, gift_img, gift_desc, display_id, character_stamp);
                  }}>
                  <Text
                    style={{
                      ...styles.subHeaderScrach,
                      fontSize: 11,
                      marginTop: 10,
                    }}>
                    {t("Clicktoviewdetails")}

                  </Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </ScrollView>
      {scratchPercentageData > 80 && responseCode != 1 && (
        <View style={{ paddingVertical: 20, backgroundColor: '#F2F2F2' }}>
          <View style={styles.validContainer}>
            <Text style={styles.subHeaderScrach}>
              {t("Validtill")} : {date}
            </Text>
          </View>
        </View>
      )}

    </>
  );
};

const styles = StyleSheet.create({
  headerScrach: {
    color: Colors.ui_dark_bg,
    fontSize: 20,
    fontFamily: Fonts.poppins600SemiBold,
    textAlign: 'center',
    marginVertical: 5,
  },
  subHeaderScrach: {
    color: Colors.color_black,
    fontSize: 14,
    fontFamily: Fonts.OpenSans600SemiBold,
    textAlign: 'center',
  },
  scrachContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    position: 'relative',
  },
  background_view: {
    position: 'absolute',
    width: 270,
    height: 270,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 16,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scratch_card: {
    width: 270,
    height: 270,
    backgroundColor: 'transparent',
    // position: 'absolute',
    // top: 0,
    // left: 0,
  },
  validContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
});

export default ScratchScreen;




