import { createSlice } from '@reduxjs/toolkit';

const appApplicableLanguageSlice = createSlice({
    name: 'appApplicableLanguage',
    initialState: [],
    reducers: {
        setappApplicableLanguage: (state, action) => {
            return action.payload;
        },
    },
});

export const { setappApplicableLanguage } = appApplicableLanguageSlice.actions;
export default appApplicableLanguageSlice.reducer;