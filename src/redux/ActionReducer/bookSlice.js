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
      const response = await api.getMyBookingDetails();
      return response.data;
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

export const UpdateParticipantsDetails = createAsyncThunk(
  "bookworkspace/participantsDetails",
  async (data) => {
    try {
      return data;
    } catch (err) {
      console.log(err.response.data.message);
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "bookworkspace/cancelBooking",
  async ({ bookingId, toast, dispatch }) => {
    try {
      const response = await api.cancelBooking(bookingId);
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
    error: "",
    participantsDetails: null,
    loading: false,
  },
  reducers: {},
  extraReducers: {
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
    [getMyBookingDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [getMyBookingDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.workspaceBookingDetails = action.payload;
    },
    [getMyBookingDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    [UpdateParticipantsDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [UpdateParticipantsDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.participantsDetails = action.payload;
    },
    [UpdateParticipantsDetails.rejected]: (state, action) => {
      state.loading = false;
    },
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
