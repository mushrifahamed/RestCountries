import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../utils/ThemeContext";

const CountryCard = ({ country }) => {
  const { theme } = useTheme();

  return (
    <Link to={`/country/${country.cca3}`}>
      <motion.div
        className={`border rounded-lg shadow-lg overflow-hidden ${theme === "light" ? "bg-white" : "bg-gray-800"}`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h2 className={`text-xl font-bold ${theme === "light" ? "text-gray-800" : "text-white"}`}>{country.name.common}</h2>
          <p className={`${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>Population: {country.population.toLocaleString()}</p>
          <p className={`${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>Region: {country.region}</p>
          <p className={`${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>Capital: {country.capital?.[0] || "N/A"}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default CountryCard;