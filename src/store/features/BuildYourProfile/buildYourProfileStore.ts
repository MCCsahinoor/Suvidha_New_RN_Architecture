import { createSlice } from '@reduxjs/toolkit';

const buildYourProfileData = createSlice({
    name: 'buildYourProfileDataSlice',
    initialState: {
        profileImage: null,
        generalInformation: null,
        expertise: null,
        selectedTab: 'profileImage',
        isValidate: [],
    },
    reducers: {
        setbuildYourProfileData: (state, action) => {
            return action.payload;
        },
    },
});

export const { setbuildYourProfileData } = buildYourProfileData.actions;
export default buildYourProfileData.reducer;