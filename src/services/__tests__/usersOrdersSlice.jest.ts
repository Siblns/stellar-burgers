import ordersReducer, {
  initialState,
  selectUserOrders,
  selectUserOrdersIsLoading,
  fetchUserOrders,
  OrdersState
} from '../slices/usersOrdersSlice';
import { mockOrders } from '../../mocks/userOrders';

describe('ordersSlice', () => {
  it('should handle initial state', () => {
    expect(ordersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('selectUserOrdersIsLoading', () => {
    const state = {
      orders: {
        orders: [],
        userOrdersIsLoading: true,
        error: undefined
      }
    };
    expect(selectUserOrdersIsLoading(state)).toBe(true);
  });

  describe('extraReducers', () => {
    describe('fetchUserOrders', () => {
      it('pending', () => {
        const action = { type: fetchUserOrders.pending.type };
        const state = ordersReducer(initialState, action);
        expect(state.userOrdersIsLoading).toBe(true);
        expect(state.error).toBe(undefined);
      });

      it('rejected', () => {
        const action = {
          type: fetchUserOrders.rejected.type,
          error: { message: 'Failed to fetch orders' }
        };
        const state = ordersReducer(initialState, action);
        expect(state.userOrdersIsLoading).toBe(false);
        expect(state.error).toBe('Failed to fetch orders');
      });

      it('fulfilled', () => {
        const mockResponse = mockOrders;

        const action = {
          type: fetchUserOrders.fulfilled.type,
          payload: mockResponse
        };
        const state = ordersReducer(initialState, action);
        expect(state.orders).toEqual(mockResponse);
        expect(state.userOrdersIsLoading).toBe(false);
        expect(state.error).toBe(undefined);
      });
    });
  });
});
