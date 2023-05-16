import { useNavigate, useParams } from "react-router-dom";
import verifyMail from "../api/verifyMail";
import { Hero, Button } from "react-daisyui";
import { useMutation } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";

export default function Verify() {
  const { verify_token } = useParams();
  const [isVerified, setVerified] = useState(false);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data) => await verifyMail(data),
    onSuccess: () => setVerified(true),
  });

  useEffect(() => {
    mutation.mutate(verify_token);
  }, []);

  return (
    <Hero>
      <Hero.Overlay className="opacity-80 bg-base-300" />
      <Hero.Content className="flex justify-center items-center p-7">
        {mutation.isLoading ? (
          <Loader />
        ) : (
          <div className="text-xl font-bold flex flex-col gap-2">
            Your account has been verified
            <Button color="success" onClick={() => navigate("/")}>Go To Home</Button>
          </div>
        )}
      </Hero.Content>
    </Hero>
  );
}
