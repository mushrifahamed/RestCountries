import { useState, useEffect } from "react";
import { searchCountriesByName, fetchAllCountries } from "../utils/api";
import { useTheme } from "../utils/ThemeContext";

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
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search for a country..."
      className={`p-2 border rounded-md w-full md:w-1/2 ${theme === "light" ? "bg-gray-200 text-gray-800" : "bg-gray-800 text-white"}`}
      aria-label="Search countries"
    />
  );
};

export default SearchBar;