import { HTTP_GET, HTTP_POST } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function GetXpLeadFilterType<P, G>(): Promise<G> {
    return HTTP_GET<P, G>({}, ENDPOINTS.GetXpLeadFilterType) as Promise<G>;
}

export function GetXpLeadCategory<P, G>(): Promise<G> {
    return HTTP_GET<P, G>({}, ENDPOINTS.GetXpLeadCategory) as Promise<G>;
}

export function GetXpLeadType<P, G>(): Promise<G> {
    return HTTP_GET<P, G>({}, ENDPOINTS.GetXpLeadType) as Promise<G>;
}

export function GetLeadList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetLeadList) as Promise<G>;
}

export function MakeCall<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.MakeCall) as Promise<G>;
}

export function InsertAppoinment<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.InsertAppoinment) as Promise<G>;
}

export function GetLeadCallHistory<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetLeadCallHistory) as Promise<G>;
}

export function GetLeadPaymentList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetLeadPaymentList) as Promise<G>;
}

export function NonXPQuotGetListXPA<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.NonXPQuotGetListXPA) as Promise<G>;
}

export function GetExpertLeadRunningVisit<P, G>(): Promise<G> {
    return HTTP_GET<P, G>({}, ENDPOINTS.GetExpertLeadRunningVisit) as Promise<G>;
}

export function LeadAppointmentFixedCheck<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.LeadAppointmentFixedCheck) as Promise<G>;
}

export function GetVisitBlockStatus<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetVisitBlockStatus) as Promise<G>;
}

export function ExpertInsertVisitOTP<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ExpertInsertVisitOTP) as Promise<G>;
}

export function ValidateVisitOTPExpertLead<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ValidateVisitOTPExpertLead) as Promise<G>;
}

export function ExpertLeadPositionReg<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ExpertLeadPositionReg) as Promise<G>;
}

export function LeadAppointmentFixedCheckGBSF<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.LeadAppointmentFixedCheckGBSF) as Promise<G>;
}

export function GetDealerVisitActivity<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetDealerVisitActivity) as Promise<G>;
}

export function InsertGBSFVisitPurpose_InTime<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.InsertGBSFVisitPurpose_InTime) as Promise<G>;
}

export function InsertDealerVisitPurpose_InTime<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.InsertDealerVisitPurpose_InTime) as Promise<G>;
}

export function InsertDealerVisitPurpose_OutTime<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.InsertDealerVisitPurpose_OutTime) as Promise<G>;
}

export function NonXPQuotSubmitXPA<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.NonXPQuotSubmitXPA) as Promise<G>;
}

export function GBSFLeadQuotGetList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GBSFLeadQuotGetList) as Promise<G>;
}

export function LeadEstimateApprovedListGet<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.LeadEstimateApprovedListGet) as Promise<G>;
}

export function NonXPQuotSubmitGBSF<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.NonXPQuotSubmitGBSF) as Promise<G>;
}
export function GetAppointmentList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetAppointmentList) as Promise<G>;
}

export function GetVisitHistory_XPA<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetVisitHistory_XPA) as Promise<G>;
}

export function GetVisitHistory_GBSF<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetVisitHistory_GBSF) as Promise<G>;
}

export function InsertLeadPayment<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.InsertLeadPayment) as Promise<G>;
}
export function GenerateQuotationPdf<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GenerateQuotationPdf) as Promise<G>;
}

export function GeneratePreEstimatePdf<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GeneratePreEstimatePdf) as Promise<G>;
}

export function GetPendingAcceptLead<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPendingAcceptLead) as Promise<G>;
}
export function UpdateAcceptanceLeadDetails<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.UpdateAcceptanceLeadDetails) as Promise<G>;
}

export function SentJCCSms<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.SentJCCSms) as Promise<G>;
}