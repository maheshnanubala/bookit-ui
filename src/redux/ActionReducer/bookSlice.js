import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const bookworkspace = createAsyncThunk(
  "bookworkspace/bookworkspace",
  async ({ bookSpace, navigate, toast }) => {
    try {
      const response = await api.bookworkSpace(bookSpace);
      navigate(`/home`);
      toast.success("Successfully Booked");
      return response.data;
    } catch (err) {
      if (err.response.status !== 200 && err.response.status !== 201) {
        console.log(err.message);
      }
      return err.response.data.message;
    }
  }
);

export const availableworkspace = createAsyncThunk(
  "bookworkspace/availableworkspace",
  async ({ availableBookSpaceValue }) => {
    try {
      const response = await api.availableworkSpace(availableBookSpaceValue);
      return response.data;
    } catch (err) {
      if (err.response.status !== 200 && err.response.status !== 201) {
        console.log(err.message);
      }
      return err.response.data.message;
    }
  }
);

const bookSlice = createSlice({
  name: "bookworkspace",
  initialState: {
    workspace: null,
    availableworkspace: null,
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [bookworkspace.pending]: (state, action) => {
      state.loading = true;
    },
    [bookworkspace.fulfilled]: (state, action) => {
      state.loading = false;
      state.workspace_details = action.payload;
    },
    [bookworkspace.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [availableworkspace.pending]: (state, action) => {
      state.loading = true;
    },
    [availableworkspace.fulfilled]: (state, action) => {
      state.loading = false;
      state.availableworkspace = action.payload;
    },
    [availableworkspace.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default bookSlice.reducer;
