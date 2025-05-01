import { useState, useEffect } from "react";
import { fetchAllCountries } from "../utils/api";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";
import PopulationChart from "../components/PopulationChart";
import { motion } from "framer-motion";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white">
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <SearchBar setFilteredCountries={setFilteredCountries} />
        <RegionFilter setFilteredCountries={setFilteredCountries} />
      </div>
      <PopulationChart countries={filteredCountries} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Home;