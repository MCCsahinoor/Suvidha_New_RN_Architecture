/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

const PageChangeSlice = createSlice({
    name: 'PageChange',
    initialState: false,
    reducers: {
        setPageChangeCall: (state, action) => {
            return action.payload;
        },
    },
});

export const { setPageChangeCall } = PageChangeSlice.actions;
export default PageChangeSlice.reducer;
