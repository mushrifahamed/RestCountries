import { useTheme } from "../utils/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 border rounded-md ${
        theme === "light" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-gray-800 text-white hover:bg-gray-700"
      }`}
      aria-label="Toggle theme"
    >
      {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
};

export default ThemeToggle;