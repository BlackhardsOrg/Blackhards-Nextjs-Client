import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {
  forgottenPassword,
  login,
  logout,
  register,
  resendVerificationEmail,
  resetPassword,
  verifyEmail,
} from "../slices/authSlice";

import {
  ICredentials,
  IRegisterData,
  IResetPasswordData,
  IUser,
  IVerifyEmailParams,
} from "@/types";

const API_URL = "http://localhost:8080";

export function loginUser(credentials: ICredentials) {
  return async (dispatch: Dispatch) => {
    try {
      // Make an HTTP GET request to the API
      const response = await axios.post(`${API_URL}/auth/login`, credentials);

      // Extract card resources from the API response
      const user: IUser = response.data;

      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(login(user));
    } catch (error) {
      console.error("Error fetching card resources:", error);
    }
  };
}

export function registerUser(registerData: IRegisterData) {
  return async (dispatch: Dispatch) => {
    try {
      // Make an HTTP GET request to the API
      const response = await axios.post(`${API_URL}/auth/login`, registerData);

      // Extract card resources from the API response
      const success: IUser = response.data;

      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(register(success));
    } catch (error) {
      console.error("Error fetching card resources:", error);
    }
  };
}

export function forgottenPasswordUser(email: string) {
  return async (dispatch: Dispatch) => {
    try {
      // Make an HTTP GET request to the API
      const response = await axios.post(`${API_URL}/auth/forgotten-password`, {
        email,
      });

      // Extract card resources from the API response
      const success: IUser = response.data;

      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(forgottenPassword(success));
    } catch (error) {
      console.error("Error fetching card resources:", error);
    }
  };
}

export function resetPasswordUser(resetPasswordData: IResetPasswordData) {
  return async (dispatch: Dispatch) => {
    try {
      // Make an HTTP GET request to the API
      const response = await axios.post(
        `${API_URL}/auth/reset-password`,
        resetPasswordData
      );

      // Extract card resources from the API response
      const success: IUser = response.data;

      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(resetPassword(success));
    } catch (error) {
      console.error("Error fetching card resources:", error);
    }
  };
}

export function verifyEmailUser(params: IVerifyEmailParams) {
  return async (dispatch: Dispatch) => {
    try {
      // Make an HTTP GET request to the API
      const response = await axios.get(`${API_URL}/auth/verify-email`, {
        params,
      });

      // Extract card resources from the API response
      const success: IUser = response.data;

      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(verifyEmail(success));
    } catch (error) {
      console.error("Error fetching card resources:", error);
    }
  };
}

export function resendVerificationEmailUser(email: string) {
  return async (dispatch: Dispatch) => {
    try {
      // Make an HTTP GET request to the API
      const response = await axios.post(
        `${API_URL}/auth/resend-verification-email`,
        { email }
      );

      // Extract card resources from the API response
      const success: IUser = response.data;

      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(resendVerificationEmail(success));
    } catch (error) {
      console.error("Error fetching card resources:", error);
    }
  };
}

export function logoutUser(token: string) {
  return async (dispatch: Dispatch) => {
    try {
      // Make an HTTP GET request to the API
      const response = await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Extract card resources from the API response
      const success: IUser = response.data;

      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(logout(success));
    } catch (error) {
      console.error("Error fetching card resources:", error);
    }
  };
}
