import { BASE_URL, ENDPOINTS, BASE_URL_SIGNLAR, ESAMBANDH_BASE_URL, ESAMBANDH_BASE_URL_UTILITY_ORDER } from './EndPoints';
// url parameters for get methods
export function QUERY_SEARCH_PARAMS<Q>(
  endPoint: string,
  queryParams: any,
): URL {
  const url = new URL(endPoint, BASE_URL);
  console.log(url);
  console.log(BASE_URL);
  if (queryParams && Object.keys(queryParams).length > 0) {
    const data = new URLSearchParams();
    Object.keys(queryParams).forEach(key =>
      data.append(key, queryParams[key as keyof Q]),
    );
    (url as any).search = new URLSearchParams(data);
  }
  return url;
}

// endpoint make
export function API_ENDPOINT<Q>(endPoint: string): string {
  const url = BASE_URL + endPoint;
  return url;
}

export function ESAMBANDH_API_ENDPOINT<Q>(endPoint: string): string {
  const url = ESAMBANDH_BASE_URL + endPoint;
  return url;
}

export function SIGNALR_ENDPOINT<Q>(endPoint: string): string {
  const url = BASE_URL_SIGNLAR + endPoint;
  return url;
}

// object to formdata request
export function CREATE_FORMDATA<Q>(formData: any) {
  const formDataObject = new FormData();
  if (formData && Object.keys(formData).length > 0) {
    for (let key in formData) {
      formDataObject.append(key, (formData as any)[key]);
    }
  }
  return formDataObject;
}

export function ESAMBANDH_API_ENDPOINT_UTILITY_ORDER<Q>(endPoint: string): string {
  const url = ESAMBANDH_BASE_URL_UTILITY_ORDER + endPoint;
  return url;
}
