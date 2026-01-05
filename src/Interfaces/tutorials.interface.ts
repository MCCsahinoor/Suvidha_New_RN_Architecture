export interface I_TUTORIAL_DATA_ALL {
    data: I_Tutorials[];
    response_code: number;
    response_message: string;
}

export interface I_Tutorials {
    id: number;
    category: string;
    title: string;
    description: null;
    doc_link: string;
    doc_type: string;
}