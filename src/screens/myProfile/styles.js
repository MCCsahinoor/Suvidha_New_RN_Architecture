import { StyleSheet } from "react-native"; 
import { Colors, Fonts } from '../../themes';   

const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#fff',
        padding: 5
    }, 
    languageList: { 
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 20,
      },
      
      langCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: 5,
        padding: 10,
        paddingVertical: 20,
        borderRadius: 10,
        // borderWidth: 0.9,
        backgroundColor: 'white',
        // borderColor: Colors.color_light_gray,
        shadowColor: Colors.shadow_light,
        elevation: 10,
      },
      isCheck: {
        position: 'absolute',
        right: 0,
        top: -15,
        width: 24,
        height: 24,
      },
      title: {
        color: Colors.color_black,
        fontFamily: Fonts.poppins600SemiBold,
        fontSize: 18,
        letterSpacing: 0.18,
      },
      subTitle: {
        color: Colors.color_black,
        fontFamily: Fonts.OpenSans400Regular,
  }, 
  errorLang: {
    color: '#dc3545',
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'right', 
  },
});

export default styles;