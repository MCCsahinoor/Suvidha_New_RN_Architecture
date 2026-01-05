export declare module I_GET_DOC {
    export interface Root {
        Data: DocList;
    }

    export interface DocList {
        length: number;
        sd_description: string;
        sd_doc_file: string;
        sd_image_file: string;
        sd_title: string;
    }
}
