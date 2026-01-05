import { HTTP_GET, HTTP_POST } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function ExpertContXPQuotGetList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ExpertContXPQuotGetList) as Promise<G>;
}

export function LeadQuotationGetAreaByLOV<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.LeadQuotationGetAreaByLOV) as Promise<G>;
}

export function GetExpertContQuotLeadType<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetExpertContQuotLeadType) as Promise<G>;
}

export function LeadQuotationGetBrandList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.LeadQuotationGetBrandList) as Promise<G>;
}

export function ExpertContLeadQuotSubmit<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ExpertContLeadQuotSubmit) as Promise<G>;
}

export function ExpertContLeadQuotationGetDetails<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ExpertContLeadQuotationGetDetails) as Promise<G>;
}

export function NonXPQuotSubmitDetailsEXPERT<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.NonXPQuotSubmitDetailsEXPERT) as Promise<G>;
}

export function NonEXPERTQuotGetDtls<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.NonEXPERTQuotGetDtls) as Promise<G>;
}

export function NonXPQuotPDFXPA<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.NonXPQuotPDFXPA) as Promise<G>;
}

export function ExpertContXpQuotPdfNormalQuot<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ExpertContXpQuotPdfNormalQuot) as Promise<G>;
}

export function NonXPQuotPDF_GBSF<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.NonXPQuotPDF_GBSF) as Promise<G>;
}

export function LeadQuotationShare<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.LeadQuotationShare) as Promise<G>;
}

export function QuotationPaymentUpdateStatus<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.QuotationPaymentUpdateStatus) as Promise<G>;
}


