import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../utils/ThemeContext";

const CountryCard = ({ country }) => {
  const { theme } = useTheme();

  return (
    <Link to={`/country/${country.cca3}`}>
      <motion.div
        className={`border rounded-xl shadow-lg overflow-hidden ${
          theme === "light" 
            ? "bg-white hover:shadow-xl" 
            : "bg-gray-800 hover:shadow-gray-700"
        } transition-all duration-300`}
        whileHover={{ scale: 1.02, y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <img
            src={country.flags.png}
            alt={`${country.name.common} flag`}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-3 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
            {country.name.common}
          </h2>
          <div className="space-y-2">
            <p className={`flex items-center gap-2 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
              <span className="font-semibold">Population:</span>
              {country.population.toLocaleString()}
            </p>
            <p className={`flex items-center gap-2 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
              <span className="font-semibold">Region:</span>
              {country.region}
            </p>
            <p className={`flex items-center gap-2 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
              <span className="font-semibold">Capital:</span>
              {country.capital?.[0] || "N/A"}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CountryCard;