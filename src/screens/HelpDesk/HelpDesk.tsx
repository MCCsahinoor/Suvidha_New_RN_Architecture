import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import HeaderCurve from "../../components/HeaderCurve";
import { Colors, Fonts } from "../../themes";
import styles from "./styles";   
import { useEffect, useState } from "react";
import { GetHelpDesk } from "../../services/HelpDesk/helpDesk.services";
import {
  I_HELP_DESK,
  I_REPRESENTATIVE,
} from "../../Interfaces/helpDesk.interface";
import DynamicShimmerPlaceholder from "../../utils/dynamicShimmerPlaceholder";
import { useTranslation } from "react-i18next";
import { CommonToastModel } from "../../utils/ToastMessageModel";
import React from "react";
import TollFreeCard from "../../components/ScreensComponent/HelpDesk/TollFreeCard";
import AccountSettingCard from "../../components/ScreensComponent/HelpDesk/AccountSettingCard";
import RepresentativeCard from "../../components/ScreensComponent/HelpDesk/RepresentativeCard";
import NeedMoreHelpCard from "../../components/ScreensComponent/HelpDesk/NeedMoreHelpCard";

const HelpDesk = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [helpDeskInfo, setHelpDeskInfo] = useState<I_HELP_DESK | null>(null);
  const [repsentativeList, setRepsentativeList] = useState<I_REPRESENTATIVE[]>(
    []
  );
  useEffect(() => {
    fetchHelpDesk();
  }, []);

  const fetchHelpDesk = async () => {
    setIsLoading(true);
    try {
      const response = await GetHelpDesk<any, any>();
      if (response && response.data) {
        console.log("HelpDeskInfo==> ", response.data);
        console.log("Representative==> ", response.data.Representative);
        setHelpDeskInfo(response.data);
        setRepsentativeList(response.data.Representative);
      } else {
        setHelpDeskInfo(null);
        setRepsentativeList(response.data.Representative);
      }
    } catch (err) {
      // console.error(err);
      setHelpDeskInfo(null);
      setRepsentativeList([]);
    } finally {
      setIsLoading(false);
    }
  };



  const CallUser = (repsentative: I_REPRESENTATIVE) => {
    const phoneNumber = `tel:${repsentative.usp_mobile}`;
    Linking.openURL(phoneNumber)
      .then(() => {
        console.log("Dial pad opened with number: ", repsentative.usp_mobile);
      })
      .catch((err) => {
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
        //console.log("Failed to open dial pad: ", err);
      });
  };

  const goToChatQuestions = () => {
    navigation.navigate("ChatQuestions");
  };

  const goToChatFqa = () => {
    navigation.navigate("Faq");
  };

  const { t } = useTranslation();

  const goToProfile = () => {
    navigation.navigate("myProfile");
  };

  return (
    <>
      <HeaderCurve
        topGaap={119}
        headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'}
        pageBackground={"#F2F2F2"}
      />
      {isLoading ? (
        <View style={{ width: "100%", paddingHorizontal: 15 }}>
          <DynamicShimmerPlaceholder
            borderRadius={5}
            height={100}
            width={"100%"}
            count={4}
          />
        </View>
      ) : (
        <ScrollView>
          <View style={{ ...styles.container }}>
            <Text
              style={{
                ...styles.headerText,
                color: Colors.ui_dark_bg,
                fontFamily: Fonts.OpenSans600SemiBold,
              }}
            >
              {t("WelcomeTo")}
            </Text>
            <Text
              style={{
                ...styles.headerText,
                color: Colors.ui_dark_bg,
                fontFamily: Fonts.OpenSans600SemiBold,
              }}
            >
              {t("CustomerService")}
            </Text>
          </View>
          <View style={{ ...styles.container, marginVertical: 10 }}>
            {/* toll free card */}
            <View style={{ marginBottom: 15 }}>
              <TollFreeCard CardData={helpDeskInfo} />
            </View>

            {/* account setting card */}
            <View>
              <Pressable
                onPress={goToProfile}
                style={{ marginBottom: 15 }}
              >
                <Text
                  style={{
                    ...styles.headerText,
                    color: Colors.ui_dark_bg,
                    fontFamily: Fonts.poppins500Medium,
                  }}
                >
                  {t("AreYouLookingFor")}
                </Text>
                <AccountSettingCard navigation={navigation} />
              </Pressable>
            </View>

            {/* Your Representative */}
            <View style={{ marginBottom: 15 }}>
              <Text
                style={{
                  ...styles.headerText,
                  color: Colors.ui_dark_bg,
                  fontFamily: Fonts.poppins500Medium,
                }}
              >
                {t("YourRepresentative")}
              </Text> 
              <View style={{ marginBottom: 10 }}>
                <RepresentativeCard
                  repsentativeList={repsentativeList}
                  CallerId={CallUser}
                />
              </View>
              {/* ))} */}
            </View>

            {/* Chat with customer services  */}
            {/* <Pressable
            onPress={() => goToChatQuestions()}
            style={{ marginBottom: 15 }}
          >
            <Text
              style={{
                ...styles.headerText,
                color: Colors.ui_dark_bg,
                fontFamily: Fonts.poppins500Medium,
              }}
            >
              Chat with customer services
            </Text>
            <ChatbotCard />
          </Pressable> */}

            {/* Need More Help  */}
            <Pressable onPress={() => goToChatFqa()} style={{ marginBottom: 15 }} >
              <Text
                style={{
                  ...styles.headerText,
                  color: Colors.ui_dark_bg,
                  fontFamily: Fonts.poppins500Medium,
                }}
              >
                {t("NeedMoreHelp")}
              </Text>
              <NeedMoreHelpCard />
            </Pressable>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default HelpDesk;
