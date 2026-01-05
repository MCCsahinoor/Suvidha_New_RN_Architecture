/* eslint-disable prettier/prettier */

import { HTTP_GET, HTTP_POST, HTTP_POST_FILE_UPLOAD } from '../../helper/ApiCall';
import { ENDPOINTS } from '../../helper/EndPoints';

export function GetDoc<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetDoc) as Promise<G>;
}
