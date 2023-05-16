import { Modal, Form, Button, Textarea } from "react-daisyui";
import { useFormik } from "formik";
import editPost from "../../api/editPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as yup from "yup";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function EditPost(props) {
  const { onClose, open, postId } = props;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => await editPost(data, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", postId]
      });
      Swal.fire({
        title: "Success",
        text: "Successfully Edit",
        icon: "success"
      }).then(res => {
        if(res) {
          onClose();
        }
      })
    }
  })

  const formik = useFormik({
    initialValues: {
      caption: "",
    },
    validationSchema: yup.object().shape({
      caption: yup.string(),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [open]);

  return (
    <Modal open={open}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header className="flex items-center">
          <h1 className="text-xl flex-1">Edit Caption</h1>
          <div className="flex-0">
            <Button color="ghost" className="rounded-full" onClick={onClose} type="button">
              <FaTimes />
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <label htmlFor="caption">Caption</label>
            <Textarea
              name="caption"
              id="caption"
              placeholder="Enter your caption"
              className="w-full shadow-md shadow-blue-700"
              onChange={formik.handleChange}
              value={formik.values.caption}
            />
          </div>
        </Modal.Body>
        <Modal.Actions className="p-5">
          <Button className="w-full" color="primary" type="submit" disabled={mutation.isLoading}>
            Submit
          </Button>
        </Modal.Actions>
      </Form>
    </Modal>
  );
}
