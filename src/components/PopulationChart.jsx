import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopulationChart = ({ countries }) => {
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

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Top 5 Countries by Population</h2>
      <Bar data={data} />
    </div>
  );
};

export default PopulationChart;