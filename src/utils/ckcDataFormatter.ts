import { I_REDUX_CKC_DATA, I_SUBMIT_USER_CKC } from "../Interfaces/ckc.interface";


export const ckcUserProfileDataFormatterForIdProof = (ckcdata: any) => {
    if (ckcdata && ckcdata.length > 0) {
        const tempfilteredIdProofData = ckcdata.map((element: any) => {
            const data = {
                ...element,
                docFileName: element.doc_path,
                docName: element.doc_desc,
                prev_url: null
            };

            const { web_path, seq, otp_yn, d_doc_unique_no, doc_desc, ...rest } = data;
            return rest;
        });

        return tempfilteredIdProofData;
    }

};



// *********** WHEN SUBMIT FINAL SUBMIT START *********** //
export const ckcDataFormatter = (ckcdata: I_REDUX_CKC_DATA.REDUX_CKC_DATA) => {
    let tempfilteredIdProofData = null;
    if (ckcdata.idProof) {
        // CHECK if doc_path & doc_unique_no is blank then object remove from array
        const blankRemove = ckcdata.idProof.filter((item: I_REDUX_CKC_DATA.IDProof) =>
            item.doc_path !== '' && item.doc_unique_no !== '',
        );

        // on submit API all unused key remove 
        tempfilteredIdProofData = blankRemove.map((element: any) => {
            const { docFileName, docName, d_doc_unique_no, doc_desc, otp_yn, seq, web_path, prev_url, ...rest } = element;
            return {
                ...rest,
                doc_path: prev_url
            };
        });
    } else {
        tempfilteredIdProofData = null;
    }

    const data: I_SUBMIT_USER_CKC.CKC_DATA = {
        first_name: ckcdata.basicInformation.first_name,
        last_name: ckcdata.basicInformation.last_name,
        pincode: ckcdata.basicInformation.pincode,
        mobile: ckcdata.basicInformation.mobile,
        preferred_language: ckcdata.basicInformation.preferred_language,
        competition_point: ckcdata.basicInformation.competition_point,
        bank_name: ckcdata.bankDetails.bank_name,
        branch_name: ckcdata.bankDetails.branch_name,
        ifsc_code: ckcdata.bankDetails.ifsc_code,
        acc_no: ckcdata.bankDetails.acc_no,
        acc_type: ckcdata.bankDetails.acc_type,
        acc_img: ckcdata.bankDetails.acc_img,
        painter_guid: '',
        painter_code: '',
        painter_cont_id: '',
        user_id: '',
        app: 'SUVIDHA',
        ckc_referral_documents: tempfilteredIdProofData,
        competition_proof_img: ckcdata.basicInformation.competition_proof_img

    };
    return data;
};
// *********** WHEN SUBMIT FINAL SUBMIT END *********** //