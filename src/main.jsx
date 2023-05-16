import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth";
import ForgotPass from "./pages/ForgotPass";
import Verify from "./pages/Verify";
import NotFound from "./pages/NotFound";
import ResetPass from "./pages/ResetPass";
import Detail from "./pages/Detail";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Auth newAccount />} />
          <Route path="login" element={<Auth />} />
          <Route path="forgot" element={<ForgotPass />} />
          <Route path="verify/:verify_token" element={<Verify />} />
          <Route path="reset/:reset_token" element={<ResetPass />} />
          <Route path="detail/:post_id" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
