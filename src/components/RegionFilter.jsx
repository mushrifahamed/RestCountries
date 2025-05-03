import { useState } from "react";
import { filterCountriesByRegion, fetchAllCountries } from "../utils/api";
import { useTheme } from "../utils/ThemeContext";

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
    <select
      value={selectedRegion}
      onChange={handleRegionChange}
      className={`p-2 border rounded-md ${theme === "light" ? "bg-gray-200 text-gray-800" : "bg-gray-800 text-white"}`}
      aria-label="Filter by region"
    >
      <option value="">Filter by Region</option>
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
};

export default RegionFilter;