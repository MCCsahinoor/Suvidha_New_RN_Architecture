/* eslint-disable prettier/prettier */

import {createSlice} from '@reduxjs/toolkit';

const uploadProgressSlice = createSlice({
  name: 'uploadProgress',
  initialState: {
    uploadpercent: 0,
    totalSize: '',
    uploadSize: '',
    percentDeci: 0,
  },
  reducers: {
    setuploadProgress: (state, action) => {
      return action.payload;
    },
  },
});

export const {setuploadProgress} = uploadProgressSlice.actions;
export default uploadProgressSlice.reducer;
