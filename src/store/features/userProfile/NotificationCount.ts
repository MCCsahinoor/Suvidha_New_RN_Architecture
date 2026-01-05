/* eslint-disable prettier/prettier */
// import { createSlice } from '@reduxjs/toolkit';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetMessage } from "../../../services/CommonAPI/commonapi.services";

interface NotificationMessageState {
  NotificationCount: number;
  NotificationList: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NotificationMessageState = {
  NotificationCount: 0,
  NotificationList: [],
  status: 'idle',
  error: null,
};

export const fetchNotificationCount = createAsyncThunk<{ count: number; messages: any[] }, { RowOffset: number; FetchNextRows: number }>(
  'NotificationCount/fetchNotificationCount',
  async (data) => {
    const response = await GetMessage<any, any>(data);
    return {
      count: response.data.Count,
      messages: response.data.Messages,
    };
  }
);


const NotificationCount = createSlice({
  name: 'NotificationCount',
  initialState,
  reducers: {
    setNotificationData: (state, action) => {
      state.NotificationCount = action.payload.count;
      state.NotificationList = action.payload.messages;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationCount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotificationCount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.NotificationCount = action.payload.count;
        state.NotificationList = action.payload.messages;
      })
      .addCase(fetchNotificationCount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { setNotificationData } = NotificationCount.actions;
export default NotificationCount.reducer;