import * as api from "../Api/index";
import {
  loginLoading,
  getUserById,
  userUpdate,
  loginFailure,
  loginSuccess,
} from "../Reducers/AuthReducer";
export const login = (formAuth, navigate) => async (dispatch) => {
  try {
    dispatch(loginLoading());

    const { data } = await api.login(formAuth);

    dispatch(loginSuccess(data));

    navigate("/");
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};

export const register = (formAuth, navigate) => async (dispatch) => {
  try {
    dispatch(loginLoading());

    const { data } = await api.register(formAuth);
    dispatch(loginSuccess(data));

    navigate("/");
  } catch (err) {
    dispatch(loginFailure(err.response.data));

    console.log(err);
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch(loginLoading());

    const { data } = await api.fetchUser(id);
    dispatch(getUserById(data));
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (id, update) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, update);
    console.log(data);
    dispatch(userUpdate(data));
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};
