import { StyleSheet } from "react-native";
import { Fonts, Colors } from "../../../themes";

const styles = StyleSheet.create({
    patmentModeHeader: {
        color: '#4A4A4A',
        fontSize: 15,
        fontFamily: Fonts.OpenSans500Medium,
    },
    sectionHeader: {
        backgroundColor: Colors.lite_bg,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginVertical: 10
    },
    sectionHeaderText: {
        fontSize: 14,
        fontFamily: Fonts.OpenSans500Medium,
        color: Colors.ui_dark_bg
    },
});

export default styles;