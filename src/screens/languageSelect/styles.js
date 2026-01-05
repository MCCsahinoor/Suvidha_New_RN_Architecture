import { StyleSheet } from "react-native";
import { Colors, Fonts } from '../../themes';  

const styles = StyleSheet.create({
    container: { 
        backgroundColor: Colors.color_white
    }, 
    headerContainer: { 
        padding: 20, 
        paddingBottom: 50,
        paddingHorizontal: 15, 
        paddingTop: 43,
        justifyContent: 'center', 
    },
    header: {
        color: Colors.color_white,
        fontFamily: Fonts.OpenSans700Bold,
        fontSize: 18
    },
    languageList: {
        padding: 15,
        paddingTop: 0,
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 20,  
    }, 
    curve: {
        position: "absolute",
        bottom: 0,
        left: 0,
    }, 
});

export default styles;