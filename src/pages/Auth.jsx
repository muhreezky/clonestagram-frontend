import { Button, Form, Card, Input } from "react-daisyui";
import { useFormik } from "formik";
import registerSchema from "../schemas/registerSchema";
import loginSchema from "../schemas/loginSchema";
import Password from "../components/Password";

export default function Auth(props) {
  const { newAccount } = props;
  const validationSchema = newAccount ? registerSchema : loginSchema;
  const initialValues = newAccount
    ? {
        email: "",
        username: "",
        password: "",
        confirmpass: "",
      }
    : {
        email: "",
        password: "",
      };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {},
  });

  return (
    <Card className="bg-base-300 shadow-md shadow-blue-700">
      <Card.Title className="p-5">
        {newAccount ? "Create a new account" : "Login to your account"}
      </Card.Title>
      <Form onSubmit={formik.handleSubmit}>
        <Card.Body>
          <div className="mb-4">
            <label htmlFor="email">E-mail</label>
            <Input
              type="email"
              className="w-full bg-base-200 shadow-md shadow-blue-700"
              name="email"
              id="email"
              placeholder="Enter your e-mail address"
              onChange={formik.handleChange}
            />
            <label htmlFor="email">{formik.errors.email}</label>
          </div>

          {newAccount && (
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
                {(formik.values.confirmpass != formik.values.password) && "Confirm your password first"}
              </label>
            </div>
          )}
        </Card.Body>
        <Card.Actions className="p-6">
          <Button type="submit" color="primary" className="w-full">
            Submit
          </Button>
        </Card.Actions>
      </Form>
    </Card>
  );
}
