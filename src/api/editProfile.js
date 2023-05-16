import endpoint from "../endpoint";
import useLoginData from "../hooks/useLoginData";
import axios from "axios";

export default async function changeProfile (form) {
  const { access_token } = useLoginData();

  const formData = new FormData();
  formData.append("username", form.username);
  formData.append("bio", form.bio);
  formData.append("picture", form.picture);
  formData.append("fullname", form.fullname);

  const { data } = await axios.put(`${endpoint}/auth/user`, formData, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  return data;
}