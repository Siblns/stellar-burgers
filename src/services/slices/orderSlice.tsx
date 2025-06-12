import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export interface IOrderState {
  order: TOrder | null;
  isOrderLoading: boolean;
  error: string | undefined;
  orders: TOrder[];
}

export const initialState: IOrderState = {
  order: null,
  isOrderLoading: false,
  error: undefined,
  orders: []
};

export const fetchOrderBurger = createAsyncThunk(
  'orders/fetchOrderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

export const fetchOrderByNumber = createAsyncThunk(
  'fetchOrderByNumber/fetchOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    isOrderLoadingSelector: (state) => state.isOrderLoading,
    orderSelector: (state) => state.order,
    selectOrders: (state) => state.orders
  },
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.isOrderLoading = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrderBurger.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.order = action.payload.order;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orders = action.payload.orders;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export const { isOrderLoadingSelector, orderSelector, selectOrders } =
  orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
