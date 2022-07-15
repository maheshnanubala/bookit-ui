import axios from "axios";

const usertoken = JSON.parse(localStorage.getItem("user"));

const API = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    Authorization: "Bearer" + " " + usertoken?.token,
  },
});

// Login
export const signIn = (data) => API.post("/api/sign-in", data);
export const signUp = (data) => API.post("/api/sign-up", data);

// Workspace
export const workspaceDetails = () =>
  API.get("/api/workspace_details", {
    headers: {
      Authorization: "Bearer" + " " + usertoken?.token,
    },
  });

export const bookworkSpace = (data) =>
  API.post("/api/book_workspace", data, {
    headers: {
      Authorization: "Bearer" + " " + usertoken?.token,
    },
  });

export const availableworkSpace = (data) =>
  API.get("/api/available_workspace", data, {
    headers: {
      Authorization: "Bearer" + " " + usertoken?.token,
    },
  });
