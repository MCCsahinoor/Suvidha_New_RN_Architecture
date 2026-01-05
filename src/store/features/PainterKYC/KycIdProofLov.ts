/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const KycIdProofLov = createSlice({
  name: 'KycIdProofLovSlice',
  initialState: [],
  reducers: {
    setKycIdProofLov: (state, action) => {
      return action.payload;
    },
  },
});

export const {setKycIdProofLov} = KycIdProofLov.actions;
export default KycIdProofLov.reducer;
