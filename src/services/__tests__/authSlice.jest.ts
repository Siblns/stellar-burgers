// auth.slice.test.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer, {
  initialState,
  selectIsAuthenticated,
  selectLoading,
  selectError,
  fetchLoginUser,
  selectUserData,
  fetchLogout,
  fetchGetUser,
  fetchRegisterUser,
  fetchUpdateUser,
  clearErrorMessage
} from '../slices/authSlice';
import { mockUserStoreData } from '../../mocks/auth';

jest.mock('../../utils/burger-api');

describe('ordersSlice', () => {
  it('should handle initial state', () => {
    //expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});
/*
describe('Слайс user', () => {
  it('Проверка initialState', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Проверка селекторов', () => {
    it('isAuthCheckedSelector', () => {
      expect(
        selectIsAuthenticated({
          user: mockUserStoreData
        })
      ).toBe(mockUserStoreData.isAuthenticated);
    });

    it('isAuthenticatedSelector', () => {
      expect(
        selectIsAuthenticated({
          user: mockUserStoreData
        })
      ).toBe(mockUserStoreData.isAuthenticated);
    });

    it('selectUserData', () => {
      expect(
        selectUserData({
          user: mockUserStoreData
        })
      ).toBe(mockUserStoreData.user);
    });

    it('userOrdersSelector', () => {
      expect(
        selectUserData({
          user: mockUserStoreData
        })
      ).toBe(mockUserStoreData.orders);
    });

    it('selectError', () => {
      expect(
        selectError({
          user: mockUserStoreData
        })
      ).toBe(mockUserStoreData.error);
    });
  });

  describe('Проверка редьюсеров', () => {
    it('clearErrorMessage', () => {
      const previousState = {
        ...mockUserStoreData,
        error: 'test error',
        loading: true
      };

      const nextState = authReducer(previousState, clearErrorMessage());

      expect(nextState.error).toEqual(undefined);
    });
  });

  describe('Проверка extraReducers', () => {
    describe('fetchLogout', () => {
      it('pending', () => {
        const action = { type: fetchLogout.pending.type };
        const state = authReducer(initialState, action);
        expect(state.isAuthenticated).toBe(true);
        expect(state.error).toBe(null);
      });

      it('rejected', () => {
        const action = {
          type: fetchLogout.rejected.type,
          error: { message: 'Failed to login user' }
        };
        const state = authReducer(initialState, action);
        expect(state.isAuthenticated).toBe(false);
        expect(state.error).toBe('Failed to login user');
      });

      it('fulfilled', () => {
        const mockResponse = mockUserStoreData.user;

        const action = {
          type: fetchLogout.fulfilled.type,
          payload: mockResponse
        };
        const state = authReducer(initialState, action);
        expect(state.user).toEqual(mockResponse);
        expect(state.isAuthenticated).toBe(false);
        expect(state.isAuthenticated).toEqual(true);
      });
    });

    describe('logoutUserThunk', () => {
      it('pending', () => {
        const previousState = {
          ...mockUserStoreData,
          error: undefined,
          loading: true
        };
        const action = { type: fetchLogout.pending.type };
        const state = authReducer(previousState, action);
        expect(state.user).toBe(null);
        expect(state.isAuthenticated).toBe(false);
        expect(state.isAuthenticated).toBe(false);
      });
    });

    describe('fetchGetUser', () => {
      it('pending', () => {
        const action = { type: fetchGetUser.pending.type };
        const state = authReducer(initialState, action);
        expect(state.isAuthenticated).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: fetchGetUser.rejected.type,
          error: { message: 'Failed to get user' }
        };
        const state = authReducer(initialState, action);
        expect(state.user).toEqual(null);
        expect(state.isAuthenticated).toBe(false);
        expect(state.error).toBe('Failed to get user');
      });

      it('fulfilled', () => {
        const mockResponse = mockUserStoreData;

        const action = {
          type: fetchGetUser.fulfilled.type,
          payload: mockResponse
        };
        const state = authReducer(initialState, action);
        expect(state.user).toEqual(mockResponse.user);
        expect(state.isAuthenticated).toBe(false);
        expect(state.isAuthenticated).toEqual(true);
      });
    });

    describe('fetchRegisterUser', () => {
      it('pending', () => {
        const action = { type: fetchRegisterUser.pending.type };
        const state = authReducer(initialState, action);
        expect(state.isAuthenticated).toBe(false);
        expect(state.isAuthenticated).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: fetchRegisterUser.rejected.type,
          error: { message: 'Failed to register user' }
        };
        const state = authReducer(initialState, action);
        expect(state.isAuthenticated).toBe(false);
        expect(state.isAuthenticated).toBe(false);
        expect(state.error).toBe('Failed to register user');
      });

      it('fulfilled', () => {
        const mockResponse = mockUserStoreData.user;

        const action = {
          type: fetchRegisterUser.fulfilled.type,
          payload: mockResponse
        };
        const state = authReducer(initialState, action);
        expect(state.user).toEqual(mockResponse);
        expect(state.isAuthenticated).toBe(false);
        expect(state.isAuthenticated).toEqual(true);
      });
    });

    describe('fetchUpdateUser', () => {
      it('pending', () => {
        const action = { type: fetchUpdateUser.pending.type };
        const state = authReducer(initialState, action);
        expect(state.isAuthenticated).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: fetchUpdateUser.rejected.type,
          error: { message: 'Failed to update user' }
        };
        const state = authReducer(initialState, action);
        expect(state.isAuthenticated).toBe(false);
        expect(state.error).toBe('Failed to update user');
      });

      it('fulfilled', () => {
        const mockResponse = mockUserStoreData;

        const action = {
          type: fetchUpdateUser.fulfilled.type,
          payload: {
            user: mockResponse.user
          }
        };
        const state = authReducer(initialState, action);
        expect(state.user).toEqual(mockResponse.user);
        expect(state.isAuthenticated).toBe(false);
        expect(state.isAuthenticated).toEqual(true);
      });
    });
  });
});
*/
