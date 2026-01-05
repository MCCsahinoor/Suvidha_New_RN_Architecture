/* eslint-disable prettier/prettier */
export declare module I_GET_LANGUAGE {
  export interface Root {
    data: LangList[];
  }

  export interface LangList {
    lang_code: string;
    lang_desc: string;
    lang_translated_desc: string;
    default_yn: string;
    isSelected: boolean;
  }
}
export interface I_SEND_FOR_LANGUAGE {
  user_id: string;
  lang_code: string;
}
export interface I_GET_FOR_LANGUAGE_SET {
  response_code: number;
  response_message: string;
}

export declare module DELETE_LOV_ALL {

  export interface RootDeleteLOV {
    data: DELETE_ACCOUNT_LOV;
  }

  export interface DELETE_ACCOUNT_LOV {
    lov_value: string
  }

}
