import axios from "axios";
import Cookies from "js-cookie";
import endpoint from "../endpoint";

export default async function login(form) {
  const { data } = await axios.post(`${endpoint}/auth/login`, form);

  return data;
}