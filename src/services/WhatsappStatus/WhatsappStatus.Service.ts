import { HTTP_GET, HTTP_POST } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";


export function GetWhatsappShareQrScanSummary<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetWhatsappShareQrScanSummary) as Promise<G>;
}

export function GetWhatsAppStatusType<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetWhatsAppStatusType) as Promise<G>;
}

export function GetWhatsappShareQrScanDetails<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetWhatsappShareQrScanDetails) as Promise<G>;
}
