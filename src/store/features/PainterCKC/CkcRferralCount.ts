/* eslint-disable prettier/prettier */
// import { createSlice } from '@reduxjs/toolkit';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CkcReferralList } from "../../../services/CKCRefferal/ckcRefferal.service";

interface CkcReferralMessageState {
    CkcReferralList: any[];
    error: string | null;
}

const initialState: CkcReferralMessageState = {
    CkcReferralList: [],
    error: null,
};

export const fetchCkcReferralCount = createAsyncThunk<{ data: any[] }, { page_number: number; page_length: number }>(
    'CkcReferralCount/fetchCkcReferralCount',
    async (data) => {
        const response = await CkcReferralList<any, any>(data);
        return {
            data: response.data,

        };
    }
);

const CkcReferralCount = createSlice({
    name: 'CkcReferralCount',
    initialState,
    reducers: {
        setCkcReferralData: (state, action) => {
            state.CkcReferralList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCkcReferralCount.fulfilled, (state, action) => {
            state.CkcReferralList = action.payload.data;
        });
    },
});

export const { setCkcReferralData } = CkcReferralCount.actions;
export default CkcReferralCount.reducer;