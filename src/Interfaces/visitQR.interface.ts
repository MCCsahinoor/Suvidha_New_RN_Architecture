export declare module I_Visit_QR {
    export interface Data {
        painter_code: string;
        user_id: string;
        user_mobile: string;
        user_name: string;
        visit_datetime: string;
    }

    export interface VisitOTP {
        auto_id: number,
        created_date: string,
        ref_exp_time: number,
        ref_exp_yn: string,
        ref_mobile_no: string,
        ref_otp_code: string,
        ref_user_id: string,
        ref_user_name: string
    }

    export interface SocketInfo {
        painter_user_id: string,
        ref_user_name: string,
        ref_mobile_no: string,
        ref_otp_code: string,
        remain_otp_valid_for_second: number,
        validated_yn: string
    }
}