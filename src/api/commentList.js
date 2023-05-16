import axios from "axios";
import useLoginData from "../hooks/useLoginData";
import endpoint from "../endpoint";

export default async function commentList(id) {
  const { access_token } = useLoginData();

  const { data } = await axios.get(`${endpoint}/posts/${id}/likes`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  return data;
}