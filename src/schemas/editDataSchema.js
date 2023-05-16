import * as yup from "yup";

export default yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-z0-9]+$/gi, "Username must be alphanumeric only")
    .optional(),
  bio: yup.string().optional(),
  fullname: yup.string().optional(),
});