export declare module I_Training_List {

    export interface Data {
        apm_activity_id: number;
        apd_activity_date: string;
        m_desc: string;
        academy_name: string;
        city: string;
        batch_capacity: number;
        set_availablity: number;
    }
}

export declare module I_Training_Details {
    export interface Data {
        apm_activity_id: number;
        m_desc: string;
        academy_name: string;
        total_capacity: number;
        participant_count: number;
        apd_activity_date: string;
        block_submit: string;
        user_seat_no: number;
        SeatStatus: SeatStatus[]
    }

    export interface SeatStatus {
        seat_no: number;
        booked_yn: string;
        isSelected: boolean
    }
}

export declare module I_Training_Confirmation {
    export interface Data {
        apd_activity_date: string;
        academy_name: string;
        m_desc: string;
        city: string, seat_no: string
    }
}

export declare module I_Training_History {
    export interface Data {
        painter_code: string,
        apt_activity_id: number,
        apt_trainee_srl: number,
        ad_attendance_srl: number,
        academy_name: string,
        m_desc: string,
        district_name: string,
        oracle_state_name: string,
        created_date: string,
        certified_yn: string
    }
}