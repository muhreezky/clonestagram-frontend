import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import App from './App.jsx'
import Home from './pages/Home.jsx';
import Auth from './pages/Auth';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Auth newAccount />} />
          <Route path="login" element={<Auth />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
)
