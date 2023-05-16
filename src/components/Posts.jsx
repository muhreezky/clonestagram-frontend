import { Card, Button } from "react-daisyui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import showPosts from "../api/showPosts";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import getUserById from "../api/getUserById";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import deletePost from "../api/deletePost";

export default function Posts() {
  const [postId, setPostId] = useState(false);
  const posts = useSelector((state) => state.posts.value);

  const queryClient = useQueryClient();

  const query = useQuery({
    queryFn: async () => await showPosts(),
    queryKey: ["posts"],
    onSuccess: (data) => console.log(data),
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      console.log(id);
      await deletePost(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"]
      })
    }
  });

  const navigate = useNavigate();

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to delete this?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Yes"
    }).then (res => {
      if (res.isConfirmed) {
        mutation.mutate(id);
      }
    })
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Posts</h1>
      <hr />
      <InfiniteScroll dataLength={posts.length}>
        {query.data?.rows.map((val, key) => {
          return (
            <Card
              key={key}
              className="bg-base-300 shadow-md shadow-blue-700 my-5 hover:cursor-pointer"
            >
              <Card.Image
                src={val.image_url}
                className="max-w-max max-h-96"
                onClick={() => navigate(`/detail/${val.post_id}`)}
              />
              <Card.Body onClick={() => navigate(`/detail/${val.post_id}`)}>
                <Card.Title className="mb-3">@{val.username}</Card.Title>
                <div>{val.caption}</div>
                <div>Likes : {val.likes}</div>
                <div>{new Date(val.createdAt).toString()}</div>
              </Card.Body>
              <Card.Actions className="p-5">
                <Button
                  className="w-full"
                  color="primary"
                  onClick={() => navigate(`/detail/${val.post_id}`)}
                >
                  Detail
                </Button>
                <Button 
                  className="w-full"
                  color="error" 
                  onClick={() => confirmDelete(val.post_id)}
                >
                  Delete
                </Button>
              </Card.Actions>
            </Card>
          );
        })}
      </InfiniteScroll>
    </>
  );
}
