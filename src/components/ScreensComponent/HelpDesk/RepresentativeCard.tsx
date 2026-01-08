import { Pressable, StyleSheet, Text, View } from "react-native"; 
import React from "react";
import { Colors, Fonts } from "../../../themes";
import InitialAvatar from "../../InitialAvatar";
import Ionicons from "react-native-vector-icons/Ionicons"; 
import { useTranslation } from "react-i18next";
import Card from "../../Card";
import { I_REPRESENTATIVE } from "../../../Interfaces/helpDesk.interface";

const RepresentativeCard = ({ repsentativeList, CallerId }: any) => {
  const { t } = useTranslation();
  return (
    <>
      {repsentativeList?.length > 0 &&
        repsentativeList.map((repsentative: I_REPRESENTATIVE, index: any) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Card>
              <View
                style={{
                  ...styles.attendanceWrapper,
                  alignItems: "flex-start",
                }}
              >
                <View style={{ width: "15%" }}>
                  <InitialAvatar
                    name={repsentative?.usp_name}
                    profilePic={`data:image/png;base64,${repsentative.usp_image_base64}`}
                    size={50}
                    fontSize={17}
                  />
                </View>
                <View
                  style={{
                    ...styles.attendanceContent,
                    width: "85%",
                    paddingLeft: 15,
                  }}
                >
                  <View style={{ paddingRight: 10, flex: 1 }}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingBottom: 3,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: Fonts.OpenSans600SemiBold,
                          color: Colors.dark_text_color,
                        }}
                      >
                        {repsentative?.usp_name ? repsentative?.usp_name : "-"}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingBottom: 3,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: Fonts.OpenSans600SemiBold,
                          color: Colors.dark_text_color,
                        }}
                      >
                        {repsentative?.usp_desig
                          ? repsentative?.usp_desig
                          : "-"}
                      </Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: Fonts.OpenSans400Regular,
                          color: Colors.dark_text_color,
                        }}
                      >
                        {repsentative?.usp_mailid
                          ? repsentative?.usp_mailid
                          : "-"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ ...styles.bdrTop }}></View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: Fonts.OpenSans400Regular,
                    color: Colors.dark_text_color,
                  }}
                >
                  {t("callNow")} :
                </Text>
                {/* <Pressable style={{ ...styles.userCall, marginLeft: 5 }}> */}
                <Pressable
                  onPress={() => CallerId(repsentative)}
                  style={{ ...styles.userCall, marginLeft: 5 }}
                >
                  <Ionicons
                    name="call"
                    size={12}
                    color={Colors.color_glow_green}
                  />
                  <Text
                    style={{
                      marginLeft: 2,
                      color: Colors.color_glow_green,
                      fontSize: 10,
                      fontFamily: Fonts.OpenSans600SemiBold,
                    }}
                  >
                    {repsentative?.usp_mobile ? repsentative?.usp_mobile : "-"}
                  </Text>
                </Pressable>
              </View>
            </Card>
          </View>
        ))}
    </>
  );
};

export default RepresentativeCard;

const styles = StyleSheet.create({
  attendanceWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  attendanceIcon: {
    backgroundColor: "#3E797F",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: "#7BABB0",
    borderWidth: 5,
  },
  attendanceContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
  fabPosition: {
    position: "absolute",
    bottom: 25,
    right: 25,
  },
  fixedButton: {
    backgroundColor: Colors.color_white,
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  referHeaderText: {
    color: Colors.ui_dark_bg,
    fontSize: 16,
    fontFamily: Fonts.poppins500Medium,
  },
  bdrTop: {
    borderTopColor: "#E4E4E4",
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  paraText: {
    color: Colors.color_black,
    fontSize: 12,
    fontFamily: Fonts.OpenSans400Regular,
    flex: 1,
  },
  userCall: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
});
