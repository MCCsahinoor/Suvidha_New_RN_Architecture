import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';


import { StackActions, StackActionType } from '@react-navigation/native';
import { LOCAL_STORAGE_REMOVE, LOCAL_STORAGE_SET } from '../helper/LocalStorageHelper';
import { setvirtualUserData } from '../store/features/userProfile/virtualUserData';
import { store } from '../store/app/store';
import { LOCAL_STORAGE_KEY } from './localStorageKeys';

let navigator: { dispatch: (arg0: StackActionType) => void; };

export function setTopLevelNavigator(navigatorRef: any) {
  navigator = navigatorRef;
}

export function navigate(name: any) {
  LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.UNATHORIZEFLAG, 1)
  LOCAL_STORAGE_REMOVE();
  store.dispatch(setvirtualUserData(null));
  navigator.dispatch(
    StackActions.replace(name)
  );
}
