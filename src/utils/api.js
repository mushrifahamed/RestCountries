import axios from "axios";

const API_BASE_URL = "https://restcountries.com/v3.1";

export const fetchAllCountries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all countries:", error);
    throw error;
  }
};

export const searchCountriesByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/name/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error searching countries:", error);
    throw error;
  }
};

export const filterCountriesByRegion = async (region) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/region/${region}`);
    return response.data;
  } catch (error) {
    console.error("Error filtering by region:", error);
    throw error;
  }
};

export const fetchCountryByCode = async (code) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alpha/${code}`);
    return response.data[0];
  } catch (error) {
    console.error("Error fetching country details:", error);
    throw error;
  }
};