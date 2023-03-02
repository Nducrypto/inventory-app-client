import { createSlice } from "@reduxjs/toolkit";

const inventoriesSlice = createSlice({
  name: "inventory",
  initialState: {
    inventory: [],
    loading: false,
    isError: false,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.isError = false;
    },
    endLoading: (state) => {
      state.loading = false;
    },
    getProducts: (state, action) => {
      state.inventory = action.payload;
    },
    showError: (state, action) => {
      state.isError = action.payload;
      state.loading = false;
    },

    createProduct: (state, action) => {
      const item = state.inventory.find(
        (p) =>
          p.category === action.payload.category &&
          p.creator === action.payload.creator
      );
      if (item) {
        item.quantity = action.payload.quantity;
        item.quantitySold = action.payload.quantitySold;
        item.outgoingCost = action.payload.outgoingCost;
      } else {
        state.inventory.push(action.payload);
      }
    },
    deleteProduct: (state, action) => {
      state.inventory.splice(
        state.inventory.findIndex((item) => item._id === action.payload),
        1
      );
    },
    updateProduct: (state, action) => {
      state.inventory[
        state.inventory.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    },
  },
});

export const {
  startLoading,
  endLoading,
  getProducts,
  createProduct,
  showError,
  deleteProduct,
  updateProduct,
} = inventoriesSlice.actions;
export default inventoriesSlice.reducer;
