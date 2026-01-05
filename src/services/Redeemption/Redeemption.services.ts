import { HTTP_GET, HTTP_POST } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function GetPointRedeemtion<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPointRedeemtion) as Promise<G>;
}

export function GetSchemeList<P, G>(): Promise<G> {
    return HTTP_GET<P, G>({}, ENDPOINTS.GetSchemeList) as Promise<G>;
}

export function InsertSchemePointRedeem<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.InsertSchemePointRedeem) as Promise<G>;
}

export function ValueTokenTransactionSmry<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ValueTokenTransactionSmry) as Promise<G>;
}

export function ValueTokenRedmRequest<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ValueTokenRedmRequest) as Promise<G>;
}

export function ValueTokenTransactionDtls<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ValueTokenTransactionDtls) as Promise<G>;
}