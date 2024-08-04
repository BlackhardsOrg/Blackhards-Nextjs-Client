import { combineReducers } from "redux";

// import slices
import authSliceReducer from "../features/auth/slices/authSlice";
import gameTitleSlice from "../features/gametitle/slices/gameTitleSlice";
import auctionSlice from "../features/auction/slices/auctionSlice";

const rootReducer = combineReducers({
  auth: authSliceReducer,
  gametitle: gameTitleSlice,
  auction: auctionSlice
});

export default rootReducer;
