/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const preferredLanguageSlice = createSlice({
  name: 'preferredLanguage',
  initialState: [],
  reducers: {
    setpreferredLanguage: (state, action) => {
      return action.payload;
    },
  },
});

export const {setpreferredLanguage} = preferredLanguageSlice.actions;
export default preferredLanguageSlice.reducer;