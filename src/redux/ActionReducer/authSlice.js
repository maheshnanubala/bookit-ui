import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ formValues, navigate, toast }) => {
    try {
      const response = await api.signIn(formValues);
      navigate(`/home`);
      toast.success("Successfully logged in");
      return response.data;
    } catch (err) {
      if (err.response.status !== 200 && err.response.status !== 201) {
        toast.error(err.response.data.message);
      }
      return err.response.data.message;
    }
  }
);

export const signup = createAsyncThunk(
  "auth/sign-up",
  async ({ formValues, navigate, toast }) => {
    try {
      const response = await api.signUp(formValues);
      if (!response) {
        toast.error("Failed to register");
      } else {
        toast.success("Registered Successfully");
        navigate(`/`);
      }
    } catch (err) {
      if (err.response.status !== 200 && err.response.status !== 201) {
        toast.error(err.response.data.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [signin.pending]: (state, action) => {
      state.loading = true;
    },
    [signin.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [signin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
