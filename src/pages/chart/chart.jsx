import Chart from "chart.js/auto";
import LineChart from "../../components/LineChart";
import { Data } from '../../utils/mockData';

import { CategoryScale } from "chart.js"; 
import { useState } from "react";

Chart.register(CategoryScale)

const CurrencyChart = () => {
  console.log(Data.map((data) => data.year))
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.day), 
    datasets: [
      {
        label: "mockData ",
        data: Data.map((data) => data.currency),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  })

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-3xl md:p-8 mt-6">
      <LineChart chartData={chartData} />
    </div>
  );
}

export default CurrencyChart;