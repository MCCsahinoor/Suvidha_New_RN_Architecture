/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {HTTP_GET, HTTP_POST} from '../../helper/ApiCall';
import { ENDPOINTS } from '../../helper/EndPoints';
import { API_RESPONSE } from '../../utils/CommonApiResponse.interface'; 

export function GetLanguageList<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetLanguageList) as Promise<G>;
}

export function UpdateUserApplicableLanguag<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.UpdateUserApplicableLanguag) as Promise<G>;
}

export function AppApplicableLanguag<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.AppApplicableLanguag) as Promise<G>;
}