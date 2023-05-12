import { Card, Button, Input, Form } from "react-daisyui";
import { useFormik } from "formik";
import * as yup from "yup";

export default function ForgotPass () {
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: yup.object.shape({
      email: yup.string().email('Please enter valid e-mail address').required('E-mail is required')
    })
  });

  return (
    <Card className="bg-base-300 shadow-md shadow-blue-700">
      <Card.Title className="p-5 text-center">
        Forgot your password? No problem!
      </Card.Title>
      <Form onSubmit={formik.handleSubmit}>
        
      </Form>
    </Card>
  )
}