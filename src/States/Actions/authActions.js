import * as api from "../Api/index";

export const login = (formAuth, navigate) => async (dispatch) => {
  dispatch({ type: "LOGIN_START" });

  try {
    dispatch({ type: "START_LOADING" });

    const { data } = await api.login(formAuth);

    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    dispatch({ type: "END_LOADING" });

    navigate("/");
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
  }
};

export const register = (formAuth, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_START" });

    const { data } = await api.register(formAuth);
    console.log(data);
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    dispatch({ type: "LOADING_END" });

    navigate("/");
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });

    console.log(err);
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_START" });

    const { data } = await api.fetchUser(id);
    dispatch({ type: "FETCH_USER_BY_ID", payload: data });

    dispatch({ type: "LOADING_END" });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (id, update) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, update);
    console.log(data);
    dispatch({ type: "UPDATE_USER", payload: data });
  } catch (err) {
    dispatch({ type: "SET_ERROR", payload: err.data.message });
  }
};
