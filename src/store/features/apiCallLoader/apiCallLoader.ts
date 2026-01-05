/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

const apiCallLoaderSlice = createSlice({
    name: 'apiCallLoader',
    initialState: false,
    reducers: {
        setApiCallLoader: (state, action) => {
            return action.payload;
        },
    },
});

export const { setApiCallLoader } = apiCallLoaderSlice.actions;
export default apiCallLoaderSlice.reducer;
