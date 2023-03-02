// const AuthReducer = (
//   authReducer = {
//     authData: null || JSON.parse(localStorage.getItem("profile")),
//     loading: false,
//     error: null,
//     singleUser: [],
//   },
//   action
// ) => {
//   switch (action.type) {
//     case "LOADING_START":
//       return { ...authReducer, loading: true };
//     case "LOADING_END":
//       return { ...authReducer, loading: false };

//     case "LOGIN_START":
//       return { ...authReducer, authData: null, loading: false, error: null };
//     case "LOGIN_SUCCESS":
//       localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
//       return {
//         ...authReducer,
//         authData: action.payload,
//         error: null,
//       };
//     case "LOGIN_FAILURE":
//       return {
//         ...authReducer,
//         authData: null,
//         loading: false,
//         error: action.payload,
//       };
//     case "LOGOUT":
//       localStorage.clear();
//       return { ...authReducer, authData: null, loading: false, error: false };

//     case "FETCH_USER_BY_ID":
//       return { ...authReducer, singleUser: action.payload };

//     case "UPDATE_USER":
//       return {
//         ...authReducer,
//         singleUser: authReducer.singleUser.map((p) =>
//           p._id === action.payload._id ? action?.payload : p
//         ),
//       };

//     default:
//       return authReducer;
//   }
// };

// export default AuthReducer;

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    authData: null,
    loading: false,
    error: false,
    singleUser: [],
  },
  reducers: {
    loginLoading: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.authData = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getUserById: (state, action) => {
      state.singleUser = action.payload;
      state.loading = false;
    },
    userUpdate: (state, action) => {
      state.singleUser[
        state.singleUser.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    },
  },
  Logout: (state) => {
    localStorage.clear("profile");
    // state.authData = null;
    state.loading = false;
    state.error = false;
  },
});

export const {
  loginLoading,
  getUserById,
  userUpdate,
  loginFailure,
  loginSuccess,
  Logout,
} = authSlice.actions;
export default authSlice.reducer;
