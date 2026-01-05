/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'datePickerSlice',
  initialState: '',
  reducers: {
    setDateSlice: (state, action) => {
      return action.payload;
    },
  },
});

export const {setDateSlice} = dateSlice.actions;
export default dateSlice.reducer;
