import { useNavigate, useParams } from "react-router-dom";
import verifyMail from "../api/verifyMail";
import { Hero, Button } from "react-daisyui";
import { useMutation } from "@tanstack/react-query";

export default function Verify () {
  const { verify_token } = useParams();
  const mutation = useMutation({

  });


};