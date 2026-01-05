import { HTTP_GET, HTTP_POST } from "../../helper/ApiCall";
import { ENDPOINTS } from '../../helper/EndPoints';

export function MyActiveSchemeList<P, G>(): Promise<G> {
    return HTTP_GET<P, G>({}, ENDPOINTS.MyActiveSchemeList) as Promise<G>;
}

export function SchemeDetailsInfo<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.SchemeDetails) as Promise<G>;
}

export function CreateGroup<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.CreateGroup) as Promise<G>;
}

export function GroupDetails<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GroupDetails) as Promise<G>;
}

export function PainterDetailsByContact<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PainterDetailsByContact) as Promise<G>
}

export function MySchemePainterInvite<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.MySchemePainterInvite) as Promise<G>
}

export function PainterInvitationAcceptance<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PainterInvitationAcceptance) as Promise<G>
}

export function GetSellOutSchemeList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetSellOutSchemeList) as Promise<G>
}

export function GetSellOutSchemeDetails<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetSellOutSchemeDetails) as Promise<G>
}