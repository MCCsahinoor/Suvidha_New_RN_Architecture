import React, { FC } from 'react';
import { View, Image, Text, StyleSheet, Pressable, SafeAreaView, Platform } from 'react-native';
import { Colors, Fonts } from '../../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';


const CheckStatusAction: FC<any> = ({ navigation }) => {
    const { t } = useTranslation();

    return (
        <Pressable style={{ width: '100%', marginBottom: 15 }} onPress={() => navigation.navigate('ToolsRequestActivity')}>
            <LinearGradient
                colors={['#3E797F00', '#3E797F']}
                useAngle={true}
                angle={90}
                style={{ width: '100%', overflow: 'hidden' }}
            >

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 20, gap: 5 }}>
                    <Text style={{ ...styles.activityStatus }}>{t("CheckActivityStatus")}</Text>
                    <Ionicons name="chevron-forward-circle-outline" size={22} color={Colors.color_white} style={{}} />
                    <LottieView source={require('../../../assets/lotty/star.json')} style={{ width: 40, height: 40, transform: 'scale(2)', }} autoPlay loop />

                </View>
            </LinearGradient>
        </Pressable>
    );
};

export default CheckStatusAction;

const styles = StyleSheet.create({
    activityStatus: {
        color: 'white',
        textAlign: 'right',
        fontFamily: Fonts.poppins600SemiBold,
        // marginTop: 5,
        // marginRight: 5
    }
});
