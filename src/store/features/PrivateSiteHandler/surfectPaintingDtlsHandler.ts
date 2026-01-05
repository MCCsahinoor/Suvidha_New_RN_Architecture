/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

const surfectPaintingDtlsHandlerSlice = createSlice({
    name: 'surfectPaintingDtlsHandler',
    initialState: [],
    reducers: {
        setSurfectPaintingDtlsHandler: (state, action) => {
            return action.payload;
        },
    },
});

export const { setSurfectPaintingDtlsHandler } = surfectPaintingDtlsHandlerSlice.actions;
export default surfectPaintingDtlsHandlerSlice.reducer;
