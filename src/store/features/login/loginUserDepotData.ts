/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

const userApplicableDepotCodeHandlerSlice = createSlice({
    name: 'userApplicableDepotCodeHandler',
    initialState: '',
    reducers: {
        setuserApplicableDepotCodeHandler: (state, action) => {
            return action.payload;
        },
    },
});

export const { setuserApplicableDepotCodeHandler } = userApplicableDepotCodeHandlerSlice.actions;
export default userApplicableDepotCodeHandlerSlice.reducer;