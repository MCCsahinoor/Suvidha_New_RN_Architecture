/* eslint-disable prettier/prettier */

import {HTTP_GET} from '../../helper/ApiCall';
import { ENDPOINTS } from '../../helper/EndPoints'; 

export function GetUserApplicableMenu<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetUserApplicableMenu) as Promise<G>;
}


export function QuickLinksMenu<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.QuickLinksMenu) as Promise<G>;
}