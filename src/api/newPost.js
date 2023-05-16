import axios from "axios";
import useLoginData from "../hooks/useLoginData";
import endpoint from "../endpoint";

export default async function newPost(form) {
  const { access_token } = useLoginData();

  const formData = new FormData();
  formData.append("post_image", form.post_image);
  formData.append("caption", form.caption);

  const { data } = await axios.post(`${endpoint}/posts`, formData, { 
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  return data;
}