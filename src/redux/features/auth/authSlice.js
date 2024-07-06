// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  forgottenPassword,
  login,
  logout,
  register,
  resendVerificationEmail,
  resetPassword,
  verifyEmail,
} from "./authThunks";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreSession: (state, action) => {
      state.user = { token: action.payload.token }; // Adjust based on actual user object structure
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data;
        console.log(action.payload, "PAYLOAD")
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(forgottenPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgottenPassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(forgottenPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resendVerificationEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resendVerificationEmail.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { restoreSession } = authSlice.actions;

export default authSlice.reducer;
