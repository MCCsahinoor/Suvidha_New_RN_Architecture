import { StyleSheet } from "react-native";
import { Colors, Fonts } from '../../themes';  

const styles = StyleSheet.create({
    container: { 
        backgroundColor: Colors.color_white,
        paddingHorizontal: 15
    },
    textAlert: {
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: Fonts.OpenSans600SemiBold,
    },
    headerContainer: { 
        padding: 20,  
        paddingHorizontal: 15, 
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
    connectBerger: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    connectBergerLabel: {
        color: Colors.color_black,
    },
    error: {
      color: '#dc3545',
      fontSize: 10,
      fontStyle: 'italic',
      textAlign: 'right',
    //   position: 'absolute',
    //   right: 0,
    //   bottom: -13,
    }
});

export default styles;