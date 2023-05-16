import axios from "axios";
import useLoginData from "../hooks/useLoginData";
import endpoint from "../endpoint";

export default async function editPost(form, id) {
  const { access_token } = useLoginData();

  const { data } = await axios.put(`${endpoint}/posts/${id}`, form, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })

  return data;
}