import { StyleSheet } from "react-native";
import { Colors, Fonts } from '../../../themes';

const styles = StyleSheet.create({

    bookletContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    filterbookletText: {
        fontFamily: Fonts.poppins500Medium,
        lineHeight: 17,
        textAlign: 'left',
        marginLeft: 10
    },
    headerText: {
        color: Colors.ui_dark_bg,
        fontSize: 18,
        fontFamily: Fonts.poppins500Medium,
        textTransform: 'capitalize',
    },
    childLength: {
        fontFamily: Fonts.OpenSans600SemiBold,
        textAlign: 'center',
        fontSize: 9,
        width: '100%',
        backgroundColor: Colors.ui_dark_bg,
        width: 'auto',
        position: 'absolute',
        zIndex: 9,
        right: 30,
        bottom: 15,
        paddingHorizontal: 10,
        color: 'white',
        paddingVertical: 3,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 2,
        paddingTop: 5
    },
    filterListStyle: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        borderBottomColor: Colors.color_light_gray,
        borderBottomWidth: 1,
        position: 'relative'
    },
    container: {
        paddingHorizontal: 0,
    },
    sheenText: {
        fontSize: 13,
        fontFamily: Fonts.poppins500Medium,
    },
    checkMark: {
        position: 'absolute',
        top: -7,
        right: 2,
        backgroundColor: '#ffffff',
        zIndex: 1,
        borderRadius: 30,
    },
    filterParaTitle: {
        fontSize: 14,
        fontFamily: Fonts.OpenSans600SemiBold,
        marginBottom: 5,
        paddingHorizontal: 5
    },
    sheenBox: {
        borderRadius: 30,
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
        paddingHorizontal: 20,
        paddingVertical: 6
    },
    filterParaTitle: {
        fontSize: 14,
        fontFamily: Fonts.OpenSans600SemiBold,
        marginBottom: 5,
        paddingHorizontal: 5
    },

    activityItem: {
        display: 'flex',
        flexDirection: 'row',
        // backgroundColor: 'red',
        justifyContent: 'space-between',
        borderColor: '#00000020',
        borderWidth: 1,
        borderRadius: 7,
        alignItems: 'center',
        alignContent: 'center'
    },
    checkboxContainer: {
        // flexDirection: 'row',
        // marginBottom: 20,
        width: '15%',
    },
    checkbox: {
        alignSelf: 'center',
    },
    label: {
        margin: 8,
        fontFamily: Fonts.poppins400Regular,
        fontSize: 11.5
    },
    checkMark: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#ffffff',
        zIndex: 999,
        borderRadius: 30,
    },
});

export default styles;