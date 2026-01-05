/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

const CompleteLeadSearchHandlerSlice = createSlice({
    name: 'CompleteLeadSearchHandler',
    initialState: null,
    reducers: {
        setCompleteLeadSearchHandler: (state, action) => {
            return action.payload;
        },
    },
});

export const { setCompleteLeadSearchHandler } = CompleteLeadSearchHandlerSlice.actions;
export default CompleteLeadSearchHandlerSlice.reducer;