import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCountryByCode } from "../utils/api";
import { motion } from "framer-motion";

const CountryDetail = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);

  const toggleFavorite = () => {
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
        localStorage.setItem("lastCountry", JSON.stringify(data)); // Session management
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    loadCountry();
  }, [code]);

  if (loading) return <p>Loading...</p>;
  if (!country) return <p>Country not found.</p>;

  return (
    <motion.div
      className="container mx-auto p-4 dark:bg-gray-900 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className="inline-block mb-8 p-2 border rounded-md dark:bg-gray-800">
        Back
      </Link>
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          className="w-full md:w-1/2 h-64 object-cover"
        />
        <div>
            <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
            <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(", ")}</p>
            <p><strong>Currency:</strong> {Object.values(country.currencies || {})[0]?.name || "N/A"}</p>
            <p><strong>Borders:</strong> {country.borders?.join(", ") || "None"}</p>
            <button
            onClick={toggleFavorite}
            className={`p-2 rounded-md ${favorites.includes(country.cca3) ? "bg-red-500" : "bg-gray-500"} text-white`}
            >
            {favorites.includes(country.cca3) ? "Remove Favorite" : "Add Favorite"}
            </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CountryDetail;