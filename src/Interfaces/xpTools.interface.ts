export interface I_XP_TOOLS {
    data: I_Tools[];
}

export interface I_Tools {
    tool_code: string;
    tool_desc: string;
    img_url: string;
    prefix: string;
    visible_demo_request_button_yn: string;
    visible_service_request_button_yn: string;
    visible_purchase_request_button_yn: string;
    usp_list: I_TOOLS_UspList[];
    media: I_TOOLS_Media[];
}

export interface I_TOOLS_Media {
    id: number;
    media_type: string;
    media_url: string;
    thumbnail_url: string;
}

export interface I_TOOLS_UspList {
    id: number;
    usp_desc: string;
    serial_no: number;
}

export interface I_SERVICE_REQ_TOOLS {
    painter_guid: string;
    painter_code: string;
    painter_cont_id: string;
    painter_mobile: string;
    user_id: string;
    tool_code: string;
    tool_srl_no: string;
    remarks: string;
}
export interface I_REQUEST_SUBMIT_RES {
    response_code: number;
    response_message: string;
}

export interface I_Serial_No_TOOLS {
    painter_guid: string;
    painter_cont_id: string;
    painter_mobile: string;
    tool_code: string;
}
export module I_Serial_No_TYPE {
    export interface I_Serial_No_RES {
        data: SL_LIST[];
    }
    export interface SL_LIST {
        tool_serial_no: string;
        desc: string;
    }
    export interface I_MODI_SL_LIST {
        code: string;
        label: string;
        value: string;
    }
}

export module I_REQUEST_TYPE {
    export interface I_REQUEST_TYPE_GROUP {
        data: I_REQUEST[];
        response_code: number;
        response_message: string;
    }

    export interface I_REQUEST {
        code: string;
        value: string;
        value_seq: number;
    }

}

export module I_GET_ACTIVITY_LIST {
    export interface I_Activity_List {
        data: I_Activity_Data[];
        total_records: number;
    }

    export interface I_Activity_Data {
        remarks: string;
        req_status_code: string;
        req_status_desc: string;
        req_type_code: string;
        req_type_desc: string;
        requested_on: string;
        status_updated_on: any;
        tool_code: string;
        tool_desc: string;
        tool_serial_no: string;
        img_url: string;
    }
}