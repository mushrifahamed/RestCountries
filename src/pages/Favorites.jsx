import { useState, useEffect } from "react";
import { fetchCountryByCode } from "../utils/api";
import CountryCard from "../components/CountryCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../utils/ThemeContext";

const Favorites = () => {
  const { theme } = useTheme();
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavoriteCountries = async () => {
      try {
        const countryPromises = favorites.map((code) => fetchCountryByCode(code));
        const countries = await Promise.all(countryPromises);
        setFavoriteCountries(countries);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    loadFavoriteCountries();
  }, [favorites]);

  return (
    <div className={`container mx-auto p-4 min-h-screen ${theme === "light" ? "bg-white text-gray-800" : "bg-gray-900 text-white"}`}>
      <Link
        to="/"
        className={`inline-block mb-8 p-2 border rounded-md ${
          theme === "light" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
        aria-label="Back to home"
      >
        Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-8 text-center">Favorite Countries</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : favoriteCountries.length === 0 ? (
        <p className="text-center">No favorite countries added.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {favoriteCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Favorites;