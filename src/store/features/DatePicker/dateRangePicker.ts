import { createSlice } from "@reduxjs/toolkit";

const dateRangeSlice = createSlice({
    name: 'dateRangePicker',
    initialState: {
        startDate: '',
        endDate: '',
    },
    reducers: {
        setDateRangeSlice: (state, action) => {
            return action.payload
        },
    },
});

export const { setDateRangeSlice } = dateRangeSlice.actions;
export default dateRangeSlice.reducer;