import * as api from "../Api/index";
import {
  startLoading,
  endLoading,
  getProducts,
  createProduct,
  showError,
  deleteProduct,
  updateProduct,
} from "../Reducers/inventorys";
export const getTransactions = () => async (dispatch) => {
  try {
    dispatch(startLoading());

    const { data } = await api.fetchInventories();
    dispatch(getProducts(data));
    dispatch(endLoading());
  } catch (error) {
    dispatch(showError());
  }
};

export const createTransaction =
  (transaction, setSnackBarOpen, setOpenBackDrop) => async (dispatch) => {
    try {
      dispatch(startLoading());

      const { data } = await api.createTransaction(transaction);
      dispatch(endLoading());

      dispatch(createProduct(data));
      setOpenBackDrop(false);
      setSnackBarOpen("create");
    } catch (error) {
      dispatch(showError());

      console.log(error);
    }
  };

export const deleteTransaction = (id, setSnackBarOpen) => async (dispatch) => {
  try {
    await api.deleteTransaction(id);
    dispatch(deleteProduct(id));
    setSnackBarOpen("delete");
  } catch (error) {
    dispatch(showError());
    console.log(error);
  }
};

export const updateTransaction = (id, transaction) => async (dispatch) => {
  try {
    const { data } = await api.updateTransaction(id, transaction);
    dispatch(updateProduct(data));
  } catch (error) {
    dispatch(showError());
    console.log(error);
  }
};
