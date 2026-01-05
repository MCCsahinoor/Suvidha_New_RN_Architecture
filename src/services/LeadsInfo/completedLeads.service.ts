import { HTTP_GET, HTTP_POST } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function GetCompletedLeadList<P, G>(data: any): Promise<G> {
  return HTTP_POST<P, G>(data, ENDPOINTS.GetCompletedLeadList) as Promise<G>;
}
