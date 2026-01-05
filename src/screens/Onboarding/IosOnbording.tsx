import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import styles from './styles';
import ButtonLarge from '../../components/ButtonLarge';
import { Colors, Fonts } from '../../themes';



const IOSOnboardingScreen = ({ navigation }: any) => {

    const navigateTologin = (): void => {
        navigation.replace("Login");
    };

    return (
        <React.Fragment>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                flex: 1
            }}>
                <View style={{ ...styles.container }}>
                    <View>
                        <Image
                            style={[styles.logo]}
                            source={require("../../assets/images/bergerLogo.png")}
                        />
                    </View>
                    <Text style={styles.appNameHeading} >
                        SUVIDHA
                    </Text>
                    <Text style={styles.heading}>
                        Your Vision, Our Expertise{" "}
                    </Text>
                </View>
            </View>
            <View style={{ paddingHorizontal: 50 }}>
                <View>
                    <ButtonLarge
                        title={"Get Started"}
                        onPress={navigateTologin}
                        fillBtn={true}
                        key={"GetStarted"}
                        showIcon={true}
                        iconName="angle-double-right"
                        paddingVertical={10}
                        paddingHorizontal={10}
                        fontSize={19}
                        iconSize={19}
                        isAPICall={false}
                        disabled={false}
                    />
                </View>
            </View>
        </React.Fragment>
    );
};

export default IOSOnboardingScreen;

const stylesIn = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    modalText: {
        marginTop: 5,
        color: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins600SemiBold,
        fontSize: 18,
    },
    modalOptionText: {
        color: '#000',
        fontSize: 16,
        fontFamily: Fonts.poppins400Regular,
    },
    fixedButton: {
        backgroundColor: Colors.color_white,
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    title: {
        color: Colors.color_black,
        fontSize: 12,
        fontFamily: Fonts.OpenSans500Medium,
        textAlign: 'justify'
    },
    permissionList: {
        width: '100%',
        marginTop: 5,
        maxHeight: '35%',
    },
});
