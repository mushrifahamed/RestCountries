import { useState } from "react";
import { filterCountriesByRegion, fetchAllCountries } from "../utils/api";
import { useTheme } from "../utils/ThemeContext";
import { motion } from "framer-motion";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const RegionFilter = ({ setFilteredCountries }) => {
  const { theme } = useTheme();
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleRegionChange = async (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    try {
      if (region) {
        const data = await filterCountriesByRegion(region);
        setFilteredCountries(data);
      } else {
        const allCountries = await fetchAllCountries();
        setFilteredCountries(allCountries);
      }
    } catch (error) {
      setFilteredCountries([]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="relative"
    >
      <select
        value={selectedRegion}
        onChange={handleRegionChange}
        className={`p-4 pr-10 rounded-lg shadow-md appearance-none cursor-pointer transition-all duration-300 ${
          theme === "light"
            ? "bg-white text-gray-800 border-gray-200 focus:border-blue-500"
            : "bg-gray-800 text-white border-gray-700 focus:border-blue-400"
        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        aria-label="Filter by region"
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${
        theme === "light" ? "text-gray-400" : "text-gray-500"
      }`}>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default RegionFilter;