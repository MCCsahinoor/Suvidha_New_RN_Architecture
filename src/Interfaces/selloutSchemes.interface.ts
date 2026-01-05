export interface I_SELLOUT_SCHEMES_SEND {
    year: number;
    month: any;
    start_end: string;
}
export interface I_SELLOUT_SCHEMES_LIST {
    Data: selloutData[];
}
export interface selloutData {
    sch_scheme_name: string;
    sch_scheme_code: string;
    doc_url: string;
    period: string;
}
export interface I_SELLOUT_SCHEMES_DETAILS_SEND {
    scheme_id: string;
    year: number | null;
    month: any | null;
}
export interface I_SELLOUT_DETAILS_ROUTE_DETAILS {
    doc_url: string;
    month: number;
    period: string;
    sch_scheme_code: string;
    sch_scheme_name: string;
    year: number;
}

export interface I_SELLOUT_DETAILS_GET_ALL {
    Data: detailsAll[];
    PainterDeatils: PainterDeatils;
}

export interface detailsAll {
    pss_painter_code: string;
    pss_schm_param: string;
    pss_tgt: string;
    pss_ty: string;
    pss_status: string;
    Reward: string;
    pss_schm_param_seq: number;
}

export interface PainterDeatils {
    length: number;
    depot_code: string;
    reg_dlr_code: string;
    painter_code: string;
    painter_mobile: string;
    painter_name: string;
}