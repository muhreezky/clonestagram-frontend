import { Button, Input, Card, Form } from "react-daisyui";
import Password from "../components/Password";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import resetPass from "../api/resetPass";
import * as yup from "yup";
import Swal from "sweetalert2";

export default function ResetPass() {
  const { reset_token } = useParams();
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: async (data) => await resetPass(data, reset_token),
		onSuccess: () => {
			Swal.fire({
				title: "Success",
				text: "Password has been changed",
				icon: "success"
			}).then (res => {
				if (res) {
					navigate("/login");
				}
			});
		}
	})

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pass: "",
    },
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .required("Password is required")
        .matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[0-9])(?=.*[$@$!%*?&._])[0-9A-Za-z\d$@$!%*?&_]{8,20}$/,
					"Password must contain uppercase, number, and special char"
				),
      confirm_pass: yup.string().required("Confirm your pass"),
    }),
		onSubmit: (values) => {
			mutation.mutate(values);
		}
  });

  return (
    <Card className="bg-base-300 shadow-md shadow-blue-700">
      <Form onSubmit={formik.handleSubmit}>
        <Card.Body>
          <Card.Title className="mb-3">Reset your password</Card.Title>
          <div className="mb-3">
            <div className="mb-4">
              <label htmlFor="password">New Password</label>
              <Password
                id="password"
                name="password"
                inputClassName="w-full shadow-md shadow-blue-700"
                placeholder="Enter new password"
								onChange={formik.handleChange}
              />
              <label htmlFor="password">{formik.errors.password}</label>
            </div>

            <div className="mb-4">
              <label htmlFor="confirm_pass">Confirm Password</label>
              <Password
                id="confirm_pass"
                name="confirm_pass"
                inputClassName="w-full shadow-md shadow-blue-700"
                placeholder="Re-type password here"
								onChange={formik.handleChange}
              />
              <label htmlFor="confirm_pass">{formik.errors.confirm_pass}</label>
            </div>
          </div>
        </Card.Body>
				<Card.Actions className="p-5">
					<Button color="primary" type="submit" className="w-full" disabled={mutation.isLoading}>
						Submit
					</Button>
				</Card.Actions>
      </Form>
    </Card>
  );
}
