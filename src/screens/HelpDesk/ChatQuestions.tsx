import { View, Text, ScrollView, FlatList, SafeAreaView } from "react-native";
import HeaderCurve from "../../components/HeaderCurve";
import { Fonts, Colors } from "../../themes";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Pressable } from "react-native";
import React from "react";

const ChatQuestions = ({ navigation }: any) => {

    const DATA = [
        {
            id: '1',
            question: 'I did not received my OTP on SMS',
        },
        {
            id: '2',
            question: 'My visit is not working',
        },
        {
            id: '3',
            question: 'How I delete my account',
        },
    ];

    type ItemProps = { question: string };

    const Item = ({ question }: ItemProps) => (

        <Pressable onPress={() => goToChatBot()} style={{ ...styles.brdrBtm, paddingVertical: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, }}>
            <Text style={{ fontSize: 12, color: Colors.color_gray, fontFamily: Fonts.poppins500Medium, }}>{question}</Text>
            <View style={{}}>
                <Ionicons
                    name="chevron-forward-outline"
                    size={18}
                    style={{ color: Colors.color_gray }}
                />
            </View>
        </Pressable>
    );

    const goToChatBot = () => {
        navigation.navigate('chatBot');
    }
    return (
        <>
            <HeaderCurve
                topGaap={119}
                headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'}
                pageBackground={'#fff'}
            />
            <View style={{ ...styles.container, backgroundColor: '#fff' }}>
                <Text style={{ ...styles.headerText, color: Colors.ui_dark_bg, fontFamily: Fonts.OpenSans600SemiBold, }}>select your queries</Text>
            </View>
            <View style={{ backgroundColor: '#fff', height: '100%' }}>
                <View style={{ ...styles.container, marginVertical: 10 }}>


                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => <Item question={item.question} />}
                        keyExtractor={item => item.id}
                    />

                </View>
            </View>
        </>
    )
}

export default ChatQuestions;