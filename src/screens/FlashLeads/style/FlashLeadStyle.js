import { StyleSheet } from "react-native";
import { Colors, Fonts } from '../../../themes';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15
    },
    bdrTop: {
        borderTopColor: '#E4E4E4',
        borderTopWidth: 1,
        borderStyle: 'solid'
    },
    cardContainer: {
        padding: 10,
    },
    cardContainerLabel: {
        // backgroundColor: Colors.ui_light_bg,
        // position: 'absolute',
        padding: 5,
        // right: 10,
        zIndex: 15,
        // borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
        // marginTop: -13 
    },
    cardContainerLabelGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    cardContainerLabelText: {
        color: Colors.color_low_light_text_color,
        fontSize: 14,
        fontFamily: Fonts.OpenSans700Bold,
        marginLeft: 5
    },
    dateandTime: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leadData: {
        color: Colors.color_gray,
        fontSize: 14,
        fontFamily: Fonts.OpenSans600SemiBold,
        marginLeft: 5,
    },
    clickToCall: {
        color: '#068863',
        fontSize: 14,
        fontFamily: Fonts.OpenSans600SemiBold,
        textAlign: 'center',
        marginLeft: 6,
    },
    clickToCallAction: {
        backgroundColor: 'rgba(7.22, 173.19, 126.19, 0.17)',
        padding: 8,
        paddingVertical: 5,
        width: 125,
        borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#068863',
        marginTop: 5,
    },
    StopVisit: {
        backgroundColor: '#FC070710',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: Colors.color_dark_red,
        marginTop: 5,
    },
    StopVisitText: {
        color: Colors.color_dark_red,
        fontSize: 14,
        fontFamily: Fonts.OpenSans600SemiBold,
        textAlign: 'center',
        marginLeft: 6,
    },
    openMenu: {
        width: 45,
        height: 40,
        backgroundColor: '#EFEAEA',
        borderTopLeftRadius: 100,
        borderTopRightRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 5,
        bottom: 5,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 8,
    },
    buttonContainer: {
        height: '100%',
        position: 'absolute',
        width: '100%',
        zIndex: 99,
        bottom: 0
    },
    buttonGroup: {
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 10,
    },
    buttonFlote: {
        backgroundColor: '#86A5A8',
        padding: 8,
        margin: 2,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 7,
        marginRight: 4,
        shadowColor: Colors.color_dark_gray,
        elevation: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.color_white,
        textTransform: 'capitalize',
        marginLeft: 5,
        fontSize: 11,
        fontFamily: Fonts.OpenSans600SemiBold,
    },
    closeButtonGroup: {
        position: 'absolute',
        right: 8,
        bottom: 8,
        color: '#374957',
    },
    inputStyles: {
        borderRadius: 100,
        paddingHorizontal: 10,
        height: 40,
        marginTop: 2,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#BBBBBB',
    },
    searchIcon: {
        position: 'absolute',
        zIndex: 1,
        top: 10,
        left: 11,
        color: '#686868',
    },
    filterStyles: {
        width: '30%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    countData: {
        color: Colors.ui_dark_bg,
        fontSize: 14,
        fontFamily: Fonts.OpenSans600SemiBold,
        marginBottom: 10
    },
    iconLabel: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
    },
    leadHeader: {
        color: Colors.ui_dark_bg,
        fontFamily: Fonts.OpenSans600SemiBold,
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: -25

    },
    UserInfo: {
        color: '#222222',
        fontSize: 12,
        fontFamily: Fonts.poppins500Medium,
        marginLeft: 8,
    },
    userCall: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    supportText: {
        position: 'absolute',
        top: -12,
        right: 5,
        zIndex: 1111111
    },

    // filter related styles
    filterStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterlabel: {
        color: 'black',
        fontSize: 15,
        fontFamily: Fonts.OpenSans400Regular,
    },
    filterHeader: {
        color: Colors.ui_dark_bg,
        fontSize: 18,
        fontFamily: Fonts.poppins500Medium,
    },
    labelInputLeads: {
        color: Colors.color_gray,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        flexDirection: 'row',
    },
    modalView: {
        // margin: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 5,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    fixedButton: {
        backgroundColor: Colors.color_white,
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    paraText: {
        color: Colors.color_black,
        fontSize: 12,
        fontFamily: Fonts.OpenSans400Regular,
    },
    sameInline: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    fieldtextLabel: {
        marginTop: -10
    },
    container: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    checkboxContainer: {
        // flexDirection: 'row',
        // marginBottom: 20,
    },
    checkbox: {
        alignSelf: 'center',
    },
    label: {
        margin: 8,
    },
    activityItem: {
        display: 'flex',
        flexDirection: 'row',
        // backgroundColor: 'red',
        justifyContent: 'space-between',
        borderColor: '#00000020',
        borderWidth: 1,
        borderRadius: 7
    },

    absoluteBlurView: {
        backgroundColor: 'rgba(134, 165, 168, 0.61)'
    },
    timerClockText: {
        color: 'gray',
        fontFamily: Fonts.OpenSans700Bold,
        fontSize: 35,
        textAlign: 'center'
    },
    timerHeaderText: {
        color: 'black',
        fontFamily: Fonts.poppins500Medium,
        fontSize: 20,
        textAlign: 'center'
    },
    modalViewVisit: {
        margin: 20,
        borderRadius: 8,
        padding: 25,
        paddingBottom: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#068863',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },


})

export default styles;