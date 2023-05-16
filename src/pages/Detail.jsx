import { Card, Button, Form } from "react-daisyui";
// import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import findPost from "../api/findPost";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaComment, FaChevronLeft } from "react-icons/fa";
import commentList from "../api/commentList";
import likePost from "../api/likePost";

export default function Detail () {
  const { post_id } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const query = useQuery({
    queryFn: async () => findPost(post_id),
    queryKey: ["posts", post_id]
  });

  const comments = useQuery({
    queryFn: async () => commentList(post_id),
    queryKey: ["comments", post_id]
  });

  const mutation = useMutation({
    mutationFn: async (data) => likePost(data, post_id),
    onSuccess: (data) => data
  })

  return (
    <Card className="bg-base-300 shadow-md shadow-blue-700">
      <Card.Body>
        <Card.Image src={query.data?.image_url} className="max-w-full max-h-96" />
        <Card.Title className="mb-3 flex gap-3">
          <Button color="ghost" onClick={() => navigate(-1)} className="rounded-full">
            <FaChevronLeft />
          </Button>
          @{query.data?.username}
        </Card.Title>
        <div className="mb-7">
          {query.data?.caption}
        </div>
        <div>
          <h1>Comments</h1><hr />
          {comments.data?.rows.map((val) => {
            return (
              <div className="mb-3">
                {val.comment_text}
              </div>
            )
          })}
        </div>
      </Card.Body>
      <Card.Actions className="flex justify-center items-center gap-2 p-5">
        <Button color={mutation.data?.liked ? "error" : "ghost"} className="rounded-full">
          <FaHeart />
        </Button>
        <Button color="ghost" className="rounded-full">
          <FaComment />
        </Button>
      </Card.Actions>
    </Card>
  )
}