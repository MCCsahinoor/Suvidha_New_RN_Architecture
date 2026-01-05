/* eslint-disable prettier/prettier */
// import { createSlice } from '@reduxjs/toolkit';

// const quickLinksSlice = createSlice({
//     name: 'quickLinksData',
//     initialState: [],
//     reducers: {
//         setQuickLinks: (state, action) => {
//             return action.payload;
//         },
//     },
// });

// export const { setQuickLinks } = quickLinksSlice.actions;
// export default quickLinksSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { QuickLinksMenu } from '../../../services/Menu/Menu.services';
import { I_GET_QUICK_LINKS, I_quick_links_data } from '../../../Interfaces/menuData.interface';
import { setPullToRefresh } from './pullToRefresh';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

interface QuiclLinksState {
    quickLinks: I_quick_links_data[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: QuiclLinksState = {
    quickLinks: [],
    status: 'idle',
    error: null,
};

export const fetchQuickLinksData = createAsyncThunk<I_quick_links_data[], void>('quickLinksData/fetchQuickLinksData',
    async () => {
        // const dispatch: AppDispatch = useDispatch();
        const response = await QuickLinksMenu<any, I_GET_QUICK_LINKS>();
        // dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: false }));
        return response.data;
    }
);

const quickLinksSlice = createSlice({
    name: 'quickLinksData',
    initialState,
    reducers: {
        setQuickLinks: (state, action) => {
            state.quickLinks = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuickLinksData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchQuickLinksData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.quickLinks = action.payload;
            })
            .addCase(fetchQuickLinksData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export const { setQuickLinks } = quickLinksSlice.actions;
export default quickLinksSlice.reducer;
