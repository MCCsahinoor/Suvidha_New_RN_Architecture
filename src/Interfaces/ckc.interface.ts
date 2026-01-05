export interface I_BASIC_INFO_FormData {
    depot_name: string;
    dealer: string;
    painter_mobile: string;
    email: string;
    alternate_mobile: string;
    dob: string;
}
export interface I_IDPROOF_ckcPayload {
    doc_id: string;
    doc_path: string;
    doc_unique_no: string;
    docName?: string;
    docFileName?: string;
    prev_url?: string;
}
export interface I_Error_FormData {
    ifsc_code: string;
    bank_name: string;
    branch_name: string;
    hdn_acc_no: string;
    acc_no: string;
    acc_type: string;
}
export interface I_CKC_BANK_FormData {
    ifsc_code: string;
    bank_name: string;
    branch_name: string;
    hdn_acc_no: string;
    acc_no: string;
    acc_type: string;
    acc_img: string;
    ifsc_code_valid: boolean;
}
export interface I_SEND_PAINTER_IFSC_VALIDATION {
    ifsc: string;
}
export interface I_RECEIVED_IFSC_DATA {
    MICR: string;
    BRANCH: string;
    ADDRESS: string;
    STATE: string;
    CONTACT: string;
    UPI: boolean;
    RTGS: boolean;
    CITY: string;
    CENTRE: string;
    DISTRICT: string;
    NEFT: boolean;
    IMPS: boolean;
    SWIFT: string;
    ISO3166: string;
    BANK: string;
    BANKCODE: string;
    IFSC: string;
}

export module I_ACCOUNT_TYPE {
    export interface BANK_ACCOUNT_TYPE {
        data: Data[];
    }

    export interface Data {
        code: string;
        value: string;
        value_seq: number;
    }

    export interface I_MODI_ACCOUNT_TYPE {
        code: string;
        label: string;
        value: string;
        value_seq: number;
    }
}

export module I_ID_PROOF {
    export interface USER_ID_PROOF {
        data: Data[];
    }

    export interface Data {
        code: string;
        value: string;
        value_seq: number;
    }

    export interface I_MODI_USER_ID_PROOF {
        alias: string;
        label: string;
        validatedId: boolean;
        value: string;
    }
}

export module I_REDUX_CKC_DATA {
    export interface REDUX_CKC_DATA {
        bankDetails: BankDetails;
        basicInformation: BasicInformation;
        idProof: IDProof[];
        isValidate: string[];
        selectedTab: string;
    }

    export interface BankDetails {
        acc_img: string;
        acc_no: string;
        acc_type: string;
        bank_name: string;
        branch_name: string;
        hdn_acc_no: string;
        ifsc_code: string;
    }

    export interface BasicInformation {
        first_name: string;
        last_name: string;
        pincode: string;
        mobile: string;
        preferred_language: string;
        competition_point: 0;
        mobile_valid: boolean;
        competition_proof_img: string;
    }

    export interface IDProof {
        docFileName?: string;
        docName?: string;
        doc_id: string;
        doc_path: string;
        doc_unique_no: string;
    }
}

export module I_SUBMIT_USER_CKC {
    export interface CKC_DATA {
        first_name: string,
        last_name: string,
        pincode: string,
        mobile: string,
        preferred_language: string,
        competition_point: 0,
        bank_name: string;
        branch_name: string;
        ifsc_code: string;
        acc_no: string;
        acc_type: string;
        acc_img: string;
        painter_guid: string;
        painter_code: string;
        painter_cont_id: string;
        user_id: string;
        app: string;
        competition_proof_img: string
        ckc_referral_documents: PainterDocument[] | null;
    }
    export interface PainterDocument {
        doc_id: string;
        doc_unique_no: string;
        doc_path: string;
    }
}

export interface I_RESPONSE_CKC_SUBMIT {
    response_code: number;
    response_message: string;
}
