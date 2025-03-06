import { darkModeContext } from "../context/DarkModeContext";
import { useContext } from "react";
export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useContext(darkModeContext);
  const switchMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <button
      onClick={switchMode}
      className="p-3 rounded-full bg-background text-foreground shadow-lg hover:scale-105 transition-transform"
    >
      {darkMode ? "🌞" : "🌙"}
    </button>
  );
}
