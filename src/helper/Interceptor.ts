/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable dot-notation */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_STORAGE_KEY } from '../utils/localStorageKeys';
import * as redirectLogin from '../utils/redirectLogin';
import { BASE_URL, ESAMBANDH_AUTH_TOKEN, ESAMBANDH_BASE_URL, ESAMBANDH_BASE_URL_UTILITY_ORDER } from './EndPoints';
import { CommonToastModel } from '../utils/ToastMessageModel';
import { RefreshToken, RefreshTokenVirtual } from '../services/Auth/auth.services';
import { LOCAL_STORAGE_SET } from './LocalStorageHelper';
import { UserGroupArr } from '../utils/hierarchyLoginCheck';
import { useSelector } from 'react-redux';

// const executiveLoginCheck = useSelector((state: any) => state.executiveLoginCheck);

const headerConfig = {
  'Content-Type': 'application/json',
  'form-data': 'multipart/form-data',
  Accept: 'application/json',
  AcceptFormData: '*/*',
};

const AXIOS_HTTP = axios.create({
  baseURL: `${BASE_URL}`,
});

// api request interceptor
AXIOS_HTTP.interceptors.request.use(
  async request => {
    const userToken = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
    const token = userToken?.slice(1, -1);
    const appLanguage = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_SELECT);
    const appLanguageSlice = appLanguage?.slice(1, -1);
    if (request.url?.includes('UploadDocument')) {
      request.headers.set('Content-Type', headerConfig['form-data']);
      request.headers.set('ApplicableLangCode', appLanguageSlice);
      if (token) {
        request.headers.set('Authorization', `Bearer ${token}`);
      }
    } else {
      request.headers.set('Content-Type', headerConfig['Content-Type']);
      request.headers.set('Accept', headerConfig['Accept']);
      request.headers.set('ApplicableLangCode', appLanguageSlice);
      if (token) {
        request.headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

// api response interceptor
// AXIOS_HTTP.interceptors.response.use(
//   response => {
//     return response.data;
//   },
//   error => {
//     if (error.code == 'ERR_NETWORK') {
//       CommonToastModel('error', 'Network connection failed.Please check your internet connection and try again.', 5000);
//     }
//     return Promise.reject(error);
//   },
// );

AXIOS_HTTP.interceptors.response.use(
  response => {
    return response.data;
  }, async error => {
    if (error.code == 'ERR_NETWORK') {
      CommonToastModel('error', 'Network connection failed.Please check your internet connection and try again.', 5000);
    }
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      let _localrefreshToken: any = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
      let _refreshToken = _localrefreshToken?.slice(1, -1);
      let _executiveLogin = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.EXECUTIVE_LOGIN);
      let executiveLoginCheck = _executiveLogin?.slice(1, -1);
      if (_refreshToken) {
        if (executiveLoginCheck && executiveLoginCheck === 'executive') {
          let _vertualUserId: any = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.PAINTER_ID);
          let _vertualId = _vertualUserId?.slice(1, -1);
          let postObjVertualUser: { RefreshToken: string, UserId: string } = { RefreshToken: _refreshToken, UserId: _vertualId };
          RefreshTokenVirtual<any, any>(postObjVertualUser).then(response => {
            if (response && response.AccessToken && response.RefreshToken) {
              LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.TOKEN, response.AccessToken);
              LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.REFRESH_TOKEN, response.RefreshToken);
              AXIOS_HTTP.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;
              return AXIOS_HTTP(originalRequest);
            }
          }).catch(err => {
            redirectLogin.navigate('Login');
          });
        } else if (executiveLoginCheck === 'painter') {
          let postObj: { RefreshToken: string } = { RefreshToken: _refreshToken };
          RefreshToken<any, any>(postObj).then(response => {
            if (response && response.AccessToken && response.RefreshToken) {
              LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.TOKEN, response.AccessToken);
              LOCAL_STORAGE_SET(LOCAL_STORAGE_KEY.REFRESH_TOKEN, response.RefreshToken);
              AXIOS_HTTP.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;
              return AXIOS_HTTP(originalRequest);
            }
          }).catch(err => {
            redirectLogin.navigate('Login');
          });
        }
        else {
          redirectLogin.navigate('SplashScreen');
        }
      }
    } else if (error.response.status !== 401) {
      CommonToastModel('error', error.response.data.errorMessage ? error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
    }
    return Promise.reject(new Error(error));
  });



// ************************************************************************************************
// ESAMBANDH
// ************************************************************************************************

const AXIOS_HTTP_ESAMBANDH = axios.create({
  baseURL: `${ESAMBANDH_BASE_URL}`,
});

AXIOS_HTTP_ESAMBANDH.interceptors.request.use(
  async request => {
    request.headers.set('accept', headerConfig['Content-Type']);
    request.headers.set('AuthKey', ESAMBANDH_AUTH_TOKEN);
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

// api response interceptor
AXIOS_HTTP_ESAMBANDH.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.code == 'ERR_NETWORK') {
      CommonToastModel('error', 'Network connection failed.Please check your internet connection and try again.', 5000);
    }
    return Promise.reject(error);
  },
);

const AXIOS_HTTP_ESAMBANDH_UTILITY_ORDER = axios.create({
  baseURL: `${ESAMBANDH_BASE_URL_UTILITY_ORDER}`,
});

AXIOS_HTTP_ESAMBANDH_UTILITY_ORDER.interceptors.request.use(
  async request => {
    request.headers.set('accept', headerConfig['Content-Type']);
    request.headers.set('AuthKey', ESAMBANDH_AUTH_TOKEN);
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

// api response interceptor
AXIOS_HTTP_ESAMBANDH_UTILITY_ORDER.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.code == 'ERR_NETWORK') {
      CommonToastModel('error', 'Network connection failed.Please check your internet connection and try again.', 5000);
    }
    if (error.response.status === 401) {
      console.log('Unauthorized: Invalid or missing token.');
      return Promise.reject(new Error("Unauthorized: Invalid or missing token."));
    }
    return Promise.reject(error);
  },
);

export { AXIOS_HTTP, AXIOS_HTTP_ESAMBANDH, AXIOS_HTTP_ESAMBANDH_UTILITY_ORDER };


