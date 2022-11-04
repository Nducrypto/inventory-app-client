import axios from "axios";

const API = axios.create({
  baseURL: "https://inventory-api-ckw9.onrender.com/api",
});
// const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchInventories = () => API.get("/page");

export const fetchInventory = (id) => API.get(`/page/${id}`);

export const createTransaction = (newTransaction) =>
  API.post("/page", newTransaction);

export const deleteTransaction = (id) => API.delete(`/page/${id}`);

export const updateTransaction = (id, updatedTransaction) =>
  API.patch(`/page/${id}`, updatedTransaction);

//    =======Auth API=====
export const login = (formAuth) => API.post("/auth/login", formAuth);
export const register = (formAuth) => API.post("/auth/register", formAuth);
