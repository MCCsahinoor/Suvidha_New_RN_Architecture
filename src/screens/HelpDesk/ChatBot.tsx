import { View, Text, ScrollView, SafeAreaView, FlatList } from "react-native";
import HeaderCurve from "../../components/HeaderCurve";
import { Fonts, Colors } from "../../themes";
import styles from "./styles";
import { useState } from "react";
import React from "react";

const ChatBot = () => {

    const questionArr = [
        {
            id: 1,
            questionTitle: 'Here are some options:',
            time: ' 11:00 AM',
            options: [
                { question: 'Technical Issue with SMS Service' },
                { question: 'Check Mobile Network' },
                { question: 'Check Mobile Network' }
            ]
        }
    ]


    const [answers, setAnswers] = useState<any[]>(questionArr);

    // question area
    const questionBox = answers.map((item, index) => (

        <View key={index} style={{ backgroundColor: '#CFE3E5', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, borderBottomRightRadius: 10, width: '70%', }}>
            <Text style={{ ...styles.textColor, fontFamily: Fonts.poppins500Medium }}>{item.questionTitle}</Text>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 5, marginVertical: 10 }}>

                {item && item.options && item.options.map((itemNumber: any, index: number) =>
                    <View key={index} style={{ backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, }}>
                        <Text style={{
                            color: '#4B4A4A',
                            fontSize: 10,
                            fontFamily: Fonts.poppins400Regular
                        }}>{itemNumber.question}</Text>
                    </View>
                )}

            </View>
            <Text style={{ textAlign: 'right', ...styles.textColor, fontFamily: Fonts.poppins400Regular }}>{item.time}</Text>
        </View>


    ))

    return (
        <>
            <HeaderCurve
                topGaap={119}
                headerBackground={'#36686D'} headerBackgroundTwo={'#84A2A5'}
                pageBackground={'#fff'}
            />
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ ...styles.container, marginVertical: 10, }}>

                    {/* user prompt */}
                    <View style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', flexDirection: 'row', marginBottom: 15 }}>
                        <View style={{ backgroundColor: '#D9D9D955', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, borderBottomRightRadius: 10, width: '70%', }}>
                            <Text style={{ ...styles.textColor, fontFamily: Fonts.poppins500Medium }}>I did not received my OTP on SMS</Text>
                            <Text style={{ ...styles.textColor, textAlign: 'right', fontFamily: Fonts.poppins400Regular }}>11:00 AM</Text>
                        </View>
                    </View>

                    {/* question box */}
                    <View style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', flexDirection: 'row', marginBottom: 15 }}>
                        {questionBox}
                    </View>

                </View>
            </ScrollView>
        </>
    )
}

export default ChatBot;