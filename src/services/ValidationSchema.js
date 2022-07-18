import * as yup from "yup";

export const bookWorkSpaceSchema = yup.object().shape({
  // workspaces_booked: yup.number().required("Workspace is required"),
  city_id: yup.string().required("City Should be selected"),
  location_id: yup.string().required("Location Should be selected"),
  building_id: yup.string().required("Building Should be selected"),
  // floor_id: yup.string().required("Floor Should be selected"),
  purpose: yup.string().required("Purpose Should be selected"),
  // user_ids: yup.array().min(1, "User must be selected")
});
