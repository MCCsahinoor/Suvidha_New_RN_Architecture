export declare module I_CATEGORIES_LIST {
    export interface CategoryList {
        data: Category[];
    }

    export interface Category {
        id: string;
        name: string;
        description: string;
        images: Image[];
        is_node: boolean;
        active: Active;
        sort_order: number;
        child: Category[];
        config_applicable_depot: ConfigApplicableDepot[];
        actual_applicable_depot: ActualApplicableDepot[];
        search_filters: string[];
        isSelected: boolean
    }

    export enum Active {
        Y = "Y",
    }

    export interface ActualApplicableDepot {
        depot_regn: any;
        depot_code: string;
        depot_name: string;
        user_group: any;
    }

    export interface ConfigApplicableDepot {
        depot_regn: string;
        depot_user_group: DepotUserGroup[];
    }

    export interface DepotUserGroup {
        depot_code: string;
        depot_name: string;
        user_group: any[];
    }

    export interface Image {
        url: string;
        caption: null | string;
        seq: number;
        doc_name: string;
    }

}

export declare module I_BRANDS_LIST {
    export interface BrandsList {
        data: Brands[];
    }

    export interface Brands {
        id: string
        brand_name: string
        brand_alias: string
        prd_type: string
        prd_type_desc: string
        brand_type: string
        brand_type_desc: string
        brand_short_desc: string
        brand_usp: any[]
        brand_media: BrandMedia[]
        brand_metafields: BrandMetafield[]
        brand_categories: string[]
        brand_sort_order: number
        brand_avg_price: number
        brand_rating: number
        brand_rating_count: number
        brand_review_count: number
        published: boolean
        active: string
        isSelected?: boolean
    }

    export interface ColorShade {
        backgroundColor: string,
        key: string,
        shade_card_desc: string,
        shade_card_id: number,
        shade_code: string,
        shade_color_b: number,
        shade_color_g: number,
        shade_color_r: number,
        shade_name: string,
        shade_type: string
    }

    export interface BrandMedia {
        type: string
        url: string
    }

    export interface BrandMetafield {
        id: string
        name: string
        alias: string
        desc: string
        value: string
        value_obj: any
        has_html_value: any
        uom: any
        field_type: any
        field_data_type: any
        sequence: number
        image: any
    }
}
export module I_GET_CATEGORY_LIST_NORMAL_ORDER {
    export interface I_GET_CAT_RESPONSE {
        data: Category[];
    }
    export interface All_Filterable_Meta {
        filter_id: string;
        filter_name: string;
        filter_desc: null;
        filter_image_url: null | string;
        filter_image_name: string | null;
        filter_seq: null;
        filter_values: FilterValue[];
    }

    export interface FilterValue {
        img_url: null | string;
        img_name: string | null;
        value: string;
        brand_count: number;
        isChecked: boolean;
    }

    export interface SearchFilter {
        id: string;
        name: string;
        alias: string;
        description: null;
        image: SearchFilterImage[];
        product_type: string;
        fieldtype: string;
        field_value: string[];
        uom: string;
        data_type: string;
        range: boolean;
        from_range: number;
        to_range: number;
        created_user: string;
        created_date: Date;
        modified_user: null;
        modified_date: null;
        deleted_user: null;
        deleted_date: null;
        active: string;
        can_compare: boolean;
        can_filter: boolean;
        mandatory: boolean;
        is_update: boolean;
    }

    export interface SearchFilterImage {
        type: string;
        url: string;
        file_name: string;
        container: string;
        seq: number;
        action: string;
    }

    export interface Category {
        id: string;
        name: string;
        description: string;
        images: Image[];
        is_node: boolean;
        active: string;
        sort_order: number;
        child: Category[];
        config_applicable_depot: null;
        actual_applicable_depot: ActualApplicableDepot[];
        search_filters: string[] | All_Filterable_Meta[] | null;
        isExpanded: boolean;
        parentTree: any;
        parentNodes: any;
    }

    export interface ActualApplicableDepot {
        depot_regn: string | null;
        depot_code: string;
        depot_name: string;
        user_group: string | null;
    }

    export interface Image {
        url: string;
        caption: string;
        seq: number;
        doc_name: string;
    }
}
export interface I_Product_list_Search_History {
    filter: I_Filter_Value[];
    selectedCategory: I_GET_CATEGORY_LIST_NORMAL_ORDER.Category;
    selectedSort: I_LOV_DATA_SORT_BY.Lov | '';
    breadCrumb: any;
    catId: string;
}
export interface I_Filter_Value {
    id: string;
    value: string;
}
export module I_LOV_DATA_SORT_BY {
    export interface Lov {
        lov_type: string;
        lov_code: string;
        lov_value: string;
        lov_shrt_desc: string;
        lov_seq: string;
        lov_field1_value: string;
        lov_field2_value: string;
        lov_field3_value: string;
        created_user?: string;
        created_date?: Date;
        modified_user?: string;
        modified_date?: null;
        deleted_user?: string;
        deleted_date?: null;
        active?: string;
    }
}
export module I_PRODUCT_LIST {
    /************ [Search ] ******** */
    export interface ISearchProductList {
        keyword: string;
        sort_by: string;
        category: string;
        site_id: string;
        search_filters: SearchFilter[];
    }
    export interface SearchFilter {
        id: string;
        value: string;
    }

    /************ [ Get ] ******** */

    export interface IGETProductList {
        id: string;
        brand_name: string;
        brand_alias: string;
        prd_type: string;
        prd_type_desc: string;
        brand_type: string;
        brand_type_desc: string;
        brand_media: BrandMedia[];
        brand_metafields: BrandMetafield[];
        brand_categories: string[];
        brand_sort_order: number;
        brand_avg_price: number;
        brand_rating: number;
        brand_rating_count: number;
        brand_review_count: number;
        published: boolean;
        brand_short_desc: string;
        brand_usp: string[];
        active: string;
    }

    export interface BrandMedia {
        type: string;
        url: string;
    }

    export interface BrandMetafield {
        id: string;
        name: string;
        alias: string;
        desc: string;
        value: null | string;
        sequence: number;
        image: null;
    }
}

export module I_SINGLE_PRODUCT_DETAILS {
    export interface IGETSINGLEProductList {
        id: string;
        brand_name: string;
        brand_alias: string;
        brand_desc: string;
        b2b_brand_desc: string;
        brand_short_desc: string;
        brand_type: string;
        prd_type: string;
        brand_media: BrandMedia[];
        brand_categories: string[];
        published: boolean;
        brand_usp: string[];
        brand_sort_order: number;
        brand_avg_price: number;
        brand_rating: number;
        brand_rating_count: number;
        brand_review_count: number;
        downloadables: BrandMedia[];
        brand_metafields: BrandMetafield[];
        product_codes: ProductCode[];
        config_sku_codes: SkuCode[];
        actual_sku_codes: SkuCode[];
        config_applicable_depot: ConfigApplicableDepot[];
        actual_applicable_depot: ActualApplicableDepot[];
        cross_selling_brands: string[];
        up_selling_brands: string[];
        is_update: boolean;
        created_user: string;
        created_date: Date;
        modified_user: string;
        modified_date: Date;
        deleted_user: null;
        deleted_date: null;
        active: string;
    }

    export interface ActualApplicableDepot {
        depot_regn?: null;
        depot_code: string;
        depot_name: string;
        user_group: string[] | null;
    }

    export interface SkuCode {
        sku_code: string;
        sku_desc: string;
    }

    export interface BrandMedia {
        type: string;
        url: any;
        file_name: string;
        seq: number;
        desc?: string;
    }

    export interface BrandMetafield {
        id: string;
        name: string;
        alias: string;
        desc: string;
        value: string;
        sequence: number;
        image: Image[];
        uom: string;
        value_obj: ValueObject;
    }
    export interface ValueObject {
        img_url: string;
        img_name: string;
        value: string;
        uom: any;
    }

    export interface Image {
        type: string;
        url: string;
        file_name: string;
        container: null | string;
        seq: number | null;
        action: string;
    }

    export interface ConfigApplicableDepot {
        depot_regn: string;
        depot_user_group: ActualApplicableDepot[];
    }

    export interface ProductCode {
        product_code: string;
        product_desc: string;
        product_sub_type: string;
    }
}


export module I_LOV_DATA_SORT_BY {
    export interface Lov {
        lov_type: string;
        lov_code: string;
        lov_value: string;
        lov_shrt_desc: string;
        lov_seq: string;
        lov_field1_value: string;
        lov_field2_value: string;
        lov_field3_value: string;
        created_user?: string;
        created_date?: Date;
        modified_user?: string;
        modified_date?: null;
        deleted_user?: string;
        deleted_date?: null;
        active?: string;
    }
}