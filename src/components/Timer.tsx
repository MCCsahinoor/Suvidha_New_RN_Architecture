import { Text } from "react-native";
import { View } from "react-native";
import { Colors, Fonts } from "../themes";
import { memo, useEffect, useState } from "react";
import React from "react";

const Timer = ({ data, color }: any) => {
    const [countTime, setCountTime] = useState<string>('');
    // console.log('timer....', data);

    useEffect(() => {
        let interval: any = null;
        if (data) {
            interval = setInterval(() => {
                data = data + 1;
                // console.log('data interval', data);
                formatTime(data);
            }, 1000);

        } else {
            clearInterval(interval);
        };
        return () => clearInterval(interval);
    }, [])

    const formatTime = (time: any) => {
        const getSeconds = `0${(time % 60)}`.slice(-2);
        const minutes: any = `${Math.floor(time / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
        setCountTime(`${getHours} : ${getMinutes} : ${getSeconds}`);
    }

    return (
        <>
            <View>
                <Text style={{ fontSize: 11, textAlign: 'center', marginTop: 5, fontFamily: Fonts.poppins500Medium, color: color }}>{countTime}</Text>
            </View>
        </>

    );

};

export default memo(Timer);