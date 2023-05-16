import endpoint from "../endpoint";
import useLoginData from "../hooks/useLoginData";
import axios from "axios";

export default async function showPosts() {
  const { access_token } = useLoginData();

  const { data } = await axios.get(`${endpoint}/posts`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  return data;
}