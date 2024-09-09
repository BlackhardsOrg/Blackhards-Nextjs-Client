import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import {
  auctionCreateFailure,
  auctionCreateStart,
  auctionCreateSuccess
} from "../slices/auctionSlice";

import {
  IAuction,
  IGameTitle,
  IUser,
} from "@/types";

// const API_URL = "http://localhost:8080";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function startAuction(auctionData: IAuction, token: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(auctionCreateStart());
      // Make an HTTP GET request to the API
      const response = await axios.post(
        `${API_URL}/auctions/start`,
        auctionData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const user: IUser = response.data;
      toast("🦄 Auction Started Successful!");
      dispatch(auctionCreateSuccess(null));
      return user
    } catch (error: any) {
      dispatch(auctionCreateFailure(error));

      console.error("Auction Start failed!:", error);
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
