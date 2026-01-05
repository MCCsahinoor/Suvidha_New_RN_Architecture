/* eslint-disable prettier/prettier */
export module I_GET_MENU {
  export interface Root {
    data: MenuList[];
  }

  export interface MenuList {
    id: number;
    menu_name: string;
    sequence: number;
    icon: string;
    icon_img_yn: string;
    web_link: string;
    mobile_link: string;
    isCollapse: boolean
    child_menu: ChildMenu[];
    isParent: boolean;
  }

  export interface ChildMenu {
    id: number;
    menu_name: string;
    sequence: number;
    icon: string;
    icon_img_yn: string;
    web_link: string;
    mobile_link: string;
    isCollapse: boolean
    child_menu: ChildMenu[];
  }
}


export interface I_GET_QUICK_LINKS {
  data: I_quick_links_data[];
}

export interface I_quick_links_data {
  id: number;
  menu_name: string;
  sequence: number;
  icon: string;
  web_link: string;
  mobile_link: string;
}
