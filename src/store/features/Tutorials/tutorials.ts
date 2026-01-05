/* eslint-disable prettier/prettier */
// import { createSlice } from '@reduxjs/toolkit';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Tutorials } from "../../../services/Tutorials/tutorials.services";
import { setPullToRefresh } from "../menu/pullToRefresh";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

// const TutorialsData = createSlice({
//     name: 'TutorialsData',
//     initialState: {
//         product_tutorial: null,
//         app_tutorial: null,
//     },
//     reducers: {
//         tutorialsDataReducer: (state, action) => {
//             return action.payload;
//         },
//     },
// });

// export const { tutorialsDataReducer } = TutorialsData.actions;
// export default TutorialsData.reducer;


interface TutorialsDetailsState {
    product_tutorial: any;
    app_tutorial: any
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


const initialState: TutorialsDetailsState = {
    product_tutorial: null,
    app_tutorial: null,
    status: 'idle',
    error: null,
};

export const fetchTutorials = createAsyncThunk<any, void>('tutorials/fetchTutorials',
    async () => {
        // const dispatch: AppDispatch = useDispatch();
        const response = await Tutorials<any, any>();
        const product_tutorial = response.data.filter((item: any) => item.category === 'product_tutorial');
        const app_tutorial = response.data.filter((item: any) => item.category === 'app_tutorial');
        // dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: false }));
        return {
            product: product_tutorial,
            app: app_tutorial
        };
    }
);

const TutorialsData = createSlice({
    name: 'TutorialsData',
    initialState,
    reducers: {
        tutorialsDataReducer: (state, action) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTutorials.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTutorials.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.product_tutorial = action.payload.product;
                state.app_tutorial = action.payload.app
            })
            .addCase(fetchTutorials.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export const { tutorialsDataReducer } = TutorialsData.actions;
export default TutorialsData.reducer;