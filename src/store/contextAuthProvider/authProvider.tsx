// /* eslint-disable prettier/prettier */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-shadow */
// import React, { useState, useEffect, createContext } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LOCAL_STORAGE_KEY } from '../../utils/localStorageKeys';

// // Define the shape of your context
// export interface UserAuthData {
//   isLogging: boolean;
// }

// export interface UserAuthContextType {
//   data: UserAuthData;
//   setAuthState: React.Dispatch<React.SetStateAction<UserAuthData>>;
// }
 
// // initialize
// const userAuthData: UserAuthData = {
//   isLogging: false,
// };
// const userAuth: UserAuthContextType = {
//   data: userAuthData,
//   setAuthState: () => { },
// };
// export const UserAuthContext = createContext<UserAuthContextType>(userAuth);

// // provider
// export default function UserAuthProvider({ children }: any) {
//   // use state
//   const [data, setAuthState] = useState<UserAuthData>(userAuthData);

//   // get storedata
//   const getStoreData = async () => {
//     try {
//       const token = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
//       updateStateData(token);
//     } catch (error) {
//       updateStateData(null);
//       console.log('[USER AUTH CONTEXT ERROR] getStoreData', error);
//     }
//   };
//   const updateStateData = (token: any) => {
//     try {
//       let data: UserAuthData = {
//         isLogging: token ? true : false,
//       };
//       setAuthState((prev: UserAuthData) => {
//         return { ...prev, data };
//       });
//     } catch (error) {
//       console.log('[USER AUTH CONTEXT ERROR] updateStateData', error);
//     }
//   };

//   // use effect
//   useEffect(() => {
//     getStoreData();
//   }, []);

//   // pass data
//   const contextValue: UserAuthContextType = {
//     data,
//     setAuthState,
//   };

//   return (
//     <UserAuthContext.Provider value={contextValue}>
//       {children}
//     </UserAuthContext.Provider>
//   );
// }
