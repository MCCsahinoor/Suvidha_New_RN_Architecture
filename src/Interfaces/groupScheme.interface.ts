export module I_Scheme_Details {

    export interface Data {
        ps_scheme_id: number
        ps_scheme_name: string
        ps_scheme_from: string
        ps_scheme_to: string
        ps_min_grp_size: number
        ps_max_grp_size: number
        pending_activities: number
        group_creation_allowed_yn: boolean
        groups: Group[]
    }

    export interface Group {
        psgm_desc: string
        psgm_name: string
        psgm_id: number
        invitation_acceptance_allow_yn: string
        members: Member[]
    }

    export interface Member {
        member_name: string
        member_img: any
        psgp_grp_id: number
        is_owner_yn: string
    }
};

export module I_Scheme_List {
    export interface Data {
        can_invite: boolean
        invitation_status: string
        member: Member[]
        pending_invites: number
        ps_max_grp_size: number
        ps_min_grp_size: number
        ps_scheme_from: string
        ps_scheme_id: number
        ps_scheme_name: string
        ps_scheme_to: string
    }

    export interface Member {
        painter_img: string
        painter_name: string
        psgm_scheme_id: number
    }
}

export module I_Scheme_Grp_Details {
    export interface Data {
        ps_scheme_name: string
        psgm_name: string
        psgm_desc: string
        ps_scheme_from: string
        ps_scheme_to: string
        ps_min_grp_size: number
        ps_max_grp_size: number
        pending_activities: number
        members: Member[]
    }

    export interface Member {
        psgp_painter_guid: string
        psgp_grp_id: number
        painter_name: string
        painter_mobile: string
        pph_user_img: any
        status: string
        acceptance_allow_yn: string
    }

    export interface PainterDetailsByContact {
        painter_guid: string,
        painter_mobile: string,
        painter_name: string
    }
}
