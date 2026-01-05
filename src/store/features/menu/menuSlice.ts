/* eslint-disable prettier/prettier */
// import {createSlice} from '@reduxjs/toolkit';

// const menuSlice = createSlice({
//   name: 'menuData',
//   initialState: [],
//   reducers: {
//     setData: (state, action) => {
//       return action.payload;
//     },
//   },
// });

// export const {setData} = menuSlice.actions;
// export default menuSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetUserApplicableMenu } from '../../../services/Menu/Menu.services';
import { setPullToRefresh } from './pullToRefresh';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

interface MenuDataState {
  siteMenuData: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MenuDataState = {
  siteMenuData: [],
  status: 'idle',
  error: null,
};

export const fetchMenuData = createAsyncThunk<any[], void>('menuData/fetchMenuData',
  async () => {
    const response = await GetUserApplicableMenu<any, any>();
    return response.data;
  }
);

const menuSlice = createSlice({
  name: 'menuData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.siteMenuData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.siteMenuData = action.payload;
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { setData } = menuSlice.actions;
export default menuSlice.reducer;

