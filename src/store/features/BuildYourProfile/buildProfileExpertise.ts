import { createSlice } from '@reduxjs/toolkit';

const buildProfileExpertiseData = createSlice({
    name: 'buildProfileExpertiseDataSlice',
    initialState: [],
    reducers: {
        setbuildProfileExpertiseData: (state, action) => {
            return action.payload;
        },
    },
});

export const { setbuildProfileExpertiseData } = buildProfileExpertiseData.actions;
export default buildProfileExpertiseData.reducer;