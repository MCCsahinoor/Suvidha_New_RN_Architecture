/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

const scanTokentHandlerSlice = createSlice({
    name: 'ScanTokentHandler',
    initialState: {
        scanType: '',
        scanData: ''
    },
    reducers: {
        setScanTokentHandler: (state, action) => {
            return action.payload;
        },
    },
});

export const { setScanTokentHandler } = scanTokentHandlerSlice.actions;
export default scanTokentHandlerSlice.reducer;