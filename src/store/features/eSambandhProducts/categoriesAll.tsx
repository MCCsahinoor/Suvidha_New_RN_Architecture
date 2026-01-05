import { createSlice } from '@reduxjs/toolkit';

const categoriesHandlerSlice = createSlice({
    name: 'categoriesHandler',
    initialState: [],
    reducers: {
        setcategoriesHandler: (state, action) => {
            return action.payload;
        },
    },
});

export const { setcategoriesHandler } = categoriesHandlerSlice.actions;
export default categoriesHandlerSlice.reducer;