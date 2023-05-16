import axios from "axios";
import endpoint from "../endpoint";

export default async function getUserById (id) {
  const { data } = await axios.get(`${endpoint}/auth/user/${id}`);

  return data;
}