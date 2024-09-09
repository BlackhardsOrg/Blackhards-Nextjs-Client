import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface ICartItem {
  id: string | undefined;
  title: string;
  price: number;
  GamePlayScreenShot: string;
  qty: number;
  packageType: string;
}

interface ICartState {
  items: ICartItem[];
  licenseFee: number;
}

const initialState: ICartState = {
  items: [],
  licenseFee: 10,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<ICartItem>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        // item.quantity += action.payload.quantity;
        toast("Item Already in Cart");
      } else {
        state.items.push(action.payload);
        toast("Item Added to Cart");
      }
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
