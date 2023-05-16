import { Hero, Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Hero>
      <Hero.Overlay className="bg-base-300" />
      <Hero.Content className="flex flex-col justify-center items-center">
        Sorry, the page you're looking for is not found<br />
        <Button color="primary" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </Hero.Content>
    </Hero>
  )
}