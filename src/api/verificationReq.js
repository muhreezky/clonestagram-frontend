import axios from "axios";
import Cookies from "js-cookie";
import endpoint from "../endpoint";

export default async function verificationReq () {
  const loginData = Cookies.get("access_token");
  
  const { data } = await axios.post(`${endpoint}/auth/requestverify`, {}, {
    headers: {
      Authorization: `Bearer ${loginData}`
    }
  });

  return data;
}