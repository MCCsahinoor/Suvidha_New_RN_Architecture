import { HTTP_POST } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function GetEvaltokenlist<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.EvalTokenList) as Promise<G>;
}