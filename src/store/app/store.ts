// /* eslint-disable prettier/prettier */

import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'idProofLovKYCData',
    'idProofLovCKCData',
    'preferredLanguageData',
    'virtualUser',
    'bannerData',
    'quickLinksMenu',
    'menuData',
    'AllsuvidhaTutorials',
    'BenefitNoticeHandler',
    'executiveLoginCheck',
    'appLanguageChange',
    'appApplicableLanguage',
    'loginUserDepotData',
    'buildYourProfileData',
    'buildProfileExpertise',
    'uploadProfileImage',

  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,  // Disable the immutable state invariant check
      serializableCheck: false, // Optionally, disable serializable state invariant check
    }),
});
// export type AppDispatch = typeof store.dispatch;
// const persistor = persistStore(store);
// export { store, persistor };
export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);
export { store, persistor };
