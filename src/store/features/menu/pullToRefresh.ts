import { createSlice } from "@reduxjs/toolkit";

const pullToRefreshSlice = createSlice({
    name: 'pullToRefresh',
    initialState: {},
    reducers: {
        setPullToRefresh: (state, action) => {
            return action.payload;
        },
    },
});

export const { setPullToRefresh } = pullToRefreshSlice.actions;
export default pullToRefreshSlice.reducer;
