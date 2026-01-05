export declare module I_TokenScan {
    export interface I_SEND_FOR_SCAN_TOKEN_RESPONSE {
        TokenNumber: string,
    }

    export interface I_GET_FOR_SCAN_TOKEN_RESPONSE {
        Status: number,
        Message: string,
        TranId: string,
        Product: string,
        PackSize: string,
        Denomination: string,
        Asp: string,
        TokenKey: string,
        TokenType: string,
        TokenMonth: string,
        TokenYear: string
        response_code: number,
        response_message: string,
        used_token_Check: string
    }

    export interface I_SEND_FOR_POINT_STATEMENT_RESPONSE {
        FromDate: string,
        ToDate: string
    }

    export interface I_GET_FOR_POINT_STATEMENT_RESPONSE {
        response_code: number,
        response_message: string,
        Data: {
            TokenDetails: any[]
            RewardDetails: any[]
        }
    }

    export interface I_GET_FOR_PAINTER_DETAILS_RESPONSE {
        reps_mobile: string
        reps_name: string
        response_code: number,
        response_message: string,
        painter_code: string,
        painter_mobile: string,
        painter_name: string,
        val_program_member_id: string,
        dlr_dealer_name: string,
        lockStatus: string,
        lockMessage: string
    }


    export interface PointStatementDetails {
        fin_yr: string
        trx_token: string,
        trx_product: string,
        trx_date: string,
        trx_point: string,
        trx_volume: string
    }

    export interface I_SEND_FOR_SCAN_ATTENDANCE_RESPONSE {
        meet_id: string,
        app_name: string,
        valid_upto: string
    }

    export interface I_GET_FOR_SCAN_ATTENDANCE_RESPONSE {
        response_code: number,
        response_message: string,
    }
}