export declare module I_Benefit_Details {
    export interface BusinessDetails {
        bgl_Business: string,
        bgl_Received: number,
        bgl_Converted: number,
        bgl_Job_Value: number,
        bgl_Csat: number,
        ol_Business: string,
        ol_Received: number,
        ol_Converted: number,
        ol_Job_Value: number,
        ol_Csat: number,
        tot_Business: string,
        tot_Received: number,
        tot_Converted: number,
        tot_Job_Value: number,
        tot_Csat: number
        data_as_on_date: string
    }

    export interface RewardDetails {
        trip_name: string
        go_goa_carnival_reward: string
        go_goa_carnival_point: any
        welcome_dhamaka_point_q1: number
        sf_painter_id: string,
        sf_program_member_id: string,
        basic_point: number,
        basic_value: number,
        qtr1_point: number,
        qtr1_value: number,
        qtr2_point: number,
        qtr2_value: number,
        qtr3_point: number,
        qtr3_value: number,
        qtr4_point: number,
        qtr4_value: number,
        years_100_bonus_point: number,
        years_100_bonus_value: number,
        annual_reward: number,
        annual_reward_value: number,
        annual_reward_trip: string,
        total_points: number,
        total_earning: number,
        data_as_on_date: string,
        fin_yr: string,
    }

    export interface CashRewardsDetails {
        cash_rewards: string,
        painter_guid: string,
        earned: number,
        redeemed: number,
        advance: number,
        due: number,
        data_as_on_date: string,
    }

    export interface SchemeDetails {
        Scheme_Id: string,
        Scheme_Name: string,
        End_Date: string,
        Reward: string,
        Qty: number,
        Status: string
    }

    export interface NoticeDetails {
        Notice: string,
        advnc: string,
        is_accepted: string
    }

    export interface DetailsOfBusinessTab {
        reward_details: RewardDetails,
        cash_rewards: CashRewardsDetails[],
        business_details: BusinessDetails,
        scheme_details: SchemeDetails[],
        notice_details: NoticeDetails
    }
}

export const BusinessDetailsDto: I_Benefit_Details.BusinessDetails = {
    bgl_Business: "",
    bgl_Received: 0,
    bgl_Converted: 0,
    bgl_Job_Value: 0,
    bgl_Csat: 0,
    ol_Business: "",
    ol_Received: 0,
    ol_Converted: 0,
    ol_Job_Value: 0,
    ol_Csat: 0,
    tot_Business: "",
    tot_Received: 0,
    tot_Converted: 0,
    tot_Job_Value: 0,
    tot_Csat: 0,
    data_as_on_date: "",
}

export const RewardDetailsDto: I_Benefit_Details.RewardDetails = {
    welcome_dhamaka_point_q1: 0,
    sf_painter_id: "",
    sf_program_member_id: "",
    basic_point: 0,
    basic_value: 0,
    qtr1_point: 0,
    qtr1_value: 0,
    qtr2_point: 0,
    qtr2_value: 0,
    qtr3_point: 0,
    qtr3_value: 0,
    qtr4_point: 0,
    qtr4_value: 0,
    years_100_bonus_point: 0,
    years_100_bonus_value: 0,
    annual_reward: 0,
    annual_reward_value: 0,
    annual_reward_trip: "",
    total_points: 0,
    total_earning: 0,
    data_as_on_date: "",
    fin_yr: "",
    go_goa_carnival_point: 0,
    go_goa_carnival_reward: "",
    trip_name: ""
}

export const CashRewardsDetailsDto: I_Benefit_Details.CashRewardsDetails = {
    cash_rewards: "",
    painter_guid: "",
    earned: 0,
    redeemed: 0,
    advance: 0,
    due: 0,
    data_as_on_date: "",
}

export const SchemeDetailsDto: I_Benefit_Details.SchemeDetails = {
    Scheme_Id: "",
    Scheme_Name: "",
    End_Date: "",
    Reward: "",
    Qty: 0,
    Status: ""
}

export const NoticeDetailsDto: I_Benefit_Details.NoticeDetails = {
    Notice: "",
    advnc: "",
    is_accepted: 'N'
}

export const DetailsOfBusinessTabDto: I_Benefit_Details.DetailsOfBusinessTab = {
    reward_details: RewardDetailsDto,
    cash_rewards: [CashRewardsDetailsDto],
    business_details: BusinessDetailsDto,
    scheme_details: [SchemeDetailsDto],
    notice_details: NoticeDetailsDto
}

export interface InsigniaClubAnnualDetail {
    data_as_on_date: string;
    insignia_annual_volume: number;
    qualified_for_annual_reward: string;
    ticket: number;
}
export interface IConsistencyBonusDetails {
    painter_code: string;
    target_points: number;
    actual_points: number;
    pending_points: number;
    reward_value: number;
}