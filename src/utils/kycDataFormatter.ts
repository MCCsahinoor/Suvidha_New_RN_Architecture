import {I_REDUX_KYC_DATA, I_SUBMIT_USER_KYC} from '../Interfaces/kyc.interface';

export const kycUserProfileDataFormatterForIdProof = (kycdata: any) => { 
  if (kycdata && kycdata.length > 0) {
    const tempfilteredIdProofData = kycdata.map((element: any) => {
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
export const kycDataFormatter = (kycdata: I_REDUX_KYC_DATA.REDUX_KYC_DATA) => { 
  let tempfilteredIdProofData = null;
  if (kycdata.idProof) {
    // CHECK if doc_path & doc_unique_no is blank then object remove from array
    const blankRemove = kycdata.idProof.filter((item: I_REDUX_KYC_DATA.IDProof) =>
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

  const data: I_SUBMIT_USER_KYC.KYC_DATA = {
    painter_guid: '',
    painter_code: '',
    painter_cont_id: '',
    painter_mobile_no: kycdata.basicInformation.painter_mobile,
    user_id: '',
    painter_name: kycdata.basicInformation.painter_name,
    email: kycdata.basicInformation.email,
    alternate_mobile: kycdata.basicInformation.alternate_mobile,
    dob: kycdata.basicInformation.dob,
    bank_name: kycdata.bankDetails.bank_name,
    branch_name: kycdata.bankDetails.branch_name,
    ifsc_code: kycdata.bankDetails.ifsc_code,
    acc_no: kycdata.bankDetails.acc_no,
    acc_type: kycdata.bankDetails.acc_type,
    acc_img: kycdata.bankDetails.acc_img,
    app: 'SUVIDHA',
    wa_ph_no: kycdata.basicInformation.wa_ph_no,
    painter_documents: tempfilteredIdProofData,
  };
  return data;
};
// *********** WHEN SUBMIT FINAL SUBMIT END *********** //