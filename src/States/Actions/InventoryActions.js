import * as api from "../Api/index";

export const getTransactions = () => async (dispatch) => {
  try {
    const { data } = await api.fetchInventories();
    console.log(data);
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getTransaction = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchInventory(id);
    dispatch({ type: "FETCH_ONE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createTransaction = (transaction) => async (dispatch) => {
  try {
    const { data } = await api.createTransaction(transaction);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTransaction = (id) => async (dispatch) => {
  try {
    await api.deleteTransaction(id);
    dispatch({ type: "DELETE", payload: id });
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
