import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Item, ApiItem } from "../../app/api";
import { fetchItems, fetchItem } from "../../app/api";

export interface ProductsState {
  products: Item[];
}

const initialState: ProductsState = {
  products: [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (): Promise<Item[]> => {
    const items = await fetchItems(15);
    return items;
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id: string) => {
    const item = await fetchItem(id);
    return {
      id: item.id,
      name: item.name,
      price: item.cost,
      description: item.description,
      imageURL: item.imageURL,
    };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    receivedItems(state, action) {
      const products = action.payload.results;
      products.forEach((product: ApiItem) => {});
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
    });
  },
});

export const { receivedItems } = productsSlice.actions;

export default productsSlice.reducer;
