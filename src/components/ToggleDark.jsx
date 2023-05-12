import { FaMoon, FaSun } from 'react-icons/fa';
import { Button } from 'react-daisyui';
import { useState, useEffect } from 'react';

export default function ToggleDark () {
  const [darkMode, setDarkMode] = useState(false);
  const root = document.querySelector("html");

  useEffect(() => {
    if (localStorage.getItem("darkMode")) setDarkMode(true);  
  }, []);

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
    } else {
      localStorage.removeItem("darkMode");
    }

    root.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  const toggleDark = () => setDarkMode(dark => !dark);

  return (
    <Button color="ghost" className="rounded-full" onClick={toggleDark}>
      {darkMode ? <FaSun /> : <FaMoon />}
    </Button>
  )
}