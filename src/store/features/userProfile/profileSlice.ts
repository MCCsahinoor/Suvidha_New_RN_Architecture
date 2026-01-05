/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profileData',
  initialState: [],
  reducers: {
    setProfileData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;
