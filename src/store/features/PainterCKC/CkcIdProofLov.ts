/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const CkcIdProofLov = createSlice({
    name: 'CkcIdProofLovSlice',
    initialState: [],
    reducers: {
        setCkcIdProofLov: (state, action) => {
            return action.payload;
        },
    },
});

export const { setCkcIdProofLov } = CkcIdProofLov.actions;
export default CkcIdProofLov.reducer;
