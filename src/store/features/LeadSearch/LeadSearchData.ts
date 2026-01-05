/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

const LeadSearchHandlerSlice = createSlice({
    name: 'LeadSearchHandler',
    initialState: null,
    reducers: {
        setLeadSearchHandler: (state, action) => {
            return action.payload;
        },
    },
});

export const { setLeadSearchHandler } = LeadSearchHandlerSlice.actions;
export default LeadSearchHandlerSlice.reducer;