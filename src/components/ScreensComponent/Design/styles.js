import { StyleSheet } from "react-native";
import { Fonts } from '../../../themes';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10
    },
    threeGrid: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    imageBox: {
        width: '30%',
        height: 100,
        borderRadius: 10,
    },
    boxImgStyle: {
        height: '100%',
        position: 'relative',
    },
    textStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        color: 'white',
        fontFamily: Fonts.poppins500Medium,
        textAlign: 'center',
        width: '100%',
        fontSize: 12,
        backgroundColor: '#00000060',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    }
});

export default styles;