/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const appLanguageCheckData = createSlice({
    name: 'appLanguageCheckData',
    initialState: 'en',
    reducers: {
        appLanguageCheckReducer: (state, action) => {
            return action.payload;
        },
    },
});

export const { appLanguageCheckReducer } = appLanguageCheckData.actions;
export default appLanguageCheckData.reducer;