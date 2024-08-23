import { combineReducers } from "redux";

// import slices
import authSliceReducer from "../features/auth/slices/authSlice";
import gameTitleSlice from "../features/gametitle/slices/gameTitleSlice";
import auctionSlice from "../features/auction/slices/auctionSlice";
import cartReducer from "../features/cart/slice/cartSlice";
import checkoutReducer from "../features/cart/slice/checkoutSlice";

const rootReducer = combineReducers({
  auth: authSliceReducer,
  gametitle: gameTitleSlice,
  auction: auctionSlice,
  cart: cartReducer,
  checkout: checkoutReducer
});

export default rootReducer;
