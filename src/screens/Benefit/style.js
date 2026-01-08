import { StyleSheet } from "react-native";
import { Colors, Fonts } from '../../themes';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
    },
    headerText: {
        color: Colors.ui_dark_bg,
        fontSize: 15,
        fontFamily: Fonts.poppins500Medium,
        textTransform: 'capitalize',
    },
    bdrTop: {
        borderTopColor: '#E4E4E4',
        borderTopWidth: 1,
        borderStyle: 'solid'
    },
    paraText: {
        color: Colors.color_black,
        fontSize: 12,
        fontFamily: Fonts.OpenSans400Regular,
    },
    descText: {
        color: Colors.color_black,
        fontSize: 12,
        fontFamily: Fonts.OpenSans400Regular,
        flex: 1
    },
    attendanceWrapper: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
    },
    attendanceContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 10,
    },
    textBold: {
        fontSize: 12,
        fontFamily: Fonts.OpenSans600SemiBold,
        color: Colors.color_gray,
        marginRight: 8
    },
    textId: {
        fontSize: 14,
        fontFamily: Fonts.OpenSans600SemiBold,
        color: Colors.color_black,
        minWidth: 80
    },
    attendanceIcon: {
        backgroundColor: '#3E797F',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: '#7BABB0',
        borderWidth: 5
    },
    agendaBox: {
        backgroundColor: '#F0F0F050',
        borderRadius: 5,
        borderColor: '#E6E6E6',
        borderWidth: 1,
        height: 100,
    },
    sameInline: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    },
    searchIcon: {
        position: 'absolute',
        zIndex: 1,
        top: 10,
        left: 11,
        color: '#686868',
    },
    inputStyles: {
        borderRadius: 100,
        paddingHorizontal: 10,
        height: 40,
        marginTop: 2,
    },
    pendingGroup: {
        backgroundColor: 'rgba(235.88, 150.10, 0, 0.22)',
        padding: 2,
        paddingHorizontal: 8,
        borderRadius: 100
    },
    pending: {
        color: '#EC9600',
        fontSize: 10,
        fontFamily: Fonts.OpenSans600SemiBold,
        textAlign: 'center'
    },
    sendtoDealer: {
        color: '#5F5F5F',
        fontSize: 10,
        fontFamily: Fonts.OpenSans600SemiBold,
        textAlign: 'center'
    },
    sendtoDealerGrp: {
        backgroundColor: 'rgba(230, 230, 230, 1)',
        padding: 2,
        paddingHorizontal: 8,
        borderRadius: 100
    },
    redeemed: {
        color: '#FFFFFF',
        fontSize: 10,
        fontFamily: Fonts.OpenSans600SemiBold,
        textAlign: 'center'
    },
    redeemedGrp: {
        backgroundColor: 'rgba(40, 154, 0, 1)',
        padding: 2,
        paddingHorizontal: 8,
        borderRadius: 100
    }
})

export default styles;