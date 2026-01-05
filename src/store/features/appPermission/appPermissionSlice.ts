/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

const appPErmissionSlice = createSlice({
    name: 'appPermission',
    initialState: false,
    reducers: {
        setPermission: (state, action) => {
            return action.payload;
        },
    },
});

export const { setPermission } = appPErmissionSlice.actions;
export default appPErmissionSlice.reducer;
