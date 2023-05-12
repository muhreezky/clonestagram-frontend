import * as yup from "yup";

export default yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid e-mail address")
    .required("E-mail is required"),
  username: yup
    .string()
    .min(4, "Too short (min. 4)")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Too short (min. 8)")
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[0-9])(?=.*[$@$!%*?&_])[0-9A-Za-z\d$@$!%*?&_]{8,20}$/,
      "Password must contain uppercase, number, and special char"
    ),
});
