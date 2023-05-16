import { Outlet, Link } from "react-router-dom";
import { Navbar } from "react-daisyui";
import ToggleDark from "./components/ToggleDark";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Logout from "./components/Logout";
import { store } from "./store";
import { Provider } from "react-redux";
import useLoginData from "./hooks/useLoginData";

function App() {
  const queryClient = new QueryClient();
  const { loggedIn, access_token } = useLoginData();

  return (
    <>
      <Provider store={store}>
        <Navbar className="p-5 bg-base-300">
          <Navbar.Center>
            <h1 className="text-2xl font-extrabold">
              <Link to="/">SosialsGram</Link>
            </h1>
          </Navbar.Center>
          <Navbar.End>
            {access_token && <Logout />}
            <ToggleDark />
          </Navbar.End>
        </Navbar>
        <div className="p-6">
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </div>
      </Provider>
    </>
  );
}

export default App;
