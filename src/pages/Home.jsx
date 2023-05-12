import { Hero, Button } from "react-daisyui";

export default function Home () {
  return (
    <Hero>
      <Hero.Overlay className="bg-base-300 opacity-90" />
      <Hero.Content className="flex justify-center items-center flex-col p-8">
        <div className="mb-3 text-xl">
          Start your online social life with Clonestagram
        </div>
        <Button color="primary">
          Start Right Now
        </Button>
      </Hero.Content>
    </Hero>
  )
}