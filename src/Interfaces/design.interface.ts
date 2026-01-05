export declare module I_GET_DESIGNS {
    export interface Root {
        Data: Designs[];
    }

    export interface Designs {
        design_catg: string;
        design_image: string;
        design_type: string;
    }

    export interface DesignsDto {
        design_catg: any;
    }
}
