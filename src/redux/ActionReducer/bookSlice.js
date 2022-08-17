import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const availableWorkspace = createAsyncThunk(
  "bookworkspace/availableWorkspace",
  async ({
    floorId,
    fromDate,
    toDate,
    startTime,
    endTime,
    buildingId,
    value,
    purpose,
    navigate,
  }) => {
    try {
      const response = await api.availableworkspace(
        floorId,
        fromDate,
        toDate,
        startTime,
        endTime,
        buildingId,
        value,
        purpose
      );
      navigate(`/new-booking/room-selection`);
      return response.data;
    } catch (err) {
      if (err.response.status !== 200 && err.response.status !== 201) {
        console.log(err.response.data.message);
      }
    }
  }
);

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
        toast.error(err.response.data.message);
      }
    }
  }
);

const bookSlice = createSlice({
  name: "bookworkspace",
  initialState: {
    workspacedetails: null,
    availableworkspace: {},
    bookworkspaceDetails: null,
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [availableWorkspace.pending]: (state, action) => {
      state.loading = true;
    },
    [availableWorkspace.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem(
        "availableworkspace",
        JSON.stringify({ ...action.payload })
      );
      state.availableworkspace = action.payload;
    },
    [availableWorkspace.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
  },
});

export default bookSlice.reducer;
