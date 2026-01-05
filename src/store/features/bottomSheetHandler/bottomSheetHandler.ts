/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

const bottomSheetHandlerSlice = createSlice({
  name: 'bottomSheetHandler',
  initialState: {},
  reducers: {
    setbottomSheetHandler: (state, action) => {
      return action.payload;
    },
  },
});

export const { setbottomSheetHandler } = bottomSheetHandlerSlice.actions;
export default bottomSheetHandlerSlice.reducer;
