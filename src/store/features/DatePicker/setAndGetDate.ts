/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const setAndGetDateSlice = createSlice({
  name: 'setAndGetDate',
  initialState: { setDateValue: '', getDateValue: '' },
  reducers: {
    setsetAndGetDate: (state, action) => {
      console.log('setsetAndGetDate state', state);

      console.log('setsetAndGetDate action', action);

      return action.payload;
    },
  },
});

export const { setsetAndGetDate } = setAndGetDateSlice.actions;
export default setAndGetDateSlice.reducer;
