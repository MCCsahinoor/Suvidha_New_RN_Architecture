import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";  
import { useTranslation } from "react-i18next";
import Card from "../../Card";
import { Colors, Fonts } from "../../../themes";
import StarCircleIcon from "../../../assets/svg/starCircle";

const NeedMoreHelpCard = () => {
    const { t } = useTranslation();

    return (
        <Card>
            <View style={{ ...styles.profileInfo, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                    <StarCircleIcon width={35} height={35} />
                    <View style={{ marginLeft: 10, flex: 1, }}>
                        <Text style={{ ...styles.setttingTitle, fontSize: 12 }}>{t("faq")}</Text>
                        <Text style={{ ...styles.settingDetails, fontSize: 11, }}>{t("faqShowtDesc")}</Text>
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
    )
}

export default NeedMoreHelpCard;

const styles = StyleSheet.create({
    profileInfo: {
        padding: 10,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
    },
    setttingTitle: {
        color: '#222222',
        fontFamily: Fonts.poppins600SemiBold,
    },
    userCall: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    settingDetails: {
        color: Colors.color_gray,
        fontFamily: Fonts.OpenSans400Regular,
    },
    callCircle: {
        borderColor: Colors.color_glow_green,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 30,
        padding: 8
    }
})