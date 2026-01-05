import { I_EXPERTISE_LOV, I_SEND_BYP_DATA_SEVE, dataLov, uploadDocument } from "../Interfaces/buildYourProfile.interface";

export const processDocuments = (data: any) => {
    return data.map((item: dataLov) => {
        if (item.documents.length === 0) {
            item.documents.push({
                id: 0,
                lov_code: item.lov_code,
                img_path: "",
                new_img_uploaded_path: "",
                selected_yn: "Y",
                status: "",
                remarks: ""
            });
        } else {
            item.documents = item.documents.map((doc: uploadDocument, index: number) => ({
                ...doc,
                id: doc.id,
                lov_code: item.lov_code,
                new_img_uploaded_path: "",
            }));
        }
        return item;
    });
};


// FINAL SUBMIT DATA FORMATTER
export const buildYourProfileDataFormatter = (expertiseItem: any, buildProfileData: any, userProfileData: any) => { 
    if (expertiseItem && expertiseItem.length > 0) {

        const blankRemove = expertiseItem.map((item: any) => {
            const filteredDocuments = item.documents.filter((doc: any) => doc.img_path !== "");
            return { ...item, documents: filteredDocuments };
        }).filter((item: any) => item.documents.length > 0); 

        let tempArr: any[] = []
        const filteredData = blankRemove.map((item: any) => {
            item.documents.map((doc: any) => {
                const { status, remarks, new_img_uploaded_path, ...rest } = doc;
                tempArr.push(
                    {
                        ...rest,
                        img_path: new_img_uploaded_path ? new_img_uploaded_path : null
                    }
                );
            })
            return tempArr;
        }); 


        const data: any = {
            painter_guid: "",
            painter_code: "",
            painter_cont_id: "",
            painter_mobile: "",
            user_id: "",
            portfolio_image: userProfileData[0].user_img != buildProfileData.profileImage ? buildProfileData.profileImage : null,
            documents: tempArr
        }
        return data
    }
}

