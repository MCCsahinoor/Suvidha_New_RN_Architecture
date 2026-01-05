
import { HTTP_GET, HTTP_POST } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function CheckReferralMobileNoExists<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.CheckReferralMobileNoExists) as Promise<G>;
}
export function CkcReferralList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.CkcReferralList) as Promise<G>;
}
export function CKCReferralEntry<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.CKCReferralEntry) as Promise<G>;
}
export function GetCkcReferralDashboardDetails<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetCkcReferralDashboardDetails) as Promise<G>;
}
export function GetCkcReferralDetails<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetCkcReferralDetails) as Promise<G>;
}
export function GetRewardAndTermsCondition<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetRewardAndTermsCondition) as Promise<G>;
}

