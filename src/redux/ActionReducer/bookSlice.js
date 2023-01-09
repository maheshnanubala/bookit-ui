import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const availableWorkspace = createAsyncThunk(
  "bookworkspace/availableWorkspace",
  async ({ floorId, fromDate, toDate, startTime, endTime, buildingId, userList = [], purpose }) => {
    try {
      const response = await api.availableworkspace(floorId, fromDate, toDate, startTime, endTime, buildingId, userList, purpose
      );
      // navigate(
      //   `/new-booking/room-selection/${floorId}/${fromDate}/${toDate}/${startTime}/${endTime}/${buildingId}/${purpose}`
      // );
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

export const updateModifyBookingData = createAsyncThunk(
  "bookworkspace/updateModifyBookingData",
  async (data) => {
    try {
      return data;
    } catch (err) {
      console.log(err.response.data.message);
    }
  }
);

export const modifyBookWorkSpace = createAsyncThunk(
  "bookworkspace/modifyBookWorkSpace",
  async ({ bookSpace, navigate, toast, bookingId }) => {
    try {
      const response = await api.modifyBookWorkSpace(bookSpace, bookingId);
      navigate(`/home`);
      toast.success("Booking Modified Succesfully");
      return response.data;
    } catch (err) {
      if (err.response.status !== 200 && err.response.status !== 201) {
        toast.error(err.response.data.message);
      }
    }
  }
);

export const getMyBookingDetails = createAsyncThunk(
  "bookworkspace/getMyBookingDetails",
  async () => {
    try {
      const responses = await Promise.all([api.getMyBookingDetails(), api.getMyCabinBookingDetails()]);
      const workspaceBookingDetails = responses[0]?.data;
      const cabinBookingDetails = responses[1]?.data;
      return { "workspaceBookingDetails": workspaceBookingDetails, "cabinBookingDetails": cabinBookingDetails };
    } catch (err) {
      if (err.response.status !== 200 && err.response.status !== 201) {
        console.log(err.response.data.message);
      }
    }
  }
);

export const getworkspaceDetails = createAsyncThunk(
  "bookworkspace/workspaceDetails",
  async () => {
    try {
      const response = await api.getworkspaceDetails();
      console.log('response', response);
      return response.data;
    } catch (err) {
      if (err.response.status !== 200 && err.response.status !== 201) {
        console.log(err.response.data.message);
      }
    }
  }
);

export const updateCurrentBookingData = createAsyncThunk(
  "bookworkspace/updateCurrentBookingData",
  async (payload) => {
    try {
      return payload;
    } catch (err) {
      console.log(err.response.data.message);
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "bookworkspace/cancelBooking",
  async ({ bookingId, payload, toast, dispatch }) => {
    try {
      const response = await (payload) ? api.cancelCabinBooking(payload) : api.cancelBooking(bookingId);
      toast.success(response.data.message);
      dispatch(getMyBookingDetails());
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
    workspaceBookingDetails: null,
    workspacedetails: null,
    availableworkspace: {},
    bookworkspaceDetails: null,
    modifyBookingData: null,
    error: "",
    currentBookingData: null,
    loading: false,
  },
  reducers: {},
  extraReducers: {
    // getworkspaceDetails
    [getworkspaceDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [getworkspaceDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.workspacedetails = action.payload;
    },
    [getworkspaceDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    // availableWorkspace
    [availableWorkspace.pending]: (state, action) => {
      state.loading = true;
    },
    [availableWorkspace.fulfilled]: (state, action) => {
      state.loading = false;
      state.availableworkspace = action.payload;
    },
    [availableWorkspace.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    // bookworkspace
    [bookworkspace.pending]: (state, action) => {
      state.loading = true;
    },
    [bookworkspace.fulfilled]: (state, action) => {
      state.loading = false;
      state.bookworkspaceDetails = action.payload;
    },
    [bookworkspace.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    // updateModifyBookingData
    [updateModifyBookingData.pending]: (state, action) => {
      state.loading = true;
    },
    [updateModifyBookingData.fulfilled]: (state, action) => {
      state.loading = false;
      state.modifyBookingData = action.payload;
    },
    [updateModifyBookingData.rejected]: (state, action) => {
      state.loading = false;
    },
    // modifyBookWorkSpace
    [modifyBookWorkSpace.pending]: (state, action) => {
      state.loading = true;
    },
    [modifyBookWorkSpace.fulfilled]: (state, action) => {
      state.loading = false;
      state.bookworkspaceDetails = action.payload;
    },
    [modifyBookWorkSpace.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    // getMyBookingDetails
    [getMyBookingDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [getMyBookingDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.workspaceBookingDetails = action.payload.workspaceBookingDetails;
      state.cabinBookingDetails = action.payload.cabinBookingDetails;
      state.modifyBookingData = null;
      state.availableworkspace = null;
      state.currentBookingData = null;
    },
    [getMyBookingDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    // updateCurrentBookingData
    [updateCurrentBookingData.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCurrentBookingData.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentBookingData = action.payload;
    },
    [updateCurrentBookingData.rejected]: (state, action) => {
      state.loading = false;
    },
    // cancelBooking
    [cancelBooking.pending]: (state, action) => {
      state.loading = true;
    },
    [cancelBooking.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [cancelBooking.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default bookSlice.reducer;