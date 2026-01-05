/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const DesignsData = createSlice({
    name: 'designsData',
    initialState: {
        Metallic: null,
        NonMetallic: null,
    },
    reducers: {
        dsignsDataReducer: (state, action) => {
            return action.payload;
        },
    },
});

export const { dsignsDataReducer } = DesignsData.actions;
export default DesignsData.reducer;
