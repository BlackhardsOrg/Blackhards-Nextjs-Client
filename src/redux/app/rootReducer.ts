import { combineReducers } from "redux";

// import slices
import authSliceReducer from "../features/auth/slices/authSlice";
import gameTitleSlice from "../features/gametitle/slices/gameTitleSlice";

const rootReducer = combineReducers({
  auth: authSliceReducer,
  gametitle: gameTitleSlice
});

export default rootReducer;
