import { createSlice } from '@reduxjs/toolkit';

const uploadProfileImageSlice = createSlice({
    name: 'uploadProfileImage',
    initialState: '',
    reducers: {
        setUploadProfileImage: (state, action) => action.payload,
        resetUploadProfileImage: () => '',
    },
});

export const { setUploadProfileImage, resetUploadProfileImage } = uploadProfileImageSlice.actions;
export default uploadProfileImageSlice.reducer;