import axios from "axios";
import endpoint from "../endpoint";
import useLoginData from "../hooks/useLoginData";

export default async function resetPass (form, token) {
  const { data } = await axios.put(`${endpoint}/auth/pass/${token}`, form);

  return data;
}