import StartPage from "../components/StartPage";
import useLoginData from "../hooks/useLoginData";
import Timeline from "../components/Timeline";

export default function Home () {
  const { loggedIn } = useLoginData();

  return (
    <>
      {loggedIn ? <Timeline /> : <StartPage />}
    </>
  )
}