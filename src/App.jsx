import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import ThemeToggle from "./components/ThemeToggle";
import Auth from "./components/Auth";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <nav className="p-4 bg-gray-100 dark:bg-gray-800 flex justify-between">
          <ThemeToggle />
        </nav>
        <nav className="p-4 bg-gray-100 dark:bg-gray-800 flex justify-between">
          <Auth />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:code" element={<CountryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;