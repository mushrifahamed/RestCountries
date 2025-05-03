import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import Favorites from "./pages/Favorites";
import ThemeToggle from "./components/ThemeToggle";
import Auth from "./components/Auth";
import { AuthProvider } from "./utils/AuthContext";
import { ThemeProvider, useTheme } from "./utils/ThemeContext";

function App() {
  const { theme } = useTheme(); // Access theme for root styling

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
      <nav className={`p-4 ${theme === "light" ? "bg-gray-100" : "bg-gray-800"} flex justify-between items-center`}>
        <div className="flex gap-4">
          <Link
            to="/"
            className={`p-2 border rounded-md ${
              theme === "light" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className={`p-2 border rounded-md ${
              theme === "light" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            Favorites
          </Link>
        </div>
        <div className="flex gap-4">
          <ThemeToggle />
          <Auth />
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<CountryDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default function RootApp() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}