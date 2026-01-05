import { HTTP_GET, HTTP_POST } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function PainterScratchcardGetPending<P, G>(data?: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.PainterScratchcardGetPending) as Promise<G>;
}

export function PainterScratchcardUpdateScratch<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PainterScratchcardUpdateScratch) as Promise<G>;
}

export function GetPainterScratchcardGetConsumed<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPainterScratchcardGetConsumed) as Promise<G>;
}
