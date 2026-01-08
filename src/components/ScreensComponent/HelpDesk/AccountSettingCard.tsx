import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts } from "../../../themes"; 
import Card from "../../Card";
import { Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import UserCircleIcon from "../../../assets/svg/userCircle";

const AccountSettingCard = ({ navigation }: any) => {
  const goToProfile = () => {
    navigation.navigate("myProfile");
  };
  const { t } = useTranslation();

  return (
    // <Pressable onPress={goToProfile}>
    <View>
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
              width: "80%",
            }}
          >
            <UserCircleIcon width={35} height={35} />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ ...styles.setttingTitle, fontSize: 12 }}>
                {t("AccountSettings")}
              </Text>
              <Text style={{ ...styles.settingDetails, fontSize: 11 }}>
                {t("EditPassword")}
              </Text>
            </View>
          </View>

          <View style={{}}>
            <Ionicons
              name="chevron-forward-circle-outline"
              size={22}
              style={{ color: Colors.color_gray }}
            />
          </View>
        </View>
      </Card>
    </View>
    // </Pressable>
  );
};

export default AccountSettingCard;

const styles = StyleSheet.create({
  profileInfo: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  setttingTitle: {
    color: "#222222",
    fontFamily: Fonts.poppins600SemiBold,
  },
  userCall: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  settingDetails: {
    color: Colors.color_gray,
    fontFamily: Fonts.OpenSans400Regular,
  },
  callCircle: {
    borderColor: Colors.color_glow_green,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 30,
    padding: 8,
  },
});
