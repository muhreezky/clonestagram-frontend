import { Modal, Button, Form, Textarea, FileInput } from "react-daisyui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { FaTimes } from "react-icons/fa";
import newPost from "../../api/newPost";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useEffect, useRef } from "react";

export default function PostModal(props) {
  const { onClose, open } = props;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => await newPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"]
      });
      formik.resetForm();
      Swal.fire({
        title: "Success",
        text: "Posted Successfully",
        icon: "success"
      }).then (res => {
        if (res) {
          onClose();
        }
      })
    },
    networkMode: "always",
    onError: (err) => {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error"
      });
    }
  });

  const formik = useFormik({
    initialValues: {
      caption: "",
      post_image: null,
    },
    validationSchema: yup.object().shape({
      caption: yup.string().optional(),
      post_image: yup.mixed().required("Image is required")
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  const form = useRef();

  useEffect(() => {
    form.current.reset();
    formik.resetForm();
  }, [open]);

  return (
    <Form onSubmit={formik.handleSubmit} ref={form}>
      <Modal open={open}>
        <Modal.Header className="flex items-center">
          <div className="flex-1">Post</div>
          <div className="flex-0">
            <Button color="ghost" className="rounded-full" type="button" onClick={onClose}>
              <FaTimes />
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <label htmlFor="post_image">Image</label>
            <FileInput
              accept="image/jpeg,image/jpg,image/png"
              className="w-full shadow-md shadow-blue-700"
              onChange={(e) => {
                formik.setFieldValue("post_image", e.currentTarget.files[0]);
                console.log(e.currentTarget.files[0]);
              }}
              required
            />
            <label htmlFor="post_image">{formik.errors.post_image}</label>
          </div>
          <div className="mb-4">
            <label htmlFor="caption">Caption</label>
            <Textarea
              name="caption"
              id="caption"
              className="w-full shadow-md shadow-blue-700"
              placeholder="Your caption here"
              onChange={formik.handleChange}
              value={formik.values.caption}
            />
          </div>
        </Modal.Body>
        <Modal.Actions className="p-3">
          <Button type="submit" color="primary" disabled={mutation.isLoading}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    </Form>
  );
}
