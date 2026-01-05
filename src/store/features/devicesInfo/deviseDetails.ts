/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const deviceInfoData = createSlice({
    name: 'deviceInfoData',
    initialState: {},
    reducers: {
        deviceInfoDataReducer: (state, action) => {
            return action.payload;
        },
    },
});

export const { deviceInfoDataReducer } = deviceInfoData.actions;
export default deviceInfoData.reducer;