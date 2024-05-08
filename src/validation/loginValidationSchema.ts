import * as Yup from "yup";
import isEmail from "validator/lib/isEmail";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .test(
      "is-valid",
      () => "Invalid email address",
      (value) =>
        value
          ? isEmail(value)
          : new Yup.ValidationError("Invalid email address")
    ),
  password: Yup.string()
    .min(4, "Password should be atleast 4 characters long")
    .max(16, "Password should not be more than 16 characters long")
    .required("Password is required"),
});
