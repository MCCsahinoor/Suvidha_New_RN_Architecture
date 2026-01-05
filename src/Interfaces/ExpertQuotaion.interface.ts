import { I_PrivateSite_Quotation } from "./privateSiteQuation.interface"

export declare module I_Expert_Cont_Quotation {
    export interface I_SEND_EXPERT_CONT_QUOTATION_RESPONSE {
        qm_lead_id: string
    }

    export interface I_SEND_OTHER_QUOTATION_RESPONSE {
        Lead_Id: string
    }

    export interface I_GET_EXPERT_CONT_QUOTATION_RESPONSE {
        data: ExpertContQuotationDetails[]
        response_code: number,
        response_message: string
    }


    export interface I_GET_LEAD_QUOTATION_RESPONSE {
        data: {
            LeadEstimateQuot: LeadEstimationDetails[],
            QuotationLead: LeadQuotationListDetails[]
        },
        response_code: number,
        response_message: string
    }
    export interface ExpertContQuotationDetails {
        lead_id: number,
        quot_id: number,
        quot_srl: number,
        quot_stat: string,
        quot_add_visible: string,
        quot_remarks: string,
        total_amount: number,
        other_charge: number,
        discount_amt: number,
        final_amount: number,
        quot_date: string,
        quot_type: string
    }

    export interface LeadEstimationDetails {
        lqh_id: number,
        lqh_quotation_no: string,
        lqh_painting_surface: string,
        lqh_total_amt: number,
        lqh_discount_amt: number,
        lqh_payable_amt: number,
        lqh_aprv_yn: string,
        created_date: string,
        modified_date: string,
        lqh_lead_id: string
    }

    export interface LeadQuotationListDetails {
        lpqh_id: number,
        quotation_no: string,
        lpqh_hdr_id: number,
        lpqh_lead_id: string,
        lpqh_addl_discount: number,
        lpqh_addl_charge: number,
        created_date: string,
        lpqh_status: string,
        lpqh_payable_amt: number,
        approve_permission: string
    }

    export interface I_GET_QUOTATION_DETAILS_RESPONSE {
        data: I_PrivateSite_Quotation.NewQuotation
        response_code: number,
        response_message: string
    }

    export interface QuotaionCard {
        quot_type: string
        xpaID: string,
        quotationName: string,
        date: string,
        time: string,
        amount: string,
        status: string,
        lead_type: string,
    }

    export interface ExpertContBrandDetails {
        rfb_category: string,
        rfb_brand: string

    }

    export interface ExpertContQuotationType {
        code: string,
        value: string,
        value_seq: number

    }

    export interface ExpertContQuotationSubmit {
        quot_stat: string,
        quot_remarks: string,
        lead_id: string,
        quot_id: number,
        final_amount: number,
        total_amount: string,
        quot_type: string,
        Details: ExpertContQuotationSurfaceDetails[]
    }

    export interface ExpertContQuotationSubmitDetalis {
        data: {
            lead_id: number,
            quot_id: number,
            quot_srl: number,
            quot_stat: string,
            total_amount: number,
            final_amount: number,
            quot_date: string,
            quot_type: string,
            remarks: string,
            xpa_lead_id: string,
            details: ExpertContQuotationSurfaceDetails[]
        },
        response_code: number,
        response_message: string
    }

    export interface ExpertContQuotationSurfaceDetails {
        surface_name: string,
        primar_brand: string
    }

    export interface I_GET_EXPERT_CONT_QUOTATION_RESPONSE {
        quot_id: number,
        response_code: number,
        response_message: string
    }



}

export const ExpertContQuotationSurfaceDetailsDto: I_Expert_Cont_Quotation.ExpertContQuotationSurfaceDetails = {
    surface_name: "",
    primar_brand: ""
}


export const ExpertContQuotationSubmitDto: I_Expert_Cont_Quotation.ExpertContQuotationSubmit = {
    quot_stat: "",
    quot_remarks: "",
    lead_id: "",
    quot_id: 0,
    final_amount: 0,
    total_amount: '0',
    quot_type: "",
    Details: [ExpertContQuotationSurfaceDetailsDto]
}