import { Line } from "react-chartjs-2";

const LineChart = ({ chartData }) => (
  <div>
    <Line
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: "mockData"
          },
          legend: {
            display: false
          }
        }
      }}
    />
  </div>
);

export default LineChart;