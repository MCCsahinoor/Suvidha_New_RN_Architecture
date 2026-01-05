import { createSlice } from '@reduxjs/toolkit';

const virtualUserSlice = createSlice({
    name: 'virtualUserData',
    initialState: null,
    reducers: {
        setvirtualUserData: (state, action) => {
            return action.payload;
        },
    },
});

export const { setvirtualUserData } = virtualUserSlice.actions;
export default virtualUserSlice.reducer;