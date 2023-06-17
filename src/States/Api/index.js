import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });
// const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchInventories = (creator) =>
  API.get(`/page?creator=${creator}`);

export const createTransaction = (newTransaction) =>
  API.post("/page", newTransaction);

export const deleteAllTransaction = (data) =>
  API.delete(`/page/deleteAll`, { data });

export const deleteOneHistory = (data) =>
  API.delete("/page/deleteOne", { data });
// API.delete(`/page/${id}/${data.type}/${data.category}/${data.creator}`);
export const updateTransaction = (id, updatedTransaction) =>
  API.patch(`/page/${id}`, updatedTransaction);

//    =======Auth/USERS API=====
export const login = (formAuth) => API.post("/auth/login", formAuth);
export const register = (formAuth) => API.post("/auth/register", formAuth);

export const fetchUser = (id) => API.get(`/auth/${id}`);

export const updateUser = (id, userUpdate) =>
  API.put(`/auth/${id}`, userUpdate);
