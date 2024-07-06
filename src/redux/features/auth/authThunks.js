import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast, Bounce } from "react-toastify";
import authApi from "./authApi";
import { persistor } from "@/redux/app/store";

// Thunks
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      toast("Login Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "info",
        theme: "light",
        transition: Bounce,
      });
      return response.data;
    } catch (error) {
      toast(error.response.data.message, {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "light",
        transition: Bounce,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);
      toast("Registration Successful, you have been sent an email!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "info",
        theme: "light",
        transition: Bounce,
      });
      return response.data;
    } catch (error) {
      toast(error.response.data.message, {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "light",
        transition: Bounce,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgottenPassword = createAsyncThunk(
  "auth/forgottenPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authApi.forgottenPassword(email);
      toast(response.data.message, {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "success",
        theme: "light",
        transition: Bounce,
      });
      return response.data;
    } catch (error) {
      toast(error.response.data.message, {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "light",
        transition: Bounce,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.resetPassword(data);
      toast(response.data.message, {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "success",
        theme: "light",
        transition: Bounce,
      });
      return response.data;
    } catch (error) {
      toast(error.response.data.message, {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "light",
        transition: Bounce,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (params, { rejectWithValue }) => {
    try {
      const response = await authApi.verifyEmail(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resendVerificationEmail = createAsyncThunk(
  "auth/resendVerificationEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authApi.resendVerificationEmail(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ rejectWithValue, getState }) => {
    try {
      console.log("check")
      const state = await getState();
      console.log(state);
      persistor.purge(); // This will clear the persisted state from storage

      toast(response.data.message, {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "success",
        theme: "light",
        transition: Bounce,
      });
      const response = await authApi.logout(state.user.token);
      return response.data;
    } catch (error) {
      console.log(error);
      toast(error.response.data.message, {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "light",
        transition: Bounce,
      });
      return rejectWithValue(error.response.data);
    }
  }
);
