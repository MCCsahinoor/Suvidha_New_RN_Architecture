import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { LOCAL_STORAGE_KEY } from '../utils/localStorageKeys';

// export const LOCAL_STORAGE_GET_HELPER = async <T>(key: string) => { 
//     const jsonValue = await AsyncStorage.getItem(key)
//     const dataLoca = jsonValue != null ? JSON.parse(jsonValue) : null
//     return dataLoca;
//     // return checkPropertyType(key).then((checkType: boolean) => {
//     //     return AsyncStorage.getItem(key).then((res: any) => {
//     //         return res ? checkType ? JSON.parse(res as string) : res : null;
//     //     });
//     // })
// }

export const LOCAL_STORAGE_SET = async <T>(key: string, data: T): Promise<void> => {
    // if (typeof data === 'object') {
    //     updateInCheckTypeArrAndStore<T>(key, data);
    // } else {
        AsyncStorage.setItem(key as string, JSON.stringify(data) as string)
    // }
}

export const LOCAL_STORAGE_REMOVE = async <T>(): Promise<void> => {
    AsyncStorage.multiRemove(['AccessToken', 'UserGroupCode', 'IsRepresentative', 'RefreshToken', 'PainterId', 'executiveLoginCheck', 'initialTimestamp']);
}

// function checkPropertyType(key: string): Promise<boolean> {
//     return LOCAL_STORAGE_GET<string>(LOCAL_STORAGE_KEY.TYPE_CHECK_ARR)
//         .then((res: string) => {
//             let arr: string[] = JSON.parse(res);
//             console.log(arr, arr.includes(key), key);
            
//             return arr && arr.includes(key) ? true : false;
//         }).catch((err: any) => {
//             return false;
//         })
// }

// function updateInCheckTypeArrAndStore<T>(key: string, data: T): Promise<void> {
//     return AsyncStorage.getItem(LOCAL_STORAGE_KEY.TYPE_CHECK_ARR).then((res: any) => {
//         let arr: string[] = !res || res == 'null'?[]: JSON.parse(res);
//         if (arr && !arr.find(arrData => arrData == key)) arr.push(key);
//         // console.log("uuuuuuuuuuuu arr",arr, typeof res)
//         return Promise.all([
//             AsyncStorage.setItem(LOCAL_STORAGE_KEY.TYPE_CHECK_ARR, JSON.stringify(arr) as string),
//             AsyncStorage.setItem(key as string, JSON.stringify(data) as string)
//         ]).then((res: any) => {})
//         .catch((err: any) => {})
//     });
// }
