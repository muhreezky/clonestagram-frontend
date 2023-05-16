import axios from "axios";
import endpoint from "../endpoint";

export default async function forgotPass (form) {
  const { data } = await axios.post(`${endpoint}/auth/forgot`, form);

  return data;
}