import { Button, Form, Card, Input, Textarea } from "react-daisyui";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newAccount as registerAccount, login } from "../api";
import { useNavigate } from "react-router-dom";

import registerSchema from "../schemas/registerSchema";
import loginSchema from "../schemas/loginSchema";
import Password from "../components/Password";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import useLoginData from "../hooks/useLoginData";
import { useEffect, useState } from "react";

export default function Auth(props) {
  const { newAccount } = props;
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  const validationSchema = newAccount ? registerSchema : loginSchema;
  const { loggedIn, access_token } = useLoginData();
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const initialValues = newAccount
    ? {
        email: "",
        username: "",
        password: "",
        confirmpass: "",
        fullname: "",
        bio: "",
      }
    : {
        email: "",
        password: "",
      };
  
  const mutation = useMutation({
    mutationFn: async (data) => newAccount ? await registerAccount(data) : await login(data),
    onSuccess: (data) => {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: `${data.message}`
      })
        .then(result => {
          (data.access_token && Cookies.set("access_token", data.access_token, { expires: 7 }));
          if (result.isConfirmed || result.isDismissed) {
            navigate(newAccount ? "/login" : "/");
          }
        })
      setSubmitDisabled(false);
    },
    onError: (err) => {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: err.response.data.message
      });
      setSubmitDisabled(false);
      // console.log(err.response.data);
    }
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // if (values.confirmpass !== values.password) {
      //   return;
      // }
      setSubmitDisabled(true);
      mutation.mutate(values);
    },
  });

  useEffect(() => {
    loggedIn && navigate("/");
  },[]);

  return (
    <Card className="bg-base-300 shadow-md shadow-blue-700">
      <Card.Title className="p-5">
        {newAccount ? "Create a new account" : "Login to your account"}
      </Card.Title>
      <Form onSubmit={formik.handleSubmit}>
        <Card.Body>
          <div className="mb-4">
            <label htmlFor="email">E-mail {!newAccount && "/ Username"}</label>
            <Input
              type="text"
              className="w-full bg-base-200 shadow-md shadow-blue-700"
              name="email"
              id="email"
              placeholder={!newAccount ? "Enter your e-mail or username" : "Enter your e-mail address"}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">{formik.errors.email}</label>
          </div>

          {newAccount && (
            <>
              <div className="mb-4">
                <label htmlFor="username">Username</label>
                <Input
                  className="w-full bg-base-200 shadow-md shadow-blue-700"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  onChange={formik.handleChange}
                />
                <label htmlFor="username">{formik.errors.username}</label>
              </div>
              <div className="mb-4">
                <label htmlFor="fullname">Full Name</label>
                <Input
                  className="w-full bg-base-200 shadow-md shadow-blue-700"
                  name="fullname"
                  id="fullname"
                  placeholder="Enter your full name"
                  onChange={formik.handleChange}
                />
                <label htmlFor="fullname">{formik.errors.fullname}</label>
              </div>
              <div className="mb-4">
                <label htmlFor="bio">Bio Text</label>
                <Textarea
                  className="w-full bg-base-200 shadow-md shadow-blue-700"
                  name="bio"
                  id="bio"
                  placeholder="Enter Bio Text"
                  onChange={formik.handleChange}
                />
                <label htmlFor="bio">{formik.errors.bio}</label>
              </div>
            </>
          )}

          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <Password
              className="shadow-md shadow-blue-700 rounded-md"
              inputClassName="w-full bg-base-200"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
            />
            <label htmlFor="password">{formik.errors.password}</label>
          </div>

          {newAccount && (
            <div className="mb-4">
              <label htmlFor="confirmpass">Confirm Password</label>
              <Password
                className="shadow-md shadow-blue-700 rounded-md"
                inputClassName="w-full bg-base-200"
                id="confirmpass"
                name="confirmpass"
                placeholder="Re-type your password here"
                onChange={formik.handleChange}
              />
              <label htmlFor="confirmpass">
                {formik.errors.confirmpass}
              </label>
            </div>
          )}
          <p className="link flex flex-col gap-2">
            <Link to={newAccount ? "/login" : "/register"}>
              {newAccount ? "I already registered" : "I don't have account"}
            </Link>
            {!newAccount && (
              <Link to={"/forgot"}>
                I forgot my password
              </Link>
            )}
          </p>
        </Card.Body>
        <Card.Actions className="p-6">
          <Button type="submit" color="primary" className="w-full" disabled={submitDisabled}>
            Submit
          </Button>
        </Card.Actions>
      </Form>
    </Card>
  );
}
