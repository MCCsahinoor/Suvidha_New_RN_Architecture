import { HTTP_GET, HTTP_POST } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function ValidateEmailOtp<P, G>(data: any, p0: {}): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ValidateEmailOtp) as Promise<G>;
}

export function SendEmailOtp<P, G>(data: any, p0: {}): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.SendEmailOtp) as Promise<G>;
}
