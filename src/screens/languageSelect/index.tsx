/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  Pressable,
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../themes'; 
import ButtonLarge from '../../components/ButtonLarge';
import * as utils from '../../utils';
import {
  AppApplicableLanguag,
  GetLanguageList,
  UpdateUserApplicableLanguag,
} from '../../services/Language/language.services';
import {
  I_GET_FOR_LANGUAGE_SET,
  I_GET_LANGUAGE,
  I_SEND_FOR_LANGUAGE,
} from '../../Interfaces/language.interface';
import { LOCAL_STORAGE_SET } from '../../helper/LocalStorageHelper';
import { LOCAL_STORAGE_KEY } from '../../utils/localStorageKeys';
import { setLogin } from '../../store/features/login/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setApiCallLoader } from '../../store/features/apiCallLoader/apiCallLoader';
import { appLanguageCheckReducer } from '../../store/features/appLanguage/appLanguageChange';
import { useTranslation } from 'react-i18next';
import { CommonToastModel } from '../../utils/ToastMessageModel';
import LanguageList from '../../components/languageList';

const LanguageSelection = ({ navigation }: any) => {
  const [lang, setLang] = useState('');
  const [isConfirmDisable, setisConfirmDisable] = useState(true);
  const { t } = useTranslation();
  const [isLangList, setLangList] = useState<I_GET_LANGUAGE.LangList[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    GetApplicableLanguageList();
  }, []);

  const GetApplicableLanguageList = async (): Promise<void> => {
    AppApplicableLanguag<any, I_GET_LANGUAGE.Root>()
      .then(response => {
        if (response && response.data && response.data.length > 0) {
          setLangList(response.data);
          const defaultLanguage = response.data.find(
            lang => lang.default_yn === 'Y',
          );
          if (defaultLanguage) {
            setLang(defaultLanguage.lang_code);
            setisConfirmDisable(false);
          }
        } else {
          LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.LANGUAGE_SELECT, lang);
          dispatch(appLanguageCheckReducer(lang))
          dispatch(setLogin(true));
          navigation.replace('Home');
        }
      })
      .catch(err => {
        // console.error(err);
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
      });
  };

  const getLang = (val: string): void => {
    setLang(val);
    setisConfirmDisable(false);
  };

  const navigateToHome = (): void => {
    // LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.LANGUAGE_SELECT, lang);
    // dispatch(appLanguageCheckReducer(lang))
    applicableLanguag(lang);
  };

  const applicableLanguag = (lang: string): void => {
    let data: I_SEND_FOR_LANGUAGE = {
      user_id: '',
      lang_code: lang,
    };
    dispatch(setApiCallLoader(true));
    UpdateUserApplicableLanguag<I_SEND_FOR_LANGUAGE, I_GET_FOR_LANGUAGE_SET>(data)
      .then(response => {
        dispatch(setApiCallLoader(false));
        if (response && response.response_code === 1) {
          LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.LANGUAGE_SELECT, lang);
          dispatch(appLanguageCheckReducer(lang))
          dispatch(setLogin(true));
          navigation.replace('Home');
        } else {
          CommonToastModel('error', response.response_message, 5000);
        }
      }).catch(err => {
        dispatch(setApiCallLoader(false));
        console.error(err);
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
      });
  };

  // API CALL CHECK IF API CALL START THEN BUTTON DESABLED
  const isAPICall = useSelector((state: any) => state.apiCallLoader);

  return (
    <>

      <View>
        <LinearGradient
          colors={[Colors.ui_light_bg, Colors.ui_dark_bg]}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}> {t("ChooseLanguage")} </Text>
            <Image
              style={{
                width: utils.Scale.getWindowDimensions().width,
                ...styles.curve,
              }}
              source={require('../../assets/images/curve1.png')}
            />
          </View>

        </LinearGradient>
      </View>

      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ ...styles.container }}>
          <View style={styles.languageList}>
            {isLangList && isLangList.length > 0 && (
              <>
                {isLangList.map((item, index) => (
                  <LanguageList
                    key={item.lang_code}
                    id={item.lang_code}
                    title={item.lang_desc}
                    subTitle={item.lang_translated_desc}
                    getLang={getLang}
                    lang={lang}
                  />
                ))}
              </>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={{ backgroundColor: 'white', paddingHorizontal: 15 }}>
        <ButtonLarge
          title={t("Confirm")}
          isAPICall={isAPICall}
          disabled={isConfirmDisable || isAPICall}
          onPress={() => {
            navigateToHome();
          }}
          fillBtn={true}
          key={'Confirm'}
          showIcon={false}
          iconName=""
          paddingVertical={10}
          paddingHorizontal={10}
          fontSize={19}
          iconSize={19}
        />
      </View>
    </>
  );
};

export default LanguageSelection;
