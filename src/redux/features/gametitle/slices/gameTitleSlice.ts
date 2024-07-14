// src/features/auth/authSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  gameTitle: any,
  status: string,
  error: any,
  loading: {
    gameTitleCreate: boolean,
   
  }
}

const initialState: IInitialState = {
  gameTitle: null,
  status: "idle",
  error: null,
  loading: {
    gameTitleCreate: false,
  }
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
      state.gameTitle = action.payload.data;
    },
    gameTitleCreateFailure: (state, action: PayloadAction<any>) => {
      state.loading.gameTitleCreate = false;
      state.error = action.payload;
    }
  },
});

export const {
  gameTitleCreateStart,
  gameTitleCreateSuccess,
  gameTitleCreateFailure,
  
} = gameTitleSlice.actions;

export default gameTitleSlice.reducer;
