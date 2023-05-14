import Posts from "./Posts";
import Unverified from "./Unverified";
import { useQuery } from "@tanstack/react-query";
import { checkVerified } from "../api";

export default function Timeline () {
  const query = useQuery({
    queryFn: async () => await checkVerified(),
    queryKey: ["verified"]
  });

  return (
    <>
      {query.data?.verified ? <Posts /> : <Unverified />}
    </>
  )
}