import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData,
  getOrdersApi
} from '../../utils/burger-api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const saveTokens = (tokens: any) => {
  setCookie('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
};

export const clearTokens = () => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  localStorage.removeItem('refreshToken');
};

export const fetchRegisterUser = createAsyncThunk(
  'auth/fetchRegisterUser',
  async (data: TRegisterData) => {
    const result = await registerUserApi(data);
    saveTokens(result);
    return result;
  }
);

export const fetchLoginUser = createAsyncThunk(
  'auth/fetchLoginUser',
  async (data: TLoginData) => {
    const result = await loginUserApi(data);
    saveTokens(result);
    return result;
  }
);

export const fetchGetUser = createAsyncThunk('auth/fetchGetUser', async () =>
  getUserApi()
);

export const fetchUpdateUser = createAsyncThunk(
  'auth/fetchUpdateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async () => {
  await logoutApi();
  clearTokens();
});

interface IAuthState {
  isAuthenticated: boolean;
  user: TUser;
  error: string | undefined;
  loading: boolean;
}

const initialState: IAuthState = {
  isAuthenticated: !!getCookie('accessToken'), // изначально проверяем токен
  user: {
    name: '',
    email: ''
  },
  error: undefined,
  loading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrorMessage(state) {
      state.error = '';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = '';
      })

      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = '';
      })

      .addCase(fetchGetUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = '';
      })

      .addCase(fetchUpdateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = '';
      })

      .addCase(fetchLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = { name: '', email: '' };
        state.error = '';
      });
  }
});

export const { clearErrorMessage } = authSlice.actions;

export const selectUserData = (state: any) => state.auth.user;
export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const selectLoading = (state: any) => state.auth.loading;
export const selectError = (state: any) => state.auth.error;

export const authReducer = authSlice.reducer;
