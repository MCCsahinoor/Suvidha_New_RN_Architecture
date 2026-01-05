export interface I_ALL_GET_DATA_SHADE {
    data: Datum[];
}

export interface Datum {
    shade_card_category_name: string;
    shade_card_details: ShadeCardDetail[];
}

export interface ShadeCardDetail {
    id: number;
    shade_card_name: string;
    image_url: string;
    doc_url: string;
}