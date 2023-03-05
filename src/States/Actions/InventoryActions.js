import * as api from "../Api/index";
import {
  startLoading,
  endLoading,
  getProducts,
  createProduct,
  showError,
  deleteHistory,
  deleteInventory,
  updateProduct,
} from "../Reducers/inventorys";
export const getTransactions = (page, creator) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const { data } = await api.fetchInventories(page, creator);
    console.log(data);
    dispatch(
      getProducts({
        transactions: data.transactions,
        currentpage: data.currentpage,
        numberOfPages: data.numberOfPages,
      })
    );
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

export const deleteAll = (data, setSnackBarOpen) => async (dispatch) => {
  try {
    await api.deleteAllTransaction(data);
    dispatch(deleteInventory(data));
    setSnackBarOpen("delete");
  } catch (error) {
    dispatch(showError());
    console.log(error);
  }
};
export const deleteOne = (data, setSnackBarOpen) => async (dispatch) => {
  try {
    await api.deleteOneHistory(data);
    dispatch(deleteHistory(data));
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
