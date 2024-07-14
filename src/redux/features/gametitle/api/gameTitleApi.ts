import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { gameTitleCreateFailure, gameTitleCreateStart, gameTitleCreateSuccess } from "../slices/gameTitleSlice";

import {
  AxiosError,
  ICredentials,
  IGameTitle,
  IRegisterData,
  IResetPasswordData,
  IUser,
  IVerifyEmailParams,
} from "@/types";

const API_URL = "http://localhost:8080";

export function createGameTitle(gameTitleData: IGameTitle) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(gameTitleCreateStart());
      console.log(gameTitleData, "HUSZ");
      // Make an HTTP GET request to the API
      const response = await axios.post(`${API_URL}/gametitle/create`, gameTitleData);

      const user: IUser = response.data;
      toast("🦄 Game Title Creation Successful!");
      dispatch(gameTitleCreateSuccess(user));
    } catch (error: any) {
      dispatch(gameTitleCreateFailure(error));

      console.error("Game Title Creation failed!:", error);
      // const axiosError = error as AxiosError;
      toast(error.response.data.message, {
        type: "error",
      });
      return error.response.data;
    }
  };
}



