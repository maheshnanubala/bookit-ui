import * as yup from "yup";

export const bookWorkSpaceSchema = yup.object().shape({
  workspaces_booked: yup.string().required("Field is required"),
});
