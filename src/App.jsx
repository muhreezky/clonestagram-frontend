import { Outlet, Link } from "react-router-dom";
import { Navbar } from "react-daisyui";
import ToggleDark from "./components/ToggleDark";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Navbar className="p-5 bg-base-300">
        <Navbar.Center>
          <h1 className="text-2xl font-extrabold">
            <Link to="/">
              SosialsGram
            </Link>
          </h1>
        </Navbar.Center>
        <Navbar.End>
          <ToggleDark />
        </Navbar.End>
      </Navbar>
      <div className="p-6">
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </div>
    </>
  )
}

export default App
