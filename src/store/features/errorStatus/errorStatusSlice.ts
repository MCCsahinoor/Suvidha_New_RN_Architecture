/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const errorStatusSlice = createSlice({
    name: 'errorStatus',
    initialState: '',
    reducers: {
        setErrorStatus: (state, action) => {
            return action.payload;
        },
    },
});

export const { setErrorStatus } = errorStatusSlice.actions;
export default errorStatusSlice.reducer;
