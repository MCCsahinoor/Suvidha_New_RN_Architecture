import { StyleSheet } from "react-native";
import { Colors, Fonts } from '../../themes';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 5
    },
    imageexpertContractor: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerBYP: {
        backgroundColor: '#fff',
        padding: 10, 
        paddingHorizontal: 20,
        borderColor: Colors.color_light_gray,
        borderBottomWidth: 1,
    },
    styleIfReviewed: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    styleIfNotReviewed: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    CvcontainerBYP: {
        backgroundColor: '#fff',
        padding: 10,
        paddingHorizontal: 20,
    },
    headercontainerBYP: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        paddingBottom: 0,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    pageTitle: {
        color: Colors.color_white,
        fontSize: 17,
        fontFamily: Fonts.OpenSans600SemiBold,
        textTransform: 'capitalize',
    },
    imageexpertContractor: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileName: {
        color: Colors.color_black,
        fontSize: 22,
        fontFamily: Fonts.OpenSans500Medium,
    },
    rating: {
        color: Colors.color_black,
        fontSize: 32,
        fontFamily: Fonts.OpenSans700Bold,
    },
    ratingGrouping: {
        display: 'flex',
        flexDirection: 'row',
    },
    painterHeader: {
        color: '#211D1E',
        fontSize: 15,
        fontFamily: Fonts.OpenSans700Bold
    },
    contcatInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.color_light_gray,
        padding: 4,
        paddingHorizontal: 8,
        borderRadius: 100,
        alignSelf: 'center',
        marginBottom: 9,
        marginRight: 5,
    },
    contcatGrouping: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignContent: 'center',
        flexWrap: 'wrap',
        marginTop: 5
    },
    cvDataGroup: {
        marginTop: 15
    },
    fixedButton: {
        backgroundColor: Colors.color_white,
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    centerContent: {
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        alignContent: 'center',
        width: '100%'
    },
    openContactPicker: {
        paddingTop: 7,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'relative'
    },
    openContactPickerContent: {
        fontFamily: Fonts.OpenSans500Medium,
        textAlign: 'right',
        color: Colors.color_dark_gray,
        marginLeft: 5,
        alignItems: 'center'
    },
    addContactPicker: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'relative',
        backgroundColor: Colors.ui_light_bg,
        paddingHorizontal: 8,
        paddingVertical: 13,
        marginTop: 4,
        borderRadius: 8
    }
});

export default styles;