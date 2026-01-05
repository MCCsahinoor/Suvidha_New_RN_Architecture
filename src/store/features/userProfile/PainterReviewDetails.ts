import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetCsatReviewList } from "../../../services/Profile/Profile.services";

interface PainterReviewState {
    ReviewCount: number;
    ReviewMessages: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: PainterReviewState = {
    ReviewCount: 0,
    ReviewMessages: [],
    status: 'idle',
    error: null,
};


export const fetchPainterReview = createAsyncThunk<{ count: number; messages: any[] }, { leadType: string; filter: string; row_cout: number; fetch_next_rows: number; }>(
    'PainterReviewDetails/fetchPainterReview',
    async (data) => {
        const response = await GetCsatReviewList<any, any>(data);
        return {
            count: response.data.TotalRowCount,
            messages: response.data.csat_review,
        };
    }
);


const PainterReviewDetails = createSlice({
    name: 'PainterReviewDetails',
    initialState,
    reducers: {
        setPainterReviewData: (state, action) => {
            state.ReviewCount = action.payload.count;
            state.ReviewMessages = action.payload.messages;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPainterReview.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPainterReview.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ReviewCount = action.payload.count;
                state.ReviewMessages = action.payload.messages;
            })
            .addCase(fetchPainterReview.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export const { setPainterReviewData } = PainterReviewDetails.actions;
export default PainterReviewDetails.reducer;