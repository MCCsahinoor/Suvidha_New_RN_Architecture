import { HTTP_GET, HTTP_POST } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function GetCocoStoreSchemeList<P, G>(data: any, p0: {}): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetCocoStoreSchemeList) as Promise<G>;
}

export function InsertUpdateReferral<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.InsertUpdateReferral) as Promise<G>;
}

export function GetReferralList<P, G>(data: any, p0: {}): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetReferralList) as Promise<G>;
}

export function GetReferralDetails<P, G>(data: any, p0: {}): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetReferralDetails) as Promise<G>;
}

export function GetReferralPaymentDetails<P, G>(data: any, p0: {}): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetReferralPaymentDetails) as Promise<G>;
}

export function InstaRewardsPainterSchemeList<P, G>(data: any, p0: {}): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.InstaRewardsPainterSchemeList) as Promise<G>;
}

export function InstaGetReferralList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.InstaGetReferralList) as Promise<G>;
}

export function InsertRewardUpdateReferral<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.InsertRewardUpdateReferral) as Promise<G>;
}

export function InsertGetReferralDetails<P, G>(data: any, p0: {}): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.InsertGetReferralDetails) as Promise<G>;
}