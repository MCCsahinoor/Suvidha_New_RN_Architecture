import { StyleSheet } from "react-native";
import { Colors, Fonts } from '../../themes';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
        padding: 5,
        paddingTop: 0,
    },
    quickLinksCards: {
        padding: 15,
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    linksImages: {
        width: 45,
        height: 45,
        resizeMode: 'contain'
    },
    title: {
        color: Colors.color_low_light_text_color,
        fontFamily: Fonts.poppins600SemiBold,
        fontSize: 12,
        letterSpacing: 0.18,
        textAlign: 'center',
    },
    cardQuickLInks: {
        backgroundColor: Colors.color_white,
        width: '100%',
        marginVertical: 10,
        padding: 5,
        marginBottom: 2,
        paddingVertical: 8,
        textAlign: 'center',
        borderRadius: 10,
        shadowColor: Colors.shadow_light,
        elevation: 15,
    },
    quickLinksIcons: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: Colors.color_white,
        width: 70,
        height: 70,
        borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderColor: Colors.color_low_light_text_color,
        borderWidth: 1,
        marginBottom: 2
    },
    newsFeeds: {
        display: 'flex',
        flexDirection: 'row',
    },
    newsFeedsContent: {
        marginLeft: 10,
        width: '71%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'left',
        // marginTop: 8,
        // marginBottom: 8
    },
    newsFeedsText: {
        fontSize: 13,
        lineHeight: 17,
        color: '#141B34',
        marginTop: -2
    },
    newsFeedsReadMore: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    newsFeedsHeading: {
        fontFamily: Fonts.OpenSans600SemiBold,
        fontSize: 15,
        marginBottom: 5,
        color: Colors.color_black
    },
    rangeSelect: {
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'flex-end',
        paddingHorizontal: 12
    },
    business: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: "space-between",
        alignContent: "center",
    },
    subscriptText: {
        fontSize: 9, // You can adjust the font size for subscript as needed
        marginBottom: -8, // Adjust this value to fine-tune the vertical position of subscript
    },
    BusinessHeader: {
        color: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins600SemiBold,
        textTransform: 'capitalize',
    },
    BusinessSubHeader: {
        color: Colors.color_black,
        fontFamily: Fonts.poppins600SemiBold,
        textTransform: 'capitalize',
    },
    BusinessProgress: {
        color: Colors.color_soft_green,
        fontFamily: Fonts.poppins600SemiBold,
        textTransform: 'capitalize',
    },
    NumberIndicater: {
        color: Colors.color_white,
        fontSize: 25,
        fontFamily: Fonts.poppins700Bold,
    },
    countBG: {
        padding: 5,
        width: 50,
        height: 50,
        borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: "center",
        alignContent: "center",
    },
    sheetCardWithBg: {
        paddingHorizontal: 10,
        paddingBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    innersheetCardWithBg: {
        width: '31.2%',
        marginRight: 6
    },
    sheetCardQuickLInks: {
        backgroundColor: Colors.ui_light_bg,
        width: '100%',
        marginVertical: 10,
        padding: 5,
        marginBottom: 2,
        paddingVertical: 8,
        textAlign: 'center',
        borderRadius: 10,
        shadowColor: Colors.shadow_light,
        elevation: 2,
    },
    titleSheet: {
        color: Colors.color_white,
        fontFamily: Fonts.poppins600SemiBold,
        fontSize: 12,
        letterSpacing: 0.18,
        textAlign: 'center',
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        color: Colors.color_gray,
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    itemContainerStyle: {
        padding: 0,
        borderColor: Colors.color_semi_dark_gray,
        borderWidth: 1,
        margin: 0,
    },
    itemContainerInnerStyle: {
        maxHeight: 'auto',
    },
    progressImage: {
        height: 45,
        width: 45,
        resizeMode: 'contain',
    },
    containerTutorials: {
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 15,
    },

    backgroundContainerCoverThumaNail: {
        height: 84,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignContent: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
    videoTitle: {
        width: '48%',
        fontFamily: Fonts.OpenSans500Medium,
        marginLeft: 10,
        fontSize: 13
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 5,
        // paddingHorizontal: 15, 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '98%',
        borderWidth: 5,
        borderColor: 'white',
    },
    draggableBox: {
        width: 100,
        height: 100,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    draggableText: {
        color: 'white',
        fontWeight: 'bold',
    },


});

export default styles;