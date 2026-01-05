import { StyleSheet } from "react-native";
import { Colors, Fonts } from '../../themes';  

const styles = StyleSheet.create({
    container: { 
        // flex: 1,
        justifyContent: 'center',  // Center vertically
        alignItems: 'center', 
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    logo: {
        width: 200,
        height: 110,
        resizeMode: 'contain'
    },
    appNameHeading: {
        color: Colors.semi_dark_text_color,
        fontSize: 40,
        fontFamily: Fonts.PollerOneRegular,  
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 20
    },
    heading: {
        color: Colors.dark_text_color,
        fontSize: 18,
        fontFamily: Fonts.poppins600SemiBold, 
        lineHeight: 28, 
        textAlign: 'center',
        marginBottom: 10,
        paddingHorizontal: 10
    },
    subHeading: {
        color: Colors.color_light_text_color,
        fontSize: 14,
        fontFamily: Fonts.OpenSans400Regular, 
        lineHeight: 21.42, 
        textAlign: 'center', 
        paddingHorizontal: 30,
        marginBottom: 35
    }, 
    closeAccess: {
        color: Colors.semi_dark_text_color,
        fontSize: 28,
        fontFamily: Fonts.PollerOneRegular,
        textAlign: 'right',
        position: 'absolute',
        right: 0,
        top: -5,
        backgroundColor: 'white',
        borderRadius: 100,
        right: -5
    },
});

export default styles;