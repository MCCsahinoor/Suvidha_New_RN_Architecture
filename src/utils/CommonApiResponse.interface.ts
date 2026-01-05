

export interface API_RESPONSE<G> { 
    response_code: number;
    UserValid: UserValid;
    NoOfRecord: number;
    Ds: D<G>[];
    Msg: Msg;
    ObjStr: string;
    Extra_string: string;
    CorrectionFlag: string;
    MismatchReason: string;
}

export interface D<G> {
    Key: string;
    Value: G;
}



export interface Msg {
    en: string;
    hi: string;
    pa: string;
    bn: string;
    te: string;
    ml: string;
    ta: string;
    kn: string;
    mr: string;
    gu: string;
}

export interface UserValid {
    ValidUserYN: string;
}
