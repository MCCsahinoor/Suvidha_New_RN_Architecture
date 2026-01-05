import { createSlice } from '@reduxjs/toolkit';

const PainterCKCData = createSlice({
    name: 'PainterCKCDataSlice',
    initialState: {
        basicInformation: null,
        bankDetails: null,
        idProof: null,
        selectedTab: 'basicInformation',
        isValidate: [],
    },
    reducers: {
        setPainterCKCData: (state, action) => {
            return action.payload;
        },
    },
});

export const { setPainterCKCData } = PainterCKCData.actions;
export default PainterCKCData.reducer;
