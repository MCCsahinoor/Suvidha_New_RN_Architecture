import { HTTP_GET, HTTP_POST, HTTP_POST_FILE_UPLOAD } from '../../helper/ApiCall';
import { ENDPOINTS } from '../../helper/EndPoints';

export function GetUserProfile<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetUserProfile) as Promise<G>;
}

export function WhatsAppValidationSendOTP<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.WhatsAppValidationSendOTP) as Promise<G>;
}

export function ValidateWhatsappNoOTP<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ValidateWhatsappNoOTP) as Promise<G>;
}

export function SaveMyProfileDetails<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.SaveMyProfileDetails) as Promise<G>;
}

export function GetCsatReviewList<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetCsatReviewList) as Promise<G>;
}

export function RegistrationApplicableLanguage<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.RegistrationApplicableLanguage) as Promise<G>;
}

export function GetAllState<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetAllState) as Promise<G>;
}

export function GetFeedbackLov<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetFeedbackLov) as Promise<G>;
}

export function GetScoreDetails<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetScoreDetails) as Promise<G>;
}

export function PainterQuestionDetails<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PainterQuestionDetails) as Promise<G>;
}

export function PainterQuestionInsert<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PainterQuestionInsert) as Promise<G>;
}

// export function PainterSplashScreenDetails<P, G>(data?: any): Promise<G> {
//     return HTTP_GET<P, G>(data, ENDPOINTS.PainterSplashScreenDetails) as Promise<G>;
// }

export function PainterSplashScreenDetails<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PainterSplashScreenDetails) as Promise<G>;
}

