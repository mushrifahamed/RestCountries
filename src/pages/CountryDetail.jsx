import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCountryByCode } from "../utils/api";
import { motion } from "framer-motion";
import { useAuth } from "../utils/AuthContext";
import { useTheme } from "../utils/ThemeContext";

const CountryDetail = () => {
  const { theme } = useTheme();
  const { code } = useParams();
  const { user } = useAuth();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);

  const toggleFavorite = () => {
    if (!user) return;
    let updatedFavorites;
    if (favorites.includes(country.cca3)) {
      updatedFavorites = favorites.filter((id) => id !== country.cca3);
    } else {
      updatedFavorites = [...favorites, country.cca3];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const loadCountry = async () => {
      try {
        const data = await fetchCountryByCode(code);
        setCountry(data);
        localStorage.setItem("lastCountry", JSON.stringify(data));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    loadCountry();
  }, [code]);

  if (loading) return <p className={`text-center ${theme === "light" ? "text-gray-800" : "text-white"}`}>Loading...</p>;
  if (!country) return <p className={`text-center ${theme === "light" ? "text-gray-800" : "text-white"}`}>Country not found.</p>;

  return (
    <motion.div
      className={`container mx-auto p-4 min-h-screen ${theme === "light" ? "bg-white text-gray-800" : "bg-gray-900 text-white"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to="/"
        className={`inline-block mb-8 p-2 border rounded-md ${
          theme === "light" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
        aria-label="Back to home"
      >
        Back
      </Link>
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{country.name.common}</h1>
          <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(", ") || "N/A"}</p>
          <p><strong>Currency:</strong> {Object.values(country.currencies || {})[0]?.name || "N/A"}</p>
          <p><strong>Borders:</strong> {country.borders?.join(", ") || "None"}</p>
          {user ? (
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-md ${favorites.includes(country.cca3) ? "bg-red-500" : "bg-gray-500"} text-white hover:opacity-90`}
              aria-label={favorites.includes(country.cca3) ? "Remove from favorites" : "Add to favorites"}
            >
              {favorites.includes(country.cca3) ? "Remove Favorite" : "Add Favorite"}
            </button>
          ) : (
            <p className="text-red-500">Please sign in to add to favorites.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CountryDetail;