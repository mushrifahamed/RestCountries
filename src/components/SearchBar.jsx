import { useState, useEffect } from "react";
import { searchCountriesByName, fetchAllCountries } from "../utils/api";
import { useTheme } from "../utils/ThemeContext";
import { motion } from "framer-motion";

const SearchBar = ({ setFilteredCountries }) => {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const debounceSearch = setTimeout(async () => {
      try {
        if (query.trim()) {
          const data = await searchCountriesByName(query);
          setFilteredCountries(data);
        } else {
          const allCountries = await fetchAllCountries();
          setFilteredCountries(allCountries);
        }
      } catch (error) {
        setFilteredCountries([]);
      }
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [query, setFilteredCountries]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full md:w-1/2"
    >
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a country..."
        className={`w-full p-4 pl-12 rounded-lg shadow-md transition-all duration-300 ${
          theme === "light"
            ? "bg-white text-gray-800 border-gray-200 focus:border-blue-500"
            : "bg-gray-800 text-white border-gray-700 focus:border-blue-400"
        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        aria-label="Search countries"
      />
      <svg
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          theme === "light" ? "text-gray-400" : "text-gray-500"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </motion.div>
  );
};

export default SearchBar;