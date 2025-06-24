import { mockFeed } from '../../mocks/feed';
import feedReducer, {
  initialState,
  ordersSelector,
  orderSelector,
  totalSelector,
  totalTodaySelector,
  fetchFeedsThunk,
  fetchOrderThunk
} from '../slices/feedSlice';

describe('Check slice orders', () => {
  it('should handle initial state', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Check selector', () => {
    it('should handle ordersSelector', () => {
      expect(
        ordersSelector({
          feed: mockFeed
        })
      ).toBe(mockFeed.orders);
    });

    it('orderSelector', () => {
      expect(
        orderSelector({
          feed: mockFeed
        })
      ).toBe(mockFeed.order);
    });

    it('totalSelector', () => {
      expect(
        totalSelector({
          feed: mockFeed
        })
      ).toBe(mockFeed.total);
    });

    it('totalTodaySelector', () => {
      expect(
        totalTodaySelector({
          feed: mockFeed
        })
      ).toBe(mockFeed.totalToday);
    });
  });

  describe('Check extraReducers', () => {
    describe('fetchFeeds', () => {
      it('pending', () => {
        const action = { type: fetchFeedsThunk.pending.type };
        const state = feedReducer(initialState, action);
        expect(state.isFeedsLoading).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: fetchFeedsThunk.rejected.type,
          error: { message: 'Failed to fetch feeds' }
        };
        const state = feedReducer(initialState, action);
        expect(state.isFeedsLoading).toBe(false);
        expect(state.error).toBe('Failed to fetch feeds');
      });

      it('fulfilled', () => {
        const mockResponse = {
          orders: mockFeed.orders,
          total: mockFeed.total,
          totalToday: mockFeed.totalToday
        };

        const action = {
          type: fetchFeedsThunk.fulfilled.type,
          payload: mockResponse
        };
        const state = feedReducer(initialState, action);
        expect(state.isFeedsLoading).toBe(false);
        expect(state.orders).toEqual(mockResponse.orders);
        expect(state.total).toBe(mockResponse.total);
        expect(state.totalToday).toBe(mockResponse.totalToday);
      });
    });

    describe('fetchOrder', () => {
      it('pending', () => {
        const action = { type: fetchOrderThunk.pending.type };
        const state = feedReducer(initialState, action);
        expect(state.isOrderLoading).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: fetchOrderThunk.rejected.type,
          error: { message: 'Failed to fetch order' }
        };
        const state = feedReducer(initialState, action);
        expect(state.isOrderLoading).toBe(false);
        expect(state.error).toBe('Failed to fetch order');
      });

      it('fulfilled', () => {
        const mockResponse = {
          orders: mockFeed.orders
        };
        const action = {
          type: fetchOrderThunk.fulfilled.type,
          payload: mockResponse
        };
        const state = feedReducer(initialState, action);
        expect(state.isOrderLoading).toBe(false);
        expect(state.order).toEqual(mockResponse.orders[0]);
      });
    });
  });
});
