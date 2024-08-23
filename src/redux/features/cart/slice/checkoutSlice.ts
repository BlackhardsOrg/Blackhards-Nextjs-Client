import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface ICheckoutState {
  loading: boolean;
}

const initialState: ICheckoutState = {
  loading: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    innitializePaymentFixedStart: (state, action: PayloadAction<null>) => {
      state.loading = true
    },
    innitializePaymentFixedSuccess: (state, action: PayloadAction<null>) => {
      state.loading = false;
    },
    innitializePaymentFixedFailed: (state) => {
      state.loading = false;
    },
  },
});

export const {
  innitializePaymentFixedStart,
  innitializePaymentFixedSuccess,
  innitializePaymentFixedFailed,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
