export interface I_SEND_PAINTER_WHATSAPP_VALIDATION {
    mobile_no: string,
}
export interface I_SEND_PAINTER_EMAIL_VALIDATION {
    email_id: string,
    otp: number,
}
export interface I_SEND_PAINTER_WHATSAPP_OTP_VALIDATION {
    mobile_no: string,
    otp: number,
    user_id: string,
}
export interface I_SEND_PAINTER_EMAIL_OTP_VALIDATION {
    email_id: string,
    otp: number,
}
export interface I_SUBMIT_USER_PROFILE_DATA {
    painter_guid: string,
    painter_code: string,
    painter_cont_id: string,
    painter_mobile_no: string,
    user_id: string,
    user_img: string,
    email_id: string,
    wa_ph_no: string,
    wa_valid_yn: string,
    email_valid_yn: string,
    full_addr: string,
    work_area: string,
    state: string,
    city: string,
    locality: string,
    language: string,
    team_members: teamMember[],
    email_valid_yn?: string
}
export interface teamMember {
    member_mobile_no: string;
    member_name: string;
}
