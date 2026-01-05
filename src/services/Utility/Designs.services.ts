import { HTTP_GET, HTTP_POST, HTTP_POST_FILE_UPLOAD } from '../../helper/ApiCall';
import { ENDPOINTS } from '../../helper/EndPoints'; 

export function Designs<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.Designs) as Promise<G>;
}
