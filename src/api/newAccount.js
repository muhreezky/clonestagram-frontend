import axios from "axios";
import endpoint from "../endpoint";

export default async function newAccount (form) {
  const { data } = await axios.post(`${endpoint}/auth/register`, form);

  return data;
}