import { HTTP_GET, HTTP_POST, HTTP_POST_FILE_UPLOAD } from '../../helper/ApiCall';
import { ENDPOINTS } from '../../helper/EndPoints';

export function GetBusinessDetails<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetBusinessDetails) as Promise<G>;
}

export function AcceptancePainterAdvancePayment<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.AcceptancePainterAdvancePayment) as Promise<G>;
}