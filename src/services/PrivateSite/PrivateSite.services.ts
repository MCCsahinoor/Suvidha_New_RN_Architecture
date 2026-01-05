import { HTTP_POST, HTTP_GET } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function NewPrivateSiteList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.NewPrivateSiteList) as Promise<G>;
}

export function PrivteSiteNonXpLeadSubmit<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PrivteSiteNonXpLeadSubmit) as Promise<G>;
}

export function BrandList<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.BrandList) as Promise<G>;
}

export function NonXpQuotSubmit<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.NonXpQuotSubmit) as Promise<G>;
}

export function NonXpQuotGetList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.NonXpQuotGetList) as Promise<G>;
}

export function NonXpQuotDetailsById<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.NonXpQuotDetailsById) as Promise<G>;
}

export function NonXPQuotApproval<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.NonXPQuotApproval) as Promise<G>;
}

export function NonXPQuotPDF<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.NonXPQuotPDF) as Promise<G>;
}

export function NonXPLeadStatusUpdate<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.NonXPLeadStatusUpdate) as Promise<G>;
}

export function ExpertContXPQuotPDF<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ExpertContXPQuotPDF) as Promise<G>;
}

export function NonGBSFQuotGetDtls<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.NonGBSFQuotGetDtls) as Promise<G>;
}

export function GetMoistureLevelType<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetMoistureLevelType) as Promise<G>;
}

export function LeadQuotationGetAreaList<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.LeadQuotationGetAreaList) as Promise<G>;
}
export function LeadQuotationAdditionalCategoryList<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.LeadQuotationAdditionalCategoryList) as Promise<G>;
}
export function LeadQuotationAdditionalItemList<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.LeadQuotationAdditionalItemList) as Promise<G>;
}
export function LeadQuotationAdditionalProductList<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.LeadQuotationAdditionalProductList) as Promise<G>;
}

