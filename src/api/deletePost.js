import useLoginData from "../hooks/useLoginData";
import axios from "axios";
import endpoint from "../endpoint";

export default async function deletePost(id) {
  const { access_token } = useLoginData();
  
  const { data } = await axios.delete(`${endpoint}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  return data;
}