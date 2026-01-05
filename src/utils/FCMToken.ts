import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

export const getMesseges = () => {
    return 
}

export const getFCMToken = async () => {
    return messaging().getToken();
}

export const refreshFCMToken = () => {
    return messaging().onTokenRefresh((newToken) => {
        return newToken;
    });
}