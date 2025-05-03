import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import Favorites from "./pages/Favorites";
import ThemeToggle from "./components/ThemeToggle";
import Auth from "./components/Auth";
import { AuthProvider } from "./utils/AuthContext";
import { ThemeProvider, useTheme } from "./utils/ThemeContext";
import { Toaster } from 'react-hot-toast';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
      <Toaster
        position="top-right"
        toastOptions={{
          className: theme === "light" ? "bg-white" : "bg-gray-800",
          style: {
            background: theme === "light" ? "#fff" : "#1f2937",
            color: theme === "light" ? "#1f2937" : "#fff",
          },
        }}
      />
      <nav className={`p-4 shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"} flex justify-between items-center sticky top-0 z-50`}>
        <div className="flex gap-4 items-center">
          <Link
            to="/"
            className={`p-2 rounded-md transition-all duration-200 ${
              theme === "light" 
                ? "bg-blue-50 text-blue-600 hover:bg-blue-100" 
                : "bg-blue-900 text-blue-100 hover:bg-blue-800"
            }`}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className={`p-2 rounded-md transition-all duration-200 ${
              theme === "light" 
                ? "bg-blue-50 text-blue-600 hover:bg-blue-100" 
                : "bg-blue-900 text-blue-100 hover:bg-blue-800"
            }`}
          >
            Favorites
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <Auth />
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:code" element={<CountryDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
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