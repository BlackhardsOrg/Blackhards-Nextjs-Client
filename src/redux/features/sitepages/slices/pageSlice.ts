// src/features/auth/authSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGamesPageData {
  genreCurrentTab: string;
  priceRange?: {
    min?: number | null;
    max?: number | null;
  };
  rating?: number | null;
  tag?: {
    value?: string | null;
    title?: string | null;
  };
}
export interface IInitialState {
  games: IGamesPageData;
}

const defaultAuctionData: IGamesPageData = {
  genreCurrentTab: "All",
  priceRange: {
    min: 0,
    max: 0,
  },
  rating: 1,
  tag: {
    title: "Best Seller",
    value: "best-seller",
  },
};

const initialState: IInitialState = {
  games: defaultAuctionData,
};

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setCurrentGenreTab: (
      state,
      action: PayloadAction<{ currentTab: string }>
    ) => {
      state.games.genreCurrentTab = action.payload.currentTab;
    },

    setPriceRange: (
      state,
      action: PayloadAction<{
        priceRange?: { min?: number | null; max?: number | null };
      }>
    ) => {
      state.games.priceRange = action.payload.priceRange;
    },

    setGameRating: (
      state,
      action: PayloadAction<{ rating?: number | null }>
    ) => {
      state.games.rating = action.payload.rating;
    },

    setTag: (
      state,
      action: PayloadAction<{
        tag?: { title?: string | null; value?: string | null };
      }>
    ) => {
      state.games.tag = action.payload.tag;
    },
  },
});

export const { setCurrentGenreTab, setPriceRange, setGameRating, setTag } =
  pageSlice.actions;

export default pageSlice.reducer;
