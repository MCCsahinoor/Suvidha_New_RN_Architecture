/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const PainterKYCData = createSlice({
  name: 'PainterKYCDataSlice',
  initialState: {
    basicInformation: null,
    bankDetails: null,
    idProof: null,
    selectedTab: 'basicInformation',
    isValidate: [],
  },
  reducers: {
    setPainterKYCData: (state, action) => {
      return action.payload;
    },
  },
});

export const {setPainterKYCData} = PainterKYCData.actions;
export default PainterKYCData.reducer;
