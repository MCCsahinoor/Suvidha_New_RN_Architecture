import { StyleSheet } from "react-native";
import { Fonts, Colors } from '../../../themes';

const styles = StyleSheet.create({
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
});

export default styles;