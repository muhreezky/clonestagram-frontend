import axios from "axios";
import endpoint from "../endpoint";
import Cookies from "js-cookie";

export default async function verifyMail (verify_token) {
  const loginData = Cookies.get("access_token");
  const { data } = await axios.post(`${endpoint}/auth/verify`, { verify_token }, {
    headers: {
      Authorization: `Bearer ${loginData}`
    }
  });

  return data;
}