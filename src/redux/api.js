import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const signIn = (data) => API.post("/api/sign-in", data);
export const signUp = (data) => API.post("/api/sign-up", data);
