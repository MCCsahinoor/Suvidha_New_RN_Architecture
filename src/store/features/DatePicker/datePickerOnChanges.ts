/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const datePickerOnChanges = createSlice({
  name: 'datePickerOnChangesSlice',
  initialState: '',
  reducers: {
    setdatePickerOnChanges: (state, action) => {
      return action.payload;
    },
  },
});

export const {setdatePickerOnChanges} = datePickerOnChanges.actions;
export default datePickerOnChanges.reducer;