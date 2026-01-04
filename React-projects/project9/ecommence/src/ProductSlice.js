import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hello : "Hello Data",
 screenProducts : [],
};

export const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
       setScreenProducts : (state, action) => {
        state.screenProducts = action.payload;
       },
  },
});

export const { setScreenProducts, setCartProducts } = ProductSlice.actions;

export default ProductSlice.reducer;