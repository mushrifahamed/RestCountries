import { useState } from "react";
import { searchCountriesByName } from "../utils/api";

const SearchBar = ({ setFilteredCountries }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    try {
      if (value.trim()) {
        const data = await searchCountriesByName(value);
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
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search for a country..."
      className="p-2 border rounded-md w-full md:w-1/2 dark:bg-gray-800 dark:text-white"
    />
  );
};

export default SearchBar;