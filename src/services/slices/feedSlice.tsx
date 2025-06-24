import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export interface IFeedState {
  orders: TOrder[];
  isFeedsLoading: boolean;
  order: TOrder | null;
  isOrderLoading: boolean;
  total: number;
  totalToday: number;
  error: string | null;
}

export const initialState: IFeedState = {
  orders: [],
  isFeedsLoading: false,
  order: null,
  isOrderLoading: false,
  total: 0,
  totalToday: 0,
  error: null
};

export const fetchFeedsThunk = createAsyncThunk('feeds/fetchFeeds', async () =>
  getFeedsApi()
);

export const fetchOrderThunk = createAsyncThunk(
  'orders/fetchOrder',
  async (number: number) => getOrderByNumberApi(number)
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    ordersSelector: (state) => state.orders,
    orderSelector: (state) => state.order,
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFeedsThunk.pending, (state) => {
        state.isFeedsLoading = true;
      })
      .addCase(fetchFeedsThunk.rejected, (state, action) => {
        state.isFeedsLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchFeedsThunk.fulfilled, (state, action) => {
        state.isFeedsLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })

      .addCase(fetchOrderThunk.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(fetchOrderThunk.rejected, (state, action) => {
        state.error = action.error.message!;
        state.isOrderLoading = false;
      })
      .addCase(fetchOrderThunk.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.isOrderLoading = false;
      });
  }
});

export const {
  ordersSelector,
  orderSelector,
  totalSelector,
  totalTodaySelector
} = feedSlice.selectors;
export const feedReducer = feedSlice.reducer;
