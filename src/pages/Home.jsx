import { useState, useEffect } from "react";
import { fetchAllCountries } from "../utils/api";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";
import PopulationChart from "../components/PopulationChart";
import { motion } from "framer-motion";
import { useTheme } from "../utils/ThemeContext";

const Home = () => {
  const { theme } = useTheme();
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name");
  const [showChart, setShowChart] = useState(false);

  const handleSort = (countries) => {
    if (sortBy === "name") {
      return [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortBy === "population") {
      return [...countries].sort((a, b) => b.population - a.population);
    }
    return countries;
  };

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchAllCountries();
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  return (
    <div className={`container mx-auto p-4 min-h-screen ${theme === "light" ? "bg-white text-gray-800" : "bg-gray-900 text-white"}`}>
      <h1 className="text-3xl font-bold mb-6 text-center">REST Countries Explorer</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <SearchBar setFilteredCountries={setFilteredCountries} />
        <div className="flex flex-col sm:flex-row gap-4">
          <RegionFilter setFilteredCountries={setFilteredCountries} />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="relative"
          >
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`p-4 pr-10 rounded-lg shadow-md appearance-none cursor-pointer transition-all duration-300 ${
                theme === "light"
                  ? "bg-white text-gray-800 border-gray-200 focus:border-blue-500"
                  : "bg-gray-800 text-white border-gray-700 focus:border-blue-400"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              aria-label="Sort countries"
            >
              <option value="name">Sort by Name</option>
              <option value="population">Sort by Population</option>
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
        </div>
      </div>
      <button
        onClick={() => setShowChart(!showChart)}
        className="mb-6 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        aria-label={showChart ? "Hide population chart" : "Show population chart"}
      >
        {showChart ? "Hide Population Chart" : "Show Population Chart"}
      </button>
      {showChart && <PopulationChart countries={filteredCountries} />}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredCountries.length === 0 ? (
        <p className="text-center">No countries found.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {handleSort(filteredCountries).map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Home;