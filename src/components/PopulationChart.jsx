import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useTheme } from "../utils/ThemeContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopulationChart = ({ countries }) => {
  const { theme } = useTheme();

  const data = {
    labels: countries.slice(0, 5).map((c) => c.name.common),
    datasets: [
      {
        label: "Population",
        data: countries.slice(0, 5).map((c) => c.population),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: theme === "light" ? "rgb(31, 41, 55)" : "rgb(209, 213, 219)", // gray-800 : gray-300
        },
      },
      title: {
        color: theme === "light" ? "rgb(31, 41, 55)" : "rgb(209, 213, 219)", // gray-800 : gray-300
      },
      tooltip: {
        titleColor: "rgb(255, 255, 255)", // white
        bodyColor: "rgb(255, 255, 255)", // white
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme === "light" ? "rgb(31, 41, 55)" : "rgb(209, 213, 219)", // gray-800 : gray-300
        },
      },
      y: {
        ticks: {
          color: theme === "light" ? "rgb(31, 41, 55)" : "rgb(209, 213, 219)", // gray-800 : gray-300
        },
      },
    },
  };

  return (
    <div className={`my-8 p-4 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
      <h2 className={`text-2xl font-bold mb-4 ${theme === "light" ? "text-gray-800" : "text-white"}`}>Top 5 Countries by Population</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PopulationChart;