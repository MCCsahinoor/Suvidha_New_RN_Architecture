export declare module I_RedeemptionPoint {
    export interface Data {
        RedemptionSummary: RedemptionSummary[],
        RedemptionHistory: RedemptionHistory[],
        from_date: string,
        to_date: string
    }

    export interface RedemptionSummary {
        heads: string,
        vol: number,
        pts: number,
        amt: number
    }

    export interface RedemptionHistory {
        spr_painter_id: string,
        spr_painter_guid: string,
        spr_redeem_point: number,
        spr_amt: number,
        spr_date: string,
        spr_amt_release_date: string,
        spr_payment_status: string
    }

    export interface RedemptionSchemeList {
        reedem_applicable_yn: string,
        scheme_list: schemeList[],
    }

    export interface schemeList {
        scheme_id: string,
        start_dt: string,
        end_dt: string
    }
}