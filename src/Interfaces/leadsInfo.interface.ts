export declare module I_LEADS_INFO {
    export interface FilterCategory {
        code: string,
        value: string,
        value_seq: number
    }

    export interface FilterType {
        code: string,
        value: string,
        value_seq: number
    }

    export interface LeadInfoList {
        JCC: string
        category: string
        contact_addr: string
        contact_name: string
        contact_no: string
        dealer_code: string
        dealer_name: string
        gbsf_lead_cntr_yn: string
        gbsf_lead_type: string
        is_visit_running: boolean
        kit: string
        la_date: string
        la_id: number
        lap_expert_cntr_yn: string
        ld_depot_code: string
        ld_lead_guid: string
        lead_date: string
        lead_id: string
        lead_status: string
        quotation_add_permission_yn: string
        remarks: string
        reopen_date: string
        reopened: string
        status_code: string
        status_value: string
        type: string
        who_will: string
        full_payment_received_yn: string
        warranty_applicable_yn?: string
        warranty_text?: string
        ld_warranty_status?: string
    }

    export interface CallHistory {
        lcl_res_message: string
        lcl_res_call_id: string
        lcl_call_recording_url: string
        lcl_start_time: string
        lcl_end_time: string
        call_duration: string
        created_by: string
        created_date: string
        lcl_call_to: string
    }

    export interface NonContactableLead {
        ltnc_transfer_Non_Contactable: string
        created_user: string
        created_date: string
    }

    export interface NonXPQuotGetListXPA {
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
        quot_type: string
    }

    export interface LeadAppointmentFixedCheck {
        id: number,
        depot_code: string,
        dealer_code: string,
        dlr_type_id: number,
        mobile: string,
        otp: string,
        valid_till: string,
        la_id: number,
        in_out_time: LeadAppointmentCompleted[]
    }

    export interface LeadAppointmentCompleted {
        check_in_time: string,
        check_out_time: string
    }

    export interface PositionInfo {
        coords: Coords
        extras: Extras
        mocked: boolean
        timestamp: number
    }

    export interface Coords {
        accuracy: number
        altitude: number
        heading: number
        latitude: number
        longitude: number
        speed: number
    }

    export interface Extras {
        maxCn0: number
        meanCn0: number
        satellites: number
    }

    export interface ExpertLeadRunningInfo {
        dcio_id: number,
        DiffTime: number,
        dc_dlr_type_id: number,
        dcio_check_in_time: string,
        currentTime: string,
        dcio_depot_code: string,
        dcio_dealer_code: string,
        dealer_name: string,
        mobile_no: string,
        type_desc: string,
        ld_lead_guid: string
    }

    export interface DealerActivities {
        lov_type: string,
        lov_code: string,
        lov_value: string,
        lov_shrt_desc: string,
        lov_value_seq: number,
        lov_field1_value: string,
        lov_field2_value: string,
        lov_field3_value: string,
        lov_ind: number,
        isChecked?: boolean
    }

    export interface AppointmentInfo {
        address: string,
        appointment_date_time: string,
        contact_name: string,
        contact_no: string,
        isestimate_given: string,
        la_act_date: string,
        la_act_time: string,
        la_id: number,
        la_min_date: string,
        lead_id: string,
        lead_status: string,
        modify_yn: string,
        statuscode: string
    }

    export interface VisitHistory {
        dcio_activity_type: string,
        activity_type: string,
        dcio_check_in_time: string,
        dcio_check_out_time: string,
        diff_time: number,
        visit_date: string,
        dealer_name: string,
        activity: string,
        activity_others: string,
        dcio_id: number
    }

    export interface PaymentInfo {
        lp_amount: number
        lp_apprv_yn: string
        lp_bank_name: string
        lp_branch: string
        lp_cheq_no: string
        lp_gstin: string
        lp_ifsc: string
        lp_lead_id: string
        lp_pay_mode: string
        lp_payment_date: string
        lp_trx_id: number
        updated_by: string
    }
}

export const PositionInfoDto: I_LEADS_INFO.PositionInfo = {
    coords: {
        accuracy: 0,
        altitude: 0,
        heading: 0,
        latitude: 0,
        longitude: 0,
        speed: 0
    },
    extras: {
        maxCn0: 0,
        meanCn0: 0,
        satellites: 0
    },
    mocked: false,
    timestamp: 0

}
