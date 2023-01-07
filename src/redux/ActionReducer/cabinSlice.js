import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getCabinDetails = createAsyncThunk(
    "cabinBooking/getCabinDetails",
    async ({ dates, buildingId, floorId }) => {
        try {
            const response = await api.availableCabinDetails(dates.toString(), buildingId, floorId);
            return response.data.data;
        } catch (err) {
            if (err.response.status !== 200 && err.response.status !== 201) {
                console.log(err.response.data.message);
            }
        }
    }
);


const cabinSlice = createSlice({
    name: "cabinBooking",
    initialState: {
        error: "",
        loading: false,
        cabinsDetails: null,
        bookedCabinsDetails: null
    },
    reducers: {},
    extraReducers: {
        [getCabinDetails.pending]: (state, action) => {
            state.loading = true;
        },
        [getCabinDetails.fulfilled]: (state, action) => {
            state.loading = false;
            state.cabinsDetails = action.payload;
        },
        [getCabinDetails.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        },

    },
});

export default cabinSlice.reducer;