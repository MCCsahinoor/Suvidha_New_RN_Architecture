/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const executiveLoginCheckData = createSlice({
    name: 'executiveLoginCheckData',
    initialState: {
        IsRepresentative: '',
        UserGroupCode: ''
    },
    reducers: {
        executiveLoginCheckReducer: (state, action) => {
            return action.payload;
        },
    },
});

export const { executiveLoginCheckReducer } = executiveLoginCheckData.actions;
export default executiveLoginCheckData.reducer;