import Chart from "chart.js/auto";
import { FaChartLine } from "react-icons/fa";

import { CategoryScale } from "chart.js"; 
import { useEffect, useMemo, useState } from "react";
import { useGraphData } from "@/hooks/useGraphData";
import ToggleButton from "@/components/ToggleButton";
import LineChart from "@/components/LineChart";
import ErrorPanel from "@/components/ErrorPanel";

type TimeFrameString = "1W" | "1M" | "6M" | "1Y"

interface GraphDataType {
  currency_value: number;
  date: string;
  day: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    fill: boolean;
    borderColor: string;
    borderWidth: number;
  }[];
}

Chart.register(CategoryScale);

const timeFrameMap: Record<TimeFrameString, (now: Date) => Date> = {
  "1W": (now: Date) => new Date(now.setDate(now.getDate() - 7)),
  "1M": (now: Date) => new Date(now.setMonth(now.getMonth() - 1)),
  "6M": (now: Date) => new Date(now.setMonth(now.getMonth() - 6)),
  "1Y": (now: Date) => new Date(now.setMonth(now.getMonth() - 13)),
};

const CurrencyChart = () => {
  const { handleData, graphData, error } = useGraphData();

  const [isVisible, setIsVisible] = useState(false);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [timeFrame, setTimeFrame] = useState<TimeFrameString>("1W");

  const timeFrameMapMemo = useMemo(() => timeFrameMap, []);

  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  };



  useEffect(() => {
    const filterDataByTimeFrame = (): GraphDataType[] => {
      const now = new Date();
      const limitDate = timeFrameMapMemo[timeFrame as keyof typeof timeFrameMapMemo](new Date(now));
  
      if (limitDate == null)
        return graphData;
  
      return graphData.filter((item: GraphDataType) => {
        const itemDate = parseDate(item.date);
        return itemDate >= limitDate;
      });
    };

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
  }, [graphData, timeFrame, timeFrameMapMemo]);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
    handleData();
  };

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-3xl md:p-8 mt-6">
      <div className="flex flex items-center justify-between">
        <FaChartLine className="text-blue-700 text-3xl" />
        <h1 className="text-xl font-bold text-gray-800">Graph Currency</h1>
        <ToggleButton isVisible={isVisible} onToggle={toggleVisibility} className={""} />
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
                onClick={() => setTimeFrame(range as TimeFrameString)}
              >
                {range}
              </button>
            ))}
          </div>
          {chartData ? (
            <>
            {graphData.length > 0 && (
              <p className="text-xs font-bold text-gray-600 ml-auto">
                * 1 EUR = <span>{graphData.at(-1)!.currency_value} Wons</span> {graphData.at(-1)!.day}
              </p>
            )}
            <LineChart chartData={chartData} />
            </>
          ) : (
            <p className="text font-bold text-gray-600">Loading...</p>
          )}
        </>
      )}
      {isVisible && (error && <ErrorPanel message={error} />)}
    </div>
  );
};

export default CurrencyChart;
