import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Pressable, useWindowDimensions, RefreshControl } from 'react-native';
import HeaderCurve from '../../components/HeaderCurve';
import { Colors } from '../../themes';
import Accordion from '../../components/Accordion';
import RenderHtml, { HTMLContentModel, HTMLElementModel } from 'react-native-render-html';
import { FaqDashboard } from '../../services/Faq/Faq.services';
import { I_GET_FaqDashboard } from '../../Interfaces/faq.interface';
import DynamicShimmerPlaceholder from '../../utils/dynamicShimmerPlaceholder';
import { CommonToastModel } from '../../utils/ToastMessageModel';

const Faq = () => {
  const { width } = useWindowDimensions();
  const [faqList, setFaq] = useState<I_GET_FaqDashboard.FaqDashboard[]>([]);
  const [refreshing, setRefreshing] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  {/* FaqDashboard Api call */ }
  const GetFaqDashboard = async (): Promise<void> => {
    setShowLoader(true);
    setRefreshing(false);

    FaqDashboard<any, I_GET_FaqDashboard.Root>()
      .then(response => {
        if (response && response.Data && response.Data.length > 0) {
          setFaq(response.Data);
          setShowLoader(false);
        }
        else {
          setFaq([]);
          setShowLoader(false);
        }
      })
      .catch(err => {
        setShowLoader(false);
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
      });
  };

  useEffect(() => {
    GetFaqDashboard();
  }, []);

  const customHTMLElementModels = {
    'ul': HTMLElementModel.fromCustomModel({
      tagName: 'ul',
      mixedUAStyles: {
        marginLeft: 5,
        width: '95%'
      },
      contentModel: HTMLContentModel.block
    }),
  };

  return (
    <>
      {/* Faq */}
      <HeaderCurve
        topGaap={119}
        headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'}
        pageBackground={Colors.color_white}
      />
      <ScrollView style={{ backgroundColor: Colors.color_white }} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        {showLoader ? (
          <View style={{ width: '100%', paddingHorizontal: 15 }}>
            <DynamicShimmerPlaceholder
              borderRadius={5}
              height={100}
              width={'100%'}
              count={5}
            />
          </View>
        ) : (
          <>
            <View style={{ paddingHorizontal: 10 }}>
              {faqList.map((faq, index): any => {
                const source = {
                  html: faq.fi_description
                };
                return (
                  <Accordion
                    key={index}
                    title={faq.fi_title}
                    isLock={!!faq.fi_description}
                    showLockIcon={false} 
                    isDisable={!faq.fi_description}
                  >
                    <RenderHtml
                      contentWidth={width - 40}
                      source={source}
                      enableExperimentalMarginCollapsing={true}
                      customHTMLElementModels={customHTMLElementModels}
                    />
                  </Accordion>
                );
              })}
            </View>
          </>
        )}

      </ScrollView>
    </>
  );
};

export default Faq;

const styles = StyleSheet.create({
  loginBg: {
    height: 250,
    padding: 20,
  }
});
