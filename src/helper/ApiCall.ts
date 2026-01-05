/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { CREATE_FORMDATA, API_ENDPOINT, SIGNALR_ENDPOINT, ESAMBANDH_API_ENDPOINT, ESAMBANDH_API_ENDPOINT_UTILITY_ORDER } from './DB';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_STORAGE_KEY } from '../utils/localStorageKeys';
import { AXIOS_HTTP, AXIOS_HTTP_ESAMBANDH, AXIOS_HTTP_ESAMBANDH_UTILITY_ORDER } from './Interceptor';


// endPoint: string, body: any, queryParams: any, headerData: any | null = null
export async function HTTP_POST<P, G>(formdata: any, endPoint: any): Promise<G> {
  // const UnAuthorizeFlag: any = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.UNATHORIZEFLAG)
  // if (UnAuthorizeFlag == 0) {
    const url = API_ENDPOINT(endPoint);
    // const formData = formdata ? CREATE_FORMDATA(formdata) : null
    return AXIOS_HTTP.post(url, JSON.stringify(formdata), {
      headers: {},
    });
  // } else {
  //   return Promise.reject({
  //     error: "",
  //     errorCode: "Unauthorized: Invalid or missing token.",
  //   });
  //   // return Promise.resolve({} as G)
  // }
}

export async function HTTP_POST_SIGNALR<P, G>(formdata: any, endPoint: any): Promise<G> {
  // const UnAuthorizeFlag: any = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.UNATHORIZEFLAG)
  // if (UnAuthorizeFlag == 0) {
    const url = SIGNALR_ENDPOINT(endPoint);
    // const formData = formdata ? CREATE_FORMDATA(formdata) : null
    return AXIOS_HTTP.post(url, JSON.stringify(formdata), {
      headers: {},
    });
  // } else {
  //   return Promise.reject({
  //     error: "",
  //     errorCode: "Unauthorized: Invalid or missing token.",
  //   });
  //   // return Promise.resolve({} as G)
  // }
}

export async function HTTP_GET<P, G>(formdata: any, endPoint: any): Promise<G> {
  // const UnAuthorizeFlag: any = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.UNATHORIZEFLAG)
  // if (UnAuthorizeFlag == 0) {
    const url = API_ENDPOINT(endPoint);
    // const formData = formdata ? CREATE_FORMDATA(formdata) : null
    return AXIOS_HTTP.get(url, {
      headers: {},
    });
  // } else {
  //   return Promise.reject({
  //     error: "",
  //     errorCode: "Unauthorized: Invalid or missing token.",
  //   });
  //   // return Promise.resolve({} as G)
  // }
}

export async function HTTP_POST_FILE_UPLOAD<P, G>(
  formdata: any,
  endPoint: any,
  onUploadProgress: any,
): Promise<G> {
  // const UnAuthorizeFlag: any = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.UNATHORIZEFLAG)
  // if (UnAuthorizeFlag == 0) {
    const url = API_ENDPOINT(endPoint);
    return AXIOS_HTTP.post(url, formdata, {
      headers: {},
      onUploadProgress,
    });
  // } else {
  //   // return Promise.reject({
  //   //   error: "",
  //   //   errorCode: "Unauthorized: Invalid or missing token.",
  //   // });
  //   return Promise.resolve({} as G)
  // }
}




// ************************************************************************************************
// ESAMBANDH
// ************************************************************************************************

export async function ESAMBANDH_HTTP_GET<P, G>(params: any, endPoint: any): Promise<G> {
  const url = ESAMBANDH_API_ENDPOINT(endPoint);
  return AXIOS_HTTP_ESAMBANDH.get(url, {
    params,
  });
}

export async function ESAMBANDH_HTTPS<P, G>(params: any, endPoint: string): Promise<G> {
  const url = ESAMBANDH_API_ENDPOINT_UTILITY_ORDER(endPoint);
  return AXIOS_HTTP_ESAMBANDH_UTILITY_ORDER.get(url, {
    params,
  });
}