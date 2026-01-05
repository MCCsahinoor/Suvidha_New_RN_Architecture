import { Image, Linking, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getWindowDimensions } from '../../utils/scale';
import { Colors, Fonts } from '../../themes';
import LottieView from 'lottie-react-native';
import ButtonLarge from '../../components/ButtonLarge';
import { setApiCallLoader } from '../../store/features/apiCallLoader/apiCallLoader';
import { GetUserProfile } from '../../services/Profile/Profile.services';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileData } from '../../store/features/userProfile/profileSlice';
import { LOCAL_STORAGE_KEY } from '../../utils/localStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { AppApplicableLanguag } from '../../services/Language/language.services';
import { setappApplicableLanguage } from '../../store/features/appLanguage/appApplicableLanguage';
import { CommonToastModel } from '../../utils/ToastMessageModel';

const NewVersion = ({ route, navigation }: any) => {
  const { height, width } = getWindowDimensions();
  const isAPICall = useSelector((state: any) => state.apiCallLoader);
  const { obsolete } = route.params;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const updateApp = (): void => {
    let updateSuvidhaAndroid = `https://play.google.com/store/apps/details?id=com.berger.app.suvidha`
    let updateSuvidhaIos = `https://apps.apple.com/us/app/berger-suvidha/id1538708622`
    Linking.openURL(Platform.OS === 'android' ? updateSuvidhaAndroid : updateSuvidhaIos);
  }

  const skipUpdate = async (): Promise<void> => {
    const token = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
    if (token) {
      AppApplicableLang()
      dispatch(setApiCallLoader(true));
      GetUserProfile().then((response: any) => {
        dispatch(setApiCallLoader(false));
        if (response && response.data && response.data.length > 0) {
          dispatch(setProfileData(response.data));
          navigation.replace('Home');
        } else {
          navigation.replace('Home');
        }
      }).catch(err => {
        dispatch(setApiCallLoader(false));
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
      });
    } else {
      navigation.replace('Onbording');
    }
  }

  const AppApplicableLang = () => {
    AppApplicableLanguag().then((response: any) => {
      if (response && response.data && response.data.length > 0) {
        dispatch(setappApplicableLanguage(response.data));
      } else {
        dispatch(setappApplicableLanguage(response.data));
      }
    }).catch(err => {
      CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    });
  }

  return (
    <ScrollView style={{ backgroundColor: Colors.ui_dark_bg }}>
      <LinearGradient style={{ height, width, flex: 1, }} colors={[Colors.ui_light_bg, Colors.ui_dark_bg]} >
        <View style={{ ...styles.container, }}>
          <LottieView source={require('../../assets/lotty/appUpdate.json')} style={{ width: 200, height: 150, transform: 'scale(1.5)', marginBottom: 10 }} autoPlay loop />
          <Text style={styles.header}>{t("TimeToUpdate")}</Text>
          <Text style={styles.subHeader}>{t("AppUpdateSubHead")}</Text>
          <ButtonLarge
            title={t("UpdateNow")}
            onPress={updateApp}
            fillBtn={true}
            key={'UpdateNow'}
            showIcon={false}
            iconName=""
            paddingVertical={10}
            paddingHorizontal={0}
            fontSize={19}
            iconSize={19}
            isAPICall={isAPICall}
            disabled={isAPICall}
          />
          {!isAPICall && obsolete != "Y" && (
            <Text style={styles.skipForNow} onPress={() => { skipUpdate() }}>{t("NoAppUpdate")}</Text>
          )}
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingTop: 10
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 40,
    zIndex: 9,
  },
  header: {
    fontSize: 20,
    fontFamily: Fonts.OpenSans600SemiBold,
    textTransform: 'uppercase',
    color: Colors.color_white
  },
  subHeader: {
    color: Colors.color_light_gray,
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.8,
    fontFamily: Fonts.poppins400Regular,
    marginBottom: 20
  },
  skipForNow: {
    color: Colors.color_light_gray,
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.8,
    fontSize: 15,
    fontFamily: Fonts.poppins400Regular,
  }
});

export default NewVersion;
