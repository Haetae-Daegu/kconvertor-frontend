import Chart from "chart.js/auto";
import LineChart from "../../components/LineChart";
import { useGraphData } from "../../hooks/useGraphData";
import ErrorPanel from "../../components/ErrorPanel";
import ToggleButton from "../../components/ToggleButton";

import { CategoryScale } from "chart.js"; 
import { useEffect, useState } from "react";

Chart.register(CategoryScale);

const CurrencyChart = () => {
  const { handleData, graphData, error } = useGraphData();

  const [isVisible, setIsVisible] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [timeFrame, setTimeFrame] = useState("1W");

  const timeFrameMap = {
    "1W": (now) => new Date(now.setDate(now.getDate() - 7)),
    "1M": (now) => new Date(now.setMonth(now.getMonth() - 1)),
    "6M": (now) => new Date(now.setMonth(now.getMonth() - 6)),
    "1Y": (now) => new Date(now.setMonth(now.getMonth() - 13)),
  };

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const filterDataByTimeFrame = () => {
    const now = new Date();
    const limitDate = timeFrameMap[timeFrame](new Date(now));

    if (limitDate == null)
      return graphData;

    return graphData.filter((item) => {
      const itemDate = parseDate(item.date);
      return itemDate >= limitDate;
    });
  };

  useEffect(() => {
    if (graphData.length > 0) {
      const filterData = filterDataByTimeFrame();
      setChartData({
        labels: filterData.map((data) => data.day),
        datasets: [
          {
            data: filterData.map((data) => data.currency_value),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            fill: false,
            borderColor: "black",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [graphData, timeFrame]);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
    handleData();
  };

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-3xl md:p-8 mt-6">
      <div className="flex flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Graph Currency</h1>
        <ToggleButton isVisible={isVisible} onToggle={toggleVisibility} />
      </div>

      {isVisible && (
        <>
          <div className="flex gap-4 mb-4">
            {Object.keys(timeFrameMap).map((range) => (
              <button
                key={range}
                className={`px-4 py-2 rounded-lg ${
                  timeFrame === range ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setTimeFrame(range)}
              >
                {range}
              </button>
            ))}
          </div>
          {chartData ? (
            <>
              <p className="text font-bold text-gray-600">Last updated: {graphData.at(-1).day}</p>
              <LineChart chartData={chartData} />
            </>
          ) : (
            <p className="text font-bold text-gray-600">Loading...</p>
          )}
        </>
      )}
      {error && <ErrorPanel message={error} />}
    </div>
  );
};

export default CurrencyChart;
