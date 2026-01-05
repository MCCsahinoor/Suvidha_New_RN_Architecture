export interface I_HOME_BANNER_GET {
    data: BannerList[];
}

export interface BannerList {
    id: number;
    title: string;
    desc: string;
    image_url: string;
    sequence: number;
    active_yn: string;
}