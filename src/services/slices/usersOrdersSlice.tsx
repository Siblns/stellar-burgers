import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async () => getOrdersApi()
);

interface OrdersState {
  userOrders: TOrder[];
  userOrdersIsLoading: boolean;
  error: string | undefined;
}

const initialState: OrdersState = {
  userOrders: [],
  userOrdersIsLoading: false,
  error: undefined
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectUserOrdersIsLoading: (state) => state.userOrdersIsLoading,
    selectUserOrders: (state) => state.userOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.userOrdersIsLoading = true;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.userOrdersIsLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrdersIsLoading = false;
        state.userOrders = action.payload;
      });
  }
});

export const { selectUserOrders } = ordersSlice.selectors;
export const ordersReducer = ordersSlice.reducer;
