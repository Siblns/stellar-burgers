import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async () => getOrdersApi()
);

export interface OrdersState {
  orders: TOrder[];
  userOrdersIsLoading: boolean;
  error: string | undefined;
}

export const initialState: OrdersState = {
  orders: [],
  userOrdersIsLoading: false,
  error: undefined
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectUserOrdersIsLoading: (state) => state.userOrdersIsLoading,
    selectUserOrders: (state) => state.orders
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
        state.orders = action.payload;
      });
  }
});

export const { selectUserOrders, selectUserOrdersIsLoading } =
  ordersSlice.selectors;
const ordersReducer = ordersSlice.reducer;
export default ordersReducer;
