import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CountryCard = ({ country }) => {
  return (
    <Link to={`/country/${country.cca3}`}>
      <motion.div
        className="border rounded-lg shadow-lg overflow-hidden dark:bg-gray-800"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold dark:text-white">{country.name.common}</h2>
          <p className="dark:text-gray-300">Population: {country.population.toLocaleString()}</p>
          <p className="dark:text-gray-300">Region: {country.region}</p>
          <p className="dark:text-gray-300">Capital: {country.capital?.[0] || "N/A"}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default CountryCard;