import { Line } from "react-chartjs-2";

const LineChart = ({ chartData }) => (
  <div className="mx-auto max-w-3xl flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-3xl md:p-8 mt-6">
    <Line
        data={chartData}
        height="200px"
        width="200px"
        options={{
          plugins: {
            title: {
              display: true,
              text: "mockData"
            },
            legend: {
              display: false
            }
          },
          aspectRatio: 1,
          maintainAspectRatio: false
        }}
      />
  </div>
);

export default LineChart;