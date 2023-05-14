import axios from "axios";
import endpoint from "../endpoint";
import useLoginData from "./useLoginData";

export default function useVerify () {
  const { access_token } = useLoginData();

  const data = axios.get(`${endpoint}/auth/check`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  }).then (res => res.data);

  return data;
}