// src/features/auth/authSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  user: any,
  status: string,
  error: any,
  loading: {
    login: boolean,
    register: boolean,
    forgottenPassword: boolean,
    resetPassword: boolean,
    verifyEmail: boolean,
    resendVerificationEmail: boolean,
  }
}

const initialState: IInitialState = {
  user: null,
  status: "idle",
  error: null,
  loading: {
    login: false,
    register: false,
    forgottenPassword: false,
    resetPassword: false,
    verifyEmail: false,
    resendVerificationEmail: false,
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading.login = true;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.loading.login = false;
      state.user = action.payload.data;
    },
    loginFailure: (state, action: PayloadAction<any>) => {
      state.loading.login = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading.register = true;
    },
    registerSuccess: (state, action: PayloadAction<any>) => {
      state.loading.register = false;
      state.user = action.payload.data;
    },
    registerFailure: (state, action: PayloadAction<any>) => {
      state.loading.register = false;
      state.error = action.payload;
    },
    forgottenPasswordStart: (state) => {
      state.loading.forgottenPassword = true;
    },
    forgottenPasswordSuccess: (state) => {
      state.loading.forgottenPassword = false;
    },
    forgottenPasswordFailure: (state, action: PayloadAction<any>) => {
      state.loading.forgottenPassword = false;
      state.error = action.payload;
    },
    resetPasswordStart: (state) => {
      state.loading.resetPassword = true;
    },
    resetPasswordSuccess: (state) => {
      state.loading.resetPassword = false;
    },
    resetPasswordFailure: (state, action: PayloadAction<any>) => {
      state.loading.resetPassword = false;
      state.error = action.payload;
    },
    verifyEmailStart: (state) => {
      state.loading.verifyEmail = true;
    },
    verifyEmailSuccess: (state) => {
      state.loading.verifyEmail = false;
    },
    verifyEmailFailure: (state, action: PayloadAction<any>) => {
      state.loading.verifyEmail = false;
      state.error = action.payload;
    },
    resendVerificationEmailStart: (state) => {
      state.loading.resendVerificationEmail = true;
    },
    resendVerificationEmailSuccess: (state) => {
      state.loading.resendVerificationEmail = false;
    },
    resendVerificationEmailFailure: (state, action: PayloadAction<any>) => {
      state.loading.resendVerificationEmail = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  forgottenPasswordStart,
  forgottenPasswordSuccess,
  forgottenPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  verifyEmailStart,
  verifyEmailSuccess,
  verifyEmailFailure,
  resendVerificationEmailStart,
  resendVerificationEmailSuccess,
  resendVerificationEmailFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
