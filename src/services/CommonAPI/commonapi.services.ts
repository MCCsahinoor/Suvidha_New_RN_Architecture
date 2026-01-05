import { HTTP_GET, HTTP_POST, HTTP_POST_FILE_UPLOAD } from '../../helper/ApiCall';
import { ENDPOINTS } from '../../helper/EndPoints';

export function UploadDocument<P, G>(data?: any, onUploadProgress?: any): Promise<G> {
    return HTTP_POST_FILE_UPLOAD<P, G>(data, ENDPOINTS.UploadDocument, onUploadProgress) as Promise<G>;
}

export function GetMessage<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetMessage) as Promise<G>;
}
