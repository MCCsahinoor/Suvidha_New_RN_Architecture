import { Linking, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts } from "../../../themes"; 
import Card from "../../Card";
import { Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { CommonToastModel } from "../../../utils/ToastMessageModel";
import React from "react";
import CustomerCareIcon from "../../../assets/svg/custtomerCare";

const TollFreeCard = ({ CardData }: any) => {
  const { t } = useTranslation();
  const CallCustCare = () => {
    const phoneNumber = `tel:${CardData?.toll_free_number}`;
    Linking.openURL(phoneNumber)
      .then(() => {
        console.log(
          "Dial pad opened with number: ",
          CardData?.toll_free_number
        );
      })
      .catch((err) => {
        console.log("Failed to open dial pad: ", err);
        CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
      });
  };
  return (
    <>
      <Card>
        <View
          style={{
            ...styles.profileInfo,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "70%",
            }}
          >
            <CustomerCareIcon width={35} height={35} />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ ...styles.numberCell, fontSize: 12 }}>
                {t("TollFreeNumber")}
              </Text>
              <Text style={{ ...styles.UserInfo, fontSize: 11 }}>
                {CardData?.toll_free_number ? CardData?.toll_free_number : "-"}
              </Text>
            </View>
          </View>
          {CardData?.toll_free_number && (
            <Pressable
              style={{ ...styles.userCall, ...styles.callCircle }}
              onPress={CallCustCare}
            >
              <Ionicons name="call" size={16} color={Colors.color_glow_green} />
            </Pressable>
          )}
        </View>
      </Card>
    </>
  );
};

export default TollFreeCard;

const styles = StyleSheet.create({
  profileInfo: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  UserInfo: {
    color: Colors.color_gray,
    fontFamily: Fonts.OpenSans400Regular,
    // color: "#222222",
    // fontFamily: Fonts.poppins600SemiBold,
  },
  userCall: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  numberCell: {
    color: "#222222",
    fontFamily: Fonts.poppins600SemiBold,
    // color: Colors.color_black,
    // fontFamily: Fonts.OpenSans600SemiBold,
  },
  callCircle: {
    borderColor: Colors.color_glow_green,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 30,
    padding: 8,
  },
});
