/* eslint-disable prettier/prettier */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { I_HOME_BANNER_GET, BannerList } from '../../../Interfaces/home.interface';
import { getBannerList } from '../../../services/Banner/banner.services';
import { setPullToRefresh } from '../menu/pullToRefresh';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

interface BannerState {
    banners: BannerList[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: BannerState = {
    banners: [],
    status: 'idle',
    error: null,
};

export const fetchBannerList = createAsyncThunk<BannerList[], void>('bannerHandler/fetchBannerList',
    async () => {
        // const dispatch: AppDispatch = useDispatch();
        const response = await getBannerList<any, I_HOME_BANNER_GET>();
        // dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: false }));
        return response.data;
    }
);

const bannerHandlerSlice = createSlice({
    name: 'bannerHandler',
    initialState,
    reducers: {
        setBannerHandler: (state, action) => {
            state.banners = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBannerList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBannerList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.banners = action.payload;
            })
            .addCase(fetchBannerList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export const { setBannerHandler } = bannerHandlerSlice.actions;
export default bannerHandlerSlice.reducer;
