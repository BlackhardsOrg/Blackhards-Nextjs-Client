// src/features/auth/authSlice.js
import { IGameTitle, IPlans } from "@/types";
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

const defaultGameTitleData: IGameTitle = {
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
  plans: plans,
  isAIAllowedPricing: true
}

interface IInitialState {
  gameTitle: IGameTitle;
  status: string;
  error: any;
  loading: {
    gameTitleCreate: boolean;
  };
}

const initialState: IInitialState = {
  gameTitle: defaultGameTitleData,
  status: "idle",
  error: null,
  loading: {
    gameTitleCreate: false,
  },
};

const gameTitleSlice = createSlice({
  name: "gametitle",
  initialState,
  reducers: {
    gameTitleCreateStart: (state) => {
      state.loading.gameTitleCreate = true;
    },
    gameTitleCreateSuccess: (state, action: PayloadAction<any>) => {
      state.loading.gameTitleCreate = false;
      state.gameTitle = action.payload;
    },
    gameTitleCreateFailure: (state, action: PayloadAction<any>) => {
      state.loading.gameTitleCreate = false;
      state.error = action.payload;
    },
  },
});

export const {
  gameTitleCreateStart,
  gameTitleCreateSuccess,
  gameTitleCreateFailure,
} = gameTitleSlice.actions;

export default gameTitleSlice.reducer;
