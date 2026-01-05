import { HTTP_POST } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function GetBookMyTrainingList<P, G>(): Promise<G> {
    return HTTP_POST<P, G>({}, ENDPOINTS.GetBookMyTrainingList) as Promise<G>;
}

export function GetActivityDetails<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetActivityDetails) as Promise<G>;
}

export function SetActivityPlanningTrainee<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.SetActivityPlanningTrainee) as Promise<G>;
}

export function GetTrainingHistory<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetTrainingHistory) as Promise<G>;
}
