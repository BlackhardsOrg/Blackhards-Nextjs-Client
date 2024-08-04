// src/features/auth/authSlice.js
import { IAuction, IPlans } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const plans: IPlans = {
  basic: {
    type: "basic",
    price: 0,
    title: "basic",
    howLongToLaunch: 1,
    howManyCustomizations: 1,
    customizationCharge: 0,
    howManyLevels: 1,
    hasDocumentation: true,
    hasAdminPanel: true,
  },
  standard: {
    type: "standard",
    price: 0,
    title: "basic",
    howLongToLaunch: 1,
    howManyCustomizations: 1,
    customizationCharge: 0,
    howManyLevels: 1,
    hasDocumentation: true,
    hasAdminPanel: true,
  },
  premium: {
    type: "premium",
    price: 0,
    title: "basic",
    howLongToLaunch: 1,
    howManyCustomizations: 1,
    customizationCharge: 0,
    howManyLevels: 1,
    hasDocumentation: true,
    hasAdminPanel: true,
  }
}

const defaultAuctionData: IAuction = {
  developerEmail: "gbgbgbgbgb",
  gameFileLink: "",
  title: "",
  description: "",
  gamePlayScreenShots: [""],
  gamePlayVideo: "",
  genre: [""],
  tags: [""],
  targetPlatform: [""],
  price: 0,
  saleType: "",
  releaseDate: "",
  legal: "",
  ageRating: "",
  developerId: "",
  gameRating: 0,
  gamePlays: 0,
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
