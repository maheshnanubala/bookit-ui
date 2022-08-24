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

export const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")

    .required("Email is required")
    .matches(/\@(indiumsoft)\.com$/i, "Kindly check domain name"),
  password: yup.string().required("Password is required"),
});

export const signUpValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")

    .required("Email is required")
    .matches(/\@(indiumsoft)\.com$/i, "Kindly check domain name"),
  password: yup.string().required("Password is required"),
});
