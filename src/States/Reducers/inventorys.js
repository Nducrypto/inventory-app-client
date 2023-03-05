import { createSlice } from "@reduxjs/toolkit";

const inventoriesSlice = createSlice({
  name: "inventory",
  initialState: {
    inventory: [],
    loading: false,
    isError: false,

    numberOfPages: 0,
    currentPage: {},
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
      console.log(action.payload.numberOfPages);
      state.inventory = action.payload.transactions;
      state.currentPage = action.payload.currentPage;
      state.numberOfPages = action.payload.numberOfPages;
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
        item.quantityIn = action.payload.quantityIn;
        item.quantitySold = action.payload.quantitySold;
        item.quantityRemaining = action.payload.quantityRemaining;
        item.outgoingCost = action.payload.outgoingCost;
        item.totalCost = action.payload.totalCost;
        item.outgoing = action.payload.outgoingCost;
      } else {
        state.inventory.push(action.payload);
      }
    },
    deleteInventory: (state, action) => {
      state.inventory.splice(
        state.inventory.findIndex((item) => item._id === action.payload._id),
        1
      );
    },
    deleteHistory: (state, action) => {
      state.history.splice(
        state.history.findIndex((item) => item._id === action.payload._id),
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
  deleteInventory,
  deleteHistory,
  updateProduct,
} = inventoriesSlice.actions;
export default inventoriesSlice.reducer;
