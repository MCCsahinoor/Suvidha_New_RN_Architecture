import {I_SEND_PAINTER_IFSC_VALIDATION} from '../../Interfaces/kyc.interface';
import {HTTP_GET, HTTP_POST, HTTP_POST_FILE_UPLOAD} from '../../helper/ApiCall';
import { ENDPOINTS } from '../../helper/EndPoints'; 

export function GetValidateIFSC<P, G>(
  data?: I_SEND_PAINTER_IFSC_VALIDATION,
): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.KycValidateIFSC) as Promise<G>;
}

export function GetBankAccTypeLov<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetBankAccTypeLov) as Promise<G>;
}

export function GetMpKycDocTypeLov<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetMpKycDocTypeLov) as Promise<G>;
}

export function saveUserKYC<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.SaveKYC) as Promise<G>;
}
