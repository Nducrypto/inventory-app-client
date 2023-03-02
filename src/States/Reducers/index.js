import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import inventory from "./inventorys";
import authReducer from "./AuthReducer";

const rootReducer = combineReducers({ inventory, authReducer });

export const store = configureStore({
  reducer: rootReducer,
});
