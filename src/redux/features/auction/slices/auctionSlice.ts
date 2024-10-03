// src/features/auth/authSlice.js
import { IAuction, IPlans } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const defaultAuctionData: IAuction = {
  developerEmail: "",
  gameTitleId: "",
  endTime: "",
  reservedPrice: 0,
  startTime: "",
};

interface IInitialState {
  auction: IAuction;
  bidPlaced: boolean;
  status: string;
  error: any;
  loading: {
    auctionStart: boolean;
  };
}

const initialState: IInitialState = {
  auction: defaultAuctionData,
  bidPlaced: false,
  status: "idle",
  error: null,
  loading: {
    auctionStart: false,
  },
};

const gameTitleSlice = createSlice({
  name: "gametitle",
  initialState,
  reducers: {
    auctionCreateStart: (state) => {
      state.loading.auctionStart = true;
    },
    auctionCreateSuccess: (state, action: PayloadAction<any>) => {
      state.loading.auctionStart = false;
      state.auction = action.payload;
    },
    auctionCreateFailure: (state, action: PayloadAction<any>) => {
      state.loading.auctionStart = false;
      state.error = action.payload;
    },

    setBidPlacement: (state, action: PayloadAction<boolean>) => {
      state.bidPlaced = action.payload;
    },
  },
});

export const {
  auctionCreateStart,
  auctionCreateSuccess,
  auctionCreateFailure,
  setBidPlacement,
} = gameTitleSlice.actions;

export default gameTitleSlice.reducer;
