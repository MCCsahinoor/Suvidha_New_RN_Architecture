export interface I_GET_USER_LOGIN {
    mobile_no: string,
    haskey: string
    device_uuid: string,
    device_name: string,
    model: string,
    platform: string,
    operating_system: string,
    os_version: string,
    manufacturer: string,
    web_view_version: string,
}
export interface I_GET_USER_LOGIN_RESPONSE {
    response_code: number,
    response_message: string,
    otp_expired_in_sec: number
}

export interface I_SEND_FOR_USER_OTP {
    mobile_no: string,
    otp: string,
    device_uuid: string,
    device_name: string,
    model: string,
    platform: string,
    operating_system: string,
    os_version: string,
    manufacturer: string,
    web_view_version: string,
    fcm_token: string
}
export interface I_GET_USER_OTP_RESPONSE {
    user_id: any;
    user_group_code: string;
    user_first_name: string;
    user_middle_name: string;
    user_mobile_number: string;
    user_last_name: string;
    user_applicable_lang_code: string;
    virtual_user_group_code: string;
    virtual_user_first_name: string;
    virtual_user_middle_name: string;
    virtual_user_last_name: string;
    virtual_user_applicable_lang_code: string;
    virtual_user_depot_code: string;
    access_token: string;
    refresh_token: string;
    response_code: number;
    response_message: string;
}
export interface I_SEND_FOR_PAINTER_REGISTRATION_RESPONSE {
    first_name: string;
    last_name: string;
    city: string;
    pincode: string;
    state: string;
    contact_no: string;
    preferred_language_code: any;
    associate_with_berger_yn: string;
}
export interface I_GET_PAINTER_REGISTRATION_RESPONSE {
    response_code: number
    response_message: string
}


export interface I_SEND_PAINTER_SEARCH_DATA {
    user_id: string,
    search_keyword: string
}

export declare module PAINTER_LIST_DATA_ALL {
    export interface I_GET_PAINTER_LIST {
        data: I_GET_PAINTER[]
    }

    export interface I_GET_PAINTER {
        isSelected?: boolean;
        user_id: string
        painter_name: string;
        painter_code: string;
        painter_mobile: string;
    }
}

export interface I_SEND_PAINTER_LOGIN_DATA {
    session_id: string,
    painter_user_id: string,
    refresh_token?: string
}