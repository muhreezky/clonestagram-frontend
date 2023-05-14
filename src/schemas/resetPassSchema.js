import * as yup from "yup";

export default yup.object().shape({
  email: yup.string().email('Please enter valid e-mail address').required('E-mail is required')
})