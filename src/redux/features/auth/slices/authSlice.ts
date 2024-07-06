// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState{
  user: any,
  status: string,
  error: any,
}
const initialState: IInitialState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.data;
    },
    register: (state, action) => {
      state.error = action.payload;
    },
    forgottenPassword: (state, action) => {
      state.error = action.payload;
    },

    resetPassword: (state, action) => {
      state.error = action.payload;
    },

    verifyEmail: (state, action) => {
      state.error = action.payload;
    },

    resendVerificationEmail: (state, action) => {
      state.error = action.payload;
    },

    logout: (state, action) => {
      state.user = null;
    },
  },
});

export const {
  login,
  register,
  forgottenPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
