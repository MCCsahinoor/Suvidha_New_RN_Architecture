import { ESAMBANDH_HTTP_GET, HTTP_GET, HTTP_POST } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

// export function GetXPToolsList<P, G>(data?: any): Promise<G> {
//     return ESAMBANDH_HTTP_GET<P, G>({ dto: data }, ENDPOINTS.GetXPToolsList) as Promise<G>;
// }

export function GetXPToolsList<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetXPToolsList) as Promise<G>;
}

export function ServcieRequestEntry<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.XpToolServcieRequestEntry) as Promise<G>;
}

export function XpToolSerialNoList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.XpToolSerialNoList) as Promise<G>;
}

export function GetServiceRequestTypeLov<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetServiceRequestTypeLov) as Promise<G>;
}

export function GetServiceRequestStatusLov<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetServiceRequestStatusLov) as Promise<G>;
}

export function GetXpToolActivity<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetXpToolActivity) as Promise<G>;
}

export function XpToolDemoRequestEntry<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.XpToolDemoRequestEntry) as Promise<G>;
}