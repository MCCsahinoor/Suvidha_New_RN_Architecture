/* eslint-disable prettier/prettier */

import {createSlice} from '@reduxjs/toolkit';

const uploadImageHandlerSlice = createSlice({
  name: 'uploadImageHandler',
  initialState: '',
  reducers: {
    setuploadImageHandler: (state, action) => {
      return action.payload;
    },
  },
});

export const {setuploadImageHandler} = uploadImageHandlerSlice.actions;
export default uploadImageHandlerSlice.reducer;
