import { Button, Hero, Form } from "react-daisyui";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import verificationReq from "../api/verificationReq";
import Swal from "sweetalert2";

export default function Unverified() {
  const [refreshTime, setRefreshTime] = useState(0);
  const [isDisabled, setDisabled] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data) => await verificationReq(),
    onSuccess: () => {
      Swal.fire({
        title: "E-mail sent",
        text: `A verification link has been sent to your e-mail, please check it out`,
        icon: "info"
      }).then((res) => {
        setRefreshTime(30);
      })
    }
  });

  const sendVerif = () => {
    setDisabled(true);
    mutation.mutate(null)
  };

  useEffect(() => {
    let interval;
    if (refreshTime > 0) {
      interval = window.setInterval(function () {
        setRefreshTime((time) => time - 1);
      }, 1000);
    } else {
      window.clearInterval(interval);
    }
    if (refreshTime === 0) setDisabled(false);
    return () => window.clearInterval(interval);
  }, [refreshTime]);

  return (
    <Hero>
      <Hero.Overlay className="bg-base-300 opacity-90" />
      <Hero.Content className="flex justify-center items-center text-xl font-bold flex-col p-8">
        <div>You aren't verified yet. Please verify your account</div>
        <Button
          color="success"
          className="disabled:shadow-md disabled:shadow-blue-700"
          disabled={isDisabled}
          onClick={sendVerif}
        >
          {!refreshTime ? "Verify Now" : `Wait ${refreshTime} seconds`}
        </Button>
      </Hero.Content>
    </Hero>
  );
}
