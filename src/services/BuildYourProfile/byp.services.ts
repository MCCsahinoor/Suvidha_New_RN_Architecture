import { HTTP_GET, HTTP_POST, HTTP_POST_FILE_UPLOAD } from '../../helper/ApiCall';
import { ENDPOINTS } from '../../helper/EndPoints';

export function PainterExpertiseDetailsLOV<P, G>(data?: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPainterExpertiseDetails) as Promise<G>;
}


export function BuildYourProfileSave<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.BuildYourProfileSave) as Promise<G>;
}

export function PainterProtfolioWhatsappShare<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PainterProtfolioWhatsappShare) as Promise<G>;
}