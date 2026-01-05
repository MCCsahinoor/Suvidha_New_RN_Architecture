/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetBusinessDetails } from "../../../services/BusinessDetails/businessDetails.service";
import { ddmmyyyConverter } from "../../../utils/formatDate";
// import { setPullToRefresh } from "../menu/pullToRefresh";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../app/store";
interface BusinessDetailsState {
    BusinessDetails: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


const initialState: BusinessDetailsState = {
    BusinessDetails: {},
    status: 'idle',
    error: null,
};

export const fetchBusinessDetails = createAsyncThunk<any, void>('businessDetails/fetchBusinessDetails',
    async () => {
        // const dispatch: AppDispatch = useDispatch();
        const response = await GetBusinessDetails<any, any>();

        if (response.data.reward_details != null && response.data.reward_details != undefined && response.data.reward_details.total_earning) {
            // console.log("HOme Page API CAll")
            let landWdata = {
                cash_rewards: 'Lift & Win',
                painter_guid: response.data.cash_rewards[0].painter_guid,
                earned: response.data.reward_details.total_earning,
                redeemed: 0,
                advance: response.data?.notice_details && response.data?.notice_details != null && response.data?.notice_details?.advnc ? response.data.notice_details.advnc : '0',
                due: 0
            }
            response.data.cash_rewards.push(landWdata)
        }

        //CALCULATING TOTAL CASH REWARD DETAILS
        response.data.cast_reward_total = {
            earned: 0,
            redeemed: 0,
            advance: 0,
            due: 0
        }
        response.data.cash_rewards.map((item: any) => {
            if (item.earned != null && item.earned != '' && item.earned != undefined) {
                response.data.cast_reward_total.earned = parseFloat(response.data.cast_reward_total.earned) + parseFloat(item.earned)
            }
            if (item.redeemed != null && item.redeemed != '' && item.redeemed != undefined) {
                response.data.cast_reward_total.redeemed = parseFloat(response.data.cast_reward_total.redeemed) + parseFloat(item.redeemed)
            }
            if (item.advance != null && item.advance != '' && item.advance != undefined) {
                response.data.cast_reward_total.advance = parseFloat(response.data.cast_reward_total.advance) + parseFloat(item.advance)
            }
            if (item.due != null && item.due != '' && item.due != undefined) {
                response.data.cast_reward_total.due = parseFloat(response.data.cast_reward_total.due) + parseFloat(item.due)
            }
            if (item.data_as_on_date != null && item.data_as_on_date != '' && item.data_as_on_date != undefined) {
                item.data_as_on_date = ddmmyyyConverter(item.data_as_on_dat, 'DD/MM/YYYY hh:mm A')
            }
        })
        response.data && response.data.insignia_club_annual_details && response.data.insignia_club_annual_details.map((item: any) => {
            if (item.data_as_on_date != null && item.data_as_on_date != '' && item.data_as_on_date != undefined) {
                item.data_as_on_date = ddmmyyyConverter(item.data_as_on_dat, 'DD/MM/YYYY hh:mm A')
            }
        })
        if (response.data?.reward_details?.data_as_on_date) {
            response.data.reward_details.data_as_on_date = ddmmyyyConverter(response.data.reward_details.data_as_on_date, 'DD/MM/YYYY hh:mm A')
        }
        if (response.data?.business_details?.data_as_on_date) {
            response.data.business_details.data_as_on_date = ddmmyyyConverter(response.data.business_details.data_as_on_date, 'DD/MM/YYYY hh:mm A')
        }
        // dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: false }));
        return response.data;
    }
);

const BusinessDetailssSlice = createSlice({
    name: 'BusinessDetailsData',
    initialState,
    reducers: {
        setBusinessDetails: (state, action) => {
            return action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchBusinessDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBusinessDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.BusinessDetails = action.payload;
            })
            .addCase(fetchBusinessDetails.rejected, (state, action) => {
                console.log("action.error.message", action.error.message)
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export const { setBusinessDetails } = BusinessDetailssSlice.actions;
export default BusinessDetailssSlice.reducer;