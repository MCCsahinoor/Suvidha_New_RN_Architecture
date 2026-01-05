/* eslint-disable prettier/prettier */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetPendingAcceptLead } from '../../../services/LeadsInfo/leadsInfo.service';

interface leadsPendingState {
    pendingLeads: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: leadsPendingState = {
    pendingLeads: [],
    status: 'idle',
    error: null,
};

export const fetchLeadsPending = createAsyncThunk<any[], void>('leadsPendingHandler/fetchLeadsPending',
    async () => {
        const response = await GetPendingAcceptLead<any, any>();
        return response.Data;
    }
);

const leadsPendingHandlerSlice = createSlice({
    name: 'leadsPendingHandler',
    initialState,
    reducers: {
        setleadsPendingHandler: (state, action) => {
            state.pendingLeads = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeadsPending.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLeadsPending.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.pendingLeads = action.payload;
            })
            .addCase(fetchLeadsPending.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export const { setleadsPendingHandler } = leadsPendingHandlerSlice.actions;
export default leadsPendingHandlerSlice.reducer;