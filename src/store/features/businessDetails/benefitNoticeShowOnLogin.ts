/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { ddmmyyyConverter } from '../../../utils/formatDate';
let currendDate = ddmmyyyConverter(new Date(), 'DD/MM/YYYY')
const BenefitNoticeSlice = createSlice({
    name: 'BenefitNoticeData',
    initialState: {
        showNotice: false,
        todayDate: '',
    },
    reducers: {
        setBenefitNotice: (state, action) => {
            return action.payload;
        },
    },

});
export const { setBenefitNotice } = BenefitNoticeSlice.actions;
export default BenefitNoticeSlice.reducer;
