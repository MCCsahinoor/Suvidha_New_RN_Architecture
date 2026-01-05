export interface I_HELP_DESK {
  toll_free_number: string;
  Representative: I_REPRESENTATIVE[];
}

export interface I_REPRESENTATIVE {
  grp: string;
  usp_name: string;
  usp_desig: string;
  usp_mailid: string;
  usp_mobile: string;
  usp_group_code: string;
  usp_image_base64: string;
}
