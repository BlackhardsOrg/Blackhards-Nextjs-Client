// src/features/auth/authSlice.js
import { IAuction, IPlans } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const defaultAuctionData: IAuction = {
  developerEmail: "gbgbgbgbgb",
  gameFileLink: "",
  title: "",
  description: "",
  gamePlayScreenShots: [""],
  gamePlayVideo: "",
  genre: [""],
  tags: [""],
  reservedPrice: 0,
  targetPlatform: [""],
  saleType: "",
  releaseDate: "",
  legal: "",
  ageRating: "",
  developerId: "",
  gameRating: 0,
  gamePlays: 0,
  endTime: "",
  startTime: ""
  
}

interface IInitialState {
  auction: IAuction;
  status: string;
  error: any;
  loading: {
    auctionStart: boolean;
  };
}

const initialState: IInitialState = {
  auction: defaultAuctionData,
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
  },
});

export const {
  auctionCreateStart,
  auctionCreateSuccess,
  auctionCreateFailure,
} = gameTitleSlice.actions;

export default gameTitleSlice.reducer;
