import * as api from "../Api/index";

export const getTransactions = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });

    const { data } = await api.fetchInventories();
    dispatch({ type: "FETCH_ALL", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error);
  }
};

export const createTransaction =
  (transaction, setSnackBarOpen) => async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });

      const { data } = await api.createTransaction(transaction);
      dispatch({ type: "END_LOADING" });

      dispatch({ type: "CREATE", payload: data });
      setSnackBarOpen("create");
    } catch (error) {
      console.log(error);
    }
  };

export const deleteTransaction = (id, setSnackBarOpen) => async (dispatch) => {
  try {
    await api.deleteTransaction(id);
    dispatch({ type: "DELETE", payload: id });
    setSnackBarOpen("delete");
  } catch (error) {
    console.log(error);
  }
};

export const updateTransaction = (id, transaction) => async (dispatch) => {
  try {
    const { data } = await api.updateTransaction(id, transaction);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
