import { Card, Button, Input, Form } from "react-daisyui";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLoginData from "../hooks/useLoginData";
import forgotPass from "../api/forgotPass";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function ForgotPass() {
  const { loggedIn } = useLoginData();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data) => await forgotPass(data),
    onSuccess: () => {
      Swal.fire({
        title: "E-mail Sent",
        text: "Please check your e-mail inbox and spam",
        icon: "info"
      })
    }
  });

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
    onSubmit: (values) => {
      mutation.mutate(values)
    }
  });

  useEffect(() => {
    if (loggedIn) navigate("/");
  }, [])

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
              onChange={formik.handleChange}
            />
            <label htmlFor="email">{formik.errors.email}</label>
          </div>
        </Card.Body>
        <Card.Actions className="p-3">
          <Button color="primary" type="submit" className="w-full" disabled={mutation.isLoading}>
            Send
          </Button>
        </Card.Actions>
      </Form>
    </Card>
  );
}
