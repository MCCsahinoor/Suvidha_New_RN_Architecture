import { createSlice } from "@reduxjs/toolkit";

export interface I_Visit_Running_Counter {
    isVisitRunning: boolean,
    counter: number,
    details: any
}

const VisitRunningDto: I_Visit_Running_Counter = {
    isVisitRunning: false,
    counter: 0,
    details: {},
}

const holdRunningVisitSlice = createSlice({
    name: 'holdRunningVisit',
    initialState: VisitRunningDto,
    reducers: {
        setResetRunningVisit: (state, action) => {
            return action.payload;
        },

        setUpdateRunningVisit: (state, action) => {
            return action.payload;
        },

        setVisitStatus: (state, action) => {
            return action.payload;
        }
    }
});

export const { setResetRunningVisit, setUpdateRunningVisit, setVisitStatus } = holdRunningVisitSlice.actions;
export default holdRunningVisitSlice.reducer;