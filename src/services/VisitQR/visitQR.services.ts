import { HTTP_POST, HTTP_GET, HTTP_POST_SIGNALR } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function GetVisitHistory<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetVisitHistory) as Promise<G>;
}

export function VisitPainterByOtp<P, G>(): Promise<G> {
    return HTTP_GET<P, G>({}, ENDPOINTS.VisitPainterByOtp) as Promise<G>;
}

export function PushVisitValidationRequest<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PushVisitValidationRequest) as Promise<G>;
}

export function PushVisitStatus<p, G>(data: any): Promise<G> {
    return HTTP_POST_SIGNALR<p, G>(data, ENDPOINTS.PushVisitStatus) as Promise<G>;
}

export function GetVisitRequestList<P, G>(): Promise<G> {
    return HTTP_GET<P, G>({}, ENDPOINTS.GetVisitRequestList) as Promise<G>;
}