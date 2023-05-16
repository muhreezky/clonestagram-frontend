import Posts from "./Posts";
import Unverified from "./Unverified";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkVerified } from "../api";
import { Card, Form, Button } from "react-daisyui";
import { useState } from "react";
import ProfileChange from "./modals/ProfileChange";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import PostModal from "./modals/PostModal";
import Cookies from "js-cookie";

export default function Timeline() {
  const [visibleProfile, setVisibleProfile] = useState(false);
  const [postModalDisplay, setPostModalDisplay] = useState(false);
  const query = useQuery({
    queryFn: async () => await checkVerified(),
    queryKey: ["verified"],
    networkMode: "always",
    onSuccess: (data) => {
      if (!data) {
        Cookies.remove("access_token");
        window.location.reload();
      }
    },
    onError: () => {
      Cookies.remove("access_token");
      window.location.reload();
    }
  });

  const openProfileModal = () => setVisibleProfile(true);
  const onClose = () => setVisibleProfile(false);
  const closePostModal = () => setPostModalDisplay(false);
  const openPostModal = () => setPostModalDisplay(true);

  return (
    <>
      <PostModal open={postModalDisplay} onClose={closePostModal} />
      <ProfileChange open={visibleProfile} onClose={onClose} />
      <Card className="bg-base-300 mb-7">
        <Card.Body>
          <Card.Image
            src={query.data?.profile_pic}
            style={{ maxWidth: "200px", maxHeight: "200px" }}
            alt="Profile"
          />
          <Card.Title className="flex items-center mb-3">
            <div className="flex-1">@{query.data?.username}</div>

            <div className="flex-0">
              <Button
                color="ghost"
                onClick={openProfileModal}
                className="rounded-full"
              >
                <FaPencilAlt />
              </Button>
            </div>
          </Card.Title>
          <div className="p-3 gap-1 flex flex-col">
            <div className="font-bold">{query.data?.fullname}</div>
            <div>{query.data?.email}</div>
            <div>{query.data?.bio}</div>
          </div>
        </Card.Body>
        <Card.Actions className="p-5">
          <Button
            className="w-full"
            color="primary"
            type="button"
            startIcon={<FaPlus />}
            onClick={openPostModal}
          >
            New Post
          </Button>
        </Card.Actions>
      </Card>
      {/* Jika belum verifikasi e-mail, maka belum bisa melihat postingan */}
      {query.data?.verified ? <Posts /> : <Unverified data={query.data} />}
    </>
  );
}
