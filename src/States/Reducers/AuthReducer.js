const AuthReducer = (
  authReducer = {
    authData: null || JSON.parse(localStorage.getItem("profile")),
    loading: false,
    error: null,
    // singleUser: [],
  },
  action
) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...authReducer, loading: true };
    case "END_LOADING":
      return { ...authReducer, loading: false };

    case "LOGIN_START":
      return { ...authReducer, authData: null, loading: false, error: null };
    case "LOGIN_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...authReducer,
        authData: action.payload,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...authReducer,
        authData: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      localStorage.clear();
      return { ...authReducer, authData: null, loading: false, error: false };

    case "FETCH_USER_BY_ID":
      return { ...authReducer, singleUser: action.payload };

    case "UPDATE_USER":
      return {
        ...authReducer,
        singleUser: authReducer.singleUser.map((p) =>
          p._id === action.payload._id ? action?.payload : p
        ),
      };

    default:
      return authReducer;
  }
};

export default AuthReducer;
