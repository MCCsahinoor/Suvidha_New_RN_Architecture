
import { ESAMBANDH_HTTP_GET, ESAMBANDH_HTTPS, HTTP_POST } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function GetCategoryList<P, G>(data?: any): Promise<G> {
  return ESAMBANDH_HTTP_GET<P, G>({ dto: data }, ENDPOINTS.GetCategoryList) as Promise<G>;
}

export function GetBrandList<P, G>(data?: any): Promise<G> {
  return ESAMBANDH_HTTP_GET<P, G>({ dto: data }, ENDPOINTS.SearchBrands) as Promise<G>;
}

export function GetAllShades<P, G>(data?: any): Promise<G> {
  return ESAMBANDH_HTTPS<P, G>({ dto: data }, ENDPOINTS.GetAllShades) as Promise<G>;
}
export function GetCategoryDetails<P, G>(data?: any): Promise<G> {
  return ESAMBANDH_HTTP_GET<P, G>({ dto: data }, ENDPOINTS.GetCategoryDetails) as Promise<G>;
}

export function GetSortByLov<P, G>(data?: any): Promise<G> {
  return ESAMBANDH_HTTP_GET<P, G>({ dto: data }, ENDPOINTS.GetSortByLov) as Promise<G>;
}

export function SearchBrandsAll<P, G>(data?: any): Promise<G> {
  return ESAMBANDH_HTTP_GET<P, G>({ dto: data }, ENDPOINTS.SearchBrands) as Promise<G>;
}

export function SearchProductCompareBrands<P, G>(data?: any): Promise<G> {
  return ESAMBANDH_HTTP_GET<P, G>({ dto: data }, ENDPOINTS.SearchProductCompareBrands) as Promise<G>;
}

export function GetBrandDetails<P, G>(data?: any): Promise<G> {
  return ESAMBANDH_HTTP_GET<P, G>({ dto: data }, ENDPOINTS.GetBrandDetails) as Promise<G>;
}

export function ShareBrandDetailsResponseDto<P, G>(data: any): Promise<G> {
  return HTTP_POST<P, G>(data, ENDPOINTS.ShareBrandDetailsResponseDto) as Promise<G>;
}