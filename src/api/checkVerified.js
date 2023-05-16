import Cookies from "js-cookie";
import axios from "axios";
import endpoint from "../endpoint";

export default async function checkVerified () {
  const cookieData = Cookies.get("access_token");
  
  const { data } = await axios.get(`${endpoint}/auth/user`, {
    headers: {
      Authorization: `Bearer ${cookieData}`
    }
  });

  // const { verified, username, email, fullname, profile_pic, bio } = data;

  // return { verified, username, email, fullname, profile_pic, bio };
  return data;
}