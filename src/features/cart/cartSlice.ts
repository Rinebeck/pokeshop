import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CartState {
  items: { [productID: string]: number };
  errorMessage: string | null;
}

const initialState: CartState = {
  items: {},
  errorMessage: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string | number>) => {
      const id = action.payload;
      state.items[id] = state.items[id] ? state.items[id] + 1 : 1;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    return Object.keys(items).reduce((sum, key) => {
      return sum + items[key];
    }, 0);
  }
);

export const getTotalPrice = createSelector(
  (state: RootState) => state.cart.items,
  (state: RootState) => state.products.products,
  (items, products) => {
    return Object.keys(items).reduce((sum, key: string | number) => {
      const product = products[key];
      return sum + product.price * items[key];
    }, 0);
  }
);
