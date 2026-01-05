import { StyleSheet } from "react-native";
import { Colors, Fonts } from '../../themes';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.color_white
    },
    loginBg: {
        height: 300,
        padding: 20,
    },
    hederMain: {
        color: Colors.color_white,
        fontFamily: Fonts.OpenSans700Bold,
        fontSize: 30,
        marginBottom: 30
    },
    subHederMain: {
        color: Colors.color_white,
        fontFamily: Fonts.OpenSans600SemiBold,
        fontSize: 14,
    },
    curve: {
        position: "absolute",
        bottom: 0,
        left: 0,
    },
    centerContent: {
        paddingHorizontal: 15
    },
    smslogo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    centerLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    otpHeader: {
        color: Colors.semi_dark_text_color,
        fontSize: 25,
        fontFamily: Fonts.poppins500Medium,
        marginTop: 20,
        textAlign: 'center',
    },
    otpSub: {
        color: Colors.color_gray,
        fontSize: 16,
        fontFamily: Fonts.OpenSans600SemiBold,
        textAlign: 'center',
        marginBottom: 20
    },
    otpTimer: {
        color: Colors.color_dark_gray,
        fontSize: 27,
        // fontFamily: Fonts.OpenSans700,
        textAlign: 'center',
        fontFamily: Fonts.OpenSans500Medium
    },
    containerOTP: {
        flex: 1,
        paddingBottom: 300,
    },
    resendText: {
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: Fonts.OpenSans600SemiBold
    },
    resendButton: {
        color: '#2F6EFF',
        fontFamily: Fonts.OpenSans600SemiBold
    },
    listPainter: {
        borderWidth: 1,
        borderColor: Colors.color_gray,
        backgroundColor: Colors.color_light_gray,
        margin: 5,
        padding: 10,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    listPainterName: {
        marginLeft: 10,
        fontFamily: Fonts.OpenSans600SemiBold,
        fontSize: 15,
        color: Colors.color_gray,
        textTransform: 'capitalize'
    },
    inputSearch: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'red'
    },
    loaderApicall: {
        position: 'absolute',
        right: 10,
        top: 13,
        transform: 'scale(1.2)'
    },
    header: {
        fontSize: 16,
        fontFamily: Fonts.poppins500Medium,
        color: Colors.ui_dark_bg,
        textTransform: 'capitalize',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '5%'
    },
});

export default styles;