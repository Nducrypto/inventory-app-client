import { combineReducers } from "redux";

import inventory from "./inventorys";
import authReducer from "./AuthReducer";

export default combineReducers({ inventory, authReducer });
