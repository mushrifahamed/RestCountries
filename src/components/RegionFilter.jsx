import { useState } from "react";
import { filterCountriesByRegion, fetchAllCountries } from "../utils/api";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const RegionFilter = ({ setFilteredCountries }) => {
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
      className="p-2 border rounded-md dark:bg-gray-800 dark:text-white"
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