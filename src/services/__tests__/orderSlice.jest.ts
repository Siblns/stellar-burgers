import orderReducer, {
  initialState,
  isOrderLoadingSelector,
  orderSelector,
  selectOrders,
  fetchOrderBurger,
  fetchOrderByNumber,
  orderSlice
} from '../slices/orderSlice';
import { mockOrder } from '../../mocks/order';
import { configureStore } from '@reduxjs/toolkit';

describe('Check slice order', () => {
  it('Проверка initialState', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Check selector', () => {
    it('isOrderLoadingSelector', () => {
      expect(
        isOrderLoadingSelector({
          order: mockOrder
        })
      ).toBe(mockOrder.isOrderLoading);
    });

    it('orderSelector', () => {
      expect(
        orderSelector({
          order: mockOrder
        })
      ).toBe(mockOrder.order);
    });

    it('selectOrders', () => {
      expect(
        selectOrders({
          order: mockOrder
        })
      ).toBe(mockOrder.orders);
    });
  });

  describe('Check extraReducers', () => {
    describe('fetchOrderBurger', () => {
      it('pending', () => {
        const action = { type: fetchOrderBurger.pending.type };
        const state = orderReducer(initialState, action);
        expect(state.isOrderLoading).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: fetchOrderBurger.rejected.type,
          error: { message: 'Failed to fetch feeds' }
        };
        const state = orderReducer(initialState, action);
        expect(state.isOrderLoading).toBe(false);
        expect(state.error).toBe('Failed to fetch feeds');
      });

      it('fulfilled', () => {
        const mockResponse = mockOrder.order;

        const action = {
          type: fetchOrderBurger.fulfilled.type,
          payload: {
            order: mockResponse
          }
        };
        const state = orderReducer(initialState, action);
        expect(state.isOrderLoading).toBe(false);
        expect(state.order).toEqual(mockResponse);
      });
    });

    describe('fetchOrderByNumber', () => {
      it('pending', () => {
        const action = { type: fetchOrderByNumber.pending.type };
        const state = orderReducer(initialState, action);
        expect(state.isOrderLoading).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: fetchOrderByNumber.rejected.type,
          error: { message: 'Failed to fetch order by number' }
        };
        const state = orderReducer(initialState, action);
        expect(state.isOrderLoading).toBe(false);
        expect(state.error).toBe('Failed to fetch order by number');
      });

      it('fulfilled', () => {
        const mockResponse = mockOrder.orders;

        const action = {
          type: fetchOrderByNumber.fulfilled.type,
          payload: {
            orders: mockResponse
          }
        };
        const state = orderReducer(initialState, action);
        expect(state.isOrderLoading).toBe(false);
        expect(state.orders).toEqual(mockResponse);
      });
    });
  });

  describe('Check clearOrder', () => {
    let store: any;

    beforeEach(() => {
      store = configureStore({
        reducer: {
          order: orderReducer
        }
      });
    });

    it('Очистка заказа, перевод состояния загрузки в false', () => {
      store.dispatch(orderSlice.actions.clearOrder());
      const newState = store.getState().order;
      expect(newState.order).toBeNull();
      expect(newState.isOrderLoading).toBeFalsy();
    });
  });
});
