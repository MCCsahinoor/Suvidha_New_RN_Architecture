
import { HTTP_POST } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function ValueTokenRedmSmryGet<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ValueTokenRedmSmryGet) as Promise<G>;
}