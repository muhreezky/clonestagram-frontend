import { Modal, Form, Button, Textarea } from "react-daisyui";
import comment from "../../api/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Comment (props) {
  const { onClose, open, postId } = props;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => await comment(data, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"]
      })
      Swal.fire({
        title: "Success",
        text: "Commented succesfully",
        icon: "success"
      }).then ((res) => {
        if (res) {
          onClose();
        }
      })
    }
  })

  const formik = useFormik({
    initialValues: {
      comment_text: ""
    },
    validationSchema: yup.object().shape({
      comment_text: yup.string().required()
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    }
  });

  useEffect(() => {
    formik.resetForm();
  }, [open]);

  return (
    <Modal open={open}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header className="flex items-center">
          <div className="flex-1">
            Comment to Post
          </div>
          <div className="flex-0">
            <Button color="ghost" className="rounded-full" type="button" onClick={onClose}>
              <FaTimes />
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <label htmlFor="comment_text">Comment</label>
            <Textarea
              className="w-full shadow-md shadow-blue-700"
              name="comment_text"
              id="comment_text"
              onChange={formik.handleChange}
            />
            <label htmlFor="comment_text">{formik.errors.comment_text}</label>
          </div>
        </Modal.Body>
        <Modal.Actions className="p-5">
          <Button color="primary" type="submit" className="w-full">
            Submit
          </Button>
        </Modal.Actions>
      </Form>
    </Modal>
  )

}