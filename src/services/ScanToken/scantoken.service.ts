import { HTTP_GET, HTTP_POST } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function ScanTokenRedemption<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ScanTokenRedemption) as Promise<G>;
}

export function GetTokenRedemptionList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetTokenRedemptionList) as Promise<G>;
}

export function GetRedemptionPainterStatus<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetRedemptionPainterStatus) as Promise<G>;
}