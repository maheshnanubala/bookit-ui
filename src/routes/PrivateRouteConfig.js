import React from "react";
import { RoomSelection } from "../pages/BookSpace/RoomSelection/RoomSelection";
import Home from "../pages/Home/Home.lazy";
import MyBookings from "../pages/MyBookings/MyBookings.lazy";
import MyProfile from "../pages/MyProfile/MyProfile.lazy";
import NewBooking from "../pages/NewBooking/newBooking";
import CabinBooking from "../pages/CabinBooking/cabinBooking";
import { NotFound } from "../pages/NotFound/NotFound";

export const PrivateRouteConfig = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
    exact: true,
  },
  {
    name: "me",
    path: "/me",
    element: <MyProfile />,
    exact: true,
  },
  {
    name: "bookings",
    path: "/bookings",
    element: <MyBookings />,
    exact: true,
  },
  {
    name: "new bookings",
    path: "/new-booking",
    element: <NewBooking />,
    exact: true,
  },

  {
    name: "cabin bookings",
    path: "/cabin-booking",
    element: <CabinBooking />,
    exact: true,
  },

  {
    name: "modify bookings",
    path: "/modify-booking",
    element: <NewBooking />,
    exact: true,
  },
  {

    name: "modify bookings",
    path: "/modify-booking",
    element: <CabinBooking />,
    exact: true,

  },
  {
    name: "room selection",
    path: "/new-booking/room-selection/:floorId/:fromDate/:toDate/:startTime/:endTime/:buildingId/:purpose",
    element: <RoomSelection />,
    exact: true,
  },
  {
    name: "modify room selection",
    path: "/modify-booking/room-selection/:floorId/:fromDate/:toDate/:startTime/:endTime/:buildingId/:purpose",
    element: <RoomSelection />,
    exact: true,
  },
  {
    name: "#",
    path: "/",
    element: <Home />,
    exact: true,
  },
  {
    name: "not found",
    path: "*",
    element: <NotFound />,
    exact: true,
  },
];
