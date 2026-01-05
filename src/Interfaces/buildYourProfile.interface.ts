export interface I_SAVE_GENERAL_INFO {
    painter_mobile: string;
    wa_ph_no: string;
    email_id: string;
    full_address: string;
    language: string;
    team_members: Team[];
    email_verified: boolean;

}

export interface Team {
    member_mobile_no: string;
    member_name: string;
}

export interface I_EXPERTISE_LOV {
    data: dataLov[];
}

export interface dataLov {
    lov_code: string;
    lov_value: string;
    lov_type: string;
    enable_lock_yn: string;
    documents: uploadDocument[];
}

export interface uploadDocument {
    id: number,
    lov_code: string,
    img_path: string,
    selected_yn: string,
    status: string,
    remarks: string,
    new_img_uploaded_path?: string
}



export interface I_SEND_BYP_DATA_SEVE {
    painter_guid: string;
    painter_code: string;
    painter_cont_id: string;
    painter_mobile: string;
    user_id: string;
    portfolio_image: string;
    documents: DocumentFinal[];
}

export interface DocumentFinal {
    id: number;
    lov_code: string;
    img_path: string;
    selected_yn: string;
}


export interface I_RES_GET {
    response_code: number;
    response_message: string;
}