import * as yup from "yup";

export const bookWorkSpaceSchema = yup.object().shape({
  selected_workspaces: yup
    .array()
    .of(
      yup.object().shape({
        seats: yup
          .array()
          .min(1, "Minimum 1 seat to be selected")
          .required("Required"),
      })
    )
    .required(),
});
