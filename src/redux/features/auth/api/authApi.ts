import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  forgottenPasswordFailure,
  forgottenPasswordStart,
  forgottenPasswordSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  registerFailure,
  registerStart,
  registerSuccess,
  resendVerificationEmailFailure,
  resendVerificationEmailStart,
  resendVerificationEmailSuccess,
  resetPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  verifyEmailFailure,
  verifyEmailStart,
  verifyEmailSuccess,
} from "../slices/authSlice";

import {
  AxiosError,
  ICredentials,
  IRegisterData,
  IRegisterEarlyData,
  IResetPasswordData,
  IUser,
  IVerifyEmailParams,
} from "@/types";

// const API_URL = "http://localhost:8080";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function loginUser(credentials: ICredentials) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loginStart());
      console.log(credentials, "HUSZ");
      // Make an HTTP GET request to the API
      const response = await axios.post(`${API_URL}/auth/login`, credentials);

      // Extract card resources from the API response
      const user: IUser = response.data;
      toast("🦄 login Successful!");
      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(loginSuccess(user));
    } catch (error: any) {
      dispatch(loginFailure(error));

      console.error("Error fetching card resources:", error);
      // const axiosError = error as AxiosError;
      toast(error.response.data.message, {
        type: "error",
      });
      return error.response.data;
    }
  };
}

export function registerUser(registerData: IRegisterData) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(registerStart());
      console.log(registerData, "LILY");
      // Make an HTTP GET request to the API
      const response = await axios.post(
        `${API_URL}/auth/register`,
        registerData
      );
      console.log(response, "REGISTER");

      // Extract card resources from the API response
      toast("🦄 Registration Successful!");
      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(registerSuccess(response));
      return response.data;
    } catch (error: any) {
      if (error.response.data) {
        toast(error.response.data.message, {
          type: "error",
        });
      }
      dispatch(registerFailure(error));

      console.error("Error fetching card resources:", error);
      return error.response.data;
    }
  };
}

export function registerUserEarly(registerData: IRegisterEarlyData) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(registerStart());
      console.log(registerData, "LILY");
      // Make an HTTP GET request to the API
      const response = await axios.post(
        `${API_URL}/auth/register/early`,
        registerData
      );
      console.log(response, "REGISTER");

      // Extract card resources from the API response
      toast(
        "🦄 'As e dey hot!', we got your response. This is the start of something huge. you will be the first to know when we go live.😊😊😊",
        { autoClose: 15000 }
      );
      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(registerSuccess(null));
      useRouter().push("/");
      return response.data;
    } catch (error: any) {
      dispatch(registerFailure(error));

      // console.error("Error fetching card resources:", error);
      if (error.response) {
        toast(error.response.data.message, {
          type: "error",
        });
        return error.response.data;
      }
    }
  };
}

export function forgottenPasswordUser(email: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(forgottenPasswordStart());

      // Make an HTTP GET request to the API
      const response = await axios.post(`${API_URL}/auth/forgotten-password`, {
        email,
      });
      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(forgottenPasswordSuccess());
      toast(response.data.message, {
        type: "success",
      });
      return response.data;
    } catch (error: any) {
      dispatch(forgottenPasswordFailure(error));
      console.error("Error fetching card resources:", error);
      toast(error.response.data.message, {
        type: "error",
      });
      return error.response.data;
    }
  };
}

export function resetPasswordUser(resetPasswordData: IResetPasswordData) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(resetPasswordStart());

      // Make an HTTP GET request to the API
      const response = await axios.post(
        `${API_URL}/auth/reset-password`,
        resetPasswordData
      );

      // Extract card resources from the API response
      toast(response.data.message);
      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(resetPasswordSuccess());
      console.log(response, "CHECK THIS");
      return response.data;
    } catch (error: any) {
      dispatch(resetPasswordFailure(error));
      toast(error.response.data.message, {
        type: "error",
      });
      console.error("Error fetching card resources:", error);
      return error.response.data;
    }
  };
}

export function verifyEmailUser(params: IVerifyEmailParams) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(verifyEmailStart());

      // Make an HTTP GET request to the API
      const response = await axios.get(`${API_URL}/auth/verify-email`, {
        params,
      });

      // Extract card resources from the API response
      const success: IUser = response.data;

      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(verifyEmailSuccess());
      toast("🦄 Email Verification Successful!");
      return response.data;
    } catch (error: any) {
      dispatch(verifyEmailFailure(error));
      toast(
        "🦄 Email Verification Not Successful!, link not valid or expired",
        {
          type: "error",
        }
      );
      console.error("Error fetching card resources:", error);
      return error.response.data;
    }
  };
}

export function resendVerificationEmailUser(email: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(resendVerificationEmailStart());

      // Make an HTTP GET request to the API
      const response = await axios.post(
        `${API_URL}/auth/resend-verification-email`,
        { email }
      );
      toast(response.data.message);
      // Extract card resources from the API response
      const success: IUser = response.data;

      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(resendVerificationEmailSuccess());
      return response.data;
    } catch (error: any) {
      dispatch(resendVerificationEmailFailure(error));

      console.error("Error fetching card resources:", error);
      toast(
        "🦄 Email Verification Not Successful!, link not valid or expired",
        {
          type: "error",
        }
      );
      return error.response.data;
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
      dispatch(logout());
      toast(response.data.message);
      return response.data;
    } catch (error: any) {
      console.error("Logout problem", error);
      toast(error.response.data.message, {
        type: "error",
      });
      return error.response.data;
    }
  };
}

// developerEmail: "",
// gameFileLink: "",
// title: "",
// description: "",
// gamePlayScreenShots: [""],
// gamePlayVideo: "",
// genre: [""],
// tags: [""],
// targetPlatform: [""],
// price: 0,
// saleType: "",
// releaseDate: "",
// legal: "",
// ageRating: "",
// developerId: "",
// gameRating: 0,
// gamePlays: 0,
