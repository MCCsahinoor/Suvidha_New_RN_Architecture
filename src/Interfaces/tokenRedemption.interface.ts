export declare module I_Token {
    export interface RedeemTokenDetails {
        Painter_Details: PainterDetails,
        ValueTknPainterDtls: []
    }

    export interface PainterDetails {
        painter_guid: string,
        painter_id: string,
        painter_name: string,
        pntr_address: string,
        mobile_no: string,
        linked_depot: string,
        linked_dealer: string,
        kyc_status: string,
        pan_verified_yn: string,
        account_yn: string,
        account_no: string,
        ifsc_code: string,
        bank_name: string,
        branch_name: string,
        available_amount: number,
        hold_amount: number,
        redeem_amount_arr: string,
        redeem_amount_msg: string,
        scan_token_msg: string
    }


    export interface RedeemTransactionSummary {
        painter_guid: string
        painter_id: string
        painter_name: string
        pntr_address: string
        mobile_no: string
        linked_depot: string
        linked_dealer: string
        kyc_status: string
        account_yn: string
        account_no: string
        ifsc_code: string
        bank_name: string
        branch_name: string
        available_amount: number
        opening_amt: number
        closing_amt: number
        transaction_history: TransactionHistory[]
    }

    export interface TransactionHistory {
        req_status: string
        trx_id: string
        req_id: string
        req_date_disp: string
        req_date: string
        req_value: number
        trx_type: string
    }

    export interface TokenTrxDetails {
        net_amt_paid: number
        tds_deducted: number
        redem_amount: number
        product_denomination: ProductDenomination[]
    }

    export interface ProductDenomination {
        token: string
        req_date_time: string
        product_name: string
        denomination: number
    }

}

export const RedeemTokenDetailsDto: I_Token.RedeemTokenDetails = {
    Painter_Details: {
        painter_guid: '',
        painter_id: '',
        painter_name: '',
        pntr_address: '',
        mobile_no: '',
        linked_depot: '',
        linked_dealer: '',
        kyc_status: '',
        pan_verified_yn: '',
        account_yn: '',
        account_no: '',
        ifsc_code: '',
        bank_name: '',
        branch_name: '',
        available_amount: 0,
        hold_amount: 0,
        redeem_amount_arr: '',
        redeem_amount_msg: '',
        scan_token_msg: ''
    },
    ValueTknPainterDtls: []
};

export const RedeemTransactionSummaryDto: I_Token.RedeemTransactionSummary = {
    painter_guid: "",
    painter_id: "",
    painter_name: "",
    pntr_address: "",
    mobile_no: "",
    linked_depot: "",
    linked_dealer: "",
    kyc_status: "",
    account_yn: "",
    account_no: "",
    ifsc_code: "",
    bank_name: "",
    branch_name: "",
    available_amount: 0,
    opening_amt: 0,
    closing_amt: 0,
    transaction_history: []
};

export const TokenTrxDetailsDto: I_Token.TokenTrxDetails = {
    net_amt_paid: 0,
    tds_deducted: 0,
    redem_amount: 0,
    product_denomination: []
}

