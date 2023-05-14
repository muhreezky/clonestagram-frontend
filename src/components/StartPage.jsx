import { Hero, Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";

export default function StartPage () {
  const navigate = useNavigate();

  return (
    <Hero>
      <Hero.Overlay className="bg-base-300 opacity-90" />
      <Hero.Content className="flex justify-center items-center flex-col p-8">
        <div className="mb-3 text-xl">
          Start your online social life with Clonestagram
        </div>
        <Button color="primary" onClick={() => navigate("/login")}>
          Start Right Now
        </Button>
      </Hero.Content>
    </Hero>
  )
}