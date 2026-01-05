import { createSlice } from '@reduxjs/toolkit';

const categoriesDetailsHandlerSlice = createSlice({
    name: 'categoriesDetailsHandler',
    initialState: [],
    reducers: {
        setcategoriesDetailsHandler: (state, action) => {
            return action.payload;
        },
    },
});

export const { setcategoriesDetailsHandler } = categoriesDetailsHandlerSlice.actions;
export default categoriesDetailsHandlerSlice.reducer;