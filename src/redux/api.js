import axios from "axios";

const apiHost = "http://localhost:4000";

const API = axios.create({ baseURL: apiHost });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user")).token
      }`;
  }
  return req;
});

// Login
export const signIn = (data) => API.post("/api/sign-in", data);
export const signUp = (data) => API.post("/api/sign-up", data);
export const verifyUserOtp = (data) => API.post("/api/verify-otp", data);
export const verifyLoginOtp = (data) => API.post("/api/verify-login-otp", data);



// Workspace
export const getMyBookingDetails = () => API.get("/api/my_bookings");

export const bookworkSpace = (data) => API.post("/api/book_workspace", data);

export const modifyBookWorkSpace = (data, bookingId) => API.put(`/api/book_workspace/${bookingId}`, data);

export const getworkspaceDetails = () => API.get("/api/workspace_details");

export const cancelBooking = (bookingId) => API.put(`/api/cancel_booking/${bookingId}`);

export const availableworkspace = (floorId, fromDate, toDate, startTime, endTime, buildingId, value, purpose) => API.get(
  `/api/available_workspace?floor_id=${Number(
    floorId
  )}&from_date=${fromDate}&to_date=${toDate}&start_time=${startTime}&end_time=${endTime}&building_id=${Number(
    buildingId
  )}&user_ids=${[value]}&purpose=${purpose}`
);


//cabin booking
export const availableCabinDetails = (dates, buildingId, floorId) => {
  let url = floorId ? `api/cabin_availability?booking_dates=${dates}&building_id=${buildingId}&floor_id=${floorId}` :
    `api/cabin_availability?booking_dates=${dates}&building_id=${buildingId}`;
  return API.get(url)
}

export const bookCabins = (data) => API.post("/api/cabin_booking", data);
export const cancelCabinBooking = (data) => API.put(`/api/cancel_cabin_booking`, data);
export const modifyCabins = (data, bookingId) => API.put(`/api/cabin_booking/${bookingId}`, data);
export const getCabinBookingDetails = () => API.get("/api/my_cabin_booking_details");
export const getMyCabinBookingDetails = () => API.get("/api/my_cabin_booking_details");
