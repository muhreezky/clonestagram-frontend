import { Outlet, Link } from "react-router-dom";
import { Navbar } from "react-daisyui";
import ToggleDark from "./components/ToggleDark";

function App() {
  return (
    <>
      <Navbar className="p-5 bg-base-300">
        <Navbar.Center>
          <h1 className="text-2xl font-extrabold">
            <Link to="/">
              Clonestagram
            </Link>
          </h1>
        </Navbar.Center>
        <Navbar.End>
          <ToggleDark />
        </Navbar.End>
      </Navbar>
      <div className="p-6">
        <Outlet />
      </div>
    </>
  )
}

export default App
