import axios from "axios";
import useLoginData from "../hooks/useLoginData";
import endpoint from "../endpoint";

export default async function findPost(id) {
  const { access_token } = useLoginData();

  const { data } = await axios.get(`${endpoint}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  return data;
}