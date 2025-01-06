import Chart from "chart.js/auto";
import LineChart from "../../components/LineChart";
import { Data } from '../../utils/mockData';

import { CategoryScale } from "chart.js"; 
import { useState } from "react";
import { Animation } from 'rsuite';

Chart.register(CategoryScale)

const CurrencyChart = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.day), 
    datasets: [
      {
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

  function visibility() {
    setIsVisible((isVisible) => !isVisible);
  }

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-3xl md:p-8 mt-6">
      <div className="flex gap-4">
        <h1 className="text-xl font-bold text-gray-800">
          Graph Currency
        </h1>
        <button
          className="ml-auto rounded-lg bg-blue-500 p-2 hover:bg-gray-300 m6"
          onClick={visibility}
        >
          {isVisible ? "-" : "+"}
        </button>
      </div>
        {isVisible && <LineChart chartData={chartData} />}
    </div>
  );
}

export default CurrencyChart;