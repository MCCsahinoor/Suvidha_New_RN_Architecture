/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

const userImgCardHandlerSlice = createSlice({
    name: 'userImgCardHandler',
    initialState: {},
    reducers: {
        setUserImgCardHandler: (state, action) => {
            return action.payload;
        },
    },
});

export const { setUserImgCardHandler } = userImgCardHandlerSlice.actions;
export default userImgCardHandlerSlice.reducer;
