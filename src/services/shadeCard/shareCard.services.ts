import { ESAMBANDH_HTTP_GET, HTTP_GET } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function GetShadeCardList<P, G>(data?: any): Promise<G> {
    return ESAMBANDH_HTTP_GET<P, G>({ dto: data }, ENDPOINTS.GetShadeCardList) as Promise<G>;
}