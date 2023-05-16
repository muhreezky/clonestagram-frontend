import { Modal, Button, Input, FileInput, Textarea, Form } from "react-daisyui";
import { FaTimes } from "react-icons/fa";
import { useFormik } from "formik";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import validationSchema from "../../schemas/editDataSchema";
import checkVerified from "../../api/checkVerified";
import editProfile from "../../api/editProfile";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export default function ProfileChange(props) {
  const { open, onClose } = props;
  const [dataUrl, setDataUrl] = useState(null);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryFn: async () => await checkVerified(),
    queryKey: ["verified"],
    networkMode: "always",
  });

  const mutation = useMutation({
    mutationFn: async (data) => await editProfile(data),
    networkMode: "always",
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["verified"]
      })
      Swal.fire ({
        title: "Info",
        text: result.message,
        icon: "info"
      }).then ((res) => {
        if (res) {
          onClose();
        }
      });
    },
    onError: (err) => {
      Swal.fire({
        title: "Error",
        text: err.response.data.message,
        icon: "error"
      })
    }
  });

  const myform = useRef();
  const formik = useFormik({
    initialValues: {
      fullname: "",
      bio: "",
      username: "",
      picture: null
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
      formik.resetForm();
      myform.current.reset();
    }
  });

  const modal = useRef();

  const readDataUrl = (data) => {
    if (data.length === 0) {
      console.log("No files selected");
      return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
      setDataUrl(event.target.result);
    };
    reader.readAsDataURL(data);

  };

  useEffect(() => {
    formik.resetForm();
    myform.current.reset();
  }, []);

  useEffect(() => {
    // alert(formik.errors)
    console.log(formik.errors);
  }, [formik.errors]);

  return (
    <Form onSubmit={formik.handleSubmit} ref={myform} encType="multipart/form-data">
      <Modal open={open} ref={modal}>
        <Modal.Header className="flex items-center text-xl mb-3">
          <div className="flex-1">Edit Profile</div>
          <div className="flex-0">
            <Button color="ghost" className="rounded-full" type="button" onClick={onClose}>
              <FaTimes />
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body className="p-3">
          <div className="mb-4">
            <label htmlFor="username">Username</label>
            <Input
              name="username"
              id="username"
              className="w-full shadow-md shadow-blue-700"
              onChange={formik.handleChange}
              placeholder={query.data?.username}
            />
            <label htmlFor="username">{formik.errors.username}</label>
          </div>

          <div className="mb-4">
            <label htmlFor="fullname">Full Name</label>
            <Input
              name="fullname"
              id="fullname"
              onChange={formik.handleChange}
              className="w-full shadow-md shadow-blue-700"
              placeholder={query.data?.fullname}
            />
            <label htmlFor="fullname">{formik.errors.fullname}</label>
          </div>

          <div className="mb-4">
            <label htmlFor="bio">Bio Text</label>
            <Textarea
              name="bio"
              id="bio"
              onChange={formik.handleChange}
              placeholder={query.data?.bio}
              className="w-full shadow-md shadow-blue-700"
            />
            <label htmlFor="bio">{formik.errors.bio}</label>
          </div>

          <div className="mb-4">
            <label htmlFor="picture">Profile Picture</label>
            <FileInput
              className="w-full shadow-md shadow-blue-700"
              // name="picture"
              // id="picture"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={(e) => {
                formik.setFieldValue("picture", e.currentTarget.files[0]);
                readDataUrl(e.currentTarget.files[0]);
              }}
            />
          </div>

          <div className="mb-4 flex justify-center items-center">
            <img
              src={dataUrl}
              className="rounded-full w-[150px] h-[150px]"
            />
          </div>
        </Modal.Body>
        <Modal.Actions className="p-3">
          <Button type="submit" color="primary" className="w-full" disabled={mutation.isLoading}>
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    </Form>
  );
}
