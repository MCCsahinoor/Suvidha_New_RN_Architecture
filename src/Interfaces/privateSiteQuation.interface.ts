export declare module I_PrivateSite_Quotation {
    export interface NewQuotation {

        lead_id: string,
        quot_id: number,
        quot_stat: string,
        other_charge: string,
        discount_amt: string,
        final_amount: string,
        total_amount: string,
        quot_remarks: string,
        quot_type: string,
        qm_quot_xpa_lead_id: string,
        qm_quot_type: string
        quot_date: string
        Details: QuotationDetails[]

    }

    export interface QuotationDetails {
        srl_no: number,
        qd_area:string,
        surface_name: string,
        surface_area: string,
        sq_unit_rate: string,
        primar: PaintingCombinationDetails,
        putty: PaintingCombinationDetails,
        top_coat: PaintingCombinationDetails,
        surface_remarks: string,
        surface_total: string
        qd_moisture_level: string,
        addition_paint_area:addition_paint_area[]
    }

    export interface PaintingCombinationDetails {
        coats: any,
        brand: any
    }

    export interface addition_paint_area {
        category: string,
        Range: string,
        Item: string,
        Paintable_Area: string,
        total_value: string
    }

    export interface QuotationListDtails {
        lead_id: number,
        quot_id: number,
        quot_srl: number,
        quot_stat: string,
        quot_remarks: string,
        total_amount: number,
        other_charge: number,
        discount_amt: number,
        final_amount: number,
        quot_date: string
    }

    export interface QuotaionCard {
        percentage?: string,
        quot_type: string
        xpaID: string,
        quotationName: string,
        date: string,
        time: string,
        amount: string,
        status: string,
        lead_type: string,
        isAPICall?: boolean
    }

    export interface I_SEND_QUOTATION_RESPONSE {
        lead_id: number
    }

    export interface I_GET_QUOTATION_RESPONSE {
        quot_id: number
        response_code: number,
        response_message: string
    }

    export interface I_GET_QUOTATION_LIST_RESPONSE {
        data: []
        response_code: number,
        response_message: string
    }

    export interface I_SEND_QUOTATION_DETAILS_RESPONSE {
        quot_id: number
    }

    export interface I_GET_QUOTATION_DETAILS_RESPONSE {
        data: NewQuotation
        response_code: number,
        response_message: string
    }

    export interface GetQuotationList {
        lead_id: number,
        quot_id: number,
        quot_srl: number,
        quot_stat: string,
        quot_remarks: string,
        total_amount: number,
        other_charge: number,
        discount_amt: number,
        final_amount: number,
        quot_date: string
    }

    export interface I_SEND_QUOTATION_APPROVE_RESPONSE {
        quot_stat: string,
        quot_id: number
    }

    export interface I_GET_QUOTATION_APPROVE_RESPONSE {
        response_code: number,
        response_message: string
    }

    export interface I_GET_QUOTATION_DOWNLOAD_RESPONSE {
        report_file_path: string
    }
    export interface I_GET_LEAD_QUOTATION_DOWNLOAD_RESPONSE {
        FilePath: string
    }
}

export const PuttyDetailsDto: I_PrivateSite_Quotation.PaintingCombinationDetails = {
    coats: "",
    brand: ""
}

export const PrimerDetailsDto: I_PrivateSite_Quotation.PaintingCombinationDetails = {
    coats: "",
    brand: ""
}
export const TopCoatDetailsDto: I_PrivateSite_Quotation.PaintingCombinationDetails = {
    coats: "",
    brand: ""
}
export const AdditionPaintAreaDto: I_PrivateSite_Quotation.addition_paint_area = {
    category: "",
    Range: "",
    Item: "",
    Paintable_Area: "",
    total_value: ""
}

export const QuotationDetailsDto: I_PrivateSite_Quotation.QuotationDetails = {
    srl_no: 0,
    qd_area: "",
    surface_name: "",
    surface_area: "",
    sq_unit_rate: "",
    primar: PrimerDetailsDto,
    putty: PuttyDetailsDto,
    top_coat: TopCoatDetailsDto,
    surface_remarks: "",
    surface_total: "0",
    qd_moisture_level: "",
    addition_paint_area: []
}



export const NewQuotationDto: I_PrivateSite_Quotation.NewQuotation = {
    lead_id: "0",
    quot_id: 0,
    quot_stat: "Pending",
    other_charge: "0",
    discount_amt: "0",
    final_amount: "0",
    total_amount: "0",
    quot_remarks: "",
    Details: [QuotationDetailsDto],
    quot_type: "",
    qm_quot_type: "",
    qm_quot_xpa_lead_id: "",
    quot_date: "",
}

