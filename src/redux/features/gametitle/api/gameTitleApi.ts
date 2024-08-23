import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import {
  gameTitleCreateFailure,
  gameTitleCreateStart,
  gameTitleCreateSuccess,
} from "../slices/gameTitleSlice";

import {
  AxiosError,
  ICredentials,
  IGameTitle,
  IRegisterData,
  IResetPasswordData,
  IUser,
  IVerifyEmailParams,
} from "@/types";

// const API_URL = "http://localhost:8080";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function createGameTitle(gameTitleData: IGameTitle, token: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(gameTitleCreateStart());
      // Make an HTTP GET request to the API
      const response = await axios.post(
        `${API_URL}/gametitle/create`,
        gameTitleData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const user: IUser = response.data;
      toast("🦄 Game Title Creation Successful!");
      dispatch(gameTitleCreateSuccess(null));
    } catch (error: any) {
      dispatch(gameTitleCreateFailure(error));

      console.error("Game Title Creation failed!:", error);
      // const axiosError = error as AxiosError;
      if (error.response) {
        toast(error.response.data.message, {
          type: "error",
        });
      }
      toast(error.message, {
        type: "error",
      });
      return error.message;
    }
  };
}
