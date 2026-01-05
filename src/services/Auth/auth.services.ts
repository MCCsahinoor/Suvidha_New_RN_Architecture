/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HTTP_GET, HTTP_POST } from '../../helper/ApiCall';
import { ENDPOINTS } from '../../helper/EndPoints';
import { API_RESPONSE } from '../../utils/CommonApiResponse.interface';

export function UserLoginSendOTP<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.UserLoginSendOTP) as Promise<G>;
}

export function ValidateUserLoginOTP<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ValidateUserLoginOTP) as Promise<G>;
}

export function PainterEnquiryEntry<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PainterEnquiryEntry) as Promise<G>;
}

export function PainterSearch<P, G>(data: any) {
    return HTTP_POST<P, G>(data, ENDPOINTS.PainterSearch) as Promise<G>;
}

export function ValidatePainterChangeLoginFromVirtualUser<P, G>(data: any) {
    return HTTP_POST<P, G>(data, ENDPOINTS.ValidatePainterChangeLoginFromVirtualUser) as Promise<G>;
}

export function SignOut<P, G>(): Promise<G> {
    return HTTP_POST<P, G>({}, ENDPOINTS.SignOut) as Promise<G>;
}

// ESAM LOGIN
export function EsamLogingTokenEntry<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.EsamLogingTokenEntry) as Promise<G>;
}

export function GetAppVersion<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetAppVersion) as Promise<G>;
}

export function GetAppVersionIos<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetAppVersionIOS) as Promise<G>;
}

export function GetDeleteAccountFlagIos<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.DeleteAccountFlagAPI) as Promise<G>;
}

export function RefreshToken<P, G>(data: any): Promise<G> {
    return HTTP_POST(data, ENDPOINTS.RefreshToken);
}
export function RefreshTokenVirtual<P, G>(data: any): Promise<G> {
    return HTTP_POST(data, ENDPOINTS.RefreshTokenVirtual);
}