import { HTTP_GET } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function GetHelpDesk<P, G>(data?: any): Promise<G> {
  return HTTP_GET<P, G>(data, ENDPOINTS.HelpDesk) as Promise<G>;
}
