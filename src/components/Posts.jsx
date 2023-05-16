import { Card, Button } from "react-daisyui";
import { useQuery } from "@tanstack/react-query";
import showPosts from "../api/showPosts";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import getUserById from "../api/getUserById";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const [postId, setPostId] = useState(false);
  const posts = useSelector((state) => state.posts.value);

  const query = useQuery({
    queryFn: async () => await showPosts(),
    queryKey: ["posts"],
    onSuccess: (data) => console.log(data),
  });

  const navigate = useNavigate();

  // const uploader = useQuery({
  //   queryFn: async () => await getUserById(query.data?.user_id),
  //   queryKey: ["uploader", query.data?.user_id],
  //   onSuccess: (data) => console.log(data)
  // });

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
              onClick={() => navigate(`/detail/${val.post_id}`)}
            >
              <Card.Image src={val.image_url} className="max-w-max max-h-96" />
              <Card.Body>
                <Card.Title className="mb-3">@{val.username}</Card.Title>
                <div>{val.caption}</div>
              </Card.Body>
            </Card>
          );
        })}
      </InfiniteScroll>
    </>
  );
}
