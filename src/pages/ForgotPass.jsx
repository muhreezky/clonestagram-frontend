import { Card, Button, Input, Form } from "react-daisyui";
import { useFormik } from "formik";
import * as yup from "yup";

export default function ForgotPass() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Please enter valid e-mail address")
        .required("E-mail is required"),
    }),
  });

  return (
    <Card className="bg-base-300 shadow-md shadow-blue-700">
      <Form onSubmit={formik.handleSubmit}>
        <Card.Body>
          <Card.Title className="mb-3 text-center">
            Forgot your password? No problem!
          </Card.Title>
          <div>
            <label htmlFor="email" className="mb-3">Send reset link to your e-mail</label>
            <Input
              type="email"
              className="w-full mb-2 bg-base-200 shadow-md shadow-blue-700"
              id="email"
              name="email"
              placeholder="Enter your e-mail address"
            />
            <label htmlFor="email">{formik.errors.email}</label>
          </div>
        </Card.Body>
        <Card.Actions className="p-3">
          <Button color="primary" type="submit" className="w-full">
            Send
          </Button>
        </Card.Actions>
      </Form>
    </Card>
  );
}
