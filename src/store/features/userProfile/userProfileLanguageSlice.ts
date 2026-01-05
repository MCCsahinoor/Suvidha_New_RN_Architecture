/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const userProfileLanguageSlice = createSlice({
  name: 'userProfileLanguageData',
  initialState: '',
  reducers: {
    setuserProfileLanguageData: (state, action) => {
      return action.payload;
    },
  },
});

export const {setuserProfileLanguageData} = userProfileLanguageSlice.actions;
export default userProfileLanguageSlice.reducer;
