import axios from "axios";
import endpoint from "../endpoint";
import useLoginData from "../hooks/useLoginData";

export default async function comment (form, id) {
  const { access_token } = useLoginData();

  const { data } = await axios.post(`${endpoint}/posts/${id}/comments`, form, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  return data;
}