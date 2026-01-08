import React, { memo } from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppImages, Colors, Fonts } from '../themes';

import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux'; 
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import Timer from './Timer';

const HomeBottomFooter = ({ navigation }: any) => {
  const { t } = useTranslation();

  const handleOpenLink = () => {
    const url = 'https://play.google.com/store/apps/details?id=com.bergervis';
    Linking.openURL(url);
  };

  const visitRunningCount = useSelector((state: any) => state.holdRunningVisit);

  return (
    <View style={{ paddingTop: 5 }}>
      <View style={styles.footerMenuContainer}>
        <Pressable style={styles.menuItem} onPress={() => navigation.navigate('Products')}>
          <Image source={require('../assets/images/bag.png')} style={{ height: 25, width: 30, resizeMode: 'contain' }} />
          <Text style={styles.menuItemLabel}>{t("Product")}</Text>
        </Pressable>
        {/* <Pressable style={styles.menuItem} onPress={handleOpenLink}>
          <OrderIcon height={25} width={35} /> HomeNewsFeeds
          <Text style={styles.menuItemLabel}>{t("MyColourApp")}</Text>
        </Pressable> */}
        <Pressable style={styles.menuItem} onPress={() => navigation.navigate('HomeNewsFeeds')}>
          <Image source={require('../assets/images/newspaper.png')} style={{ height: 23, width: 30, resizeMode: 'contain', marginTop: 2 }} />
          <Text style={styles.menuItemLabel}>{t("newsFeeds")}</Text>
        </Pressable>

        {/* {
          visitRunningCount.isVisitRunning && (
            <Pressable onPress={() => navigation.navigate('VisitRunning', { details: visitRunningCount.details })}>
              <View style={{ position: 'relative', backgroundColor: '#fff', width: 50, height: 50, display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{ width: 70, height: 60, position: 'absolute', top: -30, backgroundColor: 'white', borderRadius: 30, }}>
                  <Timer data={visitRunningCount.counter} />
                  <LottieView
                    source={{ uri: AppImages.LottyVisitRunning }}
                    style={{ width: '100%', height: '100%', marginTop: -2 }}
                    autoPlay
                  />
                </View>

              </View>
            </Pressable>
          )
        }  */}
        <Pressable onPress={() => navigation.navigate('scanToken')}>
          <View style={{ position: 'relative', backgroundColor: Colors.ui_ultra_light_bg, width: 50, height: 50, display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ width: 70, height: 70, position: 'absolute', top: -40, backgroundColor: Colors.ui_dark_bg, borderRadius: 100, borderWidth: 5, borderColor: '#F2F2F2' }}>
              <LottieView
                source={{ uri: AppImages.LottyScanToken }}
                style={{ width: '100%', height: '100%' }}
                autoPlay
              />
            </View>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Faq')} style={styles.menuItem}>
          <Image source={require('../assets/images/faqnew.png')} style={{ height: 25, width: 30, resizeMode: 'contain' }} />
          <Text style={styles.menuItemLabel}>{t("faq")}</Text>
        </Pressable>
        <Pressable style={styles.menuItem} onPress={() => navigation.navigate('HelpDesk')}>
          <Image source={require('../assets/images/headphones.png')} style={{ height: 25, width: 30, resizeMode: 'contain' }} />
          <Text style={styles.menuItemLabel}>{t("Help")}</Text>
        </Pressable>
      </View>
      {visitRunningCount.isVisitRunning && (
        <Pressable onPress={() => navigation.navigate('VisitRunning', { details: visitRunningCount.details })}>
          <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['rgb(240,213,109)', 'rgb(205,167,15)']} style={{ paddingVertical: 10, paddingHorizontal: 15, }} >
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center' }}>
                <LottieView
                  source={{ uri: AppImages.LottyVisitRunning }}
                  style={{ width: 30, height: 30 }}
                  autoPlay
                />
                <Text style={{
                  color: Colors.ui_dark_bg,
                  fontSize: 14,
                  fontFamily: Fonts.OpenSans700Bold,
                }}> Visit Running</Text>
              </View>
              <Timer data={visitRunningCount.counter} />
            </View>
          </LinearGradient>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footerMenuContainer: {
    paddingVertical: 5,
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: Colors.ui_ultra_light_bg,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: Colors.ui_dark_bg,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    elevation: 24,
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    alignItems: 'center',
    // backgroundColor: 'blue',
    width: '20%'
  },
  menuItemLabel: {
    color: Colors.ui_dark_bg,
    fontSize: 11,
    fontFamily: Fonts.OpenSans700Bold,
  },
});

export default memo(HomeBottomFooter);
