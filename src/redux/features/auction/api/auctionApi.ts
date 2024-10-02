import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  auctionCreateFailure,
  auctionCreateStart,
  auctionCreateSuccess,
} from "../slices/auctionSlice";

import { IAuction, IUser } from "@/types";

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
      return user;
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

export function PlaceBidOnAuction(
  bidAmountToPlace: number,
  auctionId: string,
  token: string,
) {
  return async (dispatch: Dispatch) => {
    try {
      // Make an HTTP GET request to the API
      const response = await axios.post(
        `${API_URL}/auctions/placebid`,
        { auctionId, bidAmountToPlace },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const auctionBid: IUser = response.data;
      toast("🦄 Bid Placed Successful!");
      return auctionBid;
    } catch (error: any) {
      console.error("Bidding failed!:", error);
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

export function resultAuction(
  resulterEmail: string,
  auctionId: string,
  token: string
) {
  return async (dispatch: Dispatch) => {
    try {
      // Make an HTTP GET request to the API
      const response = await axios.post(
        `${API_URL}/auctions/result`,
        { auctionId, resulterEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const auctionBid: IUser = response.data;
      toast("🦄 Auction Resulted Successfully!");
      return auctionBid;
    } catch (error: any) {
      console.error("Resultance Failed!:", error);
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

export function confirmAuction(
  auctionId: string,
  token: string
) {
  return async (dispatch: Dispatch) => {
    try {
      // Make an HTTP GET request to the API
      const response = await axios.post(
        `${API_URL}/auctions/confirm`,
        { auctionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const auctionBid: IUser = response.data;
      toast("🦄 Auction Confirmed Successfully!");
      return auctionBid;
    } catch (error: any) {
      console.error("Confirmation Failed!:", error);
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

export const fetchMinimumBid = async (auctionId: string) => {
  try {
    const response = await axios.post(`${API_URL}/auctions/minimumbid/bid`, {
      auctionId,
    });
    return response.data;
  } catch (error: any) {
    console.error("Bidding failed!:", error);
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
