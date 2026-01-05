export declare module I_PrivateSite {
    export interface NewSite {
        com_date: any
        cust_addr: string
        cust_name: string
        lead_date: string
        lead_id: number
        lead_stat: string
        mobile_no: string
        won_date: any
    }

    export interface DataFlagChanged {
        lm_cust_name: string,
        profileImage: string,
        lm_cust_addr: string,
        lm_mobile_no: string,
        date: string,
        status: string,
        lm_lead_id: number
    }

    export interface COMBINATIONTYPE {
        label: string;
        value: string;
    }
}

export interface I_SEND_FOR_PRIVATE_SITE_REGISTRATION_RESPONSE {
    lm_lead_stat: string,
    lm_cust_name: string,
    lm_mobile_no: string,
    lm_cust_addr: string,
    lm_lead_id: number
}

export interface I_GET_PRIVATE_SITE_REGISTRATION_RESPONSE {
    lead_Id: number
    response_code: number,
    response_message: string

}

export interface I_SEND_FOR_PRIVATE_SITE_LIST_RESPONSE {
    lead_stat: string,
    fr_date: string,
    to_date: string
}

export interface I_GET_PRIVATE_SITE_LIST_RESPONSE {
    Data: []
    response_code: number,
    response_message: string
}

export interface I_SEND_FOR_PRIVATE_SITE_COMPLETE_RESPONSE {
    lead_stat: string,
    lead_id: number
}

export interface I_GET_PRIVATE_SITE_LIST_COMPLETE_RESPONSE {
    response_code: number,
    response_message: string
}

export const PrivateSiteDtlsDto: I_SEND_FOR_PRIVATE_SITE_REGISTRATION_RESPONSE = {
    lm_cust_name: '',
    lm_mobile_no: '',
    lm_cust_addr: '',
    lm_lead_id: 0,
    lm_lead_stat: 'New'
}

export module I_MOISTURE_LEVEL {
    export interface MOISTURE_LEVEL {
        data: Data[];
    }

    export interface Data {
        code: string;
        value: string;
        value_seq: number;
    }

    export interface I_MODI_MOISTURE_LEVEL {
        code: string;
        label: string;
        value: string;
        value_seq: number;
    }
}

export module I_AREA_TYPE {
    export interface AREA_TYPE {
        data: Data[];
    }

    export interface Data {
        code: string;
        value: string;
        value_seq: number;
    }

}