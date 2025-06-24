import ordersReducer, {
  initialState,
  selectUserOrders,
  selectUserOrdersIsLoading,
  fetchUserOrders,
  OrdersState
} from '../slices/usersOrdersSlice';
import { mockOrders } from '../../mocks/userOrders';
import { mockOrder } from '../../mocks/order';

describe('ordersSlice', () => {
  it('should handle initial state', () => {
    expect(ordersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  /*
  it('selectUserOrders', () => {
    const state = {
      orders: [
        {
          _id: '66865ee9856777001bb1fbf9',
          createdAt: '2025-06-20T08:35:53.795Z',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
          name: 'Флюоресцентный бургер',
          number: 44912,
          status: 'done',
          updatedAt: '2025-06-20T08:35:54.316Z'
        },
        {
          _id: '66865f14856777001bb1fbfa',
          createdAt: '2025-06-20T08:36:36.334Z',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093c'
          ],
          name: 'Краторный био-марсианский люминесцентный метеоритный бургер',
          number: 44913,
          status: 'done',
          updatedAt: '2025-06-20T08:36:36.710Z'
        }
      ],
      userOrdersIsLoading: false,
      error: undefined
    };
    expect(selectUserOrders(state)).toEqual(mockOrders.orders);
  });
*/
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
